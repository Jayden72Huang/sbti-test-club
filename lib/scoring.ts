import type { Question } from '@/data/questions';
import {
  dimensionOrder,
  keyToShort,
  type DimensionKey,
} from '@/data/dimensions';

/**
 * SBTI 评分算法
 *
 * 流程：
 *  1. 用户作答 → 为 15 个维度各累加原始分（1~3 的单题分 × 每维度 2 题 = 2~6）
 *  2. 按阈值转成 H / M / L：
 *       raw ≤ 3 → L
 *       raw = 4 → M
 *       raw ≥ 5 → H
 *  3. H/M/L 转为数值向量 (H=3, M=2, L=1)
 *  4. 与 25 个人格模板做曼哈顿距离比较
 *  5. 相似度 = max(0, round((1 - distance / 30) * 100))
 *  6. 最低距离胜出；并列时按 exact-match 数量、再按 similarity 决胜
 *  7. 若最高相似度 < 60% → 强制兜底为 HHHH
 *  8. 若检测到隐藏 DRUNK 题触发 → 强制替换为 DRUNK
 *
 * 注：向量最大距离 = 15 维 × max|3-1| = 30，故 /30 归一。
 */

/** 用户作答：questionId → optionId */
export type Answers = Record<number, 'a' | 'b' | 'c' | 'd'>;

/** 每个维度的 H / M / L 评分 */
export type DimensionLevel = 'H' | 'M' | 'L';
export type DimensionScores = Record<DimensionKey, DimensionLevel>;

/** 每个维度的原始分（2~6） */
export type RawDimensionScores = Record<DimensionKey, number>;

/**
 * SBTI 类型数据的最小契约接口。
 * 真正的类型数据放在 data/sbti-types.ts（由另一任务产出），
 * scoring 只依赖这个结构最小子集，避免强耦合。
 */
export interface SbtiType {
  code: string;
  /** 15 位字母序列，H/M/L 形式；顺序严格对应 dimensionOrder */
  pattern: string;
  /** 该类型是否为特殊类型（HHHH / DRUNK 等） */
  isSpecial?: boolean;
  /** 特殊类型触发方式 */
  trigger?: 'fallback' | 'drunk';
  /** 兼容字段：允许额外元数据 */
  [extra: string]: unknown;
}

export interface MatchResult {
  /** 最终主类型 */
  type: SbtiType;
  /** 匹配度百分比 0~100 */
  matchPercent: number;
  /** 相近的 3 个类型（不含主类型），按相似度降序 */
  similar: SbtiType[];
  /** 是否触发了 DRUNK */
  isDrunkTriggered: boolean;
  /** 是否走了 HHHH 兜底 */
  isFallback: boolean;
  /** 用户 15 维度评分（H/M/L） */
  scores: DimensionScores;
  /** 用户 15 维度原始分 */
  rawScores: RawDimensionScores;
  /** 若 DRUNK 触发，normalBestType 为未触发情况下的最佳普通类型 */
  normalBestType?: SbtiType;
}

// ==========================================================================
// 工具：H/M/L 与数值互转
// ==========================================================================

/** H=3, M=2, L=1 */
export function dimensionToNumeric(level: DimensionLevel): number {
  switch (level) {
    case 'H':
      return 3;
    case 'M':
      return 2;
    case 'L':
      return 1;
  }
}

/** raw 总分 → H/M/L */
export function rawToLevel(raw: number): DimensionLevel {
  if (raw >= 5) return 'H';
  if (raw === 4) return 'M';
  return 'L';
}

// ==========================================================================
// 维度分计算
// ==========================================================================

/**
 * 根据作答累加 15 维度原始分。
 * 每道常规题的 option.scores 会把该题的主要维度加 1/2/3 分；
 * 每个维度恰好被 2 题覆盖，所以最终原始分范围为 2~6。
 * 未作答的维度按最低 2 分兜底（对应 L），保证向量完整。
 */
