'use client';

import * as React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  dimensionOrder,
  keyToShort,
  type DimensionKey,
} from '@/data/dimensions';
import {
  matchSbtiType,
  parsePattern,
  type DimensionLevel,
  type DimensionScores,
  type MatchResult,
  type SbtiType,
} from '@/lib/scoring';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { RadarChart, type RadarLevel } from '@/components/shared/RadarChart';
import { ShareCard } from '@/components/shared/ShareCard';
import { TypeCard } from '@/components/shared/TypeCard';
import { cn } from '@/lib/cn';

// Fallback metadata used when data/sbti-types.ts isn't available yet or when
// the match algorithm returns a code we don't have copy for. The result page
// must remain robust even in mid-build states.
const FALLBACK_TYPE_META: Record<
  string,
  { emoji: string; nameCN: string; nameEN: string; tagline: string; color: string }
> = {
  HHHH: {
    emoji: '🌟',
    nameCN: '全域领航者',
    nameEN: 'Alpha Navigator',
    tagline: '稀有全高型，内外都有一股稳定到吓人的力量感。',
    color: '#a855f7',
  },
  DRUNK: {
    emoji: '🍻',
    nameCN: '醉后真我',
    nameEN: 'Drunk Self',
    tagline: '清醒时的人设全数蒸发，只剩最原始的你。',
    color: '#f43f5e',
  },
  UNKNOWN: {
    emoji: '✨',
    nameCN: '未知人格',
    nameEN: 'Uncharted',
    tagline: '我们还在准备这个类型的完整解读，先看看你的雷达图吧。',
    color: '#8b5cf6',
  },
};

interface TypeMeta {
  code: string;
  emoji: string;
  nameCN: string;
  nameEN: string;
  tagline: string;
  color: string;
}

function enrichType(type: SbtiType | undefined | null): TypeMeta {
  if (!type) {
    return { code: 'UNKNOWN', ...FALLBACK_TYPE_META.UNKNOWN };
  }
  const fallback =
    FALLBACK_TYPE_META[type.code] ?? FALLBACK_TYPE_META.UNKNOWN;
  const record = type as unknown as Record<string, unknown>;
  const emoji = typeof record.emoji === 'string' ? record.emoji : fallback.emoji;
  const nameCN =
    typeof record.nameCN === 'string' ? record.nameCN : fallback.nameCN;
  const nameEN =
    typeof record.nameEN === 'string' ? record.nameEN : fallback.nameEN;
  const tagline =
    typeof record.tagline === 'string' ? record.tagline : fallback.tagline;
  const color =
    typeof record.color === 'string' ? record.color : fallback.color;
  return { code: type.code, emoji, nameCN, nameEN, tagline, color };
}

function parseScoresFromPattern(pattern: string | null): DimensionScores | null {
  if (!pattern) return null;
  try {
    const letters = parsePattern(pattern);
    const scores = {} as DimensionScores;
    dimensionOrder.forEach((key, i) => {
      scores[key] = letters[i];
    });
    return scores;
  } catch {
    return null;
  }
}

function buildRadarData(
  scores: DimensionScores,
): { data: Record<string, RadarLevel>; labels: Record<string, string> } {
  const data: Record<string, RadarLevel> = {};
  const labels: Record<string, string> = {};
  for (const key of dimensionOrder) {
    const short = keyToShort[key as DimensionKey];
    data[short] = scores[key] as RadarLevel;
    labels[short] = short;
  }
  return { data, labels };
}

function useMatchResult(
  scores: DimensionScores | null,
  drunk: boolean,
): { state: 'loading' | 'ready' | 'raw-only'; result: MatchResult | null } {
  const [state, setState] = React.useState<
    'loading' | 'ready' | 'raw-only'
  >('loading');
  const [result, setResult] = React.useState<MatchResult | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    if (!scores) {
      setState('raw-only');
      return;
    }

    setState('loading');

    // Dynamic import so /result still builds while data/sbti-types.ts is
    // being authored by another teammate. If the module fails to resolve we
    // gracefully fall back to the raw radar + HHHH placeholder UI.
    import('@/data/sbti-types')
      .then((mod) => {
        if (cancelled) return;
        // data/sbti-types defines its own SbtiType without the extra index
        // signature that lib/scoring expects. The data file explicitly
        // supports an `as unknown as ScoringSbtiType[]` bridge, so we use
        // the same escape hatch here.
        const allTypes = (mod as unknown as { sbtiTypes?: SbtiType[] })
          .sbtiTypes;
        if (!allTypes || allTypes.length === 0) {
          setState('raw-only');
          return;
        }
        try {
          const match = matchSbtiType(scores, allTypes, {
            drunkTriggered: drunk,
          });
          setResult(match);
          setState('ready');
        } catch (err) {
          console.error('[SBTI] matchSbtiType failed', err);
          setState('raw-only');
        }
      })
      .catch(() => {
        if (!cancelled) setState('raw-only');
      });

    return () => {
      cancelled = true;
    };
  }, [scores, drunk]);

  return { state, result };
}

