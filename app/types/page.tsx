import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import {
  articleSchema,
  breadcrumbSchema,
  itemListSchema,
} from '@/lib/schema';

import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

import { sbtiTypes, type SbtiType } from '@/data/sbti-types';
import { dimensions, type DimensionKey } from '@/data/dimensions';
import { dimensionGroups } from '@/data/dimension-groups';
import { seoContent } from '@/data/seo-content';

import TypesExplorer, { type GroupKey } from './TypesExplorer';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = buildMetadata({
  title: seoContent.types.zh.title,
  description: seoContent.types.zh.description,
  path: '/types',
  keywords: [
    'SBTI 类型',
    '27 种 SBTI 人格',
    'SBTI 类型列表',
    'SBTI 图鉴',
    'SBTI 全部类型',
    'SBTI types',
    '沙雕人格',
  ],
  locale: 'zh',
});

// ---------------------------------------------------------------------------
// Group classification
// ---------------------------------------------------------------------------

// Map each dimension key to its group for quick lookup.
const keyToGroup: Record<string, GroupKey> = Object.fromEntries(
  dimensions.map((d) => [d.key, d.group as GroupKey]),
);

// Score a type for a given group: sum of H/M/L weights for that group's
// 3 dimensions. H=3, M=2, L=1.
const levelWeight: Record<'H' | 'M' | 'L', number> = { H: 3, M: 2, L: 1 };

function dominantGroup(type: SbtiType): GroupKey {
  const scores: Record<GroupKey, number> = {
    self: 0,
    emotion: 0,
    attitude: 0,
    action: 0,
    social: 0,
  };
  (Object.keys(type.dimensionScores) as DimensionKey[]).forEach((key) => {
    const group = keyToGroup[key];
    if (!group) return;
    scores[group] += levelWeight[type.dimensionScores[key]];
  });
  // Pick the group with the highest score. Ties broken by predefined order.
  const order: GroupKey[] = ['self', 'emotion', 'attitude', 'action', 'social'];
  return order.reduce(
    (best, g) => (scores[g] > scores[best] ? g : best),
    order[0],
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TypesPage() {
  const content = seoContent.types.zh;

  // Precompute group assignments on the server so the client bundle stays
  // small. We ship pure serializable data across the boundary.
  const typesWithGroup = sbtiTypes.map((type) => ({
    code: type.code,
    slug: type.slug,
    nameCN: type.nameCN,
    nameEN: type.nameEN,
    emoji: type.emoji,
    color: type.color,
    taglineZh: type.tagline.zh,
    group: dominantGroup(type),
    isSpecial: type.isSpecial,
  }));

  // JSON-LD
  const schemas = [
    articleSchema({
      title: content.title,
      description: content.description,
      url: '/types',
    }),
    itemListSchema(
      sbtiTypes.map((type, index) => ({
        name: `${type.code} ${type.nameCN}`,
        url: `/type/${type.slug}`,
        position: index + 1,
        description: type.oneLinerCN,
      })),
    ),
    breadcrumbSchema([
      { name: '首页', url: '/' },
      { name: '27 类型', url: '/types' },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd schema={schemas} id="types-schema" />

      <Nav />

      <main className="bg-zinc-950 text-zinc-100">
        {/* ================= Hero ================= */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.22) 0%, transparent 55%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.15) 0%, transparent 60%)',
            }}
          />

          <nav
            aria-label="Breadcrumb"
            className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-6"
          >
            <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <li>
                <Link href="/" className="hover:text-purple-300">
                  首页
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-zinc-300">27 类型</li>
            </ol>
          </nav>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-10 pb-16 sm:pt-14 sm:pb-20 text-center">
            <Badge variant="default" className="mb-5">
              完整图鉴 · Soul Atlas
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white">
              {content.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed">
              {content.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/test">测测我是哪一种 →</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/match">做一次配对分析</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ================= Intro ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <div className="space-y-5">
            {content.intro.split('\n\n').map((para, i) => (
              <p
                key={`intro-${i}`}
                className="text-base leading-[1.9] text-zinc-300"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* ================= Explorer (client tabs) ================= */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
          <TypesExplorer
            types={typesWithGroup}
            groups={Object.values(dimensionGroups).map((g) => ({
              key: g.key as GroupKey,
              labelCN: g.labelCN,
              labelEN: g.labelEN,
              emoji: g.emoji,
              descCN: g.descCN,
            }))}
            categoryIntros={content.categoryIntros}
          />
        </section>

        {/* ================= CTA ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-10 pb-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            知道了 27 种，接下来该知道你是哪一种
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            31 道题，3 分钟，不需要注册
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/test">立刻开始测试 →</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
