/**
 * Algorithmic full match report generator.
 *
 * Takes two SBTI patterns (e.g. "HHH-MHH-HHH-HHH-MMH") and produces a
 * structured report: dimension-by-dimension comparison, group insights,
 * communication guide, conflict resolution, and relationship phase forecast.
 */

import {
  dimensions,
  dimensionOrder,
  type DimensionKey,
  type DimensionGroup,
} from '@/data/dimensions';
import type { DimensionLevel } from '@/lib/scoring';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DimensionComparison {
  key: DimensionKey;
  shortCode: string;
  nameCN: string;
  nameEN: string;
  group: DimensionGroup;
  groupNameCN: string;
  groupNameEN: string;
  level1: DimensionLevel;
  level2: DimensionLevel;
  explain1CN: string;
  explain1EN: string;
  explain2CN: string;
  explain2EN: string;
  gap: 0 | 1 | 2;
  insightCN: string;
  insightEN: string;
}

export interface GroupInsight {
  group: DimensionGroup;
  groupNameCN: string;
  groupNameEN: string;
  emoji: string;
  harmonies: number;
  tensions: number;
  summaryCN: string;
  summaryEN: string;
}

export interface RelationshipPhase {
  nameCN: string;
  nameEN: string;
  emoji: string;
  descCN: string;
  descEN: string;
}

