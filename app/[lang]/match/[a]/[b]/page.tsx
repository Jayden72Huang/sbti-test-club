import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { type Locale, localePath } from '@/lib/i18n';
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  type FaqItem,
} from '@/lib/schema';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { TypePoster } from '@/components/shared/TypePoster';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { MatchShareSection } from '@/components/shared/MatchShareSection';
import { PaywallGate } from '@/components/shared/PaywallGate';

import {
  sbtiTypes,
  sbtiTypesBySlug,
  sbtiTypesByCode,
  type SbtiType,
} from '@/data/sbti-types';
import {
  compatibilityData,
  getCompatibility,
  type Verdict,
  type Compatibility,
} from '@/data/compatibility';

// ---------------------------------------------------------------------------
// Route params / SSG
// ---------------------------------------------------------------------------

type RouteParams = { lang: string; a: string; b: string };
interface PageProps {
  params: Promise<RouteParams>;
}

/**
 * Emit a route ONLY for pairs that have a hand-written Compatibility entry
 * in data/compatibility.ts. This is deliberate: algorithmic fallbacks from
 * getCompatibility() would produce thin template-repeated content that
 * Google's Helpful Content system demotes as low-value. By limiting SSG to
 * the ~111 human-authored unique pairs, every indexed page ships 800+ words
 * of unique copy (summary + 5 fights + 3 dates + 3 tips + roast, all unique
 * per pair).
 *
 * Non-authored pairs 404 under `dynamicParams: false` — the interactive
 * `/match` form still renders them client-side via `/match/result`, so
 * tool functionality is unchanged; we just don't expose the fallback
 * output to search engines.
 */
export const dynamicParams = false;

/**
 * Deduplicated list of canonical (alphabetical) slug pairs that have
 * hand-written compatibility data. Computed once at module load so both
 * generateStaticParams and sitemap can import it.
 */
