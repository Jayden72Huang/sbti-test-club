'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { type Locale, localePath, ui } from '@/lib/i18n';

export interface NavLink {
  href: string;
  label: string;
}

export interface NavProps {
  locale?: Locale;
  links?: NavLink[];
  className?: string;
}

function getDefaultLinks(locale: Locale): NavLink[] {
  const t = ui[locale];
  return [
    { href: localePath('/', locale), label: t.home },
    { href: localePath('/test', locale), label: t.test },
    { href: localePath('/types', locale), label: t.types },
    { href: localePath('/match', locale), label: t.match },
  ];
}

export function Nav({ locale = 'zh', links, className }: NavProps) {
  const [open, setOpen] = React.useState(false);
  const resolvedLinks = links ?? getDefaultLinks(locale);
  const homeHref = localePath('/', locale);
  const switchLocale = locale === 'zh' ? 'en' : 'zh';
  const switchHref = switchLocale === 'en' ? '/en' : '/';

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
          <span>sbti-test.club</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {resolvedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={switchHref}
            className="ml-2 rounded-lg border border-zinc-700 px-2 py-1 text-xs font-bold text-zinc-400 hover:text-white hover:border-purple-500/60 transition-colors"
          >
            {locale === 'zh' ? 'EN' : '中文'}
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl text-zinc-300 hover:bg-zinc-800/60"
          aria-label={locale === 'zh' ? '切换导航' : 'Toggle navigation'}
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
            <Link
              href={switchHref}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-semibold text-zinc-400 hover:bg-zinc-800/60"
            >
              {locale === 'zh' ? '🌐 English' : '🌐 中文'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