export interface FullMatchReport {
  dimensions: DimensionComparison[];
  groups: GroupInsight[];
  communicationCN: string[];
  communicationEN: string[];
  conflictResolutionCN: string[];
  conflictResolutionEN: string[];
  phases: RelationshipPhase[];
  overallHarmony: number; // 0-15, how many dims match
  overallTension: number; // 0-15, how many dims differ by 2
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parsePattern(pattern: string): DimensionLevel[] {
  return pattern.replace(/-/g, '').split('') as DimensionLevel[];
}

const levelNum: Record<DimensionLevel, number> = { H: 3, M: 2, L: 1 };

function gap(a: DimensionLevel, b: DimensionLevel): 0 | 1 | 2 {
  const d = Math.abs(levelNum[a] - levelNum[b]);
  return (d > 2 ? 2 : d) as 0 | 1 | 2;
}

// ---------------------------------------------------------------------------
// Dimension insight templates
// ---------------------------------------------------------------------------

function dimInsight(
  dim: (typeof dimensions)[number],
  l1: DimensionLevel,
  l2: DimensionLevel,
  name1: string,
  name2: string,
): { cn: string; en: string } {
  const g = gap(l1, l2);
  const k = dim.key;

  if (g === 0) {
    return sameLevel(dim, l1, name1, name2);
  }
  // Ensure "higher" is the one with the bigger level
  const [higher, lower, nameH, nameL] =
    levelNum[l1] > levelNum[l2]
      ? [l1, l2, name1, name2]
      : [l2, l1, name2, name1];

  return diffLevel(dim, higher, lower, nameH, nameL, g);
}

function sameLevel(
  dim: (typeof dimensions)[number],
  level: DimensionLevel,
  n1: string,
  n2: string,
): { cn: string; en: string } {
  const tag = `${dim.nameCN}`;
  if (level === 'H') {
    return {
      cn: `两人在「${tag}」上都偏高，彼此默契但也可能在同一件事上太执着。`,
      en: `Both score high on ${dim.nameEN} — great alignment, but you may butt heads when you're both stubborn on the same point.`,
    };
  }
  if (level === 'M') {
    return {
      cn: `两人在「${tag}」上都居中，随遇而安的节奏刚好合拍。`,
      en: `Both moderate on ${dim.nameEN} — you share a go-with-the-flow rhythm that keeps things easy.`,
    };
  }
  return {
    cn: `两人在「${tag}」上都偏低，互相理解彼此的脆弱，但也需要外部支撑。`,
    en: `Both low on ${dim.nameEN} — you understand each other's vulnerabilities, but may need external support together.`,
  };
}

function diffLevel(
  dim: (typeof dimensions)[number],
  _higher: DimensionLevel,
  _lower: DimensionLevel,
  nameH: string,
  nameL: string,
  g: 0 | 1 | 2,
): { cn: string; en: string } {
  const tag = dim.nameCN;
  const tagEN = dim.nameEN;

  if (g === 1) {
    return {
      cn: `在「${tag}」上 ${nameH} 略高于 ${nameL}，是互补型的小差异，日常不太会产生摩擦。`,
      en: `On ${tagEN}, ${nameH} leans slightly higher than ${nameL} — a complementary gap that rarely causes friction.`,
    };
  }
  // g === 2
  const groupKey = dim.group;
  if (groupKey === 'emotion') {
    return {
      cn: `「${tag}」差距明显：${nameH} 投入更多情感能量，${nameL} 相对收敛。如果不说开，一方会觉得对方冷，另一方会觉得被压。`,
      en: `Big gap on ${tagEN}: ${nameH} pours in more emotional energy while ${nameL} holds back. Without open dialogue, one feels cold, the other suffocated.`,
    };
  }
  if (groupKey === 'self') {
    return {
      cn: `「${tag}」上存在显著差距。${nameH} 的内在确定感比 ${nameL} 强得多，这可能让 ${nameL} 在关系里更容易感到不安。`,
      en: `Significant gap on ${tagEN}. ${nameH}'s inner certainty far exceeds ${nameL}'s, which may leave ${nameL} feeling less secure in the relationship.`,
    };
  }
  if (groupKey === 'attitude') {
    return {
      cn: `在「${tag}」上两人差距大：${nameH} 偏理想主义，${nameL} 偏现实主义。需要在"想做的"和"能做的"之间找到共识。`,
      en: `Wide gap on ${tagEN}: ${nameH} leans idealistic, ${nameL} leans pragmatic. You'll need to negotiate between dreams and reality.`,
    };
  }
  if (groupKey === 'action') {
    return {
      cn: `「${tag}」差异突出：${nameH} 是行动派，${nameL} 更偏思考/缓冲。一个人嫌慢，一个人嫌急——这是你们最需要调频的点。`,
      en: `Major gap on ${tagEN}: ${nameH} is action-first while ${nameL} prefers to think/buffer. One thinks it's too slow, the other too fast — your key tuning point.`,
    };
  }
  // social
  return {
    cn: `「${tag}」差距明显：${nameH} 在社交上更主动外放，${nameL} 更内敛。需要尊重彼此的社交节奏，别强迫对方变成自己。`,
    en: `Big gap on ${tagEN}: ${nameH} is socially outgoing while ${nameL} is more reserved. Respect each other's social rhythm — don't force a personality swap.`,
  };
}

// ---------------------------------------------------------------------------
// Group insight
// ---------------------------------------------------------------------------

const groupEmoji: Record<DimensionGroup, string> = {
  self: '🪞',
  emotion: '💗',
  attitude: '🧭',
  action: '⚡',
  social: '🤝',
};

function buildGroupInsight(
  group: DimensionGroup,
  dims: DimensionComparison[],
  name1: string,
  name2: string,
): GroupInsight {
  const groupDims = dims.filter((d) => d.group === group);
  const harmonies = groupDims.filter((d) => d.gap === 0).length;
  const tensions = groupDims.filter((d) => d.gap === 2).length;
  const first = groupDims[0];

  let summaryCN: string;
  let summaryEN: string;

  if (tensions === 0 && harmonies >= 2) {
    summaryCN = `在${first.groupNameCN}层面，两人高度一致，是这段关系的稳定基石。`;
    summaryEN = `On the ${first.groupNameEN} front, you're highly aligned — this is a solid foundation for the relationship.`;
  } else if (tensions >= 2) {
    summaryCN = `${first.groupNameCN}是两人差距最大的区域，也是最需要花时间磨合的地方。理解差异比消灭差异更重要。`;
    summaryEN = `${first.groupNameEN} is where your biggest gaps live — the area that needs the most patience. Understanding the gap matters more than closing it.`;
  } else {
    summaryCN = `在${first.groupNameCN}上有互补也有一致，属于典型的"有火花但不至于爆炸"的组合。`;
    summaryEN = `A mix of alignment and contrast on the ${first.groupNameEN} front — sparks but no explosions.`;
  }

  return {
    group,
    groupNameCN: first.groupNameCN,
    groupNameEN: first.groupNameEN,
    emoji: groupEmoji[group],
    harmonies,
    tensions,
    summaryCN,
    summaryEN,
  };
}

// ---------------------------------------------------------------------------
// Communication guide
// ---------------------------------------------------------------------------

function buildCommunication(
  dims: DimensionComparison[],
  name1: string,
  name2: string,
): { cn: string[]; en: string[] } {
  const cn: string[] = [];
  const en: string[] = [];

  // E2 emotional investment
  const e2 = dims.find((d) => d.key === 'E2_emotionalInvest');
  if (e2 && e2.gap >= 1) {
    const [hot, cool] = levelNum[e2.level1] > levelNum[e2.level2] ? [name1, name2] : [name2, name1];
    cn.push(`${hot} 是"说爱要大声"型，${cool} 是"爱在心里口难开"型。${hot}：别把沉默当冷暴力；${cool}：偶尔主动表达，对方会充电一整天。`);
    en.push(`${hot} wears their heart on their sleeve; ${cool} keeps love closer to the chest. ${hot}: silence isn't coldness. ${cool}: a random "I love you" recharges them for a week.`);
  }

  // So3 expression
  const so3 = dims.find((d) => d.key === 'So3_expression');
  if (so3 && so3.gap >= 1) {
    const [expressive, reserved] = levelNum[so3.level1] > levelNum[so3.level2] ? [name1, name2] : [name2, name1];
    cn.push(`${expressive} 表达直接，${reserved} 更含蓄。吵架时 ${expressive} 觉得对方不说话很痛苦，${reserved} 觉得被追问更痛苦。约定一个"冷静缓冲期"很关键。`);
    en.push(`${expressive} communicates directly, ${reserved} is more subtle. In arguments, ${expressive} hates the silence; ${reserved} hates being pressed. Agree on a cool-down buffer time.`);
  }

  // E3 boundary
  const e3 = dims.find((d) => d.key === 'E3_boundary');
  if (e3 && e3.gap >= 1) {
    cn.push('一个人边界感强，一个人偏黏——这不是不爱，是出厂设置不同。明确说出"我需要独处一下"不是拒绝，是充电。');
    en.push("One of you needs clear boundaries, the other craves closeness — not a love deficit, just different factory settings. Saying 'I need alone time' isn't rejection, it's recharging.");
  }

  // A2 flexibility
  const a2 = dims.find((d) => d.key === 'A2_flexibility');
  if (a2 && a2.gap >= 1) {
    cn.push('你们的"灵活度"不同步。一个人觉得"计划就是拿来改的"，另一个觉得"改计划=不靠谱"。提前沟通期望值，别用自己的标准量对方。');
    en.push("Your flexibility levels differ. One thinks plans are made to change; the other thinks changing plans = unreliable. Align expectations upfront — don't measure your partner by your own ruler.");
  }

  // Default advice
  cn.push(`吵架时用"我感觉……"而不是"你总是……"开头。这一条听着老套，但对 ${name1} 和 ${name2} 这个组合格外重要。`);
  en.push(`Start conflicts with "I feel…" not "You always…" — sounds cliché, but for a ${name1}–${name2} pair it's especially critical.`);

  return { cn, en };
}

// ---------------------------------------------------------------------------
// Conflict resolution
// ---------------------------------------------------------------------------

function buildConflictResolution(
  dims: DimensionComparison[],
  name1: string,
  name2: string,
): { cn: string[]; en: string[] } {
  const cn: string[] = [];
  const en: string[] = [];

  const bigGaps = dims.filter((d) => d.gap === 2);
  if (bigGaps.length > 0) {
    const topGap = bigGaps[0];
    cn.push(`你们最大的冲突源是「${topGap.nameCN}」维度。不是谁对谁错，是两个人的出厂设置差太远。接受差异是第一步。`);
    en.push(`Your #1 conflict trigger is the ${topGap.nameEN} dimension. It's not about right or wrong — your factory settings are just far apart. Accepting the gap is step one.`);
  }

  // Ac2 decision style
  const ac2 = dims.find((d) => d.key === 'Ac2_decisionStyle');
  if (ac2 && ac2.gap >= 1) {
    cn.push('做决定时，一个人靠直觉，一个人靠数据。别催"你怎么还没想好"，也别嫌"你怎么不过脑子"。给彼此不同的决策时间。');
    en.push("When deciding, one goes by gut, the other by data. Don't rush with 'why haven't you decided' or blame with 'why didn't you think.' Give each other different decision timelines.");
  }

  // S1 self-confidence
  const s1 = dims.find((d) => d.key === 'S1_selfConfidence');
  if (s1 && s1.gap >= 1) {
    const [confident, sensitive] = levelNum[s1.level1] > levelNum[s1.level2] ? [name1, name2] : [name2, name1];
    cn.push(`${confident} 说话比较直，但 ${sensitive} 可能比你想象中更在意措辞。批评的时候先肯定，再建议——对 ${sensitive} 这种类型特别管用。`);
    en.push(`${confident} is blunt; ${sensitive} is more affected by wording than you'd think. Lead with a positive before the critique — it works wonders on a ${sensitive}-type personality.`);
  }

  cn.push('每次吵完架，花 5 分钟复盘"我们到底在吵什么"。大部分时候答案是：吵的不是事情本身，而是"你不理解我"。');
  en.push(`After every fight, spend 5 minutes asking "what were we actually fighting about?" Most of the time the answer isn't the issue itself — it's "you don't understand me."`);

  cn.push('设立一个"安全词"——当某一方快要情绪失控时说出来，双方暂停 15 分钟再继续。比冷战和摔门有效 100 倍。');
  en.push('Create a safe word — when either of you is about to blow up, say it and pause for 15 minutes. 100x more effective than slamming doors or going silent.');

  return { cn, en };
}

// ---------------------------------------------------------------------------
// Relationship phases
// ---------------------------------------------------------------------------

function buildPhases(
  dims: DimensionComparison[],
  name1: string,
  name2: string,
): RelationshipPhase[] {
  const emotionGaps = dims.filter((d) => d.group === 'emotion' && d.gap >= 1).length;
  const actionGaps = dims.filter((d) => d.group === 'action' && d.gap >= 1).length;

  return [
    {
      nameCN: '热恋期（0-3个月）',
      nameEN: 'Honeymoon Phase (0-3 months)',
      emoji: '🔥',
      descCN: emotionGaps > 1
        ? `情感投入不对等会在热恋期最明显。${name1} 和 ${name2} 需要尽早同步"什么算在一起"的定义，别让一方还在暧昧，另一方已经在规划未来。`
        : `两人的情感节奏相近，热恋期会很甜。享受但别忘记保持自我——毕竟热恋滤镜终会退。`,
      descEN: emotionGaps > 1
        ? `Uneven emotional investment shows most in the honeymoon phase. ${name1} and ${name2} should align early on what "being together" means — don't let one linger in the ambiguous stage while the other is planning the future.`
        : `Your emotional rhythms match well — the honeymoon will be sweet. Enjoy it, but maintain your identity. The filter fades eventually.`,
    },
    {
      nameCN: '磨合期（3-12个月）',
      nameEN: 'Adjustment Phase (3-12 months)',
      emoji: '⚙️',
      descCN: `这是你们差异爆发的高峰期。${dims.filter(d => d.gap === 2).length > 2 ? '你们有多个维度差距很大，可能吵架频率会偏高。关键是：每次吵完要进步，不要原地循环。' : '你们的差异在可控范围内，磨合期主要是习惯彼此的生活节奏和沟通方式。'}`,
      descEN: `This is peak conflict season. ${dims.filter(d => d.gap === 2).length > 2 ? 'With several wide gaps, arguments may be frequent. The key: make progress after each fight, don\'t just loop.' : 'Your differences are manageable — the adjustment is mostly about syncing daily rhythms and communication styles.'}`,
    },
    {
      nameCN: '稳定期（1年+）',
      nameEN: 'Stability Phase (1 year+)',
      emoji: '🏡',
      descCN: actionGaps > 1
        ? `你们在行动驱力上有差异，长期相处要警惕"节奏差"变成"价值观差"。定期聊聊未来规划，确保两人还在同一条船上。`
        : `度过磨合期后，你们的互补反而会变成优势。一个人的短板刚好被另一个人补上，这种组合的长期稳定性其实很强。`,
      descEN: actionGaps > 1
        ? `Your action-drive gap can evolve from "pace difference" into "values difference" over time. Regularly check in on future plans to make sure you're still on the same boat.`
        : `After adjustment, your complementary traits become strengths. One person's weakness is covered by the other — this combo actually has strong long-term stability.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Main entry
// ---------------------------------------------------------------------------

export function generateFullMatchReport(
  pattern1: string,
  pattern2: string,
  name1CN: string,
  name2CN: string,
  name1EN: string,
  name2EN: string,
): FullMatchReport {
  const levels1 = parsePattern(pattern1);
  const levels2 = parsePattern(pattern2);

  const dimComparisons: DimensionComparison[] = dimensionOrder.map((key, i) => {
    const dim = dimensions.find((d) => d.key === key)!;
    const l1 = levels1[i];
    const l2 = levels2[i];
    const insight = dimInsight(dim, l1, l2, name1CN, name2CN);
    const insightEN = dimInsight(dim, l1, l2, name1EN, name2EN);
    return {
      key,
      shortCode: dim.shortCode,
      nameCN: dim.nameCN,
      nameEN: dim.nameEN,
      group: dim.group,
      groupNameCN: dim.groupNameCN,
      groupNameEN: dim.groupNameEN,
      level1: l1,
      level2: l2,
      explain1CN: dim.levels[l1].cn,
      explain1EN: dim.levels[l1].en,
      explain2CN: dim.levels[l2].cn,
      explain2EN: dim.levels[l2].en,
      gap: gap(l1, l2),
      insightCN: insight.cn,
      insightEN: insightEN.en,
    };
  });

  const groups: DimensionGroup[] = ['self', 'emotion', 'attitude', 'action', 'social'];
  const groupInsights = groups.map((g) =>
    buildGroupInsight(g, dimComparisons, name1CN, name2CN),
  );

  const comm = buildCommunication(dimComparisons, name1CN, name2CN);
  const commEN = buildCommunication(dimComparisons, name1EN, name2EN);
  const conflict = buildConflictResolution(dimComparisons, name1CN, name2CN);
  const conflictEN = buildConflictResolution(dimComparisons, name1EN, name2EN);
  const phases = buildPhases(dimComparisons, name1CN, name2CN);

  return {
    dimensions: dimComparisons,
    groups: groupInsights,
    communicationCN: comm.cn,
    communicationEN: commEN.en,
    conflictResolutionCN: conflict.cn,
    conflictResolutionEN: conflictEN.en,
    phases,
    overallHarmony: dimComparisons.filter((d) => d.gap === 0).length,
    overallTension: dimComparisons.filter((d) => d.gap === 2).length,
  };
}
