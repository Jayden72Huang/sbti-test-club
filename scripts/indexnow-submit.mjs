#!/usr/bin/env node
/**
 * IndexNow batch submitter.
 *
 * IndexNow is an open protocol accepted by Bing, Yandex, Naver, Seznam, and —
 * crucially for GEO — Perplexity, ChatGPT Search, and Copilot (all of whom
 * lease Bing's web index). Google explicitly does NOT participate.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs              # submit everything in sitemap
 *   node scripts/indexnow-submit.mjs <url1> <url2>  # submit specific URLs
 *
 * Reads the key file committed at public/<KEY>.txt so there is zero secrets
 * drift between what IndexNow sees and what's shipped on the domain.
 */

const HOST = 'sbti-test.club';
const KEY = '4dabcbfe9041a64be20967195bc4e4cd';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP, {
    headers: { 'user-agent': 'sbti-test-club/indexnow 1.0' },
  });
  if (!res.ok) {
    throw new Error(`sitemap fetch failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  // Zero-dep regex extract of <loc>…</loc> entries. Sitemaps are simple
  // enough that a full XML parser is overkill here.
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urls) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { status: res.status, ok: res.ok, body: text };
}

async function main() {
  const cliUrls = process.argv.slice(2).filter(Boolean);
  const urls = cliUrls.length > 0 ? cliUrls : await fetchSitemapUrls();

  if (urls.length === 0) {
    console.error('no urls to submit');
    process.exit(1);
  }

  console.log(`submitting ${urls.length} urls to IndexNow…`);
  const result = await submit(urls);
  console.log(`status: ${result.status}`);
  console.log(`body: ${result.body || '(empty)'}`);
  console.log(
    result.ok
      ? '✓ accepted — Bing/Yandex/Perplexity will crawl within minutes'
      : '✗ rejected — check key file at ' + KEY_LOCATION,
  );
  process.exit(result.ok ? 0 : 2);
}

main().catch((err) => {
  console.error(err);
  process.exit(3);
});
