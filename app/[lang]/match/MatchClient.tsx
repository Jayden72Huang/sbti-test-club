'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { sbtiTypes } from '@/data/sbti-types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function MatchClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [t1, setT1] = React.useState(searchParams.get('t1') || '');
  const [t2, setT2] = React.useState(searchParams.get('t2') || '');
  const [age1, setAge1] = React.useState('');
  const [age2, setAge2] = React.useState('');
  const [gender1, setGender1] = React.useState('');
  const [gender2, setGender2] = React.useState('');
  const [city, setCity] = React.useState('');

  const canSubmit = t1 && t2;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const params = new URLSearchParams({ t1, t2 });
    if (age1) params.set('age1', age1);
    if (age2) params.set('age2', age2);
    if (gender1) params.set('gender1', gender1);
    if (gender2) params.set('gender2', gender2);
    if (city) params.set('city', city);
    router.push(`/match/result?${params.toString()}`);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 py-8">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Person 1 */}
            <div>
              <label
                htmlFor="match-t1"
                className="block text-sm font-bold mb-2 text-zinc-200"
              >
                你的 SBTI
              </label>
              <select
                id="match-t1"
                value={t1}
                onChange={(e) => setT1(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-zinc-100 focus:border-purple-500 focus:outline-none"
              >
                <option value="">选择你的类型...</option>
                {sbtiTypes.map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.emoji} {t.code} · {t.nameCN}
                  </option>
                ))}
              </select>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={age1}
                  onChange={(e) => setAge1(e.target.value)}
                  placeholder="年龄（可选）"
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-sm text-zinc-100 focus:border-purple-500 focus:outline-none"
                />
                <select
                  value={gender1}
                  onChange={(e) => setGender1(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-sm text-zinc-100 focus:border-purple-500 focus:outline-none"
                >
                  <option value="">性别</option>
                  <option value="female">女</option>
                  <option value="male">男</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>

            {/* Person 2 */}
            <div>
              <label
                htmlFor="match-t2"
                className="block text-sm font-bold mb-2 text-zinc-200"
              >
                TA 的 SBTI
              </label>
              <select
                id="match-t2"
                value={t2}
                onChange={(e) => setT2(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-zinc-100 focus:border-purple-500 focus:outline-none"
              >
                <option value="">选择 TA 的类型...</option>
                {sbtiTypes.map((t) => (
                  <option key={t.code} value={t.code}>
                    {t.emoji} {t.code} · {t.nameCN}
                  </option>
                ))}
              </select>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={age2}
                  onChange={(e) => setAge2(e.target.value)}
                  placeholder="年龄（可选）"
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-sm text-zinc-100 focus:border-purple-500 focus:outline-none"
                />
                <select
                  value={gender2}
                  onChange={(e) => setGender2(e.target.value)}
                  className="bg-zinc-900 border border-zinc-700 rounded-xl p-2 text-sm text-zinc-100 focus:border-purple-500 focus:outline-none"
                >
                  <option value="">性别</option>
                  <option value="female">女</option>
                  <option value="male">男</option>
                  <option value="other">其他</option>
                </select>
              </div>
            </div>
          </div>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="所在城市（可选，用于个性化推荐）"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-sm text-zinc-100 focus:border-purple-500 focus:outline-none"
          />

          <Button
            onClick={handleSubmit}
            size="lg"
            disabled={!canSubmit}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            生成配对报告 →
          </Button>

          <p className="text-xs text-center text-zinc-500">
            配对结果 100% 在本地计算，不会保存任何数据
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
