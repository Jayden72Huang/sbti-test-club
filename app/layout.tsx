import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SchemaJsonLd } from '@/components/shared/SchemaJsonLd';
import { SITE_NAME, SITE_URL, buildMetadata } from '@/lib/metadata';
import { organizationSchema, webApplicationSchema } from '@/lib/schema';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const rootMetadata = buildMetadata({
  title: 'SBTI 人格测试 · 27 种真实自我',
  description:
    '免费 SBTI 五维人格测试：通过 15 个维度、5 组心理模型，匹配 27 种真实人格。一次测试看清自我、情感、态度、行动、社交五条暗线。',
  path: '/',
  keywords: [
    'SBTI',
    'SBTI 测试',
    'SBTI 人格',
    '人格测试',
    '心理测试',
    'MBTI 替代',
    '27 型人格',
    '五维人格',
    '自我认知',
  ],
  locale: 'zh',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: 'SBTI 人格测试 · 27 种真实自我',
    template: '%s | SBTI Test Club',
  },
  description: rootMetadata.description,
  keywords: rootMetadata.keywords,
  category: 'lifestyle',
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: rootMetadata.robots,
  alternates: rootMetadata.alternates,
  openGraph: rootMetadata.openGraph,
  twitter: rootMetadata.twitter,
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <SchemaJsonLd
          id="sbti-root-schema"
          schema={[organizationSchema(), webApplicationSchema()]}
        />
        {children}
      </body>
    </html>
  );
}
