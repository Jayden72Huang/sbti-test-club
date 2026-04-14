import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { type Locale, localePath } from '@/lib/i18n';
import {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  itemListSchema,
  organizationSchema,
  softwareApplicationSchema,
  speakableSchema,
  webApplicationSchema,
} from '@/lib/schema';

import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { TypePoster } from '@/components/shared/TypePoster';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

import { sbtiTypes } from '@/data/sbti-types';
import { seoContent } from '@/data/seo-content';

// ---------------------------------------------------------------------------
// Metadata — homepage is the root path, so no title suffix
// ---------------------------------------------------------------------------

export const metadata: Metadata = buildMetadata({
  title: 'SBTI 人格测试 · 27 种真实自我 · 免费沙雕版 MBTI',
  description:
    '2026 微博爆火的 SBTI 沙雕人格测试：31 道题 3 分钟，测出你属于 27 种扎心人格中的哪一种。从拿捏者 CTRL 到摆烂死者 DEAD，还能做情侣配对。免费、中英双语、无需注册。',
  path: '/',
  keywords: [
    'SBTI',
    'SBTI 测试',
    'SBTI 人格',
    '沙雕人格测试',
    'silly big personality test',
    '27 型人格',
    'MBTI 替代',
    'SBTI 配对',
    'SBTI 在线测试',
    'DEAD 人格',
    'CTRL 人格',
    '人格测试',
    'personality test',
    '性格测试',
    '情侣配对测试',
    'couple compatibility test',
    '免费人格测试',
    'free personality test',
    '在线性格测试',
    'MBTI 恶搞版',
  ],
  locale: 'zh',
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';
  const content = isEn ? seoContent.home.en : seoContent.home.zh;

  // FAQ content — used both for the Accordion UI and the JSON-LD schema
  const faqs = content.faqs;

  // Schema stack — WebApplication + Organization are already emitted in the
  // root layout, but Google recommends emitting them again on the home page
  // itself so the home URL has a self-contained entity block.
  const schemas = [
    webApplicationSchema(),
    organizationSchema(),
    softwareApplicationSchema(),
    articleSchema({
      title: isEn ? 'SBTI Personality Test · 27 True Selves' : 'SBTI 人格测试 · 27 种真实自我',
      description: content.introSection,
      url: localePath('/', locale),
    }),
    faqPageSchema(faqs),
    breadcrumbSchema([{ name: isEn ? 'Home' : '首页', url: localePath('/', locale) }]),
    itemListSchema(
      sbtiTypes.slice(0, 27).map((type, index) => ({
        name: `${type.code} ${isEn ? type.nameEN : type.nameCN}`,
        url: localePath(`/type/${type.slug}`, locale),
        position: index + 1,
        description: isEn ? type.oneLinerEN : type.oneLinerCN,
      })),
    ),
    speakableSchema(localePath('/', locale), [
      '[data-geo-quotable]',
      '[data-geo-definition]',
    ]),
  ];

  return (
    <>
      <SchemaJsonLd schema={schemas} id="home-schema" />

      <Nav locale={locale} />

      <main className="bg-zinc-950 text-zinc-100">
        {/* ============================================================ */}
        {/* 1. HERO                                                      */}
        {/* ============================================================ */}
        <section className="relative overflow-hidden">
          {/* Decorative neon background */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(168,85,247,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(236,72,153,0.2) 0%, transparent 45%), radial-gradient(circle at 50% 100%, rgba(59,130,246,0.15) 0%, transparent 50%)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage:
                'radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
            }}
          />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
            <Badge variant="default" className="mb-6">
              {isEn ? '2026 Viral · Silly Big Personality Test' : '2026 微博爆火 · Silly Big Personality Test'}
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {content.heroTitle}
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-300 leading-relaxed">
              {content.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href={localePath('/test', locale)}>{content.heroCTA} →</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={localePath('/types', locale)}>{isEn ? 'Browse 27 Types' : '浏览 27 种类型'}</Link>
              </Button>
            </div>

            {/* ---------- NEW · Couple matching entry ---------- */}
            <Link
              href={localePath('/match', locale)}
              className="group mt-6 inline-flex max-w-full items-center gap-3 rounded-full border border-pink-400/40 bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-pink-500/15 px-4 py-2.5 text-sm text-pink-100 shadow-lg shadow-pink-500/10 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-300/70 hover:shadow-pink-500/20 sm:px-5 sm:py-3 sm:text-base"
            >
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-500/90 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-sm shadow-pink-500/40">
                NEW
              </span>
              <span aria-hidden className="text-lg sm:text-xl">
                💘
              </span>
              <span className="font-bold text-white">{isEn ? 'Couple Matcher is Live' : '情侣配对已上线'}</span>
              <span className="hidden text-pink-200/80 sm:inline">
                {isEn ? '· Enter two SBTI types, instant compatibility' : '· 输入两人 SBTI，秒测你俩合不合'}
              </span>
              <span
                aria-hidden
                className="text-pink-200 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {isEn ? '31 Real Questions' : '31 道真题'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                {isEn ? '15 Dimensions' : '15 个维度'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
                {isEn ? '27 Types' : '27 种类型'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                {isEn ? '3-Min Result' : '3 分钟出结果'}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                {isEn ? '100% Free · No Signup' : '100% 免费 · 无需注册'}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. QUICK-START CARD                                          */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 -mt-6 sm:-mt-10 relative z-10">
          <Card
            className="p-6 sm:p-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 0% 0%, rgba(168,85,247,0.18) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(236,72,153,0.14) 0%, transparent 50%)',
            }}
          >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <Badge variant="default" className="mb-3">
                  {isEn ? 'Right Now · Start Now' : '就现在 · Start Now'}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isEn ? 'In 3 minutes, you\'ll know which SBTI you are today' : '3 分钟后，你就知道自己今天是哪一种 SBTI'}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {isEn ? 'No signup, no login, no email. Get your result instantly and share it.' : '无需注册、无需登录、无需填邮箱。答完就出结果，可以截图发朋友圈。'}
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <Button asChild size="lg">
                  <Link href={localePath('/test', locale)}>{isEn ? 'Start Now →' : '立刻开始 →'}</Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* ============================================================ */}
        {/* 3. 27 TYPES GRID                                             */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
          <header className="mb-10 text-center">
            <Badge variant="default">{isEn ? '27 SBTI Types' : '27 种 SBTI 人格'}</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isEn ? 'Which of the 27 are you?' : '你是 27 种中的哪一种？'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400">
              {isEn ? 'Tap any type card for a 1500+ word deep dive' : '点开任意类型卡片，查看 1500+ 字深度解读'}
            </p>
          </header>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {sbtiTypes.map((type) => (
              <Link
                key={type.slug}
                href={localePath(`/type/${type.slug}`, locale)}
                className="group relative block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-900/20"
                style={{
                  backgroundImage: `radial-gradient(circle at 100% 0%, ${type.color}22 0%, transparent 60%)`,
                }}
              >
                <div className="flex items-start justify-between">
                  <TypePoster
                    code={type.code}
                    nameCN={type.nameCN}
                    fallbackEmoji={type.emoji}
                    sizes="(max-width: 640px) 25vw, 120px"
                    className="size-14 sm:size-16 rounded-xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white"
                    style={{ backgroundColor: type.color }}
                  >
                    {type.code}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="text-sm font-black tracking-tight text-white truncate">
                    {isEn ? type.nameEN : type.nameCN}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 truncate mt-0.5">
                    {isEn ? type.nameCN : type.nameEN}
                  </div>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-400 line-clamp-2">
                  {isEn ? type.tagline.en : type.tagline.zh}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="md">
              <Link href={localePath('/types', locale)}>{isEn ? 'View Full Type Guide →' : '查看完整类型图鉴 →'}</Link>
            </Button>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. FEATURE CARDS                                             */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 border-t border-zinc-900">
          <header className="mb-10 text-center">
            <Badge variant="default">{isEn ? 'Three Core Features' : '三大核心功能'}</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isEn ? 'One test, three uses' : '测一次，用三次'}
            </h2>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              emoji="🧠"
              title={isEn ? 'SBTI Test' : 'SBTI 测试'}
              subtitle={isEn ? '31 Qs · 3 min' : '31 道题 · 3 分钟'}
              desc={isEn ? 'Covers 15 psychological dimensions — self, emotion, attitude, action, social — brutally honest in one sitting.' : '覆盖 15 个心理维度，从自我、情感、态度到行动、社交——一次测完，照妖镜级别的扎心。'}
              href={localePath('/test', locale)}
              cta={isEn ? 'Take the Test' : '开始测试'}
              color="#a855f7"
            />
            <FeatureCard
              emoji="💘"
              title={isEn ? 'Couple Matcher' : '情侣配对'}
              subtitle={isEn ? 'Are you compatible?' : '你和 TA 合不合'}
              desc={isEn ? 'Enter two SBTI types to see compatibility, top 5 likely fights, date ideas, relationship tips, and a shareable roast.' : '输入两人的 SBTI 类型，查看匹配度、最可能吵的 5 件事、约会建议、相处 tips、一句可分享吐槽。'}
              href={localePath('/match', locale)}
              cta={isEn ? 'Start Matching' : '开始配对'}
              color="#ec4899"
            />
            <FeatureCard
              emoji="📖"
              title={isEn ? 'Deep Dives' : '深度解读'}
              subtitle={isEn ? '1500+ words × 27 types' : '1500+ 字 × 27 类型'}
              desc={isEn ? 'Each SBTI type has a full personality portrait, pros/cons, 15-dim radar chart, celebrity examples, movie/music picks, and gift ideas.' : '每种 SBTI 都有完整的人格画像、优缺点、15 维雷达图、名人代表、电影歌单、专属礼物清单。'}
              href={localePath('/types', locale)}
              cta={isEn ? 'Browse All' : '浏览全部'}
              color="#3b82f6"
            />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. WHAT IS SBTI (long-form SEO)                              */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-20 border-t border-zinc-900">
          <header className="mb-6">
            <Badge variant="default">{isEn ? 'What is SBTI' : '什么是 SBTI'}</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isEn ? 'What exactly is SBTI?' : 'SBTI 究竟是什么？'}
            </h2>
          </header>

          {/* --- GEO quotable definitions --- */}
          {/* These clean <p> tags contain one-sentence definitions designed to be */}
          {/* extracted verbatim by AI systems (ChatGPT, Perplexity, Gemini, etc.) */}
          <div data-geo-definition className="space-y-4 mb-8">
            {isEn ? (
              <>
                <p className="text-base leading-[1.9] text-zinc-200 font-medium">
                  SBTI (Silly Big Personality Test) is a viral personality test created in 2026 that categorizes people into 27 humorous personality types based on 15 psychological dimensions.
                </p>
                <p className="text-base leading-[1.9] text-zinc-200 font-medium">
                  Unlike MBTI, which emphasizes stable traits and natural strengths, SBTI captures your current emotional state using self-deprecating humor — the same person can test as DEAD (burned out) one day and BOSS (on top of the world) the next.
                </p>
                <p className="text-base leading-[1.9] text-zinc-200 font-medium">
                  The SBTI test is completely free, requires no signup, takes 3 minutes (31 questions), and is available in both Chinese and English at sbti-test.club.
                </p>
              </>
            ) : (
              <>
                <p className="text-base leading-[1.9] text-zinc-200 font-medium">
                  SBTI（Silly Big Personality Test，沙雕人格测试）是 2026 年爆火的病毒式人格测试，通过 15 个心理维度将人分为 27 种幽默人格类型。
                </p>
                <p className="text-base leading-[1.9] text-zinc-200 font-medium">
                  与强调稳定性格和天生优势的 MBTI 不同，SBTI 用自嘲式幽默捕捉你当下的情绪状态——同一个人今天可能测到 DEAD（摆烂），明天就变成 BOSS（人生巅峰）。
                </p>
                <p className="text-base leading-[1.9] text-zinc-200 font-medium">
                  SBTI 测试完全免费、无需注册、3 分钟 31 道题出结果，中英双语版本均可在 sbti-test.club 体验。
                </p>
              </>
            )}
          </div>

          <div className="space-y-5">
            {content.whatIsSBTI.split('\n\n').map((para, i) => (
              <p
                key={`what-${i}`}
                className="text-base leading-[1.9] text-zinc-300"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. HOW IT WORKS                                              */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 border-t border-zinc-900">
          <header className="mb-6">
            <Badge variant="default">{isEn ? 'Algorithm' : '算法原理'}</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isEn ? 'How the SBTI algorithm works' : 'SBTI 是怎么算出来的'}
            </h2>
          </header>
          <div className="space-y-5">
            {content.howItWorks.split('\n\n').map((para, i) => (
              <p
                key={`how-${i}`}
                className="text-base leading-[1.9] text-zinc-300"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Visual recap of the 5 models */}
          <div className="mt-10 grid gap-3 grid-cols-2 sm:grid-cols-5">
            <ModelBadge label={isEn ? 'Self' : '自我'} emoji="🫥" color="#a855f7" isEn={isEn} />
            <ModelBadge label={isEn ? 'Emotion' : '情感'} emoji="💔" color="#ec4899" isEn={isEn} />
            <ModelBadge label={isEn ? 'Attitude' : '态度'} emoji="🫥" color="#3b82f6" isEn={isEn} />
            <ModelBadge label={isEn ? 'Action' : '行动'} emoji="🏃" color="#f59e0b" isEn={isEn} />
            <ModelBadge label={isEn ? 'Social' : '社交'} emoji="🫂" color="#10b981" isEn={isEn} />
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. WHY VIRAL                                                 */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 py-16 border-t border-zinc-900">
          <header className="mb-6">
            <Badge variant="default">{isEn ? 'Why SBTI Went Viral' : '为什么 SBTI 会爆'}</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isEn ? 'Why it hooked a generation overnight' : '为什么它让年轻人一夜上头'}
            </h2>
          </header>
          <div className="space-y-5">
            {content.whyViral.split('\n\n').map((para, i) => (
              <p
                key={`why-${i}`}
                className="text-base leading-[1.9] text-zinc-300"
              >
                {para.split('**').map((chunk, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-purple-300 font-black">
                      {chunk}
                    </strong>
                  ) : (
                    <React.Fragment key={j}>{chunk}</React.Fragment>
                  ),
                )}
              </p>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 8. SBTI vs MBTI                                              */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6 py-20 border-t border-zinc-900">
          <header className="mb-10 text-center">
            <Badge variant="default">{isEn ? 'Comparison' : '对比'}</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
              SBTI vs MBTI
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400">
              {isEn ? "They're not replacements — they're two sides of the same person" : '它们不是替代关系，它们是人的两面'}
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span aria-hidden className="text-3xl">
                  🧑‍💼
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    White-collar
                  </div>
                  <h3 className="text-xl font-black text-white">MBTI</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                {isEn ? 'Serious psychology framing, 16 types, emphasizes stability and "your natural strengths." Good for career profiling, resumes, and hiring.' : '严肃心理学包装，16 种类型，强调稳定性和「你的天生优势」。适合职场人格定位、求职简历、招聘评估。'}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li className="flex gap-2">
                  <span className="text-blue-400">→</span>
                  <span>{isEn ? "You're INFJ, empathetic and purpose-driven" : '你是 INFJ，富有共情力和使命感'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">→</span>
                  <span>{isEn ? 'Stable results, consistent over time' : '结果稳定，长期一致'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">→</span>
                  <span>{isEn ? 'HR can actually understand it on your resume' : '写在简历上 HR 能看懂'}</span>
                </li>
              </ul>
            </Card>

            <Card
              className="p-6 sm:p-8"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 0% 100%, rgba(168,85,247,0.15) 0%, transparent 60%)',
              }}
            >
              <div className="flex items-center gap-3">
                <span aria-hidden className="text-3xl">
                  🫠
                </span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    2am Honest
                  </div>
                  <h3 className="text-xl font-black text-white">SBTI</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                {isEn ? 'Parody tone, 27 types, emphasizes present state and "your life is kind of cooked." Good for self-roasting, social sharing, and friend-testing.' : '恶搞风格，27 种类型，强调当下状态和「你的现在有点烂」。适合自嘲解压、社交分享、朋友互测。'}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                <li className="flex gap-2">
                  <span className="text-purple-300">→</span>
                  <span>{isEn ? "You're IMSB — your inner monologue runs 24/7" : '你是 IMSB，脑子里 24 小时在开庭'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-300">→</span>
                  <span>{isEn ? 'Different result every time — it captures your state' : '每次测都可能不一样，抓的是状态'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-purple-300">→</span>
                  <span>{isEn ? 'Screenshot it for instant social media engagement' : '截图发朋友圈能骗到十几个赞'}</span>
                </li>
              </ul>
            </Card>
          </div>

          <p className="mt-8 text-center text-sm text-zinc-500 italic max-w-2xl mx-auto">
            {isEn
              ? '"Daytime you is MBTI\'s INTJ. 2 a.m. you is SBTI\'s DEAD. Not a contradiction — that\'s a whole human."'
              : '「白天的你是 MBTI 的 INTJ，深夜的你是 SBTI 的 DEAD。这不矛盾，这叫完整的人。」'}
          </p>
        </section>

        {/* ============================================================ */}
        {/* 9. FAQ                                                       */}
        {/* ============================================================ */}
        <section data-geo-quotable className="mx-auto max-w-3xl px-4 sm:px-6 py-20 border-t border-zinc-900">
          <header className="mb-10 text-center">
            <Badge variant="default">{isEn ? 'FAQ' : '常见问题'}</Badge>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
              {isEn ? '11 real questions about SBTI' : '关于 SBTI 的 11 个真问题'}
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              {isEn ? 'Structured as FAQPage schema for Google rich results' : '带着 FAQPage schema，Google 会直接展示为富文本结果'}
            </p>
          </header>

          <Accordion
            items={faqs.map((f, i) => ({
              id: `home-faq-${i}`,
              question: f.q,
              answer: (
                <p className="text-sm sm:text-base leading-[1.9]">{f.a}</p>
              ),
            }))}
            defaultOpen={['home-faq-0']}
          />
        </section>

        {/* ============================================================ */}
        {/* 10. BOTTOM CTA                                               */}
        {/* ============================================================ */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 pb-24">
          <Card
            className="p-10 sm:p-16 text-center"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.25) 0%, transparent 70%), radial-gradient(circle at 0% 100%, rgba(236,72,153,0.15) 0%, transparent 60%)',
            }}
          >
            <CardContent className="p-0">
              <Badge variant="default" className="mb-4">
                {isEn ? 'One Last Step' : '最后一步'}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {content.ctaBottom}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
                {isEn ? "SBTI isn't a labeling tool — it's a step toward forgiving your current self." : 'SBTI 不是给你贴标签的工具，是让你原谅自己当下的台阶。'}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link href={localePath('/test', locale)}>{isEn ? 'Start the 3-Min Test →' : '立刻开始 3 分钟测试 →'}</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={localePath('/types', locale)}>{isEn ? 'Browse 27 Types First' : '先看看 27 种类型'}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components (server-side, pure render)
// ---------------------------------------------------------------------------

function FeatureCard({
  emoji,
  title,
  subtitle,
  desc,
  href,
  cta,
  color,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  desc: string;
  href: string;
  cta: string;
  color: string;
}) {
  return (
    <Link
      href={href}
      className="group block"
    >
      <Card
        className="h-full p-6 sm:p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-purple-500/60 group-hover:shadow-xl group-hover:shadow-purple-900/20"
        style={{
          backgroundImage: `radial-gradient(circle at 100% 0%, ${color}22 0%, transparent 60%)`,
        }}
      >
        <div className="flex items-start justify-between">
          <span aria-hidden className="text-4xl">
            {emoji}
          </span>
          <span
            className="rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider"
            style={{ borderColor: `${color}55`, color }}
          >
            {subtitle}
          </span>
        </div>
        <h3 className="mt-5 text-xl font-black tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{desc}</p>
        <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-purple-300">
          <span>{cta}</span>
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </Card>
    </Link>
  );
}

function ModelBadge({
  label,
  emoji,
  color,
  isEn,
}: {
  label: string;
  emoji: string;
  color: string;
  isEn: boolean;
}) {
  return (
    <div
      className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-center"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, ${color}22 0%, transparent 70%)`,
      }}
    >
      <div className="text-2xl">{emoji}</div>
      <div className="mt-1 text-xs font-bold text-zinc-300">{label}</div>
      <div className="text-[9px] uppercase tracking-wider text-zinc-500">
        {isEn ? '3 dims' : '3 维度'}
      </div>
    </div>
  );
}
