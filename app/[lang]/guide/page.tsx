import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';
import {
  breadcrumbSchema,
  itemListSchema,
} from '@/lib/schema';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { Badge } from '@/components/ui/Badge';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

import { guides } from '@/data/guides';

export const metadata: Metadata = buildMetadata({
  title: 'SBTI 深度指南 · 从入门到精通',
  description:
    'SBTI 沙雕人格测试的完整指南库。SBTI 是什么、和 MBTI 的区别、27 种类型解读、情侣配对、隐藏 DRUNK 触发条件——所有关于 SBTI 的问题都有深度文章。',
  path: '/guide',
  keywords: [
    'SBTI 指南',
    'SBTI 教程',
    'SBTI 是什么',
    'SBTI vs MBTI',
    'SBTI 怎么测',
    'SBTI 知识',
  ],
  locale: 'zh',
});

export default async function GuideIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const schemas = [
    breadcrumbSchema([
      { name: '首页', url: '/' },
      { name: '指南', url: '/guide' },
    ]),
    itemListSchema(
      guides.map((g, i) => ({
        name: g.title,
        url: `/guide/${g.slug}`,
        position: i + 1,
        description: g.subtitle,
      })),
    ),
  ];

  return (
    <>
      <SchemaJsonLd schema={schemas} id="guide-index-schema" />

      <Nav locale={locale} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-5xl px-4 sm:px-6 pt-6"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <li>
              <Link href="/" className="hover:text-purple-300">
                {isEn ? 'Home' : '首页'}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300">{isEn ? 'Guides' : '指南'}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.22) 0%, transparent 55%)',
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-12 pb-12 text-center">
            <Badge variant="default" className="mb-5">
              {isEn ? 'SBTI Guides' : 'SBTI 深度指南'}
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              {isEn ? 'Everything about SBTI, all in one place' : '关于 SBTI 的一切，都在这里'}
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed">
              {isEn
                ? 'From "What is SBTI?" to "7 differences between SBTI and MBTI" — each guide is a 2000+ word deep dive to help you fully understand this viral personality test.'
                : '从"SBTI 是什么"到"SBTI 和 MBTI 的 7 大区别"，每篇指南都是 2000+ 字的深度长文，帮你彻底搞懂这个 2026 爆火的沙雕人格测试。'}
            </p>
          </div>
        </section>

        {/* Guide grid */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
          <div className="grid gap-5 md:grid-cols-2">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guide/${g.slug}`}
                className="group block rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20"
              >
                <div className="text-[10px] font-black uppercase tracking-wider text-purple-300">
                  {g.datePublished}
                </div>
                <h2 className="mt-2 text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-purple-200">
                  {g.title}
                </h2>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                  {g.subtitle}
                </p>
                <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-purple-300">
                  {isEn ? 'Read full guide' : '阅读全文'}
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
