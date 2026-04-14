import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { buildMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@/lib/schema';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Accordion } from '@/components/ui/Accordion';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

import { guides, guidesBySlug } from '@/data/guides';

// ---------------------------------------------------------------------------
// Route params / SSG
// ---------------------------------------------------------------------------

type RouteParams = { slug: string };
interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<RouteParams[]> {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesBySlug[slug];

  if (!guide) {
    return buildMetadata({
      title: '指南未找到',
      description: 'SBTI guide not found.',
      path: `/guide/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: guide.metaTitle ?? guide.title,
    description: guide.metaDescription,
    path: `/guide/${guide.slug}`,
    keywords: guide.keywords,
    locale: 'zh',
    type: 'article',
  });
}

// ---------------------------------------------------------------------------
// Minimal markdown renderer — only supports **bold** and [link](url) so we
// don't pull in a real markdown package for 4 guide pages. Each paragraph
// is expected to be plain text or a mix of these two patterns.
// ---------------------------------------------------------------------------

function renderInline(text: string): React.ReactNode[] {
  const result: React.ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const boldPattern = /\*\*([^*]+)\*\*/g;
  let cursor = 0;
  const combined = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = combined.exec(text)) !== null) {
    if (match.index > cursor) {
      result.push(text.slice(cursor, match.index));
    }
    if (match[1] && match[2]) {
      // link
      const href = match[2];
      const isInternal = href.startsWith('/');
      result.push(
        isInternal ? (
          <Link
            key={`link-${key++}`}
            href={href}
            className="text-purple-300 hover:text-purple-200 underline underline-offset-2"
          >
            {match[1]}
          </Link>
        ) : (
          <a
            key={`link-${key++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-300 hover:text-purple-200 underline underline-offset-2"
          >
            {match[1]}
          </a>
        ),
      );
    } else if (match[3]) {
      // bold
      result.push(
        <strong key={`b-${key++}`} className="font-black text-white">
          {match[3]}
        </strong>,
      );
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) result.push(text.slice(cursor));
  // suppress unused variables
  void linkPattern;
  void boldPattern;
  return result;
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function GuidePage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const guide = guidesBySlug[slug];

  if (!guide) notFound();

  const schemas = [
    articleSchema({
      title: guide.title,
      description: guide.metaDescription,
      url: `/guide/${guide.slug}`,
      datePublished: guide.datePublished,
    }),
    faqPageSchema(guide.faqs),
    breadcrumbSchema([
      { name: '首页', url: '/' },
      { name: '指南', url: '/guide' },
      { name: guide.title, url: `/guide/${guide.slug}` },
    ]),
  ];

  // Related guides: everything except the current one, capped at 3.
  const relatedGuides = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <>
      <SchemaJsonLd
        schema={schemas}
        id={`schema-guide-${guide.slug}`}
      />

      <Nav locale={locale} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        {/* ================= Breadcrumb ================= */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-4xl px-4 sm:px-6 pt-6"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <li>
              <Link href="/" className="hover:text-purple-300">
                {isEn ? 'Home' : '首页'}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <span className="text-zinc-500">{isEn ? 'Guides' : '指南'}</span>
            </li>
            <li aria-hidden>/</li>
            <li className="text-zinc-300 truncate">{guide.title}</li>
          </ol>
        </nav>

        {/* ================= Hero ================= */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-10">
          <Badge variant="default" className="mb-4">
            {isEn ? 'SBTI Guide' : 'SBTI 深度指南'}
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {guide.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            {guide.subtitle}
          </p>
          <div className="mt-5 flex items-center gap-3 text-xs text-zinc-500">
            <time dateTime={guide.datePublished}>{guide.datePublished}</time>
            <span aria-hidden>·</span>
            <span>SBTI Test Club</span>
          </div>
        </section>

        {/* ================= TL;DR quotable block ================= */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-10">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-pink-500/10 p-6 sm:p-7">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-300">
              {isEn ? 'TL;DR' : 'TL;DR · 先看结论'}
            </div>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-white">
              {renderInline(guide.tldr)}
            </p>
          </div>
        </section>

        {/* ================= Article body ================= */}
        <article className="mx-auto max-w-3xl px-4 sm:px-6 py-6">
          {guide.sections.map((section, si) => (
            <section key={`section-${si}`} className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-5">
                {section.heading}
              </h2>
              <div className="space-y-5">
                {section.paragraphs.map((para, pi) => (
                  <p
                    key={`p-${si}-${pi}`}
                    className="text-base leading-[1.9] text-zinc-300"
                  >
                    {renderInline(para)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </article>

        {/* ================= FAQ ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 border-t border-zinc-900">
          <header className="mb-8 text-center">
            <Badge variant="default">{isEn ? 'FAQ' : '常见问题'}</Badge>
            <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isEn ? 'Related Questions' : '相关问答'}
            </h2>
          </header>
          <Accordion
            items={guide.faqs.map((f, i) => ({
              id: `guide-faq-${i}`,
              question: f.q,
              answer: (
                <p className="text-sm sm:text-base leading-[1.9]">{f.a}</p>
              ),
            }))}
            defaultOpen={['guide-faq-0']}
          />
        </section>

        {/* ================= Related guides ================= */}
        {relatedGuides.length > 0 && (
          <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 border-t border-zinc-900">
            <header className="mb-6">
              <Badge variant="default">{isEn ? 'More Guides' : '其他指南'}</Badge>
              <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-white">
                {isEn ? 'You might also like' : '你可能也想看'}
              </h2>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guide/${g.slug}`}
                  className="group block rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:-translate-y-0.5 hover:border-purple-500/50"
                >
                  <h3 className="text-base font-black text-white group-hover:text-purple-200">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                    {g.subtitle}
                  </p>
                  <div className="mt-3 text-xs font-semibold text-purple-300">
                    {isEn ? 'Read guide →' : '阅读指南 →'}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================= Bottom CTA ================= */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 pb-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {isEn ? 'Ready to find out your SBTI type?' : '准备好测一下自己的 SBTI 了？'}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400">
            {isEn ? '31 questions, 3 minutes, free, no sign-up' : '31 道题 3 分钟，免费无需注册'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/test">{isEn ? 'Start the SBTI Test →' : '开始 SBTI 测试 →'}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/types">{isEn ? 'View 27 Types' : '查看 27 种类型'}</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
