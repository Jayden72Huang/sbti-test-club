import * as React from 'react';
import { cn } from '@/lib/cn';
import { TypePoster } from '@/components/shared/TypePoster';

export interface ShareCardProps {
  /** SBTI type code, e.g. 'HHHH'. */
  code: string;
  /** Display name of the type, e.g. '领航者'. */
  type: string;
  /** Emoji representing the type. */
  emoji: string;
  /** Short tagline / one-liner description. */
  tagline: string;
  /** Optional English or alternate subtitle. */
  subtitle?: string;
  /** Site URL shown on the card footer. */
  siteUrl?: string;
  className?: string;
}

/**
 * Result share card — pure CSS, no canvas.
 * Kept at a sensible aspect ratio so it can be exported with html-to-image
 * later or simply screenshotted by users. Dark + neon-gradient theme.
 */
export function ShareCard({
  code,
  type,
  emoji,
  tagline,
  subtitle,
  siteUrl = 'sbti-test.club',
  className,
}: ShareCardProps) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-md aspect-[4/5] overflow-hidden rounded-3xl p-8 text-white',
        'bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-950',
        'border border-purple-500/30 shadow-2xl shadow-purple-900/50',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl"
      />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            SBTI · {code}
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            Result
          </span>
        </div>

        <div className="flex flex-col items-center text-center">
          <TypePoster
            code={code}
            nameCN={type}
            fallbackEmoji={emoji}
            sizes="(max-width: 640px) 160px, 200px"
            className="size-32 rounded-3xl ring-1 ring-white/15 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]"
          />
          <div className="mt-3 text-4xl font-black tracking-tight">{type}</div>
          {subtitle && (
            <div className="mt-1 text-sm font-medium text-purple-200">
              {subtitle}
            </div>
          )}
          <p className="mt-4 text-base font-medium leading-relaxed text-zinc-200 max-w-xs">
            {tagline}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400">
          <span>{siteUrl}</span>
          <span>Discover yours</span>
        </div>
      </div>
    </div>
  );
}
