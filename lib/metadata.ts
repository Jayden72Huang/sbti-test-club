import type { Metadata } from 'next';

/**
 * Canonical site origin. Override with NEXT_PUBLIC_SITE_URL in .env for
 * preview / staging. Trailing slash is intentionally absent.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sbti-test.club'
).replace(/\/$/, '');

export const SITE_NAME = 'SBTI Test Club';
export const SITE_TWITTER_HANDLE = '@sbtitestclub';
export const DEFAULT_OG_IMAGE = '/og-default.png';

export type Locale = 'zh' | 'en';

export interface BuildMetadataOpts {
  title: string;
  description: string;
  /** Path relative to the site origin, e.g. '/test' or '/type/hhhh'. */
  path?: string;
  /** OG / Twitter image path. Defaults to DEFAULT_OG_IMAGE. */
  ogImage?: string;
  /** Extra keywords. */
  keywords?: string[];
  /** Locale the page is rendered in. Defaults to 'zh'. */
  locale?: Locale;
  /** OG type. Defaults to 'website'. */
  type?: 'website' | 'article';
  /** Mark page as noindex (e.g. dynamic result pages). */
  noIndex?: boolean;
}

/** Resolve a path-or-URL into an absolute URL on the canonical origin. */
function toAbsolute(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * Build hreflang `alternates.languages` for a given path.
 * Now that app/[lang]/... ships both zh and en, emit both hreflang tags
 * so Google can serve the right language to each user.
 */
function buildLanguages(path: string): Record<string, string> {
  const basePath = path === '/' ? '' : path;
  return {
    'zh-CN': `${SITE_URL}${basePath || '/'}`,
    en: `${SITE_URL}/en${basePath || ''}`,
    'x-default': `${SITE_URL}${basePath || '/'}`,
  };
}

/**
 * Single source of truth for per-page metadata. Returns a Next.js `Metadata`
 * object with title, description, keywords, robots, canonical, hreflang
 * alternates, OpenGraph and Twitter Card fields pre-filled.
 *
 * Non-root pages automatically get a " | SBTI Test Club" suffix; pass a path
 * of '/' (or omit `path`) to keep the title verbatim for the home page.
 */
export function buildMetadata(opts: BuildMetadataOpts): Metadata {
  const {
    title,
    description,
    path = '/',
    ogImage = DEFAULT_OG_IMAGE,
    keywords,
    locale = 'zh',
    type = 'website',
    noIndex = false,
  } = opts;

  const isHome = path === '/' || path === '';
  const fullTitle = isHome ? title : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}${isHome ? '' : path}` || SITE_URL;
  const image = toAbsolute(ogImage);

  return {
    title: fullTitle,
    description,
    ...(keywords && keywords.length > 0 ? { keywords } : {}),
    robots: noIndex
      ? { index: false, follow: true, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    alternates: {
      canonical,
      languages: buildLanguages(path),
    },
    openGraph: {
      type,
      url: canonical,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      site: SITE_TWITTER_HANDLE,
      creator: SITE_TWITTER_HANDLE,
    },
  };
}
