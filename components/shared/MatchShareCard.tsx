'use client';

import * as React from 'react';
import QRCode from 'qrcode';
import { cn } from '@/lib/cn';
import { getTypeImage } from '@/lib/type-image';
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
  summary: string;
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
      color: { dark: '#000000ff', light: '#00000000' },
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

function TypeImg({ code, emoji }: { code: string; emoji: string }) {
  const src = getTypeImage(code);
  if (!src) {
    return (
      <div className="size-full flex items-center justify-center text-3xl">
        {emoji}
      </div>
    );
  }
  return (
    // Plain <img> instead of next/image for reliable html-to-image export
    <img src={src} alt={code} className="size-full object-cover" />
  );
}

export function MatchShareCard({
  type1,
  type2,
  scorePercent,
  verdict,
  summary,
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
        'relative w-full overflow-hidden rounded-3xl p-8 pb-7 text-white',
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

      <div className="relative flex flex-col gap-0">
        {/* Header */}
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em]">
            SBTI · Match
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em]">
            配对报告
          </span>
        </div>

        {/* Types + Score side by side */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {/* Type 1 */}
          <div className="flex flex-col items-center text-center flex-1 min-w-0">
            <div className="size-[88px] rounded-2xl ring-1 ring-white/15 overflow-hidden bg-white/10 shrink-0">
              <TypeImg code={type1.code} emoji={type1.emoji} />
            </div>
            <div className="mt-2 text-base font-black leading-none truncate w-full">
              {type1.nameCN}
            </div>
            <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              {type1.code}
            </div>
          </div>

          {/* Score in center */}
          <div className="flex flex-col items-center shrink-0 px-1">
            <div
              className="text-6xl font-black leading-none"
              style={{ color: vColor }}
            >
              {scorePercent}%
            </div>
            <div
              className="mt-2 rounded-full border px-3 py-1 text-[10px] font-bold whitespace-nowrap"
              style={{
                borderColor: `${vColor}80`,
                backgroundColor: `${vColor}15`,
                color: vColor,
              }}
            >
              {verdictLabel[verdict]}
            </div>
          </div>

          {/* Type 2 */}
          <div className="flex flex-col items-center text-center flex-1 min-w-0">
            <div className="size-[88px] rounded-2xl ring-1 ring-white/15 overflow-hidden bg-white/10 shrink-0">
              <TypeImg code={type2.code} emoji={type2.emoji} />
            </div>
            <div className="mt-2 text-base font-black leading-none truncate w-full">
              {type2.nameCN}
            </div>
            <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              {type2.code}
            </div>
          </div>
        </div>

        {/* Summary + Roast */}
        <div className="mt-6 flex flex-col gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5">
            <p className="text-center text-[11px] leading-relaxed text-zinc-300 line-clamp-3">
              {summary}
            </p>
          </div>
          <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-3">
            <p className="text-center text-[10px] italic leading-relaxed text-purple-200 line-clamp-2">
              「{roast}」
            </p>
          </div>
        </div>

        {/* Footer (Logo + QR) */}
        <div className="mt-8 pt-4 flex items-center justify-between gap-3 border-t border-white/10">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {/* Inline logo SVG — embedded for html-to-image reliability */}
            <svg
              viewBox="0 0 64 64"
              fill="none"
              className="size-9 shrink-0 rounded-lg"
            >
              <defs>
                <linearGradient
                  id="sbti-cg"
                  x1="12"
                  y1="12"
                  x2="52"
                  y2="52"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <radialGradient
                  id="sbti-cgw"
                  cx="32"
                  cy="32"
                  r="26"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                </radialGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="#09090b" />
              <rect width="64" height="64" rx="14" fill="url(#sbti-cgw)" />
              <path
                d="M46 18 L22 18 C16 18 16 30 22 30 L42 30 C48 30 48 46 42 46 L18 46"
                stroke="url(#sbti-cg)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {siteUrl}
              </div>
              <div className="mt-0.5 text-[9px] text-zinc-400">
                人格测试 · 配对分析 · 免费
              </div>
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
