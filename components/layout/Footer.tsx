import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { type Locale, localePath } from '@/lib/i18n';

export interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterProps {
  locale?: Locale;
  /** @deprecated Use locale instead */
  localePrefix?: string;
  friendLinks?: FooterLink[];
  className?: string;
}

export function Footer({
  locale,
  localePrefix = '',
  friendLinks = [],
  className,
}: FooterProps) {
  const isEn = locale === 'en' || localePrefix === '/en';
  const year = new Date().getFullYear();

  const loc: Locale = isEn ? 'en' : 'zh';

  const productLinks: FooterLink[] = isEn
    ? [
        { href: localePath('/test', loc), label: 'Take the test' },
        { href: localePath('/types', loc), label: '27 SBTI types' },
        { href: localePath('/match', loc), label: 'Type matching' },
      ]
    : [
        { href: '/test', label: '开始测试' },
        { href: '/types', label: '27 类型库' },
        { href: '/match', label: '配对分析' },
      ];

  const aboutLinks: FooterLink[] = isEn
    ? [
        { href: localePath('/about', loc), label: 'About SBTI' },
        { href: localePath('/faq', loc), label: 'FAQ' },
        { href: localePath('/privacy', loc), label: 'Privacy' },
      ]
    : [
        { href: '/about', label: '关于 SBTI' },
        { href: '/faq', label: '常见问题' },
        { href: '/privacy', label: '隐私政策' },
      ];

  return (
    <footer
      className={cn(
        'border-t border-zinc-800/60 bg-zinc-950 text-zinc-400',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link
              href={localePath('/', loc)}
              className="flex items-center gap-2 font-black tracking-tight text-white text-lg"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/40"
              >
                S
              </span>
              <span>sbti-test.club</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              {isEn
                ? 'Discover your SBTI personality among 27 unique types, built for the next generation of self-reflection.'
                : '27 种 SBTI 人格综合站，用更真实、更有趣的维度重新认识自己。'}
            </p>
          </div>

          <FooterColumn
            title={isEn ? 'Product' : '产品'}
            links={productLinks}
          />
          <FooterColumn
            title={isEn ? 'Company' : '关于'}
            links={aboutLinks}
          />

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {isEn ? 'More Fun Tests' : '更多好玩测试'}
            </h3>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              <li>
                <a
                  href="https://mylittleponytest.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  🦄 {isEn ? 'My Little Pony Test' : '小马宝莉人格测试'}
                </a>
              </li>
              <li>
                <a
                  href="https://datingstandardscalculator.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-300 transition-colors"
                >
                  💘 {isEn ? 'Dating Standards Calculator' : '约会标准计算器'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {friendLinks.length > 0 && (
          <div className="mt-10 border-t border-zinc-800/60 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              {isEn ? 'Friend Links' : '友情链接'}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {friendLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-zinc-400 hover:text-purple-300 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 border-t border-zinc-800/60 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <p>© {year} SBTI Club. All rights reserved.</p>
          <p>
            {isEn
              ? 'Made with purpose, not just for fun.'
              : '用心而非只是娱乐。'}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-white">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-purple-300 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: 'x' | 'ig' | 'xhs';
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-purple-500/60 transition-colors"
    >
      <span className="text-xs font-black uppercase tracking-tight">
        {icon}
      </span>
    </a>
  );
}
