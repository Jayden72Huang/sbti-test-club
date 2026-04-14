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
import { ShareCard, type ShareCardMatchType } from '@/components/shared/ShareCard';
import { TypeCard } from '@/components/shared/TypeCard';
import { TypePoster } from '@/components/shared/TypePoster';
import { cn } from '@/lib/cn';

// Fallback metadata used when data/sbti-types.ts isn't available yet or when
// the match algorithm returns a code we don't have copy for. The result page
// must remain robust even in mid-build states.
const FALLBACK_TYPE_META: Record<
  string,
  {
    emoji: string;
    nameCN: string;
    nameEN: string;
    catchphrase: string;
    tagline: string;
    color: string;
  }
> = {
  HHHH: {
    emoji: '🌟',
    nameCN: '全域领航者',
    nameEN: 'Alpha Navigator',
    catchphrase: '我来，我见，我全拿。',
    tagline: '稀有全高型，内外都有一股稳定到吓人的力量感。',
    color: '#a855f7',
  },
  DRUNK: {
    emoji: '🍻',
    nameCN: '醉后真我',
    nameEN: 'Drunk Self',
    catchphrase: '再来一杯！',
    tagline: '清醒时的人设全数蒸发，只剩最原始的你。',
    color: '#f43f5e',
  },
  UNKNOWN: {
    emoji: '✨',
    nameCN: '未知人格',
    nameEN: 'Uncharted',
    catchphrase: '我是谁？我在哪？',
    tagline: '我们还在准备这个类型的完整解读，先看看你的雷达图吧。',
    color: '#8b5cf6',
  },
};

