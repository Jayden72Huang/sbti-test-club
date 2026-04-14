import type { MetadataRoute } from 'next';

import { guides } from '@/data/guides';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sbti-test.club'
).replace(/\/$/, '');

/**
 * Sitemap generator.
 *
 * Imports `@/data/sbti-types` dynamically so the build does not break while
 * data-author is still producing that file — if the module resolves, its
 * exported `sbtiTypes` array is used; if it errors, we fall back to an
 * empty list and only emit the static routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { sbtiTypes } = await import('@/data/sbti-types').catch(
    () => ({ sbtiTypes: [] as Array<{ slug: string }> }),
  );

  const now = new Date();
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/test', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/types', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/match', priority: 0.9, changeFrequency: 'weekly' as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Emit both Chinese (root) and English (/en) URLs.
  for (const r of staticRoutes) {
    entries.push({
      url: `${SITE_URL}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    });
    entries.push({
      url: `${SITE_URL}/en${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority * 0.9,
    });
  }

  for (const t of sbtiTypes) {
    entries.push({
      url: `${SITE_URL}/type/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
    entries.push({
      url: `${SITE_URL}/en/type/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // L3 guide pages (long-form SEO articles).
  entries.push({
    url: `${SITE_URL}/guide`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  });
  for (const g of guides) {
    entries.push({
      url: `${SITE_URL}/guide/${g.slug}`,
      lastModified: new Date(g.datePublished),
      changeFrequency: 'monthly',
      priority: 0.85,
    });
  }

  // Match aggregation / browse index — discoverable parent for every pair.
  entries.push({
    url: `${SITE_URL}/match/all`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  });

  // Couple-pair pages: only the ~111 canonical pairs that have hand-written
  // Compatibility entries. Everything else is deliberately excluded from
  // the sitemap so Google never discovers the algorithmic fallback output.
  // Source of truth is app/match/[a]/[b]/page.tsx `getAuthoredPairs()` to
  // guarantee the sitemap can never drift from the SSG route set.
  const { getAuthoredPairs } = await import('./[lang]/match/[a]/[b]/page');
  const authoredPairs = getAuthoredPairs();
  for (const { a, b } of authoredPairs) {
    entries.push({
      url: `${SITE_URL}/match/${a}/${b}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
