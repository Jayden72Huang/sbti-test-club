import * as React from 'react';
import { cn } from '@/lib/cn';

export type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:
    'bg-purple-500/15 text-purple-200 border border-purple-500/30',
  secondary:
    'bg-zinc-800/80 text-zinc-200 border border-zinc-700',
  outline:
    'bg-transparent text-zinc-200 border border-zinc-600',
  destructive:
    'bg-red-500/15 text-red-200 border border-red-500/30',
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase whitespace-nowrap',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
}
