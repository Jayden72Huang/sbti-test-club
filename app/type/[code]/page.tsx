import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { buildMetadata, SITE_URL } from '@/lib/metadata';
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  type FaqItem,
} from '@/lib/schema';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { RadarChart } from '@/components/shared/RadarChart';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { TypePoster } from '@/components/shared/TypePoster';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

import {
  sbtiTypes,
  sbtiTypesBySlug,
  sbtiTypesByCode,
  type SbtiType,
} from '@/data/sbti-types';
import {
  dimensions,
  keyToShort,
  type DimensionKey,
} from '@/data/dimensions';

// ---------------------------------------------------------------------------
// Route params / SSG
// ---------------------------------------------------------------------------

// Next 16: params is a Promise and MUST be awaited.
type RouteParams = { code: string };

interface PageProps {
  params: Promise<RouteParams>;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return sbtiTypes.map((type) => ({ code: type.slug }));
}

// Dictionary lookups exported from data/sbti-types.ts. Slug keys are already
// lowercased; code keys preserve the original casing (e.g. 'WOC!', 'LOVE-R').
function findTypeBySlug(slug: string): SbtiType | undefined {
  return sbtiTypesBySlug[slug.toLowerCase()];
}

function findTypeByCode(code: string): SbtiType | undefined {
  return sbtiTypesByCode[code];
}

