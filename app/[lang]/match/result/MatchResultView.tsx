'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { sbtiTypesByCode } from '@/data/sbti-types';
import { getCompatibility, type Verdict } from '@/data/compatibility';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TypePoster } from '@/components/shared/TypePoster';
import { MatchShareSection } from '@/components/shared/MatchShareSection';
import { PaywallGate } from '@/components/shared/PaywallGate';
import { FullMatchReport } from '@/components/shared/FullMatchReport';
import { generateFullMatchReport } from '@/lib/match-report';

const verdictClass: Record<Verdict, string> = {
  destiny: 'text-pink-400 border-pink-500/50 bg-pink-500/10',
  great: 'text-green-400 border-green-500/50 bg-green-500/10',
  fine: 'text-yellow-400 border-yellow-500/50 bg-yellow-500/10',
  rocky: 'text-orange-400 border-orange-500/50 bg-orange-500/10',
  doomed: 'text-red-400 border-red-500/50 bg-red-500/10',
};

const verdictLabel: Record<Verdict, string> = {
  destiny: '命中注定 💍',
  great: '非常合拍 💚',
  fine: '可以相处 🤝',
  rocky: '有点坎坷 ⚡',
  doomed: '难以共存 💀',
};

export default function MatchResultView() {
  const params = useSearchParams();
  const t1 = params.get('t1') || '';
  const t2 = params.get('t2') || '';
  const age1 = params.get('age1');
  const age2 = params.get('age2');
  const gender1 = params.get('gender1');
  const gender2 = params.get('gender2');
  const city = params.get('city');

  const type1 = sbtiTypesByCode[t1];
  const type2 = sbtiTypesByCode[t2];

  if (!type1 || !type2) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 px-4 py-20 text-center">
        <h1 className="text-3xl font-black mb-4">参数缺失或无效</h1>
        <p className="text-zinc-400 mb-6">请返回配对页重新选择两个 SBTI 类型。</p>
        <Link href="/match">
          <Button>返回配对页</Button>
        </Link>
      </main>
    );
  }

  const compat = getCompatibility(t1, t2, type1.pattern, type2.pattern);
  const verdictCss = verdictClass[compat.verdict];
  const report = generateFullMatchReport(
    type1.pattern, type2.pattern,
    type1.nameCN, type2.nameCN,
    type1.nameEN, type2.nameEN,
  );

  const hasContext = age1 || age2 || gender1 || gender2 || city;

  const genderLabel = (g: string | null): string => {
    if (g === 'female') return '女';
    if (g === 'male') return '男';
    if (g === 'other') return '其他';
    return '';
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 0%, rgba(236,72,153,0.25) 0%, transparent 55%)',
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-12 pb-6">
          {/* ===== Hero: [Type1] [Score] [Type2] ===== */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6 mb-6">
            {/* Type 1 */}
            <Card
              className="text-center"
              style={{ borderColor: `${type1.color}55` }}
            >
              <CardHeader>
                <TypePoster
                  code={type1.code}
                  nameCN={type1.nameCN}
                  fallbackEmoji={type1.emoji}
                  priority
                  sizes="(max-width: 640px) 30vw, 140px"
                  className="mx-auto mb-3 size-24 sm:size-32 rounded-2xl ring-1 ring-white/10"
                />
                <CardTitle className="text-lg sm:text-2xl">
                  {type1.nameCN}
                </CardTitle>
                <p className="text-sm text-zinc-500 font-mono">{type1.code}</p>
                {(age1 || gender1) && (
                  <p className="text-xs text-zinc-500 mt-1">
                    {[genderLabel(gender1), age1 && `${age1} 岁`]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
              </CardHeader>
            </Card>

            {/* Score center */}
            <div className="text-center px-1 sm:px-4">
              <div className="text-5xl sm:text-7xl lg:text-8xl font-black mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-none">
                {compat.scorePercent}%
              </div>
              <div
                className={`inline-block px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-sm sm:text-xl font-bold border ${verdictCss}`}
              >
                {verdictLabel[compat.verdict]}
              </div>
              {city && (
                <p className="text-[10px] sm:text-xs text-zinc-500 mt-2">
                  基于 {city}
                </p>
              )}
            </div>

            {/* Type 2 */}
            <Card
              className="text-center"
              style={{ borderColor: `${type2.color}55` }}
            >
              <CardHeader>
                <TypePoster
                  code={type2.code}
                  nameCN={type2.nameCN}
                  fallbackEmoji={type2.emoji}
                  priority
                  sizes="(max-width: 640px) 30vw, 140px"
                  className="mx-auto mb-3 size-24 sm:size-32 rounded-2xl ring-1 ring-white/10"
                />
                <CardTitle className="text-lg sm:text-2xl">
                  {type2.nameCN}
                </CardTitle>
                <p className="text-sm text-zinc-500 font-mono">{type2.code}</p>
                {(age2 || gender2) && (
                  <p className="text-xs text-zinc-500 mt-1">
                    {[genderLabel(gender2), age2 && `${age2} 岁`]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
              </CardHeader>
            </Card>
          </div>

          {/* Summary */}
          <Card className="mb-8 border-purple-500/30 bg-purple-500/5">
            <CardContent className="p-6">
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
                {compat.summaryCN}
              </p>
            </CardContent>
          </Card>

          {/* Share card — single row, centered */}
          <MatchShareSection
            type1={{ code: type1.code, nameCN: type1.nameCN, emoji: type1.emoji, color: type1.color }}
            type2={{ code: type2.code, nameCN: type2.nameCN, emoji: type2.emoji, color: type2.color }}
            scorePercent={compat.scorePercent}
            verdict={compat.verdict}
            summary={compat.summaryCN}
            roast={compat.shareableRoastCN}
          />

          {/* Full report — gated */}
          <div className="mt-8">
            <PaywallGate
              productId={`match-${t1}-${t2}`}
              headline="解锁完整配对报告"
              description={`15 维度雷达对比 · 五大模型解读 · 沟通指南 · 冲突解决 · 关系阶段预测 · 吵架清单 · 约会建议`}
              priceLabel="$2.99"
            >
              <FullMatchReport
                report={report}
                name1={type1.nameCN}
                name2={type2.nameCN}
                code1={type1.code}
                code2={type2.code}
                color1={type1.color}
                color2={type2.color}
                fights={compat.fightsCN}
                dateIdeas={compat.dateIdeasCN}
                tips={compat.relationshipTipsCN}
                roast={compat.shareableRoastCN}
              />
            </PaywallGate>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center pt-8 pb-4">
            <Link href="/match">
              <Button variant="outline" size="lg">
                再测一对
              </Button>
            </Link>
            <Link href="/test">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500"
              >
                我还没测 SBTI →
              </Button>
            </Link>
            <Link href={`/type/${type1.slug}`}>
              <Button variant="outline" size="lg">
                看 {type1.code} 详解
              </Button>
            </Link>
            <Link href={`/type/${type2.slug}`}>
              <Button variant="outline" size="lg">
                看 {type2.code} 详解
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
