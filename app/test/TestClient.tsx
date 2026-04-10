'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import {
  calculateDimensionScores,
  isDrunkTriggered,
  matchSbtiType,
  type Answers,
  type SbtiType,
} from '@/lib/scoring';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { RadioGroup, type RadioOption } from '@/components/ui/RadioGroup';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'sbti_test_answers';
const STORAGE_VERSION = 1;
const AUTO_ADVANCE_DELAY_MS = 300;
const SUBMIT_LOADING_DELAY_MS = 1000;

interface PersistedState {
  answers: Answers;
  currentIndex: number;
  started: boolean;
  version: number;
}

const EMPTY_STATE: PersistedState = {
  answers: {},
  currentIndex: 0,
  started: false,
  version: STORAGE_VERSION,
};

function readPersisted(): PersistedState {
  if (typeof window === 'undefined') return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (!parsed || parsed.version !== STORAGE_VERSION) return EMPTY_STATE;
    return {
      answers: parsed.answers ?? {},
      currentIndex:
        typeof parsed.currentIndex === 'number' ? parsed.currentIndex : 0,
      started: parsed.started === true,
      version: STORAGE_VERSION,
    };
  } catch {
    return EMPTY_STATE;
  }
}

function writePersisted(state: PersistedState) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / private mode errors */
  }
}

function clearPersisted() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Normalize a type code into a URL-safe slug for the /type/[code] route.
 * Per team spec: only strip '!' and whitespace; preserve '-' in codes
 * like 'LOVE-R' → 'love-r', 'ATM-er' → 'atm-er'. 'WOC!' → 'woc'.
 */
function codeToSlug(code: string): string {
  return code.toLowerCase().replace(/[!\s]/g, '');
}

// ---------------------------------------------------------------------------
// MINIMAL_TYPES stub
//
// Temporary stand-in for data/sbti-types.ts so the test flow is unblocked
// while data-author finishes the full type library. Each entry ships a
// 15-dim H/M/L pattern so matchSbtiType() can place the user. When
// data/sbti-types.ts is ready a follow-up task will swap this for an import.
// ---------------------------------------------------------------------------

