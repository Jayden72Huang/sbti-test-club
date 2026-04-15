import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { buildMetadata, SITE_URL } from '@/lib/metadata';
import { type Locale, localePath } from '@/lib/i18n';
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  speakableSchema,
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
type RouteParams = { lang: string; code: string };

interface PageProps {
  params: Promise<RouteParams>;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const params: RouteParams[] = [];
  for (const type of sbtiTypes) {
    params.push({ lang: 'zh', code: type.slug });
    params.push({ lang: 'en', code: type.slug });
  }
  return params;
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
  const { lang, code } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const type = findTypeBySlug(code);

  if (!type) {
    return buildMetadata({
      title: isEn ? 'Type Not Found' : '类型未找到',
      description: isEn ? 'SBTI personality type not found' : 'SBTI 人格类型未找到',
      path: `/type/${code}`,
      noIndex: true,
    });
  }

  // Build CTR-optimised titles that include compelling specifics (15-dim,
  // radar chart, match, free) rather than generic "Complete Guide" phrasing.
  const ctrTitleCN = `SBTI ${type.code} ${type.nameCN}人格 | 15维分析+配对+雷达图 (免费)`;
  const ctrTitleEN = `SBTI ${type.code} ${type.nameEN} | 15-Dim Analysis + Match + Radar (Free)`;
  const ctrDescCN = `${type.nameCN}（${type.code}）完整人格画像：15 维度雷达图、优缺点、名人代表、情侣配对、电影歌单与专属礼物。${type.oneLinerCN} 免费测试，无需注册。`;
  const ctrDescEN = `${type.nameEN} (${type.code}) full personality portrait: 15-dimension radar chart, strengths & weaknesses, celebrity examples, couple matching, movie & music picks. ${type.oneLinerEN} Free, no signup.`;

