import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
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

type RouteParams = { a: string; b: string };
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
export function getAuthoredPairs(): RouteParams[] {
  const seen = new Set<string>();
  const out: RouteParams[] = [];
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
  return getAuthoredPairs();
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
): FaqItem[] {
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
  const { a, b } = await params;
  const slugA = a.toLowerCase();
  const slugB = b.toLowerCase();
  const typeA = sbtiTypesBySlug[slugA];
  const typeB = sbtiTypesBySlug[slugB];

  if (!typeA || !typeB || slugA === slugB) {
    return buildMetadata({
      title: 'SBTI 配对未找到',
      description: '该 SBTI 配对组合不存在。',
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

  const title = `SBTI ${typeA.code} × ${typeB.code} 配对 · ${typeA.nameCN}和${typeB.nameCN}合不合（${compat.scorePercent}% ${verdictLabelCN[compat.verdict]}）`;
  const description = `SBTI ${typeA.code} ${typeA.nameCN} 与 ${typeB.code} ${typeB.nameCN} 的情侣配对深度分析：匹配度 ${compat.scorePercent}%，5 件最可能吵的事，3 条约会建议，3 条相处 tips，一句可分享吐槽。免费无需注册。`;

  return buildMetadata({
    title,
    description,
    path: `/match/${slugA}/${slugB}`,
    keywords: [
      `SBTI ${typeA.code} ${typeB.code}`,
      `SBTI ${typeA.nameCN} ${typeB.nameCN}`,
      `${typeA.code} 和 ${typeB.code} 合不合`,
      `${typeA.nameCN}配${typeB.nameCN}`,
      'SBTI 配对',
      'SBTI 情侣测试',
      `SBTI ${typeA.code}`,
      `SBTI ${typeB.code}`,
      '沙雕人格配对',
      'SBTI couple match',
      `${typeA.code} x ${typeB.code} compatibility`,
    ],
    locale: 'zh',
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function MatchPairPage({ params }: PageProps) {
  const { a, b } = await params;
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

  const faqItems = buildPairFaq(typeA, typeB, compat);

  const schemas = [
    articleSchema({
      title: `SBTI ${typeA.code} × ${typeB.code} 配对分析`,
      description: compat.summaryCN.slice(0, 160),
      url: `/match/${slugA}/${slugB}`,
    }),
    faqPageSchema(faqItems),
    breadcrumbSchema([
      { name: '首页', url: '/' },
      { name: '情侣配对', url: '/match' },
      {
        name: `${typeA.code} × ${typeB.code}`,
        url: `/match/${slugA}/${slugB}`,
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
              <Link href="/match" className="hover:text-purple-300">
                情侣配对
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
                href={`/type/${typeA.slug}`}
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
                    {typeA.nameCN}
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
                href={`/type/${typeB.slug}`}
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
                    {typeB.nameCN}
                  </div>
                </div>
              </Link>
            </div>

            <h1 className="mt-8 text-center text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              SBTI {typeA.code} × {typeB.code} 配对分析
            </h1>
            <p className="mt-3 text-center text-base sm:text-lg text-zinc-400">
              {typeA.nameCN} 和 {typeB.nameCN} 合不合？
            </p>

            {/* Score + verdict */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  匹配度 · Match
                </div>
                <div className="mt-1 text-5xl sm:text-6xl font-black tracking-tight text-white">
                  {compat.scorePercent}
                  <span className="text-2xl text-zinc-500">%</span>
                </div>
              </div>
              <div
                className={`rounded-full border px-4 py-2 text-sm font-black ${verdictClass[compat.verdict]}`}
              >
                {verdictLabelCN[compat.verdict]}
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
              TL;DR · 一句话读懂这对 CP
            </div>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-white">
              <strong>
                SBTI {typeA.code}（{typeA.nameCN}）× {typeB.code}（
                {typeB.nameCN}）
              </strong>{' '}
              的匹配度是 <strong>{compat.scorePercent}%</strong>，属于「
              {verdictLabelCN[compat.verdict]}」级别。{compat.summaryCN}
            </p>
          </div>
        </section>

        {/* ================= Shareable roast card ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
          <div className="rounded-2xl border border-pink-500/40 bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-6 sm:p-8 text-center">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-pink-300 mb-3">
              一句灵魂吐槽 · Shareable Roast
            </div>
            <p className="text-lg sm:text-xl italic text-white leading-relaxed">
              「{compat.shareableRoastCN}」
            </p>
          </div>
        </section>

        {/* ================= 5 Fights ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <header className="mb-5">
            <Badge variant="default">最可能吵的 5 件事</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {typeA.code} 和 {typeB.code} 会为什么吵架
            </h2>
          </header>
          <ul className="space-y-3">
            {compat.fightsCN.map((fight, i) => (
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
            <Badge variant="default">约会建议</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {typeA.nameCN}和{typeB.nameCN}适合做什么
            </h2>
          </header>
          <div className="grid gap-3 sm:grid-cols-3">
            {compat.dateIdeasCN.map((idea, i) => (
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
            <Badge variant="default">相处 tips</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              走到最后需要注意什么
            </h2>
          </header>
          <div className="space-y-3">
            {compat.relationshipTipsCN.map((tip, i) => (
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

        {/* ================= Two types deep links ================= */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <header className="mb-6 text-center">
            <Badge variant="default">深度了解这两种类型</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              看完 {typeA.code} 和 {typeB.code} 的完整人格画像
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
                      {t.nameCN}
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2">
                      {t.tagline.zh}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
                  {t.oneLinerCN}
                </p>
                <Link
                  href={`/type/${t.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-300 hover:text-purple-200"
                >
                  查看 {t.code} 完整解读 →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 border-t border-zinc-900">
          <header className="mb-8 text-center">
            <Badge variant="default">常见问题</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              关于 {typeA.code} × {typeB.code} 配对的 5 个问题
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
              <Badge variant="default">相关配对</Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                你可能也想看看这些 CP
              </h2>
            </header>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {relatedPairs.map(({ p1, p2 }) => (
                <Link
                  key={`${p1.slug}-${p2.slug}`}
                  href={`/match/${p1.slug}/${p2.slug}`}
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
                    {p1.nameCN} × {p2.nameCN}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= Bottom CTA ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            还不知道自己是哪种 SBTI？
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            31 道题 3 分钟，测完就能和 TA 配对一下
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/test">开始 SBTI 测试 →</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/match">回到配对工具</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
