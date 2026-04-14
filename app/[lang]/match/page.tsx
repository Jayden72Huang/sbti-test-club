import { Suspense } from 'react';
import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';
import {
  webApplicationSchema,
  faqPageSchema,
  breadcrumbSchema,
} from '@/lib/schema';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

import { seoContent } from '@/data/seo-content';
import MatchClient from './MatchClient';

export const metadata: Metadata = buildMetadata({
  title: seoContent.match.zh.title,
  description: seoContent.match.zh.description,
  path: '/match',
  keywords: [
    'sbti 配对',
    'sbti 情侣',
    'sbti 匹配',
    'sbti compatibility',
    'sbti match',
    'sbti love match',
    'sbti couple test',
    '沙雕人格配对',
  ],
  locale: 'zh',
});

export default async function MatchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const match = seoContent.match[locale] ?? seoContent.match.zh;

  const schemas = [
    webApplicationSchema(),
    faqPageSchema(match.faqs),
    breadcrumbSchema([
      { name: '首页', url: '/' },
      { name: '情侣配对', url: '/match' },
    ]),
  ];

  return (
    <>
      <SchemaJsonLd schema={schemas} id="match-schema" />
      <Nav locale={locale} />
      <main className="bg-zinc-950 text-zinc-100">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 0%, rgba(236,72,153,0.22) 0%, transparent 55%), radial-gradient(circle at 20% 100%, rgba(168,85,247,0.15) 0%, transparent 60%)',
            }}
          />
          <nav
            aria-label="Breadcrumb"
            className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-6"
          >
            <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <li>
                <Link href="/" className="hover:text-purple-300">
                  {isEn ? 'Home' : '首页'}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-zinc-300">{isEn ? 'Match' : '情侣配对'}</li>
            </ol>
          </nav>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-10 pb-12 text-center">
            <Badge variant="default" className="mb-5">
              💘 Soul Matcher
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              {match.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-zinc-300 leading-relaxed">
              {match.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Form (client) */}
        <Suspense
          fallback={
            <div className="text-center py-8 text-zinc-500">
              {isEn ? 'Loading matcher...' : '加载配对器...'}
            </div>
          }
        >
          <MatchClient />
        </Suspense>

        {/* Intro */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <div className="space-y-5">
            {match.intro.split('\n\n').map((para, i) => (
              <p
                key={`match-intro-${i}`}
                className="text-base leading-[1.9] text-zinc-300"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* How to use */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6">
            <h2 className="text-2xl font-black mb-4">{isEn ? 'How to Use' : '怎么用'}</h2>
            <div className="text-zinc-300 leading-[1.9] whitespace-pre-wrap">
              {match.howToUse}
            </div>
          </div>
        </section>

        {/* Sample */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
          <div className="rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 p-6">
            <h2 className="text-2xl font-black mb-4">{isEn ? 'Sample Result' : '示例结果'}</h2>
            <p className="text-zinc-300 leading-[1.9]">{match.sampleResults}</p>
          </div>
        </section>

        {/* Browse all 111 hand-written pairs (SEO hub → spokes) */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-6">
          <Link
            href="/match/all"
            className="group block rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5 p-6 transition-all hover:-translate-y-0.5 hover:border-purple-400/60"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-300">
                  {isEn ? 'Deep Match Atlas' : '深度配对图鉴'}
                </div>
                <h2 className="mt-1.5 text-xl sm:text-2xl font-black text-white">
                  {isEn ? 'Browse 111 Hand-Written SBTI Match Deep Dives →' : '浏览 111 对手写 SBTI 配对深度解读 →'}
                </h2>
                <p className="mt-2 text-sm text-zinc-400">
                  {isEn
                    ? 'Grouped by compatibility: Destiny / Great Match / Workable / Rocky / Doomed. Each pair has a full 1500+ word analysis.'
                    : '按匹配度分组：命中注定 / 非常合拍 / 可以相处 / 有点坎坷 / 难以共存。每对都有完整 1500+ 字解读。'}
                </p>
              </div>
              <span
                aria-hidden
                className="shrink-0 text-2xl text-purple-300 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </Link>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          <h2 className="text-3xl font-black mb-6">{isEn ? 'FAQ' : '常见问题'}</h2>
          <Accordion
            items={match.faqs.map((f, i) => ({
              id: `match-faq-${i}`,
              question: f.q,
              answer: f.a,
            }))}
            defaultOpen={['match-faq-0']}
          />
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-4 pb-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isEn ? "Haven't taken the SBTI yet? Test first, match later" : '还没测 SBTI？先测一下再来配对'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            {isEn ? '31 questions, 3 minutes, free, no sign-up' : '31 道题，3 分钟，免费无需注册'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/test">{isEn ? 'Start the Test →' : '立刻开始测试 →'}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/types">{isEn ? 'View 27 Types' : '查看 27 类型'}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