export function getAuthoredPairs(): { a: string; b: string }[] {
  const seen = new Set<string>();
  const out: { a: string; b: string }[] = [];
  for (const c of compatibilityData) {
    const typeA = sbtiTypesByCode[c.type1];
    const typeB = sbtiTypesByCode[c.type2];
    if (!typeA || !typeB) continue;
    const [a, b] =
      typeA.slug < typeB.slug
        ? [typeA.slug, typeB.slug]
        : [typeB.slug, typeA.slug];
    const key = `${a}|${b}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ a, b });
  }
  return out;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const pairs = getAuthoredPairs();
  const params: RouteParams[] = [];
  for (const { a, b } of pairs) {
    params.push({ lang: 'zh', a, b });
    params.push({ lang: 'en', a, b });
  }
  return params;
}

// ---------------------------------------------------------------------------
// Verdict UI mapping — mirror of /match/result for visual consistency
// ---------------------------------------------------------------------------

const verdictLabelCN: Record<Verdict, string> = {
  destiny: '命中注定 💍',
  great: '非常合拍 💚',
  fine: '可以相处 🤝',
  rocky: '有点坎坷 ⚡',
  doomed: '难以共存 💀',
};

const verdictLabelEN: Record<Verdict, string> = {
  destiny: 'Soulmates 💍',
  great: 'Great Match 💚',
  fine: 'Decent Pair 🤝',
  rocky: 'Rocky Road ⚡',
  doomed: 'Doomed 💀',
};

const verdictClass: Record<Verdict, string> = {
  destiny: 'text-pink-300 border-pink-500/50 bg-pink-500/10',
  great: 'text-emerald-300 border-emerald-500/50 bg-emerald-500/10',
  fine: 'text-amber-300 border-amber-500/50 bg-amber-500/10',
  rocky: 'text-orange-300 border-orange-500/50 bg-orange-500/10',
  doomed: 'text-rose-300 border-rose-500/50 bg-rose-500/10',
};

// ---------------------------------------------------------------------------
// FAQ generator — 5 Q&As synthesised from the compatibility record so each
// pair page has a unique, indexable FAQPage schema block.
// ---------------------------------------------------------------------------

function buildPairFaq(
  a: SbtiType,
  b: SbtiType,
  compat: Compatibility,
  isEn: boolean,
): FaqItem[] {
  if (isEn) {
    const fightsShort = compat.fightsEN.slice(0, 3).join('; ');
    return [
      {
        q: `Are SBTI ${a.code} and ${b.code} compatible? What's their match score?`,
        a: `${a.nameEN} (${a.code}) and ${b.nameEN} (${b.code}) have an SBTI compatibility score of ${compat.scorePercent}%, rated "${verdictLabelEN[compat.verdict]}". ${compat.summaryEN}`,
      },
      {
        q: `What do ${a.code} and ${b.code} fight about most?`,
        a: `${a.nameEN} (${a.code}) paired with ${b.nameEN} (${b.code}) — the top 3 fight triggers are: ${fightsShort}. See all 5 common fights in the section above.`,
      },
      {
        q: `What are good date ideas for ${a.nameEN} and ${b.nameEN}?`,
        a: `We've picked 3 date ideas tailored for the ${a.code} × ${b.code} pair, including: ${compat.dateIdeasEN.slice(0, 2).join(', ')}, and more. See the full list in the date ideas section.`,
      },
      {
        q: `Can ${a.code} and ${b.code} last long-term?`,
        a: `Based on SBTI's 15-dimension algorithm and manual calibration, ${a.nameEN} (${a.code}) and ${b.nameEN} (${b.code}) fall into the "${verdictLabelEN[compat.verdict]}" category. ${compat.scorePercent >= 70 ? 'Overall their long-term outlook is optimistic, as long as both give each other room to grow.' : compat.scorePercent >= 50 ? 'Their relationship requires active effort from both sides — chemistry alone won\'t cut it.' : 'The challenges are significant — they\'ll need very intentional communication and boundaries.'}`,
      },
      {
        q: `How is SBTI compatibility calculated?`,
        a: `SBTI pairing is based on the Manhattan distance of 15-dimension personality vectors. The pattern difference between ${a.code} (${a.pattern}) and ${b.code} (${b.pattern}) is converted into a 0–100 match percentage, then refined with manually calibrated verdicts (destiny / great / fine / rocky / doomed) for relationship advice. Completely free, no sign-up required.`,
      },
    ];
  }

  const fightsShort = compat.fightsCN.slice(0, 3).join('；');
  return [
    {
      q: `SBTI ${a.code} 和 ${b.code} 合不合？匹配度是多少？`,
      a: `${a.nameCN}（${a.code}）和 ${b.nameCN}（${b.code}）的 SBTI 匹配度是 ${compat.scorePercent}%，评级为「${verdictLabelCN[compat.verdict]}」。${compat.summaryCN}`,
    },
    {
      q: `${a.code} 和 ${b.code} 在一起最容易吵什么？`,
      a: `${a.nameCN}（${a.code}）配 ${b.nameCN}（${b.code}），最容易引发争吵的 3 件事是：${fightsShort}。完整的 5 大吵架点可以在本页面中间查看。`,
    },
    {
      q: `${a.nameCN}和${b.nameCN}约会适合做什么？`,
      a: `本站针对 ${a.code} × ${b.code} 组合挑选了 3 个最适合他们的约会方式，包括：${compat.dateIdeasCN.slice(0, 2).join('、')} 等。完整清单在约会建议区。`,
    },
    {
      q: `${a.code} 和 ${b.code} 可以走到最后吗？`,
      a: `根据 SBTI 15 维度算法和人工校准，${a.nameCN}（${a.code}）和 ${b.nameCN}（${b.code}）的组合属于「${verdictLabelCN[compat.verdict]}」类型。${compat.scorePercent >= 70 ? '整体来看他们的长期稳定性是比较乐观的，只要彼此给予成长空间。' : compat.scorePercent >= 50 ? '他们的关系需要双方主动经营，不能完全靠缘分。' : '关系面临的挑战比较大，需要非常清醒的相处方式。'}`,
    },
    {
      q: `SBTI 配对是根据什么算出来的？`,
      a: `SBTI 配对基于 15 维度的人格向量曼哈顿距离。${a.code}（${a.pattern}）和 ${b.code}（${b.pattern}）的 pattern 差异被算法转化为 0-100 的匹配百分比，再由人工校准的 verdict 解读（destiny / great / fine / rocky / doomed）给出相处建议。完全免费，无需注册。`,
    },
  ];
}

