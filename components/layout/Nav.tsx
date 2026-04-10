'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavProps {
  /** Optional override for the nav link list. */
  links?: NavLink[];
  className?: string;
}

const defaultZhLinks: NavLink[] = [
  { href: '/', label: '首页' },
  { href: '/test', label: '开始测试' },
  { href: '/types', label: '27 类型' },
  { href: '/match', label: '配对分析' },
];

// Note: English routes (/en/...) are intentionally not exposed. The /en
// implementation does not exist yet, and emitting English nav + hreflang
// links caused Google to crawl 404s. Re-add when app/[locale]/... ships.
export function Nav({ links, className }: NavProps) {
  const [open, setOpen] = React.useState(false);
  const resolvedLinks = links ?? defaultZhLinks;
  const homeHref = '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-lg supports-[backdrop-filter]:bg-zinc-950/60',
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href={homeHref}
          className="flex items-center gap-2 font-black tracking-tight text-white text-lg"
        >
          <Image
            src="/logo.svg"
            alt="SBTI Club"
            width={32}
            height={32}
            priority
            className="h-8 w-8 rounded-xl shadow-lg shadow-purple-500/40"
          />
          <span>SBTI Club</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {resolvedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-zinc-300 hover:bg-zinc-800/60"
          aria-label="切换导航"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800/60 bg-zinc-950/95 px-4 py-3">
          <div className="flex flex-col gap-1">
            {resolvedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-zinc-200 hover:bg-zinc-800/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
