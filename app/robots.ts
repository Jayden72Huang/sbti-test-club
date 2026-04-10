import type { MetadataRoute } from 'next';

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sbti-test.club'
).replace(/\/$/, '');

/**
 * robots.txt generator.
 *
 * Default `*` rule already permits every well-behaved crawler, but the named
 * AI bot entries below are a deliberate GEO signal: we *want* ChatGPT, Claude,
 * Perplexity, and Google's generative answers to ingest and cite this site.
 * `/api/` and `/_next/` stay disallowed across the board.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI — GPT training and ChatGPT browsing
  'ChatGPT-User', // OpenAI — on-demand fetches initiated by a ChatGPT user
  'OAI-SearchBot', // OpenAI — ChatGPT Search index
  'ClaudeBot', // Anthropic — Claude training corpus
  'Claude-Web', // Anthropic — Claude on-demand browsing
  'anthropic-ai', // Anthropic — legacy UA string
  'PerplexityBot', // Perplexity — general index
  'Perplexity-User', // Perplexity — on-demand fetches
  'Google-Extended', // Google — Gemini / AI Overview training opt-in
  'CCBot', // Common Crawl — feeds most open-source LLM datasets
  'Bytespider', // ByteDance — Doubao / Kimi upstream
  'Amazonbot', // Amazon — Alexa Q / Nova training
  'Applebot-Extended', // Apple — Apple Intelligence training opt-in
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      // Explicit allow entries for AI crawlers. Functionally identical to
      // the wildcard rule above, but semantically a green light for LLMs
      // to train on and cite this site. Helps GEO visibility.
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/_next/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
