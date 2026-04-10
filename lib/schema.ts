/**
 * JSON-LD schema.org helpers.
 *
 * Each helper returns a plain object ready to hand to the <SchemaJsonLd />
 * component. They do not emit JSX so the same helpers can be reused from
 * server components, route handlers, or tests.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sbti-test.club'
).replace(/\/$/, '');

const SITE_NAME = 'SBTI Test Club';
const SITE_DESCRIPTION =
  'Free SBTI (Silly Big Personality Test) - 27 personality types, couple compatibility, and deep interpretation. The viral anti-MBTI test.';

type JsonLd = Record<string, unknown>;

function toAbsolute(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const normalized = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${normalized}`;
}

/**
 * WebApplication schema for tool-like pages. Rich results render a free
 * offer chip thanks to the Offer node.
 */
export function webApplicationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: 'EntertainmentApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: SITE_DESCRIPTION,
  };
}

/**
 * Organization node. Used as a publisher reference in other schemas and on
 * the root layout so Google can associate the site with an entity.
 */
export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: toAbsolute('/og-default.png'),
      width: 1200,
      height: 630,
    },
    sameAs: [],
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FAQPage schema. `faqs` is an array of `{ q, a }` pairs in visual order.
 * Google expects plain text in the `text` field — basic HTML is tolerated
 * but not rich markup.
 */
export function faqPageSchema(faqs: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  /** Absolute URL or path — paths are auto-resolved to the site origin. */
  url: string;
}

/**
 * BreadcrumbList schema. Position is auto-assigned from array order so
 * callers just pass items in the visual order they appear on the page.
 */
export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsolute(item.url),
    })),
  };
}

export interface ItemListEntry {
  name: string;
  url: string;
  position: number;
  description?: string;
  image?: string;
}

/**
 * ItemList schema — use for the /types index and /match pairing grid so
 * Google can parse the visual list as structured data.
 */
export function itemListSchema(items: ItemListEntry[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      url: toAbsolute(item.url),
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: toAbsolute(item.image) } : {}),
    })),
  };
}

export interface ArticleSchemaOpts {
  title: string;
  description: string;
  /** Absolute URL or path. */
  url: string;
  datePublished?: string;
  author?: string;
}

/**
 * Article schema for blog-style pages (about / faq / long-form type
 * detail pages). Dates should be ISO-8601 strings.
 */
export function articleSchema(opts: ArticleSchemaOpts): JsonLd {
  const {
    title,
    description,
    url,
    datePublished,
    author = SITE_NAME,
  } = opts;
  const absoluteUrl = toAbsolute(url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl,
    },
    url: absoluteUrl,
    ...(datePublished ? { datePublished } : {}),
    author: {
      '@type': 'Organization',
      name: author,
      url: SITE_URL,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}
