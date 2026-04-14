import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['zh', 'en'];
const DEFAULT_LOCALE = 'zh';

function getLocaleFromHeader(request: NextRequest): string {
  const accept = request.headers.get('accept-language') || '';
  // Simple match: if browser prefers Chinese, use zh; otherwise en
  if (/^zh/i.test(accept)) return 'zh';
  // For non-Chinese browsers visiting root, still default to zh
  // English users explicitly navigate to /en
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Default: rewrite to /zh/... (Chinese) without changing the URL
  // This means / stays as / in the browser, but internally routes to /zh/
  const locale = DEFAULT_LOCALE;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths, static files, and metadata files
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|logo|og-|types/.*\\.png$|.*\\.(?:svg|ico|png|jpg|webp)).*)',
  ],
};
