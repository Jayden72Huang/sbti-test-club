'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';

export interface PaywallGateProps {
  /** Unique key for this purchasable item (stored in localStorage). */
  productId: string;
  /** Stripe Payment Link URL or checkout redirect. */
  checkoutUrl?: string;
  /** Display price label, e.g. "$2.99" or "¥9.9". */
  priceLabel?: string;
  /** Headline shown on the paywall overlay. */
  headline?: string;
  /** Subtext under the headline. */
  description?: string;
  /** CTA button text. */
  ctaText?: string;
  children: React.ReactNode;
}

const STORAGE_KEY = 'sbti-unlocked';

function isUnlocked(productId: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const tokens = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return !!tokens[productId];
  } catch {
    return false;
  }
}

export function unlockProduct(productId: string) {
  try {
    const tokens = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    tokens[productId] = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch {
    // localStorage unavailable
  }
}

export function PaywallGate({
  productId,
  checkoutUrl,
  priceLabel = '$2.99',
  headline = '解锁完整报告',
  description = '查看深度分析、吵架清单、约会建议、相处 Tips',
  ctaText,
  children,
}: PaywallGateProps) {
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    if (isUnlocked(productId)) setUnlocked(true);

    // Also check URL for ?unlocked=productId (Stripe success redirect)
    const params = new URLSearchParams(window.location.search);
    if (params.get('unlocked') === productId) {
      unlockProduct(productId);
      setUnlocked(true);
      // Clean up URL
      const url = new URL(window.location.href);
      url.searchParams.delete('unlocked');
      window.history.replaceState({}, '', url.toString());
    }
  }, [productId]);

  if (unlocked) return <>{children}</>;

  const buttonLabel = ctaText || `🔓 ${headline} ${priceLabel}`;

  const handleClick = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    } else {
      // Dev/demo mode: unlock immediately
      unlockProduct(productId);
      setUnlocked(true);
    }
  };

  return (
    <div className="relative mt-6">
      {/* Blurred preview — shows enough to tease */}
      <div
        className="overflow-hidden pointer-events-none select-none"
        style={{ maxHeight: '280px' }}
        aria-hidden
      >
        <div className="blur-[6px] opacity-60">{children}</div>
      </div>

      {/* Gradient fade overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/70 to-zinc-950" />

      {/* CTA card — positioned over the faded content */}
      <div className="relative -mt-24 flex justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-purple-500/40 bg-gradient-to-br from-purple-950/80 via-zinc-900/90 to-pink-950/80 p-6 sm:p-8 text-center backdrop-blur-xl shadow-2xl shadow-purple-900/40">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-purple-300 mb-4">
            Premium Report
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            {headline}
          </h3>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleClick}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base w-full"
            >
              {buttonLabel}
            </Button>
            <p className="text-[10px] text-zinc-500">
              一次购买永久查看 · Stripe 安全支付
            </p>
          </div>

          {/* Feature bullets */}
          <div className="mt-5 grid grid-cols-2 gap-2 text-left">
            {[
              '🔥 最可能吵的 5 件事',
              '💝 约会建议',
              '💚 相处 Tips',
              '✂️ 灵魂吐槽文案',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-[11px] text-zinc-300"
              >
                <span className="text-purple-400">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
