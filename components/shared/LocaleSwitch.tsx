'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

export interface LocaleSwitchProps {
  /** The currently rendered locale. */
  currentLocale: 'zh' | 'en';
  className?: string;
}

/**
 * Toggles between the Chinese (`/xxx`) and English (`/en/xxx`) locale routes
 * while preserving the deepest path. Pure client component; no router state
 * depended on beyond the current pathname.
 */
export function LocaleSwitch({ currentLocale, className }: LocaleSwitchProps) {
  const pathname = usePathname() ?? '/';

  const stripped = pathname.startsWith('/en')
    ? pathname.replace(/^\/en/, '') || '/'
    : pathname;

  const zhHref = stripped;
  const enHref =
    stripped === '/'
      ? '/en'
      : `/en${stripped.startsWith('/') ? stripped : `/${stripped}`}`;

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className={cn(
        'inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 p-1 text-xs font-semibold',
        className,
      )}
    >
      <Link
        href={zhHref}
        prefetch={false}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          currentLocale === 'zh'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow'
            : 'text-zinc-400 hover:text-white',
        )}
      >
        中文
      </Link>
      <Link
        href={enHref}
        prefetch={false}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          currentLocale === 'en'
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow'
            : 'text-zinc-400 hover:text-white',
        )}
      >
        EN
      </Link>
    </div>
  );
}
