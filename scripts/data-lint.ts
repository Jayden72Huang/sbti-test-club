/**
 * data-lint.ts
 * 一次性数据一致性检查脚本
 *
 * 用法：npx tsx scripts/data-lint.ts
 *
 * 检查项：
 *   1. sbti-types.ts 内部自洽
 *      1a. compatibleTypes / conflictTypes 引用的 code 必须存在于 27 个类型中
 *      1b. pattern 字符串与 dimensionScores 完全对应
 *      1c. slug 字段符合规则：code.toLowerCase().replace(/[^a-z0-9-]/g, '')
 *   2. compatibility.ts 引用完整性
 *      2a. type1 / type2 引用的 code 必须存在于 27 个 code 中
 *      2b. 每种类型在 compatibility 数据里出现次数 >= 5
 *   3. questions.ts ↔ dimensions.ts
 *      3a. questions 中所有 dimensions 和 scores key 必须是合法的 DimensionKey
 *      3b. 每个维度必须恰好被 2 道题打分
 *   4. dimension-groups.ts 对齐
 *      4a. dimensionGroups 中所有 dimensions[] 的 key 必须是合法的 DimensionKey
 *      4b. 15 个维度必须被 5 个组完整覆盖且无重复
 */

import { sbtiTypes, type SbtiType } from '../data/sbti-types';
import { compatibilityData } from '../data/compatibility';
import { questions } from '../data/questions';
import {
  dimensions,
  dimensionOrder,
  type DimensionKey,
} from '../data/dimensions';
import { dimensionGroups } from '../data/dimension-groups';

type Severity = 'error' | 'warn';
interface Finding {
  check: string;
  severity: Severity;
  message: string;
}

const findings: Finding[] = [];
const info: string[] = [];

function report(check: string, severity: Severity, message: string) {
  findings.push({ check, severity, message });
}

// ============================================================================
// 预备：code / slug / DimensionKey 集合
// ============================================================================

const allCodes = new Set(sbtiTypes.map((t) => t.code));
const codeToType = new Map<string, SbtiType>(sbtiTypes.map((t) => [t.code, t]));
const allDimensionKeys = new Set<DimensionKey>(dimensions.map((d) => d.key));

info.push(`sbtiTypes: ${sbtiTypes.length} 个类型`);
info.push(`dimensions: ${dimensions.length} 个维度`);
info.push(`questions: ${questions.length} 道题（含隐藏题）`);
info.push(`compatibilityData: ${compatibilityData.length} 条配对`);

// ============================================================================
// 检查 1: sbti-types.ts 内部自洽
// ============================================================================

// 1a: compatibleTypes / conflictTypes 引用存在性
for (const t of sbtiTypes) {
  for (const ref of t.compatibleTypes) {
    if (!allCodes.has(ref)) {
      report(
        '1a-compatible-ref',
        'error',
        `${t.code} 的 compatibleTypes 引用了不存在的 code: "${ref}"`,
      );
    }
  }
  for (const ref of t.conflictTypes) {
    if (!allCodes.has(ref)) {
      report(
        '1a-conflict-ref',
        'error',
        `${t.code} 的 conflictTypes 引用了不存在的 code: "${ref}"`,
      );
    }
  }
}

// 1b: pattern 与 dimensionScores 对齐
for (const t of sbtiTypes) {
  const patternLetters = t.pattern.replace(/[^HML]/gi, '').toUpperCase();
  if (patternLetters.length !== 15) {
    report(
      '1b-pattern-length',
      'error',
      `${t.code} 的 pattern 去除分隔符后长度为 ${patternLetters.length}，应为 15`,
    );
    continue;
  }
  for (let i = 0; i < dimensionOrder.length; i++) {
    const key = dimensionOrder[i];
    const fromPattern = patternLetters[i] as 'H' | 'M' | 'L';
    const fromScores = t.dimensionScores[key];
    if (fromPattern !== fromScores) {
      report(
        '1b-pattern-mismatch',
        'error',
        `${t.code} 的 pattern[${i}] = '${fromPattern}' 但 dimensionScores.${key} = '${fromScores}'`,
      );
    }
  }
}

// 1c: slug 规则
// 规则：code.toLowerCase().replace(/[^a-z0-9-]/g, '')
// 这会保留 a-z、0-9、连字符
function expectedSlug(code: string): string {
  return code.toLowerCase().replace(/[^a-z0-9-]/g, '');
}

for (const t of sbtiTypes) {
  const expected = expectedSlug(t.code);
  if (t.slug !== expected) {
    report(
      '1c-slug',
      'error',
      `${t.code} 的 slug 为 "${t.slug}"，期望 "${expected}"`,
    );
  }
}

// ============================================================================
// 检查 2: compatibility.ts 引用完整性
// ============================================================================

