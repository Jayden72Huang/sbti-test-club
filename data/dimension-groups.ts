// 15 个 SBTI 维度的分组定义（5 组 × 3 维度）
// 维度 key 与 data/dimensions.ts 严格保持一致

export interface DimensionGroup {
  key: 'self' | 'emotion' | 'attitude' | 'action' | 'social';
  labelCN: string;
  labelEN: string;
  descCN: string;
  descEN: string;
  dimensions: string[];
  emoji: string;
  color: string;
}

export const dimensionGroups: Record<string, DimensionGroup> = {
  self: {
    key: 'self',
    labelCN: '自我模型',
    labelEN: 'Self Model',
    descCN:
      '你有多信自己？对自己有几分了解？心里那个「我」到底值几个钱？自我模型这一组维度测量的是你与自己的关系——从自信心到自我认知的清晰度，再到你内心最看重的核心价值。这里不谈「应该」，只谈真实状态：有人每天醒来觉得自己是天选之子，有人一睁眼就想躲回被窝装死。SBTI 不审判你，只是把镜子擦亮一点。',
    descEN:
      "How much do you trust yourself? How clearly do you see who you are? The Self Model dimensions measure your relationship with yourself — from raw self-confidence to self-clarity to the values you actually live by (not the ones you claim in interviews). No judgment, just a clean mirror. Some people wake up feeling chosen. Others wake up and immediately want to crawl back under the blanket. SBTI just tells you which one you are today.",
    dimensions: ['S1_selfConfidence', 'S2_selfClarity', 'S3_coreValue'],
    emoji: '🪞',
    color: 'purple',
  },
  emotion: {
    key: 'emotion',
    labelCN: '情感模型',
    labelEN: 'Emotion Model',
    descCN:
      '你是那种受一点委屈就要发三条朋友圈的人，还是把所有情绪都塞进「还行」两个字里的人？情感模型测量你的依恋安全感、情感投入度，以及你面对亲密关系时的边界感。有人选择哭出来，有人选择笑出来，有人选择默默去吃顿火锅假装世界不存在。这里没有「健康」的标准答案，只有「你是哪一种人」。',
    descEN:
      "Are you the type to post three stories after one minor setback, or do you compress every feeling into the word 'fine'? The Emotion Model tests your attachment security, emotional investment, and boundary sense in intimate relationships. Some people cry it out. Some people laugh it off. Some people eat hotpot alone at 11pm pretending the world doesn't exist. There's no healthy answer here — only your answer.",
    dimensions: ['E1_attachment', 'E2_emotionalInvest', 'E3_boundary'],
    emoji: '💔',
    color: 'pink',
  },
  attitude: {
    key: 'attitude',
    labelCN: '态度模型',
    labelEN: 'Attitude Model',
    descCN:
      '你对这个世界到底是什么态度？相信明天会更好，还是相信明天只会更离谱？态度模型测量你的世界观倾向、规则灵活度，以及你的人生意义感。这是 SBTI 里最「政治不正确」的一组维度——它不问你应该怎么想，只问你其实是怎么想的。',
    descEN:
      "What's your actual stance on this whole 'life' thing? Do you believe tomorrow will be better, or do you believe tomorrow will just be weirder? The Attitude Model measures your worldview, rule flexibility, and sense of life meaning. This is the most politically incorrect group in SBTI. We don't ask what you should think, only what you actually think.",
    dimensions: ['A1_worldview', 'A2_flexibility', 'A3_meaning'],
    emoji: '🎭',
    color: 'amber',
  },
  action: {
    key: 'action',
    labelCN: '行动模型',
    labelEN: 'Action Model',
    descCN:
      '说得再多都不如做一下。行动模型测量你的动机导向、决策风格和执行模式——你面对目标时是「立刻冲」还是「明天再说」。这里住着 BOSS、GOGO、CTRL 这类动作派，也住着 ZZZZ、DEAD、MONK 这类「明天再说派」。没有优劣，只有匹配度——有的人是车轮，有的人是刹车，一辆车两样都得有。',
    descEN:
      'Talk is cheap. The Action Model measures motivation, decision style, and execution mode — whether you charge at goals or hit snooze on them. This is where BOSS, GOGO, and CTRL live — and also where ZZZZ, DEAD, and MONK chill. No tier list. Some people are wheels, some people are brakes, and a functioning car needs both.',
    dimensions: ['Ac1_motivation', 'Ac2_decisionStyle', 'Ac3_execution'],
    emoji: '⚡',
    color: 'red',
  },
  social: {
    key: 'social',
    labelCN: '社交模型',
    labelEN: 'Social Model',
    descCN:
      '你是把整个酒吧带嗨的那种人，还是在角落假装看手机等人来搭话然后又希望没人来搭话的那种人？社交模型测量你的社交主动性、人际边界感和表达真实度。SOLO 和 SEXY 在这里打架，IMSB 和 WOC! 在这里互相看不顺眼。记住：内向不是病，外向也不是功德。',
    descEN:
      "Are you the person who turns every bar into a party, or the person who hides in the corner pretending to scroll while half-hoping someone says hi and half-praying they don't? The Social Model measures social initiative, interpersonal boundaries, and authenticity. SOLO and SEXY fight here. IMSB and WOC! side-eye each other here. Introversion is not a disease. Extroversion is not a virtue.",
    dimensions: ['So1_socialInit', 'So2_interpersonal', 'So3_expression'],
    emoji: '🎪',
    color: 'blue',
  },
};

// 所有 27 个 SBTI 类型代号（供其他模块引用）
export const allSBTITypes = [
  'CTRL',
  'BOSS',
  'GOGO',
  'SEXY',
  'LOVE-R',
  'MUM',
  'FAKE',
  'OJBK',
  'MALO',
  'JOKE-R',
  'WOC!',
  'THAN-K',
  'OH-NO',
  'ATM-er',
  'Dior-s',
  'THIN-K',
  'SHIT',
  'ZZZZ',
  'POOR',
  'MONK',
  'IMSB',
  'SOLO',
  'FUCK',
  'DEAD',
  'IMFW',
  'HHHH',
  'DRUNK',
] as const;

export type SBTIType = (typeof allSBTITypes)[number];
