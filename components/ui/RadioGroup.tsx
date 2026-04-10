'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface RadioOption {
  /** Unique value submitted when this option is selected. */
  value: string;
  /** Label shown to the user. Can be any React node. */
  label: React.ReactNode;
  /** Optional helper text / secondary copy rendered under the label. */
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  /** When true, arranges options horizontally on wide screens. */
  inline?: boolean;
}

/**
 * Controlled-or-uncontrolled radio group styled for dark test flow UI.
 * Each option renders as a large clickable card so it works well on mobile.
 */
export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  className,
  inline = false,
}: RadioGroupProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? '');
  const selected = isControlled ? value : internal;

  const handleSelect = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <div
      role="radiogroup"
      className={cn(
        'flex gap-3',
        inline ? 'flex-col sm:flex-row sm:flex-wrap' : 'flex-col',
        className,
      )}
    >
      {options.map((option) => {
        const checked = selected === option.value;
        const id = `${name}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={id}
            className={cn(
              'group relative flex cursor-pointer items-start gap-4 rounded-2xl border p-4 sm:p-5 transition-all duration-200',
              checked
                ? 'border-purple-400 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:bg-zinc-900',
              option.disabled && 'pointer-events-none opacity-50',
              inline && 'sm:flex-1',
            )}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              disabled={option.disabled}
              onChange={() => handleSelect(option.value)}
              className="sr-only"
            />
            <span
              aria-hidden
              className={cn(
                'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                checked
                  ? 'border-purple-400 bg-purple-500'
                  : 'border-zinc-600 bg-zinc-950 group-hover:border-zinc-500',
              )}
            >
              {checked && <span className="h-2 w-2 rounded-full bg-white" />}
            </span>
            <span className="flex flex-col gap-1 text-left">
              <span className="text-base font-semibold text-white leading-snug">
                {option.label}
              </span>
              {option.description && (
                <span className="text-sm text-zinc-400">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