const MINIMAL_TYPES: SbtiType[] = [
  // 25 normal types
  { code: 'DEAD', pattern: 'LLL-LLL-LHL-LLL-LHM' },
  { code: 'MALO', pattern: 'LLM-LLL-LLH-LLL-LMH' },
  { code: 'CTRL', pattern: 'HHH-MHH-HHH-HHH-MMH' },
  { code: 'BOSS', pattern: 'HHH-HHH-HHH-HHH-HHH' },
  { code: 'GOGO', pattern: 'MHH-MMM-MHH-HHH-HHM' },
  { code: 'SEXY', pattern: 'HHM-MMH-MHM-MHM-HHH' },
  { code: 'LOVE-R', pattern: 'MMH-HHH-LHL-MMM-MHH' },
  { code: 'MUM', pattern: 'MHH-HHM-HLM-MHH-HHH' },
  { code: 'FAKE', pattern: 'LLM-MMM-MHM-MMM-HMM' },
  { code: 'OJBK', pattern: 'MMM-MMM-MHH-LLM-MMM' },
  { code: 'JOKE-R', pattern: 'MHM-MHM-HHM-MMM-HHH' },
  { code: 'WOC!', pattern: 'MMM-HHM-LHM-MMM-HMH' },
  { code: 'THAN-K', pattern: 'HHH-HHM-HMH-MMH-HHH' },
  { code: 'OH-NO', pattern: 'LMM-MHM-LLM-MMH-MMM' },
  { code: 'ATM-er', pattern: 'MHH-HHL-LLM-HMH-HHH' },
  { code: 'Dior-s', pattern: 'LLM-LMM-LHH-LLM-MLM' },
  { code: 'THIN-K', pattern: 'MHH-LMM-HMH-MHM-LLH' },
  { code: 'SHIT', pattern: 'MLL-LMH-LHL-MMM-MLH' },
  { code: 'ZZZZ', pattern: 'LLL-LLL-LHM-LLL-LLL' },
  { code: 'POOR', pattern: 'LLH-LLM-LMH-HLM-LLM' },
  { code: 'MONK', pattern: 'MHH-MLL-HMH-LLL-LHM' },
  { code: 'IMSB', pattern: 'LLL-HHM-LHM-LMM-MML' },
  { code: 'SOLO', pattern: 'MMH-LLL-MMH-MMM-LHM' },
  { code: 'FUCK', pattern: 'HLM-LLL-LHL-HHM-HLH' },
  { code: 'IMFW', pattern: 'LLL-HHL-LLL-LLL-MLL' },

  // Fallback HHHH — matched when no normal type reaches 60% similarity.
  // scoring.ts marks isSpecial so rankNormalTypes won't include it.
  {
    code: 'HHHH',
    pattern: 'MMM-MMM-MMM-MMM-MMM',
    isSpecial: true,
    trigger: 'fallback',
  },

  // Hidden DRUNK — activated via the hidden trigger question.
  {
    code: 'DRUNK',
    pattern: 'LMM-HLM-MMM-LLM-HHH',
    isSpecial: true,
    trigger: 'drunk',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestClient() {
  const router = useRouter();
  const [hydrated, setHydrated] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [answers, setAnswers] = React.useState<Answers>({});
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const advanceTimerRef = React.useRef<number | null>(null);

  // Hydrate from localStorage on first client render.
  React.useEffect(() => {
    const state = readPersisted();
    setAnswers(state.answers);
    setCurrentIndex(
      Math.min(
        Math.max(0, state.currentIndex),
        Math.max(0, questions.length - 1),
      ),
    );
    setStarted(state.started);
    setHydrated(true);
  }, []);

  // Persist on every change (but only after hydration so we don't nuke it).
  React.useEffect(() => {
    if (!hydrated) return;
    writePersisted({
      answers,
      currentIndex,
      started,
      version: STORAGE_VERSION,
    });
  }, [answers, currentIndex, started, hydrated]);

  // Clear any pending auto-advance timer on unmount.
  React.useEffect(() => {
    return () => {
      if (advanceTimerRef.current !== null) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  const total = questions.length;
  const question = questions[currentIndex];
  const selected = question ? answers[question.id] : undefined;
  const isLast = currentIndex === total - 1;
  const progressPct = Math.round(((currentIndex + 1) / total) * 100);
  const answeredCount = Object.keys(answers).length;

  const goTo = React.useCallback(
    (index: number) => {
      if (index < 0 || index >= total) return;
      if (advanceTimerRef.current !== null) {
        window.clearTimeout(advanceTimerRef.current);
        advanceTimerRef.current = null;
      }
      setCurrentIndex(index);
    },
    [total],
  );

  const submit = React.useCallback(
    (finalAnswers: Answers) => {
      setSubmitting(true);

      try {
        // Short-circuit: hidden DRUNK trigger wins unconditionally.
        const drunk = isDrunkTriggered(finalAnswers, questions);
        if (drunk) {
          clearPersisted();
          window.setTimeout(
            () => router.push('/type/drunk?from=test&match=100&drunk=1'),
            SUBMIT_LOADING_DELAY_MS,
          );
          return;
        }

        // Normal flow: 15-dim scores → match against MINIMAL_TYPES stub.
        const scores = calculateDimensionScores(finalAnswers, questions);
        const result = matchSbtiType(scores, MINIMAL_TYPES);
        const slug = codeToSlug(result.type.code);
        const href = `/type/${slug}?from=test&match=${result.matchPercent}`;

        clearPersisted();
        window.setTimeout(() => router.push(href), SUBMIT_LOADING_DELAY_MS);
      } catch (err) {
        console.error('[SBTI] scoring failed', err);
        setSubmitting(false);
      }
    },
    [router],
  );

  const handleSelect = React.useCallback(
    (value: string) => {
      if (!question) return;
      const optionId = value as 'a' | 'b' | 'c' | 'd';
      setAnswers((prev) => {
        const next = { ...prev, [question.id]: optionId };
        if (advanceTimerRef.current !== null) {
          window.clearTimeout(advanceTimerRef.current);
        }
        advanceTimerRef.current = window.setTimeout(() => {
          if (isLast) {
            submit(next);
          } else {
            setCurrentIndex((idx) => Math.min(idx + 1, total - 1));
          }
        }, AUTO_ADVANCE_DELAY_MS);
        return next;
      });
    },
    [question, isLast, total, submit],
  );

  const handleRestart = React.useCallback(() => {
    clearPersisted();
    setAnswers({});
    setCurrentIndex(0);
    setStarted(false);
    setSubmitting(false);
  }, []);

  const handleStart = React.useCallback(() => {
    setStarted(true);
  }, []);

  // ------------------------------------------------------------------
  // Render branches
  // ------------------------------------------------------------------

  // Skeleton until we've read localStorage (avoid hydration mismatch).
  if (!hydrated) {
    return (
      <>
        <Nav />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-zinc-500 text-sm">加载测试…</div>
        </main>
        <Footer />
      </>
    );
  }

  // Welcome screen — user must explicitly start the test.
  if (!started) {
    const hasProgress = answeredCount > 0;
    return (
      <>
        <Nav />
        <main className="relative flex-1 overflow-hidden px-4 py-16 sm:py-24">
          {/* Ambient gradient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
            <div className="absolute left-1/3 bottom-0 h-[360px] w-[360px] rounded-full bg-pink-500/10 blur-[120px]" />
          </div>

          <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-purple-300">
              SBTI · Silly Big Personality Test
            </div>

            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white leading-[1.05]">
              31 道题
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                3 分钟扎心开始
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-zinc-300 leading-relaxed">
              15 维 × 5 组心理模型，定位你在 27 种沙雕人格里的真实坐标。
              <br />
              没有注册，没有弹窗，刷新页面都能继续。
            </p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold text-zinc-400">
              <li className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
                <div className="text-white text-sm">31 题</div>
                <div className="mt-1">覆盖 15 维度</div>
              </li>
              <li className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
                <div className="text-white text-sm">3 分钟</div>
                <div className="mt-1">自动前进 · 可回退</div>
              </li>
              <li className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3">
                <div className="text-white text-sm">27 种原型</div>
                <div className="mt-1">曼哈顿距离匹配</div>
              </li>
            </ul>

            <div className="mt-10 flex w-full flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleStart}
                className={cn(
                  'group relative inline-flex w-full max-w-sm items-center justify-center overflow-hidden rounded-full',
                  'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500',
                  'px-8 py-4 text-base font-black tracking-wide text-white',
                  'shadow-[0_0_40px_rgba(168,85,247,0.45)]',
                  'transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]',
                )}
              >
                <span className="relative z-10">
                  {hasProgress
                    ? `继续作答（第 ${currentIndex + 1} 题）`
                    : '立刻开始测试'}
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </button>
              {hasProgress && (
                <button
                  type="button"
                  onClick={handleRestart}
                  className="text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-300"
                >
                  放弃进度 · 从头再来
                </button>
              )}
              <Link
                href="/"
                className="mt-2 text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-300"
              >
                返回首页
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Loading / submitting screen — shown after the final answer.
  if (submitting) {
    return (
      <>
        <Nav />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              aria-hidden
              className="h-16 w-16 rounded-full border-4 border-zinc-800 border-t-purple-400 animate-spin"
            />
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              正在解析你的 15 维人格向量…
            </div>
            <p className="text-sm text-zinc-400 max-w-sm">
              匹配 27 种 SBTI 原型 · 计算曼哈顿距离 · 输出相似度
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Defensive fallback: question list was somehow empty.
  if (!question) {
    return (
      <>
        <Nav />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-zinc-500 text-sm">题库加载失败，请刷新页面。</div>
        </main>
        <Footer />
      </>
    );
  }

  // Main question flow.
  const options: RadioOption[] = question.options.map((o) => ({
    value: o.id,
    label: o.textCN,
  }));

  return (
    <>
      <Nav />
      <main className="flex-1 px-4 py-10 sm:py-14">
        <div className="mx-auto w-full max-w-2xl">
          {/* Header + progress */}
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold uppercase tracking-widest text-purple-300">
              SBTI 测试
            </div>
            <div className="text-xs font-semibold text-zinc-400">
              第 <span className="text-white">{currentIndex + 1}</span> / {total} 题
            </div>
          </div>
          <Progress
            value={progressPct}
            label={`测试进度 ${progressPct}%`}
            className="mb-8"
          />

          {/* Question card */}
          <div
            key={question.id}
            className={cn(
              'rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8',
              'animate-in fade-in slide-in-from-bottom-2 duration-300',
            )}
          >
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
              {question.textCN}
            </h1>

            <div className="mt-6">
              <RadioGroup
                name={`q-${question.id}`}
                options={options}
                value={selected}
                onChange={handleSelect}
              />
            </div>
          </div>

          {/* Footer controls */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
            >
              上一题
            </Button>

            <div className="hidden sm:block text-xs text-zinc-500">
              已作答 {answeredCount} / {total}
            </div>

            {isLast ? (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => submit(answers)}
                disabled={!selected}
              >
                查看结果
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={() => goTo(currentIndex + 1)}
                disabled={!selected}
              >
                下一题
              </Button>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-zinc-500">
            <button
              type="button"
              onClick={handleRestart}
              className="underline underline-offset-4 hover:text-zinc-300"
            >
              重新开始测试
            </button>
            <span>·</span>
            <Link
              href="/"
              className="underline underline-offset-4 hover:text-zinc-300"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