// ---------------------------------------------------------------------------
// generateMetadata — fully unique TDH per pair for SEO
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, a, b } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const slugA = a.toLowerCase();
  const slugB = b.toLowerCase();
  const typeA = sbtiTypesBySlug[slugA];
  const typeB = sbtiTypesBySlug[slugB];

  if (!typeA || !typeB || slugA === slugB) {
    return buildMetadata({
      title: isEn ? 'SBTI Match Not Found' : 'SBTI 配对未找到',
      description: isEn ? 'This SBTI match combination does not exist.' : '该 SBTI 配对组合不存在。',
      path: `/match/${a}/${b}`,
      noIndex: true,
    });
  }

  const compat = getCompatibility(
    typeA.code,
    typeB.code,
    typeA.pattern,
    typeB.pattern,
  );

  const verdictLabel = isEn ? verdictLabelEN[compat.verdict] : verdictLabelCN[compat.verdict];
  const nameA = isEn ? typeA.nameEN : typeA.nameCN;
  const nameB = isEn ? typeB.nameEN : typeB.nameCN;

  const title = isEn
    ? `SBTI ${typeA.code} × ${typeB.code} Match · ${nameA} & ${nameB} Compatibility (${compat.scorePercent}% ${verdictLabel})`
    : `SBTI ${typeA.code} × ${typeB.code} 配对 · ${nameA}和${nameB}合不合（${compat.scorePercent}% ${verdictLabel}）`;
  const description = isEn
    ? `SBTI ${typeA.code} ${nameA} & ${typeB.code} ${nameB} couple compatibility deep dive: ${compat.scorePercent}% match, 5 common fights, 3 date ideas, 3 relationship tips, and a shareable roast. Free, no sign-up.`
    : `SBTI ${typeA.code} ${nameA} 与 ${typeB.code} ${nameB} 的情侣配对深度分析：匹配度 ${compat.scorePercent}%，5 件最可能吵的事，3 条约会建议，3 条相处 tips，一句可分享吐槽。免费无需注册。`;

  return buildMetadata({
    title,
    description,
    path: localePath(`/match/${slugA}/${slugB}`, locale),
    keywords: [
      `SBTI ${typeA.code} ${typeB.code}`,
      `SBTI ${nameA} ${nameB}`,
      isEn ? `${typeA.code} and ${typeB.code} compatibility` : `${typeA.code} 和 ${typeB.code} 合不合`,
      isEn ? `${nameA} x ${nameB}` : `${nameA}配${nameB}`,
      isEn ? 'SBTI match' : 'SBTI 配对',
      isEn ? 'SBTI couple test' : 'SBTI 情侣测试',
      `SBTI ${typeA.code}`,
      `SBTI ${typeB.code}`,
      isEn ? 'personality match' : '沙雕人格配对',
      'SBTI couple match',
      `${typeA.code} x ${typeB.code} compatibility`,
    ],
    locale,
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function MatchPairPage({ params }: PageProps) {
  const { lang, a, b } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const slugA = a.toLowerCase();
  const slugB = b.toLowerCase();

  if (slugA === slugB) notFound();

  const typeA = sbtiTypesBySlug[slugA];
  const typeB = sbtiTypesBySlug[slugB];

  if (!typeA || !typeB) notFound();

  const compat = getCompatibility(
    typeA.code,
    typeB.code,
    typeA.pattern,
    typeB.pattern,
  );

  const nameA = isEn ? typeA.nameEN : typeA.nameCN;
  const nameB = isEn ? typeB.nameEN : typeB.nameCN;
  const verdictLabel = isEn ? verdictLabelEN[compat.verdict] : verdictLabelCN[compat.verdict];
  const summary = isEn ? compat.summaryEN : compat.summaryCN;
  const fights = isEn ? compat.fightsEN : compat.fightsCN;
  const dateIdeas = isEn ? compat.dateIdeasEN : compat.dateIdeasCN;
  const relationshipTips = isEn ? compat.relationshipTipsEN : compat.relationshipTipsCN;
  const roast = isEn ? compat.shareableRoastEN : compat.shareableRoastCN;

  const faqItems = buildPairFaq(typeA, typeB, compat, isEn);

  const schemas = [
    articleSchema({
      title: isEn
        ? `SBTI ${typeA.code} × ${typeB.code} Match Analysis`
        : `SBTI ${typeA.code} × ${typeB.code} 配对分析`,
      description: summary.slice(0, 160),
      url: localePath(`/match/${slugA}/${slugB}`, locale),
    }),
    faqPageSchema(faqItems),
    breadcrumbSchema([
      { name: isEn ? 'Home' : '首页', url: localePath('/', locale) },
      { name: isEn ? 'Match' : '情侣配对', url: localePath('/match', locale) },
      {
        name: `${typeA.code} × ${typeB.code}`,
        url: localePath(`/match/${slugA}/${slugB}`, locale),
      },
    ]),
  ];

  // 6 related pairs for internal linking. Deterministic (no Math.random)
  // so SSG output is stable across builds: alternate between partnering
  // "other" with typeA vs typeB using the index parity. Each resulting
  // pair is re-ordered alphabetically to match its canonical URL.
  const relatedPairs = sbtiTypes
    .filter((t) => t.slug !== typeA.slug && t.slug !== typeB.slug)
    .slice(0, 6)
    .map((other, i) => {
      const partner = i % 2 === 0 ? typeA : typeB;
      const [p1, p2] =
        partner.slug < other.slug
          ? [partner, other]
          : [other, partner];
      return { p1, p2 };
    });

  return (
    <>
      <SchemaJsonLd
        schema={schemas}
        id={`schema-pair-${slugA}-${slugB}`}
      />

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
              <Link href={localePath('/match', locale)} className="hover:text-purple-300">
                {isEn ? 'Match' : '情侣配对'}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">
              {typeA.code} × {typeB.code}
            </li>
          </ol>
        </nav>

        {/* ================= Hero ================= */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 0%, ${typeA.color}44 0%, transparent 50%), radial-gradient(circle at 80% 100%, ${typeB.color}44 0%, transparent 50%)`,
            }}
          />
          <div className="relative mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-14 sm:pt-14 sm:pb-18">
            {/* Two posters */}
            <div className="flex items-center justify-center gap-4 sm:gap-8">
              <Link
                href={localePath(`/type/${typeA.slug}`, locale)}
                className="group flex flex-col items-center gap-3"
              >
                <TypePoster
                  code={typeA.code}
                  nameCN={typeA.nameCN}
                  fallbackEmoji={typeA.emoji}
                  priority
                  sizes="(max-width: 640px) 120px, 180px"
                  className="size-28 sm:size-36 md:size-44 rounded-3xl ring-2 ring-white/10 transition-transform group-hover:scale-105"
                />
                <div className="text-center">
                  <div
                    className="text-[10px] font-black uppercase tracking-wider text-white rounded-full px-2 py-0.5 inline-block"
                    style={{ backgroundColor: typeA.color }}
                  >
                    {typeA.code}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    {nameA}
                  </div>
                </div>
              </Link>

              <div className="flex flex-col items-center text-pink-300">
                <span className="text-3xl sm:text-5xl">💘</span>
                <span className="text-[10px] font-black uppercase tracking-widest mt-1">
                  match
                </span>
              </div>

              <Link
                href={localePath(`/type/${typeB.slug}`, locale)}
                className="group flex flex-col items-center gap-3"
              >
                <TypePoster
                  code={typeB.code}
                  nameCN={typeB.nameCN}
                  fallbackEmoji={typeB.emoji}
                  priority
                  sizes="(max-width: 640px) 120px, 180px"
                  className="size-28 sm:size-36 md:size-44 rounded-3xl ring-2 ring-white/10 transition-transform group-hover:scale-105"
                />
                <div className="text-center">
                  <div
                    className="text-[10px] font-black uppercase tracking-wider text-white rounded-full px-2 py-0.5 inline-block"
                    style={{ backgroundColor: typeB.color }}
                  >
                    {typeB.code}
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    {nameB}
                  </div>
                </div>
              </Link>
            </div>

            <h1 className="mt-8 text-center text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              {isEn
                ? `SBTI ${typeA.code} × ${typeB.code} Match Analysis`
                : `SBTI ${typeA.code} × ${typeB.code} 配对分析`}
            </h1>
            <p className="mt-3 text-center text-base sm:text-lg text-zinc-400">
              {isEn
                ? `Are ${nameA} and ${nameB} compatible?`
                : `${nameA} 和 ${nameB} 合不合？`}
            </p>

            {/* Score + verdict */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {isEn ? 'Compatibility · Score' : '匹配度 · Match'}
                </div>
                <div className="mt-1 text-5xl sm:text-6xl font-black tracking-tight text-white">
                  {compat.scorePercent}
                  <span className="text-2xl text-zinc-500">%</span>
                </div>
              </div>
              <div
                className={`rounded-full border px-4 py-2 text-sm font-black ${verdictClass[compat.verdict]}`}
              >
                {verdictLabel}
              </div>
            </div>
          </div>
        </section>

        {/* ================= TL;DR quotable block ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-6">
          <div
            className="rounded-2xl border border-purple-500/30 p-6 sm:p-7"
            style={{
              backgroundImage: `radial-gradient(circle at 0% 0%, ${typeA.color}22 0%, transparent 60%), radial-gradient(circle at 100% 100%, ${typeB.color}22 0%, transparent 60%)`,
            }}
          >
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-300">
              {isEn ? 'TL;DR · This Pair in One Line' : 'TL;DR · 一句话读懂这对 CP'}
            </div>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-white">
              <strong>
                SBTI {typeA.code}（{nameA}）× {typeB.code}（
                {nameB}）
              </strong>{' '}
              {isEn
                ? <>scored <strong>{compat.scorePercent}%</strong> compatibility, rated &ldquo;{verdictLabel}&rdquo;. {summary}</>
                : <>的匹配度是 <strong>{compat.scorePercent}%</strong>，属于「{verdictLabel}」级别。{summary}</>}
            </p>
          </div>
        </section>

        {/* ================= Shareable roast card ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <div className="rounded-2xl border border-pink-500/40 bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-6 sm:p-8 text-center">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-pink-300 mb-3">
              {isEn ? 'Shareable Roast' : '一句灵魂吐槽 · Shareable Roast'}
            </div>
            <p className="text-lg sm:text-xl italic text-white leading-relaxed">
              {isEn ? `"${roast}"` : `「${roast}」`}
            </p>
          </div>
        </section>

        {/* ================= Premium gated content ================= */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <PaywallGate
          productId={`match-${slugA}-${slugB}`}
          headline={isEn ? 'Unlock Full Compatibility Report' : '解锁完整配对报告'}
          description={isEn
            ? `See what ${nameA} & ${nameB} fight about, best date ideas, and how to make it last`
            : `看看 ${nameA} 和 ${nameB} 最可能因为什么吵架、最适合一起做什么、怎样相处更长久`}
          priceLabel="$2.99"
          ctaText={isEn ? '🔓 Unlock Full Report $2.99' : undefined}
        >

        {/* ================= 5 Fights ================= */}
        <section className="py-8">
          <header className="mb-5">
            <Badge variant="default">{isEn ? '5 Most Likely Fights' : '最可能吵的 5 件事'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `What ${typeA.code} and ${typeB.code} Fight About`
                : `${typeA.code} 和 ${typeB.code} 会为什么吵架`}
            </h2>
          </header>
          <ul className="space-y-3">
            {fights.map((fight, i) => (
              <li
                key={`fight-${i}`}
                className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
              >
                <span className="text-sm font-black text-rose-400 shrink-0">
                  #{i + 1}
                </span>
                <span className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                  {fight}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ================= Date Ideas ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <header className="mb-5">
            <Badge variant="default">{isEn ? 'Date Ideas' : '约会建议'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `Best Date Ideas for ${nameA} & ${nameB}`
                : `${nameA}和${nameB}适合做什么`}
            </h2>
          </header>
          <div className="grid gap-3 sm:grid-cols-3">
            {dateIdeas.map((idea, i) => (
              <div
                key={`date-${i}`}
                className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4"
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-purple-300">
                  Idea {i + 1}
                </div>
                <p className="mt-1.5 text-sm text-zinc-200 leading-relaxed">
                  {idea}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= Relationship Tips ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <header className="mb-5">
            <Badge variant="default">{isEn ? 'Relationship Tips' : '相处 tips'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn ? 'Tips for Going the Distance' : '走到最后需要注意什么'}
            </h2>
          </header>
          <div className="space-y-3">
            {relationshipTips.map((tip, i) => (
              <div
                key={`tip-${i}`}
                className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4"
              >
                <span className="text-emerald-400 shrink-0">✓</span>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        </PaywallGate>
        </div>

        {/* ================= Two types deep links ================= */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <header className="mb-6 text-center">
            <Badge variant="default">{isEn ? 'Explore Both Types' : '深度了解这两种类型'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `Full Personality Profiles: ${typeA.code} & ${typeB.code}`
                : `看完 ${typeA.code} 和 ${typeB.code} 的完整人格画像`}
            </h2>
          </header>
          <div className="grid gap-5 md:grid-cols-2">
            {[typeA, typeB].map((t) => (
              <Card key={t.slug} className="p-6">
                <div className="flex items-start gap-4">
                  <TypePoster
                    code={t.code}
                    nameCN={t.nameCN}
                    fallbackEmoji={t.emoji}
                    sizes="80px"
                    className="size-20 rounded-xl shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.code}
                    </div>
                    <div className="mt-1 text-lg font-black text-white">
                      {isEn ? t.nameEN : t.nameCN}
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                      {isEn ? t.tagline.en : t.tagline.zh}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                  {isEn ? t.oneLinerEN : t.oneLinerCN}
                </p>
                <Link
                  href={localePath(`/type/${t.slug}`, locale)}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-300 hover:text-purple-200"
                >
                  {isEn ? `View ${t.code} Full Profile →` : `查看 ${t.code} 完整解读 →`}
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 border-t border-zinc-900">
          <header className="mb-8 text-center">
            <Badge variant="default">{isEn ? 'FAQ' : '常见问题'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn
                ? `5 Questions About ${typeA.code} × ${typeB.code}`
                : `关于 ${typeA.code} × ${typeB.code} 配对的 5 个问题`}
            </h2>
          </header>
          <Accordion
            items={faqItems.map((f, i) => ({
              id: `pair-faq-${i}`,
              question: f.q,
              answer: <p className="text-sm sm:text-base leading-[1.9]">{f.a}</p>,
            }))}
            defaultOpen={['pair-faq-0']}
          />
        </section>

        {/* ================= Related pairs ================= */}
        {relatedPairs.length > 0 && (
          <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12 border-t border-zinc-900">
            <header className="mb-6">
              <Badge variant="default">{isEn ? 'Related Pairs' : '相关配对'}</Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                {isEn ? 'You Might Also Like These Pairs' : '你可能也想看看这些 CP'}
              </h2>
            </header>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {relatedPairs.map(({ p1, p2 }) => (
                <Link
                  key={`${p1.slug}-${p2.slug}`}
                  href={localePath(`/match/${p1.slug}/${p2.slug}`, locale)}
                  className="group flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 transition-all hover:border-purple-500/50 hover:bg-zinc-900/80"
                >
                  <div className="flex items-center gap-1">
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[9px] font-black text-white"
                      style={{ backgroundColor: p1.color }}
                    >
                      {p1.code}
                    </span>
                    <span className="text-xs text-zinc-500">×</span>
                    <span
                      className="rounded-md px-1.5 py-0.5 text-[9px] font-black text-white"
                      style={{ backgroundColor: p2.color }}
                    >
                      {p2.code}
                    </span>
                  </div>
                  <span className="flex-1 truncate text-sm text-zinc-300 group-hover:text-white">
                    {isEn ? `${p1.nameEN} × ${p2.nameEN}` : `${p1.nameCN} × ${p2.nameCN}`}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= Share ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 border-t border-zinc-900">
          <MatchShareSection
            type1={{ code: typeA.code, nameCN: typeA.nameCN, emoji: typeA.emoji, color: typeA.color }}
            type2={{ code: typeB.code, nameCN: typeB.nameCN, emoji: typeB.emoji, color: typeB.color }}
            scorePercent={compat.scorePercent}
            verdict={compat.verdict}
            summary={summary}
            roast={roast}
            locale={locale}
          />
        </section>

        {/* ================= Bottom CTA ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {isEn ? "Don't know your SBTI yet?" : '还不知道自己是哪种 SBTI？'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            {isEn ? '31 questions, 3 minutes — then match with anyone' : '31 道题 3 分钟，测完就能和 TA 配对一下'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={localePath('/test', locale)}>{isEn ? 'Take the SBTI Test →' : '开始 SBTI 测试 →'}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath('/match', locale)}>{isEn ? 'Back to Match Tool' : '回到配对工具'}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
