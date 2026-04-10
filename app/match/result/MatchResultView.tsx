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
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 pt-12 pb-8">
          {/* 两人头像卡 */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
            {[type1, type2].map((t, i) => {
              const age = i === 0 ? age1 : age2;
              const gender = i === 0 ? gender1 : gender2;
              return (
                <Card
                  key={t.code}
                  className="text-center"
                  style={{ borderColor: `${t.color}55` }}
                >
                  <CardHeader>
                    <TypePoster
                      code={t.code}
                      nameCN={t.nameCN}
                      fallbackEmoji={t.emoji}
                      priority
                      sizes="(max-width: 640px) 40vw, 160px"
                      className="mx-auto mb-3 size-28 sm:size-32 rounded-2xl ring-1 ring-white/10"
                    />
                    <CardTitle className="text-xl sm:text-2xl">
                      {t.nameCN}
                    </CardTitle>
                    <p className="text-sm text-zinc-500 font-mono">{t.code}</p>
                    {(age || gender) && (
                      <p className="text-xs text-zinc-500 mt-1">
                        {[genderLabel(gender), age && `${age} 岁`]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          {/* 大号匹配度 */}
          <div className="text-center py-8">
            <div className="text-8xl sm:text-9xl font-black mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {compat.scorePercent}%
            </div>
            <div
              className={`inline-block px-5 py-2 rounded-full text-xl font-bold border ${verdictCss}`}
            >
              {verdictLabel[compat.verdict]}
            </div>
            {city && (
              <p className="text-xs text-zinc-500 mt-3">
                基于 {city} 的配对分析
              </p>
            )}
          </div>

          {/* Summary */}
          <Card className="mb-6 border-purple-500/30 bg-purple-500/5">
            <CardContent className="p-6">
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
                {compat.summaryCN}
              </p>
            </CardContent>
          </Card>

          {/* 5 件吵的事 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                🔥 最可能吵的 5 件事
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {compat.fightsCN.map((f, i) => (
                  <li key={i} className="flex gap-3 text-zinc-300">
                    <span className="text-red-400 font-black flex-shrink-0 w-6">
                      {i + 1}.
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* 约会建议 */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-pink-400 flex items-center gap-2">
                💝 约会建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {compat.dateIdeasCN.map((d, i) => (
                  <li key={i} className="flex gap-3 text-zinc-300">
                    <span className="text-pink-400 flex-shrink-0">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 相处 Tips */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                💚 相处 Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {compat.relationshipTipsCN.map((r, i) => (
                  <li key={i} className="flex gap-3 text-zinc-300">
                    <span className="text-green-400 flex-shrink-0">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Shareable Roast */}
          <Card className="mb-8 bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-purple-900/40 border-purple-500/50">
            <CardContent className="p-8 text-center">
              <Badge variant="secondary" className="mb-4">
                ✂️ 可分享吐槽
              </Badge>
              <p className="text-xl sm:text-2xl font-bold italic text-white">
                「{compat.shareableRoastCN}」
              </p>
              <p className="text-xs text-zinc-400 mt-4">
                截图分享到小红书 / 朋友圈 / 微博，让大家看看你们有多扎心
              </p>
            </CardContent>
          </Card>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
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
