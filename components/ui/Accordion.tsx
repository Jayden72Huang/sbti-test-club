'use client';

import * as React from 'react';
import { cn } from '@/lib/cn';

export interface AccordionItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** When true, allows multiple items open at once. */
  multiple?: boolean;
  /** IDs of items open by default. */
  defaultOpen?: string[];
  className?: string;
}

/**
 * Minimal accessible accordion using native <details>-style semantics.
 * Styled for dark theme; intended for FAQ sections.
 */
export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  className,
}: AccordionProps) {
  const [open, setOpen] = React.useState<Set<string>>(
    () => new Set(defaultOpen),
  );

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/60 overflow-hidden"
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left text-white font-semibold tracking-tight hover:bg-zinc-900 transition-colors"
            >
              <span className="text-base sm:text-lg">{item.question}</span>
              <span
                aria-hidden
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-300 transition-transform duration-200',
                  isOpen && 'rotate-45',
                )}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 text-zinc-300 leading-relaxed"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
