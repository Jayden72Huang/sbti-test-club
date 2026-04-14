'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import {
  MatchShareCard,
  type MatchShareType,
} from '@/components/shared/MatchShareCard';
import type { Verdict } from '@/data/compatibility';
import type { Locale } from '@/lib/i18n';

export interface MatchShareSectionProps {
  type1: MatchShareType;
  type2: MatchShareType;
  scorePercent: number;
  verdict: Verdict;
  summary: string;
  roast: string;
  locale?: Locale;
}

/** Convert a data-URL to a File object. */
async function dataUrlToFile(
  dataUrl: string,
  filename: string,
): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: 'image/png' });
}

export function MatchShareSection({
  type1,
  type2,
  scorePercent,
  verdict,
  summary,
  roast,
  locale = 'zh',
}: MatchShareSectionProps) {
  const isEn = locale === 'en';
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<'idle' | 'saving' | 'copied'>(
    'idle',
  );

  const handleSave = React.useCallback(async () => {
    if (!cardRef.current || status === 'saving') return;
    setStatus('saving');
    try {
      const { toPng } = await import('html-to-image');
      const node = cardRef.current;
      const filename = `sbti-${type1.code.toLowerCase()}-${type2.code.toLowerCase()}-match.png`;

      // backgroundColor fills rounded-corner gaps (eliminates white edges)
      const dataUrl = await toPng(node, {
        pixelRatio: 2,
        backgroundColor: '#09090b',
      });

      // Only use Web Share API on actual mobile devices (not macOS desktop)
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (
        isMobile &&
        typeof navigator.share === 'function' &&
        typeof navigator.canShare === 'function'
      ) {
        try {
          const file = await dataUrlToFile(dataUrl, filename);
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'SBTI 配对结果' });
            setStatus('idle');
            return;
          }
        } catch {
          // Share cancelled or failed — fall through to download
        }
      }

      // Desktop / fallback: direct download via blob URL
      const file = await dataUrlToFile(dataUrl, filename);
      const blobUrl = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.download = filename;
      link.href = blobUrl;
      link.click();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 3000);

      setStatus('idle');
    } catch (err) {
      console.error('[SBTI] match share card export failed', err);
      setStatus('idle');
    }
  }, [type1.code, type2.code, status]);

  const handleCopyLink = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 1500);
    } catch {
      // clipboard may be blocked
    }
  }, []);

  return (
    <section id="share" className="scroll-mt-24">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-black tracking-tight text-white">
          {isEn ? 'Share Match Result' : '分享配对结果'}
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          {isEn
            ? 'Save and send to your partner — scan QR to take the test'
            : '保存图片发给 TA，扫码就能测自己的 SBTI'}
        </p>
      </div>

      <div className="flex justify-center">
        {/* rounded + overflow-hidden eliminates white corner bleed in export */}
        <div ref={cardRef} className="w-full max-w-md rounded-3xl overflow-hidden">
          <MatchShareCard
            type1={type1}
            type2={type2}
            scorePercent={scorePercent}
            verdict={verdict}
            summary={summary}
            roast={roast}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={handleSave} disabled={status === 'saving'} size="lg">
          {status === 'saving'
            ? isEn
              ? 'Generating...'
              : '生成图片中...'
            : isEn
              ? '📸 Save as Image'
              : '📸 保存为图片'}
        </Button>
        <Button onClick={handleCopyLink} variant="outline" size="lg">
          {status === 'copied'
            ? isEn
              ? '✓ Link Copied'
              : '✓ 链接已复制'
            : isEn
              ? '🔗 Copy Result Link'
              : '🔗 复制结果链接'}
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">
        {isEn
          ? 'Retina-quality PNG, ready for social media'
          : '长按保存 / 直接分享到朋友圈 · 小红书 · 微博'}
      </p>
    </section>
  );
}
