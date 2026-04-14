import { Suspense } from 'react';
import type { Metadata } from 'next';

import { buildMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import MatchResultView from './MatchResultView';

export const metadata: Metadata = buildMetadata({
  title: 'SBTI 配对结果',
  description: 'SBTI 情侣/朋友配对分析结果：匹配度、吵架点、约会建议、相处 tips 和可分享的吐槽文案。',
  path: '/match/result',
  noIndex: true,
});

export default async function MatchResultPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <>
      <Nav locale={locale} />
      <Suspense
        fallback={
          <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent mb-4"></div>
              <p className="text-zinc-400">{locale === 'en' ? 'Analyzing your souls...' : '正在分析你们的灵魂...'}</p>
            </div>
          </main>
        }
      >
        <MatchResultView />
      </Suspense>
      <Footer locale={locale} />
    </>
  );
}
