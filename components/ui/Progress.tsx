import * as React from 'react';
import { cn } from '@/lib/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress, 0-100. Values outside the range are clamped. */
  value: number;
  /** Optional accessible label. Defaults to `${value}%`. */
  label?: string;
}

export function Progress({
  value,
  label,
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `${clamped}%`}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-zinc-800',
        className,
      )}
      {...props}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