export function ResultView() {
  const searchParams = useSearchParams();
  const patternParam = searchParams.get('pattern');
  const drunkParam = searchParams.get('drunk') === '1';

  const scores = React.useMemo(
    () => parseScoresFromPattern(patternParam),
    [patternParam],
  );

  const { state, result } = useMatchResult(scores, drunkParam);

  if (!scores) {
    return (
      <div className="mx-auto w-full max-w-xl text-center">
        <Card>
          <CardHeader>
            <CardTitle>没有找到结果</CardTitle>
            <CardDescription>
              结果链接看起来不完整，回到测试页重新来一次吧。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/test">开始测试</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { data: radarData, labels: radarLabels } = buildRadarData(scores);

  // Determine primary code: prefer matched type, otherwise derive a fallback
  // from the drunk flag / HHHH rule.
  const primaryType = enrichType(result?.type);
  const similarTypes = (result?.similar ?? []).map(enrichType);
  const matchPercent = result?.matchPercent ?? null;
  const primaryCode = result?.type.code ?? (drunkParam ? 'DRUNK' : 'HHHH');
  const typeHref = `/type/${primaryCode.toLowerCase()}`;

  return (
    <div className="mx-auto w-full max-w-5xl flex flex-col gap-10">
      {/* Hero */}
      <section className="text-center">
        <Badge variant="default" className="mx-auto">
          你的 SBTI 结果
        </Badge>
        <div
          aria-hidden
          className="mt-5 text-[88px] leading-none drop-shadow-[0_0_40px_rgba(168,85,247,0.45)]"
        >
          {primaryType.emoji}
        </div>
        <h1 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-white">
          {primaryType.nameCN}
        </h1>
        <div className="mt-1 text-sm font-semibold uppercase tracking-widest text-purple-300">
          {primaryType.nameEN} · {primaryCode}
        </div>
        <p className="mt-5 mx-auto max-w-xl text-base text-zinc-300 leading-relaxed">
          {primaryType.tagline}
        </p>

        {matchPercent !== null && (
          <div className="mx-auto mt-7 flex max-w-sm flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
              <span>匹配度</span>
              <span className="text-white">{matchPercent}%</span>
            </div>
            <Progress value={matchPercent} />
          </div>
        )}

        {state === 'loading' && (
          <div className="mt-6 text-xs text-zinc-500">正在匹配 27 种原型…</div>
        )}
        {state === 'raw-only' && (
          <div className="mt-6 text-xs text-amber-400/80">
            类型数据准备中 · 先看你的 15 维雷达图
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={typeHref}>查看完整解读</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/match">测测朋友配对</Link>
          </Button>
        </div>
      </section>

      {/* Radar */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>15 维人格雷达</CardTitle>
            <CardDescription>
              5 组心理模型 × 3 维度，H/M/L 三档映射到距离 3/2/1。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto max-w-xl">
              <RadarChart data={radarData} labels={radarLabels} size={420} />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Similar types */}
      {similarTypes.length > 0 && (
        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-2xl font-black tracking-tight text-white">
              相近的 3 个类型
            </h2>
            <Link
              href="/types"
              className="text-sm font-semibold text-purple-300 hover:text-purple-200"
            >
              查看全部 27 种 →
            </Link>
          </div>
          <div
            className={cn(
              'grid gap-4',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {similarTypes.map((t) => (
              <TypeCard
                key={t.code}
                code={t.code}
                emoji={t.emoji}
                nameCN={t.nameCN}
                nameEN={t.nameEN}
                tagline={t.tagline}
                color={t.color}
              />
            ))}
          </div>
        </section>
      )}

      {/* Share */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-black tracking-tight text-white">
            分享你的结果
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            截图这张卡发朋友圈 / 小红书，让大家看看真实版的你。
          </p>
        </div>
        <ShareCard
          code={primaryCode}
          type={primaryType.nameCN}
          emoji={primaryType.emoji}
          tagline={primaryType.tagline}
          subtitle={primaryType.nameEN}
        />
      </section>

      {/* Pattern debug strip — subtle, for curious users */}
      <section className="text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">pattern</span>
          <span>{formatPattern(scores)}</span>
        </div>
      </section>
    </div>
  );
}

function formatPattern(scores: DimensionScores): string {
  const letters: DimensionLevel[] = dimensionOrder.map((key) => scores[key]);
  return [
    letters.slice(0, 3).join(''),
    letters.slice(3, 6).join(''),
    letters.slice(6, 9).join(''),
    letters.slice(9, 12).join(''),
    letters.slice(12, 15).join(''),
  ].join('-');
}