  return buildMetadata({
    title: isEn ? ctrTitleEN : ctrTitleCN,
    description: isEn ? ctrDescEN : ctrDescCN,
    path: `/type/${type.slug}`,
    keywords: isEn ? type.seo.keywordsEN : type.seo.keywordsCN,
    locale: isEn ? 'en' : 'zh',
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// FAQ generator — no per-type FAQ in the data file, so we synthesize 5 Q&As
// from the type's own fields. Content is unique per type because it reuses
// the type-specific oneLiner / strengths / weaknesses / compatible / famous.
// ---------------------------------------------------------------------------

function buildFaq(type: SbtiType, isEn: boolean): FaqItem[] {
  const name = isEn ? type.nameEN : type.nameCN;
  const compatNames = type.compatibleTypes
    .map((c) => findTypeByCode(c))
    .filter((t): t is SbtiType => Boolean(t))
    .map((t) => `${t.code} ${isEn ? t.nameEN : t.nameCN}`)
    .join(isEn ? ', ' : '、');

  const famousArr = isEn ? type.famousExamplesEN : type.famousExamplesCN;
  const famous = famousArr.slice(0, 3).join(isEn ? ', ' : '、');
  const strengths = isEn ? type.strengthsEN : type.strengthsCN;
  const weaknesses = isEn ? type.weaknessesEN : type.weaknessesCN;
  const strengthLine = strengths.slice(0, 2).join(isEn ? '; ' : '；');
  const weaknessLine = weaknesses.slice(0, 2).join(isEn ? '; ' : '；');
  const tagline = isEn ? type.tagline.en : type.tagline.zh;

  if (isEn) {
    return [
      {
        q: `What does SBTI ${type.code} mean?`,
        a: `${type.code} (${type.nameEN}) is one of the 27 SBTI personality types. ${type.oneLinerEN} Its signature tagline is "${tagline}".`,
      },
      {
        q: `What are the strengths and weaknesses of SBTI ${type.code}?`,
        a: `Core strengths of ${name}: ${strengthLine}. Watch out for: ${weaknessLine}. Check the 15-dimension radar chart for the full picture.`,
      },
      {
        q: `Which SBTI types are most compatible with ${type.code}?`,
        a: compatNames
          ? `${name} (${type.code}) pairs best with: ${compatNames}. Visit the match page for detailed compatibility breakdowns.`
          : `Best matches for ${name} (${type.code}) are not yet defined. Check /match for all combinations.`,
      },
      {
        q: `Which famous people are SBTI ${type.code}?`,
        a: famous
          ? `Notable ${name} (${type.code}) examples include: ${famous}. These are reference profiles — your real type comes from the 31-question test.`
          : `Famous examples for ${name} (${type.code}) are still being compiled.`,
      },
      {
        q: `How do I know if I'm SBTI ${type.code}?`,
        a: `The quickest way is to take the 3-minute SBTI test — 31 questions across 15 dimensions and 5 models. It's completely free, no sign-up required.`,
      },
    ];
  }

  return [
    {
      q: `SBTI ${type.code} 是什么意思？`,
      a: `${type.code}（${type.nameCN}，${type.nameEN}）是 SBTI 27 种人格中的一种。${type.oneLinerCN} 代表标语是"${tagline}"。`,
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
  const { lang, code } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const type = findTypeBySlug(code);

  if (!type) {
    notFound();
  }

  const faqItems = buildFaq(type, isEn);
  const pageUrl = `${SITE_URL}/type/${type.slug}`;

  // -------- Schemas --------
  const schemas = [
    articleSchema({
      title: isEn ? type.seo.metaTitleEN : type.seo.metaTitleCN,
      description: isEn ? type.seo.metaDescEN : type.seo.metaDescCN,
      url: `/type/${type.slug}`,
      datePublished: '2026-04-10',
      dateModified: '2026-04-14',
    }),
    faqPageSchema(faqItems),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', url: '/' },
      { name: isEn ? '27 Types' : '27 类型', url: '/types' },
      { name: `${type.code} ${isEn ? type.nameEN : type.nameCN}`, url: `/type/${type.slug}` },
    ]),
    speakableSchema(`/type/${type.slug}`, [
      '[data-type-tldr]',
      '[data-type-faq]',
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
  const deepParas = isEn ? deepParasEN : deepParasCN;
  const deepParasAlt = isEn ? deepParasCN : deepParasEN;

  return (
    <>
      <SchemaJsonLd schema={schemas} id={`schema-type-${type.slug}`} />

      <Nav locale={locale} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* ================= Breadcrumb ================= */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-5xl px-4 sm:px-6 pt-6"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <li>
              <Link href={localePath('/', locale)} className="hover:text-purple-300">
                {isEn ? 'Home' : '首页'}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={localePath('/types', locale)} className="hover:text-purple-300">
                {isEn ? '27 Types' : '27 类型'}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">
              {type.code} {isEn ? type.nameEN : type.nameCN}
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
                  {isEn ? `${type.code} ${type.nameEN} Personality` : `${type.code} ${type.nameCN} 人格解读`}
                </h1>
                <p className="mt-2 text-base sm:text-lg font-semibold uppercase tracking-wider text-zinc-400">
                  {isEn ? type.nameCN : type.nameEN}
                </p>

                <div className="mt-6 w-full max-w-2xl space-y-5 text-left">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400/80">
                      {isEn ? 'Catchphrase' : '口头禅 · Catchphrase'}
                    </div>
                    <p className="mt-1.5 text-lg sm:text-xl text-purple-200 italic">
                      {isEn ? `"${type.tagline.en}"` : `「${type.tagline.zh}」`}
                    </p>
                  </div>
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      {isEn ? 'One-liner' : '人格描述 · One-liner'}
                    </div>
                    <p className="mt-1.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {isEn ? type.oneLinerEN : type.oneLinerCN}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                  <Button asChild size="lg">
                    <Link href={localePath('/test', locale)}>{isEn ? 'Take the SBTI Test' : '开始你的 SBTI 测试'}</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href={localePath('/types', locale)}>{isEn ? 'Browse 27 Types' : '查看 27 类型'}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TL;DR quotable block (GEO) ================= */}
        {/*
          This block re-renders existing data in a structure designed to be
          picked up verbatim by LLM-based search engines. The opening sentence
          follows a strict "X is Y that Z" schema so Perplexity / ChatGPT /
          Gemini / Google AI Overview can extract a clean definition. No new
          copy — just a quotable shape around strengths, weaknesses, and
          best matches already on the page.
        */}
        <section data-type-tldr className="mx-auto max-w-3xl px-4 sm:px-6 pt-10">
          <div
            className="rounded-2xl border border-purple-500/30 p-6 sm:p-7"
            style={{
              backgroundImage: `radial-gradient(circle at 0% 0%, ${type.color}22 0%, transparent 60%), radial-gradient(circle at 100% 100%, rgba(168,85,247,0.12) 0%, transparent 60%)`,
            }}
          >
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-300">
              {isEn ? 'TL;DR' : 'TL;DR · 一句话认识这个类型'}
            </div>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-white">
              <strong className="text-white">SBTI {type.code}</strong>
              {isEn
                ? ` (${type.nameEN}) is one of the 27 SBTI personality types. ${type.oneLinerEN}`
                : `（${type.nameCN}，${type.nameEN}）是 SBTI 27 种人格类型中的一种。${type.oneLinerCN}`}
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  {isEn ? '✓ Strengths' : '✓ Strengths · 核心优点'}
                </div>
                <ul className="mt-2 space-y-1 text-sm text-zinc-300 leading-relaxed">
                  {(isEn ? type.strengthsEN : type.strengthsCN).slice(0, 3).map((s, i) => (
                    <li key={`s-${i}`}>· {s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-rose-300">
                  {isEn ? '✗ Weaknesses' : '✗ Weaknesses · 需警惕的短板'}
                </div>
                <ul className="mt-2 space-y-1 text-sm text-zinc-300 leading-relaxed">
                  {(isEn ? type.weaknessesEN : type.weaknessesCN).slice(0, 3).map((w, i) => (
                    <li key={`w-${i}`}>· {w}</li>
                  ))}
                </ul>
              </div>
            </div>
            {compatibleCards.length > 0 && (
              <div className="mt-5 border-t border-zinc-800/80 pt-4 text-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {isEn ? 'Best Matches' : '最佳配对 · Best matches'}
                </span>
                <span className="ml-2 text-zinc-300">
                  {compatibleCards
                    .map((c) => `${c.code} ${isEn ? c.nameEN : c.nameCN}`)
                    .join(isEn ? ', ' : '、')}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ================= Deep analysis ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <header className="mb-6">
            <Badge variant="default">{isEn ? 'Deep Analysis' : '深度人格解读'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `${type.nameEN} (${type.code}) — Full Profile`
                : `${type.nameCN}（${type.code}）的完整画像`}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              {isEn ? 'In-depth Personality Reading' : 'Deep Analysis · In-depth Personality Reading'}
            </p>
          </header>

          <div className="prose prose-invert max-w-none space-y-5">
            {deepParas.map((para, i) => (
              <p
                key={`main-${i}`}
                className="text-base leading-[1.9] text-zinc-300"
              >
                {para}
              </p>
            ))}
          </div>

          <details className="group mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
            <summary className="cursor-pointer list-none text-sm font-semibold text-purple-300 marker:hidden flex items-center gap-2">
              <span>{isEn ? '阅读中文版' : 'Read English version'}</span>
              <span
                aria-hidden
                className="inline-block transition-transform group-open:rotate-90"
              >
                →
              </span>
            </summary>
            <div className="mt-4 space-y-4">
              {deepParasAlt.map((para, i) => (
                <p
                  key={`alt-${i}`}
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
            <Badge variant="default">{isEn ? '15-Dimension Radar' : '15 维度雷达图'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `${type.code} 15-Dimension Profile`
                : `${type.code} 的 15 维人格画像`}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              {isEn
                ? '5 models × 3 dimensions = 15 SBTI scores'
                : '5 大模型 × 3 个维度，共 15 项 SBTI 评分'}
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
                {isEn ? 'H = High, M = Medium, L = Low' : 'H = 高，M = 中，L = 低'}
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
                          {dim.shortCode} · {isEn ? dim.groupNameEN : dim.groupNameCN}
                        </div>
                        <div className="mt-0.5 text-sm font-black text-white">
                          {isEn ? dim.nameEN : dim.nameCN}
                          <span className="ml-2 text-xs font-medium text-zinc-500">
                            {isEn ? dim.nameCN : dim.nameEN}
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
                      {isEn ? explain.en : explain.cn}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= Strengths / Weaknesses ================= */}
        <section
          id="strengths"
          className="mx-auto max-w-5xl px-4 sm:px-6 py-12 scroll-mt-24"
        >
          <header className="mb-8 text-center">
            <Badge variant="default">{isEn ? 'Strengths & Weaknesses' : '优缺点速览'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `${type.nameEN} — Highlights & Blind Spots`
                : `${type.nameCN} 的高光与暗面`}
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <h3 className="text-lg font-black tracking-tight text-white">
                  {isEn ? 'Core Strengths' : '核心优点'}
                </h3>
              </div>
              <ul className="space-y-3">
                {(isEn ? type.strengthsEN : type.strengthsCN).map((item, i) => (
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
                  {isEn ? 'Watch Out For' : '需要警惕'}
                </h3>
              </div>
              <ul className="space-y-3">
                {(isEn ? type.weaknessesEN : type.weaknessesCN).map((item, i) => (
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
            <Badge variant="default">{isEn ? 'Compatibility' : '配对分析'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `${type.code} — Best Matches & Tough Combos`
                : `${type.code} 和谁最配，又容易和谁相爱相杀`}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              {isEn
                ? 'Click any type card to see the full match breakdown'
                : '点击类型卡片可以直接进入两两配对的详细分析'}
            </p>
          </header>

          {compatibleCards.length > 0 && (
            <div className="mb-10">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-emerald-300">
                {isEn ? 'Best Match' : '最佳配对 · Best Match'}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {compatibleCards.map((other) => (
                  <Link
                    key={other.slug}
                    href={`${localePath('/match', locale)}?type1=${type.code}&type2=${other.code}`}
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
                      {isEn ? other.nameEN : other.nameCN}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                      {isEn ? other.nameCN : other.nameEN}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {isEn ? other.tagline.en : other.tagline.zh}
                    </p>
                    <div className="mt-4 text-xs font-semibold text-emerald-300 opacity-0 transition-opacity group-hover:opacity-100">
                      {isEn ? 'View Match →' : '查看配对 →'}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {conflictCards.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-rose-300">
                {isEn ? 'Hard Mode' : '容易冲突 · Hard Mode'}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {conflictCards.map((other) => (
                  <Link
                    key={other.slug}
                    href={`${localePath('/match', locale)}?type1=${type.code}&type2=${other.code}`}
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
                      {isEn ? other.nameEN : other.nameCN}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                      {isEn ? other.nameCN : other.nameEN}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                      {isEn ? other.tagline.en : other.tagline.zh}
                    </p>
                    <div className="mt-4 text-xs font-semibold text-rose-300 opacity-0 transition-opacity group-hover:opacity-100">
                      {isEn ? 'See Why →' : '看看为什么 →'}
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
            <Badge variant="default">{isEn ? 'Recommendations' : '专属推荐'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `${type.nameEN} Starter Pack`
                : `${type.nameCN} 的四件套`}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              {isEn
                ? `Movies, songs, activities & gifts curated for every ${type.code}`
                : `电影 · 歌曲 · 活动 · 礼物，给每个 ${type.code} 准备的日常清单`}
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <RecommendationCard
              icon="🎬"
              title={isEn ? 'Movies' : '电影'}
              items={isEn ? type.recommendations.movies.en : type.recommendations.movies.zh}
            />
            <RecommendationCard
              icon="🎵"
              title={isEn ? 'Songs' : '歌曲'}
              items={isEn ? type.recommendations.songs.en : type.recommendations.songs.zh}
            />
            <RecommendationCard
              icon="✨"
              title={isEn ? 'Activities' : '活动'}
              items={isEn ? type.recommendations.activities.en : type.recommendations.activities.zh}
            />
            <RecommendationCard
              icon="🎁"
              title={isEn ? 'Gifts' : '礼物'}
              items={isEn ? type.recommendations.gifts.en : type.recommendations.gifts.zh}
            />
          </div>
        </section>

        {/* ================= Famous examples ================= */}
        {(isEn ? type.famousExamplesEN : type.famousExamplesCN).length > 0 && (
          <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
            <header className="mb-8 text-center">
              <Badge variant="default">{isEn ? 'Famous Examples' : '名人代表'}</Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                {isEn
                  ? `These people might also be ${type.code}`
                  : `这些人，可能也是 ${type.code}`}
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                {isEn
                  ? 'Reference profiles only — your real type comes from the test'
                  : '仅供参考画像，真正的人格还是看你自己的测试结果'}
              </p>
            </header>
            <Card className="p-6">
              <div className="flex flex-wrap justify-center gap-3">
                {(isEn ? type.famousExamplesEN : type.famousExamplesCN).map((name, i) => (
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
              <Badge variant="default">{isEn ? 'You Might Also Like' : '你可能也想看'}</Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                {isEn ? 'Other Popular SBTI Types' : '其他热门 SBTI 类型'}
              </h2>
            </header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {similarTypes.map((other) => (
                <Link
                  key={other.slug}
                  href={localePath(`/type/${other.slug}`, locale)}
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
                    {isEn ? other.nameEN : other.nameCN}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-zinc-500">
                    {isEn ? other.nameCN : other.nameEN}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-400 line-clamp-2">
                    {isEn ? other.tagline.en : other.tagline.zh}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= FAQ ================= */}
        <section data-type-faq className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <header className="mb-8 text-center">
            <Badge variant="default">{isEn ? 'FAQ' : '常见问题'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `5 Common Questions About SBTI ${type.code}`
                : `关于 SBTI ${type.code} 的 5 个常见问题`}
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
                {isEn
                  ? `Are you a ${type.code}? Find out in 3 minutes`
                  : `你是 ${type.code} 吗？3 分钟测出你的 SBTI`}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400">
                {isEn
                  ? '31 questions, 15 dimensions, 27 personality types. Free, no sign-up.'
                  : '31 道题，15 个维度，27 种人格类型。免费测试，不需要注册。'}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link href={localePath('/test', locale)}>{isEn ? 'Start the Test' : '立刻开始测试'}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={localePath('/types', locale)}>{isEn ? 'Browse All Types' : '浏览所有类型'}</Link>
                </Button>
              </div>
              <p className="mt-4 text-xs text-zinc-600">
                Share this page · {pageUrl}
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer locale={locale} />
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