// 2a: type1 / type2 引用必须都在 27 个 code 内
for (let i = 0; i < compatibilityData.length; i++) {
  const c = compatibilityData[i];
  if (!allCodes.has(c.type1)) {
    report(
      '2a-compat-ref',
      'error',
      `compatibilityData[${i}] 的 type1 = "${c.type1}" 不存在于 27 个 code 中`,
    );
  }
  if (!allCodes.has(c.type2)) {
    report(
      '2a-compat-ref',
      'error',
      `compatibilityData[${i}] 的 type2 = "${c.type2}" 不存在于 27 个 code 中`,
    );
  }
}

// 2b: 每种类型至少覆盖 5 次
const coverage = new Map<string, number>();
for (const code of allCodes) coverage.set(code, 0);
for (const c of compatibilityData) {
  if (coverage.has(c.type1)) coverage.set(c.type1, coverage.get(c.type1)! + 1);
  if (coverage.has(c.type2)) coverage.set(c.type2, coverage.get(c.type2)! + 1);
}
const underCovered: { code: string; count: number }[] = [];
for (const [code, count] of coverage.entries()) {
  if (count < 5) underCovered.push({ code, count });
}
if (underCovered.length > 0) {
  for (const u of underCovered) {
    report(
      '2b-coverage',
      'warn',
      `${u.code} 在 compatibilityData 中只出现 ${u.count} 次（期望 >= 5）`,
    );
  }
}

// ============================================================================
// 检查 3: questions.ts ↔ dimensions.ts
// ============================================================================

// 3a: 所有 dimensions / scores key 必须是合法 DimensionKey
for (const q of questions) {
  for (const d of q.dimensions ?? []) {
    if (!allDimensionKeys.has(d)) {
      report(
        '3a-question-dim',
        'error',
        `Question #${q.id} 的 dimensions 包含非法 key: "${d}"`,
      );
    }
  }
  for (const opt of q.options) {
    for (const k of Object.keys(opt.scores)) {
      if (!allDimensionKeys.has(k as DimensionKey)) {
        report(
          '3a-question-score',
          'error',
          `Question #${q.id} option "${opt.id}" 的 scores 包含非法 key: "${k}"`,
        );
      }
    }
  }
}

// 3b: 每个维度恰好被 2 道题打分
// 解读：以 q.dimensions 主维度数组为准（而不是 option.scores，因为 option 会顺带对邻近维度加分）
const questionDimCount = new Map<DimensionKey, number>();
for (const k of allDimensionKeys) questionDimCount.set(k, 0);
for (const q of questions) {
  if (q.isHiddenTrigger) continue; // 隐藏题不计入维度覆盖
  for (const d of q.dimensions ?? []) {
    questionDimCount.set(d, (questionDimCount.get(d) ?? 0) + 1);
  }
}
for (const [key, count] of questionDimCount.entries()) {
  if (count !== 2) {
    report(
      '3b-dim-coverage',
      'error',
      `维度 ${key} 被 ${count} 道常规题覆盖（期望恰好 2 道）`,
    );
  }
}

// ============================================================================
// 检查 4: dimension-groups.ts 对齐
// ============================================================================

const seenInGroups = new Set<DimensionKey>();
for (const [groupKey, group] of Object.entries(dimensionGroups)) {
  for (const d of group.dimensions) {
    if (!allDimensionKeys.has(d as DimensionKey)) {
      report(
        '4a-group-dim',
        'error',
        `dimensionGroups.${groupKey} 包含非法 DimensionKey: "${d}"`,
      );
      continue;
    }
    if (seenInGroups.has(d as DimensionKey)) {
      report(
        '4b-group-dup',
        'error',
        `DimensionKey "${d}" 出现在多个维度组中`,
      );
    }
    seenInGroups.add(d as DimensionKey);
  }
}
// 4b: 所有 15 个维度必须被分组覆盖
for (const k of allDimensionKeys) {
  if (!seenInGroups.has(k)) {
    report(
      '4b-group-missing',
      'error',
      `DimensionKey "${k}" 未在任何 dimensionGroups 分组中`,
    );
  }
}

// ============================================================================
// 输出报告
// ============================================================================

console.log('\n=== DATA LINT REPORT ===\n');
for (const line of info) console.log('•', line);
console.log('');

const errors = findings.filter((f) => f.severity === 'error');
const warns = findings.filter((f) => f.severity === 'warn');

if (findings.length === 0) {
  console.log('✓ 全部检查通过，数据文件完全一致');
} else {
  if (errors.length > 0) {
    console.log(`✗ ${errors.length} 个 ERROR：`);
    for (const e of errors) {
      console.log(`  [${e.check}] ${e.message}`);
    }
    console.log('');
  }
  if (warns.length > 0) {
    console.log(`! ${warns.length} 个 WARN：`);
    for (const w of warns) {
      console.log(`  [${w.check}] ${w.message}`);
    }
    console.log('');
  }
}

console.log('\n=== coverage histogram (compatibilityData) ===');
const sortedCoverage = [...coverage.entries()].sort((a, b) => a[1] - b[1]);
for (const [code, count] of sortedCoverage) {
  const bar = '█'.repeat(count);
  console.log(`  ${code.padEnd(8)} ${String(count).padStart(3)}  ${bar}`);
}

process.exit(errors.length > 0 ? 1 : 0);
