import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { type Locale } from '@/lib/i18n';
import { quizSchema } from '@/lib/schema';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import TestClient from './TestClient';

export const metadata: Metadata = buildMetadata({
  title: 'SBTI Test - 立刻开始 31 题扎心人格测试',
  description:
    '免费 SBTI 测试，31 道题 3 分钟测出你是 27 种人格中的哪一种。无需注册，扎心又好玩。',
  path: '/test',
  keywords: [
    'sbti test',
    'sbti 测试',
    'silly big personality test',
    '沙雕人格测试',
    'sbti 在线测试',
  ],
  locale: 'zh',
});

export default async function TestPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;

  return (
    <>
      {/* Server-rendered H1 for crawlers — hidden visually, visible to bots */}
      <h1 className="sr-only">SBTI Test - 31 题沙雕人格测试</h1>
      <SchemaJsonLd id="sbti-quiz-schema" schema={quizSchema()} />
      <TestClient />
    </>
  );
}
