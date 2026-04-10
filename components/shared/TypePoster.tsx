import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { getTypeImage } from '@/lib/type-image';

export interface TypePosterProps {
  /** SBTI type code, e.g. 'CTRL', 'WOC!', 'Dior-s'. */
  code: string;
  /** Chinese name, used for alt text. */
  nameCN?: string;
  /** Shown if no poster image is registered for this code. */
  fallbackEmoji?: string;
  /** Tailwind classes controlling the square container size + rounding. */
  className?: string;
  /** Pass true for above-the-fold images (hero, result). */
  priority?: boolean;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
}

/**
 * Square poster for an SBTI type. Uses next/image with the fill layout so
 * the caller only has to pick a Tailwind size class. Falls back to the emoji
 * if the type has no image registered (keeps the UI resilient if a new code
 * is added before its asset lands).
 */
export function TypePoster({
  code,
  nameCN,
  fallbackEmoji,
  className,
  priority = false,
  sizes = '(max-width: 768px) 40vw, 200px',
}: TypePosterProps) {
  const src = getTypeImage(code);
  const alt = nameCN ? `${code} ${nameCN}` : code;

  if (!src) {
    return (
      <div
        aria-hidden
        className={cn(
          'flex items-center justify-center leading-none',
          className,
        )}
      >
        {fallbackEmoji}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
