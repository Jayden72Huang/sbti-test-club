'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import {
  MatchShareCard,
  type MatchShareType,
} from '@/components/shared/MatchShareCard';
import type { Verdict } from '@/data/compatibility';

export interface MatchShareSectionProps {
  type1: MatchShareType;
  type2: MatchShareType;
  scorePercent: number;
  verdict: Verdict;
  roast: string;
}

export function MatchShareSection({
  type1,
  type2,
  scorePercent,
  verdict,
  roast,
}: MatchShareSectionProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<'idle' | 'saving' | 'copied'>(
    'idle',
  );

  const handleSave = React.useCallback(async () => {
    if (!cardRef.current || status === 'saving') return;
    setStatus('saving');
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: 'transparent',
      });
      const link = document.createElement('a');
      link.download = `sbti-${type1.code.toLowerCase()}-${type2.code.toLowerCase()}-match.png`;
      link.href = dataUrl;
      link.click();
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
          分享配对结果
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          保存图片发给 TA，扫码就能测自己的 SBTI
        </p>
      </div>

      <div ref={cardRef} className="inline-block w-full flex justify-center">
        <MatchShareCard
          type1={type1}
          type2={type2}
          scorePercent={scorePercent}
          verdict={verdict}
          roast={roast}
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={handleSave} disabled={status === 'saving'} size="lg">
          {status === 'saving' ? '生成图片中...' : '📸 保存为图片'}
        </Button>
        <Button onClick={handleCopyLink} variant="outline" size="lg">
          {status === 'copied' ? '✓ 链接已复制' : '🔗 复制结果链接'}
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">
        2 倍像素高清图，直接发朋友圈 / 小红书 / 微博
      </p>
    </section>
  );
}