// ---------------------------------------------------------------------------
// generateMetadata — per-type title/description/OG
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { code } = await params;
  const type = findTypeBySlug(code);

  if (!type) {
    return buildMetadata({
      title: '类型未找到',
      description: 'SBTI 人格类型未找到',
      path: `/type/${code}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: type.seo.metaTitleCN,
    description: type.seo.metaDescCN,
    path: `/type/${type.slug}`,
    keywords: type.seo.keywordsCN,
    locale: 'zh',
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// FAQ generator — no per-type FAQ in the data file, so we synthesize 5 Q&As
// from the type's own fields. Content is unique per type because it reuses
// the type-specific oneLiner / strengths / weaknesses / compatible / famous.
// ---------------------------------------------------------------------------

function buildFaq(type: SbtiType): FaqItem[] {
  const compatNames = type.compatibleTypes
    .map((c) => findTypeByCode(c))
    .filter((t): t is SbtiType => Boolean(t))
    .map((t) => `${t.code} ${t.nameCN}`)
    .join('、');

  const famous = type.famousExamplesCN.slice(0, 3).join('、');
  const strengthLine = type.strengthsCN.slice(0, 2).join('；');
  const weaknessLine = type.weaknessesCN.slice(0, 2).join('；');

  return [
    {
      q: `SBTI ${type.code} 是什么意思？`,
      a: `${type.code}（${type.nameCN}，${type.nameEN}）是 SBTI 27 种人格中的一种。${type.oneLinerCN} 代表标语是"${type.tagline.zh}"。`,
    },
    {
      q: `SBTI ${type.nameCN}（${type.code}）有哪些优点和缺点？`,
      a: `${type.nameCN}最核心的优点：${strengthLine}。需要警惕的短板：${weaknessLine}。你可以在 15 维度雷达图上看到完整的自我画像。`,
    },
    {
      q: `${type.code} 和哪些 SBTI 类型最配？`,
      a: compatNames
        ? `${type.nameCN}（${type.code}）最适合的配对类型是：${compatNames}。在配对页可以直接查看两两之间的详细匹配度解读。`
        : `${type.nameCN}（${type.code}）的最佳配对暂未定义，可以在 /match 页查看所有组合。`,
    },
    {
      q: `哪些名人属于 SBTI ${type.code} 人格？`,
      a: famous
        ? `我们挑选的 ${type.nameCN}（${type.code}）典型代表包括：${famous}。这些只是参考画像，真正的判断还是看你自己的 31 道题测试结果。`
        : `${type.nameCN}（${type.code}）的名人代表还在整理中。`,
    },
    {
      q: `怎么知道我自己是不是 SBTI ${type.code}？`,
      a: `最快的方式就是花 3 分钟做一次 SBTI 测试，一共 31 道题，系统会基于 15 个维度和 5 个模型的表现，算出你最接近的人格类型。测试完全免费，不需要注册。`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function TypeDetailPage({ params }: PageProps) {
  const { code } = await params;
  const type = findTypeBySlug(code);

  if (!type) {
    notFound();
  }

  const faqItems = buildFaq(type);
  const pageUrl = `${SITE_URL}/type/${type.slug}`;

  // -------- Schemas --------
  const schemas = [
    articleSchema({
      title: type.seo.metaTitleCN,
      description: type.seo.metaDescCN,
      url: `/type/${type.slug}`,
    }),
    faqPageSchema(faqItems),
    breadcrumbSchema([
      { name: '首页', url: '/' },
      { name: '27 类型', url: '/types' },
      { name: `${type.code} ${type.nameCN}`, url: `/type/${type.slug}` },
    ]),
  ];

  // -------- Radar chart data (short codes as keys) --------
  const radarData: Record<string, 'H' | 'M' | 'L'> = {};
  const radarLabels: Record<string, string> = {};
  (Object.keys(type.dimensionScores) as DimensionKey[]).forEach((key) => {
    const short = keyToShort[key];
    radarData[short] = type.dimensionScores[key];
    radarLabels[short] = short;
  });

  // -------- Compatibility cards (lookup by CODE -> slug) --------
  const compatibleCards = type.compatibleTypes
    .map((c) => findTypeByCode(c))
    .filter((t): t is SbtiType => Boolean(t));

  const conflictCards = type.conflictTypes
    .map((c) => findTypeByCode(c))
    .filter((t): t is SbtiType => Boolean(t));

  // -------- Similar types: 3 random other types (stable: slice by index) --------
  const currentIndex = sbtiTypes.findIndex((t) => t.slug === type.slug);
  const similarTypes: SbtiType[] = [];
  for (let i = 1; similarTypes.length < 3 && i < sbtiTypes.length; i += 1) {
    const pick = sbtiTypes[(currentIndex + i) % sbtiTypes.length];
    if (pick.slug !== type.slug && !pick.isSpecial) {
      similarTypes.push(pick);
    }
  }

  const deepParasCN = type.deepAnalysisCN.split('\n\n').filter(Boolean);
  const deepParasEN = type.deepAnalysisEN.split('\n\n').filter(Boolean);

  return (
    <>
      <SchemaJsonLd schema={schemas} id={`schema-type-${type.slug}`} />

      <Nav />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* ================= Breadcrumb ================= */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-5xl px-4 sm:px-6 pt-6"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <li>
              <Link href="/" className="hover:text-purple-300">
                首页
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/types" className="hover:text-purple-300">
                27 类型
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">
              {type.code} {type.nameCN}
            </li>
          </ol>
        </nav>

        {/* ================= Hero ================= */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 0%, ${type.color}55 0%, transparent 60%)`,
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-14 sm:pt-14 sm:pb-20">
            <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-12 md:text-left">
              {/* Left: poster */}
              <div className="shrink-0">
                <TypePoster
                  code={type.code}
                  nameCN={type.nameCN}
                  fallbackEmoji={type.emoji}
                  priority
                  sizes="(max-width: 768px) 200px, 320px"
                  className="size-48 sm:size-56 md:size-72 lg:size-80 rounded-3xl ring-1 ring-white/10 shadow-[0_0_60px_rgba(168,85,247,0.35)]"
                />
              </div>

              {/* Right: info */}
              <div className="flex flex-1 flex-col items-center md:items-start">
                <span
                  className="rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-white"
                  style={{ backgroundColor: type.color }}
                >
                  SBTI · {type.code}
                </span>
                <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
                  {type.code} {type.nameCN} 人格解读
                </h1>
                <p className="mt-2 text-base sm:text-lg font-semibold uppercase tracking-wider text-zinc-400">
                  {type.nameEN}
                </p>

                <div className="mt-6 w-full max-w-2xl space-y-5 text-left">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400/80">
                      口头禅 · Catchphrase
                    </div>
                    <p className="mt-1.5 text-lg sm:text-xl text-purple-200 italic">
                      「{type.tagline.zh}」
                    </p>
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      人格描述 · One-liner
                    </div>
                    <p className="mt-1.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {type.oneLinerCN}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <Button asChild size="lg">
                    <Link href="/test">开始你的 SBTI 测试</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/types">查看 27 类型</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Deep analysis ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <header className="mb-6">
            <Badge variant="default">深度人格解读</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {type.nameCN}（{type.code}）的完整画像
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Deep Analysis · In-depth Personality Reading
            </p>
          </header>

          <div className="prose prose-invert max-w-none space-y-5">
            {deepParasCN.map((para, i) => (
              <p
                key={`cn-${i}`}
                className="text-base leading-[1.9] text-zinc-300"
              >
                {para}
              </p>
            ))}
          </div>

          <details className="group mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <summary className="cursor-pointer list-none text-sm font-semibold text-purple-300 marker:hidden flex items-center gap-2">
              <span>Read English version</span>
              <span
                aria-hidden
                className="inline-block transition-transform group-open:rotate-90"
              >
                →
              </span>
            </summary>
            <div className="mt-4 space-y-4">
              {deepParasEN.map((para, i) => (
                <p
                  key={`en-${i}`}
                  className="text-sm leading-[1.8] text-zinc-400"
                >
                  {para}
                </p>
              ))}
            </div>
          </details>
        </section>

        {/* ================= 15-dimension radar ================= */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <header className="mb-8 text-center">
            <Badge variant="default">15 维度雷达图</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {type.code} 的 15 维人格画像
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              5 大模型 × 3 个维度，共 15 项 SBTI 评分
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
            <Card className="p-6 sm:p-8">
              <RadarChart
                data={radarData}
                labels={radarLabels}
                size={420}
              />
              <p className="mt-4 text-center text-xs text-zinc-500">
                H = 高，M = 中，L = 低
              </p>
            </Card>

            <div className="flex flex-col gap-4">
              {dimensions.map((dim) => {
                const level = type.dimensionScores[dim.key];
                const explain = dim.levels[level];
                const color =
                  level === 'H'
                    ? 'text-emerald-300 border-emerald-500/40 bg-emerald-500/10'
                    : level === 'M'
                      ? 'text-amber-300 border-amber-500/40 bg-amber-500/10'
                      : 'text-rose-300 border-rose-500/40 bg-rose-500/10';
                return (
                  <div
                    key={dim.key}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                          {dim.shortCode} · {dim.groupNameCN}
                        </div>
                        <div className="mt-0.5 text-sm font-black text-white">
                          {dim.nameCN}
                          <span className="ml-2 text-xs font-medium text-zinc-500">
                            {dim.nameEN}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-black ${color}`}
                      >
                        {level}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                      {explain.cn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= Strengths / Weaknesses ================= */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <header className="mb-8 text-center">
            <Badge variant="default">优缺点速览</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {type.nameCN} 的高光与暗面
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <h3 className="text-lg font-black tracking-tight text-white">
                  核心优点
                </h3>
              </div>
              <ul className="space-y-3">
                {type.strengthsCN.map((item, i) => (
                  <li
                    key={`s-${i}`}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                <h3 className="text-lg font-black tracking-tight text-white">
                  需要警惕
                </h3>
              </div>
              <ul className="space-y-3">
                {type.weaknessesCN.map((item, i) => (
                  <li
                    key={`w-${i}`}
                    className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* ================= Compatibility ================= */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <header className="mb-8 text-center">
            <Badge variant="default">配对分析</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {type.code} 和谁最配，又容易和谁相爱相杀
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              点击类型卡片可以直接进入两两配对的详细分析
            </p>
          </header>

          {compatibleCards.length > 0 && (
            <div className="mb-10">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-300">
                最佳配对 · Best Match
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {compatibleCards.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/match?type1=${type.code}&type2=${other.code}`}
                    className="group block rounded-2xl border border-emerald-500/30 bg-zinc-900/60 p-5 transition-all hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-900/20"
                  >
                    <div className="flex items-start justify-between">
                      <span aria-hidden className="text-4xl">
                        {other.emoji}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white"
                        style={{ backgroundColor: other.color }}
                      >
                        {other.code}
                      </span>
                    </div>
                    <div className="mt-4 text-lg font-black text-white">
                      {other.nameCN}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                      {other.nameEN}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {other.tagline.zh}
                    </p>
                    <div className="mt-4 text-xs font-semibold text-emerald-300 opacity-0 transition-opacity group-hover:opacity-100">
                      查看配对 →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {conflictCards.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-rose-300">
                容易冲突 · Hard Mode
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {conflictCards.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/match?type1=${type.code}&type2=${other.code}`}
                    className="group block rounded-2xl border border-rose-500/30 bg-zinc-900/60 p-5 transition-all hover:-translate-y-1 hover:border-rose-400/60 hover:shadow-xl hover:shadow-rose-900/20"
                  >
                    <div className="flex items-start justify-between">
                      <span aria-hidden className="text-4xl">
                        {other.emoji}
                      </span>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white"
                        style={{ backgroundColor: other.color }}
                      >
                        {other.code}
                      </span>
                    </div>
                    <div className="mt-4 text-lg font-black text-white">
                      {other.nameCN}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                      {other.nameEN}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {other.tagline.zh}
                    </p>
                    <div className="mt-4 text-xs font-semibold text-rose-300 opacity-0 transition-opacity group-hover:opacity-100">
                      看看为什么 →
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ================= Recommendations ================= */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <header className="mb-8 text-center">
            <Badge variant="default">专属推荐</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {type.nameCN} 的四件套
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              电影 · 歌曲 · 活动 · 礼物，给每个 {type.code} 准备的日常清单
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RecommendationCard
              icon="🎬"
              title="电影"
              items={type.recommendations.movies.zh}
            />
            <RecommendationCard
              icon="🎵"
              title="歌曲"
              items={type.recommendations.songs.zh}
            />
            <RecommendationCard
              icon="✨"
              title="活动"
              items={type.recommendations.activities.zh}
            />
            <RecommendationCard
              icon="🎁"
              title="礼物"
              items={type.recommendations.gifts.zh}
            />
          </div>
        </section>

        {/* ================= Famous examples ================= */}
        {type.famousExamplesCN.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
            <header className="mb-8 text-center">
              <Badge variant="default">名人代表</Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                这些人，可能也是 {type.code}
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                仅供参考画像，真正的人格还是看你自己的测试结果
              </p>
            </header>
            <Card className="p-6">
              <div className="flex flex-wrap justify-center gap-3">
                {type.famousExamplesCN.map((name, i) => (
                  <span
                    key={`famous-${i}`}
                    className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-200"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* ================= Similar types ================= */}
        {similarTypes.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
            <header className="mb-8 text-center">
              <Badge variant="default">你可能也想看</Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                其他热门 SBTI 类型
              </h2>
            </header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similarTypes.map((other) => (
                <Link
                  key={other.slug}
                  href={`/type/${other.slug}`}
                  className="group block rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-900/20"
                >
                  <div className="flex items-start justify-between">
                    <span aria-hidden className="text-4xl">
                      {other.emoji}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white"
                      style={{ backgroundColor: other.color }}
                    >
                      {other.code}
                    </span>
                  </div>
                  <div className="mt-4 text-lg font-black text-white">
                    {other.nameCN}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                    {other.nameEN}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                    {other.tagline.zh}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= FAQ ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <header className="mb-8 text-center">
            <Badge variant="default">常见问题</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              关于 SBTI {type.code} 的 5 个常见问题
            </h2>
          </header>
          <Accordion
            items={faqItems.map((item, i) => ({
              id: `faq-${i}`,
              question: item.q,
              answer: <p className="text-sm leading-relaxed">{item.a}</p>,
            }))}
            defaultOpen={['faq-0']}
          />
        </section>

        {/* ================= CTA ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 pb-20">
          <Card
            className="p-8 sm:p-12 text-center"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 0%, ${type.color}33 0%, transparent 70%)`,
            }}
          >
            <CardContent className="p-0">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                你是 {type.code} 吗？3 分钟测出你的 SBTI
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400">
                31 道题，15 个维度，27 种人格类型。免费测试，不需要注册。
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link href="/test">立刻开始测试</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/types">浏览所有类型</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-zinc-600">
                Share this page · {pageUrl}
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components (server-side, pure render)
// ---------------------------------------------------------------------------

function RecommendationCard({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: string[];
}) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden className="text-xl">
          {icon}
        </span>
        <h3 className="text-sm font-black uppercase tracking-wider text-white">
          {title}
        </h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={`${title}-${i}`}
            className="text-xs leading-relaxed text-zinc-400"
          >
            · {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
