import type { MetadataRoute } from 'next';

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
      priority: r.priority,
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
      priority: 0.8,
    });
  }

  return entries;
}
