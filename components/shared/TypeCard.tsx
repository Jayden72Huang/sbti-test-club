import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { TypePoster } from '@/components/shared/TypePoster';

export interface TypeCardProps {
  /** SBTI 4-letter code, used for the URL slug. */
  code: string;
  emoji: string;
  nameCN: string;
  nameEN: string;
  tagline: string;
  /**
   * Tailwind-compatible accent color. Accepts a CSS color (e.g. '#a855f7') or
   * a gradient stop literal. Defaults to purple.
   */
  color?: string;
  /** Route locale prefix — '' for zh, '/en' for English. */
  localePrefix?: string;
  className?: string;
}

/**
 * SBTI type teaser card used on the type index, matching results, home page
 * grids, etc. Clicking navigates to the full type detail page.
 */
export function TypeCard({
  code,
  emoji,
  nameCN,
  nameEN,
  tagline,
  color = '#a855f7',
  localePrefix = '',
  className,
}: TypeCardProps) {
  const href = `${localePrefix}/type/${code.toLowerCase()}`;
  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-all duration-300',
        'hover:-translate-y-1 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-900/30',
        className,
      )}
      style={{
        // Subtle radial glow tinted by the type color on hover.
        backgroundImage: `radial-gradient(circle at 100% 0%, ${color}22 0%, transparent 60%)`,
      }}
    >
      <div className="flex items-start justify-between">
        <TypePoster
          code={code}
          nameCN={nameCN}
          fallbackEmoji={emoji}
          sizes="(max-width: 640px) 35vw, 120px"
          className="size-20 rounded-2xl ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110"
        />
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white"
          style={{ backgroundColor: color }}
        >
          {code}
        </span>
      </div>
      <div className="mt-5">
        <div className="text-xl font-black tracking-tight text-white">
          {nameCN}
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mt-0.5">
          {nameEN}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-zinc-400 line-clamp-2">
        {tagline}
      </p>
      <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>查看详情</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </div>
    </Link>
  );
}
