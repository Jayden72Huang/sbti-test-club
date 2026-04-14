export type Locale = 'zh' | 'en';

export const defaultLocale: Locale = 'zh';
export const locales: Locale[] = ['zh', 'en'];

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}

/** Prefix a path with the locale only for non-default (English). */
export function localePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path;
  return `/en${path === '/' ? '' : path}`;
}

/** Common UI strings used across multiple components. */
export const ui = {
  zh: {
    home: '首页',
    test: '开始测试',
    types: '27 类型',
    match: '配对分析',
    startTest: '开始 SBTI 测试 →',
    browseTypes: '浏览 27 种类型',
    loading: '正在加载…',
    loadingResult: '正在加载结果…',
    loadingSoul: '正在分析你们的灵魂…',
    shareTitle: '分享你的结果',
    shareDesc: '一键保存为图片，直接发朋友圈 / 小红书 / 微博',
    saveImage: '📸 保存为图片',
    saving: '生成图片中…',
    copyLink: '🔗 复制结果链接',
    copied: '✓ 链接已复制',
    imageNote: '2 倍像素高清图，直接发社交平台清晰不糊',
    matchShareTitle: '分享配对结果',
    matchShareDesc: '保存图片发给 TA，扫码就能测自己的 SBTI',
    tryAnother: '再测一对',
    notTested: '我还没测 SBTI →',
    seeDetail: '看详解',
    backToMatch: '回到配对工具',
    testNow: '还不知道自己是哪种 SBTI？',
    testNowDesc: '31 道题 3 分钟，测完就能和 TA 配对一下',
  },
  en: {
    home: 'Home',
    test: 'Take Test',
    types: '27 Types',
    match: 'Match',
    startTest: 'Take the SBTI Test →',
    browseTypes: 'Browse 27 Types',
    loading: 'Loading…',
    loadingResult: 'Loading results…',
    loadingSoul: 'Analyzing your souls…',
    shareTitle: 'Share Your Result',
    shareDesc: 'Save as image and share on social media — includes poster, QR code, and best matches.',
    saveImage: '📸 Save as Image',
    saving: 'Generating…',
    copyLink: '🔗 Copy Result Link',
    copied: '✓ Link Copied',
    imageNote: 'Retina-quality PNG, ready for social media',
    matchShareTitle: 'Share Match Result',
    matchShareDesc: 'Save and send to your partner — scan QR to take the test',
    tryAnother: 'Try Another Pair',
    notTested: "I haven't taken SBTI →",
    seeDetail: 'Details',
    backToMatch: 'Back to Match Tool',
    testNow: "Don't know your SBTI yet?",
    testNowDesc: '31 questions, 3 minutes — then match with anyone',
  },
} as const;

export type UiStrings = (typeof ui)[Locale];