export function calculateRawDimensionScores(
  answers: Answers,
  questions: Question[],
): RawDimensionScores {
  const raw: Partial<RawDimensionScores> = {};

  for (const q of questions) {
    if (q.isHiddenTrigger) continue; // 隐藏题不参与维度打分
    const chosenId = answers[q.id];
    if (!chosenId) continue;
    const opt = q.options.find((o) => o.id === chosenId);
    if (!opt) continue;
    for (const [dim, delta] of Object.entries(opt.scores)) {
      if (typeof delta !== 'number') continue;
      const key = dim as DimensionKey;
      raw[key] = (raw[key] ?? 0) + delta;
    }
  }

  // 补齐未出现的维度（极端情况：用户跳题或数据异常）
  const complete: RawDimensionScores = {} as RawDimensionScores;
  for (const key of dimensionOrder) {
    complete[key] = raw[key] ?? 2; // 最低 raw 对应 L
  }
  return complete;
}

/** 把 15 维度原始分转成 H/M/L 级别 */
export function calculateDimensionScores(
  answers: Answers,
  questions: Question[],
): DimensionScores {
  const raw = calculateRawDimensionScores(answers, questions);
  const scores: DimensionScores = {} as DimensionScores;
  for (const key of dimensionOrder) {
    scores[key] = rawToLevel(raw[key]);
  }
  return scores;
}

// ==========================================================================
// DRUNK 触发检测
// ==========================================================================

/**
 * 检测是否选中了隐藏 DRUNK 触发题对应的触发选项。
 * 题目数据里用 isHiddenTrigger + hiddenTriggerOption 标记。
 */
export function isDrunkTriggered(
  answers: Answers,
  questions: Question[],
): boolean {
  const hidden = questions.find((q) => q.isHiddenTrigger);
  if (!hidden || !hidden.hiddenTriggerOption) return false;
  return answers[hidden.id] === hidden.hiddenTriggerOption;
}

// ==========================================================================
// Pattern 解析
// ==========================================================================

/**
 * 把 "HHH-HMH-MHH-HHH-MHM" 这样的 pattern 解析成 15 位 level 数组。
 * 允许 pattern 中包含 '-' 作为分隔符，也允许没有。
 */
export function parsePattern(pattern: string): DimensionLevel[] {
  const letters = pattern.replace(/[^HML]/gi, '').toUpperCase();
  if (letters.length !== 15) {
    throw new Error(
      `Invalid SBTI pattern "${pattern}": expected 15 H/M/L letters, got ${letters.length}`,
    );
  }
  return letters.split('') as DimensionLevel[];
}

/** 把 15 维度 DimensionScores 转换为顺序正确的 level 数组 */
export function scoresToVector(scores: DimensionScores): DimensionLevel[] {
  return dimensionOrder.map((key) => scores[key]);
}

// ==========================================================================
// 匹配算法
// ==========================================================================

interface RankedEntry {
  type: SbtiType;
  /** 曼哈顿距离 */
  distance: number;
  /** 同位置完全一致的维度数 */
  exact: number;
  /** 相似度 0~100 */
  similarity: number;
}

/**
 * 曼哈顿距离匹配：用户向量 vs 25 个普通人格模板
 * 返回排序后的列表（距离升序 → exact 降序 → similarity 降序）
 */
export function rankNormalTypes(
  scores: DimensionScores,
  allTypes: SbtiType[],
): RankedEntry[] {
  const userVector = scoresToVector(scores).map(dimensionToNumeric);
  const MAX_DISTANCE = 30; // 15 维 × (3-1) = 30

  const normals = allTypes.filter(
    (t) => !t.isSpecial && t.code !== 'HHHH' && t.code !== 'DRUNK',
  );

  const ranked: RankedEntry[] = normals.map((type) => {
    let pattern: DimensionLevel[];
    try {
      pattern = parsePattern(type.pattern);
    } catch {
      // 坏数据兜底：距离无穷大
      return { type, distance: Number.POSITIVE_INFINITY, exact: 0, similarity: 0 };
    }
    const vector = pattern.map(dimensionToNumeric);
    let distance = 0;
    let exact = 0;
    for (let i = 0; i < vector.length; i++) {
      const diff = Math.abs(userVector[i] - vector[i]);
      distance += diff;
      if (diff === 0) exact += 1;
    }
    const similarity = Math.max(0, Math.round((1 - distance / MAX_DISTANCE) * 100));
    return { type, distance, exact, similarity };
  });

  ranked.sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance;
    if (b.exact !== a.exact) return b.exact - a.exact;
    return b.similarity - a.similarity;
  });

  return ranked;
}

