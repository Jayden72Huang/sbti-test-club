import type { Metadata } from 'next';
import Link from 'next/link';

import { buildMetadata } from '@/lib/metadata';
import { type Locale, localePath } from '@/lib/i18n';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';

  return buildMetadata({
    title: isEn ? 'Privacy Policy' : '隐私政策',
    description: isEn
      ? 'SBTI Test Club privacy policy: what data we collect, how we use Google Analytics, and your rights.'
      : 'SBTI Test Club 隐私政策：我们收集哪些数据、如何使用 Google Analytics、以及你的权利。',
    path: localePath('/privacy', locale),
    locale,
  });
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const isEn = locale === 'en';

  return (
    <>
      <Nav locale={locale} />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {isEn ? 'Privacy Policy' : '隐私政策'}
          </h1>
          <p className="mt-4 text-sm text-zinc-500">
            {isEn ? 'Last updated: April 2026' : '最后更新：2026 年 4 月'}
          </p>

          <div className="mt-10 space-y-10 text-base leading-[1.9] text-zinc-300">
            {/* 1 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '1. What We Collect' : '1. 我们收集什么'}
              </h2>
              {isEn ? (
                <ul className="mt-3 list-disc pl-5 space-y-2">
                  <li>
                    <strong>No personal data.</strong> SBTI Test Club does not require signup, login, email, or any personally identifiable information.
                  </li>
                  <li>
                    <strong>Test answers.</strong> Your quiz responses are processed entirely in your browser. We do not send or store them on any server.
                  </li>
                  <li>
                    <strong>Analytics.</strong> We use Google Analytics 4 (GA4) to collect anonymous usage data such as page views, referral sources, device type, and country-level location. This helps us understand how people use the site and improve the experience.
                  </li>
                </ul>
              ) : (
                <ul className="mt-3 list-disc pl-5 space-y-2">
                  <li>
                    <strong>不收集个人信息。</strong> SBTI Test Club 不需要注册、登录、邮箱或任何个人身份信息。
                  </li>
                  <li>
                    <strong>测试答案。</strong> 你的答题数据完全在浏览器本地处理，不会发送到任何服务器，也不会被存储。
                  </li>
                  <li>
                    <strong>匿名分析。</strong> 我们使用 Google Analytics 4 (GA4) 收集匿名使用数据，如页面浏览量、来源渠道、设备类型和国家级别的地理位置，用于改善网站体验。
                  </li>
                </ul>
              )}
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '2. Cookies' : '2. Cookie 使用'}
              </h2>
              <p className="mt-3">
                {isEn
                  ? 'Google Analytics sets cookies (_ga, _ga_*) to distinguish unique visitors and track sessions. These cookies contain no personally identifiable information. You can opt out by using a browser extension like Google Analytics Opt-out or by disabling cookies in your browser settings.'
                  : 'Google Analytics 会设置 Cookie（_ga、_ga_*）来区分访客和追踪会话。这些 Cookie 不包含任何个人身份信息。你可以通过安装 Google Analytics Opt-out 浏览器扩展或在浏览器设置中禁用 Cookie 来选择退出。'}
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '3. Third-Party Services' : '3. 第三方服务'}
              </h2>
              <p className="mt-3">
                {isEn
                  ? 'We use the following third-party services:'
                  : '我们使用以下第三方服务：'}
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li>
                  <strong>Google Analytics 4</strong> —{' '}
                  {isEn
                    ? 'anonymous site analytics (governed by '
                    : '匿名网站分析（受 '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 underline hover:text-purple-200"
                  >
                    {isEn ? "Google's Privacy Policy" : 'Google 隐私政策'}
                  </a>
                  {isEn ? ')' : ' 约束）'}
                </li>
                <li>
                  <strong>Vercel</strong> —{' '}
                  {isEn
                    ? 'hosting and CDN (governed by '
                    : '网站托管和 CDN（受 '}
                  <a
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 underline hover:text-purple-200"
                  >
                    {isEn ? "Vercel's Privacy Policy" : 'Vercel 隐私政策'}
                  </a>
                  {isEn ? ')' : ' 约束）'}
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '4. Data Retention' : '4. 数据保留'}
              </h2>
              <p className="mt-3">
                {isEn
                  ? 'Since we do not collect personal data, there is nothing to retain or delete. Google Analytics data is retained for 14 months per Google default settings.'
                  : '由于我们不收集个人数据，因此没有需要保留或删除的内容。Google Analytics 的数据按 Google 默认设置保留 14 个月。'}
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '5. Your Rights' : '5. 你的权利'}
              </h2>
              <p className="mt-3">
                {isEn
                  ? 'You have the right to disable cookies, use ad blockers, or opt out of Google Analytics at any time. If you have any privacy concerns, contact us at the email below.'
                  : '你有权随时禁用 Cookie、使用广告拦截器或退出 Google Analytics 追踪。如有任何隐私问题，请通过以下邮箱联系我们。'}
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '6. Children' : '6. 儿童隐私'}
              </h2>
              <p className="mt-3">
                {isEn
                  ? 'SBTI Test Club is not directed at children under 13. We do not knowingly collect any data from children.'
                  : 'SBTI Test Club 不面向 13 岁以下儿童。我们不会有意收集儿童的任何数据。'}
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '7. Contact' : '7. 联系我们'}
              </h2>
              <p className="mt-3">
                {isEn
                  ? 'For privacy-related questions, reach us at: '
                  : '如有隐私相关问题，请联系：'}
                <a
                  href="mailto:privacy@sbti-test.club"
                  className="text-purple-300 underline hover:text-purple-200"
                >
                  privacy@sbti-test.club
                </a>
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-lg font-black text-white">
                {isEn ? '8. Changes to This Policy' : '8. 政策变更'}
              </h2>
              <p className="mt-3">
                {isEn
                  ? 'We may update this privacy policy from time to time. Any changes will be posted on this page with an updated date.'
                  : '我们可能会不时更新本隐私政策。任何变更将发布在此页面并更新日期。'}
              </p>
            </section>
          </div>

          <div className="mt-14">
            <Link
              href={localePath('/', locale)}
              className="text-sm font-semibold text-purple-300 hover:text-purple-200"
            >
              &larr; {isEn ? 'Back to Home' : '返回首页'}
            </Link>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