interface TypeMeta {
  code: string;
  emoji: string;
  nameCN: string;
  nameEN: string;
  /** Short catchphrase / 口头禅 — typically comes from `tagline.zh`. */
  catchphrase: string;
  /** Longer one-liner personality summary — typically `oneLinerCN`. */
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
  // Real sbti-types data ships `tagline: { zh, en }` (object) and a separate
  // `oneLinerCN` string. Older shapes may ship `tagline` as a plain string.
  // Handle all three gracefully.
  const rawTagline = record.tagline as
    | { zh?: string; en?: string }
    | string
    | undefined;
  const catchphrase =
    typeof rawTagline === 'string'
      ? rawTagline
      : typeof rawTagline?.zh === 'string'
        ? rawTagline.zh
        : fallback.catchphrase;
  const oneLiner =
    typeof record.oneLinerCN === 'string' ? record.oneLinerCN : undefined;
  const tagline =
    oneLiner ??
    (typeof rawTagline === 'string' ? rawTagline : fallback.tagline);
  const color =
    typeof record.color === 'string' ? record.color : fallback.color;
  return { code: type.code, emoji, nameCN, nameEN, catchphrase, tagline, color };
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

/**
 * Flattened shape used by the "天选配偶" section. We can't reuse enrichType
 * because the source `tagline` on data/sbti-types is `{ zh, en }`, and
 * enrichType intentionally only passes through string taglines.
 */
interface DestinedType {
  code: string;
  slug: string;
  nameCN: string;
  nameEN: string;
  emoji: string;
  color: string;
  tagline: string;
}

function useMatchResult(
  scores: DimensionScores | null,
  drunk: boolean,
): {
  state: 'loading' | 'ready' | 'raw-only';
  result: MatchResult | null;
  destinedTypes: DestinedType[];
} {
  const [state, setState] = React.useState<
    'loading' | 'ready' | 'raw-only'
  >('loading');
  const [result, setResult] = React.useState<MatchResult | null>(null);
  const [destinedTypes, setDestinedTypes] = React.useState<DestinedType[]>([]);

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

          // Resolve compatibleTypes (the "天选配偶" list) against the full
          // data set so we can display real names/taglines rather than the
          // fallback metadata enrichType uses.
          const byCode: Record<string, unknown> = {};
          for (const t of allTypes as unknown as Array<Record<string, unknown>>) {
            const code = t?.code;
            if (typeof code === 'string') byCode[code] = t;
          }
          const primary = match.type as unknown as Record<string, unknown>;
          const compatCodes = Array.isArray(primary?.compatibleTypes)
            ? (primary.compatibleTypes as string[])
            : [];
          const destined = compatCodes
            .map((code) => byCode[code] as Record<string, unknown> | undefined)
            .filter((t): t is Record<string, unknown> => Boolean(t))
            .map((t): DestinedType => {
              const tagline = t.tagline as { zh?: string } | string | undefined;
              return {
                code: String(t.code ?? ''),
                slug: String(t.slug ?? String(t.code ?? '').toLowerCase()),
                nameCN: String(t.nameCN ?? ''),
                nameEN: String(t.nameEN ?? ''),
                emoji: String(t.emoji ?? '✨'),
                color: String(t.color ?? '#a855f7'),
                tagline:
                  typeof tagline === 'string'
                    ? tagline
                    : tagline?.zh ?? '',
              };
            });
          setDestinedTypes(destined);
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

  return { state, result, destinedTypes };
}

export function ResultView() {
  const searchParams = useSearchParams();
  const patternParam = searchParams.get('pattern');
  const drunkParam = searchParams.get('drunk') === '1';

  const scores = React.useMemo(
    () => parseScoresFromPattern(patternParam),
    [patternParam],
  );

  const { state, result, destinedTypes } = useMatchResult(scores, drunkParam);

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
  // Type detail pages preserve '-' in slugs (e.g. 'love-r') but strip '!' and
  // whitespace. Matches the same rule used by generateStaticParams on /type.
  const primarySlug = primaryCode.toLowerCase().replace(/[!\s]/g, '');
  const typeHref = `/type/${primarySlug}`;

  return (
    <div className="mx-auto w-full max-w-5xl flex flex-col gap-10">
      {/* Hero */}
      <section className="text-center">
        <Badge variant="default" className="mx-auto">
          你的 SBTI 结果
        </Badge>
        <div className="mx-auto mt-5 w-fit drop-shadow-[0_0_40px_rgba(168,85,247,0.45)]">
          <TypePoster
            code={primaryCode}
            nameCN={primaryType.nameCN}
            fallbackEmoji={primaryType.emoji}
            priority
            sizes="(max-width: 640px) 140px, 180px"
            className="size-32 sm:size-40 rounded-3xl ring-1 ring-white/10"
          />
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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <a href="#share">📸 分享结果</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/match?t1=${encodeURIComponent(primaryCode)}`}>
              💘 爱情最佳配对
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`${typeHref}#strengths`}>
              👀 我的优缺点
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#destined">✨ 天选配偶</a>
          </Button>
        </div>
        <div className="mt-4">
          <Link
            href={typeHref}
            className="text-sm font-semibold text-purple-300 hover:text-purple-200"
          >
            查看 {primaryType.nameCN} 完整解读 →
          </Link>
        </div>
      </section>

      {/* Destined matches — 天选配偶 */}
      {destinedTypes.length > 0 && (
        <section id="destined" className="scroll-mt-24">
          <div className="mb-4">
            <Badge variant="default">天选配偶 · Destined Matches</Badge>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
              {primaryType.nameCN} 最搭的 {destinedTypes.length} 种人
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              15 维模型里和你最咬合、相处阻力最小的类型。
            </p>
          </div>
          <div
            className={cn(
              'grid gap-4',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            )}
          >
            {destinedTypes.map((t) => (
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
          <div className="mt-5 text-center">
            <Button asChild variant="outline">
              <Link href={`/match?t1=${encodeURIComponent(primaryCode)}`}>
                和 TA 做一次配对分析 →
              </Link>
            </Button>
          </div>
        </section>
      )}

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
      <ShareSection
        code={primaryCode}
        type={primaryType.nameCN}
        emoji={primaryType.emoji}
        catchphrase={primaryType.catchphrase}
        tagline={primaryType.tagline}
        subtitle={primaryType.nameEN}
        bestMatches={destinedTypes.slice(0, 2).map((t) => ({
          code: t.code,
          nameCN: t.nameCN,
          emoji: t.emoji,
          color: t.color,
        }))}
      />

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

// ---------------------------------------------------------------------------
// Share section — wraps the card in a capture target and owns the download
// flow. Split out so the useRef + html-to-image + dynamic import logic is
// isolated from the main ResultView, which stays server-compatible otherwise.
// ---------------------------------------------------------------------------

interface ShareSectionProps {
  code: string;
  type: string;
  emoji: string;
  catchphrase: string;
  tagline: string;
  subtitle?: string;
  bestMatches: ShareCardMatchType[];
}

function ShareSection({
  code,
  type,
  emoji,
  catchphrase,
  tagline,
  subtitle,
  bestMatches,
}: ShareSectionProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [status, setStatus] = React.useState<'idle' | 'saving' | 'copied'>(
    'idle',
  );

  const handleSave = React.useCallback(async () => {
    if (!cardRef.current || status === 'saving') return;
    setStatus('saving');
    try {
      // Dynamic import so html-to-image only ships on the result page.
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2, // retina-quality PNG
        cacheBust: true,
        backgroundColor: 'transparent',
      });
      const link = document.createElement('a');
      link.download = `sbti-${code.toLowerCase()}-result.png`;
      link.href = dataUrl;
      link.click();
      setStatus('idle');
    } catch (err) {
      console.error('[SBTI] share card export failed', err);
      setStatus('idle');
    }
  }, [code, status]);

  const handleCopyLink = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 1500);
    } catch {
      // clipboard may be blocked — fall back to no-op
    }
  }, []);

  return (
    <section id="share" className="scroll-mt-24">
      <div className="mb-4">
        <h2 className="text-2xl font-black tracking-tight text-white">
          分享你的结果
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          一键保存为图片，直接发朋友圈 / 小红书 / 微博 —— 图里含海报、口头禅、天选配偶和可扫码进站的二维码。
        </p>
      </div>

      {/* Capture target — the DOM node html-to-image rasterises */}
      <div ref={cardRef} className="inline-block">
        <ShareCard
          code={code}
          type={type}
          emoji={emoji}
          catchphrase={catchphrase}
          tagline={tagline}
          subtitle={subtitle}
          bestMatches={bestMatches}
          qrUrl="https://sbti-test.club"
          siteUrl="sbti-test.club"
        />
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={handleSave} disabled={status === 'saving'} size="lg">
          {status === 'saving' ? '生成图片中…' : '📸 保存为图片'}
        </Button>
        <Button onClick={handleCopyLink} variant="outline" size="lg">
          {status === 'copied' ? '✓ 链接已复制' : '🔗 复制结果链接'}
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-zinc-500">
        保存到的 PNG 是 2 倍像素，直接发社交平台清晰不糊
      </p>
    </section>
  );
}
