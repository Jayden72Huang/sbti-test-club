'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { LocaleSwitch } from '@/components/shared/LocaleSwitch';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavProps {
  /** Locale prefix, e.g. '' for zh, '/en' for English. */
  localePrefix?: string;
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

const defaultEnLinks: NavLink[] = [
  { href: '/en', label: 'Home' },
  { href: '/en/test', label: 'Take Test' },
  { href: '/en/types', label: '27 Types' },
  { href: '/en/match', label: 'Match' },
];

export function Nav({ localePrefix = '', links, className }: NavProps) {
  const [open, setOpen] = React.useState(false);
  const isEn = localePrefix === '/en';
  const resolvedLinks = links ?? (isEn ? defaultEnLinks : defaultZhLinks);
  const homeHref = isEn ? '/en' : '/';

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
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40"
          >
            S
          </span>
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
          <div className="ml-2">
            <LocaleSwitch currentLocale={isEn ? 'en' : 'zh'} />
          </div>
        </nav>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-zinc-300 hover:bg-zinc-800/60"
          aria-label={isEn ? 'Toggle navigation' : '切换导航'}
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
            <div className="pt-2">
              <LocaleSwitch currentLocale={isEn ? 'en' : 'zh'} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
