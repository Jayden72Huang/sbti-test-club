import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { type Locale, localePath } from '@/lib/i18n';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

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
      ? 'About SBTI Test Club — Who We Are & Why We Built This'
      : '关于 SBTI Test Club — 我们是谁、为什么做这个',
    description: isEn
      ? 'Learn about the SBTI personality test: a parody-style 15-dimension system with 27 personality types. Free, bilingual, built by personality-test enthusiasts.'
      : '了解 SBTI 沙雕人格测试的诞生故事：15 维度、27 种人格、免费中英双语，一群人格测试爱好者打造的自我认知实验。',
    path: localePath('/about', locale),
    locale,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';

  return (
    <>
      <Nav locale={locale} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {isEn ? 'About SBTI Test Club' : '关于 SBTI Test Club'}
          </h1>

          <section className="mt-10 space-y-6 text-base leading-[1.9] text-zinc-300">
            <h2 className="text-xl font-black text-white">
              {isEn ? 'What is SBTI?' : '什么是 SBTI？'}
            </h2>
            {isEn ? (
              <>
                <p>
                  SBTI stands for <strong className="text-purple-300">Silly Big Type Indicator</strong> — a parody-style personality test inspired by MBTI but designed to capture how you <em>actually</em> feel right now, not who you ideally are. It went viral on Chinese social media (Weibo) in 2025&ndash;2026.
                </p>
                <p>
                  Instead of the traditional 4 dichotomies / 16 types, SBTI uses <strong className="text-purple-300">5 psychological models</strong> (Self, Emotion, Attitude, Action, Social) across <strong className="text-purple-300">15 dimensions</strong>, resulting in <strong className="text-purple-300">27 unique personality types</strong> — from &ldquo;CTRL the Controller&rdquo; to &ldquo;DEAD the Flatlined.&rdquo;
                </p>
                <p>
                  31 questions. 3 minutes. Brutally honest results. And yes, your type can change depending on your current state — that&rsquo;s by design.
                </p>
              </>
            ) : (
              <>
                <p>
                  SBTI 全称 <strong className="text-purple-300">Silly Big Type Indicator</strong>（沙雕大人格指标），是一款受 MBTI 启发、但更注重「你此刻真实状态」的恶搞风格人格测试。2025&ndash;2026 年在微博爆火。
                </p>
                <p>
                  不同于传统 MBTI 的 4 维度 / 16 类型，SBTI 使用 <strong className="text-purple-300">5 大心理模型</strong>（自我、情感、态度、行动、社交）、<strong className="text-purple-300">15 个维度</strong>，最终映射出 <strong className="text-purple-300">27 种独特人格</strong>——从「拿捏者 CTRL」到「摆烂死者 DEAD」。
                </p>
                <p>
                  31 道题，3 分钟，结果扎心但真实。而且你每次测可能得到不同结果——这不是 bug，而是 feature：SBTI 抓的是你此刻的状态。
                </p>
              </>
            )}
          </section>

          <section className="mt-12 space-y-6 text-base leading-[1.9] text-zinc-300">
            <h2 className="text-xl font-black text-white">
              {isEn ? 'Who Built This?' : '谁做了这个？'}
            </h2>
            {isEn ? (
              <p>
                SBTI Test Club is an independent project built by a small team of personality-test enthusiasts, frontend engineers, and content writers. We saw the SBTI meme take off on Weibo and decided to build the definitive bilingual platform — complete with 15-dimension radar charts, couple matching, deep-dive profiles for all 27 types, and downloadable share cards.
              </p>
            ) : (
              <p>
                SBTI Test Club 是一个独立项目，由几个人格测试爱好者、前端工程师和内容创作者一起搭建。我们看到 SBTI 在微博爆火后，决定做一个最完整的中英双语平台——包括 15 维雷达图、情侣配对、27 种类型的深度解读，以及可下载的社交分享卡片。
              </p>
            )}
          </section>

          <section className="mt-12 space-y-6 text-base leading-[1.9] text-zinc-300">
            <h2 className="text-xl font-black text-white">
              {isEn ? 'Why SBTI Exists' : '为什么做 SBTI'}
            </h2>
            {isEn ? (
              <>
                <p>
                  Traditional personality tests like MBTI tend to be flattering — they tell you about your &ldquo;natural strengths.&rdquo; SBTI takes the opposite approach: it tells you how you&rsquo;re <em>actually</em> holding up right now.
                </p>
                <p>
                  We believe humor is one of the most powerful tools for self-reflection. When you laugh at a painfully accurate description of yourself at 2&nbsp;a.m., something clicks. SBTI isn&rsquo;t trying to label you — it&rsquo;s trying to give you a moment of honest self-recognition.
                </p>
              </>
            ) : (
              <>
                <p>
                  传统人格测试（比如 MBTI）往往是夸你的——告诉你「你的天赋优势」。SBTI 走的是反方向：告诉你此刻的<em>真实状态</em>。
                </p>
                <p>
                  我们相信幽默是最有力的自我反思工具。当你在凌晨两点看到一段精准到扎心的自我描述时，笑着笑着就悟了。SBTI 不是给你贴标签，而是给你一个诚实面对自己的台阶。
                </p>
              </>
            )}
          </section>

          <div className="mt-14 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={localePath('/test', locale)}>
                {isEn ? 'Take the 3-Min Test' : '开始 3 分钟测试'} &rarr;
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath('/types', locale)}>
                {isEn ? 'Browse 27 Types' : '浏览 27 种类型'}
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