/**
 * 主入口：根据作答计算最终人格类型。
 *
 * @param scores      用户 15 维度评分
 * @param allTypes    所有 SBTI 类型（含 25 普通 + HHHH + DRUNK）
 * @param options     传入隐藏题触发结果（如果用户已预先检测过，可以传入避免重复计算）
 */
export function matchSbtiType(
  scores: DimensionScores,
  allTypes: SbtiType[],
  options: { drunkTriggered?: boolean; rawScores?: RawDimensionScores } = {},
): MatchResult {
  const drunkTriggered = options.drunkTriggered ?? false;

  const ranked = rankNormalTypes(scores, allTypes);
  const bestNormal = ranked[0];
  const similar = ranked.slice(1, 4).map((r) => r.type);

  const hhhh = allTypes.find((t) => t.code === 'HHHH');
  const drunk = allTypes.find((t) => t.code === 'DRUNK');

  // 构造默认 rawScores（只在 matchSbtiType 单独被调用时使用）
  const rawScores: RawDimensionScores =
    options.rawScores ??
    (dimensionOrder.reduce((acc, key) => {
      const level = scores[key];
      acc[key] = level === 'H' ? 5 : level === 'M' ? 4 : 3;
      return acc;
    }, {} as RawDimensionScores));

  // 1. DRUNK 强制触发
  if (drunkTriggered && drunk) {
    return {
      type: drunk,
      matchPercent: 100,
      similar: bestNormal ? [bestNormal.type, ...similar].slice(0, 3) : similar,
      isDrunkTriggered: true,
      isFallback: false,
      scores,
      rawScores,
      normalBestType: bestNormal?.type,
    };
  }

  // 2. HHHH 兜底
  if (!bestNormal) {
    if (!hhhh) {
      throw new Error('Type library missing both normal types and HHHH fallback');
    }
    return {
      type: hhhh,
      matchPercent: 0,
      similar: [],
      isDrunkTriggered: false,
      isFallback: true,
      scores,
      rawScores,
    };
  }

  if (bestNormal.similarity < 60 && hhhh) {
    return {
      type: hhhh,
      matchPercent: bestNormal.similarity,
      similar: [bestNormal.type, ...similar].slice(0, 3),
      isDrunkTriggered: false,
      isFallback: true,
      scores,
      rawScores,
      normalBestType: bestNormal.type,
    };
  }

  // 3. 正常匹配
  return {
    type: bestNormal.type,
    matchPercent: bestNormal.similarity,
    similar,
    isDrunkTriggered: false,
    isFallback: false,
    scores,
    rawScores,
  };
}

/**
 * 端到端：作答 → 最终 MatchResult
 * 这是页面层最常调用的便捷入口。
 */
export function scoreAnswers(
  answers: Answers,
  questions: Question[],
  allTypes: SbtiType[],
): MatchResult {
  const rawScores = calculateRawDimensionScores(answers, questions);
  const scores: DimensionScores = {} as DimensionScores;
  for (const key of dimensionOrder) {
    scores[key] = rawToLevel(rawScores[key]);
  }
  const drunkTriggered = isDrunkTriggered(answers, questions);
  return matchSbtiType(scores, allTypes, { drunkTriggered, rawScores });
}

/**
 * 辅助：把 DimensionScores 格式化成带短代号的 15 字母字符串，
 * 用于 URL 分享或调试，例如 "HHH-HMH-MHH-HHH-MHM"
 */
export function scoresToPattern(scores: DimensionScores, withDash = true): string {
  const letters = dimensionOrder.map((key) => scores[key]);
  if (!withDash) return letters.join('');
  const groups = [
    letters.slice(0, 3).join(''),
    letters.slice(3, 6).join(''),
    letters.slice(6, 9).join(''),
    letters.slice(9, 12).join(''),
    letters.slice(12, 15).join(''),
  ];
  return groups.join('-');
}

/** 导出顺序（方便在 UI 侧按顺序渲染雷达图等） */
export { dimensionOrder, keyToShort };
