import * as React from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * When true, clones its single child and merges button classes onto it.
   * Useful for wrapping `next/link` anchors with button styling without
   * rendering a nested interactive element.
   */
  asChild?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:pointer-events-none disabled:opacity-50 select-none';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:brightness-110 active:brightness-95',
  secondary:
    'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700',
  ghost:
    'bg-transparent text-zinc-200 hover:bg-zinc-800/60 hover:text-white',
  outline:
    'bg-transparent border border-purple-500/60 text-purple-200 hover:bg-purple-500/10 hover:border-purple-400',
  destructive:
    'bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = 'primary',
      size = 'md',
      asChild = false,
      children,
      ...props
    },
    ref,
  ) {
    const composed = cn(base, variantClasses[variant], sizeClasses[size], className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(composed, child.props.className),
      });
    }

    return (
      <button ref={ref} className={composed} {...props}>
        {children}
      </button>
    );
  },
);
