'use client';

import * as React from 'react';
import QRCode from 'qrcode';
import { cn } from '@/lib/cn';
import { TypePoster } from '@/components/shared/TypePoster';

/**
 * Compact metadata for a "best match" type rendered in the share card footer.
 * Only the fields needed for the rendered tile — no schema-level info.
 */
export interface ShareCardMatchType {
  code: string;
  nameCN: string;
  emoji: string;
  color: string;
}

export interface ShareCardProps {
  /** SBTI type code, e.g. 'DEAD'. */
  code: string;
  /** Display name of the type, e.g. '死者'. */
  type: string;
  /** Emoji representing the type. */
  emoji: string;
  /** Catchphrase / 口头禅 — short quoted line. Distinct from `subtitle`. */
  catchphrase: string;
  /** Longer personality one-liner description. */
  tagline: string;
  /** Optional English or alternate subtitle. */
  subtitle?: string;
  /** Up to 2 "best match" types rendered in the footer strip. */
  bestMatches?: ShareCardMatchType[];
  /** Absolute URL encoded inside the QR code. */
  qrUrl?: string;
  /** Footer URL label (text next to the QR). */
  siteUrl?: string;
  className?: string;
}

/**
 * Hook that generates a QR code data URL from a string, client-side.
 * Runs once per `value`, returns null while loading / on failure.
 */
function useQrDataUrl(value: string): string | null {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(value, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 256,
      color: {
        dark: '#ffffffff',
        light: '#00000000',
      },
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

/**
 * Result share card — the single DOM node that html-to-image rasterises into
 * a PNG for download. Everything the user should see in their saved image
 * lives inside this component: type poster, name/code, catchphrase, top 2
 * best matches, and a QR code pointing to the site.
 *
 * Kept at a fixed 4:5 aspect ratio so it renders identically on every device
 * once exported. Styling avoids `background-clip: text` and other CSS tricks
 * that html-to-image has trouble with.
 */
export function ShareCard({
  code,
  type,
  emoji,
  catchphrase,
  tagline,
  subtitle,
  bestMatches = [],
  qrUrl = 'https://sbti-test.club',
  siteUrl = 'sbti-test.club',
  className,
}: ShareCardProps) {
  const qrDataUrl = useQrDataUrl(qrUrl);
  const topMatches = bestMatches.slice(0, 2);

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-md aspect-[4/5] overflow-hidden rounded-3xl p-7 text-white',
        'bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950',
        'border border-purple-500/30 shadow-2xl shadow-purple-900/50',
        className,
      )}
    >
      {/* Decorative blurs — pure colour, no gradients-on-text */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl"
      />

      <div className="relative flex h-full flex-col">
        {/* ===== Header strip ===== */}
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            SBTI · {code}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] backdrop-blur-sm">
            My Result
          </span>
        </div>

        {/* ===== Hero (poster + name + catchphrase) ===== */}
        <div className="mt-4 flex flex-col items-center text-center">
          <TypePoster
            code={code}
            nameCN={type}
            fallbackEmoji={emoji}
            sizes="(max-width: 640px) 120px, 160px"
            className="size-24 rounded-3xl ring-1 ring-white/15 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          />
          <div className="mt-3 text-3xl font-black tracking-tight leading-none">
            {type}
          </div>
          {subtitle && (
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-purple-200">
              {subtitle}
            </div>
          )}
          <div className="mt-3 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
            <p className="text-xs italic text-zinc-100">「{catchphrase}」</p>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-300 max-w-xs line-clamp-3">
            {tagline}
          </p>
        </div>

        {/* ===== Best matches strip ===== */}
        {topMatches.length > 0 && (
          <div className="mt-auto pt-4">
            <div className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-purple-300 mb-2">
              天选配偶 · Best Matches
            </div>
            <div className="grid grid-cols-2 gap-2">
              {topMatches.map((m) => (
                <div
                  key={m.code}
                  className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm"
                      style={{ backgroundColor: m.color }}
                    >
                      {m.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-black uppercase tracking-wider text-zinc-400 leading-none">
                        {m.code}
                      </div>
                      <div className="mt-0.5 text-xs font-bold text-white truncate leading-none">
                        {m.nameCN}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Footer (QR + URL) ===== */}
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-500">
              扫码测试
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
