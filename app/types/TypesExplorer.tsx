'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export type GroupKey = 'self' | 'emotion' | 'attitude' | 'action' | 'social';

export interface ExplorerType {
  code: string;
  slug: string;
  nameCN: string;
  nameEN: string;
  emoji: string;
  color: string;
  taglineZh: string;
  group: GroupKey;
  isSpecial?: 'fallback' | 'hidden';
}

export interface ExplorerGroup {
  key: GroupKey;
  labelCN: string;
  labelEN: string;
  emoji: string;
  descCN: string;
}

export interface TypesExplorerProps {
  types: ExplorerType[];
  groups: ExplorerGroup[];
  categoryIntros: {
    self: string;
    emotion: string;
    attitude: string;
    action: string;
    social: string;
  };
}

type FilterKey = 'all' | GroupKey | 'special';

const filterLabels: Record<FilterKey, string> = {
  all: '全部',
  self: '自我',
  emotion: '情感',
  attitude: '态度',
  action: '行动',
  social: '社交',
  special: '特殊',
};

const filterEmojis: Record<FilterKey, string> = {
  all: '🎭',
  self: '🪞',
  emotion: '💔',
  attitude: '🎭',
  action: '⚡',
  social: '🎪',
  special: '✨',
};

export default function TypesExplorer({
  types,
  groups,
  categoryIntros,
}: TypesExplorerProps) {
  const [filter, setFilter] = React.useState<FilterKey>('all');

  const filteredTypes = React.useMemo(() => {
    if (filter === 'all') return types;
    if (filter === 'special') return types.filter((t) => t.isSpecial);
    return types.filter((t) => !t.isSpecial && t.group === filter);
  }, [types, filter]);

  const activeGroup = groups.find((g) => g.key === filter);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {(['all', ...groups.map((g) => g.key), 'special'] as FilterKey[]).map(
          (key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-bold transition-all',
                filter === key
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-purple-500/50'
              )}
            >
              <span className="mr-1">{filterEmojis[key]}</span>
              {filterLabels[key]}
            </button>
          )
        )}
      </div>

      {/* Group description */}
      {activeGroup && (
        <div className="mx-auto max-w-3xl mb-8 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
          <div className="flex gap-3 items-start">
            <div className="text-4xl">{activeGroup.emoji}</div>
            <div>
              <h3 className="text-xl font-black mb-2">{activeGroup.labelCN}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {categoryIntros[filter as GroupKey]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Type grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredTypes.map((t) => (
          <Link key={t.code} href={`/type/${t.slug}`}>
            <Card
              className="h-full hover:border-purple-500/70 transition-all cursor-pointer group"
              style={{
                borderColor: t.isSpecial ? undefined : undefined,
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-5xl group-hover:scale-110 transition-transform">
                    {t.emoji}
                  </div>
                  {t.isSpecial && (
                    <Badge variant="destructive" className="text-[10px]">
                      {t.isSpecial === 'fallback' ? '兜底' : '隐藏'}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg mt-2">{t.nameCN}</CardTitle>
                <p className="text-xs text-zinc-500 font-mono">{t.code}</p>
              </CardHeader>
              <CardContent className="text-xs text-zinc-400 line-clamp-2">
                {t.taglineZh}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <p className="text-center mt-6 text-sm text-zinc-500">
        显示 {filteredTypes.length} / {types.length} 种类型
      </p>
    </div>
  );
}
