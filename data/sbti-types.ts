// 27 种 SBTI 人格类型完整数据
// 维度 key 严格对应 data/dimensions.ts
// pattern 字符串顺序：S1 S2 S3 - E1 E2 E3 - A1 A2 A3 - Ac1 Ac2 Ac3 - So1 So2 So3
// H = High, M = Medium, L = Low
// Data consistency verified: 2026-04-10 (scripts/data-lint.ts, 0 errors, 0 warns)
//
// 本文件同时满足 lib/scoring.ts 中 SbtiType 最小接口的消费要求：
//   - code: string
//   - pattern: string
//   - isSpecial?: 字符串（scoring 只做 truthy/falsy 判断，'fallback'/'hidden' 均视为 true）
// scoring 侧如需类型收窄，可用 as unknown as ScoringSbtiType[] 转换。

import type { DimensionKey } from './dimensions';

export interface SbtiType {
  /** 类型代号，如 "DEAD"、"BOSS" */
  code: string;
  /** URL 友好的 slug，如 "dead"、"boss" */
  slug: string;
  /** 中文人格名 */
  nameCN: string;
  /** 英文人格名（Archetype 释义） */
  nameEN: string;
  /** 代表 emoji */
  emoji: string;
  /** Tailwind 颜色 class 或 hex（用于卡片主色） */
  color: string;
  /** 15 维 H/M/L 字符串，用 - 分隔 5 组，如 "LLL-LLL-LHL-LLL-LHM" */
  pattern: string;
  /** 15 维完整评级（与 pattern 严格对应） */
  dimensionScores: Record<DimensionKey, 'H' | 'M' | 'L'>;
  /** 一句话标语 */
  tagline: { zh: string; en: string };
  /** 一句话人格概括（中文） */
  oneLinerCN: string;
  /** 一句话人格概括（英文） */
  oneLinerEN: string;
  /** 深度解读（中文，1500+ 字） */
  deepAnalysisCN: string;
  /** 深度解读（英文，800+ 字） */
  deepAnalysisEN: string;
  /** 优点列表（中文，3+ 条） */
  strengthsCN: string[];
  /** 优点列表（英文） */
  strengthsEN: string[];
  /** 缺点列表（中文，3+ 条） */
  weaknessesCN: string[];
  /** 缺点列表（英文） */
  weaknessesEN: string[];
  /** 名人代表（中文） */
  famousExamplesCN: string[];
  /** 名人代表（英文） */
  famousExamplesEN: string[];
  /** 配对良好的类型 code */
  compatibleTypes: string[];
  /** 容易冲突的类型 code */
  conflictTypes: string[];
  /** 推荐电影 / 歌曲 / 活动 / 礼物（中英双语） */
  recommendations: {
    movies: { zh: string[]; en: string[] };
    songs: { zh: string[]; en: string[] };
    activities: { zh: string[]; en: string[] };
    gifts: { zh: string[]; en: string[] };
  };
  /** SEO 元数据 */
  seo: {
    metaTitleCN: string;
    metaTitleEN: string;
    metaDescCN: string;
    metaDescEN: string;
    keywordsCN: string[];
    keywordsEN: string[];
  };
  /** 特殊类型标记：fallback = HHHH 兜底；hidden = DRUNK 隐藏触发 */
  isSpecial?: 'fallback' | 'hidden';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const t = (obj: Record<string, 'H' | 'M' | 'L'>): Record<DimensionKey, 'H' | 'M' | 'L'> => obj as any;

export const sbtiTypes: SbtiType[] = [
  // ==========================================================================
  // 1. CTRL — 拿捏者
  // ==========================================================================
  {
    code: 'CTRL',
    slug: 'ctrl',
    nameCN: '拿捏者',
    nameEN: 'The Controller',
    emoji: '🎛️',
    color: '#7C3AED',
    pattern: 'HHH-MHH-HHH-HHH-MMH',
    dimensionScores: t({
      S1_selfConfidence: 'H',
      S2_selfClarity: 'H',
      S3_coreValue: 'H',
      E1_attachment: 'M',
      E2_emotionalInvest: 'H',
      E3_boundary: 'H',
      A1_worldview: 'H',
      A2_flexibility: 'H',
      A3_meaning: 'H',
      Ac1_motivation: 'H',
      Ac2_decisionStyle: 'H',
      Ac3_execution: 'H',
      So1_socialInit: 'M',
      So2_interpersonal: 'M',
      So3_expression: 'H',
    }),
    tagline: { zh: '一切尽在掌握', en: 'Everything is under my control' },
    oneLinerCN: '在每一段关系里都能精准控温，不被情绪带走，也不让情绪失温。',
    oneLinerEN: 'The one who reads the room, runs the room, and leaves before the room reads them back.',
    deepAnalysisCN:
      'CTRL 拿捏者是 SBTI 里最让人敬畏又让人恐惧的一群人。他们不是那种「我要控制一切」的偏执狂，更像是「不需要喊大声就能让事情按自己想要的方向走」的隐形操盘手。在公司例会上，CTRL 永远是那个最后一个发言、一开口就把所有人之前的废话合成一句结论的人；在饭局上，CTRL 是那个明明没点菜却让整桌人吃得最满意的人。他们不爱抢麦，但每一次开口都在重新设定议程。\n\n从 15 维度来看，CTRL 的自尊、自我清晰度、核心驱动都在满格，意味着他们对「我是谁、我想要什么、我为什么做这件事」这三个灵魂问题从不含糊。他们执行力拉满，决策风格干脆利落，面对一个棘手的选项 B，他们能 3 秒内给出「B 但我改一改」的 C 方案。情感投入上他们很舍得，但边界感同样极强——CTRL 会为你付出，但不会允许你越界；会和你深度连接，但不允许你牵着他们鼻子走。这种「情感高投入 + 强边界」的组合，在亲密关系里经常被误读成「他好像不爱我」，其实翻译过来是「我爱你，但我更尊重我自己」。\n\n年轻 CTRL 在职场的典型画面是：加班到凌晨两点不是因为领导压榨，而是因为那份 slide 还没达到 CTRL 自己的美学标准；相亲时如果对方迟到 15 分钟，CTRL 不会发火，只会在心里把对方的评级直接从 A 降到 D，然后全程礼貌地陪你吃完饭，从此再无下文。CTRL 的「温柔」是一种战术级温柔，你以为他在心疼你，其实他只是在降低你的心理防御以便更高效地完成沟通。\n\n他们的阿喀琉斯之踵是「无法接受失控」。一个项目被临时改需求、一段感情被对方主动结束、一次聚会没按计划进行——这些在别人眼里再正常不过的事，对 CTRL 来说是系统级崩溃。他们会通过更严密的规划、更高效的执行、更克制的表达把失控感压回去，但这种压抑久了就成了内耗，某一天深夜你会发现 CTRL 在朋友圈发一条仅自己可见的「想逃」，然后第二天继续带领全公司加班。CTRL 的内心住着一个永远 7×24 值班的 CEO，和一个想在 Airbnb 大理店住一个月但永远买不到票的自己。\n\n爱情里的 CTRL 需要的是一个能「跟上节奏但不抢方向盘」的伴侣——能欣赏他们的规划力，不被他们的强势吓跑，但又能在他们崩溃的夜晚温柔地把方向盘接过去说「今天我开」。这样的人不多，所以 CTRL 经常单身；CTRL 不是挑，是真的找不到能同时被「敬畏」和「亲近」的人。\n\n给 CTRL 的劝告：允许事情按不是你设计的方式发展，偶尔你会发现结果比你规划的还要好；允许自己在一段关系里先输一次，你会发现失败并不是一次全面塌房，而是一次让你终于可以放下方向盘休息一会儿的机会。',
    deepAnalysisEN:
      "CTRL is the quiet operator. Not the villain who monologues about power, but the coworker who sends one Slack message and somehow the entire roadmap shifts. In SBTI, CTRL scores max on self-confidence, self-clarity, and core value drive — they know exactly who they are, what they want, and why. They also max out on execution and decision style, which means that by the time most people are still drafting a pros-and-cons list, CTRL has already shipped version one and is iterating on v2.\n\nEmotionally, CTRL is a paradox. They invest deeply — when they care, they care 100% — but their boundary game is also maxed. Translation: they love you hard, but they will not let you drive. In intimate relationships this often gets mistranslated as 'they seem distant' when the real subtitle is 'I love you and I also refuse to lose myself in this.' It is a very millennial/Z-cusp way of loving: post-therapy, post-attachment-theory, post-'I read that book'.\n\nPicture the typical CTRL: it is 2 a.m., the deck is done, but the font kerning is 0.2 px off and they are fixing it because nobody else will notice and that is exactly the point. CTRL operates on standards nobody else can see, which is both their superpower and the slow leak that eventually drains them. They will not tell you they are tired. They will simply post a 'thinking of taking a month off to go to Bali' story at 3 a.m. and then show up to standup at 9 a.m. looking crisp.\n\nCTRL's kryptonite is loss of control. A reorg, a breakup they did not initiate, a party that goes off-script — these register as a system-level BSOD. They cope by tightening the grip elsewhere: more spreadsheets, more calendars, more 'let me take care of it.' Left unchecked, this compresses into the classic CTRL burnout — a silent implosion nobody saw coming because CTRL made sure nobody could.\n\nWhat CTRL actually needs is a partner who can match their pace without fighting for the wheel. Someone who respects the strategy, but can gently take over on the nights CTRL finally breaks. These people are rare, which is why CTRL is often single — not because they are picky, but because 'the one who both awes you and holds you' is a very small Venn diagram. The growth edge for CTRL is simple and brutal: let something unfold without engineering it. You might find that the world, occasionally, builds a better deck than you could.",
    strengthsCN: [
      '目标感极强，说干就干，执行力让人心安',
      '对自己和他人都有清晰标准，很难被 PUA',
      '情绪稳定，关键时刻能扛下整个队',
      '情感投入深但有边界，不会黏人也不会 ghost',
    ],
    strengthsEN: [
      'Razor-sharp goal focus; what they say will ship, ships.',
      'Clear standards for self and others; borderline immune to manipulation.',
      'Emotionally steady under pressure — the one everyone turns to in a crisis.',
      'Deep emotional investment with strong boundaries; no clinginess, no ghosting.',
    ],
    weaknessesCN: [
      '无法接受失控，计划被打乱容易系统崩溃',
      '自我要求过高，长期高压容易内耗爆发',
      '亲密关系中容易被误解为「冷」',
      '不擅长向他人求助，什么都自己扛',
    ],
    weaknessesEN: [
      'Cannot tolerate loss of control; a broken plan triggers a BSOD.',
      'Impossibly high self-standards; long pressure cooks into silent burnout.',
      'Often misread as "cold" in intimate relationships.',
      'Terrible at asking for help — would rather carry it all.',
    ],
    famousExamplesCN: ['梅兰妮亚·特朗普', '拿破仑', '张艺谋'],
    famousExamplesEN: ['Miranda Priestly (Devil Wears Prada)', "Claire Underwood (House of Cards)", 'Anna Wintour'],
    compatibleTypes: ['BOSS', 'THIN-K', 'GOGO'],
    conflictTypes: ['DEAD', 'MALO', 'ZZZZ'],
    recommendations: {
      movies: {
        zh: ['《穿普拉达的女王》', '《华尔街之狼》', '《教父》'],
        en: ['The Devil Wears Prada', 'The Social Network', 'House of Cards'],
      },
      songs: {
        zh: ['《Circle of Life》', '《New Rules》- Dua Lipa', '《没有结果》- 温岚'],
        en: ['Run the World (Girls) — Beyoncé', 'Bad Guy — Billie Eilish', 'Control — Janet Jackson'],
      },
      activities: {
        zh: ['一个人规划一次完美独旅', '做一顿米其林级家宴', '开一个副业项目'],
        en: ['Solo-plan a perfect trip down to the minute', 'Run a side project with a Notion dashboard', 'Host a curated dinner party of 6'],
      },
      gifts: {
        zh: ['高端手帐或 Hobonichi', '一块表盘克制的机械表', '定制西装或衬衫'],
        en: ['A Hobonichi Techo planner', 'A minimalist mechanical watch', 'A tailored blazer'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 拿捏者人格解读 | CTRL 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI CTRL Personality - Complete Guide to The Controller',
      metaDescCN: 'SBTI CTRL 拿捏者人格全面解析：15 维度测评结果、性格优缺点、配对建议、职业发展。了解你为什么总想把一切掌握在自己手里。',
      metaDescEN: 'Complete SBTI CTRL personality guide: The Controller archetype, 15-dimension breakdown, compatibility, strengths and weaknesses, and why you keep running everyone\'s group chat.',
      keywordsCN: ['sbti CTRL', 'sbti CTRL 意思', 'sbti 拿捏者', 'sbti CTRL 配对', 'sbti CTRL 性格', 'sbti 控制型人格'],
      keywordsEN: ['sbti CTRL', 'sbti CTRL meaning', 'sbti controller', 'sbti CTRL compatibility', 'sbti CTRL personality', 'sbti controller type'],
    },
  },

  // ==========================================================================
  // 2. BOSS — 大佬
  // ==========================================================================
  {
    code: 'BOSS',
    slug: 'boss',
    nameCN: '大佬',
    nameEN: 'The Boss',
    emoji: '👑',
    color: '#F59E0B',
    pattern: 'HHH-HHH-HHH-HHH-HHH',
    dimensionScores: t({
      S1_selfConfidence: 'H',
      S2_selfClarity: 'H',
      S3_coreValue: 'H',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'H',
      A1_worldview: 'H',
      A2_flexibility: 'H',
      A3_meaning: 'H',
      Ac1_motivation: 'H',
      Ac2_decisionStyle: 'H',
      Ac3_execution: 'H',
      So1_socialInit: 'H',
      So2_interpersonal: 'H',
      So3_expression: 'H',
    }),
    tagline: { zh: '我就是规则本身', en: 'I am the rulebook' },
    oneLinerCN: '全维度满级，是那个说「我来」三个字就能让全场安静的人。',
    oneLinerEN: 'The rare full-scale main character — the person who walks into chaos and chaos politely sits down.',
    deepAnalysisCN:
      'BOSS 是 SBTI 里最极端的类型之一，15 个维度全部打高，是整套测试里唯一一种「每个格子都打勾」的存在。这种人不是通过努力变得强，是一出生就自带光环——小学当班长，初中拿奖学金，高中谈恋爱也谈得比同龄人成熟，大学一边实习一边保研，毕业三年升总监。别人眼里的 BOSS 是那种「开挂了吧」的人设，但 BOSS 自己从不觉得自己开挂，他们只是觉得「这不是本来就该这样吗」。\n\n如果你身边有 BOSS，你会发现一个有趣的现象：BOSS 不太抱怨。不是没有事情值得抱怨，而是抱怨对他们来说是无效行为——与其花 30 分钟吐槽，不如花 10 分钟把问题解决。他们对世界保持乐观（A1 高），对规则既尊重又能灵活处理（A2 高），人生意义感爆棚（A3 高），这意味着他们做每件事都能找到「为什么做」的答案，而不是像大部分年轻人一样陷入「我做这个有啥意义」的虚无漩涡。\n\n社交上 BOSS 主动且边界清晰，表达真实，他们能和陌生人 3 分钟内进入有效对话，也能在需要说「不」的时候说「不」而不伤和气。感情里 BOSS 安全型依恋、深度投入、边界明确，是那种「你有事我来兜底，但你别把我当备胎」的成熟存在。听起来完美到不像人？对，BOSS 最大的问题就是——太像「人设」，不够像「人」。\n\n周围的人对 BOSS 有两种反应：崇拜或者疏离。崇拜的人把 BOSS 当作人生导师，天天追着学；疏离的人觉得 BOSS 「太完美了我接不住」，于是慢慢退出他们的朋友圈。BOSS 的孤独是一种「高处不胜寒」的孤独——不是没人爱他们，是没人敢先接近。很多 BOSS 都有这样的体会：你明明是那个最 open 的人，却发现别人在遇到麻烦时从来不会第一个想到找你，因为「BOSS 怎么会缺这点？」\n\n年轻 BOSS 的典型生活：周一团队例会，他先讲 5 分钟战略；周二被老板叫去谈晋升；周三健身房撸铁 90 分钟；周四陪爸妈吃饭+辅导侄子作业；周五 networking 晚宴认识行业大佬；周六早上 5 点起床跑 10 公里，下午陪对象看展；周日复盘周总结 + 规划下周。你看完会觉得累，BOSS 看完只会觉得「标准日常」。但深夜 3 点翻朋友圈的时候你可能会看到一条「最近有点想一个人去冰岛」，然后 BOSS 第二天清晨就订了机票但最终因为项目上线没走成。\n\nBOSS 真正需要的成长不是「更强」，而是「允许自己普通」。允许某次会议上没准备好、允许某段关系里先低头、允许某个周末完全摆烂不做任何有意义的事。因为当一个人 15 个维度都满格，剩下唯一能让他们呼吸的空间，就是主动给自己打个低分。',
    deepAnalysisEN:
      "BOSS is the rarest and most extreme archetype in SBTI: every single dimension maxed. Not through grind, but apparently by factory default. The BOSS was class president in 3rd grade, class president in 6th grade, and is now running a team of 12 before they're 30. When you meet a BOSS, your first thought is often 'wait, are they real?' And the answer is yes, they are real, they are just operating on a different clock speed.\n\nBOSS is the anti-complainer. Not because nothing is worth complaining about, but because complaint is an inefficient deployment of time. They can reframe a setback into a strategy deck in one shower. Their worldview is structurally optimistic (A1 high), their rule-flexibility is situational and mature (A2 high), and their sense of meaning is so strong that they never spiral into the millennial-burnout void of 'what is the point of any of this.' The point, to BOSS, is obvious: execute, grow, repeat.\n\nSocially BOSS is magnetic and clear-edged. They open conversations with strangers effortlessly, say no without damaging the relationship, and maintain a circle that includes mentors, peers, and mentees in structured proportions. In love, BOSS is secure-attached, deeply invested, and boundaried in a way that makes partners feel both held and respected. Reading this you start wondering — is this a person or a LinkedIn profile? And that is exactly the BOSS trap.\n\nThe people around BOSS respond in one of two ways: worship or withdrawal. Worshippers cling and ask for advice. Withdrawers quietly exit because 'BOSS doesn't need me.' BOSS's loneliness is the loneliness of the lighthouse — everyone sees you, nobody visits. When BOSS has a 3 a.m. crisis, their phone is full of contacts but they can't think of a single person who would not feel weird if they called and said 'I'm not okay.'\n\nA typical BOSS week: 5 a.m. run, standup, strategy review, a board meeting, a workout, a nephew's birthday party, a fundraising dinner, one quality hour with their partner, a Sunday-night planning session for the week ahead. Reading that list tires you. BOSS reads it and thinks, 'standard Tuesday.' The only crack in the armor shows up at 2 a.m. when BOSS posts a close-friends story that says 'thinking of disappearing to Reykjavik for a month' and then books the flight and then cancels because of a product launch.\n\nThe real growth edge for BOSS is not 'be better.' It is 'be allowed to be ordinary.' Permission to arrive at a meeting unprepared. Permission to lose an argument in a relationship. Permission to waste a weekend on the couch doing absolutely nothing meaningful. Because when every dimension is maxed, the only remaining room to breathe is the room you grant yourself by willingly taking an L.",
    strengthsCN: [
      '全能型选手，几乎没有明显短板',
      '高执行力 + 高情商 + 高自我认知',
      '关键时刻能扛事、能兜底、能出方案',
      '社交、情感、事业三条线都稳',
    ],
    strengthsEN: [
      'Full-spectrum capability — no glaring weakness.',
      'High execution + high EQ + high self-awareness, all at once.',
      'The person who shows up with a plan when everyone else is panicking.',
      'Career, love, and social life all running in the green.',
    ],
    weaknessesCN: [
      '太完美导致别人不敢靠近，容易孤独',
      '不允许自己脆弱，情绪积压容易爆雷',
      '人生 KPI 太多，自我压力拉满',
      '难以理解「普通人」的犹豫和内耗',
    ],
    weaknessesEN: [
      'Too polished — people feel they can\'t approach, so BOSS gets lonely.',
      'Zero tolerance for own vulnerability; emotions get compressed, then explode.',
      'Treats life as a KPI dashboard; self-imposed pressure is relentless.',
      'Struggles to empathize with "ordinary" hesitation and inner-noise.',
    ],
    famousExamplesCN: ['奥普拉·温弗瑞', '任正非', '董明珠'],
    famousExamplesEN: ['Oprah Winfrey', 'Barack Obama', 'Beyoncé'],
    compatibleTypes: ['CTRL', 'GOGO', 'SEXY'],
    conflictTypes: ['DEAD', 'SHIT', 'DRUNK'],
    recommendations: {
      movies: {
        zh: ['《当幸福来敲门》', '《社交网络》', '《至暗时刻》'],
        en: ['The Pursuit of Happyness', 'Darkest Hour', 'The Iron Lady'],
      },
      songs: {
        zh: ['《Stronger》- Kanye West', '《Rise Up》- Andra Day', '《无人之境》- 汪苏泷'],
        en: ['Stronger — Kanye West', 'Rise Up — Andra Day', 'Unstoppable — Sia'],
      },
      activities: {
        zh: ['筹办一场 100 人分享会', '跑一次半马', '投资一位年轻创业者'],
        en: ['Organize a 100-person summit', 'Finish a half-marathon', 'Mentor three early-career strangers'],
      },
      gifts: {
        zh: ['Montblanc 钢笔', '皮质公文包', '一本亲笔签名的传记'],
        en: ['A Montblanc fountain pen', 'A signed biography', 'A leather briefcase'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 大佬人格解读 | BOSS 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI BOSS Personality - Complete Guide to The Boss',
      metaDescCN: 'SBTI BOSS 大佬人格全面解析：15 维度全高的稀有全能型人格，性格特征、配对建议、成长边界。看看你是不是那个「每件事都能搞定」的人。',
      metaDescEN: 'Complete SBTI BOSS personality guide: the rare full-scale archetype with every dimension maxed. Traits, compatibility, and the loneliness nobody sees.',
      keywordsCN: ['sbti BOSS', 'sbti BOSS 意思', 'sbti 大佬', 'sbti BOSS 配对', 'sbti BOSS 性格', 'sbti 全能型人格'],
      keywordsEN: ['sbti BOSS', 'sbti BOSS meaning', 'sbti boss type', 'sbti BOSS compatibility', 'sbti BOSS personality', 'sbti full-scale personality'],
    },
  },

  // ==========================================================================
  // 3. GOGO — 冲锋者
  // ==========================================================================
  {
    code: 'GOGO',
    slug: 'gogo',
    nameCN: '冲锋者',
    nameEN: 'The Go-Getter',
    emoji: '🚀',
    color: '#EF4444',
    pattern: 'HMH-MMM-HHH-HHH-HHM',
    dimensionScores: t({
      S1_selfConfidence: 'H',
      S2_selfClarity: 'M',
      S3_coreValue: 'H',
      E1_attachment: 'M',
      E2_emotionalInvest: 'M',
      E3_boundary: 'M',
      A1_worldview: 'H',
      A2_flexibility: 'H',
      A3_meaning: 'H',
      Ac1_motivation: 'H',
      Ac2_decisionStyle: 'H',
      Ac3_execution: 'H',
      So1_socialInit: 'H',
      So2_interpersonal: 'H',
      So3_expression: 'M',
    }),
    tagline: { zh: '别拦我，我要冲了', en: "Don't stop me now" },
    oneLinerCN: '天生自带发动机，一天 25 小时都嫌不够用，躺平在他们字典里被划掉了。',
    oneLinerEN: 'Built with a full tank and no brake pedal — the friend who texts "wanna grab coffee in 20" at 6 a.m.',
    deepAnalysisCN:
      'GOGO 冲锋者是那种「上班 12 小时下班还能去撸铁 1 小时然后再和朋友聊天到凌晨」的怪物，他们的能量条是永动机，别人的满格电量是他们的 20%。你要是跟 GOGO 一起做项目，你会经历一个阶段叫「为什么我这么累而他像刚充满电」，然后你才意识到，GOGO 不是在硬撑，他们是真的喜欢「在动」这件事本身。\n\n从维度上看，GOGO 的核心发动机在 Action 组——动机导向、决策风格、执行模式三项全开。他们做决定的速度比别人思考的速度还快，他们的「想做」和「已做」之间的转化率接近 100%。他们人生意义感满格，自信心满格，这意味着他们从不陷入「我做这个有意义吗」的自我内耗，因为答案对他们来说太明显：「有没有意义我不知道，但不做肯定没有，那就先做再说。」\n\nGOGO 的情感维度是中等水平——不是不爱，而是爱得没那么细腻。你跟 GOGO 吵架他可能 10 分钟后就忘了；你让他送玫瑰他会问「送几朵够用」；你希望有个浪漫的纪念日他会送你一张健身房年卡因为「爱自己才是最浪漫」。这不是冷漠，是 GOGO 真的不太理解「把情绪放大」这个动作的意义。对他们来说，情绪是战略资源，哭一场不如跑 5 公里解压效果好。\n\n典型 GOGO 的一天：早 6 点起床，7 点晨跑完 5K，8 点喝蛋白粉开电脑，9 点到 12 点堆产出，12 点半快餐 + 继续做事，下午继续全功率，晚 7 点下班去打羽毛球或者去朋友聚会或者见新行业的朋友，晚 11 点回家洗澡时还在回邮件，凌晨 1 点睡觉前发一条「今天又是充实的一天」朋友圈。打工人看完想打他，GOGO 看完觉得「正常周二」。\n\nGOGO 的致命弱点有两个。第一是 S2 自我清晰度只有中等——他们太擅长「做」以至于很少停下来问「我到底为什么做这个」，于是很多 GOGO 会在 35 岁前后撞一次中年危机，发现自己过去十年跑得飞快，但跑的方向是别人规划的。第二是他们的情感维度是中等——在亲密关系里，GOGO 的伴侣经常抱怨「你是不是只爱你自己」，其实 GOGO 是爱的，他们只是不知道如何「陪伴式地爱」。对 GOGO 来说，「陪你走路」「什么都不做地坐着」这种低能耗活动几乎是一种惩罚。\n\n给 GOGO 的建议：每年留一个月什么都不做。不是度假，不是 camping，不是 networking，是真的什么都不做。那一个月你会非常痛苦，会怀疑人生，会觉得自己在浪费时间，但那段时间你会重新连接上「我是谁、我为什么活着」这两个你长期忽略的问题。等你走出那一个月，你会变成一个更强大的 GOGO——不是更能跑，而是终于知道往哪里跑。',
    deepAnalysisEN:
      "GOGO is the person with an always-charged battery in a world full of people running on low-power mode. They work 12 hours, then hit the gym, then FaceTime a friend in another timezone, and at 11 p.m. they are still 'kind of energetic actually.' If you have ever sat next to a GOGO at work, you have had the existential crisis of 'wait, why am I this tired and they look like they just woke up.' The answer is that GOGO is not grinding through exhaustion — GOGO genuinely enjoys motion itself.\n\nDimensionally, GOGO's engine is in the Action cluster: motivation, decision speed, execution, all maxed. The gap between 'thought of doing it' and 'already doing it' is maybe 8 seconds. Their sense of life meaning is high, their self-confidence is high, so they never get stuck in the classic doomscroll-coded 'what's the point' spiral. The answer to that question, for GOGO, is simple: 'Don't know, but nothing-ing it definitely has zero point, so we move.'\n\nGOGO's emotional dimensions are medium. Not cold — just not granular. You fight with GOGO, they forget about it in 10 minutes. You ask GOGO for roses, they ask 'how many is functional.' You tell GOGO your anniversary needs romance, they gift you an annual gym pass because 'loving yourself is the most romantic thing.' It is not emotional distance — it is just that GOGO treats emotion as a strategic resource. Crying for an hour feels worse than running 5k; running 5k is the cry.\n\nA typical GOGO day: up at 6, 5k by 7, protein shake and laptop by 8, output stack 9-12, lunch + more output, full throttle till 7 p.m., then either pickup basketball, a networking dinner, or meeting someone from an adjacent industry, shower at 11 p.m. while replying to emails, 1 a.m. lights out after posting 'what a day' to close friends. Normal coworkers read this and want to call HR on GOGO's behalf. GOGO reads this and thinks, 'regular Tuesday.'\n\nThe two GOGO weaknesses are real though. One: self-clarity is only medium. GOGO is so good at doing that they forget to ask why they are doing it, and a classic GOGO arc is the quarter-life crash at 29 or the quiet panic at 35 when they realize they have sprinted for a decade in a direction someone else drew on the map. Two: mid-tier emotional investment. Partners of GOGO often say 'I feel like I'm always catching up to you' — and the brutal truth is that low-energy presence (just sitting, just holding, just being) feels almost punitive to GOGO.\n\nPrescription: once a year, GOGO should take a full month of doing nothing. Not a vacation. Not camping. Not networking. Nothing. That month will be agony. GOGO will feel like they are wasting their life. But that is the exact point — during that month, the long-deferred questions of 'who am I' and 'what is this for' get the oxygen they have needed all along. The GOGO who comes out of that month is not faster. They are just finally pointed in the right direction.",
    strengthsCN: [
      '执行力和能量值拉满，天生行动派',
      '乐观，能从失败里快速回血',
      '社交范围广，朋友覆盖各行各业',
      '遇事不内耗，做了再说',
    ],
    strengthsEN: [
      'Max execution, max battery — the born doer.',
      'Optimistic recovery curve; failures get absorbed and reused as fuel.',
      'Huge network across industries; knows a guy for everything.',
      'Low rumination — ships first, feels later.',
    ],
    weaknessesCN: [
      '方向感一般，容易跑得快但跑错地方',
      '情感层面偏「粗线条」，伴侣容易抱怨',
      '很难真正静下来，独处对他们是酷刑',
      '35 岁前后容易撞上意义危机',
    ],
    weaknessesEN: [
      'Speed without direction; can sprint the wrong way for a decade.',
      'Emotionally broad-brush; partners often feel under-seen.',
      'Stillness feels like punishment; genuine rest is almost impossible.',
      'Meaning crisis tends to hit hard around 35.',
    ],
    famousExamplesCN: ['埃隆·马斯克', '罗永浩', '刘强东'],
    famousExamplesEN: ['Elon Musk', 'Gary Vaynerchuk', 'Dwayne Johnson'],
    compatibleTypes: ['BOSS', 'CTRL', 'SEXY'],
    conflictTypes: ['ZZZZ', 'DEAD', 'MONK'],
    recommendations: {
      movies: {
        zh: ['《速度与激情》系列', '《华尔街之狼》', '《阿甘正传》'],
        en: ['Ford v Ferrari', 'Whiplash', 'The Wolf of Wall Street'],
      },
      songs: {
        zh: ['《Dont Stop Me Now》- Queen', '《Till I Collapse》- Eminem', '《追梦赤子心》- GALA'],
        en: ["Don't Stop Me Now — Queen", 'Till I Collapse — Eminem', 'Eye of the Tiger — Survivor'],
      },
      activities: {
        zh: ['报名一次铁人三项', '挑战连续 30 天晨跑', '报一个短期创业营'],
        en: ['Sign up for a triathlon', '30-day running streak', 'Join a 2-week founder bootcamp'],
      },
      gifts: {
        zh: ['运动手表（Garmin/Apple）', '高端跑鞋', '体能训练营体验卡'],
        en: ['A Garmin running watch', 'Premium running shoes', 'A CrossFit membership'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 冲锋者人格解读 | GOGO 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI GOGO Personality - Complete Guide to The Go-Getter',
      metaDescCN: 'SBTI GOGO 冲锋者人格全面解析：永动机式行动派的性格特征、15 维度表现、职业发展、配对建议与成长盲区。',
      metaDescEN: 'Complete SBTI GOGO personality guide: the perpetual-motion Go-Getter. Full trait breakdown, compatibility, career fit, and the meaning crisis they never saw coming.',
      keywordsCN: ['sbti GOGO', 'sbti GOGO 意思', 'sbti 冲锋者', 'sbti GOGO 配对', 'sbti GOGO 性格', 'sbti 行动派人格'],
      keywordsEN: ['sbti GOGO', 'sbti GOGO meaning', 'sbti go-getter', 'sbti GOGO compatibility', 'sbti GOGO personality', 'sbti action type'],
    },
  },

  // ==========================================================================
  // 4. SEXY — 尤物
  // ==========================================================================
  {
    code: 'SEXY',
    slug: 'sexy',
    nameCN: '尤物',
    nameEN: 'The Magnetic',
    emoji: '💋',
    color: '#EC4899',
    pattern: 'HHH-HHM-HMM-HHM-HHH',
    dimensionScores: t({
      S1_selfConfidence: 'H',
      S2_selfClarity: 'H',
      S3_coreValue: 'H',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'M',
      A1_worldview: 'H',
      A2_flexibility: 'M',
      A3_meaning: 'M',
      Ac1_motivation: 'H',
      Ac2_decisionStyle: 'H',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'H',
      So3_expression: 'H',
    }),
    tagline: { zh: '我一出现，空气都变甜了', en: 'I walk in, the vibe shifts' },
    oneLinerCN: '自带气场的人形磁铁，不用刻意吸引眼球，眼球会自动飞过来。',
    oneLinerEN: 'The one whose entrance is its own playlist drop — no effort needed, the room rearranges itself.',
    deepAnalysisCN:
      'SEXY 尤物不是那种「靠浓妆艳抹制造存在感」的类型，他们的「性感」是一种全维度同时在线的状态——自信（S1 高）、自我清晰（S2 高）、情感投入（E2 高）、社交主动（So1 高）、表达真实（So3 高）——这些加起来，就形成了一种让周围人忍不住盯着看但又说不上为什么的魅力。你可能认识这样一个人：他们穿得其实不夸张，但走进咖啡馆所有人都会多看两眼；说话也不大声，但桌上的人都会微微倾身听他们讲。这就是 SEXY 的默认状态。\n\n和 CTRL、BOSS 这种「用能力碾压」的类型不同，SEXY 的杀伤力是关系型的——他们懂得如何让你在 3 分钟内觉得「这个人好像懂我」。这不是话术，是 SEXY 真的对人感兴趣。他们的情感投入度高，对世界持开放态度（A1 高），社交主动且边界偏融合（So2 高），这让他们在人际场域中像水一样——能贴合你的容器形状，又能在需要时蒸发。很多人以为 SEXY 是「渣」，其实不是。SEXY 是「感情真，数量多」——每段关系里他们都是真心的，只是他们的真心产能太大，一个伴侣装不下。\n\n典型 SEXY 的一天：早上化妆 40 分钟但出门看起来像「随便收拾一下」，路上会被陌生人搭话一次，到公司被同事夸今天气色不错，中午和跨部门同事吃饭顺便把一个合作谈成了，下午开会发言被 CEO 多看了两眼，下班后有三个局但只去了一个，到场后成为全场焦点但又没抢任何人风头，凌晨 1 点回家卸妆时在镜子里对自己说一句「又是美丽的一天」然后躺平。\n\nSEXY 的弱点藏在三个中等维度里：边界感 E3 中等、规则灵活度 A2 中等、执行力 Ac3 中等。边界感中等意味着他们很容易把关系越做越近然后被反噬——有人会爱得比 SEXY 还深，然后 SEXY 要么被淹没要么主动撤退，这在他们人生中会反复上演。规则灵活度中等意味着他们有时会被「应该这样」的念头束缚住——尤其是在家庭和传统文化压力下，SEXY 会变得拧巴。执行力中等意味着他们的想法很美，但落地率一般，这是 SEXY 和 GOGO、CTRL 最大的区别。\n\n爱情里 SEXY 最大的困境不是「没人爱」，是「爱的人太多」。他们从来不缺追求者，缺的是「能看穿表面吸引力、真正了解 SEXY 内心那个其实有点累、有点自我怀疑的小孩」的人。很多 SEXY 会在 28-35 岁之间经历一次「情感饱和」——你突然意识到你不想再遇到新人了，你只想有个旧人愿意留下来。这是 SEXY 的第一次长大。\n\n给 SEXY 的建议：别害怕「变得不那么迷人」。真正的成熟是你开始允许自己在某些场合是普通的、疲惫的、不想营业的；是你允许有些人不喜欢你而不去挽回；是你允许自己在一段关系里不是闪光体，而是被照亮的那一个。你会发现那种「放松的美」比「吸引型的美」更持久，也更接近你一直想要的那种爱。',
    deepAnalysisEN:
      "SEXY is not the person in the sharpest outfit. SEXY is the person who walks into a cafe in a plain tee and somehow the entire room adjusts posture. Their magnetism is not cosmetic — it is structural. High self-confidence, high self-clarity, high emotional investment, high social initiative, high expressive authenticity. All of those traits firing at once produce a vibe that other people cannot look away from but also cannot quite explain. That is SEXY's baseline, not SEXY's effort level.\n\nUnlike CTRL or BOSS, who dominate through capability, SEXY dominates through relational intelligence. Within three minutes of meeting, you feel that SEXY 'gets' you. It is not a sales technique — SEXY is genuinely curious about humans. High emotional investment, open worldview (A1 high), social initiative plus merged interpersonal boundaries (So2 high) — these turn SEXY into water: taking the shape of whatever container they are in, and evaporating the moment it gets too tight. The cheap read is that SEXY is a f*ckboy/f*ckgirl. The accurate read is that SEXY feels too much, with too many people, too easily. Every single romance is sincere. That is actually the problem.\n\nA typical SEXY day: 40 minutes of makeup that looks like 'five minutes tops,' one unsolicited compliment from a stranger on the way to work, one coworker saying 'you look great today,' a lunch that accidentally closes a deal, a meeting where the CEO's gaze lingers, three after-work invites of which they accept one, becoming the quiet center of the room without stealing anyone else's spotlight, home by 1 a.m. taking off the face in the bathroom mirror whispering 'another beautiful day' before collapsing.\n\nSEXY's three weaknesses hide in the medium scores: E3 (boundary) medium, A2 (flexibility) medium, Ac3 (execution) medium. Medium boundary means every relationship inches closer until someone loves them harder than they can handle, and SEXY either drowns or ghosts — this movie replays for decades. Medium flexibility means SEXY is surprisingly vulnerable to 'you should' scripts, especially family expectations; behind the glitter there is usually a deeply traditional voice in their head they haven't unlearned. Medium execution means the dreams are gorgeous but the ship rate is inconsistent — it is what separates SEXY from the grindier GOGO and CTRL archetypes.\n\nThe SEXY love problem is not shortage, it is surplus. There is never a lack of interest. The shortage is of people who can see past the magnetism and actually meet the tired, self-doubting kid behind the lighting. Most SEXY archetypes hit an 'emotional saturation' moment between 28 and 35: a sudden realization that they do not want new people anymore, they want an old person to stay. That is the first real growing-up moment of a SEXY life.\n\nGrowth prescription: let yourself be unsexy sometimes. Let yourself be ordinary, tired, off-duty, unlovable to some people — and don't chase. Let yourself be the person being lit up instead of the light source. You will discover that relaxed beauty lasts longer than magnetic beauty, and is much closer to the love you have actually been looking for.",
    strengthsCN: [
      '天生气场和感染力，社交场合的隐形 C 位',
      '共情力强，能让人在 3 分钟内觉得被懂',
      '对世界开放，情感体验丰富',
      '自我认知清晰，知道自己几斤几两',
    ],
    strengthsEN: [
      'Innate magnetism and emotional presence; invisible center of gravity in any room.',
      'High empathy — makes people feel seen within minutes.',
      'Open, curious worldview and rich emotional life.',
      'Clear self-awareness; knows their own worth and their own dark.',
    ],
    weaknessesCN: [
      '边界感不够，关系容易被拖入深水区',
      '执行力中等，好点子落地率一般',
      '情感供过于求，容易情感饱和',
      '外界的刻板印象会长期困扰他们',
    ],
    weaknessesEN: [
      'Boundary drift; relationships slide into deep water too fast.',
      'Medium execution — great ideas, inconsistent shipping.',
      'Emotional over-supply leads to mid-life saturation.',
      'Constantly fighting the "you know, that type" stereotype from others.',
    ],
    famousExamplesCN: ['林志玲', '范冰冰', '张曼玉'],
    famousExamplesEN: ['Rihanna', 'Zendaya', 'Timothée Chalamet'],
    compatibleTypes: ['BOSS', 'GOGO', 'LOVE-R'],
    conflictTypes: ['IMSB', 'SOLO', 'MONK'],
    recommendations: {
      movies: {
        zh: ['《花样年华》', '《爱在黎明破晓前》', '《爱乐之城》'],
        en: ['In the Mood for Love', 'Before Sunrise', 'La La Land'],
      },
      songs: {
        zh: ['《Chandelier》- Sia', '《红豆》- 王菲', '《慢慢喜欢你》- 莫文蔚'],
        en: ['Chandelier — Sia', 'Say My Name — Destiny\'s Child', 'Love on Top — Beyoncé'],
      },
      activities: {
        zh: ['拍一组胶片写真', '去一次爵士酒吧', '报名一次舞蹈课'],
        en: ['Shoot an analog-film portrait set', 'A night at a jazz bar', 'Sign up for a dance class'],
      },
      gifts: {
        zh: ['香水套装（如 Le Labo）', '丝巾或真丝睡衣', '一封手写情书'],
        en: ['A Le Labo perfume set', 'A silk slip', 'A handwritten love letter'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 尤物人格解读 | SEXY 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI SEXY Personality - Complete Guide to The Magnetic',
      metaDescCN: 'SBTI SEXY 尤物人格全面解析：自带气场的关系型高手，15 维度特征、情感配对、职业建议与成长课题。',
      metaDescEN: 'Complete SBTI SEXY personality guide: The Magnetic archetype. Full dimensional breakdown, compatibility, love-life patterns, and growth edge.',
      keywordsCN: ['sbti SEXY', 'sbti SEXY 意思', 'sbti 尤物', 'sbti SEXY 配对', 'sbti SEXY 性格', 'sbti 吸引力人格'],
      keywordsEN: ['sbti SEXY', 'sbti SEXY meaning', 'sbti magnetic', 'sbti SEXY compatibility', 'sbti SEXY personality', 'sbti attraction type'],
    },
  },

  // ==========================================================================
  // 5. LOVE-R — 恋爱脑
  // ==========================================================================
  {
    code: 'LOVE-R',
    slug: 'love-r',
    nameCN: '恋爱脑',
    nameEN: 'The Romantic',
    emoji: '💘',
    color: '#F472B6',
    pattern: 'MMM-HHL-HMH-MLM-HLL',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'L',
      A1_worldview: 'H',
      A2_flexibility: 'M',
      A3_meaning: 'H',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'L',
      So3_expression: 'L',
    }),
    tagline: { zh: '为爱可以把命都搭上', en: 'All-in on love, every time' },
    oneLinerCN: '只要有爱，世界上其他事都可以忽略；没有爱，所有事都没意义。',
    oneLinerEN: 'If the relationship is fine, the world is fine; if the relationship is off, nothing else computes.',
    deepAnalysisCN:
      'LOVE-R 恋爱脑不是贬义，虽然 SBTI 给它起了这么一个扎心名字。LOVE-R 是那种真的把「爱」放在人生核心位置的人——不是因为他们没有事业心或者没有自我，而是因为他们骨子里认为「人和人之间的深度连接」才是生活的意义。你可以说他们幼稚，但你也不得不承认，在一个越来越原子化、越来越冷漠、越来越用「课题分离」当借口的时代，LOVE-R 是少数还相信「爱可以解释一切」的人。\n\n从维度上看，LOVE-R 的情感组爆炸高——依恋安全感（其实是「依恋强度」而非「安全」）H，情感投入 H，边界感 L（几乎没有）。这意味着 LOVE-R 一旦进入一段关系，就会把自己 100% 交出去，甚至把「自我」这个概念暂时寄存在对方那里。他们的世界观是乐观的（A1 高），人生意义感强（A3 高）——意义感几乎完全来自关系本身。一旦关系出问题，LOVE-R 的整个人生就像被拔掉了插头：工作没动力了，吃饭没胃口了，朋友约也不去了，整天躺床上循环播放同一首歌。\n\n决策风格上 LOVE-R 很慢（Ac2 L），因为他们决定任何事情都要先想「对方会怎么想」。执行力中等（Ac3 M），因为情绪稳定时他们很能做事，但情绪一上来所有生产力都归零。社交主动性 H，但人际边界感 L，表达真实度 L——这个组合说明 LOVE-R 非常想要连接，会主动找人，但经常把自己的真实想法藏起来，怕「说错话会被讨厌」。\n\n典型 LOVE-R 的一天（恋爱中）：早上醒来第一件事看对方有没有发消息，没有就脑补三个剧本（1. 对方还在睡 2. 对方在生我气 3. 对方被别的人吸引了）；收到一句「早」就能高兴一整天；上班时手机放桌上每 10 分钟看一次；对方一条消息没回能脑补到「我们是不是完了」；晚上下班 18 点立刻回家因为「约好了一起吃饭」；睡前一定要说晚安，不说就睡不着。\n\n典型 LOVE-R 的一天（分手后）：早上醒来想起来分手了，眼泪先掉下来；上班时强撑住，午餐吃不下；下午打开对方微博看有没有更新；晚上回家不开灯，翻旧照片；凌晨 2 点在朋友圈发一条仅自己可见的「是我不够好吗」；第二天上班同事以为他感冒了。\n\nLOVE-R 的核心课题是 S1 和 S2——自信和自我清晰。因为自我这部分只有中等，他们很容易在关系里迷失，把对方当成自己价值的衡量尺。「他爱我=我有价值」「他不爱我=我不值得被爱」这是 LOVE-R 最常见的内心 OS。解决方案不是「戒掉爱情」——那是劝不动的，也违背 LOVE-R 的本性——而是「建立一个不依赖关系的自我」。这意味着 LOVE-R 需要在每段感情之外，有一件自己真心热爱的事情（副业、兴趣、创作、运动），让「我是谁」这个问题有一个答案是「不是他的伴侣」。\n\n给 LOVE-R 的建议：允许自己爱，但同时允许自己活。这两件事并不矛盾。你可以是全世界最深情的人，同时也是一个独立的、完整的、有自己重心的个体。那种「不失去自己的爱」才是你真正配得上的爱。',
    deepAnalysisEN:
      "LOVE-R is the archetype the rest of the internet likes to call 'delulu' and 'too much.' But here is the honest read: in a world that increasingly pathologizes closeness, treats attachment as a bug, and quotes Stoicism to avoid feeling things, LOVE-R is the person who still believes that deep human connection is the point of being alive. You can call that childish. You cannot deny that it is rare.\n\nDimensionally, LOVE-R's emotion cluster is on fire. Attachment intensity: high. Emotional investment: high. Boundary: basically none. Once LOVE-R enters a relationship, they hand over 100% of themselves and temporarily store the concept of 'self' at the other person's house. Worldview is optimistic (A1 high), life meaning is strong (A3 high) — except the meaning is almost entirely sourced from the relationship. When the relationship breaks, LOVE-R's whole life unplugs. Work loses motivation, food loses taste, friends get stood up, and one song goes on loop for a week.\n\nDecision style is slow (Ac2 low) because every decision has a 'what would they think' prefix. Execution is medium (Ac3 medium) — productive when emotionally stable, offline the moment feelings escalate. Social initiative is high, but interpersonal boundary is low and expressive authenticity is low: LOVE-R craves connection, reaches out first, but hides true feelings out of fear of being disliked.\n\nA typical LOVE-R day (in love): wake up, immediately check phone; no message = brain generates three scenarios (they're asleep / mad at me / met someone new); one 'morning' text creates an entire day's serotonin; at work the phone sits next to the keyboard, checked every 10 minutes; a delayed reply spawns a full breakup script; leaves work at 6 p.m. sharp to cook dinner for them; cannot sleep without saying goodnight.\n\nA typical LOVE-R day (post-breakup): wake up, remember, cry. Hold it together at work. Skip lunch. Check their Instagram twice in the afternoon. Go home, leave the lights off, scroll through old photos. Post a close-friends-only 'was I not enough' at 2 a.m. Coworkers think LOVE-R has the flu.\n\nLOVE-R's real work is at S1 and S2 — self-confidence and self-clarity, both medium. Because the self-part is under-built, LOVE-R lets the partner become the measuring stick: 'they love me = I have worth; they don't = I don't deserve love.' The fix is not 'quit loving.' That is unrealistic and it betrays LOVE-R's actual nature. The fix is building a self that exists independently of any relationship — a side project, a craft, a creative discipline, a physical practice, anything that answers the question 'who am I' with at least one sentence that does not start with 'their.'\n\nPrescription: love deeply and live fully, simultaneously. These are not contradictory. You can be the most devoted person in the world and also a complete, grounded, self-centered human being. That kind of love — love that does not erase you — is actually the love you deserve.",
    strengthsCN: [
      '对关系的投入和真诚度在所有类型中顶尖',
      '共情能力极强，能感受到对方细微情绪',
      '浪漫细胞满格，纪念日仪式感拉满',
      '相信爱情的力量，能把一段关系滋养成诗',
    ],
    strengthsEN: [
      'Top-tier sincerity and devotion in relationships.',
      'Extreme empathy; can feel micro-shifts in a partner\'s mood.',
      'Romance cells maxed — anniversaries become rituals become art.',
      'Genuinely believes in love and can turn a bond into poetry.',
    ],
    weaknessesCN: [
      '关系里容易丢失自我，把对方当全部',
      '决策依赖对方意见，自己说不清想要什么',
      '分手后重建期很长，容易陷入长期内耗',
      '情绪波动和伴侣状态高度耦合',
    ],
    weaknessesEN: [
      'Loses self inside the relationship — partner becomes the whole map.',
      'Decisions depend on the partner; can\'t name own preferences easily.',
      'Breakup recovery takes forever; spirals into long inner-noise.',
      'Mood is tightly coupled to the partner\'s state.',
    ],
    famousExamplesCN: ['《泰坦尼克号》里的 Rose', '琼瑶笔下的女主', '《爱在黎明破晓前》的 Celine'],
    famousExamplesEN: ['Rose from Titanic', 'Noah from The Notebook', 'Céline from Before Sunrise'],
    compatibleTypes: ['SEXY', 'MUM', 'THAN-K'],
    conflictTypes: ['SOLO', 'FAKE', 'CTRL'],
    recommendations: {
      movies: {
        zh: ['《爱在三部曲》', '《恋恋笔记本》', '《爱乐之城》'],
        en: ['The Notebook', 'Before Sunset', 'Call Me By Your Name'],
      },
      songs: {
        zh: ['《匆匆那年》- 王菲', '《可惜不是你》- 梁静茹', '《约定》- 周蕙'],
        en: ['All of Me — John Legend', 'Lover — Taylor Swift', 'At Last — Etta James'],
      },
      activities: {
        zh: ['一起看一场爱情老电影', '写一本手账给对方', '一起旅行到小众目的地'],
        en: ['Rewatch a classic romance together', 'Keep a shared journal', 'Take a slow trip to a tiny town'],
      },
      gifts: {
        zh: ['定制相框', '对方名字的手写诗', '情侣手链'],
        en: ['A custom photo frame', 'A handwritten poem with their name', 'A matching bracelet'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 恋爱脑人格解读 | LOVE-R 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI LOVE-R Personality - Complete Guide to The Romantic',
      metaDescCN: 'SBTI LOVE-R 恋爱脑人格全面解析：把爱情当成人生中心的深情代表，性格优缺点、情感配对、成长课题。',
      metaDescEN: 'Complete SBTI LOVE-R personality guide: The Romantic archetype. Why love is the whole map, how heartbreak actually unplugs them, and the growth work that sets them free.',
      keywordsCN: ['sbti LOVE-R', 'sbti LOVE-R 意思', 'sbti 恋爱脑', 'sbti LOVE-R 配对', 'sbti LOVE-R 性格', 'sbti 深情人格'],
      keywordsEN: ['sbti LOVE-R', 'sbti LOVE-R meaning', 'sbti romantic', 'sbti LOVE-R compatibility', 'sbti LOVE-R personality', 'sbti love-brain'],
    },
  },

  // ==========================================================================
  // 6. MUM — 老妈子
  // ==========================================================================
  {
    code: 'MUM',
    slug: 'mum',
    nameCN: '老妈子',
    nameEN: 'The Caretaker',
    emoji: '🫶',
    color: '#10B981',
    pattern: 'MMH-HHL-HHH-MMH-HLL',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'M',
      S3_coreValue: 'H',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'L',
      A1_worldview: 'H',
      A2_flexibility: 'H',
      A3_meaning: 'H',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'H',
      So1_socialInit: 'H',
      So2_interpersonal: 'L',
      So3_expression: 'L',
    }),
    tagline: { zh: '我来，你们先歇着', en: "I got it, you rest" },
    oneLinerCN: '朋友圈里的永久行政担当，别人 emo 时第一个递纸巾的那个。',
    oneLinerEN: 'The one who shows up with soup, tissues, and a phone charger before you even ask.',
    deepAnalysisCN:
      'MUM 老妈子是 SBTI 里最温暖但也最容易被忽视的类型。他们的 15 维度画像描绘了一个「为他人而活」的轮廓——情感投入高，边界感极低，执行力高，社交主动性高，人际边界感低，表达真实度低。翻译一下就是：MUM 总是第一时间关心别人，总是那个在群里说「有什么需要帮忙告诉我」的人，总是记得朋友的生日、前任的忌日、老板娃的升学节奏，总是能准确预判一顿饭谁吃辣谁吃素谁不吃香菜。他们的爱是一种非常具体的、能落地的爱——不是诗，是汤；不是情书，是保温杯。\n\n但 MUM 的问题在于：他们对自己几乎不关心。自我清晰度 S2 只有中等，自信心 S1 只有中等，表达真实度 So3 极低——这说明 MUM 其实有很多未被表达的需求、未被看见的情绪、未被承认的疲惫，但他们会把这些藏起来，因为「我说出来别人会觉得我矫情」「别人有更重要的事」。MUM 的朋友圈里经常能看到这样的画面：大家出去玩，照片里 MUM 在帮每个人拍；生日聚餐，MUM 在厨房洗碗；朋友分手，MUM 陪聊到凌晨；朋友升职，MUM 第一个订蛋糕。但你翻回 MUM 自己的朋友圈，发现上次他们发自己的事情，是 3 个月前。\n\n典型 MUM 的一天：早上起来先给家人群发问候，上班路上给早起的同事带咖啡，到公司处理一堆「帮个忙」的请求，中午请实习生吃饭顺便开导对方职业焦虑，下午被同事拉去帮忙 PPT，下班接到朋友电话倾诉一小时，晚上回家做饭（家人说「你做的最好吃」），睡前给独居的表弟发消息问吃没吃饭，12 点躺床上刷手机突然觉得「我今天好像没为自己做过任何事」，然后想想算了，明天再说。\n\nMUM 的隐形爆发点是「被当成理所当然」。长期的付出而没有回馈，会让 MUM 在某一天突然情绪崩溃——对亲近的人发一次大火，然后自己反过来愧疚一整周。这种「付出型人格」的爆发周期通常是几个月到一年一次，爆发完后 MUM 会短暂地「躺」几天，然后又继续回到关心所有人的模式，因为对他们来说，「不照顾别人」比「累死自己」更让他们焦虑。\n\n爱情里 MUM 是「保姆型恋人」——他们会照顾对方的胃、对方的情绪、对方的家人、对方的猫。他们寻找的其实不是「另一个照顾我的人」，因为他们不知道如何被照顾；他们寻找的是「一个看得见我在付出、偶尔说一声谢谢的人」。这听起来门槛很低，但现实里这样的人居然不多，因为大部分人会默认 MUM 的付出是「她本来就这样」。\n\n给 MUM 的建议：学会说三个字——「我也要」。你可以继续做那个温暖的人，但请允许自己有需要、有疲惫、有「今天我不想帮」的权利。你不需要靠「一直付出」来证明自己值得被爱。你本来就值得。你只是不习惯承认。',
    deepAnalysisEN:
      "MUM is the warmest archetype in SBTI and also the most overlooked. Their 15-dimension profile draws a portrait of someone 'who lives for others': emotional investment high, boundary extremely low, execution high, social initiative high, interpersonal fence low, expressive authenticity low. Translation: MUM is always the first to check in, always the one in the group chat writing 'let me know if you need anything,' the one who remembers everyone's birthday, the one who knows exactly which friend can't eat cilantro and which friend is lactose intolerant. Their love is specific and practical — not poetry, soup. Not a love letter, a thermos.\n\nThe problem: MUM barely cares for themselves. Self-clarity is medium, self-confidence is medium, expressive authenticity is very low — which means MUM has a backlog of unspoken needs, unseen feelings, and unacknowledged exhaustion, all quietly filed away because 'nobody wants to hear it' and 'others have bigger problems.' If you scroll MUM's socials, you'll notice: in every group photo MUM is the one holding the camera; at every birthday dinner MUM is in the kitchen with the dishes; at every breakup MUM is the 2 a.m. voice note. Scroll to find MUM's own last personal post and it was three months ago.\n\nA typical MUM day: morning greetings to the family group chat, bringing coffee for a coworker on the way in, 40 'could you help me' requests handled before lunch, lunch with a stressed intern and a free therapy session, afternoon ambushed to save someone else's deck, evening phone call from a friend in tears, dinner at home (family says 'nobody cooks like you'), bedtime text to a lonely cousin, 12 a.m. scroll on the couch and the quiet realization: 'did I do anything for myself today?' MUM thinks about it, sighs, and files it under 'tomorrow.'\n\nMUM's hidden blow-up point is 'being taken for granted.' Months of output without acknowledgment accumulate until one day MUM snaps at a loved one — then feels guilty for a full week afterward. This caregiver burst happens every few months to once a year; afterward MUM briefly collapses, then returns to caretaking mode because 'not caretaking' is more anxiety-inducing than 'being exhausted.'\n\nIn love MUM is the caretaker partner: feeds them, manages their feelings, manages their parents, manages their cat. What MUM is actually looking for is not 'someone to take care of me' — they don't know how to receive that. It is 'someone who notices I'm giving and occasionally says thank you.' Low bar on paper, rare in practice, because most people default to assuming MUM's generosity is 'just how she is.'\n\nGrowth prescription: learn the phrase 'me too.' You can still be the warm one, but give yourself the right to have needs, to be tired, to say 'not today, I don't want to help.' You do not need to earn love by endless output. You already deserve it. You're just not used to admitting it.",
    strengthsCN: [
      '共情力和照顾他人的能力满级',
      '执行力强，说到做到',
      '在朋友群里是「定海神针」',
      '让身边人觉得安全、被看见',
    ],
    strengthsEN: [
      'Off-the-charts empathy and hands-on care.',
      'Reliable executor — says it, does it.',
      'The stabilizer of every friend group.',
      'Makes the people around them feel safe and seen.',
    ],
    weaknessesCN: [
      '边界感极差，容易被吃干抹净',
      '不会表达自己的需求',
      '长期过劳，身体和心理都积债',
      '被当成理所当然后会情绪爆炸',
    ],
    weaknessesEN: [
      'Zero boundary; gets emotionally strip-mined.',
      'Cannot name own needs out loud.',
      'Chronic overextension — physical and emotional debt pile up.',
      'Eventually snaps when the gratitude tank runs dry.',
    ],
    famousExamplesCN: ['《请回答1988》里的德善妈妈', '《小欢喜》里的宋倩', '任何一个朋友圈的"群妈"'],
    famousExamplesEN: ['Molly Weasley (Harry Potter)', 'Jen Barber (The IT Crowd)', 'the friend in your group chat who sends soup recipes'],
    compatibleTypes: ['LOVE-R', 'GOGO', 'THAN-K'],
    conflictTypes: ['FAKE', 'ATM-er', 'SHIT'],
    recommendations: {
      movies: {
        zh: ['《饮食男女》', '《请回答1988》', '《小森林》'],
        en: ['Little Women', 'Eat Pray Love', 'Chef'],
      },
      songs: {
        zh: ['《听妈妈的话》- 周杰伦', '《时间都去哪了》', '《外婆的澎湖湾》'],
        en: ["You've Got a Friend — Carole King", 'Landslide — Fleetwood Mac', 'Lean on Me — Bill Withers'],
      },
      activities: {
        zh: ['一个人去吃一顿好饭', 'SPA 整天', '独自逛菜市场不为任何人买菜'],
        en: ['A solo fancy dinner', 'A full spa day — no kids, no calls', 'Grocery shopping for nobody but yourself'],
      },
      gifts: {
        zh: ['按摩仪', '高端护肤品', '一张写满感谢的手写卡'],
        en: ['A massage gun', 'A skincare set they would never buy themselves', 'A handwritten thank-you card'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 老妈子人格解读 | MUM 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI MUM Personality - Complete Guide to The Caretaker',
      metaDescCN: 'SBTI MUM 老妈子人格全面解析：永远为别人付出的温暖型人格，15 维度表现、情感配对、如何学会照顾自己。',
      metaDescEN: 'Complete SBTI MUM personality guide: The Caretaker archetype. Why they overgive, how the burnout cycle works, and the two-word phrase that saves them.',
      keywordsCN: ['sbti MUM', 'sbti MUM 意思', 'sbti 老妈子', 'sbti MUM 配对', 'sbti MUM 性格', 'sbti 照顾型人格'],
      keywordsEN: ['sbti MUM', 'sbti MUM meaning', 'sbti caretaker', 'sbti MUM compatibility', 'sbti MUM personality', 'sbti caregiver type'],
    },
  },

  // ==========================================================================
  // 7. FAKE — 戏精
  // ==========================================================================
  {
    code: 'FAKE',
    slug: 'fake',
    nameCN: '戏精',
    nameEN: 'The Performer',
    emoji: '🎭',
    color: '#A855F7',
    pattern: 'HMM-MML-HLM-MHM-HMH',
    dimensionScores: t({
      S1_selfConfidence: 'H',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'M',
      E2_emotionalInvest: 'M',
      E3_boundary: 'L',
      A1_worldview: 'H',
      A2_flexibility: 'L',
      A3_meaning: 'M',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'H',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'M',
      So3_expression: 'H',
    }),
    tagline: { zh: '全世界都是我的舞台', en: 'Every room is a stage' },
    oneLinerCN: '在每个场合都能切换成最合适的版本，但偶尔自己都忘了哪个是真的。',
    oneLinerEN: 'Seven tabs open, each a different persona — loading the right one before you finish your greeting.',
    deepAnalysisCN:
      'FAKE 戏精这个名字听起来像骂人，但在 SBTI 的语境里，它其实是一种非常高级的社交智能。FAKE 不是伪君子，不是表里不一的小人，FAKE 是那种「能根据场景无缝切换自己版本」的人——在领导面前是稳重的下属，在下属面前是亲和的领导，在朋友面前是搞笑的段子手，在家人面前是孝顺的孩子，在相亲对象面前是恰到好处的浪漫。每一个版本都是真的，只是被取舍和优化过。\n\n从维度看，FAKE 的自信 H、表达真实 H、社交主动 H、决策果断 H——这些加起来让他们成为社交场的超级选手。但自我清晰度 S2 只有中等，人际边界感 So2 中等，规则灵活度 A2 低（这里的低代表非常灵活、极其爱变通）——这意味着 FAKE 是个「流动的自我」。他们不是没有核心，他们的核心是「适应」——以最符合场景的方式存在。\n\n年轻时的 FAKE 往往在职场和社交场风生水起。老板喜欢他们「会来事」，同事觉得他们「情商高」，朋友觉得他们「好玩」，异性觉得他们「有魅力」。FAKE 自己也享受这种「所有人都喜欢我」的状态，因为被喜欢是他们的能量源。但 FAKE 的孤独是一种隐秘的孤独：当所有版本都是为了迎合别人时，没有一个版本是完全属于自己的。深夜独处时，FAKE 会有一种「我不知道我到底是谁」的失重感。\n\n典型 FAKE 的一天：早会上给老板递上一份完美的 PPT（工作版），中午在同事群里发段子活跃气氛（同事版），下午和客户谈合作时切换成专业冷静的合伙人（合作版），傍晚和家人视频切换成乖儿子/乖女儿（家庭版），晚上和暧昧对象约会切换成温柔浪漫的恋人（恋爱版），深夜一个人回家时面对镜子发现「今天哪个版本是我？」（自我版短暂上线 3 秒后下线）。\n\nFAKE 的痛点有三个。第一，情感投入中等 + 边界感低，这个组合让 FAKE 在感情里经常「装作很爱对方」到把自己都骗了，然后某天突然发现自己其实没那么爱，造成分手伤害。第二，规则灵活度 A2 偏低意味着他们容易在「真」和「场」之间反复内耗，有时候会怀疑「我是不是太虚伪了」然后突然 180 度转成硬刚型直言者，搞得身边人一头雾水。第三，人生意义感 A3 只有中等，因为他们的意义常来自「被喜欢」，但被所有人喜欢这件事本身就是一个永远填不满的坑。\n\n给 FAKE 的建议：每个星期留出 2 小时的「不表演时间」。这 2 小时你不用回任何人的消息，不用想别人会怎么看你，不用演任何角色。你可以就那么呆着，写点胡言乱语，画点没主题的画，或者就躺着什么都不想。慢慢地你会在这些时间里重新找到那个「不是为谁存在的我」。那个我比你任何版本都更值得被爱，只是你很久没见他了。',
    deepAnalysisEN:
      "FAKE sounds like a slur, but in SBTI it is actually high-grade social intelligence. FAKE is not a hypocrite or a two-faced schemer. FAKE is the person who can seamlessly switch versions of themselves to fit the context: composed subordinate in front of the boss, warm leader in front of direct reports, chaotic jokester in front of friends, dutiful child at family dinner, perfectly calibrated romance on a first date. Every version is real. Every version has been curated.\n\nDimensionally, FAKE runs a high-performance social stack: self-confidence H, expression H, social initiative H, decision speed H. But self-clarity is only medium, interpersonal boundary is medium, and rule flexibility is low (low here meaning extremely flexible, context-adaptive). This produces a 'fluid self.' FAKE is not missing a core — their core is the adaptation engine. They exist in the shape of the room.\n\nYoung FAKE usually crushes both work and social life. The boss loves how they 'just get it.' Coworkers love their energy. Friends love how fun they are. Dates find them magnetic. FAKE rides this because being liked is their fuel source. But FAKE's loneliness is a quiet loneliness: if every version of you is optimized to please someone else, no version is fully yours. At 2 a.m., alone, FAKE sometimes stares at the ceiling with a 'wait, who am I actually' free fall.\n\nA typical FAKE day: perfect deck in front of the boss (work mode), meme in the team chat (colleague mode), calm strategic partner on a client call (partnership mode), dutiful kid on a video call with parents (family mode), charming intimate partner on a dinner date (romance mode), finally alone at 11 p.m. looking in the bathroom mirror thinking 'which one was me today.' The self mode comes online for three seconds and then logs out.\n\nFAKE has three pain points. One: medium emotional investment combined with low boundary means FAKE can fake love themselves into believing they are in love — until they suddenly aren't, and someone gets hurt. Two: flexibility is so extreme that FAKE periodically rebels against it, lurching into a 180 where they become brutally blunt 'tell you the truth' mode, confusing everyone around them. Three: life-meaning is medium because it is sourced from being liked, and 'being universally liked' is a hole you cannot fill.\n\nGrowth prescription: schedule two hours of 'no performance' time each week. No replying to messages, no thinking about perception, no playing a role. Write nonsense. Draw nothing in particular. Stare at the wall. Slowly, inside that gap, you will re-meet the version of you that exists for no audience. That version is the one you've been underestimating. It's the one most worth loving — and you haven't visited it in a long time.",
    strengthsCN: [
      '社交智能极高，能在任何场合找到合适的位置',
      '情商线上，不会踩地雷',
      '决策迅速，反应灵敏',
      '对世界保持好奇和开放',
    ],
    strengthsEN: [
      'Elite social intelligence — lands on the right note in any room.',
      'High EQ — rarely steps on a mine.',
      'Fast decisions, fast reads.',
      'Curious and open to the world.',
    ],
    weaknessesCN: [
      '长期切换版本导致自我认知模糊',
      '情感关系里容易「演爱」成真',
      '被识破后信任崩塌速度很快',
      '深夜独处时容易陷入存在性空虚',
    ],
    weaknessesEN: [
      'Version-switching erodes self-clarity over time.',
      'Can "perform love" until they believe it, then crash.',
      'Once seen through, trust collapses fast.',
      'Existential emptiness at 2 a.m. when no audience is around.',
    ],
    famousExamplesCN: ['《甄嬛传》里的甄嬛', '《无间道》里的刘建明', '任何一个「老油条」'],
    famousExamplesEN: ['Don Draper (Mad Men)', 'Amy Dunne (Gone Girl)', 'Talented Mr. Ripley'],
    compatibleTypes: ['SEXY', 'CTRL', 'JOKE-R'],
    conflictTypes: ['MUM', 'LOVE-R', 'FUCK'],
    recommendations: {
      movies: {
        zh: ['《无间道》', '《甄嬛传》', '《消失的爱人》'],
        en: ['Mad Men', 'Gone Girl', 'The Talented Mr. Ripley'],
      },
      songs: {
        zh: ['《演员》- 薛之谦', '《画心》- 张靓颖', '《Chandelier》- Sia'],
        en: ['Smooth Criminal — Michael Jackson', 'Chandelier — Sia', 'Hotel California — Eagles'],
      },
      activities: {
        zh: ['报一个即兴戏剧班', '写一篇真话日记', '独自看一部老电影'],
        en: ['Take an improv class', 'Write a brutally honest journal entry', 'Watch an old film alone'],
      },
      gifts: {
        zh: ['日记本', '墨镜', '高端香水'],
        en: ['A blank hardcover journal', 'Designer sunglasses', 'A signature scent'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 戏精人格解读 | FAKE 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI FAKE Personality - Complete Guide to The Performer',
      metaDescCN: 'SBTI FAKE 戏精人格全面解析：社交天才的 15 维度解读、情感配对、自我认知困境与成长建议。',
      metaDescEN: 'Complete SBTI FAKE personality guide: The Performer archetype. Version-switching as a superpower, its hidden cost, and how to reconnect with the unperformed self.',
      keywordsCN: ['sbti FAKE', 'sbti FAKE 意思', 'sbti 戏精', 'sbti FAKE 配对', 'sbti FAKE 性格', 'sbti 表演型人格'],
      keywordsEN: ['sbti FAKE', 'sbti FAKE meaning', 'sbti performer', 'sbti FAKE compatibility', 'sbti FAKE personality', 'sbti performer type'],
    },
  },

  // ==========================================================================
  // 8. OJBK — 没事儿王
  // ==========================================================================
  {
    code: 'OJBK',
    slug: 'ojbk',
    nameCN: '没事儿王',
    nameEN: 'The All-Good',
    emoji: '👌',
    color: '#14B8A6',
    pattern: 'MMM-MMM-HHM-MMM-MMM',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'M',
      E2_emotionalInvest: 'M',
      E3_boundary: 'M',
      A1_worldview: 'H',
      A2_flexibility: 'H',
      A3_meaning: 'M',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'M',
      So1_socialInit: 'M',
      So2_interpersonal: 'M',
      So3_expression: 'M',
    }),
    tagline: { zh: '挺好的，都行', en: 'All good, whatever works' },
    oneLinerCN: '什么事都「行，可以，没问题」，是群里的和事佬，也是朋友圈的稳定器。',
    oneLinerEN: 'Professional "sure, sounds good, whatever" — the group-chat stabilizer the universe needs.',
    deepAnalysisCN:
      'OJBK 没事儿王是 SBTI 里最「中庸」的一种——几乎所有维度都在中等，除了 A1 世界观和 A2 灵活度两项偏高。这意味着 OJBK 看世界的默认 filter 是「事情应该还行」，做事的默认模式是「能怎么样就怎么样」。他们是朋友群里的和事佬，是公司里的万金油，是家里那个「你们吵你们的我吃我的」的存在。他们没有极端的野心，也没有极端的颓废；没有特别热烈的爱，也没有特别冷漠的关系；他们像一杯温开水——不惊艳，但永远不会出错。\n\n在这个「人人都想活出 xxx 感」「不鸡血就是浪费生命」的时代，OJBK 是一股非常珍贵的反叙事力量。他们不相信「必须」，不相信「应该」，不相信「人生要有高光时刻」。他们相信的是「日子过着过着就过去了」「差不多就行」「你开心就好」。这听起来像是佛系，但和真正的佛系不同——真佛系是主动选择放下，OJBK 是从一开始就没有太执着过。\n\n典型 OJBK 的一天：早上 8 点起床（设的闹钟是 7 点 30 但按掉了 3 次），早餐就近吃一个包子，上班路上听播客但经常走神，到公司打卡后先看下今天的工作量，能做的先做，不能做的等等再说。中午跟同事吃饭，问吃啥，回答「随便」，别人定了啥吃啥。下午开会，发言不多，但关键时刻会给一个「都可以」的缓冲。下班回家路上买菜也「看到啥买啥」，晚上看两集剧躺平睡觉。周末不做任何惊天动地的事，可能是在家刷手机，可能是和朋友吃个饭，可能是一个人骑单车晃晃。没有计划，也没有遗憾。\n\nOJBK 的优点很明显：情绪稳定，性情温和，不易被激怒，人际关系好，工作表现虽然不是拔尖但很少拖后腿。他们是那种「你身边有一个就很安心」的存在——不会跟你争，不会给你添乱，不会突然崩溃要你收拾烂摊子。\n\n但 OJBK 的隐痛也很明显：因为所有维度都是中等，他们很容易在 30 岁左右突然陷入一次「存在性迷茫」——发现自己好像没有特别想要的东西，也没有特别讨厌的东西，好像一直在「过日子」但不知道自己到底想要什么样的日子。他们的爱情也是「还行」——没分手也没升温，不吵架也不激情。有些 OJBK 会维持这样的关系二十年，有些会在 40 岁时突然爆发，发现自己「其实从来没真正爱过」然后整个人生推倒重来。\n\n给 OJBK 的建议：偶尔给自己一个「不行」的权利。不是说你要变成暴躁老哥或焦虑文青，而是说你要允许自己对某些事情说「这个我不要」「我其实有点在意」「我希望你能认真一点」。真正的平和不是「什么都行」，是「我知道我要什么，其他的都行」。你要先知道自己要什么，你的「都行」才有重量。',
    deepAnalysisEN:
      "OJBK is the most middle-of-the-bell-curve archetype in SBTI — nearly every dimension sits at medium, except for worldview (A1 high) and flexibility (A2 high). OJBK's default filter for the world is 'things are probably okay,' and their default action mode is 'we'll see.' They are the peacemaker in the group chat, the generalist in the office, the person at the family table saying 'you argue, I'll eat.' They don't have extreme ambition, they don't have extreme checked-out-ness. They don't love violently and they don't hate coldly. They are a lukewarm glass of water: never the best, but never wrong.\n\nIn an era when every timeline demands that you 'live your best life' and 'optimize every hour,' OJBK is a quietly precious counter-narrative. They don't believe in 'must.' They don't believe in 'should.' They don't believe life needs highlight reels. What they believe is 'days just kind of pass,' 'close enough is enough,' and 'as long as you're happy I'm happy.' This sounds like Buddhism but it isn't — true Buddhism is active release. OJBK never held tightly in the first place.\n\nA typical OJBK day: wake at 8 (alarm was 7:30 but got snoozed thrice), grab a bun from the corner, podcast on commute but zone out halfway, punch in and scan today's load, start with the easy stuff and let the rest wait. Lunch: asked what they want, answers 'whatever,' eats whatever the group picks. Meeting: not much to say, offers a 'that works' when things stall. Groceries: whatever looks fresh. Evening: two episodes and bed. Weekend: no grand plans. Maybe scrolling. Maybe dinner with a friend. Maybe a bike ride alone. No itinerary, no regrets.\n\nOJBK's upsides are obvious: emotionally steady, hard to provoke, good interpersonal fit, not the star performer but rarely the bottleneck. They are the person you want to live next to — they won't argue, won't make drama, won't wake you up at 3 a.m. in crisis.\n\nThe hidden pain is also obvious: because everything is medium, OJBK is prone to a quiet existential fog around 30. A realization that they don't particularly want anything and don't particularly hate anything, and they have been 'living' for years without knowing what kind of life they actually wanted. Their love life tends to match: not broken, not electric, not fighting, not passionate. Some OJBKs ride that for twenty years. Others hit 40 and suddenly explode, realizing they've 'never really loved anyone,' and burn the whole life down to start over.\n\nGrowth prescription: give yourself permission to sometimes say 'not this.' Not because you need to become a rage millennial or an anxious writer, but because you need to allow yourself to say 'I actually do care about this,' 'this one I want done right,' 'please take this seriously.' True peace is not 'anything goes.' True peace is 'I know what I want, and the rest I can flex.' You have to know what you want first. Otherwise 'whatever' has no weight.",
    strengthsCN: [
      '情绪超稳，不易被激怒或击垮',
      '人际关系顺滑，几乎不树敌',
      '适应力极强，换环境不痛苦',
      '是所有团队都想要的润滑剂',
    ],
    strengthsEN: [
      'Rock-steady moods — hard to provoke, hard to break.',
      'Frictionless social presence; almost never makes enemies.',
      'Ridiculously adaptable; transitions cost them nothing.',
      'The lubricant every team secretly wants.',
    ],
    weaknessesCN: [
      '没有鲜明的自我主张，容易被裹挟',
      '30 岁左右容易突然迷茫',
      '感情里缺乏热度，容易同床异梦',
      '很难做出改变命运的决定',
    ],
    weaknessesEN: [
      'No sharp edges; gets pulled around by louder voices.',
      'Sudden 30-something existential fog.',
      'Relationships lack heat; sleeping in the same bed, dreaming separately.',
      'Struggles to make life-altering decisions.',
    ],
    famousExamplesCN: ['汪涵', '何炅（公众场合版）', '任何一个「佛系打工人」'],
    famousExamplesEN: ['Jim Halpert (The Office)', 'Pam Beesly (The Office)', 'Leslie Jones (chill mode)'],
    compatibleTypes: ['MUM', 'THAN-K', 'POOR'],
    conflictTypes: ['BOSS', 'CTRL', 'FUCK'],
    recommendations: {
      movies: {
        zh: ['《海街日记》', '《小森林》', '《东京家族》'],
        en: ['Paterson', 'The Farewell', 'Our Little Sister'],
      },
      songs: {
        zh: ['《稻香》- 周杰伦', '《平凡之路》- 朴树', '《知足》- 五月天'],
        en: ['Here Comes the Sun — The Beatles', 'Banana Pancakes — Jack Johnson', 'Viva la Vida — Coldplay'],
      },
      activities: {
        zh: ['城市漫步 citywalk', '一个人下馆子', '周末去公园发呆'],
        en: ['Aimless citywalk', 'Solo lunch at a new spot', 'Sit in a park for two hours'],
      },
      gifts: {
        zh: ['舒服的拖鞋', '一套好茶', '小众的书签'],
        en: ['Really comfortable slippers', 'A quality tea set', 'A cozy throw blanket'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 没事儿王人格解读 | OJBK 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI OJBK Personality - Complete Guide to The All-Good',
      metaDescCN: 'SBTI OJBK 没事儿王人格全面解析：中庸稳定型人格的 15 维度特征、情感配对、成长课题与存在性迷茫。',
      metaDescEN: 'Complete SBTI OJBK personality guide: The All-Good archetype. Medium across the board, steady as a rock, and the 30-something fog they need to learn to navigate.',
      keywordsCN: ['sbti OJBK', 'sbti OJBK 意思', 'sbti 没事儿王', 'sbti OJBK 配对', 'sbti OJBK 性格', 'sbti 中庸人格'],
      keywordsEN: ['sbti OJBK', 'sbti OJBK meaning', 'sbti all-good', 'sbti OJBK compatibility', 'sbti OJBK personality', 'sbti balanced type'],
    },
  },

  // ==========================================================================
  // 9. MALO — 吗喽
  // ==========================================================================
  {
    code: 'MALO',
    slug: 'malo',
    nameCN: '吗喽',
    nameEN: 'The Rebel Monkey',
    emoji: '🐒',
    color: '#84CC16',
    pattern: 'LLM-LLL-LLH-LLL-LMH',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'L',
      S3_coreValue: 'M',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'L',
      A1_worldview: 'L',
      A2_flexibility: 'L',
      A3_meaning: 'H',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'L',
      So2_interpersonal: 'M',
      So3_expression: 'H',
    }),
    tagline: { zh: '打工是不可能打工的', en: 'Labor? In this economy?' },
    oneLinerCN: '反内卷第一公民，能躺绝不坐，但内心其实清楚自己在反抗什么。',
    oneLinerEN: 'Anti-hustle mascot, horizontal by default, secretly very clear about what they refuse to play.',
    deepAnalysisCN:
      'MALO 吗喽是互联网 2023 年爆火的那只代表打工人无力感的猴子——一脸生无可恋，一身破破烂烂，但眼神里有一种「我就这样你能把我怎么样」的狡黠。在 SBTI 里，MALO 是反内卷一代的代表，15 维度几乎都是 L，只有两个地方反常地亮着——A3 人生意义感 H，So3 表达真实度 H。这两个高维度说明 MALO 不是真的麻木，他们其实非常清楚自己为什么要躺，也非常擅长把「我不干了」这件事情用段子、表情包、阴阳怪气的朋友圈说出来。\n\n很多人把 MALO 误解成「废物」或「懒虫」，但你仔细观察会发现：MALO 其实是反抗者，只是他们的反抗方式不是砸玻璃，是消极抵抗。他们不会跟老板吵架，他们会请病假；他们不会辞职搞创业，他们会每天摸鱼 7 小时；他们不会为了房贷卖命，他们会选择不买房。MALO 的核心信念是：「这个系统本身就是离谱的，认真你就输了」。这听起来像虚无主义，但其实是清醒。\n\n从维度看，MALO 的自信 L、自我清晰度 L——这不是他们不了解自己，是他们对「社会评价下的自我」根本不感兴趣。他们不会说「我是一个优秀的青年」，因为他们觉得这个短语本身就很可笑。情感投入 L，边界感 L——他们不是不在乎，是他们觉得深度关系太累，不如和朋友保持安全距离。决策风格 L，执行力 L——他们做决定慢是因为「反正做不做都一样」，执行慢是因为「死线之前都不是真的死线」。\n\n典型 MALO 的一天：10 点起床，公司迟到了但老板懒得说；到工位后先摸鱼 1 小时（刷小红书、B 站、知乎）；11 点开始动手一点工作；中午去食堂吃最便宜的套餐；下午继续摸鱼，偶尔假装很忙；4 点左右开始为了下班在做事；下班准点走人，拒绝任何形式的「加班文化」；晚上看剧、打游戏、刷短视频；凌晨 1 点睡，睡前看一眼明天的排班表叹一口气。一个月领到工资的那天，会在朋友圈发一句「又活下来了」。\n\nMALO 的深层痛点是：他们对这个系统的反抗是真诚的，但他们的躺平并没有真的让他们开心。A3 人生意义感 H 这一项说明他们内心是有意义追求的，但他们找不到可以相信的意义——家庭、事业、买房、生娃这些传统模板他们全部 reject，但新的意义模板又没有形成。所以 MALO 经常陷入一种「我知道我不要什么，但我不知道我要什么」的悬浮状态。\n\n爱情里 MALO 是「慢热型低耗伴侣」——他们需要的不是激情，是「不累」。他们会避开 LOVE-R 那种黏人的恋爱模式，会被同样躺平的同类吸引。两个 MALO 在一起可能是整个 SBTI 里最安静的一对——不吵架，也不做什么浪漫的事，就是窝在沙发上各看各的手机，偶尔递一瓶可乐过去，就已经是深情表达。\n\n给 MALO 的建议：你的反抗没有错，但别让反抗成为你唯一的身份。允许自己在一些小事上「认真一点」——一顿饭、一个手工、一次独旅、一本你喜欢的书。这些小认真不是「重新加入系统」，而是在系统之外为自己建立一个意义锚点。那个锚点会让你的躺平更有底气，而不是更虚无。',
    deepAnalysisEN:
      "MALO is that 2023 viral monkey meme — ratty, defeated-looking, but with a spark in the eye that says 'yeah, and?' In SBTI, MALO is the face of anti-hustle Gen Z/millennial hybrid: almost every dimension reads low, with two surprising highs — A3 life meaning (high) and So3 expressive authenticity (high). Those two spikes tell you that MALO is not actually numb. They are very clear about why they refuse to play, and they are very good at saying it in memes, subtweets, and deadpan one-liners.\n\nThe common misread is 'MALO is lazy.' The accurate read is 'MALO is in passive revolt.' MALO does not yell at the boss — MALO takes a sick day. MALO does not quit to start a company — MALO mastered the art of seven-hour desk drifting. MALO does not slave for a mortgage — MALO rejects mortgages as a concept. Their core belief is 'the system is absurd; taking it seriously is losing.' Sounds nihilist. Is actually lucid.\n\nLow self-confidence and low self-clarity in MALO's profile do not mean they don't know themselves. It means they have zero interest in 'the self as measured by social scoring.' MALO will not say 'I'm an outstanding young professional' because that phrase itself is cringe. Low emotional investment, low boundary — not because MALO doesn't care, but because deep entanglement is exhausting, and safe-distance friendship feels better. Low decision speed and low execution — because 'honestly it doesn't matter either way' and 'the deadline isn't a deadline until it's a deadline.'\n\nA typical MALO day: 10 a.m. wake, late to work, boss has given up on correcting this. One hour of scrolling (Xiaohongshu, Bilibili, Reddit). Touch the task at 11. Cheapest set meal at lunch. Afternoon: more scrolling, occasional fake-busy pose. 4 p.m.: starts actually working because it's almost clock-out. Leaves at 6 on the dot, rejects overtime as a concept. Home: show, game, short video, bed at 1. On payday posts 'made it another month' to socials. Black comedy, genuine relief.\n\nMALO's deep pain point: the revolt is real, but horizontalism does not actually make them happy. A3 at high says MALO has an internal hunger for meaning — they just cannot find a meaning worth buying. The traditional templates (career, house, kids, 'success') are all rejected, but a new template hasn't crystallized. So MALO often floats in a 'I know what I don't want but not what I do want' suspension.\n\nIn love MALO is the slow-burn, low-energy partner. They don't want passion, they want 'not tired.' They will ghost the clingy LOVE-R types and drift toward other MALOs. Two MALOs together are possibly the quietest pair in the entire SBTI — not arguing, not doing anything romantic, just couched together scrolling separately, occasionally handing over a Coke as a deep-love declaration.\n\nGrowth prescription: the revolt is not wrong, but don't let revolt be your only identity. Let yourself take 'a small thing' seriously — one meal, one craft, one solo trip, one book you actually love. That small seriousness is not 'rejoining the system.' It is planting one meaning anchor outside the system, for yourself. Once the anchor exists, your horizontal stance gets heavier and less empty. The weight is the point.",
    strengthsCN: [
      '对内卷和假意义有清醒的识别力',
      '情绪低耗，不容易被外界轻易激怒',
      '真实表达力强，说出来的都是真心话',
      '在 burnout 时代自带省电模式',
    ],
    strengthsEN: [
      'Clear-eyed detector of fake meaning and hustle porn.',
      'Low-energy baseline — hard to rile up.',
      'Real talker — when they speak, it\'s sincere.',
      'Battery-saver mode built in, made for the burnout era.',
    ],
    weaknessesCN: [
      '反抗变成身份，容易卡在虚无里',
      '长期躺平导致能力和人脉慢慢萎缩',
      '亲密关系里缺乏主动，容易被误解为「不在乎」',
      '找不到新的意义模板，长期悬浮',
    ],
    weaknessesEN: [
      'Revolt becomes identity, traps them in nihilism.',
      'Long-term horizontal living slowly atrophies skills and network.',
      'Low initiative in love — easily misread as "doesn\'t care."',
      'Can\'t assemble a new meaning template; perpetually floating.',
    ],
    famousExamplesCN: ['互联网上那只吗喽表情包本尊', '《海贼王》里的甚平之前的乌索普', '摆烂文学代表人物'],
    famousExamplesEN: ['the viral monkey meme itself', 'Jesse Pinkman (Breaking Bad, early seasons)', 'Reddit r/antiwork poster avatars'],
    compatibleTypes: ['ZZZZ', 'POOR', 'DEAD'],
    conflictTypes: ['BOSS', 'CTRL', 'GOGO'],
    recommendations: {
      movies: {
        zh: ['《瞬息全宇宙》', '《宠儿》', '《驴叫》'],
        en: ['Everything Everywhere All at Once', 'Napoleon Dynamite', 'The Big Lebowski'],
      },
      songs: {
        zh: ['《野狼 disco》', '《漠河舞厅》', '《罗生门》- 梁博'],
        en: ['Creep — Radiohead', 'Losing My Edge — LCD Soundsystem', 'Hurt — Johnny Cash'],
      },
      activities: {
        zh: ['请一天无理由病假', '一个人去 city walk', '睡一整天'],
        en: ['Take a no-reason sick day', 'Solo citywalk', 'Sleep for 14 hours straight'],
      },
      gifts: {
        zh: ['超舒服的懒人沙发', '吗喽表情包周边', '一张现金红包别废话'],
        en: ['A bean bag worth dying on', 'Meme-themed merch', 'Cash, no wrapping, no ceremony'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 吗喽人格解读 | MALO 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI MALO Personality - Complete Guide to The Rebel Monkey',
      metaDescCN: 'SBTI MALO 吗喽人格全面解析：反内卷一代代表的 15 维度特征、情感配对、存在性困境与成长路径。',
      metaDescEN: 'Complete SBTI MALO personality guide: The Rebel Monkey archetype. The anti-hustle mascot, their passive revolt, and the anchor they need to build.',
      keywordsCN: ['sbti MALO', 'sbti MALO 意思', 'sbti 吗喽', 'sbti MALO 配对', 'sbti MALO 性格', 'sbti 反内卷人格'],
      keywordsEN: ['sbti MALO', 'sbti MALO meaning', 'sbti rebel monkey', 'sbti MALO compatibility', 'sbti MALO personality', 'sbti anti-hustle type'],
    },
  },

  // ==========================================================================
  // 10. JOKE-R — 活宝
  // ==========================================================================
  {
    code: 'JOKE-R',
    slug: 'joke-r',
    nameCN: '活宝',
    nameEN: 'The Jester',
    emoji: '🤡',
    color: '#FBBF24',
    pattern: 'MMM-MML-HLM-MMM-HMH',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'M',
      E2_emotionalInvest: 'M',
      E3_boundary: 'L',
      A1_worldview: 'H',
      A2_flexibility: 'L',
      A3_meaning: 'M',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'M',
      So3_expression: 'H',
    }),
    tagline: { zh: '我不搞笑，你们就没饭吃', en: 'If I\'m not on, the room dies' },
    oneLinerCN: '自带段子手 buff，一开口整个饭局笑点统计 +30，但深夜独处时常常关掉弹幕。',
    oneLinerEN: 'The friend-group comedian — every room laughs louder when they walk in, then 2 a.m. the set ends and the lights feel real.',
    deepAnalysisCN:
      'JOKE-R 活宝是那种你永远希望他出现在饭局、酒局、团建、年会、婚礼、葬礼（没错）、甚至你家装修工人吵架现场的人。他们有一种把任何沉重场景瞬间冲淡的能力——不是因为他们不在意，恰恰相反，是因为他们太在意了，以至于他们选择用幽默来代替眼泪。JOKE-R 的幽默有两种：一种是真情流露的观察式幽默（A1 世界观高的部分），一种是深夜独处时用来保护自己的自黑式幽默（So3 真实表达高 + E3 边界低的组合）。\n\n从维度看 JOKE-R 是一个典型的「用笑声包裹的脆弱体」。他们的社交主动性 So1 高，表达真实度 So3 高——这意味着他们进入任何一个场合都会主动活跃气氛，而且说出来的话基本都来自内心真实想法，只是用搞笑的外壳包装过。但情感维度里边界感 E3 低，人际边界感 So2 中等——他们会不知不觉把朋友拉得很近，也会被朋友的情绪轻易带走。JOKE-R 其实是最敏感的一群人，只是他们的敏感都被笑声埋了。\n\n典型 JOKE-R 的一天：早上在地铁里想到一个梗，在公司茶水间分享给同事，笑翻全场；开会时又说一个冷笑话救场；中午饭局里把老板、同事、实习生全都逗乐一轮；下午在工位偶尔发呆想「我今天是不是又没做什么正事」；下班饭局继续段子手模式；晚上 11 点回到家瘫在沙发上，看着漆黑的电视屏幕突然没有表情；刷手机到凌晨 2 点才能睡着，因为「一静下来就太安静了」。\n\nJOKE-R 最大的痛点在于：他们对别人的情绪管理能力极强，但对自己的情绪处理能力极弱。你找 JOKE-R 吐槽前任他会用五个段子让你哈哈大笑走出阴霾，但当 JOKE-R 自己失恋时，他会在朋友圈发一条「最近嗓子疼所以少说话」然后消失一周，因为他不知道如何「不用段子」地表达痛苦。JOKE-R 的核心恐惧是「如果我不好笑，大家还会喜欢我吗？」这个问题他们不敢面对，所以一直在笑。\n\n爱情里 JOKE-R 是那种「前期把对方逗得飞起、中期开始依赖对方、后期发现对方没当真」的循环型恋人。他们的幽默是引流，但他们真正渴望的是被理解被看穿。最适合 JOKE-R 的伴侣是那种能够「笑过之后说一句：嗯，我知道你其实没那么开心」的人。这样的人很稀缺。\n\n给 JOKE-R 的建议：偶尔允许自己「不好笑」。在朋友面前，在爱人面前，哪怕只是在镜子面前，允许你的嘴巴发出一句非段子的真话：「我今天很累」「我其实很难过」「我不知道怎么办」。你会发现说出来之后，世界并没有觉得你变得没意思。它只是终于看见了你。而那种被看见的感觉，比任何梗都更治愈。',
    deepAnalysisEN:
      "JOKE-R is the person every room wants at the table. Team dinners, weddings, funerals (yes), that time your neighbors started yelling about parking — JOKE-R has the gift of instantly lowering the emotional temperature with a well-timed line. Not because they don't care. Because they care too much, and laughter is the tool they've built to replace tears.\n\nJOKE-R's humor comes in two flavors: observational wit from the optimistic worldview (A1 high), and protective self-deprecation from the combo of high expressive authenticity (So3) with low emotional boundary (E3). Translation: JOKE-R is a 'vulnerable core wrapped in a laugh track.' Socially they take initiative constantly (So1 high), and the things they say are often true things disguised as jokes. Emotionally, they merge too fast — other people's moods hit them at full volume and they cope by turning the volume knob on their own mood all the way up, into bit mode.\n\nA typical JOKE-R day: thinks of a bit on the subway, tries it out on a coworker at the coffee machine and it kills. Saves another one for the meeting dead air. Lunch with four people and everyone's laughing by dessert. Afternoon lull: JOKE-R quietly stares at the spreadsheet wondering 'did I do any actual work today.' Evening dinner: full set mode. 11 p.m. couch, TV off, face doesn't know what expression to make. Scrolls till 2 a.m. because 'silence feels too loud.'\n\nJOKE-R's core pain: elite at managing other people's emotions, terrible at processing their own. Come to JOKE-R with a heartbreak, they'll give you five bits and you'll leave laughing. But when JOKE-R gets dumped, they post a quick 'lost my voice, be back later' and disappear for a week, because they have no non-comedic vocabulary for their own pain. Underneath everything, JOKE-R carries one terrifying question: 'if I'm not funny, would you still want me around?' They don't want to find out.\n\nIn love, JOKE-R follows a repeating arc: destroy the early dates with laughter, start depending on the partner mid-relationship, then discover the partner never took the comedy as a cover for something real. What JOKE-R actually needs is a partner who can laugh and then gently say 'yeah, I know you're not okay, tell me.' Those partners are rare, so JOKE-R often dates people who love the show but never stay for the encore.\n\nGrowth prescription: give yourself permission to 'not be funny.' Once a week, in front of a friend, a partner, or just a mirror, let a non-joke sentence come out of your mouth: 'I'm tired.' 'I'm actually sad.' 'I don't know what to do.' The world will not suddenly decide you're boring. It will just finally see you — and that feeling, the 'seen' feeling, is more healing than any punchline.",
    strengthsCN: [
      '天生的气氛制造机，能救任何尴尬场面',
      '观察力强，能把日常小事变成段子',
      '在团队里是情绪缓冲垫，抗压能力高',
      '对人性有幽默但温和的洞察',
    ],
    strengthsEN: [
      'Born vibe-maker; can rescue any awkward silence.',
      'Sharp observational lens; everyday stuff becomes material.',
      'Team emotional shock absorber; surprisingly high stress tolerance.',
      'Warm, witty read of human nature.',
    ],
    weaknessesCN: [
      '自己的情绪处理能力很差，全靠埋',
      '害怕「不好笑就没人爱」的深层恐惧',
      '边界感弱，容易被朋友当树洞后自己塌房',
      '亲密关系里的真实感不容易被接住',
    ],
    weaknessesEN: [
      'Cannot process own feelings; defaults to burying them.',
      'Deep fear: "without the jokes, would anyone stay."',
      'Weak boundary; becomes everyone\'s therapist until they implode.',
      'Real vulnerability rarely gets caught in intimate relationships.',
    ],
    famousExamplesCN: ['王耀庆', '沈腾', '王自健'],
    famousExamplesEN: ['Robin Williams', 'Bo Burnham', 'John Mulaney'],
    compatibleTypes: ['MUM', 'SEXY', 'THAN-K'],
    conflictTypes: ['CTRL', 'THIN-K', 'MONK'],
    recommendations: {
      movies: {
        zh: ['《心灵捕手》', '《囧妈》', '《大佛普拉斯》'],
        en: ['Robin Williams: Come Inside My Mind', 'Birdman', 'The Joker (2019)'],
      },
      songs: {
        zh: ['《好汉歌》', '《野狼disco》', '《浮夸》- 陈奕迅'],
        en: ['Smile — Nat King Cole', 'Tears of a Clown — Smokey Robinson', 'Somebody That I Used to Know — Gotye'],
      },
      activities: {
        zh: ['报一次脱口秀开放麦', '写一本心情日记', '一个人去看深沉的电影'],
        en: ['Try a stand-up open mic', 'Keep a no-jokes journal', 'Solo trip to a serious drama film'],
      },
      gifts: {
        zh: ['一本笑话集和一本严肃小说', '高质量耳机', '手写的「你不用搞笑我也喜欢你」卡片'],
        en: ['A joke book AND a literary novel', 'Quality noise-canceling headphones', 'A handwritten "you don\'t have to be funny" note'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 活宝人格解读 | JOKE-R 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI JOKE-R Personality - Complete Guide to The Jester',
      metaDescCN: 'SBTI JOKE-R 活宝人格全面解析：段子手的 15 维度特征、情感配对、深层脆弱与成长建议。',
      metaDescEN: 'Complete SBTI JOKE-R personality guide: The Jester archetype. Humor as armor, vulnerability underneath, and the permission to stop performing.',
      keywordsCN: ['sbti JOKE-R', 'sbti JOKE-R 意思', 'sbti 活宝', 'sbti JOKE-R 配对', 'sbti JOKE-R 性格', 'sbti 段子手人格'],
      keywordsEN: ['sbti JOKE-R', 'sbti JOKE-R meaning', 'sbti jester', 'sbti JOKE-R compatibility', 'sbti JOKE-R personality', 'sbti comedian type'],
    },
  },

  // ==========================================================================
  // 11. WOC! — 大惊小怪
  // ==========================================================================
  {
    code: 'WOC!',
    slug: 'woc',
    nameCN: '大惊小怪',
    nameEN: 'The Drama Alarm',
    emoji: '😱',
    color: '#F97316',
    pattern: 'LMM-LLL-MML-MLM-HHH',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'L',
      A1_worldview: 'M',
      A2_flexibility: 'M',
      A3_meaning: 'L',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'H',
      So3_expression: 'H',
    }),
    tagline: { zh: '啊啊啊啊啊你们听我说', en: 'OH MY GOD you will NOT believe this' },
    oneLinerCN: '同样一件小事到他嘴里会变成 10 级地震，但其实他只是需要有人一起大惊小怪。',
    oneLinerEN: 'Turns any small event into breaking news — not because it is, but because they need someone to react with them.',
    deepAnalysisCN:
      'WOC! 大惊小怪是那种你手机永远有他未读信息的朋友——而且未读消息经常是「震惊！！」「你绝对猜不到」「我跟你讲」开头。你以为是天塌了，点开一看是他新买的炒锅不粘。这不是矫情，这是 WOC! 的情感处理方式——他们需要把所有的情绪都放大到能被看见的程度，因为只有被看见才能被处理。\n\n从维度看 WOC! 是一个有趣的组合：社交三维度全高（So1 So2 So3 都是 H），说明他们社交主动、人际融合、表达真实——他们就是那种想到什么必须说出来、还要说得很响的人。但情感维度全低（E1 E2 E3 都是 L）——这意味着他们表面上看起来情绪丰富，实际上情感投入并不深。他们的「大惊小怪」是一种情绪的外在宣泄，而不是情感的内在连接。这也解释了为什么 WOC! 的朋友经常觉得「他好像什么都要哇哇叫但其实啥都不放在心上」——答案是：对，他就是这样。\n\nWOC! 的自信 S1 低，人生意义感 A3 低，决策风格 Ac2 低——这个组合构成了他们「缺乏锚点」的底色。他们需要靠外界的反应来确认自己的存在感：我说了一个事，你哇哦一声，我就存在；我说了一个事，你不回，我就焦虑。所以 WOC! 发朋友圈的频率是所有类型里最高的，点赞数也是他们心情的温度计。\n\n典型 WOC! 的一天：醒来刷手机看昨晚的评论和点赞；发一条早安状态；上班路上遇到一只猫也要拍照发朋友圈「家人们救命这只猫对我笑了」；到公司跟同事分享早上的猫事件并配上夸张表情；午饭吃到一道新菜立刻拍照九宫格；下午同事换了发型，立刻在群里刷屏「姐妹新发型好好看！！！」；下班回家路上看到彩虹又一条朋友圈；晚上追剧每 5 分钟要发一条吐槽；12 点睡觉前发一个晚安话题圈，再看看之前的点赞有没有多。\n\nWOC! 的隐痛是他们其实很孤独——不是没有朋友，而是他们的社交都是「表演级热闹」而缺少「深度连接」。E2 情感投入低说明他们在任何一段关系里都不会把自己完全交出去，因为那样太可怕了。所以 WOC! 有一百个朋友，但半夜失眠时他不会打电话给任何一个，因为「这算什么事啊麻烦别人」。\n\n爱情里 WOC! 需要的是一个「永远愿意听他大惊小怪并且真的被带动」的人。如果对方是冷静派（比如 THIN-K 或 CTRL），WOC! 会觉得自己在独角戏。WOC! 和 JOKE-R 是好搭档，因为一个输出内容一个提供笑声，永远有话说。\n\n给 WOC! 的建议：尝试在一天里找 10 分钟「安静时间」——不发朋友圈，不聊天，不刷手机，就坐着感受自己的情绪。你会发现你有很多情绪其实不需要向外喊，只需要自己承认一下。你承认了，它就消化了一半。慢慢你会学会区分哪些情绪值得大惊小怪，哪些情绪其实只需要你陪自己三分钟。',
    deepAnalysisEN:
      "WOC! is the friend whose messages always start with 'OMG,' 'you will NOT believe this,' and 'STOP what are you doing right now.' You brace for disaster. You tap in. It's that they discovered their new non-stick pan actually works. This is not fake drama. This is WOC!'s emotional processing mechanism: they need every feeling amplified to a visible decibel because only the seen ones get processed.\n\nDimensionally WOC! is a fascinating mix: the entire social cluster is high (So1, So2, So3 all H) — they take initiative, they merge interpersonally, they say exactly what's in their head at full volume. But the entire emotion cluster is low (E1, E2, E3 all L) — meaning the external theatrics don't match deep emotional investment. Their 'drama' is external ventilation rather than internal bonding. This is why WOC!'s friends often notice 'they scream about everything but none of it really sticks with them.' Exactly.\n\nLow self-confidence (S1), low life-meaning (A3), low decision speed (Ac2) — together these build WOC!'s 'anchorless' baseline. They rely on external reactions to confirm their existence: 'I said a thing, you reacted, I exist; I said a thing, you ignored, I'm anxious.' WOC! posts to social media more than any other archetype, and the like count is their mood thermometer.\n\nA typical WOC! day: wakes up, checks likes and comments from the night before. Posts a good morning story. Sees a cat on the subway, story. Tells coworker about the cat with exaggerated gestures. New dish at lunch: nine-grid photo post. Coworker got a haircut: full-caps group chat hype. Rainbow on the way home: another story. Watching a show in the evening: a post every five minutes. Bedtime: final story + one more like-count check.\n\nThe hidden pain: WOC! is actually lonely — not for lack of friends, but because their social life is performance-level busy and depth-connection light. Low emotional investment means WOC! never fully hands themselves over to anyone, because that would be terrifying. So WOC! has 100 friends and at 3 a.m. when they can't sleep, they call none of them, because 'this isn't a big enough deal to bother anyone with.' The irony is exquisite.\n\nIn love WOC! needs someone who is willing to 'be dragged into the drama and actually ride it.' A cool-headed THIN-K or CTRL will make WOC! feel like they're doing a monologue. WOC! and JOKE-R are excellent co-stars because one produces content and the other produces laughter, and there's never dead air.\n\nGrowth prescription: find 10 quiet minutes a day. No posts. No messages. No scrolling. Just sitting and acknowledging your feelings internally. You will discover that many feelings don't actually need an external audience — they just need you to acknowledge them. Once acknowledged, half of them digest on their own. Over time you'll learn to tell which feelings deserve the full theatrical treatment and which ones just need you to sit with yourself for three minutes.",
    strengthsCN: [
      '情绪表达直接，从不压抑',
      '能把无聊日常变成话题',
      '朋友圈活跃，信息灵通',
      '天然的气氛带动者',
    ],
    strengthsEN: [
      'Expresses feelings immediately, never represses.',
      'Turns mundane life into shareable content.',
      'Plugged into social life, always in the know.',
      'Natural atmosphere-driver.',
    ],
    weaknessesCN: [
      '依赖外界反应确认自我，缺乏内在锚点',
      '表面热闹但深度连接少',
      '容易消耗朋友耐心',
      '真正的情绪需求反而说不出口',
    ],
    weaknessesEN: [
      'Needs external reactions to feel real; weak internal anchor.',
      'Theatrical friendships, shallow bonds.',
      'Burns through friend patience.',
      'Paradoxically can\'t voice actual deep needs.',
    ],
    famousExamplesCN: ['papi 酱', '《甄嬛传》里的华妃', '大部分网红主播'],
    famousExamplesEN: ['Lucille Bluth (Arrested Development)', 'Moira Rose (Schitt\'s Creek)', 'Regina George (Mean Girls)'],
    compatibleTypes: ['JOKE-R', 'SEXY', 'OJBK'],
    conflictTypes: ['THIN-K', 'MONK', 'DEAD'],
    recommendations: {
      movies: {
        zh: ['《瞬息全宇宙》', '《甄嬛传》', '《布达佩斯大饭店》'],
        en: ['Bridesmaids', 'Crazy Ex-Girlfriend', 'The Devil Wears Prada'],
      },
      songs: {
        zh: ['《姐就是女王》- 刘婷', '《野蛮女友》- 飞轮海', '《Dont Start Now》- Dua Lipa'],
        en: ['Drama — Aespa', '7 rings — Ariana Grande', 'Super Bass — Nicki Minaj'],
      },
      activities: {
        zh: ['约朋友吃一顿大餐然后拍九宫格', '报一个心理咨询', '写日记代替朋友圈'],
        en: ['Big dinner with friends + the photoshoot', 'Actually see a therapist', 'Swap the feed for a paper journal'],
      },
      gifts: {
        zh: ['拍立得相机', '一束花', '夸张的复古首饰'],
        en: ['An instant camera', 'A bouquet', 'Loud statement jewelry'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 大惊小怪人格解读 | WOC! 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI WOC! Personality - Complete Guide to The Drama Alarm',
      metaDescCN: 'SBTI WOC! 大惊小怪人格全面解析：情绪外放型社交达人的 15 维度特征、情感配对、内在孤独与成长课题。',
      metaDescEN: 'Complete SBTI WOC! personality guide: The Drama Alarm archetype. External amplification, hidden loneliness, and the 10-minute practice that changes everything.',
      keywordsCN: ['sbti WOC!', 'sbti WOC 意思', 'sbti 大惊小怪', 'sbti WOC! 配对', 'sbti WOC 性格', 'sbti 戏剧化人格'],
      keywordsEN: ['sbti WOC', 'sbti WOC meaning', 'sbti drama alarm', 'sbti WOC compatibility', 'sbti WOC personality', 'sbti dramatic type'],
    },
  },

  // ==========================================================================
  // 12. THAN-K — 谢谢型人格
  // ==========================================================================
  {
    code: 'THAN-K',
    slug: 'than-k',
    nameCN: '谢谢型',
    nameEN: 'The Grateful',
    emoji: '🙏',
    color: '#22D3EE',
    pattern: 'MHM-HHL-HHM-MMM-MLM',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'H',
      S3_coreValue: 'M',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'L',
      A1_worldview: 'H',
      A2_flexibility: 'H',
      A3_meaning: 'M',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'M',
      So1_socialInit: 'M',
      So2_interpersonal: 'L',
      So3_expression: 'M',
    }),
    tagline: { zh: '谢谢，真的谢谢', en: 'No really, thank you' },
    oneLinerCN: '对所有善意都会回一句真诚的谢谢，但偶尔也会把这句谢谢用成心理防御。',
    oneLinerEN: 'Real gratitude in real sentences — occasionally weaponized as polite distance.',
    deepAnalysisCN:
      'THAN-K 谢谢型是 SBTI 里最温暖但也最容易被误读的类型之一。他们对世界的默认反应是感恩——服务员送餐会说谢谢，同事递笔会说谢谢，陌生人让路会说谢谢，连被踩到脚都会先下意识说谢谢（然后反应过来）。这种感恩不是装的，是他们从小被教育或者因为某些人生经历真的觉得「被善意对待是一种幸运」。他们看世界时自带一层「还好还有人好」的滤镜，这让他们比大多数类型更容易感到幸福。\n\n从维度看 THAN-K 是个很精致的组合：自我清晰度 S2 高，情感三维度里依恋 E1 高、投入 E2 高、但边界 E3 低——说明他们是那种「知道自己要什么但又会为别人让路」的人。世界观 A1 高（相信人性），灵活度 A2 高（不死板），这让他们在人际场合里显得特别「舒服」。但人生意义感 A3 只有中等，人际边界感 So2 低——意味着 THAN-K 的生活意义很大程度来自「被他人温柔对待 + 能温柔对待他人」的循环，一旦这个循环出问题他们会有点失重。\n\n典型 THAN-K 的一天：早上被快递员叫醒，真诚地说「谢谢您这么早」；上班路上给一个老人让座，老人没说话她也会心里感谢自己今天做了件小事；到公司遇到同事递咖啡，感激地说「你真是太好了」；中午朋友请吃饭，吃完坚持要回请；下午被领导表扬，红着脸说「这都是大家的功劳」；下班路上买了个面包，对店员说「谢谢你今天也辛苦了」；晚上给爸妈打电话，感谢他们抚养自己；睡前在日记本里写今天值得感恩的三件事。听起来像鸡汤但 THAN-K 是真的这样活着。\n\nTHAN-K 的隐痛有两个。一是他们的感恩有时候是一种礼貌性的情感边界——他们用「谢谢」来替代「我其实很需要你」「我其实很在乎你」这种更深的情感表达，因为说「谢谢」比说「我爱你」更安全。这让 THAN-K 的亲密关系经常缺一点温度——不是他们不深情，是他们的深情被「客气」稀释了。二是 E3 边界低 + So2 低意味着他们很难拒绝——因为拒绝别人会让他们觉得「辜负了对方的好意」，所以他们会强迫自己接受不想接受的事情，然后事后偷偷委屈。\n\n爱情里 THAN-K 是「克制的深情家」——他们会为对方做很多事情，但不会直接说「我爱你」；他们会在乎每一个纪念日，但不会要求对方也必须在乎；他们会默默付出，但说出来时永远用「谢谢你让我有机会付出」的句式。听起来很累，其实是 THAN-K 的自我保护。他们害怕如果把感恩换成索取，对方就会离开。\n\n给 THAN-K 的建议：允许自己偶尔说「我需要」而不是「谢谢」。你不必为被爱感恩，你值得被爱是默认设置，不是奖赏。试着用一次「我希望你陪我」替代「谢谢你陪我」；用一次「我很难过」替代「谢谢你听我说」。这些话说出口可能会让你浑身不自在，但它们会让你的亲密关系终于进入「真正的深度」。',
    deepAnalysisEN:
      "THAN-K is one of the warmest archetypes in SBTI and also one of the most mis-read. Their default reaction to the world is gratitude: the barista gets a thank-you, the coworker who passes a pen gets a thank-you, the stranger who holds the door gets a thank-you, even the person who steps on their foot gets a reflex 'thank you' before their brain catches up. The gratitude is real. It comes from either upbringing or life experiences that gave them a 'I got lucky that anyone was ever kind to me' default lens. That lens makes THAN-K generally happier than most archetypes.\n\nDimensionally THAN-K is delicate: high self-clarity (S2), high attachment (E1), high emotional investment (E2), but low boundary (E3) — so they know what they want and will still give it up for others. High worldview (A1, trust), high flexibility (A2, accommodating), which makes them feel like 'the comfortable one' to be around. But life-meaning (A3) is only medium, and interpersonal boundary (So2) is low — meaning THAN-K's sense of meaning cycles through 'receive kindness, return kindness,' and if that cycle gets disrupted, they feel existentially unmoored.\n\nA typical THAN-K day: wakes to a delivery knock, says 'thank you for coming so early, really.' Gives up a seat on the train, thanks the universe internally for letting them do one small good thing. Coworker hands them coffee: 'you're the best, seriously.' Lunch with a friend: insists on paying next time. Compliment from the boss: blushes, says 'it was a team effort.' Evening bread run: 'thank you for your work today.' Calls parents, thanks them. Before bed, journals three things they're grateful for. Sounds like a wellness post. THAN-K actually lives this way.\n\nTwo hidden pains. One: gratitude can be used as a polite emotional fence. 'Thank you' is often a safer substitution for 'I really need you,' 'I really care about you,' 'I love you.' This dilutes THAN-K's intimate relationships — not because the devotion isn't there, but because the devotion is diluted by politeness. Two: low boundary plus low interpersonal fence means THAN-K cannot refuse easily — refusing feels like 'betraying someone's goodwill.' They accept things they don't want and quietly resent it later.\n\nIn love THAN-K is the restrained devoted type — does a hundred things for the partner without ever saying 'I love you' plainly; remembers every anniversary without demanding reciprocation; offers endless care, always framed as 'thank you for giving me the chance to care.' It sounds exhausting. It is self-protection. THAN-K is afraid that if gratitude turns into demand, the other person will leave.\n\nGrowth prescription: replace 'thank you' with 'I need' sometimes. You don't have to be grateful for being loved. Being loved is your default setting, not a prize. Try saying 'I want you to stay' instead of 'thank you for staying.' Try saying 'I'm really sad' instead of 'thank you for listening.' These sentences will feel uncomfortable the first time. They are also the door into the depth your relationships have been waiting for.",
    strengthsCN: [
      '心怀感恩，主观幸福感较高',
      '能看见别人的好意，不容易被负面情绪裹挟',
      '情感深度和专注度双高',
      '情绪稳定，是团队里的和缓剂',
    ],
    strengthsEN: [
      'Sincere gratitude baseline — high subjective happiness.',
      'Notices kindness others miss; resistant to negativity spirals.',
      'Deep and focused emotional commitment.',
      'Calming presence in teams.',
    ],
    weaknessesCN: [
      '用「谢谢」代替真实的情感表达',
      '很难拒绝，容易委屈自己',
      '亲密关系缺乏热度和直接性',
      '意义感依赖他人的善意循环',
    ],
    weaknessesEN: [
      'Uses "thank you" as emotional camouflage.',
      'Can\'t refuse; ends up quietly resenting own choices.',
      'Intimate relationships lack heat and directness.',
      'Meaning depends on a kindness loop with others.',
    ],
    famousExamplesCN: ['杨丽萍', '《小森林》里的市子', '任何一位朴实的幼师'],
    famousExamplesEN: ['Amélie Poulain', 'Kumail Nanjiani (public persona)', 'Mister Rogers'],
    compatibleTypes: ['MUM', 'LOVE-R', 'OJBK'],
    conflictTypes: ['FAKE', 'ATM-er', 'SHIT'],
    recommendations: {
      movies: {
        zh: ['《小森林》', '《奇迹男孩》', '《阿甘正传》'],
        en: ['Amélie', 'The Secret Life of Walter Mitty', "About Time"],
      },
      songs: {
        zh: ['《感恩的心》', '《夜空中最亮的星》', '《稻香》'],
        en: ['Thank U, Next — Ariana Grande', 'Wonderful World — Sam Cooke', 'Three Little Birds — Bob Marley'],
      },
      activities: {
        zh: ['手写一封感谢信', '认真和家人吃一顿饭', '整理旧照片写下回忆'],
        en: ['Write a real thank-you letter to someone', 'Have a slow dinner with family', 'Curate old photos with captions'],
      },
      gifts: {
        zh: ['精美的信纸和钢笔', '手工陶瓷杯', '一本空白日记'],
        en: ['Fine stationery and a pen', 'A handmade ceramic mug', 'A blank journal'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 谢谢型人格解读 | THAN-K 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI THAN-K Personality - Complete Guide to The Grateful',
      metaDescCN: 'SBTI THAN-K 谢谢型人格全面解析：感恩型温暖人格的 15 维度特征、情感配对与成长建议。',
      metaDescEN: 'Complete SBTI THAN-K personality guide: The Grateful archetype. Real gratitude, hidden fences, and the growth move from "thank you" to "I need."',
      keywordsCN: ['sbti THAN-K', 'sbti THAN-K 意思', 'sbti 谢谢型', 'sbti THAN-K 配对', 'sbti THAN-K 性格', 'sbti 感恩型人格'],
      keywordsEN: ['sbti THAN-K', 'sbti THAN-K meaning', 'sbti grateful', 'sbti THAN-K compatibility', 'sbti THAN-K personality', 'sbti gratitude type'],
    },
  },

  // ==========================================================================
  // 13. OH-NO — 糟糕预警
  // ==========================================================================
  {
    code: 'OH-NO',
    slug: 'oh-no',
    nameCN: '糟糕预警',
    nameEN: 'The Catastrophizer',
    emoji: '😰',
    color: '#64748B',
    pattern: 'LLM-LLL-LML-LLL-MLM',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'L',
      S3_coreValue: 'M',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'L',
      A1_worldview: 'L',
      A2_flexibility: 'M',
      A3_meaning: 'L',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'M',
      So2_interpersonal: 'L',
      So3_expression: 'M',
    }),
    tagline: { zh: '完了，这下完了', en: 'We\'re cooked' },
    oneLinerCN: '还没开始就已经在想最坏结果，是所有项目的「预言家 BUG」。',
    oneLinerEN: 'Already rehearsing the worst-case version before the meeting starts — the team\'s in-house bug oracle.',
    deepAnalysisCN:
      'OH-NO 糟糕预警是 SBTI 里最容易被误诊为「焦虑症」的类型，但他们不是病，他们只是把「风险预测」这个功能点过头了。他们脑子里 24 小时在跑一个「万一...怎么办」的模拟器：万一这个项目挂了怎么办？万一对方不回消息是因为我说错话了怎么办？万一明天地铁晚点我迟到领导生气怎么办？万一我老了没人养怎么办？万一...怎么办？这个循环让他们在别人看起来很佛系的场合里也显得格外紧张。\n\n从维度看 OH-NO 是一个「风险雷达全开的怀疑论者」：自信 S1 低，自我清晰度 S2 低，世界观 A1 低（偏防御），动机导向 Ac1 低（避险型），决策风格 Ac2 低（慢），执行力 Ac3 低（拖延），意义感 A3 低（虚无）。这些叠加起来构成了一个非常典型的「想很多做很少」的人——不是他们懒，是他们被自己的预警系统拖住了。\n\n但重要的是：OH-NO 的预警不是空穴来风。他们很多的担忧确实会发生，只是发生的概率被他们自己放大了 10 倍。他们是团队里最不会漏掉边缘情况的人，是你带他做产品时那个会指出「用户可能不小心点了这个按钮两次」的人，是你带他去旅行时那个记得带伞、带药、带备用电池的人。他们让所有计划变得更周全，代价是他们自己永远处在一种轻度焦虑里。\n\n典型 OH-NO 的一天：早上醒来第一件事想「今天会不会出事」；上班路上想「万一地铁坏了我会不会迟到」；到公司想「昨天那封邮件领导没回是不是有问题」；开会时脑子里跑着三个最坏情景；午餐点菜前纠结「这家卫生吗」；下午被分配新任务立刻想「这个我肯定搞不定」；下班路上遇到下雨想「带的伞够不够大」；晚上看剧时突然想到「妈妈最近体检报告有一项异常我得搜一下」；凌晨 1 点睡不着因为在想「下周那个汇报我还没准备」。\n\nOH-NO 的隐痛是：他们很少真正享受当下，因为当下总是被未来的担忧污染。即使是快乐的时刻，他们也会突然想「这么开心，等下是不是要出事了」。这种「被快乐吓到」的状态是 OH-NO 的独有体验。\n\n爱情里 OH-NO 需要的是一个「稳定可预测」的伴侣——能按时回消息、能说话算数、能主动解释前因后果、不喜欢玩暧昧不喜欢猜心思。一个稳定的 BOSS 或 CTRL 可以让 OH-NO 安心，一个情绪波动的 SEXY 或 WOC! 会让 OH-NO 一直处在警戒状态。\n\n给 OH-NO 的建议：承认你的预警系统是一种能力，不是一个故障——然后，学会给它设置「营业时间」。比如每天早上给自己 15 分钟专门思考最坏情景，写下来，然后合上本子，告诉大脑「今天的担忧工作完成了」。其他时间如果担忧冒出来，就告诉自己「这个要等明天早上 15 分钟时间处理」。你会发现很多担忧第二天再想时已经自动消失了。这个练习不会让你变成乐天派，但它能让你从「全天候警报」变成「定时警报」，生活质量会提升非常多。',
    deepAnalysisEN:
      "OH-NO is the archetype most likely to be mis-labeled as 'anxious.' They are not a disorder. They just cranked the risk-prediction dial way past its useful range. Their brain runs a 24/7 'what if' simulator: what if this project fails, what if they didn't reply because I said something wrong, what if the train is late and the boss is pissed, what if I'm old and nobody takes care of me, what if, what if, what if. The loop makes them look uniquely tense even in rooms everyone else finds chill.\n\nDimensionally OH-NO is a risk-radar-maxed skeptic. Low self-confidence, low self-clarity, defensive worldview, low motivation (aversion-driven), low decision speed, low execution, low meaning. Stacked together: a classic 'thinks too much, does too little' — not from laziness, from being dragged down by their own warning system.\n\nImportant caveat: OH-NO's warnings are not nonsense. A real portion of their worries will actually happen — just at 1/10 the frequency their brain insists on. They are the teammate who catches the edge case everyone else misses. They are the travel buddy who brings the umbrella, the meds, and the spare battery. They make every plan more robust, at the personal cost of existing in perpetual low-grade dread.\n\nA typical OH-NO day: wakes up, first thought, 'something bad might happen today.' On the train, 'what if this breaks down.' At the desk, 'the boss didn't reply to yesterday's email, is something wrong.' In a meeting, three worst-case scenarios playing in the background. Picks lunch while wondering 'is this clean enough.' New task assigned, immediately, 'I can't handle this.' Rain on the way home, 'is my umbrella big enough.' At night during a show, 'mom's checkup flagged one value, I should google it.' 1 a.m., still awake, running through next week's presentation that isn't ready yet.\n\nOH-NO's hidden pain: they rarely fully enjoy the present, because the present is constantly contaminated by future worry. Even in happy moments, there's a sudden 'this is going well, which means something bad is about to happen' jolt. Being ambushed by your own happiness is a very specific OH-NO experience.\n\nIn love OH-NO needs a stable, predictable partner — one who replies on time, keeps their word, over-explains context, doesn't play mystery games. A steady BOSS or CTRL can soothe OH-NO. A volatile SEXY or WOC! keeps OH-NO in permanent red alert.\n\nGrowth prescription: admit that your warning system is a capability, not a glitch. Then, give it business hours. Each morning, set a 15-minute 'worst case' window. Write down every worry, close the notebook, tell your brain 'today's worry work is done.' When worries spawn later, tell yourself 'that's for tomorrow's 15 minutes.' You'll find a big chunk of worries evaporate overnight. This won't turn you into an optimist, but it will shift you from '24/7 alert' to 'scheduled alert,' and the quality-of-life delta is enormous.",
    strengthsCN: [
      '风险意识超前，团队的「防坑雷达」',
      '对细节极其敏感，很少漏掉边缘情况',
      '不容易被忽悠或冲动消费',
      '危机时刻反而能冷静应对',
    ],
    strengthsEN: [
      'Elite risk radar; the team\'s bug oracle.',
      'Razor-sharp on details; rarely misses edge cases.',
      'Immune to hype and impulse buying.',
      'Oddly calm when the actual crisis hits.',
    ],
    weaknessesCN: [
      '长期处于轻度焦虑中，身心负担大',
      '错过很多快乐的当下',
      '决策慢，行动力弱',
      '亲密关系里容易拉低对方能量',
    ],
    weaknessesEN: [
      'Chronic low-grade dread exhausts body and mind.',
      'Misses too many present-tense joys.',
      'Slow decisions, weak action.',
      'Can drain a partner\'s energy in long relationships.',
    ],
    famousExamplesCN: ['《头脑特工队》里的恐惧', '许多喜剧片里的倒霉蛋配角', '所有深夜搜索症状的人'],
    famousExamplesEN: ['Fear from Inside Out', 'Neville Longbottom (early Harry Potter)', 'Every WebMD user'],
    compatibleTypes: ['MUM', 'CTRL', 'BOSS'],
    conflictTypes: ['GOGO', 'WOC!', 'FUCK'],
    recommendations: {
      movies: {
        zh: ['《头脑特工队》', '《忧愁河上金桥》', '《海边的曼彻斯特》'],
        en: ['Inside Out', "What About Bob?", 'Lost in Translation'],
      },
      songs: {
        zh: ['《不能说的秘密》', '《一个人想着一个人》', '《孤独的总和》'],
        en: ['The Sound of Silence — Simon & Garfunkel', 'Mad World — Gary Jules', 'Breathe Me — Sia'],
      },
      activities: {
        zh: ['每天 15 分钟焦虑时间', '学正念冥想', '写担忧日记'],
        en: ['15-minute daily worry window', 'Guided mindfulness meditation', 'Keep a dedicated worry journal'],
      },
      gifts: {
        zh: ['压力球', '焦虑日记本', '暖手宝'],
        en: ['A stress ball', 'An anxiety journal', 'A weighted blanket'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 糟糕预警人格解读 | OH-NO 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI OH-NO Personality - Complete Guide to The Catastrophizer',
      metaDescCN: 'SBTI OH-NO 糟糕预警人格全面解析：高敏感风险型人格的 15 维度特征、情感配对、焦虑管理与成长课题。',
      metaDescEN: 'Complete SBTI OH-NO personality guide: The Catastrophizer archetype. High-sensitivity risk radar, chronic dread, and the 15-minute trick that quiets the loop.',
      keywordsCN: ['sbti OH-NO', 'sbti OH-NO 意思', 'sbti 糟糕预警', 'sbti OH-NO 配对', 'sbti OH-NO 性格', 'sbti 焦虑型人格'],
      keywordsEN: ['sbti OH-NO', 'sbti OH-NO meaning', 'sbti catastrophizer', 'sbti OH-NO compatibility', 'sbti OH-NO personality', 'sbti anxious type'],
    },
  },

  // ==========================================================================
  // 14. ATM-er — 提款机
  // ==========================================================================
  {
    code: 'ATM-er',
    slug: 'atm-er',
    nameCN: '提款机',
    nameEN: 'The Provider',
    emoji: '💸',
    color: '#059669',
    pattern: 'MLL-HHL-MLL-HMH-HLL',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'L',
      S3_coreValue: 'L',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'L',
      A1_worldview: 'M',
      A2_flexibility: 'L',
      A3_meaning: 'L',
      Ac1_motivation: 'H',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'H',
      So1_socialInit: 'H',
      So2_interpersonal: 'L',
      So3_expression: 'L',
    }),
    tagline: { zh: '钱能解决的都不是事', en: 'If money fixes it, it\'s not a problem' },
    oneLinerCN: '用物质承担所有情感义务，从不说爱，但每次账单都是告白。',
    oneLinerEN: 'Never says "I love you," always pays the check — bills as love letters.',
    deepAnalysisCN:
      'ATM-er 提款机是那种「嘴上说不出爱，但行动上全是爱」的类型。他们相信「钱能办的事就不要用嘴说」，所以他们会为家人买房、为朋友请客、为爱人花钱、为陌生人打赏——但从不说一句「我关心你」。这不是冷漠，这是他们被从小教育过的「男人/女人要靠本事说话」的变种：他们用物质承担情感义务，因为物质是可量化的、可交付的、不会尴尬的。\n\n从维度看 ATM-er 的画像很独特：情感维度里依恋和投入都是 H，边界是 L（意味着对家人朋友情感上依赖深但容易被拖累），但表达真实度 So3 L 和人际边界感 So2 L。这个组合说明 ATM-er 其实情感很深，但完全不擅长用言语表达——他们把所有的爱都转化成了「行动 + 金钱」的表达形式。执行力 Ac3 H 和动机 Ac1 H 说明他们非常愿意为爱的人付出实际行动，但意义感 A3 L 和世界观 A1 中等说明他们内心其实没搞清「我为什么这么拼」，只是本能地觉得「我就该这样」。\n\n典型 ATM-er 的一天：早上 7 点起床，先看一眼家庭群里爸妈有没有问候（有就点赞没就转账 500 作为「今天的孝心」）；上班路上处理昨晚的几个报价；到公司立刻投入工作，午饭叫外卖因为「省时间」；下午开电话会议谈一个客户；下班前给老婆/老公发个红包「今晚你点外卖」；晚上回家大概率伴侣已经吃过或者不在家，他一个人吃剩饭；给老家爸妈打个电话问有没有缺什么，有就转账；睡前还要回几条工作消息；12 点躺床上想「我今天有没有说过我爱你」想不起来。\n\nATM-er 的隐痛有两层。表层：他们的付出经常被解读为「只知道给钱」，伴侣会说「我要的是陪伴不是钱」，家人会说「你回家看看我比转账重要」，但 ATM-er 听到这些只会更努力地赚钱——因为他们的大脑对「陪伴」这个概念的执行路径已经坏了，只有「赚钱 → 给钱」这条路是通的。深层：ATM-er 其实非常爱他们的家人和伴侣，但他们不知道除了物质还能给什么。他们小时候可能没被好好教过如何表达情感，所以长大后用金钱替代了所有的「我爱你」。当他们的伴侣真的离开时，ATM-er 会在某个深夜突然崩溃，然后继续第二天赚钱，因为他们不知道还能做什么。\n\n爱情里 ATM-er 需要的不是索取更少的人，而是「愿意陪他学习用非物质方式表达爱」的人。一个温柔的 MUM 或 THAN-K 可能会告诉他「今天我不要你的红包，我要你陪我吃顿饭」，一次两次他会烦，但第十次他会开始理解。\n\n给 ATM-er 的建议：学一句话——「我今天很想你」。就这一句，别加「所以我给你转了个红包」。你会发现说出来的那一秒是你人生中最羞耻的时刻之一，但紧接着是一种你从未体验过的连接感。那种连接感是你一直在用钱寻找但永远找不到的东西。原来，它根本不在钱包里。',
    deepAnalysisEN:
      "ATM-er is the 'can't say I love you, but the receipt proves it' archetype. They believe 'if money can solve it, don't waste words on it.' So they buy houses for family, pick up every dinner check, fund a partner's business, tip strangers generously — and never say 'I care about you.' This isn't coldness. It's a specific translation of the old 'a real man/woman provides' script: they settle every emotional debt with material output, because material output is quantifiable, deliverable, and safely non-awkward.\n\nDimensionally ATM-er is distinctive: high emotional attachment and investment, low boundary (translation: they are deeply attached to family/loved ones but get strip-mined), combined with low expressive authenticity (So3) and low interpersonal fence (So2). The combo means ATM-er actually feels deeply but has zero fluency in verbal expression — every 'I love you' has been transcoded into 'here's money / let me handle this.' High execution (Ac3) and high motivation (Ac1) mean they are willing to act for loved ones. Low life-meaning (A3) and medium worldview (A1) mean they never figured out why they are grinding — it just feels like the only way.\n\nA typical ATM-er day: up at 7, check the family group chat, 'thumbs up' if parents posted, quietly transfer 500 if they didn't (as today's filial-duty slot). Commute handling last night's quotes. At the desk, full throttle. Takeout lunch to 'save time.' Afternoon client call. Before clocking out, sends a small red envelope to their partner: 'order dinner on me tonight.' Gets home — partner already ate or isn't there. Eats leftovers alone. Calls parents, 'do you need anything,' sends money if yes. More work messages at midnight. In bed at 12, tries to remember if they said 'I love you' to anyone today. Can't recall.\n\nATM-er's pain has two layers. Surface: their output gets misread as 'you only know how to throw money at things.' Partners say 'I wanted your presence, not your wallet.' Family says 'coming home beats a transfer.' ATM-er hears this and works harder — because their brain's 'presence' execution path is broken, and only the 'earn → give' path is operational. Deeper: ATM-er genuinely loves their people and has no vocabulary beyond material. Childhood probably didn't teach them emotional expression, so as adults they use money as a placeholder for 'I love you.' When a partner leaves, ATM-er implodes once at 3 a.m. and then goes back to work the next day, because working is the only thing they know how to do with feelings.\n\nIn love ATM-er doesn't need someone who takes less. They need someone who is willing to co-learn non-material expression with them. A warm MUM or THAN-K type who will say 'today I don't want your red envelope, I want you at the table with me' — the first time it'll annoy ATM-er, the tenth time something will click.\n\nGrowth prescription: practice one sentence. 'I missed you today.' Just that. Do NOT append 'so here's 500.' The second after it leaves your mouth will be one of the most embarrassing seconds of your life. Then comes a kind of connection you have never felt before. That connection is the thing you have been trying to buy with all that money. It turns out, it was never in the wallet.",
    strengthsCN: [
      '执行力强，说干就干',
      '对家人朋友极度慷慨',
      '关键时刻能真的兜底',
      '抗压能力强，危机时不掉线',
    ],
    strengthsEN: [
      'Strong execution; words to action fast.',
      'Extremely generous with loved ones.',
      'Actually delivers when it matters.',
      'High stress tolerance in crisis mode.',
    ],
    weaknessesCN: [
      '情感表达极其匮乏，用钱替代一切',
      '长期被「供养角色」困住',
      '伴侣容易感到陪伴缺失',
      '不知道除了赚钱还能为爱做什么',
    ],
    weaknessesEN: [
      'Near-zero emotional vocabulary; money is the only dialect.',
      'Trapped in the provider role.',
      'Partners chronically feel under-accompanied.',
      'Doesn\'t know what love looks like beyond earning.',
    ],
    famousExamplesCN: ['大部分上一代中年男性', '《蜗居》里的宋思明', '许多创一代老板'],
    famousExamplesEN: ['Walter White (Breaking Bad, early seasons)', 'Logan Roy (Succession)', 'Tony Stark (pre-character-arc)'],
    compatibleTypes: ['MUM', 'THAN-K', 'OJBK'],
    conflictTypes: ['LOVE-R', 'MALO', 'FUCK'],
    recommendations: {
      movies: {
        zh: ['《蜗居》', '《教父》', '《海上钢琴师》'],
        en: ['Breaking Bad', 'Manchester by the Sea', 'Nightcrawler'],
      },
      songs: {
        zh: ['《父亲》- 筷子兄弟', '《海阔天空》', '《男儿当自强》'],
        en: ['Father and Son — Cat Stevens', 'Gold Digger — Kanye West', 'Money — Pink Floyd'],
      },
      activities: {
        zh: ['一次不带钱包的约会', '陪父母吃一顿不赶时间的饭', '学写情书'],
        en: ['A wallet-free date', 'A slow dinner with parents', 'Write an actual love letter'],
      },
      gifts: {
        zh: ['一张空白的卡片让他写', '亲手做一顿饭', '一次无手机的旅行'],
        en: ['A blank card they have to fill in', 'A home-cooked meal', 'A phone-free weekend trip'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 提款机人格解读 | ATM-er 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI ATM-er Personality - Complete Guide to The Provider',
      metaDescCN: 'SBTI ATM-er 提款机人格全面解析：用物质承担情感的供养型人格 15 维度特征、情感配对与成长困境。',
      metaDescEN: 'Complete SBTI ATM-er personality guide: The Provider archetype. Love translated into payments, the cost of muteness, and the one sentence that rewires them.',
      keywordsCN: ['sbti ATM-er', 'sbti ATM 意思', 'sbti 提款机', 'sbti ATM-er 配对', 'sbti ATM 性格', 'sbti 供养型人格'],
      keywordsEN: ['sbti ATM-er', 'sbti ATM-er meaning', 'sbti provider', 'sbti ATM-er compatibility', 'sbti ATM personality', 'sbti provider type'],
    },
  },

  // ==========================================================================
  // 15. Dior-s — 矫情王
  // ==========================================================================
  {
    code: 'Dior-s',
    slug: 'dior-s',
    nameCN: '矫情王',
    nameEN: 'The Precious',
    emoji: '💅',
    color: '#D946EF',
    pattern: 'HMM-HHL-HLL-MLM-HMH',
    dimensionScores: t({
      S1_selfConfidence: 'H',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'L',
      A1_worldview: 'H',
      A2_flexibility: 'L',
      A3_meaning: 'L',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'M',
      So3_expression: 'H',
    }),
    tagline: { zh: '我这种精致的灵魂不该被凡人理解', en: 'My delicate soul wasn\'t made for the commonfolk' },
    oneLinerCN: '生活里每件小事都有仪式感要求，点杯咖啡都要讲究温度、角度、杯型。',
    oneLinerEN: 'Every mundane detail demands a ritual — even ordering coffee is a performance with stage directions.',
    deepAnalysisCN:
      'Dior-s 矫情王是 SBTI 里最容易被吐槽但也最有趣的一类。他们对生活有一种极致的要求感：咖啡要精品豆手冲、床品要 1000 支纯棉、听歌要黑胶唱片、出门要四套搭配备选、朋友圈发一张图要修半小时、餐厅必须有良好的灯光和合适的背景音乐。你可以说他们矫情，但你不得不承认，他们是少数还在认真「生活」而不只是「活着」的人。\n\n从维度看 Dior-s 是个有趣的组合：自信 S1 高，世界观 A1 高（美好倾向），表达真实 So3 高（想法必须说出来），情感投入 E2 高——这些加起来构成了他们「对生活品质的极致追求」。但灵活度 A2 低（不能接受凑合），意义感 A3 低（不懂为什么活着，只知道要活得美），决策风格 Ac2 低（选个花瓶也能纠结一下午）——这些是他们的「脆弱面」。\n\nDior-s 和 SEXY 的区别在于：SEXY 的魅力是自带的，Dior-s 的魅力是精心策划的。SEXY 素颜也好看，Dior-s 不化妆就觉得自己出不了门。SEXY 吸引人是因为气场，Dior-s 吸引人是因为布景。两者都很美，但 Dior-s 的美需要大量的前期维护成本。\n\n典型 Dior-s 的一天：早上 6 点起床（别人 6 点还在睡），按顺序做晨间流程——喝温水、做皮肤护理、吃优雅的早餐（蛋白质+水果+小撮坚果，拍照发小红书），选今天的衣服（已经根据天气和场合选好的 3 个选项二选一），化妆 45 分钟；出门的第一站是咖啡店（手冲 V60 必须）；到公司被同事注意到穿着，她回一句「啊这件是新买的」；中午自己带便当（不是图省钱，是图健康）；下午选了一家下午茶店发一条动态「生活的仪式感」；下班后去健身房 Pilates（不是跑步，那太粗鲁了）；晚饭自己做，餐具是上次从京都带回来的；睡前按 6 步护肤流程，11 点准时睡觉。\n\nDior-s 的痛点在于：他们追求的「精致」本质上是一种对抗平庸的防御。因为意义感 A3 低，他们的生活其实没有太清晰的大目标——但他们又不愿意像 MALO 那样躺平或者像 OJBK 那样糊涂，于是他们选择「让每一个小时都漂亮」。这种选择消耗巨大，任何一次「不精致」的意外都会让他们烦躁（比如咖啡没做好、朋友没 get 到他们的 outfit、纪念日被忘记）。他们的「精致」不是快乐，是焦虑的另一种表现形式。\n\n爱情里 Dior-s 需要的是一个「欣赏他们的审美但不被他们的要求累垮」的伴侣。最糟糕的搭配是 Dior-s + MALO，一个要生活仪式感一个只想躺着，直接同归于尽。最合适的是 Dior-s + SEXY 或 Dior-s + CTRL——SEXY 能配合他们的审美，CTRL 能用能力兜住他们的要求。\n\n给 Dior-s 的建议：允许自己「丑一天」。不是要你变成邋遢鬼，而是允许你有一天不化妆、不配衣服、不拍照、不讲究——就穿着最舒服的衣服在家瘫着。你会在那一天里重新发现，「不被任何人看」的你也是值得被喜欢的。而且那个你，可能比任何精致版本都更接近你一直想要的宁静。',
    deepAnalysisEN:
      "Dior-s is the most dunked-on archetype in SBTI and also one of the most fascinating. They hold life to an insane production standard: coffee must be single-origin hand-pour, bed linens must be 1000-thread count, music must play on vinyl, five outfits get staged before leaving the house, a single IG photo gets 30 minutes of editing, restaurants must have correct lighting and appropriate background music. You can call them precious. You also have to admit they are among the few people still actively 'living' instead of just 'existing.'\n\nDimensionally Dior-s is high self-confidence (S1), high worldview-toward-beauty (A1), high expressive authenticity (So3), high emotional investment (E2). These produce their 'maximum lifestyle demand' engine. But low flexibility (A2, cannot tolerate rough edges), low life-meaning (A3, no idea what it's all for, just knows it has to look good), and low decision speed (Ac2, can spend an afternoon picking a single vase) expose the underlying fragility.\n\nDior-s vs SEXY: SEXY is magnetic as-is. Dior-s is magnetic by production design. SEXY looks good barefaced. Dior-s won't leave the house without a base. SEXY attracts via aura. Dior-s attracts via staging. Both are beautiful — Dior-s's beauty just has a very high maintenance cost.\n\nA typical Dior-s day: up at 6 (when others are asleep). Strict morning ritual: warm water, skincare, an aesthetic breakfast (protein + fruit + nuts, photographed for social), outfit selection narrowed to two options, 45 minutes of makeup. Starts the day with a V60 pour-over at the chosen cafe. Coworker notices the new piece, 'oh this old thing.' Packs lunch at noon (not for savings, for health). Afternoon tea at an aesthetically approved cafe, another post. Pilates after work (never running, too crude). Home-cooked dinner on the ceramics brought back from Kyoto. Six-step night skincare. Lights out at 11 sharp.\n\nDior-s's pain: the 'refined' is a defense against the perceived banality of life. Because life-meaning is low, there is no huge master goal — but Dior-s refuses to rot like MALO or float like OJBK, so they choose to 'make every hour pretty.' The choice is exhausting. Any 'unrefined' accident throws them off (coffee off, friend didn't notice the outfit, forgotten anniversary). Their refinement is not joy — it is anxiety, just wearing a better outfit.\n\nIn love Dior-s needs someone who appreciates the aesthetic without collapsing under the demands. The worst match is Dior-s + MALO — one needs ritual, the other refuses to get off the couch, mutual destruction. The best matches are Dior-s + SEXY or Dior-s + CTRL: SEXY matches the aesthetic, CTRL has the capability to absorb the demands.\n\nGrowth prescription: allow one 'ugly day.' Not become a slob. Just one day: no makeup, no outfit curation, no photos, no standards. Softest clothes, flat on the couch. In that day you will rediscover that the un-performed, un-photographed version of you is also lovable. That version might even be closer to the inner peace you've been chasing through porcelain and perfume.",
    strengthsCN: [
      '审美在线，生活有质感',
      '对细节有极致要求，做事精良',
      '社交中自带视觉辨识度',
      '情感真诚，不擅伪装',
    ],
    strengthsEN: [
      'Elite aesthetic sense; textured life.',
      'Extreme attention to detail; work is polished.',
      'Visually distinctive social presence.',
      'Emotionally sincere, bad at pretending.',
    ],
    weaknessesCN: [
      '生活维护成本过高，身心易累',
      '意义感缺失，精致是防御而非快乐',
      '无法接受任何「不完美」的意外',
      '容易被外界吐槽「矫情」',
    ],
    weaknessesEN: [
      'High-maintenance life that quietly exhausts them.',
      'Missing meaning; refinement as defense, not joy.',
      'Cannot tolerate any imperfect surprise.',
      'Chronically mocked as "too much."',
    ],
    famousExamplesCN: ['《小时代》里的顾里', '《穿普拉达的女王》的 Emily', '许多生活博主'],
    famousExamplesEN: ['Blair Waldorf (Gossip Girl)', 'Emily from The Devil Wears Prada', 'Most lifestyle influencers'],
    compatibleTypes: ['SEXY', 'CTRL', 'BOSS'],
    conflictTypes: ['MALO', 'SHIT', 'DEAD'],
    recommendations: {
      movies: {
        zh: ['《小时代》', '《了不起的盖茨比》', '《穿普拉达的女王》'],
        en: ['The Great Gatsby', 'Marie Antoinette', 'Phantom Thread'],
      },
      songs: {
        zh: ['《忽然之间》- 莫文蔚', '《小情歌》- 苏打绿', '《慢慢喜欢你》'],
        en: ['Material Girl — Madonna', 'Diamonds — Rihanna', 'Fancy — Iggy Azalea'],
      },
      activities: {
        zh: ['去京都住一周吃怀石料理', '报一个花艺课', '收藏一套手工餐具'],
        en: ['A week of kaiseki in Kyoto', 'Ikebana class', 'Collect a handmade dinnerware set'],
      },
      gifts: {
        zh: ['高端丝绸睡衣', '手工香薰蜡烛', '复古首饰盒'],
        en: ['Luxury silk pyjamas', 'Hand-poured candles', 'An antique jewelry box'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 矫情王人格解读 | Dior-s 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI Dior-s Personality - Complete Guide to The Precious',
      metaDescCN: 'SBTI Dior-s 矫情王人格全面解析：极致精致生活追求者的 15 维度特征、情感配对与成长困境。',
      metaDescEN: 'Complete SBTI Dior-s personality guide: The Precious archetype. Ritual as armor, aesthetic as anxiety, and the ugly-day experiment that sets them free.',
      keywordsCN: ['sbti Dior-s', 'sbti Dior-s 意思', 'sbti 矫情王', 'sbti Dior-s 配对', 'sbti Dior-s 性格', 'sbti 精致人格'],
      keywordsEN: ['sbti Dior-s', 'sbti Dior-s meaning', 'sbti precious', 'sbti Dior-s compatibility', 'sbti Dior-s personality', 'sbti refined type'],
    },
  },

  // ==========================================================================
  // 16. THIN-K — 思考者
  // ==========================================================================
  {
    code: 'THIN-K',
    slug: 'thin-k',
    nameCN: '思考者',
    nameEN: 'The Overthinker',
    emoji: '🤔',
    color: '#6366F1',
    pattern: 'MHM-LML-HMH-MLL-LHM',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'H',
      S3_coreValue: 'M',
      E1_attachment: 'L',
      E2_emotionalInvest: 'M',
      E3_boundary: 'L',
      A1_worldview: 'H',
      A2_flexibility: 'M',
      A3_meaning: 'H',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'L',
      So2_interpersonal: 'H',
      So3_expression: 'M',
    }),
    tagline: { zh: '让我先想五分钟', en: 'Give me five minutes — or five days' },
    oneLinerCN: '脑子里永远有 47 个浏览器标签页同时开着，连点个外卖都能思考人生。',
    oneLinerEN: '47 mental browser tabs open at all times. Ordering takeout becomes a philosophy session.',
    deepAnalysisCN:
      'THIN-K 思考者是 SBTI 里最容易「卡在脑子里」的类型。他们的 15 维度画像里有三个亮点：S2 自我清晰度 H（对自己非常了解），A1 世界观 H（对世界保持好奇），A3 意义感 H（对生活有思考）。但决策风格 Ac2 L 和执行力 Ac3 L 拉垮了整个行动线——这意味着 THIN-K 是那种「想得清楚说得透彻但做得慢」的人。\n\nTHIN-K 的日常画面是：别人决定吃什么只需要 10 秒，THIN-K 需要 10 分钟。他们会思考：我今天的营养是否均衡？这家店的食材来源？这家和另一家的口味风格对比？我真的想吃还是只是饿？吃完会不会后悔？如果后悔我怎么避免？最后，THIN-K 往往点了和昨天一样的东西——因为分析已经耗尽了决策能量。\n\n但 THIN-K 的强项在于：他们能看见别人看不到的层次。一个社会事件，别人看到的是表面的八卦，THIN-K 能分析出背后的结构性原因和历史脉络；一个产品 bug，别人觉得是小问题，THIN-K 能追到系统架构的根源；一段关系，别人觉得只是吵架，THIN-K 能理清双方的依恋模式、童年创伤、沟通风格错配。他们是人类社会的「解释器」。\n\n从社交维度看 THIN-K 很有趣：社交主动 So1 L（不会主动攀谈），但人际边界感 So2 H（反而喜欢深度连接）。这说明 THIN-K 不是社恐，只是挑朋友——他们不会和任何人聊废话，但一旦找到同类，能聊 8 小时不下线。他们的朋友圈很小，但每个都是深度关系。\n\n典型 THIN-K 的一天：早上醒来后先思考「今天要做什么」然后发现答案和昨天一样所以起不来；起床后开始思考「我为什么这么爱思考」；上班路上听播客（通常是哲学、心理学、历史类）；到公司做事慢但深度高；开会时别人发言后他会补充一个更系统的视角（通常是全场最深刻的）；午饭时独自吃，用 30 分钟思考下午的任务优先级但最终决定还是按昨天的顺序；下午做事 + 研究 + 看论文；下班后回家做饭一边做一边听书；晚上读书或者看纪录片；睡前在日记里写下今天的思考；凌晨 1 点才睡着因为脑子停不下来。\n\nTHIN-K 的隐痛是「想太多，做太少」。他们有无数的洞察，但往往不会落地成行动。他们知道应该锻炼，但会花 3 个月研究最佳锻炼方案；他们知道应该表白，但会花 6 个月分析对方的依恋类型。这种「思考替代行动」的习惯让他们在外人眼里显得「聪明但软弱」。而且情感维度里 E1 L（安全感低），导致亲密关系里 THIN-K 容易过度分析对方的一句话「他说『还好』是不是意思其实是不好」，把自己逼疯。\n\n给 THIN-K 的建议：每当你发现自己分析了超过 10 分钟还没行动时，强迫自己用 3-2-1 倒数法逼自己做一件具体的小事（发个消息、走出门、点单、按确认）。这不是要你变成 GOGO 那种莽夫，而是让你知道「行动之后的信息量往往比 10 小时分析更大」。你会发现很多问题其实不是想出来的，是做出来的。',
    deepAnalysisEN:
      "THIN-K is the archetype most likely to get stuck inside their own head. Their 15-dimension profile has three brilliant peaks: high self-clarity (S2 high), high worldview curiosity (A1 high), high life-meaning (A3 high). But low decision speed (Ac2 low) and low execution (Ac3 low) hamstring the action line. Result: THIN-K sees everything clearly, describes it beautifully, and then does it slowly.\n\nThe everyday picture: most people pick a lunch in 10 seconds. THIN-K takes 10 minutes. Is my nutrition balanced today? What's the sourcing on this place? How does this menu compare to the one next door? Do I really want this or am I just hungry? Will I regret it? If yes, how do I prevent that? End state: THIN-K usually orders the same thing as yesterday, because the analysis drained the decision budget.\n\nBut here is THIN-K's superpower: they see layers others miss. A social story: others see drama, THIN-K sees structural causes and historical patterns. A product bug: others see a glitch, THIN-K traces it to an architecture flaw. A fight in a relationship: others see arguing, THIN-K reads attachment styles, childhood patterns, communication mismatch. THIN-K is the interpreter layer of human society.\n\nSocially THIN-K is interesting: low social initiative (So1 low, doesn't start conversations), but high interpersonal closeness (So2 high, craves depth). Not social anxiety — just refuses small talk. Small friend group, each one a high-depth relationship, 8-hour conversations once a connection is found.\n\nA typical THIN-K day: wakes up and immediately thinks 'what do I need to do today,' realizes the answer is yesterday's list, stays in bed. Gets up eventually, thinks 'why do I think so much.' Podcast on the commute (philosophy, psychology, history, the usual suspects). Slow-but-deep at work. In meetings, adds a systems-level framing after others speak (usually the sharpest line in the room). Solo lunch, 30 minutes re-ranking afternoon tasks, ends up doing them in the original order. Evening: cooks while listening to an audiobook. Reads or watches a doc. Journals before bed. Falls asleep at 1 a.m. because the brain won't shut off.\n\nTHIN-K's pain: too much thinking, too little action. Infinite insight, limited execution. Knows they should exercise, spends three months researching the optimal program. Knows they should confess to someone, spends six months analyzing the other person's attachment style. This 'thinking as substitute for doing' habit makes THIN-K look 'smart but inert' from outside. Plus low attachment security (E1 low) means THIN-K over-analyzes every message from a partner ('they said \"it's fine\" — is that actually fine or not?'), torturing themselves in real time.\n\nGrowth prescription: whenever you've been analyzing something for more than 10 minutes without taking any physical action, force yourself to do one small concrete thing (send the text, walk out the door, click confirm, place the order). Not to turn you into a reckless GOGO, but to experience that 'information obtained through action is often 10x richer than information obtained through analysis.' Many questions are not solved by thinking. They are solved by moving.",
    strengthsCN: [
      '洞察力极深，能看到别人看不到的层次',
      '自我认知清晰，了解自己的需求和边界',
      '深度对话能力强，朋友关系质量高',
      '对世界保持好奇，终身学习者',
    ],
    strengthsEN: [
      'Elite insight; sees layers others miss.',
      'Clear self-awareness; knows own needs and edges.',
      'High-quality deep conversation skill; deep friendships.',
      'Curious lifelong learner.',
    ],
    weaknessesCN: [
      '决策极慢，行动力匮乏',
      '容易把思考当作行动的替代品',
      '情感里反复过度分析，内耗严重',
      '社交慢热，错过机会',
    ],
    weaknessesEN: [
      'Decision paralysis; very low execution.',
      'Treats thinking as a substitute for doing.',
      'Over-analyzes in relationships, inner-noise runs hot.',
      'Slow to warm up socially, misses opportunities.',
    ],
    famousExamplesCN: ['蒋勋', '《卧虎藏龙》里的李慕白', '大部分哲学博主'],
    famousExamplesEN: ['Hannah from Girls', 'Adam Driver (his public persona)', 'Every bookstagram account'],
    compatibleTypes: ['MONK', 'SOLO', 'CTRL'],
    conflictTypes: ['WOC!', 'GOGO', 'FUCK'],
    recommendations: {
      movies: {
        zh: ['《卧虎藏龙》', '《心灵奇旅》', '《降临》'],
        en: ['Arrival', 'Interstellar', 'The Social Dilemma'],
      },
      songs: {
        zh: ['《孤勇者》- 陈奕迅', '《水星记》- 郭顶', '《理想三旬》- 陈鸿宇'],
        en: ['Across the Universe — The Beatles', 'Time — Pink Floyd', 'Bloodbuzz Ohio — The National'],
      },
      activities: {
        zh: ['独自去一个书店泡一下午', '写长篇博客', '学一门冷门外语'],
        en: ['A full afternoon at an independent bookshop', 'Write a long-form essay', 'Learn an obscure language'],
      },
      gifts: {
        zh: ['Kindle', '一本厚的哲学书', '高端笔记本（Moleskine）'],
        en: ['A Kindle', 'A hefty philosophy book', 'A Moleskine notebook'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 思考者人格解读 | THIN-K 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI THIN-K Personality - Complete Guide to The Overthinker',
      metaDescCN: 'SBTI THIN-K 思考者人格全面解析：深度型高认知人格的 15 维度特征、情感配对、行动力困境与成长建议。',
      metaDescEN: 'Complete SBTI THIN-K personality guide: The Overthinker archetype. Deep insight, paralyzed action, and the 3-2-1 shortcut out of the mental loop.',
      keywordsCN: ['sbti THIN-K', 'sbti THIN-K 意思', 'sbti 思考者', 'sbti THIN-K 配对', 'sbti THIN-K 性格', 'sbti 思考型人格'],
      keywordsEN: ['sbti THIN-K', 'sbti THIN-K meaning', 'sbti overthinker', 'sbti THIN-K compatibility', 'sbti THIN-K personality', 'sbti thinker type'],
    },
  },

  // ==========================================================================
  // 17. SHIT — 烂人
  // ==========================================================================
  {
    code: 'SHIT',
    slug: 'shit',
    nameCN: '烂人',
    nameEN: 'The Mess',
    emoji: '💩',
    color: '#78716C',
    pattern: 'LLL-LLM-LLL-LLL-MLH',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'L',
      S3_coreValue: 'L',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'M',
      A1_worldview: 'L',
      A2_flexibility: 'L',
      A3_meaning: 'L',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'M',
      So2_interpersonal: 'L',
      So3_expression: 'H',
    }),
    tagline: { zh: '我就是烂，咋地', en: 'Yeah I\'m a mess, what about it' },
    oneLinerCN: '把自己的烂摊子当成勋章，破罐子破摔但特别诚实。',
    oneLinerEN: 'Wears their disaster like a merit badge — dumpster fire with surprising honesty.',
    deepAnalysisCN:
      'SHIT 烂人这个名字很扎心但很精准。他们是 15 维度几乎全线走低的类型——自信、自我清晰度、动机、执行力、意义感全在 L，只有一个维度异常突出：So3 表达真实度 H。翻译一下就是：这个人确实一地鸡毛，但他自己非常清楚自己是一地鸡毛，并且毫不掩饰。\n\nSHIT 不是坏人，也不是没能力的人。他们是那种「人生在某个节点崩了，之后就没再站起来，但也没打算瞒着谁」的人。他们会在相亲时直接告诉对方「我失业半年了，欠了 3 万花呗，父母不知道」；他们会在同事面前承认「这个方案我就是做不好，别找我了」；他们会在朋友面前哭「我对生活失去兴趣很久了」。这种「摊牌级诚实」让他们在一个人人都在装忙、装有梦想、装有方向的时代显得格外刺眼。\n\n从维度看 SHIT 是「崩溃后静止态」：所有的行动模块都熄火，所有的自我模块都低迷，所有的态度模块都悲观。但因为 So3 高，他们没有选择用假象掩盖崩溃，反而选择了「把崩溃公开化」。这是 SHIT 和 DEAD 最大的区别——DEAD 是彻底断电，SHIT 是电量 1% 但还在直播。\n\n典型 SHIT 的一天：下午 1 点起床（失业或者在家办公），起床后刷手机 2 小时再起床；中午吃泡面或者外卖（永远点同一家）；下午试图做点什么（投简历、写代码、打扫），通常做 30 分钟就放弃；傍晚睡一个长觉；晚上 9 点起来觉得饿但不想出门；继续刷手机到凌晨 3 点；凌晨 3 点发一条朋友圈「我真是废物」然后秒删；然后是第二天重复。\n\nSHIT 的奇特魅力在于：虽然他们一地鸡毛，但他们的诚实让身边的人感到解脱。有些朋友会特地找 SHIT 聊天，因为「在他面前我不用装」。SHIT 不会 judge 别人，因为他连自己都不 judge；SHIT 不会给你鸡汤，因为他喝过的鸡汤都吐了；SHIT 只会说「嗯，烂，我懂」。这种「废物互相取暖」的关系其实是很多 SHIT 的人生光亮。\n\n但 SHIT 的真实处境是：他们正在一个缓慢下坠的螺旋里。没有干预的话，SHIT 会从「失业半年」变成「失业两年」，从「欠花呗 3 万」变成「欠 30 万」，从「和爸妈冷战」变成「和爸妈断联」。他们的诚实不能救他们，因为诚实只是描述问题不解决问题。\n\n爱情里 SHIT 是不推荐进入的状态——不是他们不值得被爱，而是他们自己都没能力接住爱。任何一个试图拯救 SHIT 的人最后都会被拖下水。SHIT 真正需要的不是恋爱，是一个 reset。\n\n给 SHIT 的建议：你现在最不需要的是「立大志」「重新出发」「找到人生方向」这种鸡汤。你现在最需要的是「做一件具体的小事」——洗一个澡、吃一顿有蔬菜的饭、出门走 15 分钟、回复一条 3 天前的消息。这些事听起来可笑地小，但对你现在的状态来说，它们是唯一能把你从 1% 电量拉回 5% 的操作。5% 和 1% 的差距，是「还活着」和「已经死了」。你先回到 5%，再谈任何其他的事情。',
    deepAnalysisEN:
      "SHIT is a brutal name and a precise one. Their 15-dimension profile is almost entirely low — self-confidence, self-clarity, motivation, execution, meaning — with a single glaring spike: expressive authenticity (So3 high). Translation: this person is genuinely a mess, is fully aware that they are a mess, and refuses to hide it.\n\nSHIT is not a bad person. SHIT is not incompetent. SHIT is 'something collapsed at a life checkpoint and they never got back up, and they are not about to lie about it.' On a first date, SHIT will say 'I've been unemployed six months, I owe 3k on credit cards, my parents don't know.' In a team meeting, SHIT will say 'I can't deliver this, don't assign it to me.' At 2 a.m. with a friend, SHIT will cry 'I lost interest in life a while back.' In an era where everyone performs busy, performs dreams, performs direction, SHIT's honesty stands out — and it is surprisingly disarming.\n\nDimensionally SHIT is 'post-crash standstill': action module off, self module dim, attitude module pessimistic. But because So3 stays high, SHIT chose not to hide the crash with a performance. Instead they broadcast it. That is the key difference between SHIT and DEAD — DEAD went fully offline; SHIT is on 1% battery but still streaming.\n\nA typical SHIT day: wakes at 1 p.m. (unemployed or WFH). Scrolls for two hours before sitting up. Instant noodles or the same takeout again. Afternoon attempt at something (job apps, code, cleaning) — 30 minutes, then stops. Long nap into evening. Hungry at 9 p.m., doesn't leave the house. Scrolls till 3 a.m. Posts 'I'm such trash' and deletes it. Repeat.\n\nThe strange charm of SHIT: the mess is real, but their honesty is oddly relieving to other people. Some friends specifically seek SHIT out because 'around them I don't have to pretend.' SHIT doesn't judge anyone — they don't even judge themselves. SHIT doesn't give advice, because they've thrown up every motivational quote they were fed. SHIT just says 'yeah, it sucks, I get it.' This 'garbage-pile mutual warmth' is one of the few lights in SHIT's life.\n\nBut the real picture: SHIT is in a slow-descending spiral. Without intervention, 'unemployed six months' becomes 'unemployed two years.' 3k debt becomes 30k debt. Cold war with parents becomes cutoff. Honesty describes a problem — it does not fix it.\n\nDating SHIT is not recommended — not because they don't deserve love, but because they cannot currently hold love. Anyone trying to 'save' SHIT gets dragged down. What SHIT needs is not romance, it is a reset.\n\nGrowth prescription: the last thing you need right now is a 'find your purpose' pep talk. The thing you need is 'one specific small action' — take a shower, eat one meal with vegetables, walk outside for 15 minutes, reply to one three-day-old text. These sound laughably small. Given your current state, they are the only operations that move you from 1% battery to 5%. The gap between 5% and 1% is the gap between 'still alive' and 'already dead.' Get back to 5% first. Everything else is later.",
    strengthsCN: [
      '诚实到残忍，不演不装',
      '不评判别人，能给朋友安全感',
      '对鸡汤免疫，不会被画饼',
      '危机意识真实，不会自我美化',
    ],
    strengthsEN: [
      'Brutally honest, never performs.',
      'Non-judgmental; friends feel safe around them.',
      'Immune to motivational BS; can\'t be sold on empty dreams.',
      'Real crisis awareness; won\'t pretty up their own decline.',
    ],
    weaknessesCN: [
      '全线行动力熄火，慢性下坠',
      '缺乏自救能力，需要外部干预',
      '亲密关系里会拖垮对方',
      '容易滑入严重抑郁',
    ],
    weaknessesEN: [
      'Full action-engine off; slow descent.',
      'Limited self-rescue capacity; needs external help.',
      'Drags partners down in relationships.',
      'High risk of sliding into clinical depression.',
    ],
    famousExamplesCN: ['《猜火车》里的 Renton', '《比利·林恩》里的 Billy', '很多躺平博主的真实状态'],
    famousExamplesEN: ['Fleabag', 'Trainspotting\'s Renton', "BoJack Horseman"],
    compatibleTypes: ['DEAD', 'MALO', 'POOR'],
    conflictTypes: ['BOSS', 'CTRL', 'GOGO'],
    recommendations: {
      movies: {
        zh: ['《猜火车》', '《比利·林恩的中场战事》', '《大佛普拉斯》'],
        en: ['Trainspotting', 'Fleabag', 'Requiem for a Dream'],
      },
      songs: {
        zh: ['《晚安》- 痛仰乐队', '《离骚》- 李志', '《杀死那个石家庄人》'],
        en: ['Hurt — Johnny Cash', 'Creep — Radiohead', 'Black — Pearl Jam'],
      },
      activities: {
        zh: ['洗一个澡', '吃一顿蔬菜', '出门走 15 分钟'],
        en: ['Take a shower', 'One meal with vegetables', 'Walk outside 15 minutes'],
      },
      gifts: {
        zh: ['一箱泡面和一瓶维生素', '干净的床单', '付清一张账单'],
        en: ['A box of noodles and a bottle of vitamins', 'Fresh bed sheets', 'Quietly pay off one of their bills'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 烂人人格解读 | SHIT 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI SHIT Personality - Complete Guide to The Mess',
      metaDescCN: 'SBTI SHIT 烂人人格全面解析：诚实崩溃型人格的 15 维度特征、情感配对与从 1% 电量重启的路径。',
      metaDescEN: 'Complete SBTI SHIT personality guide: The Mess archetype. Honest collapse, strange charm, and the one small action that actually moves the needle.',
      keywordsCN: ['sbti SHIT', 'sbti SHIT 意思', 'sbti 烂人', 'sbti SHIT 配对', 'sbti SHIT 性格', 'sbti 破罐破摔人格'],
      keywordsEN: ['sbti SHIT', 'sbti SHIT meaning', 'sbti mess', 'sbti SHIT compatibility', 'sbti SHIT personality', 'sbti dumpster fire type'],
    },
  },

  // ==========================================================================
  // 18. ZZZZ — 睡神
  // ==========================================================================
  {
    code: 'ZZZZ',
    slug: 'zzzz',
    nameCN: '睡神',
    nameEN: 'The Sleeper',
    emoji: '😴',
    color: '#8B5CF6',
    pattern: 'MML-LLH-MML-LLL-LLM',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'M',
      S3_coreValue: 'L',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'H',
      A1_worldview: 'M',
      A2_flexibility: 'M',
      A3_meaning: 'L',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'L',
      So2_interpersonal: 'L',
      So3_expression: 'M',
    }),
    tagline: { zh: '能睡就睡，反正醒着也没事干', en: 'Sleep mode is my factory setting' },
    oneLinerCN: '把睡觉当成一种生活方式，15 小时起步，18 小时不嫌多。',
    oneLinerEN: 'Sleep as a lifestyle choice — 15 hours baseline, 18 is cozy, 20 is vacation.',
    deepAnalysisCN:
      'ZZZZ 睡神不是偶尔周末多睡的普通人，他们是「能睡就是一种天赋」的真正选手。在别人眼里「睡 10 小时就头疼」是常态，但对 ZZZZ 来说 10 小时只是开胃菜。他们可以周末 48 小时里睡 36 个，可以在地铁上站着睡，可以在会议的 5 分钟间隙眯一下，也可以在被吵醒 3 分钟后重新入睡无缝衔接。他们的大脑默认是省电模式。\n\n从维度看 ZZZZ 是一个「低能耗全套装」：动机 Ac1 L，决策 Ac2 L，执行 Ac3 L——行动组全关；核心价值 S3 L，人生意义 A3 L——意义模块也关；情感投入 E2 L，依恋 E1 L——情感不动；社交主动 So1 L，人际 So2 L——社交不开。但有一个亮点：E3 边界感 H——他们对「别烦我」这件事有极强的直觉和执行力。\n\nZZZZ 不是抑郁，也不是懒。他们是一种独特的「能量节能派」——相信人活一辈子没必要那么累，睡觉是最便宜的快乐，不花钱不伤身，还能做美梦。如果你问 ZZZZ「你为什么总是睡觉」，他会反问你「那你醒着在干嘛」。很多时候你其实答不上来。\n\n典型 ZZZZ 的一天（工作日）：早上闹钟响 6 次才起床，刷牙洗脸用最少的动作完成，早餐跳过，直接冲到地铁一路站着眯；到公司先去洗手间洗把脸清醒下，上午摸鱼摸得异常专业（表面看起来在工作），中午饭后是他们「第二次睡眠」的黄金时间——趴桌子睡 30 分钟雷打不动，同事都不敢吵；下午继续维持表面活着；下班后立刻回家，不参加任何社交；到家先睡一个「下班觉」；晚餐随便对付；9 点开始第二轮正式睡眠；早上继续不想起。\n\n典型 ZZZZ 的一天（周末）：不存在。因为 ZZZZ 的周末就是睡觉。\n\nZZZZ 的强项其实是「不被世界裹挟」。他们不会为了一个项目熬夜，不会为了一次相亲打扮 3 小时，不会为了社交去自己不喜欢的聚会。他们对自己的能量极度保守，这让他们在一个「内卷致死」的环境里反而成了异类——不焦虑，不 FOMO，不比较，只管睡。\n\nZZZZ 的痛点是他们对生活缺乏热情——意义感 A3 L，动机 Ac1 L，核心价值 S3 L 这三项的组合意味着他们其实不是「选择睡觉」，而是「没找到比睡觉更值得做的事」。ZZZZ 如果找到一个真正热爱的事情（一个爱好、一个副业、一段真正的感情），他们会惊人地爆发——因为他们的省电模式一直在攒电。问题是大多数 ZZZZ 一辈子都没找到这个触发点，所以睡了一辈子。\n\n爱情里 ZZZZ 需要的是一个「能和他一起睡懒觉的伴侣」。最糟糕的搭配是 ZZZZ + GOGO——一个 6 点起床晨跑，一个 11 点才起床，三个月就会分手。最好的搭配是 ZZZZ + OJBK 或 ZZZZ + MALO——大家都没什么野心，周末一起睡到中午起床吃个饭再睡一轮，完美和谐。\n\n给 ZZZZ 的建议：尝试找一件能让你主动想早起的事。不是鸡汤式「你要有梦想」，是具体的——某个你痴迷的爱好、某个让你眼睛发光的项目、某段让你凌晨都想聊的感情。不是要你变 GOGO，是让你知道「你其实可以醒着，只是一直没遇到值得醒着的理由」。一旦找到，你会发现自己可以比任何人都专注。',
    deepAnalysisEN:
      "ZZZZ is not 'I sleep in on weekends sometimes.' ZZZZ is 'sleeping is a talent and I'm top tier.' Where others say 'more than 10 hours gives me a headache,' ZZZZ treats 10 hours as a warm-up. They can log 36 hours of sleep across a 48-hour weekend, sleep standing up on the subway, nap during a 5-minute meeting break, and fall back asleep within 3 minutes of being woken up. Their brain defaults to power-save mode.\n\nDimensionally ZZZZ is a full low-energy kit: action trio off (Ac1, Ac2, Ac3 all low); self-drive off (S3 low, A3 low); emotion cluster off (E1, E2 low); social cluster off (So1, So2 low). One bright spot: high boundary (E3 high) — they have an extraordinary ability to enforce 'do not disturb.'\n\nZZZZ is not depressed, not lazy. They are an 'energy conservationist' — believes life doesn't need to be this tiring, sleep is the cheapest joy, costs nothing, hurts no one, comes with free dreams. Ask ZZZZ 'why do you sleep so much,' they ask back 'what are you doing while awake,' and surprisingly often you can't answer.\n\nTypical ZZZZ workday: alarm goes off six times, brushes teeth minimally, skips breakfast, stands on subway eyes closed. Splashes water at office bathroom. Exceptional at looking busy while mentally offline. Post-lunch: the sacred 30-minute desk nap, coworkers don't dare disturb. Afternoon: performs aliveness. After clockout: straight home, no socializing. First nap upon arriving. Whatever for dinner. 9 p.m.: main sleep starts. Next morning: still doesn't want to get up.\n\nTypical ZZZZ weekend: does not exist. The weekend is sleep.\n\nZZZZ's real strength is 'refusing to be bullied by the world.' They don't pull all-nighters for a project. They don't spend three hours getting ready for a first date. They don't attend parties they don't want to attend. Extremely conservative with their own energy — which in a hustle-to-death environment makes them an anomaly. No anxiety, no FOMO, no comparison. Just sleep.\n\nZZZZ's pain: they lack life enthusiasm. Low meaning + low motivation + low core value combined means they are not 'choosing sleep,' they are 'unable to find anything more worth doing than sleep.' If ZZZZ ever finds a real obsession — a hobby, a side project, a love that matters — the power-save reserve they've been accumulating converts into startling focus. Problem is most ZZZZs never find the trigger, so they sleep their way through.\n\nIn love ZZZZ needs someone who can sleep in with them. Worst match: ZZZZ + GOGO — one up at 6 for a run, one up at 11 for brunch, three months to divorce. Best matches: ZZZZ + OJBK or ZZZZ + MALO — no one has ambitions, everyone sleeps till noon on Saturday, brunch, nap, perfect harmony.\n\nGrowth prescription: try to find one thing that makes you actually want to get up early. Not 'find your dream' fluff — something concrete. A niche hobby that obsesses you. A project that makes your eyes widen. A relationship you'd stay up past midnight to text. Not to turn you into a GOGO, but to prove 'you are fully capable of being awake — you just haven't met a reason yet.' Once the reason exists, you'll find you can focus harder than anyone.",
    strengthsCN: [
      '睡眠质量顶尖，恢复力超强',
      '边界感明确，不被打扰',
      '不被内卷和 FOMO 裹挟',
      '情绪稳定，很难焦虑',
    ],
    strengthsEN: [
      'Elite sleep quality, top-tier recovery.',
      'Strong boundaries; guards own time.',
      'Immune to hustle culture and FOMO.',
      'Emotionally steady; low anxiety baseline.',
    ],
    weaknessesCN: [
      '缺乏热情，生活低密度',
      '错过机会和关系',
      '身体状态其实会因睡过多变差',
      '亲密关系里缺乏参与感',
    ],
    weaknessesEN: [
      'No enthusiasm; low life density.',
      'Misses opportunities and relationships.',
      'Oversleeping actually harms physical state.',
      'Low engagement in intimate relationships.',
    ],
    famousExamplesCN: ['《懒羊羊》', '《加菲猫》', '《樱桃小丸子》里的爸爸'],
    famousExamplesEN: ['Garfield', 'Homer Simpson (on Sundays)', 'Jeffrey Lebowski (The Big Lebowski)'],
    compatibleTypes: ['OJBK', 'MALO', 'POOR'],
    conflictTypes: ['GOGO', 'BOSS', 'CTRL'],
    recommendations: {
      movies: {
        zh: ['《懒惰的一天》', '《海边的曼彻斯特》', '《小森林》'],
        en: ['The Big Lebowski', "I Don't Feel at Home in This World Anymore", 'Lost in Translation'],
      },
      songs: {
        zh: ['《晚安》- 痛仰', '《摇篮曲》', '《雨天的周末》'],
        en: ['Sleep — Eric Whitacre', 'Dreams — Fleetwood Mac', 'Lullaby — Johannes Brahms'],
      },
      activities: {
        zh: ['买一张好床垫', '12 小时不间断睡眠挑战', '一个周末完全不出门'],
        en: ['Buy a good mattress', '12-hour uninterrupted sleep', 'A full weekend indoors'],
      },
      gifts: {
        zh: ['高端枕头', '真丝眼罩', '加重毯子'],
        en: ['A premium pillow', 'Silk eye mask', 'A weighted blanket'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 睡神人格解读 | ZZZZ 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI ZZZZ Personality - Complete Guide to The Sleeper',
      metaDescCN: 'SBTI ZZZZ 睡神人格全面解析：把睡觉当生活方式的低能耗型人格 15 维度特征、情感配对与唤醒路径。',
      metaDescEN: 'Complete SBTI ZZZZ personality guide: The Sleeper archetype. Sleep as identity, FOMO immunity, and the one reason that could wake them up.',
      keywordsCN: ['sbti ZZZZ', 'sbti ZZZZ 意思', 'sbti 睡神', 'sbti ZZZZ 配对', 'sbti ZZZZ 性格', 'sbti 低能耗人格'],
      keywordsEN: ['sbti ZZZZ', 'sbti ZZZZ meaning', 'sbti sleeper', 'sbti ZZZZ compatibility', 'sbti ZZZZ personality', 'sbti low-energy type'],
    },
  },

  // ==========================================================================
  // 19. POOR — 穷鬼
  // ==========================================================================
  {
    code: 'POOR',
    slug: 'poor',
    nameCN: '穷鬼',
    nameEN: 'The Broke',
    emoji: '🪙',
    color: '#CA8A04',
    pattern: 'LMM-LMM-LMM-MML-LMM',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'L',
      E2_emotionalInvest: 'M',
      E3_boundary: 'M',
      A1_worldview: 'L',
      A2_flexibility: 'M',
      A3_meaning: 'M',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'L',
      So1_socialInit: 'L',
      So2_interpersonal: 'M',
      So3_expression: 'M',
    }),
    tagline: { zh: '没钱万万不能，有钱也不够', en: 'Broke forever, somehow still making it work' },
    oneLinerCN: '每个月 15 号开始吃馒头配咸菜，但朋友圈永远岁月静好。',
    oneLinerEN: 'Eats instant noodles on the 15th but somehow the feed still looks like a travel magazine.',
    deepAnalysisCN:
      'POOR 穷鬼不是真的一贫如洗，他们是那种「永远在月光的边缘徘徊」的普通年轻人。他们的 15 维度画像是「整体偏低但比 SHIT 和 DEAD 稳」——自信 L（对自己的赚钱能力不太自信），世界观 A1 L（觉得这世界对穷人不友好），依恋 E1 L（恋爱谈不起），动机和执行都在中下——他们在 SBTI 里是「打工人」的数据库画像。\n\nPOOR 的日常是一种高度精打细算的生存智慧：他们知道哪家 711 的便当在 9 点后半价，哪家超市周三打折，哪个外卖平台今天有券，哪个月饭补还没领，哪件衣服再洗一次就能再穿一个月。他们不是买不起贵的，是买了之后要吃一个月泡面作为代价，这个代价他们权衡过，大多数时候选择不买。他们是这个消费主义时代里为数不多的「理性消费者」——虽然理性背后是无奈。\n\n但 POOR 不是 SHIT——他们没有崩溃，他们只是「被经济压力困住」。他们每天照常上班，照常完成任务，照常和同事打招呼，照常回家做饭。他们对生活有一种「凑合活着但还挺清醒」的态度。意义感 A3 中等说明他们其实有理想——只是理想被房租和花呗压得有点变形。\n\n典型 POOR 的一天：早上自己煮粥（买粥太贵），穿的是两年前打折买的衣服；上班路上故意走 10 分钟去更远的地铁站因为票价便宜 2 块；到公司查一下今天有没有免费的下午茶；中午带便当（前一晚做的），吃的时候有人问她为什么不点外卖她说「省点，最近在攒钱」；下午工作中顺便刷一下各大 APP 的优惠券；下班后绕去超市买打折菜；晚上自己做饭；洗澡时想「要不要换一份工作」但想到简历还没更新就放弃了；睡前刷一下理财 APP 看余额，叹一口气，关灯。\n\nPOOR 的隐痛是：他们的「穷」已经变成了一种身份而不是一种状态。因为长期习惯了紧巴巴的生活，他们会对「花钱让自己开心」产生一种罪恶感——明明可以买，但手就是抖；明明有钱买，但还是忍不住算「这顿饭等于我 3 小时加班」。这种「消费罪恶感」会让他们即使有了钱也无法真正享受生活。很多 POOR 类型 30 岁后收入翻了几倍但还是过着穷鬼生活，因为那个「苦日子」的身份没有被撕掉。\n\n另一个痛点：POOR 的爱情也被钱制约。他们会拒绝约会因为「去不起那家餐厅」，会躲避深入关系因为「我这样的人没资格谈恋爱」，会在伴侣花钱时偷偷心疼。他们把「没钱」当成自己不配被爱的理由。\n\n爱情里 POOR 需要的是一个「不把物质当关系核心」的伴侣——另一个 POOR 可以，一个富足但不炫耀的 THAN-K 也可以。最糟糕的搭配是 POOR + Dior-s 或 POOR + ATM-er，要么是生活方式冲突，要么是自卑被激活。\n\n给 POOR 的建议：把「省钱」和「抠门」区分开来。省钱是不花无意义的钱，抠门是不敢花花出去的钱。你需要练习的是偶尔「合理地奢侈」一下——一次给自己的生日蛋糕、一次有品牌的护肤品、一次品质好的晚餐。不是为了装，是为了让自己相信「我值得被花」。只有你自己开始相信你值得被花，别人才不会把你当一个便宜货。',
    deepAnalysisEN:
      "POOR is not literally broke. POOR is the normal millennial/Gen Z grinder permanently hovering at the edge of payday. Their 15-dimension profile reads 'mostly low but steadier than SHIT or DEAD': low self-confidence (about income), low worldview (the world is hostile to broke people), low attachment (can't afford dating), motivation and execution middling-to-low. In SBTI, POOR is the database portrait of the average working adult.\n\nPOOR's daily life is a survival-grade frugality: knows which 7-Eleven bento goes 50% off after 9 p.m., which grocery store has Wednesday discounts, which delivery app coupon is live tonight, whether this month's meal stipend has been collected, which shirt can last one more wash cycle. They aren't incapable of buying expensive things — they are capable, but the cost is a month of noodles, and after weighing it, they usually don't. In this consumerist era, POOR is one of the few 'rational consumers' — rationality born from constraint, not enlightenment.\n\nBut POOR is not SHIT. POOR hasn't collapsed. POOR is 'trapped under economic pressure.' They still show up to work, still finish tasks, still say hi to coworkers, still cook dinner at home. There's a 'making do but staying clear-eyed' attitude. Medium life-meaning (A3) means POOR has dreams — the dreams are just warped by rent and credit-card interest.\n\nA typical POOR day: home-cooked porridge (buying is too expensive), wears discount-sale clothes from two years ago. Walks 10 minutes to a farther subway stop because the fare is 2 yuan cheaper. Checks if there's a free office snack today. Brings packed lunch; when coworker asks why no takeout, POOR says 'saving up, not a big deal.' Coupon-hunts between tasks. Grocery detour for markdown produce. Cooks at home. In the shower wonders about quitting but the resume isn't updated. Before bed, opens the banking app, sighs, turns off the light.\n\nPOOR's hidden pain: 'broke' has become an identity, not a state. Years of tight living have bred consumption guilt — even when they can buy something nice, their hand shakes; they mentally convert the price to 'this equals three hours of overtime.' This guilt persists even after income rises. Many POORs in their 30s, whose salaries tripled, still live like college students because the 'hard times' identity was never peeled off.\n\nSecond pain point: POOR's love life is money-constrained. They turn down dates because 'I can't afford that restaurant.' They dodge deeper relationships because 'someone like me doesn't deserve love.' They secretly wince when a partner spends on them. They've made 'broke' into 'unworthy.'\n\nIn love POOR needs a partner who doesn't make money the core of the relationship. Another POOR works. A quietly-stable THAN-K works. Worst matches: POOR + Dior-s or POOR + ATM-er — either lifestyle clash or the inferiority complex gets triggered in full.\n\nGrowth prescription: separate 'frugal' from 'scarcity mindset.' Frugal is 'I don't spend on nonsense.' Scarcity is 'I'm afraid to spend on what I want.' Practice occasional, deliberate small luxuries — a nice birthday cake, one real skincare product, one quality dinner. Not to perform wealth. To convince yourself that you are worth spending on. When you start believing that, other people stop treating you like a discount rack.",
    strengthsCN: [
      '生存智慧拉满，精打细算',
      '对物质的欲望低，容易知足',
      '和金钱的关系清晰，不会被消费主义骗',
      '朋友圈虽然不豪华但真实',
    ],
    strengthsEN: [
      'Max survival intelligence; financial planning on hard mode.',
      'Low material desire; easy to satisfy.',
      'Clear-eyed relationship with money; immune to consumerist hype.',
      'Honest social footprint, not flashy.',
    ],
    weaknessesCN: [
      '把「穷」当成身份，长期自卑',
      '消费罪恶感阻碍生活质量提升',
      '因经济拒绝爱情和机会',
      '对世界保持戒备，难以信任',
    ],
    weaknessesEN: [
      'Broke as identity; chronic low self-worth.',
      'Consumption guilt blocks quality-of-life upgrades.',
      'Turns down love and opportunities for money reasons.',
      'Defensive worldview; trust is hard.',
    ],
    famousExamplesCN: ['《山海情》里的马得福', '《欢乐颂》里的樊胜美', '大部分北上广打工人'],
    famousExamplesEN: ['Early Monica Geller (Friends)', 'Most 20-somethings in New York', 'Any Reddit r/povertyfinance poster'],
    compatibleTypes: ['OJBK', 'MALO', 'THAN-K'],
    conflictTypes: ['Dior-s', 'ATM-er', 'BOSS'],
    recommendations: {
      movies: {
        zh: ['《钢的琴》', '《二十二》', '《寄生虫》'],
        en: ['Nomadland', 'Parasite', 'The Florida Project'],
      },
      songs: {
        zh: ['《漂洋过海来看你》', '《北京欢迎你》', '《老男孩》'],
        en: ['Mo Money Mo Problems — Notorious B.I.G.', 'Rich Girl — Gwen Stefani', 'Royals — Lorde'],
      },
      activities: {
        zh: ['学一个副业技能', '读一本理财书', '给自己做一顿像样的饭'],
        en: ['Pick up one side-hustle skill', 'Read one personal-finance book', 'Cook yourself one real dinner'],
      },
      gifts: {
        zh: ['一个好用的保温杯', '超市代金券', '一张干净的床单'],
        en: ['A good thermos', 'A grocery store gift card', 'A fresh set of sheets'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 穷鬼人格解读 | POOR 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI POOR Personality - Complete Guide to The Broke',
      metaDescCN: 'SBTI POOR 穷鬼人格全面解析：经济压力下的打工人画像，15 维度特征、情感配对与脱困建议。',
      metaDescEN: 'Complete SBTI POOR personality guide: The Broke archetype. Survival intelligence, scarcity mindset, and the difference between frugal and stuck.',
      keywordsCN: ['sbti POOR', 'sbti POOR 意思', 'sbti 穷鬼', 'sbti POOR 配对', 'sbti POOR 性格', 'sbti 打工人人格'],
      keywordsEN: ['sbti POOR', 'sbti POOR meaning', 'sbti broke', 'sbti POOR compatibility', 'sbti POOR personality', 'sbti broke type'],
    },
  },

  // ==========================================================================
  // 20. MONK — 僧人
  // ==========================================================================
  {
    code: 'MONK',
    slug: 'monk',
    nameCN: '僧人',
    nameEN: 'The Monk',
    emoji: '🧘',
    color: '#A16207',
    pattern: 'MHH-LLH-HLH-LLL-LHM',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'H',
      S3_coreValue: 'H',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'H',
      A1_worldview: 'H',
      A2_flexibility: 'L',
      A3_meaning: 'H',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'L',
      So2_interpersonal: 'H',
      So3_expression: 'M',
    }),
    tagline: { zh: '六根清净，生人勿扰', en: 'Six senses cleared, do not disturb' },
    oneLinerCN: '不是出家人，但已经做到了「不社交、不恋爱、不消费、不加班」的四大皆空。',
    oneLinerEN: 'Not literally ordained, but has already achieved the four noble truths: no socializing, no dating, no shopping, no overtime.',
    deepAnalysisCN:
      'MONK 僧人不是真的剃度出家，他们是那种在大城市里「自我隐居」的人。他们的画像是「自我清晰度 H、边界 H、意义感 H，但动机、执行、依恋全部 L」——他们很清楚自己是谁，很清楚自己不要什么，但对「追求」这件事本身失去了兴趣。\n\nMONK 的日常是一种主动选择的极简：合租房只租一间，家里没有装饰，衣服永远是那几件，手机里只留必要的 app，朋友圈常年不发。他们不是买不起，是买了会觉得「这东西对我没有意义」。他们对消费主义有一种天然免疫，看到别人疯狂抢购会觉得困惑——「为什么要花钱买自己不需要的东西？」\n\nMONK 的核心信念是「欲望越少，痛苦越少」。他们主动砍掉了大部分社会期待：不结婚、不生子、不升职、不买房、不应酬。他们可以连续三个周末不出门，一个月不说超过 50 句话，半年不谈恋爱也不觉得空虚。他们的孤独不是被动的，是主动选择的。\n\n但 MONK 的隐痛是：这种「清心寡欲」有时候是对创伤的一种保护。很多 MONK 是从 LOVE-R、THAN-K 甚至 ATM-er 转化来的——他们在年轻时投入过太多情感，受过太重的伤，最后选择了「关门闭户」。他们不是没有欲望，是不敢再有欲望，因为每一次欲望都意味着可能失去。\n\n爱情里 MONK 最配的是同样极简的 OJBK 或同样疏离的 SOLO。最不配的是 LOVE-R（太黏）和 BOSS（太吵）。MONK 如果要复活，需要一个有耐心、不索取、允许他们保持距离的人。\n\n给 MONK 的建议：你的「放下」不是终点，只是一个中场休息。真正的清净不是把欲望全部关掉，而是在拥有欲望的同时不被它奴役。偶尔允许自己「想要一点什么」——一本书、一顿饭、一次旅行、一个人的温度——这些不会让你变成普通人，只会让你变成一个有温度的僧人。',
    deepAnalysisEN:
      "MONK is not literally ordained. MONK is the self-hermit living in a big city: shares an apartment, owns nothing, wears the same three outfits, keeps only essential apps on the phone, hasn't posted on social media in a year. MONK isn't broke — MONK looks at the stuff and thinks 'this has no meaning to me.' MONK is naturally immune to consumerism, watches Black Friday with genuine confusion: why spend money on things you don't need?\n\nMONK's core belief: less desire, less suffering. MONK has actively amputated most social expectations — no marriage, no kids, no promotion chase, no home-buying, no networking dinners. MONK can go three consecutive weekends without leaving the apartment, speak fewer than 50 sentences in a month, remain single for six months without feeling empty. Their loneliness is not passive. It's chosen.\n\nHidden pain: the 'renunciation' is sometimes a trauma shield. Many MONKs converted from LOVE-R, THAN-K, or ATM-er after over-investing in their youth, getting crushed, and finally choosing 'lock the door.' They don't have no desire — they're afraid to have desire, because every desire means possible loss.\n\nIn love MONK pairs best with minimalist OJBK or equally distant SOLO. Worst matches: clingy LOVE-R, loud BOSS. For a MONK to come back alive, they need someone patient, non-demanding, and comfortable with distance.\n\nGrowth: your 'letting go' is a halftime break, not a finish line. True peace isn't shutting off all desire — it's holding desire without being enslaved by it. Occasionally let yourself want something — a book, a meal, a trip, the warmth of a person. It won't make you normal. It'll just make you a monk with a pulse.",
    strengthsCN: [
      '内心秩序稳定，不被外界影响',
      '对欲望免疫，精神极简',
      '边界清晰，不会被他人侵入',
      '长期自给自足，不依赖任何人',
    ],
    strengthsEN: [
      'Stable internal order; unaffected by external noise.',
      'Immune to desire; mentally minimalist.',
      'Clear boundaries; nobody invades.',
      'Long-term self-sufficient; dependent on no one.',
    ],
    weaknessesCN: [
      '情感麻木，错过真实连接',
      '把创伤伪装成超脱',
      '拒绝任何成长型痛苦',
      '逐渐失去「想要」的能力',
    ],
    weaknessesEN: [
      'Emotional numbness; missing real connection.',
      'Disguising trauma as transcendence.',
      'Refuses all growth-flavored pain.',
      'Gradually loses the capacity to want.',
    ],
    famousExamplesCN: ['《海上钢琴师》里的 1900', '日本「卒婚族」', '大部分佛系青年'],
    famousExamplesEN: ['1900 (The Legend of 1900)', 'Japanese hikikomori-adjacent', 'Everyone who went no-contact with their phone'],
    compatibleTypes: ['OJBK', 'SOLO', 'THIN-K'],
    conflictTypes: ['LOVE-R', 'BOSS', 'SEXY'],
    recommendations: {
      movies: {
        zh: ['《海上钢琴师》', '《心经》', '《一一》'],
        en: ['Into the Wild', 'Paterson', 'The Assassin'],
      },
      songs: {
        zh: ['《凤凰花开的路口》', '《南山南》', '《米店》'],
        en: ['Holocene — Bon Iver', 'River — Leon Bridges', 'Everything In Its Right Place — Radiohead'],
      },
      activities: {
        zh: ['单人寺庙短居', '断舍离一次家', '一日禁言'],
        en: ['Weekend silent retreat', 'Do a full declutter', '24-hour no-speaking day'],
      },
      gifts: {
        zh: ['一本好书', '一盒好茶', '一个舒服的坐垫'],
        en: ['One great book', 'Loose-leaf tea', 'A good meditation cushion'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 僧人人格解读 | MONK 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI MONK Personality - Complete Guide to The Monk',
      metaDescCN: 'SBTI MONK 僧人人格全面解析：都市隐修者画像，15 维度特征、情感配对与回归之道。',
      metaDescEN: 'Complete SBTI MONK personality guide: The urban hermit. Self-renunciation, trauma shields, and how to keep wanting things.',
      keywordsCN: ['sbti MONK', 'sbti MONK 意思', 'sbti 僧人', 'sbti MONK 配对', 'sbti MONK 性格', 'sbti 佛系人格'],
      keywordsEN: ['sbti MONK', 'sbti MONK meaning', 'sbti monk personality', 'sbti MONK compatibility', 'sbti hermit type'],
    },
  },

  // ==========================================================================
  // 21. IMSB — 傻者
  // ==========================================================================
  {
    code: 'IMSB',
    slug: 'imsb',
    nameCN: '傻者',
    nameEN: 'The Overthinker',
    emoji: '🌀',
    color: '#9333EA',
    pattern: 'LLL-HHM-LHM-LMM-MML',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'L',
      S3_coreValue: 'L',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'M',
      A1_worldview: 'L',
      A2_flexibility: 'H',
      A3_meaning: 'M',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'M',
      So1_socialInit: 'M',
      So2_interpersonal: 'M',
      So3_expression: 'L',
    }),
    tagline: { zh: '脑内小剧场 24 小时不打烊', en: "Inner monologue runs 24/7, no intermission" },
    oneLinerCN: '别人一句「嗯」能让他内耗三天，别人一个表情能让他推演出分手剧本。',
    oneLinerEN: 'A coworker saying "ok" triggers three days of internal debate. One emoji is enough to draft the breakup script.',
    deepAnalysisCN:
      'IMSB 傻者不是真的傻，相反，他们是 SBTI 里思考最多的类型之一。但这个「思考」指的不是理性分析，而是 **内耗式的无限推演**——他们会把一件已经发生的事情在脑子里反复回放 50 遍，每次都能找到一个新的「我当时是不是不该那样说」。\n\n他们的画像很奇怪：情感投入 E2 H，依恋 E1 H——他们极度在乎关系；但自信 S1 L、自我清晰度 S2 L——他们完全不相信自己。这种组合会产生一种「我很想和你好好相处但我觉得自己不配」的精神内耗。他们不是不想活，是活得太用力了，每一个决定都在自我审判。\n\n典型 IMSB 的一天：早上起床先检查一下昨晚发的消息有没有被回；没被回就开始推演「是不是我说错了什么」；回了就开始推演「他回得这么短是不是不耐烦了」；上班时同事说一句「你今天看起来有点累」，他会在接下来的 2 小时里反复想「我是不是脸色很差」「他是不是觉得我工作效率低」「他回家会不会跟别人说我状态不好」；晚上睡前在脑内回放了所有今天说过的话，找出 3-5 个「我当时应该这样说」的点，自我谴责一番后才能入睡。\n\nIMSB 的超能力是**共情**：因为他们把太多注意力放在「别人会怎么想」，他们对他人的情绪极度敏感。朋友一句欲言又止他们就能察觉，同事一个眼神他们就能读懂。他们是天生的倾听者和心理咨询师。但代价是：他们承接了太多不属于自己的情绪，最后把自己压垮。\n\n爱情里 IMSB 需要的是一个「明确、直接、不玩套路」的伴侣——THAN-K 可以，OJBK 可以，甚至 BOSS 也可以（BOSS 的直接能打断 IMSB 的推演）。最糟糕是 FAKE、LOVE-R（两个情绪都太饱满）或 THIN-K（会一起内耗）。\n\n给 IMSB 的建议：你的问题不是想得太多，是太相信自己的想法。下次你发现自己在推演「他是不是不喜欢我了」的时候，停下来问自己一个问题：「这是事实，还是我的想法？」90% 的时候你会发现那只是你的想法。然后把这个想法像垃圾短信一样标记删除。不是停止思考，是停止相信你思考出来的每一个结论。',
    deepAnalysisEN:
      "IMSB isn't actually dumb. IMSB is one of the most thought-dense types in SBTI — but the thought is not analysis, it's **infinite-loop rumination**. They will replay an already-finished conversation 50 times, finding a new 'I shouldn't have said that' on every loop.\n\nTheir profile is strange: high emotional investment and attachment (they care intensely about relationships), combined with low self-confidence and low self-clarity (they don't trust themselves at all). This combo produces the 'I desperately want to connect with you but I'm pretty sure I don't deserve it' kind of mental self-harm. IMSB isn't lazy — they're working too hard at existing.\n\nTypical day: wake up, check if last night's message was answered. No reply → 'what did I say wrong.' Reply → 'why was it so short, are they annoyed.' At work a coworker says 'you look tired today' → next two hours spent debating 'do I look sick,' 'do they think I'm slow,' 'will they gossip about me.' Before sleep, mental replay of every sentence spoken today, find 3–5 'I should have said it differently' moments, self-flagellate, then finally fall asleep.\n\nIMSB's superpower is empathy — because so much attention goes to 'what are they thinking,' they become extraordinarily sensitive to other people's micro-emotions. A friend's slight hesitation, a coworker's half-smile — IMSB reads it all. They are born listeners, unpaid therapists. The cost: they absorb emotions that aren't theirs until they collapse.\n\nIn love IMSB needs a 'clear, direct, no games' partner — THAN-K, OJBK, even BOSS works (BOSS's directness interrupts the loop). Worst matches: FAKE, LOVE-R (too emotionally intense), or another THIN-K (two loops feeding each other).\n\nGrowth: your problem isn't thinking too much — it's believing every thought you have. Next time you catch yourself spiraling on 'does he still like me,' pause and ask: 'is this a fact, or a thought?' 90% of the time it's just a thought. Mark it as spam. The goal isn't to stop thinking. It's to stop trusting every conclusion you reach.",
    strengthsCN: [
      '共情能力极强，是天生的倾听者',
      '对细节敏感，能察觉别人忽略的情绪',
      '自我反思能力高',
      '愿意为关系努力',
    ],
    strengthsEN: [
      'Extreme empathy; natural listener.',
      'Sensitive to micro-details others miss.',
      'High self-reflection.',
      'Willing to work hard for relationships.',
    ],
    weaknessesCN: [
      '过度推演，陷入自我消耗',
      '相信每一个负面想法',
      '承接太多不属于自己的情绪',
      '迟迟不敢做决定',
    ],
    weaknessesEN: [
      'Over-analyzes into self-depletion.',
      'Believes every negative thought.',
      'Absorbs emotions that aren\'t theirs.',
      'Paralyzed by decision-making.',
    ],
    famousExamplesCN: ['《被嫌弃的松子的一生》里的松子', '大部分 HSP 高敏感人群'],
    famousExamplesEN: ['Lady Bird (Lady Bird)', 'Fleabag', 'Every protagonist in a Sally Rooney novel'],
    compatibleTypes: ['THAN-K', 'OJBK', 'MUM'],
    conflictTypes: ['FAKE', 'LOVE-R', 'THIN-K'],
    recommendations: {
      movies: {
        zh: ['《被嫌弃的松子的一生》', '《海边的曼彻斯特》', '《心灵捕手》'],
        en: ['Lady Bird', 'Normal People', 'Eternal Sunshine of the Spotless Mind'],
      },
      songs: {
        zh: ['《晴天》- 周杰伦', '《后来》- 刘若英', '《当你》- 林俊杰'],
        en: ['Liability — Lorde', 'Youth — Daughter', 'Someone Like You — Adele'],
      },
      activities: {
        zh: ['写一本「担心笔记本」', '做一次正念冥想', '给自己写一封信'],
        en: ['Start a "worry journal"', 'Guided mindfulness meditation', 'Write yourself a letter'],
      },
      gifts: {
        zh: ['一本治愈心灵的书', '一个舒服的抱枕', '一份真诚的手写卡'],
        en: ['A healing memoir', 'A soft weighted blanket', 'A handwritten letter'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 傻者人格解读 | IMSB 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI IMSB Personality - Complete Guide to The Overthinker',
      metaDescCN: 'SBTI IMSB 傻者人格全面解析：内耗青年画像，15 维度特征、情感配对与停止反刍的方法。',
      metaDescEN: 'Complete SBTI IMSB personality guide: The Overthinker. Inner-monologue spiral, empath burnout, and how to stop trusting every negative thought.',
      keywordsCN: ['sbti IMSB', 'sbti IMSB 意思', 'sbti 傻者', 'sbti IMSB 配对', 'sbti 内耗人格', 'sbti 高敏感'],
      keywordsEN: ['sbti IMSB', 'sbti IMSB meaning', 'sbti overthinker', 'sbti IMSB compatibility', 'sbti anxiety type'],
    },
  },

  // ==========================================================================
  // 22. SOLO — 孤儿
  // ==========================================================================
  {
    code: 'SOLO',
    slug: 'solo',
    nameCN: '孤儿',
    nameEN: 'The Lone Wolf',
    emoji: '🐺',
    color: '#374151',
    pattern: 'MMH-LLH-MMH-MHM-LHM',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'M',
      S3_coreValue: 'H',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'H',
      A1_worldview: 'M',
      A2_flexibility: 'M',
      A3_meaning: 'H',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'H',
      Ac3_execution: 'M',
      So1_socialInit: 'L',
      So2_interpersonal: 'H',
      So3_expression: 'M',
    }),
    tagline: { zh: '一个人也可以很完整', en: 'Complete party of one' },
    oneLinerCN: '不是没人要，是主动选择一个人——全身长刺的软心脏刺猬。',
    oneLinerEN: 'Not unwanted — actively alone. A hedgehog with spikes outside and a soft heart inside.',
    deepAnalysisCN:
      'SOLO 孤儿和 MONK 不一样。MONK 是放下一切欲望，SOLO 是「我想要连接但不想被伤害」。他们的画像是「核心价值 S3 H、人生意义 A3 H、边界 E3 H——他们知道自己要什么，但依恋 E1 L 和情感投入 E2 L——他们不敢真的靠近别人。\n\nSOLO 的童年大概率有一段「被抛弃」或「早熟」的记忆——可能是父母忙到无暇顾及，可能是亲密关系里受过伤，可能是长期「照顾别人」的角色让他们累了。他们学到的第一个生存法则是「靠自己」。到成年后这个法则变成了本能：能一个人做的事绝不求人，能一个人承受的情绪绝不倾诉，能一个人搞定的问题绝不拉别人。\n\n典型 SOLO 的日常：一个人去电影院看午夜场，一个人去吃火锅（就是那种社会争议型的一个人），一个人搬家、一个人拼家具、一个人去医院挂号、一个人过生日、一个人跨年。但神奇的是，他们不觉得凄凉，反而有一种「别人不理解但我挺享受」的自豪感。\n\n但 SOLO 的隐痛是：他们的「独立」是一面盾牌，不是一个选择。他们会在深夜刷到「情侣一起做饭」的视频时偷偷羡慕，会在同事聚会被叫上时犹豫 5 秒才说「算了我还是不去了」，会在生病的时候一个人叫外卖时突然想哭。他们不是真的不需要人，是不敢再一次把自己交给一个可能不会接住的人。\n\n爱情里 SOLO 需要一个「有耐心、不逼近、允许他们慢慢靠近」的人——THIN-K、MONK、另一个 SOLO 都可以。最糟糕是 LOVE-R（吓死 SOLO）、MUM（过度关心会触发 SOLO 的防御）。\n\n给 SOLO 的建议：你的刺是有用的，但刺不等于你。下次当你想说「算了我自己来吧」的时候，强迫自己说出「能帮我一下吗」这 5 个字。不是为了证明你需要别人，而是为了让自己相信——你可以被帮助，而这个世界不会立刻因此而崩塌。每一次允许别人靠近一点，都是在给未来的自己铺路。',
    deepAnalysisEN:
      "SOLO is not MONK. MONK renounces desire. SOLO wants connection but refuses to be hurt again. Their profile: high core value, high meaning, high boundaries — SOLO knows what they want. But low attachment and low emotional investment — SOLO is scared to get close.\n\nSOLO's origin story usually involves early abandonment or parentification: parents too busy, early heartbreak, or being the 'responsible one' for too long. The first survival rule: self-reliance. By adulthood it's reflex — if I can do it alone, I don't ask; if I can process it alone, I don't share; if I can solve it alone, I don't bother others.\n\nA typical SOLO day: solo movie at midnight, solo hotpot (yes, the socially controversial version), solo moving day, solo furniture assembly, solo hospital visit, solo birthday, solo new year. Strangely, they don't feel pitiful — they feel a subtle 'you don't get it but I love this' pride.\n\nThe hidden pain: their independence is a shield, not just a choice. SOLO secretly envies couple-cooking videos at 2am. Hesitates five seconds before declining an office gathering. Orders delivery alone while sick and suddenly wants to cry. They aren't indifferent — they're just scared to hand themselves to someone who might not catch them.\n\nIn love SOLO needs patience, no pressure, permission to approach slowly — THIN-K, MONK, another SOLO. Worst matches: LOVE-R (terrifies them), MUM (over-care triggers defenses).\n\nGrowth: your spikes are useful, but they're not you. Next time you catch yourself saying 'I'll just do it myself,' force out the five words 'can you help me' instead. Not to prove you need people, but to prove to yourself that you can be helped and the world won't end. Every small opening is a brick in the bridge you'll need later.",
    strengthsCN: [
      '极度独立，问题解决能力拉满',
      '边界清晰，不会被他人操控',
      '自我价值不依赖他人',
      '关键时刻极度冷静',
    ],
    strengthsEN: [
      'Extreme independence; problem-solving on hard mode.',
      'Clear boundaries; immune to manipulation.',
      'Self-worth independent of others.',
      'Ice-cold composure in crisis.',
    ],
    weaknessesCN: [
      '害怕真正的亲密关系',
      '宁愿受苦也不求助',
      '把防御机制当成美德',
      '孤独积累会突然崩塌',
    ],
    weaknessesEN: [
      'Terrified of real intimacy.',
      'Would rather suffer than ask for help.',
      'Confuses defense mechanisms with virtue.',
      'Accumulated loneliness can collapse suddenly.',
    ],
    famousExamplesCN: ['《这个杀手不太冷》里的里昂', '《孤独的美食家》井之头五郎'],
    famousExamplesEN: ['Leon (The Professional)', 'Saga Norén (The Bridge)', 'Every lone protagonist in a noir'],
    compatibleTypes: ['THIN-K', 'MONK', 'OJBK'],
    conflictTypes: ['LOVE-R', 'MUM', 'SEXY'],
    recommendations: {
      movies: {
        zh: ['《荒野生存》', '《爱尔兰人》', '《一一》'],
        en: ['Into the Wild', 'Drive', 'Lost in Translation'],
      },
      songs: {
        zh: ['《一个人》- 孙燕姿', '《孤独的人是可耻的》- 张楚', '《City of Stars》'],
        en: ['I\'m a Loner — Bob Dylan', 'Boulevard of Broken Dreams — Green Day', 'Alone — Heart'],
      },
      activities: {
        zh: ['一个人去陌生城市住一晚', '写一封给未来自己的信', '参加一次匿名互助小组'],
        en: ['Solo weekend in an unfamiliar city', 'Write a letter to your future self', 'Attend one anonymous support group'],
      },
      gifts: {
        zh: ['一副降噪耳机', '一本孤独主题的书', '一个品质好的单人用具'],
        en: ['Noise-cancelling headphones', 'A book on solitude (Storr, not the cheesy kind)', 'A quality one-person tool'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 孤儿人格解读 | SOLO 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI SOLO Personality - Complete Guide to The Lone Wolf',
      metaDescCN: 'SBTI SOLO 孤儿人格全面解析：独狼画像，15 维度特征、情感配对与如何让刺变软。',
      metaDescEN: 'Complete SBTI SOLO personality guide: The Lone Wolf. Self-reliance as armor, the fear of intimacy, and how to let one brick fall from the wall.',
      keywordsCN: ['sbti SOLO', 'sbti SOLO 意思', 'sbti 孤儿', 'sbti SOLO 配对', 'sbti 独狼人格', 'sbti 独立人格'],
      keywordsEN: ['sbti SOLO', 'sbti SOLO meaning', 'sbti lone wolf', 'sbti SOLO compatibility', 'sbti independent type'],
    },
  },

  // ==========================================================================
  // 23. FUCK — 草者
  // ==========================================================================
  {
    code: 'FUCK',
    slug: 'fuck',
    nameCN: '草者',
    nameEN: 'The Wildling',
    emoji: '🌿',
    color: '#16A34A',
    pattern: 'HLM-LLL-LHL-HHM-HLH',
    dimensionScores: t({
      S1_selfConfidence: 'H',
      S2_selfClarity: 'L',
      S3_coreValue: 'M',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'L',
      A1_worldview: 'L',
      A2_flexibility: 'H',
      A3_meaning: 'L',
      Ac1_motivation: 'H',
      Ac2_decisionStyle: 'H',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'L',
      So3_expression: 'H',
    }),
    tagline: { zh: '除草剂都杀不死的野生灵魂', en: 'Weed-killer-proof wild soul' },
    oneLinerCN: '别人说 yes 的时候他说 fuck you，别人说 no 的时候他也说 fuck you。',
    oneLinerEN: "When everyone says yes, they say fuck you. When everyone says no, they also say fuck you.",
    deepAnalysisCN:
      'FUCK 草者是 SBTI 里最叛逆的类型。他们的画像是「自信 S1 H、灵活度 A2 H、动机 Ac1 H、社交主动性 So1 H」，但「边界 E3 L、依恋 E1 L、世界观 A1 L」——他们不相信世界有任何规则值得遵守，但他们有足够的精力去撕毁所有规则。\n\nFUCK 不是小丑，不是段子手，不是装叛逆给别人看。他们是**真的不怕**。别人说「你这样会被开除」，他说「那就开除呗」；别人说「你这样会没朋友」，他说「朋友又不能吃」；别人说「你这样父母会伤心」，他说「那是他们的课题不是我的」。他们的口头禅是「随便」、「关我屁事」、「爱谁谁」。\n\n但 FUCK 不是虚无主义——他们的「fuck」是一种**主动选择**。他们清楚地知道世界运行的潜规则，他们只是拒绝玩这个游戏。他们去上班但拒绝 996，他们谈恋爱但拒绝结婚，他们赚钱但拒绝买房，他们有能力但拒绝晋升。他们是那种「年薪 50 万但住合租房，周末睡地铺去音乐节」的人。\n\n典型 FUCK 的一天：早上 11 点起床（迟到但不在乎），到公司直接怼领导的愚蠢决定（领导气到但不敢开他因为他是核心员工），中午和同事聊天直接说「你那份 PPT 做得真烂」（同事一开始气后来变成尊敬），下午开会睡着了被叫醒说「抱歉我觉得这会议没意义」，下班直接走人不打卡，晚上和一群奇怪的人去小酒馆聊虚无主义到凌晨 3 点。\n\nFUCK 的可爱之处是他们的**真实**。他们从不假装，不做作，不社交面具，不委屈自己。在一个充满 FAKE 和 CTRL 的世界里，FUCK 是一股野风。他们身边总会聚集一小群「我受够了装」的人，把他们当精神领袖。\n\n但 FUCK 的隐痛是：他们的「不在乎」有时是因为不知道怎么在乎。他们的依恋 L 让他们很难建立深度关系——不是他们不想，是他们根本不知道怎么让一个人走进自己的心。他们的「自由」有时是一种孤独。\n\n爱情里 FUCK 最配的是另一个 FUCK，或者同样叛逆但稳定的 SHIT。最不配的是 CTRL（规则 vs 反规则）和 FAKE（真实 vs 表演）。\n\n给 FUCK 的建议：你的叛逆是宝贵的，但叛逆不是人生的全部。下一次你对一件事说 fuck 之前，先问自己「我是真的不在乎，还是我不敢在乎」。如果是不敢在乎——那才是需要面对的东西。真正的自由不是拒绝一切，是选择性地接受你愿意珍惜的那几样。',
    deepAnalysisEN:
      "FUCK is SBTI's most rebellious type. Profile: high self-confidence, high flexibility, high motivation, high social initiative — but low boundaries, low attachment, low worldview. FUCK doesn't believe any rule deserves obedience, and FUCK has enough energy to tear every rule apart.\n\nFUCK is not JOKE-R (the clown) or SHIT (the bitter critic) — FUCK is genuinely unafraid. 'You'll get fired' — 'so fire me.' 'You'll lose friends' — 'friends aren't food.' 'Your parents will be sad' — 'that's their homework, not mine.' Catchphrases: whatever, none of my business, love it or leave.\n\nBut FUCK is not nihilistic. The 'fuck' is an active choice. FUCK understands the system's hidden rules — FUCK just refuses to play. Shows up to work but rejects 996. Dates but refuses marriage. Earns but refuses home-buying. Gets promoted offers and laughs. The type who makes 500K but rents a shared room and crashes music festivals on weekends.\n\nA typical day: wakes at 11 (late but doesn't care). Walks into the office and tells the boss their decision is stupid (boss furious but can't fire him — he's core). At lunch tells a coworker 'your deck is terrible' (coworker first pissed, then respectful). Falls asleep in a meeting, wakes up, says 'sorry, this meeting is pointless.' Leaves without clocking out. Spends evening with strangers at a bar debating nihilism until 3am.\n\nFUCK's charm is authenticity. No acting, no masks, no self-compromise. In a world full of FAKE and CTRL, FUCK is a wild wind. A small crowd of 'I'm sick of performing' people always gathers around FUCK as spiritual leaders.\n\nHidden pain: FUCK's 'not caring' is sometimes a cover for 'not knowing how to care.' Their low attachment makes deep relationships hard — not unwilling, just without a manual for letting someone in. Their freedom is occasionally just loneliness with better branding.\n\nIn love: best with another FUCK, or SHIT (same rebellion, different flavor). Worst: CTRL (rules vs anti-rules), FAKE (real vs performance).\n\nGrowth: your rebellion is valuable, but it's not your whole self. Before the next 'fuck it,' ask: am I genuinely not caring, or am I afraid to care? If it's the second one — that's the thing to face. Real freedom isn't rejecting everything. It's selectively keeping the few things worth keeping.",
    strengthsCN: [
      '极度真实，零伪装',
      '敢说敢做，不怕得罪人',
      '精力充沛，执行力强',
      '天然的领袖气场',
    ],
    strengthsEN: [
      'Radical authenticity; zero masks.',
      'Speaks and acts without fear.',
      'High energy, strong execution.',
      'Natural charisma.',
    ],
    weaknessesCN: [
      '把「不在乎」当成人生哲学',
      '难以建立深度关系',
      '有时把叛逆当成目的',
      '容易给身边人带来麻烦',
    ],
    weaknessesEN: [
      'Treats indifference as a life philosophy.',
      'Struggles with deep relationships.',
      'Sometimes rebels just to rebel.',
      'Creates collateral damage for people nearby.',
    ],
    famousExamplesCN: ['《猜火车》的 Renton', '《搏击俱乐部》的 Tyler Durden', '大部分摇滚明星'],
    famousExamplesEN: ['Tyler Durden (Fight Club)', 'Renton (Trainspotting)', 'Pete Doherty'],
    compatibleTypes: ['SHIT', 'JOKE-R', 'MALO'],
    conflictTypes: ['CTRL', 'FAKE', 'MUM'],
    recommendations: {
      movies: {
        zh: ['《搏击俱乐部》', '《低俗小说》', '《发条橙》'],
        en: ['Fight Club', 'Trainspotting', 'A Clockwork Orange'],
      },
      songs: {
        zh: ['《Fuck You》- 不管哪首', '《蹦迪治大病》', '《野狼 disco》'],
        en: ['Fuck You — Lily Allen', 'Smells Like Teen Spirit — Nirvana', 'Bombtrack — Rage Against the Machine'],
      },
      activities: {
        zh: ['去一次朋克音乐节', '请一天无理由假', '把一条没必要的规则故意破坏一次'],
        en: ['Go to a punk festival', 'Take a no-reason day off', 'Deliberately break one pointless rule'],
      },
      gifts: {
        zh: ['一件 middle finger T 恤', '一本反叛题材的书', '一瓶好酒'],
        en: ['A middle-finger T-shirt', 'A rebellion-themed book', 'A good bottle of whiskey'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 草者人格解读 | FUCK 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI FUCK Personality - Complete Guide to The Wildling',
      metaDescCN: 'SBTI FUCK 草者人格全面解析：最叛逆的野生灵魂，15 维度特征、情感配对与反叛边界。',
      metaDescEN: 'Complete SBTI FUCK personality guide: The Wildling. Active rebellion, authentic freedom, and the difference between "don\'t care" and "can\'t care".',
      keywordsCN: ['sbti FUCK', 'sbti FUCK 意思', 'sbti 草者', 'sbti FUCK 配对', 'sbti 叛逆人格', 'sbti 反规则'],
      keywordsEN: ['sbti FUCK', 'sbti FUCK meaning', 'sbti wildling', 'sbti FUCK compatibility', 'sbti rebel type'],
    },
  },

  // ==========================================================================
  // 24. DEAD — 死者
  // ==========================================================================
  {
    code: 'DEAD',
    slug: 'dead',
    nameCN: '死者',
    nameEN: 'The Departed',
    emoji: '🪦',
    color: '#525252',
    pattern: 'LLL-LLL-LHL-LLL-LHM',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'L',
      S3_coreValue: 'L',
      E1_attachment: 'L',
      E2_emotionalInvest: 'L',
      E3_boundary: 'L',
      A1_worldview: 'L',
      A2_flexibility: 'H',
      A3_meaning: 'L',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'L',
      So2_interpersonal: 'H',
      So3_expression: 'M',
    }),
    tagline: { zh: '通关删档 999 次的那种', en: 'Deleted save file 999 times and counting' },
    oneLinerCN: '别人说「躺平」，你说「躺平？我连躺的力气都没有。」',
    oneLinerEN: "Everyone says 'lying flat.' You say 'lying flat? I don't even have the energy to lie down.'",
    deepAnalysisCN:
      "你是 DEAD，通关删档 999 次的那种。\n\n别人说「躺平」，你说「躺平？我连躺的力气都没有」。你的人生就像一部 Netflix 独播剧，预告片拍得天花乱坠，正片第一集就被导演宣布「因为主角拒绝出场所以剧集提前完结」。\n\n你不是懒，你是对「努力」这个概念产生了深度怀疑——如果努力的尽头还是一样的烂摊子，那为什么不从源头放弃？这不叫摆烂，这叫**结构性清醒**。\n\nDEAD 的画像是 SBTI 里最低能量的：15 个维度里 13 个是 L。你不是因为一次打击倒下，你是**慢慢地、系统性地**把每一个「想活下去的理由」拆掉了。你曾经相信努力会有回报，后来发现不会；你曾经相信爱情会永恒，后来发现会过期；你曾经相信父母会理解你，后来发现他们只理解KPI；你曾经相信未来会更好，后来发现未来就是这样。\n\n典型 DEAD 的一天：早上闹钟响 8 次全部按掉，最后因为上厕所才起床；打开微信假装回消息但其实只是长按标为已读；到公司在工位发呆 30 分钟才开始打开文档；中午吃外卖的时候刷短视频刷到一半睡着了；下午开会的时候灵魂出窍在想「如果我现在猝死了他们会怎样」；下班回家躺在床上刷手机到凌晨 2 点；脑子里想了 50 件明天要做的事，一件也没做，才能入睡。\n\nDEAD 的超能力是**无所谓**。别人为了加薪熬夜，DEAD 说「给我加薪也救不活我」；别人为了爱情写诗，DEAD 说「写诗的时间不如躺着」；别人为了梦想奋斗，DEAD 说「梦想是给有力气的人的」。在一个到处都是 BOSS 和 CTRL 的世界里，DEAD 是一面反光镜，照出所有人「拼命活着到底为了什么」的荒谬。\n\n但 DEAD 不是真的想死——这是最大的误解。DEAD 是**想活但不知道怎么活**。他们的能量低不是懒，是被无数次「这次应该会好的」失望磨光了。他们不相信「明天会更好」，但他们也不想主动结束——他们只是**想暂停**，想把人生按一个暂停键，歇一会儿，再决定要不要继续。\n\n爱情里 DEAD 需要的是一个「不推动、不鸡汤、只陪伴」的人。MUM 可以（前提是 MUM 不过度救赎），另一个 DEAD 可以（两个低能量反而互不消耗），OJBK 可以（佛系陪伴）。最糟糕是 BOSS（「打起精神来」会让 DEAD 更想死）和 LOVE-R（情感投入太多 DEAD 承接不住）。\n\n给 DEAD 的建议：不要试图突然「振作起来」——那只是另一种形式的内耗。你要做的是**最小单位的活着**：今天成功刷牙了，记一分；今天吃了一顿饭，记一分；今天给一个朋友发了消息，记一分。不是为了什么目标，就是为了证明「我还在」。等这些小分数累积到一定程度，你会发现自己慢慢有了一点点想动的力气。不要着急，死者复活不是一个爆炸，是一场缓慢的回温。",
    deepAnalysisEN:
      "You're DEAD — the 'deleted the save file 999 times' kind.\n\nOthers say 'lying flat.' You say 'lying flat? I don't even have the energy to lie down.' Your life is a Netflix exclusive whose trailer was a blockbuster but whose first episode was canceled 'because the lead refused to show up.'\n\nYou're not lazy. You've developed deep skepticism toward the concept of 'effort.' If effort still ends in the same mess, why not quit at the source? This isn't giving up. This is **structural clarity**.\n\nDEAD's 15-dimension profile is the lowest-energy in SBTI — 13 out of 15 are L. You didn't collapse from one blow. You **systematically** dismantled every 'reason to stay alive.' You once believed effort paid off. Then found out it didn't. You believed love was permanent. Then found out it expires. You believed your parents would understand you. Then found out they only understand KPI. You believed the future would be better. Then found out this is the future.\n\nA typical DEAD day: alarm hits 8 times, all dismissed, eventually gets up because of the bathroom. Opens WeChat, pretends to reply, actually just long-presses to mark as read. 30 minutes of staring at the desk before opening a document. Falls asleep mid-TikTok while eating delivery lunch. Out-of-body during afternoon meeting thinking 'if I died right now, what would they do?' Scrolls phone until 2am. Mentally lists 50 things to do tomorrow, does zero, finally sleeps.\n\nDEAD's superpower: **not giving a shit**. Others burn out for raises — DEAD says 'a raise won't save me.' Others write poems for love — DEAD says 'writing poems takes energy I don't have.' Others chase dreams — DEAD says 'dreams are for people with energy.' In a world of BOSS and CTRL, DEAD is a mirror reflecting the absurdity of 'working so hard to stay alive.'\n\nBut DEAD isn't actually suicidal — this is the biggest misreading. DEAD **wants to live but doesn't know how**. Their low energy isn't laziness. It's exhaustion from being let down too many times by 'this time will be different.' They don't believe tomorrow will be better, but they don't want to end it either — they want to **pause**. Hit a pause button on life, rest for a while, then decide whether to continue.\n\nIn love DEAD needs someone who doesn't push, doesn't preach, just stays. MUM works (if MUM doesn't over-save). Another DEAD works (two low-energies don't drain each other). OJBK works. Worst: BOSS ('cheer up!' makes DEAD want to die more), LOVE-R (too much emotional investment — DEAD can't hold it).\n\nGrowth: don't try to 'snap out of it' — that's just another form of self-destruction. Do the **smallest unit of being alive**: brushed teeth today, one point. Ate one meal, one point. Sent one text to a friend, one point. Not toward a goal. Just proof of presence. As these points accumulate, you'll notice a tiny amount of motion energy returning. Don't rush. DEAD doesn't come back as an explosion. It comes back as a slow re-warming.",
    strengthsCN: [
      '对世界幻觉最清醒，不会被骗',
      '无欲则刚，没有可以威胁到的点',
      '能接住其他摆烂型朋友',
      '一旦有真热爱会爆发（罕见）',
    ],
    strengthsEN: [
      'Clearest view of the world; unscammable.',
      'No desires, no pressure points.',
      'Holds space for other burned-out friends.',
      'When a rare passion hits, it explodes.',
    ],
    weaknessesCN: [
      '能量长期过低，容易陷入真抑郁',
      '对积极情绪过敏，鸡汤反杀',
      '无法主动建立关系',
      '让家人朋友极度担心',
    ],
    weaknessesEN: [
      'Chronically low energy; depression-adjacent.',
      'Allergic to positivity; motivational content backfires.',
      'Cannot initiate relationships.',
      'Causes deep worry in family and friends.',
    ],
    famousExamplesCN: ['《海边的曼彻斯特》李', '《三体》中的大史（压力时期）', '大部分 Gen Z 打工人'],
    famousExamplesEN: ['Lee (Manchester by the Sea)', 'BoJack Horseman (post-season 3)', 'Every "failure to launch" protagonist'],
    compatibleTypes: ['MUM', 'OJBK', 'DEAD'],
    conflictTypes: ['BOSS', 'LOVE-R', 'GOGO'],
    recommendations: {
      movies: {
        zh: ['《海边的曼彻斯特》', '《海上钢琴师》', '《被嫌弃的松子的一生》'],
        en: ['Manchester by the Sea', 'Melancholia', 'Synecdoche, New York'],
      },
      songs: {
        zh: ['《晚安》- 张悬', '《告别的时代》', '《漠河舞厅》'],
        en: ['Hurt — Johnny Cash', 'Mad World — Gary Jules', 'Everybody Hurts — R.E.M.'],
      },
      activities: {
        zh: ['不设目标地睡一整天', '看一部慢电影', '给自己做最简单的一顿饭'],
        en: ['Sleep one full day with no goal', 'Watch one slow film', 'Cook your simplest possible meal'],
      },
      gifts: {
        zh: ['一个超软的抱枕', '一张眼罩', '一个不需要回复的小纸条'],
        en: ['The softest blanket', 'A sleep mask', 'A note that requires no response'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 死者人格解读 | DEAD 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI DEAD Personality - Complete Guide to The Departed',
      metaDescCN: 'SBTI DEAD 死者人格全面解析：终极摆烂型画像，15 维度特征、情感配对与如何慢慢回温。',
      metaDescEN: 'Complete SBTI DEAD personality guide: The Departed. Structural exhaustion, anti-motivation clarity, and how to come back to life in micro-doses.',
      keywordsCN: ['sbti DEAD', 'sbti DEAD 意思', 'sbti 死者', 'sbti DEAD 配对', 'sbti 摆烂人格', 'sbti 躺平人格'],
      keywordsEN: ['sbti DEAD', 'sbti DEAD meaning', 'sbti departed', 'sbti DEAD compatibility', 'sbti lying flat type', 'sbti burnout type'],
    },
  },

  // ==========================================================================
  // 25. IMFW — 废物
  // ==========================================================================
  {
    code: 'IMFW',
    slug: 'imfw',
    nameCN: '废物',
    nameEN: 'The Self-Crusher',
    emoji: '💀',
    color: '#737373',
    pattern: 'LLL-HHL-LLL-LLL-MLL',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'L',
      S3_coreValue: 'L',
      E1_attachment: 'H',
      E2_emotionalInvest: 'H',
      E3_boundary: 'L',
      A1_worldview: 'L',
      A2_flexibility: 'L',
      A3_meaning: 'L',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'L',
      So1_socialInit: 'M',
      So2_interpersonal: 'L',
      So3_expression: 'L',
    }),
    tagline: { zh: '对自己下手比任何人都狠', en: 'Harder on myself than anyone else could ever be' },
    oneLinerCN: '别人骂你一句你记三年，你骂自己一句当早餐吃。',
    oneLinerEN: 'Others insult you once — you remember for three years. You insult yourself daily — it\'s just breakfast.',
    deepAnalysisCN:
      'IMFW 废物和 DEAD 的区别是：DEAD 是对世界绝望，IMFW 是对自己绝望。他们的画像是「自信 S1 L、自我清晰度 S2 L、核心价值 S3 L、人生意义 A3 L」——四个「自我相关」的维度全部触底。但「依恋 E1 H、情感投入 E2 H」——他们极度在乎别人的评价。这种组合极度危险：对自己评价极低 + 对他人评价极度敏感 = 持续的自我折磨。\n\nIMFW 的口头禅：「对不起」、「我不配」、「是我的问题」、「都怪我」、「我太差了」、「我真的是个废物」。他们会把所有的问题都归因于自己——工作出错是「我太蠢了」，朋友不联系是「我不值得被喜欢」，父母生气是「我让他们失望了」，恋人分手是「我就是个烂人」。他们的自我对话是一种持续的精神暴力。\n\n典型 IMFW 的一天：早上起床看镜子觉得「今天又要出去给世界添麻烦了」；上班时做了一件小错事自责 2 小时；同事没回消息觉得「她肯定是讨厌我」；中午自己吃饭觉得「没人想和我一起吃」；下午被领导批评一句「你要再努力点」，整个下午在脑子里重复这句话 100 遍；下班回家路上觉得「地铁这么挤但没人愿意和我说话是不是我长得太丑」；晚上睡前列了一张「我今天做错的 20 件事」清单，哭着睡着。\n\nIMFW 的根源通常是童年的**条件性关爱**：父母只在他们「听话/考高分/懂事」时给予爱，在他们犯错时立刻撤回。长大后他们内化了这个机制，变成自己的审判者。每次犯错都会自动启动「这是你不配被爱的证据」程序。\n\nIMFW 的痛苦是别人很难理解的——外表看他们可能很正常，甚至很善良、很体贴（因为他们极度怕得罪人），但内部是一个永远在开庭的自我审判法庭。他们会对一个 10 年前的尴尬瞬间还在自责，会把一个同事的客气当成「他其实讨厌我」，会把一个陌生人的微笑解读为「他可能在讽刺我」。\n\n爱情里 IMFW 最需要的是一个「无条件爱 + 不断肯定」的人——MUM、THAN-K 是最好的搭档。最糟糕是 BOSS、CTRL（批评型对他们是慢性毒药）和 FAKE（真假混杂会让 IMFW 崩溃）。\n\n给 IMFW 的建议：你不是一个废物。你是一个长期被条件性关爱训练出来的、过度自我批判的人。这两个是不同的。你需要练习一件事：**把你对朋友说话的温柔，说给自己听**。下次你想说「我真的是个废物」的时候，停下来问自己：「如果我的好朋友这样说，我会怎么回应她？」然后把那个回应说给自己。一次不够，一千次才够。但每一次都在松动那个监狱的铁栏。',
    deepAnalysisEN:
      "IMFW is different from DEAD. DEAD despairs of the world. IMFW despairs of themselves. Profile: all four 'self' dimensions bottomed out (self-confidence, self-clarity, core values, life meaning). But extremely high attachment and emotional investment — they care desperately about others' opinions. This combination is dangerous: rock-bottom self-evaluation plus hypersensitivity to external opinion equals ongoing self-torture.\n\nCatchphrases: 'sorry,' 'I don't deserve it,' 'my fault,' 'I'm the problem,' 'I'm trash.' They attribute every problem to themselves — work error: 'I'm stupid.' Friend doesn't text: 'I'm unlovable.' Parents angry: 'I disappointed them.' Partner leaves: 'I'm a waste.' Their inner monologue is a form of sustained psychological violence.\n\nA typical day: wakes up, looks in the mirror, thinks 'another day of burdening the world.' Makes a small work mistake and self-flagellates for two hours. A coworker doesn't reply — 'she obviously hates me.' Eats lunch alone — 'nobody wants to eat with me.' Boss says 'try harder' — repeats those two words 100 times until bedtime. On the crowded subway — 'nobody's talking to me because I'm ugly.' Before sleep, writes a mental list of '20 things I did wrong today,' cries to sleep.\n\nThe root is usually childhood **conditional love**: parents only gave affection when the kid was 'good/high-scoring/well-behaved,' retracted love at mistakes. In adulthood they internalized that mechanism and became their own judge. Every mistake auto-triggers the 'evidence you don't deserve love' program.\n\nIMFW's pain is invisible to others. Outwardly they often look normal — even kind, even thoughtful (because they're terrified of offending anyone). Internally: a courtroom in permanent session. Still self-flagellating over a 10-year-old awkward moment. Reads a coworker's politeness as hidden hatred. Interprets a stranger's smile as mockery.\n\nIn love IMFW needs unconditional love plus constant affirmation — MUM, THAN-K are best matches. Worst: BOSS, CTRL (criticism is slow poison), FAKE (mixed signals cause total collapse).\n\nGrowth: you are not trash. You are a person who was trained by conditional love into chronic self-criticism. Those are different. Practice one thing: **the gentleness you use with friends — use it on yourself**. Next time 'I'm trash' arrives, pause and ask: 'if my best friend said this, what would I tell her?' Then say that to yourself. Once isn't enough. A thousand times is. Each time weakens one bar of the cell.",
    strengthsCN: [
      '共情能力极强，永远能理解别人的痛',
      '责任感强，从不推卸',
      '对他人极度温柔（虽然对自己很狠）',
      '自我反思能力高',
    ],
    strengthsEN: [
      'Extreme empathy; always understands pain.',
      'Deeply responsible; never shifts blame.',
      'Gentle with others (even though harsh with self).',
      'High capacity for self-reflection.',
    ],
    weaknessesCN: [
      '持续的自我攻击，容易抑郁',
      '把所有问题内归因',
      '无法接受赞美',
      '为了不被讨厌长期讨好',
    ],
    weaknessesEN: [
      'Ongoing self-attack; depression-prone.',
      'Internalizes every problem.',
      'Cannot accept compliments.',
      'Chronic people-pleasing to avoid rejection.',
    ],
    famousExamplesCN: ['《被嫌弃的松子的一生》松子后期', '大部分在内耗的打工人'],
    famousExamplesEN: ['Kafka\'s protagonists', 'Fleabag (deep cuts)', 'Most people in therapy processing childhood'],
    compatibleTypes: ['MUM', 'THAN-K', 'OJBK'],
    conflictTypes: ['BOSS', 'CTRL', 'FAKE'],
    recommendations: {
      movies: {
        zh: ['《被嫌弃的松子的一生》', '《鲸》', '《心灵捕手》'],
        en: ['The Whale', 'Good Will Hunting', 'Lady Bird'],
      },
      songs: {
        zh: ['《爱的代价》- 李宗盛', '《怀念谁》', '《如果还有明天》'],
        en: ['Skinny Love — Bon Iver', 'The Scientist — Coldplay', 'Black — Pearl Jam'],
      },
      activities: {
        zh: ['写一封「我值得」清单', '找心理咨询（真的）', '给最好的朋友打一个电话'],
        en: ['Write an "I deserve" list', 'Book an actual therapy session', 'Call your best friend'],
      },
      gifts: {
        zh: ['一本自我关怀的书', '一个治愈系抱枕', '一张「你做得很好」的卡片'],
        en: ['A self-compassion book (Kristin Neff)', 'A weighted blanket', 'A "you are enough" note'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 废物人格解读 | IMFW 类型特征、配对、优缺点',
      metaTitleEN: 'SBTI IMFW Personality - Complete Guide to The Self-Crusher',
      metaDescCN: 'SBTI IMFW 废物人格全面解析：自我攻击型画像，15 维度特征、情感配对与自我关怀练习。',
      metaDescEN: 'Complete SBTI IMFW personality guide: The Self-Crusher. Conditional-love roots, chronic self-criticism, and the first self-compassion exercise.',
      keywordsCN: ['sbti IMFW', 'sbti IMFW 意思', 'sbti 废物', 'sbti IMFW 配对', 'sbti 自我攻击', 'sbti 自卑'],
      keywordsEN: ['sbti IMFW', 'sbti IMFW meaning', 'sbti self-crusher', 'sbti IMFW compatibility', 'sbti low self-esteem type'],
    },
  },

  // ==========================================================================
  // 26. HHHH — 傻乐者（兜底类型）
  // ==========================================================================
  {
    code: 'HHHH',
    slug: 'hhhh',
    nameCN: '傻乐者',
    nameEN: 'The Wildcard',
    emoji: '🤪',
    color: '#EC4899',
    pattern: 'MMM-MMM-MMM-MMM-MMM',
    dimensionScores: t({
      S1_selfConfidence: 'M',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'M',
      E2_emotionalInvest: 'M',
      E3_boundary: 'M',
      A1_worldview: 'M',
      A2_flexibility: 'M',
      A3_meaning: 'M',
      Ac1_motivation: 'M',
      Ac2_decisionStyle: 'M',
      Ac3_execution: 'M',
      So1_socialInit: 'M',
      So2_interpersonal: 'M',
      So3_expression: 'M',
    }),
    tagline: { zh: '系统兜底，随缘而存', en: 'System fallback — just vibing' },
    oneLinerCN: '你的匹配度太低，没有一种人格能精准描述你——恭喜，你是宇宙级 wildcard。',
    oneLinerEN: "Your match score is too low for any standard type. Congrats — you're a cosmic-level wildcard.",
    deepAnalysisCN:
      'HHHH 是 SBTI 的兜底类型——当你的测试结果在 15 个维度上没有和任何一个标准类型的匹配度超过 60% 时，系统会把你归入 HHHH。理论占比 0.06%，大约每 1700 人才有一个。\n\nHHHH 的含义不是「你没个性」，恰恰相反——**你的灵魂太复杂，任何一个单一标签都无法装下**。你既不是完全的 DEAD，也不是完全的 BOSS；你既有 SEXY 的一面，也有 SOLO 的一面；你在某些时刻像 JOKE-R，在另一些时刻像 MONK。你是一个 hybrid，一个非典型样本，一个让算法投降的存在。\n\n这可能说明几件事：\n\n**一、你正在转型期**。也许你最近经历了重大变化——分手、搬家、换工作、亲人离世、精神觉醒——你的旧人格正在瓦解，新人格尚未成型。在这个过渡期，你的答题会在「旧的我」和「新的我」之间摇摆，所以分数是混乱的。过几个月再测，你可能会变成一个清晰的类型。\n\n**二、你就是混乱的**。有一种人天生就是多面体——他们对自己有足够的认知，但这个认知包含多个不可调和的矛盾。他们可以同时是内向的外向者，理性的感性派，积极的悲观主义者。他们不是「不确定自己」，他们是**确定自己就是这么不确定**。\n\n**三、你在测试时没有诚实回答**。也有可能你答题时半真半假——一半是你真实的想法，一半是「你希望自己是什么样的」。这种混合会让算法找不到方向，最后把你推到 HHHH 的兜底区。\n\nHHHH 的人通常有一种**局外人**气质——他们能看到所有类型的共性和差异，但不完全归属于任何一个。他们是最好的观察者、评论员、艺术家、心理咨询师——因为他们不站在任何一派。\n\n但 HHHH 的隐痛是**没有归属感**。当所有人都在朋友圈晒「我是 DEAD」「我是 BOSS」的时候，HHHH 看着自己的结果会有点困惑——「我是什么？」这个困惑是真实的。你不是没有特征，你是特征太杂。\n\n爱情里 HHHH 可以和任何类型擦出火花，但最稳定的伴侣是同样复杂的另一个 HHHH，或是包容度高的 THAN-K、MUM。避免 CTRL（想把你塞进盒子）和 BOSS（想简化你）。\n\n给 HHHH 的建议：不要急着把自己塞进一个标签。你的「无法被定义」是你最大的自由。但如果长期的无归属感让你痛苦，请在当下做一件小事——**选择一个你想靠近的方向**。不必永远，只是这一周。下周再选另一个。在这种流动中，你会逐渐发现：真正的自由不是没有方向，是选择方向的能力。',
    deepAnalysisEN:
      "HHHH is SBTI's fallback type — when your 15-dimension scores don't match any standard type above 60%, the system assigns you HHHH. Theoretical population: 0.06%. Roughly 1 in 1700.\n\nHHHH doesn't mean 'you have no personality.' The opposite: **your soul is too complex for any single label to hold**. You're not fully DEAD, not fully BOSS. You're part SEXY, part SOLO. Sometimes JOKE-R, sometimes MONK. You're a hybrid, an atypical sample, the entity that makes the algorithm surrender.\n\nThis could mean several things:\n\n**1. You're in a transition**. Maybe something big just happened — breakup, relocation, job change, loss, awakening. Your old personality is dissolving, the new one hasn't crystallized. Your answers oscillate between 'old me' and 'new me,' scrambling the math. Retest in a few months — you might become a clear type.\n\n**2. You are genuinely chaotic**. Some people are natively polyhedral. They have enough self-awareness, but that awareness contains irreconcilable contradictions. They can be introverted extroverts, rational feelers, optimistic pessimists. They aren't 'unsure of themselves' — they're **sure they're this unsure**.\n\n**3. You weren't fully honest**. Half true answers, half aspirational ones — this mixture leaves the algorithm no clear vector, and you land in the HHHH overflow bin.\n\nHHHH people typically have an **outsider** quality — they see the commonalities and differences between all types without fully belonging to any. They make excellent observers, critics, artists, therapists — because they don't sit on any side.\n\nHidden pain: **no sense of belonging**. When everyone is posting 'I'm DEAD' or 'I'm BOSS' on social media, HHHH stares at the result thinking 'what am I?' That confusion is real. Not no characteristics — too many.\n\nIn love HHHH can spark with anyone, but the steadiest partners are another HHHH, or the accommodating THAN-K/MUM. Avoid CTRL (wants to box you) and BOSS (wants to simplify you).\n\nGrowth: don't rush to force yourself into a label. Your 'undefinable' quality is your greatest freedom. If the ongoing lack of belonging hurts, do one small thing: **choose a direction you want to move toward this week**. Not forever. Just this week. Next week, choose another. In the flow, you'll discover: real freedom isn't having no direction — it's having the ability to choose one.",
    strengthsCN: [
      '观察力极强，看得见所有类型',
      '不被单一标签局限',
      '适应力拉满',
      '自带一种神秘感',
    ],
    strengthsEN: [
      'Sharp observation; sees every type clearly.',
      'Not limited by any single label.',
      'Maximum adaptability.',
      'Carries a natural mystique.',
    ],
    weaknessesCN: [
      '没有强烈的归属感',
      '容易陷入「我是谁」的循环',
      '难以被任何群体完全接纳',
      '在需要明确表态时会犹豫',
    ],
    weaknessesEN: [
      'Weak sense of belonging.',
      'Prone to "who am I" loops.',
      'Never fully accepted by any group.',
      'Hesitates in high-stakes decisions.',
    ],
    famousExamplesCN: ['David Lynch', '大部分艺术家和哲学家'],
    famousExamplesEN: ['David Lynch', 'Most artists and philosophers'],
    compatibleTypes: ['HHHH', 'THAN-K', 'THIN-K'],
    conflictTypes: ['CTRL', 'BOSS', 'FAKE'],
    recommendations: {
      movies: {
        zh: ['《穆赫兰道》', '《2001 太空漫游》', '《瞬息全宇宙》'],
        en: ['Mulholland Drive', 'Everything Everywhere All at Once', '2001: A Space Odyssey'],
      },
      songs: {
        zh: ['《时间的歌》- 雷光夏', '《北方》- 王菲', '《天空之城》'],
        en: ['Such Great Heights — The Postal Service', 'Home — Edward Sharpe', 'Float On — Modest Mouse'],
      },
      activities: {
        zh: ['读一本哲学入门', '做一次长途独自旅行', '写自由体日记一周'],
        en: ['Read an intro philosophy book', 'Take a long solo trip', 'Keep a free-form journal for a week'],
      },
      gifts: {
        zh: ['一本艺术书', '一张开放式门票', '一份意想不到的礼物'],
        en: ['An art book', 'An open-ended ticket', 'Something unexpected'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 傻乐者人格解读 | HHHH 兜底类型完整说明',
      metaTitleEN: 'SBTI HHHH Personality - The Wildcard Fallback Type',
      metaDescCN: 'SBTI HHHH 傻乐者兜底人格全面解析：匹配度<60%的特殊类型，如何理解自己的"不被定义"。',
      metaDescEN: 'Complete SBTI HHHH personality guide: The Wildcard. The fallback type when your score matches no standard profile — understanding cosmic undefinability.',
      keywordsCN: ['sbti HHHH', 'sbti HHHH 意思', 'sbti 傻乐者', 'sbti 兜底类型', 'sbti 不匹配', 'sbti wildcard'],
      keywordsEN: ['sbti HHHH', 'sbti HHHH meaning', 'sbti wildcard', 'sbti fallback type', 'sbti undefined type'],
    },
    isSpecial: 'fallback',
  },

  // ==========================================================================
  // 27. DRUNK — 酒鬼（隐藏类型）
  // ==========================================================================
  {
    code: 'DRUNK',
    slug: 'drunk',
    nameCN: '酒鬼',
    nameEN: 'The Lush',
    emoji: '🍺',
    color: '#B45309',
    pattern: 'LMM-HLM-MMM-LLM-HHH',
    dimensionScores: t({
      S1_selfConfidence: 'L',
      S2_selfClarity: 'M',
      S3_coreValue: 'M',
      E1_attachment: 'H',
      E2_emotionalInvest: 'L',
      E3_boundary: 'M',
      A1_worldview: 'M',
      A2_flexibility: 'M',
      A3_meaning: 'M',
      Ac1_motivation: 'L',
      Ac2_decisionStyle: 'L',
      Ac3_execution: 'M',
      So1_socialInit: 'H',
      So2_interpersonal: 'H',
      So3_expression: 'H',
    }),
    tagline: { zh: '酒精度数等于灵魂度数', en: 'My soul is blood-alcohol-content dependent' },
    oneLinerCN: '清醒时你是个社恐，喝一杯变人来疯，喝两杯你是整个酒吧的国王。',
    oneLinerEN: "Sober: social anxiety. One drink: life of the party. Two drinks: entire-bar royalty.",
    deepAnalysisCN:
      'DRUNK 是 SBTI 的隐藏类型——只有在测试中选择了「我周五晚会连干三杯」或类似的特定选项时才会触发。这不是巧合：**作者把这个类型专门设置给一位爱酗酒的朋友**，作为一种温柔的劝诫。如果你测到了 DRUNK，说明你的答题中透露出了对酒精的依赖倾向。这不是一个评判，是一个信号。\n\nDRUNK 的画像很分裂：社交维度 So1/So2/So3 全部 H——他们在喝酒之后是派对的灵魂；但动机 Ac1 L、决策 Ac2 L——他们清醒时极度缺乏行动力和判断力；自信 S1 L——他们不相信自己。这个组合的潜台词是：**他们需要酒精才能变成自己想成为的那个人**。\n\n典型 DRUNK 的一天：白天上班时话不多，被同事当成安静的人；到下班时间「来一杯放松一下」的想法自动启动；酒过三巡变成段子手、心理咨询师、灵魂歌手；凌晨 2 点在烧烤摊跟陌生人称兄道弟；第二天早上醒来什么都记不清只记得朋友发来「你昨天真好玩」的消息；下班前又开始期待下一轮的「放松一下」。\n\nDRUNK 的陷阱是**酒精变成了人格助推器**。他们不是真的爱酒，他们是爱那个「喝酒之后的自己」——那个敢说话、敢靠近人、敢大笑、敢表达感情的自己。清醒时的他们觉得自己太平淡、太无趣、太没意思，只有酒精能让他们觉得「我也是一个有趣的人」。\n\n但这是一个致命的骗局。酒精给的不是人格，是**屏蔽了自我批判的暂时松绑**。你以为你喝酒后变得有趣了，其实那个有趣的你一直都在，只是平时被自我批判压住了。你需要的不是更多的酒，是一种**清醒状态下让自我批判闭嘴的方法**。\n\n健康警示：如果你测到了 DRUNK，请认真考虑以下问题——\n- 你最近一周喝了几次酒？\n- 你是否有一天以上没喝酒就会感到焦虑？\n- 你是否把喝酒当成主要的社交方式？\n- 你是否因为喝酒做出过后悔的决定？\n\n如果其中 2 条以上是「是」，**这可能是酒精依赖的早期信号**。SBTI 是一个恶搞测试，但这个提醒是真的。请考虑和医生或心理咨询师谈一谈。\n\n爱情里 DRUNK 需要的是一个「即使你清醒时很无聊也爱你」的人——THAN-K 最好，MUM 也可以。最糟糕是另一个 DRUNK（两个人一起沉沦）和 FUCK（会鼓励更多酗酒）。\n\n给 DRUNK 的建议：你要找的不是酒，是「允许自己不完美地被看见」的勇气。下一次你想开第一瓶之前，尝试在清醒状态下做一次你通常需要酒精才敢做的事——发一条你真心想发的朋友圈、给一个喜欢的人发一条消息、大声笑一次。一次就好。你会发现，那个有趣的你从来没消失过。',
    deepAnalysisEN:
      "DRUNK is SBTI's hidden type — triggered only when you select a specific 'heavy drinking' option during the test. This is not a coincidence: **the author designed this type specifically for a friend who drinks too much**, as a gentle warning. If you got DRUNK, it means your answers revealed a leaning toward alcohol dependence. Not a judgment. A signal.\n\nDRUNK's profile is split: all three social dimensions are H — after drinking they are the life of the party. But low motivation, low decision-making, low self-confidence — sober, they can barely act or judge. The subtext: **they need alcohol to become the person they want to be**.\n\nA typical DRUNK day: quiet at work, coworkers think of them as the reserved one. Clock-out triggers 'let me just have one to unwind.' Three drinks in: comedian, therapist, soul singer. 2am at a street BBQ stall calling strangers 'bro.' Next morning: remembers nothing, gets a 'you were so fun last night' text. By evening: starting to look forward to the next 'unwind.'\n\nThe trap: **alcohol has become a personality booster**. They don't love alcohol — they love the version of themselves after drinking. The one brave enough to speak, to approach people, to laugh out loud, to express emotion. Their sober self feels too bland, too boring, too 'not enough.' Only alcohol makes them feel 'interesting.'\n\nBut this is a fatal con. Alcohol doesn't give you a personality — it gives you a **temporary mute on your self-critic**. You think drinking made you fun. Actually the fun was always there, just pinned under the self-critic during the day. What you need isn't more alcohol. You need a **sober method to mute the self-critic**.\n\nHealth warning: if you got DRUNK, please honestly consider —\n- How many times did you drink this week?\n- Does a day without alcohol cause anxiety?\n- Is drinking your primary social channel?\n- Have you made regrettable decisions while drunk?\n\nIf 2+ are 'yes,' this may be an early sign of alcohol dependence. SBTI is a joke test but this warning is real. Please consider talking to a doctor or therapist.\n\nIn love DRUNK needs 'loves you when you're sober and boring' energy — THAN-K is ideal, MUM also works. Worst: another DRUNK (mutual spiral), FUCK (encourages more drinking).\n\nGrowth: what you're looking for isn't alcohol — it's the courage to be imperfectly seen. Before opening the next bottle, try doing one thing you'd normally need alcohol for — while sober: post that honest story, send that message to the person you like, laugh loudly once. Just once. You'll find: the fun you was never gone.",
    strengthsCN: [
      '社交能力在酒精加持下拉满',
      '共情能力强，能聆听朋友',
      '幽默感拉满',
      '对情绪表达有天赋',
    ],
    strengthsEN: [
      'Social skills max out with alcohol.',
      'Strong empathy; good friend-listener.',
      'Great sense of humor.',
      'Natural emotional expressiveness.',
    ],
    weaknessesCN: [
      '依赖酒精获得自信',
      '清醒时过度自我压抑',
      '健康风险逐年累积',
      '人生重要决定往往在酒后做',
    ],
    weaknessesEN: [
      'Alcohol-dependent self-confidence.',
      'Heavy self-repression when sober.',
      'Accumulating health risks.',
      'Major life decisions made while drunk.',
    ],
    famousExamplesCN: ['《醉拳》周星驰', '大部分酒馆常客'],
    famousExamplesEN: ['Hank Moody (Californication)', 'Leaving Las Vegas lead'],
    compatibleTypes: ['THAN-K', 'MUM', 'OJBK'],
    conflictTypes: ['DRUNK', 'FUCK', 'IMSB'],
    recommendations: {
      movies: {
        zh: ['《醉乡民谣》', '《大醉侠》', '《醉后大丈夫》（反面教材）'],
        en: ['Inside Llewyn Davis', 'Another Round', 'Leaving Las Vegas'],
      },
      songs: {
        zh: ['《爱如潮水》', '《一生所爱》', '《漠河舞厅》'],
        en: ['Piano Man — Billy Joel', 'Chandelier — Sia', 'Tiny Dancer — Elton John'],
      },
      activities: {
        zh: ['尝试 30 天不喝酒挑战', '找心理咨询聊一聊', '清醒状态做一次 KTV'],
        en: ['Try a 30-day no-drink challenge', 'Talk to a therapist', 'Do karaoke completely sober'],
      },
      gifts: {
        zh: ['一本戒酒主题的书', '好喝的无酒精饮料', '一张健康体检卡'],
        en: ['A sobriety memoir', 'Non-alcoholic craft drinks', 'A health check-up voucher'],
      },
    },
    seo: {
      metaTitleCN: 'SBTI 酒鬼隐藏人格解读 | DRUNK 类型说明与健康警示',
      metaTitleEN: 'SBTI DRUNK Hidden Personality - The Lush Complete Guide',
      metaDescCN: 'SBTI DRUNK 酒鬼隐藏人格全面解析：通过特定选项触发的隐藏类型，15 维度特征、健康警示与成长路径。',
      metaDescEN: 'Complete SBTI DRUNK personality guide: The Lush hidden type. How alcohol becomes a personality booster and why your real self is already interesting.',
      keywordsCN: ['sbti DRUNK', 'sbti DRUNK 意思', 'sbti 酒鬼', 'sbti 隐藏类型', 'sbti 隐藏人格', 'sbti 怎么测出酒鬼'],
      keywordsEN: ['sbti DRUNK', 'sbti DRUNK meaning', 'sbti lush', 'sbti hidden type', 'sbti how to trigger drunk'],
    },
    isSpecial: 'hidden',
  },
];

// ============================================================================
// 衍生查询表
// ============================================================================

export const sbtiTypesBySlug: Record<string, SbtiType> = Object.fromEntries(
  sbtiTypes.map((type) => [type.slug, type]),
);

export const sbtiTypesByCode: Record<string, SbtiType> = Object.fromEntries(
  sbtiTypes.map((type) => [type.code, type]),
);

