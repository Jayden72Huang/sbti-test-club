import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { type Locale, localePath } from '@/lib/i18n';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { seoContent } from '@/data/seo-content';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';

  return buildMetadata({
    title: isEn
      ? 'SBTI FAQ — Common Questions About the Personality Test'
      : 'SBTI 常见问题 — 关于沙雕人格测试的 11 个真问题',
    description: isEn
      ? 'Answers to 11 common questions about the SBTI personality test: how it works, how it differs from MBTI, whether results are accurate, and more.'
      : '关于 SBTI 沙雕人格测试的 11 个常见问题：测试原理、和 MBTI 的区别、结果准不准、情侣配对怎么玩等，一次看完。',
    path: localePath('/faq', locale),
    locale,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const content = isEn ? seoContent.home.en : seoContent.home.zh;
  const faqs = content.faqs;

  return (
    <>
      <Nav locale={locale} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {isEn ? 'Frequently Asked Questions' : '常见问题'}
          </h1>
          <p className="mt-4 text-base text-zinc-400">
            {isEn
              ? '11 real questions people ask about the SBTI personality test.'
              : '关于 SBTI 沙雕人格测试，大家问得最多的 11 个问题。'}
          </p>

          <div className="mt-10">
            <Accordion
              items={faqs.map((f, i) => ({
                id: `faq-page-${i}`,
                question: f.q,
                answer: (
                  <p className="text-sm sm:text-base leading-[1.9]">{f.a}</p>
                ),
              }))}
              defaultOpen={['faq-page-0']}
            />
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={localePath('/test', locale)}>
                {isEn ? 'Take the 3-Min Test' : '开始 3 分钟测试'} &rarr;
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath('/', locale)}>
                {isEn ? 'Back to Home' : '返回首页'}
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
