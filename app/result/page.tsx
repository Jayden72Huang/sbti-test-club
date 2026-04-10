import * as React from 'react';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ResultView } from './ResultView';

export const metadata: Metadata = buildMetadata({
  title: 'SBTI 测试结果 · 你的 27 型人格定位',
  description:
    '查看你的 SBTI 测试结果：15 维雷达图、匹配度百分比、相近类型推荐，以及一键跳转完整人格解读。',
  path: '/result',
  keywords: ['SBTI 结果', 'SBTI 雷达图', '人格匹配度'],
  locale: 'zh',
  noIndex: true, // result pages carry query state, keep them out of the index
});

export default function ResultPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-4 py-10 sm:py-14">
        <Suspense
          fallback={
            <div className="mx-auto w-full max-w-3xl text-center text-zinc-500 text-sm">
              正在加载结果…
            </div>
          }
        >
          <ResultView />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
