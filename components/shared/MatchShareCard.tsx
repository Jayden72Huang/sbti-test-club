'use client';

import * as React from 'react';
import QRCode from 'qrcode';
import { cn } from '@/lib/cn';
import { TypePoster } from '@/components/shared/TypePoster';
import type { Verdict } from '@/data/compatibility';

export interface MatchShareType {
  code: string;
  nameCN: string;
  emoji: string;
  color: string;
}

export interface MatchShareCardProps {
  type1: MatchShareType;
  type2: MatchShareType;
  scorePercent: number;
  verdict: Verdict;
  roast: string;
  qrUrl?: string;
  siteUrl?: string;
  className?: string;
}

const verdictLabel: Record<Verdict, string> = {
  destiny: '命中注定 💍',
  great: '非常合拍 💚',
  fine: '可以相处 🤝',
  rocky: '有点坎坷 ⚡',
  doomed: '难以共存 💀',
};

const verdictColor: Record<Verdict, string> = {
  destiny: '#ec4899',
  great: '#22c55e',
  fine: '#eab308',
  rocky: '#f97316',
  doomed: '#ef4444',
};

function useQrDataUrl(value: string): string | null {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 256,
      color: { dark: '#ffffffff', light: '#00000000' },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [value]);
  return dataUrl;
}

export function MatchShareCard({
  type1,
  type2,
  scorePercent,
  verdict,
  roast,
  qrUrl = 'https://sbti-test.club/test',
  siteUrl = 'sbti-test.club',
  className,
}: MatchShareCardProps) {
  const qrDataUrl = useQrDataUrl(qrUrl);
  const vColor = verdictColor[verdict];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-md aspect-[4/5] overflow-hidden rounded-3xl p-6 text-white',
        'bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950',
        'border border-purple-500/30 shadow-2xl shadow-purple-900/50',
        className,
      )}
    >
      {/* Decorative blurs */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl"
      />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            SBTI · Match
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            配对报告
          </span>
        </div>

        {/* Two types side by side */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[type1, type2].map((t) => (
            <div key={t.code} className="flex flex-col items-center text-center">
              <TypePoster
                code={t.code}
                nameCN={t.nameCN}
                fallbackEmoji={t.emoji}
                sizes="80px"
                className="size-16 rounded-2xl ring-1 ring-white/15"
              />
              <div className="mt-2 text-lg font-black leading-none">
                {t.nameCN}
              </div>
              <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {t.code}
              </div>
            </div>
          ))}
        </div>

        {/* Score */}
        <div className="mt-4 text-center">
          <div
            className="text-6xl font-black leading-none"
            style={{ color: vColor }}
          >
            {scorePercent}%
          </div>
          <div
            className="mt-2 inline-block rounded-full border px-4 py-1.5 text-sm font-bold"
            style={{
              borderColor: `${vColor}80`,
              backgroundColor: `${vColor}15`,
              color: vColor,
            }}
          >
            {verdictLabel[verdict]}
          </div>
        </div>

        {/* Roast */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
          <p className="text-center text-xs leading-relaxed text-zinc-200 line-clamp-3">
            「{roast}」
          </p>
        </div>

        {/* Footer (QR + CTA) */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
              TA 也来测一下
            </div>
            <div className="mt-0.5 text-xs font-bold text-white truncate">
              {siteUrl}
            </div>
            <div className="mt-0.5 text-[9px] text-zinc-500">
              31 题 · 3 分钟 · 免费
            </div>
          </div>
          <div className="shrink-0 rounded-lg bg-white p-1.5">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="QR code"
                width={56}
                height={56}
                className="block"
              />
            ) : (
              <div className="h-14 w-14 animate-pulse rounded bg-zinc-300" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
