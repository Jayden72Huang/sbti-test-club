'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { FullMatchReport as ReportData, DimensionComparison } from '@/lib/match-report';
import type { Locale } from '@/lib/i18n';
import type { Verdict } from '@/data/compatibility';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface FullMatchReportProps {
  report: ReportData;
  name1: string;
  name2: string;
  code1: string;
  code2: string;
  color1: string;
  color2: string;
  fights: string[];
  dateIdeas: string[];
  tips: string[];
  roast: string;
  locale?: Locale;
}

// ---------------------------------------------------------------------------
// Dual Radar SVG (inline, no external dep)
// ---------------------------------------------------------------------------

type Level = 'H' | 'M' | 'L';
const lv: Record<Level, number> = { H: 3, M: 2, L: 1 };

function DualRadar({
  dims,
  code1,
  code2,
  color1,
  color2,
}: {
  dims: DimensionComparison[];
  code1: string;
  code2: string;
  color1: string;
  color2: string;
}) {
  const size = 400;
  const center = size / 2;
  const maxR = size * 0.36;
  const labelR = size * 0.45;
  const n = dims.length;

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, level: number) => {
    const a = angle(i);
    const r = (maxR * level) / 3;
    return { x: center + Math.cos(a) * r, y: center + Math.sin(a) * r };
  };
  const poly = (levels: number[]) =>
    levels.map((l, i) => { const p = pt(i, l); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' ');

  const grid = [1, 2, 3].map((l) => poly(dims.map(() => l)));
  const d1 = poly(dims.map((d) => lv[d.level1]));
  const d2 = poly(dims.map((d) => lv[d.level2]));

  return (
    <div>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-sm mx-auto h-auto">
        {/* Grid */}
        {grid.map((pts, i) => (
          <polygon key={i} points={pts} fill="none" stroke="rgb(63 63 70)" strokeWidth={1} strokeDasharray={i < 2 ? '3 4' : undefined} />
        ))}
        {/* Axes */}
        {dims.map((_, i) => {
          const p = pt(i, 3);
          return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="rgb(63 63 70)" strokeWidth={0.5} />;
        })}
        {/* Polygon 1 */}
        <polygon points={d1} fill={`${color1}30`} stroke={color1} strokeWidth={2} strokeLinejoin="round" />
        {/* Polygon 2 */}
        <polygon points={d2} fill={`${color2}30`} stroke={color2} strokeWidth={2} strokeLinejoin="round" strokeDasharray="6 3" />
        {/* Labels */}
        {dims.map((d, i) => {
          const p = pt(i, 3);
          const lp = { x: center + Math.cos(angle(i)) * labelR, y: center + Math.sin(angle(i)) * labelR };
          return (
            <text key={d.shortCode} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="central" className="fill-zinc-400 text-[9px] font-bold">
              {d.shortCode}
            </text>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-3">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 rounded" style={{ backgroundColor: color1 }} />
          <span className="text-xs text-zinc-400">{code1}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 rounded border-b border-dashed" style={{ borderColor: color2 }} />
          <span className="text-xs text-zinc-400">{code2}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gap indicator
// ---------------------------------------------------------------------------

function GapBadge({ gap }: { gap: 0 | 1 | 2 }) {
  if (gap === 0) return <span className="rounded-full bg-green-500/20 text-green-400 px-2 py-0.5 text-[10px] font-bold">一致</span>;
  if (gap === 1) return <span className="rounded-full bg-yellow-500/20 text-yellow-400 px-2 py-0.5 text-[10px] font-bold">小差异</span>;
  return <span className="rounded-full bg-red-500/20 text-red-400 px-2 py-0.5 text-[10px] font-bold">大差异</span>;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function FullMatchReport({
  report,
  name1,
  name2,
  code1,
  code2,
  color1,
  color2,
  fights,
  dateIdeas,
  tips,
  roast,
  locale = 'zh',
}: FullMatchReportProps) {
  const isEn = locale === 'en';

  return (
    <div className="space-y-8">
      {/* ===== Section: Dual Radar ===== */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="default">{isEn ? '15-Dimension Comparison' : '15 维度对比雷达'}</Badge>
          <span className="text-[10px] text-zinc-500">
            {report.overallHarmony} {isEn ? 'aligned' : '项一致'} · {report.overallTension} {isEn ? 'major gaps' : '项大差异'}
          </span>
        </div>
        <Card className="p-4">
          <DualRadar dims={report.dimensions} code1={code1} code2={code2} color1={color1} color2={color2} />
        </Card>
      </section>

      {/* ===== Section: Group Insights ===== */}
      <section>
        <Badge variant="default">{isEn ? 'Five Model Breakdown' : '五大模型解读'}</Badge>
        <div className="mt-4 space-y-3">
          {report.groups.map((g) => (
            <Card key={g.group} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{g.emoji}</span>
                <span className="font-black text-white">{isEn ? g.groupNameEN : g.groupNameCN}</span>
                <span className="ml-auto text-[10px] text-zinc-500">
                  {g.harmonies}✓ {g.tensions}✗
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {isEn ? g.summaryEN : g.summaryCN}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== Section: Dimension Details ===== */}
      <section>
        <Badge variant="default">{isEn ? 'Dimension-by-Dimension' : '逐维度解读'}</Badge>
        <div className="mt-4 space-y-2">
          {report.dimensions.map((d) => (
            <details key={d.key} className="group rounded-xl border border-zinc-800 bg-zinc-900/50">
              <summary className="flex items-center gap-3 p-3 cursor-pointer hover:bg-zinc-800/50">
                <span className="text-[10px] font-mono text-zinc-500 w-6">{d.shortCode}</span>
                <span className="text-sm font-bold text-white flex-1">{isEn ? d.nameEN : d.nameCN}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: color1 }}>{d.level1}</span>
                  <span className="text-zinc-600">vs</span>
                  <span className="text-xs font-bold" style={{ color: color2 }}>{d.level2}</span>
                  <GapBadge gap={d.gap} />
                </div>
              </summary>
              <div className="px-3 pb-3 pt-1 border-t border-zinc-800">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="rounded-lg bg-zinc-800/50 p-2">
                    <div className="text-[9px] font-bold text-zinc-500">{code1} ({d.level1})</div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{isEn ? d.explain1EN : d.explain1CN}</p>
                  </div>
                  <div className="rounded-lg bg-zinc-800/50 p-2">
                    <div className="text-[9px] font-bold text-zinc-500">{code2} ({d.level2})</div>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{isEn ? d.explain2EN : d.explain2CN}</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {isEn ? d.insightEN : d.insightCN}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ===== Section: Communication Guide ===== */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              💬 {isEn ? 'Communication Playbook' : '沟通方式指南'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(isEn ? report.communicationEN : report.communicationCN).map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-blue-400 shrink-0 mt-0.5">💡</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ===== Section: 5 Fights ===== */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              🔥 {isEn ? '5 Most Likely Fights' : '最可能吵的 5 件事'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {fights.map((f, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-red-400 font-black shrink-0 w-5">#{i + 1}</span>
                  <span>{f}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* ===== Section: Date Ideas ===== */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-pink-400 flex items-center gap-2">
              💝 {isEn ? 'Date Ideas' : '约会建议'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-3">
              {dateIdeas.map((d, i) => (
                <div key={i} className="rounded-xl border border-pink-500/20 bg-pink-500/5 p-3">
                  <p className="text-sm text-zinc-200 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== Section: Conflict Resolution ===== */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-400 flex items-center gap-2">
              🛡️ {isEn ? 'Conflict Resolution Guide' : '冲突解决指南'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {(isEn ? report.conflictResolutionEN : report.conflictResolutionCN).map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-amber-400 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ===== Section: Relationship Tips ===== */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              💚 {isEn ? 'Relationship Tips' : '相处 Tips'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tips.map((t, i) => (
                <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                  <span className="text-green-400 shrink-0">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ===== Section: Relationship Phases ===== */}
      <section>
        <Badge variant="default">{isEn ? 'Relationship Timeline' : '关系阶段预测'}</Badge>
        <div className="mt-4 space-y-3">
          {report.phases.map((phase, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{phase.emoji}</span>
                <span className="font-black text-white">{isEn ? phase.nameEN : phase.nameCN}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {isEn ? phase.descEN : phase.descCN}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== Section: Shareable Roast ===== */}
      <section>
        <Card className="bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 border-purple-500/50">
          <CardContent className="p-8 text-center">
            <Badge variant="secondary" className="mb-4">
              ✂️ {isEn ? 'Shareable Roast' : '可分享吐槽'}
            </Badge>
            <p className="text-xl sm:text-2xl font-bold italic text-white">
              「{roast}」
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
