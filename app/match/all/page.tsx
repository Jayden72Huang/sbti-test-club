import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import {
  breadcrumbSchema,
  itemListSchema,
} from '@/lib/schema';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { Badge } from '@/components/ui/Badge';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

import { sbtiTypesByCode } from '@/data/sbti-types';
import { compatibilityData, type Verdict } from '@/data/compatibility';

import { getAuthoredPairs } from '../[a]/[b]/page';

export const metadata: Metadata = buildMetadata({
  title: 'SBTI 配对完整图鉴 · 111 对手写深度解读',
  description:
    'SBTI 情侣配对完整图鉴，111 对手写深度解读：匹配度、5 件最可能吵的事、约会建议、相处 tips、一句灵魂吐槽。按匹配度和类型分组浏览。',
  path: '/match/all',
  keywords: [
    'SBTI 配对列表',
    'SBTI 情侣图鉴',
    'SBTI 匹配度',
    'SBTI CP 大全',
    'SBTI 配对 完整',
    '沙雕人格配对',
  ],
  locale: 'zh',
});

// ---------------------------------------------------------------------------
// Helpers — build an enriched list of authored pairs with metadata needed
// for the browse grid (both types' data + score + verdict).
// ---------------------------------------------------------------------------

const verdictLabelCN: Record<Verdict, string> = {
  destiny: '命中注定 💍',
  great: '非常合拍 💚',
  fine: '可以相处 🤝',
  rocky: '有点坎坷 ⚡',
  doomed: '难以共存 💀',
};

const verdictOrder: Verdict[] = [
  'destiny',
  'great',
  'fine',
  'rocky',
  'doomed',
];

const verdictAccent: Record<Verdict, string> = {
  destiny: 'border-pink-500/40 hover:border-pink-400/80',
  great: 'border-emerald-500/40 hover:border-emerald-400/80',
  fine: 'border-amber-500/40 hover:border-amber-400/80',
  rocky: 'border-orange-500/40 hover:border-orange-400/80',
  doomed: 'border-rose-500/40 hover:border-rose-400/80',
};

export default function MatchAllPage() {
  const authoredPairs = getAuthoredPairs();

  // Enrich each pair with its hand-written compatibility entry + type data.
  const enriched = authoredPairs
    .map(({ a, b }) => {
      const slugToCode: Record<string, string> = {};
      for (const t of Object.values(sbtiTypesByCode)) {
        slugToCode[t.slug] = t.code;
      }
      const codeA = slugToCode[a];
      const codeB = slugToCode[b];
      const typeA = sbtiTypesByCode[codeA];
      const typeB = sbtiTypesByCode[codeB];
      const entry = compatibilityData.find(
        (c) =>
          (c.type1 === codeA && c.type2 === codeB) ||
          (c.type1 === codeB && c.type2 === codeA),
      );
      if (!typeA || !typeB || !entry) return null;
      return {
        a,
        b,
        typeA,
        typeB,
        score: entry.scorePercent,
        verdict: entry.verdict,
        roast: entry.shareableRoastCN,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((x, y) => y.score - x.score);

  // Group by verdict for easier browsing.
  const byVerdict: Record<Verdict, typeof enriched> = {
    destiny: [],
    great: [],
    fine: [],
    rocky: [],
    doomed: [],
  };
  for (const p of enriched) {
    byVerdict[p.verdict].push(p);
  }

  const schemas = [
    breadcrumbSchema([
      { name: '首页', url: '/' },
      { name: '情侣配对', url: '/match' },
      { name: '完整图鉴', url: '/match/all' },
    ]),
    itemListSchema(
      enriched.slice(0, 50).map((p, i) => ({
        name: `SBTI ${p.typeA.code} × ${p.typeB.code} · ${p.score}%`,
        url: `/match/${p.a}/${p.b}`,
        position: i + 1,
        description: p.roast,
      })),
    ),
  ];

  return (
    <>
      <SchemaJsonLd schema={schemas} id="match-all-schema" />

      <Nav />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-6xl px-4 sm:px-6 pt-6"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <li>
              <Link href="/" className="hover:text-purple-300">
                首页
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/match" className="hover:text-purple-300">
                情侣配对
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">完整图鉴</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-10 pb-8 text-center">
          <Badge variant="default" className="mb-4">
            SBTI 配对完整图鉴
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            {enriched.length} 对手写 SBTI 配对分析
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed">
            每对都有独立的深度解读：匹配度、5 件最可能吵的事、3 条约会建议、3
            条相处 tips 和一句灵魂吐槽。点击任意一对，直接进入 1500+
            字完整解读页。
          </p>
          <p className="mt-3 text-xs text-zinc-500">
            按匹配度从高到低分组。TL;DR 段落采用 AI 可引用的结构化写法。
          </p>
        </section>

        {/* Groups by verdict */}
        {verdictOrder.map((v) => {
          const group = byVerdict[v];
          if (group.length === 0) return null;
          return (
            <section
              key={`group-${v}`}
              className="mx-auto max-w-6xl px-4 sm:px-6 py-8"
            >
              <header className="mb-5 flex items-end justify-between">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  {verdictLabelCN[v]}
                </h2>
                <span className="text-xs text-zinc-500">
                  {group.length} 对
                </span>
              </header>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.map((p) => (
                  <Link
                    key={`${p.a}-${p.b}`}
                    href={`/match/${p.a}/${p.b}`}
                    className={`group block rounded-xl border bg-zinc-900/60 p-4 transition-all hover:-translate-y-0.5 hover:bg-zinc-900/90 ${verdictAccent[v]}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="rounded-md px-1.5 py-0.5 text-[9px] font-black text-white"
                          style={{ backgroundColor: p.typeA.color }}
                        >
                          {p.typeA.code}
                        </span>
                        <span className="text-xs text-zinc-500">×</span>
                        <span
                          className="rounded-md px-1.5 py-0.5 text-[9px] font-black text-white"
                          style={{ backgroundColor: p.typeB.color }}
                        >
                          {p.typeB.code}
                        </span>
                      </div>
                      <div className="text-lg font-black text-white">
                        {p.score}
                        <span className="text-xs text-zinc-500">%</span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-bold text-zinc-200 truncate">
                      {p.typeA.nameCN} × {p.typeB.nameCN}
                    </div>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500 line-clamp-2">
                      {p.roast}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 pb-24 text-center border-t border-zinc-900">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            想要测一下你的 SBTI？
          </h2>
          <p className="mt-4 text-sm text-zinc-400">
            31 道题 3 分钟，免费无需注册
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/test"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-lg font-semibold text-white shadow-lg shadow-purple-500/30 hover:brightness-110"
            >
              开始 SBTI 测试 →
            </Link>
            <Link
              href="/match"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-purple-500/60 px-8 text-lg font-semibold text-purple-200 hover:bg-purple-500/10"
            >
              回到配对工具
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
