'use client';

import * as React from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Google Analytics 4 integration (Measurement ID is public by design —
 * it ships to every visitor's browser, so committing it is fine).
 *
 * Architecture:
 *   1. Two <Script> tags load gtag.js and initialise GA4 with
 *      `send_page_view: false` so we control page_view events ourselves.
 *   2. PageViewTracker hooks into App Router navigation via
 *      usePathname() + useSearchParams() and fires a page_view event on
 *      every client-side route change. Wrapped in <Suspense> because
 *      useSearchParams() would otherwise force every page out of static
 *      generation.
 *   3. Dev traffic is skipped so local browsing doesn't pollute GA data.
 */

const GA_MEASUREMENT_ID = 'G-3LK72G4765';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    if (!pathname || typeof window.gtag !== 'function') return;
    const query = searchParams?.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;
    window.gtag('event', 'page_view', {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  // Skip in development so localhost traffic never lands in GA.
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
        `}
      </Script>
      <React.Suspense fallback={null}>
        <PageViewTracker />
      </React.Suspense>
    </>
  );
}
