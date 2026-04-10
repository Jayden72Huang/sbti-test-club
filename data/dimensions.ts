// 15 维度定义：5 组模型 × 3 维度
// 顺序严格对应 patterns.json 中的 order: S1 S2 S3 - E1 E2 E3 - A1 A2 A3 - Ac1 Ac2 Ac3 - So1 So2 So3

export type DimensionGroup =
  | 'self' // 自我模型
  | 'emotion' // 情感模型
  | 'attitude' // 态度模型
  | 'action' // 行动驱力模型
  | 'social'; // 社交模型

export type DimensionKey =
  | 'S1_selfConfidence'
  | 'S2_selfClarity'
  | 'S3_coreValue'
  | 'E1_attachment'
  | 'E2_emotionalInvest'
  | 'E3_boundary'
  | 'A1_worldview'
  | 'A2_flexibility'
  | 'A3_meaning'
  | 'Ac1_motivation'
  | 'Ac2_decisionStyle'
  | 'Ac3_execution'
  | 'So1_socialInit'
  | 'So2_interpersonal'
  | 'So3_expression';

export interface DimensionLevelExplanation {
  L: { cn: string; en: string };
  M: { cn: string; en: string };
  H: { cn: string; en: string };
}

export interface Dimension {
  key: DimensionKey;
  /** 对应 patterns.json 中的短代号，用于曼哈顿距离向量索引 */
  shortCode: 'S1' | 'S2' | 'S3' | 'E1' | 'E2' | 'E3' | 'A1' | 'A2' | 'A3' | 'Ac1' | 'Ac2' | 'Ac3' | 'So1' | 'So2' | 'So3';
  nameCN: string;
  nameEN: string;
  descCN: string;
  descEN: string;
  group: DimensionGroup;
  groupNameCN: string;
  groupNameEN: string;
  levels: DimensionLevelExplanation;
}

export const dimensions: Dimension[] = [
  // ========== Self 自我模型 ==========
  {
    key: 'S1_selfConfidence',
    shortCode: 'S1',
    nameCN: '自尊自信',
    nameEN: 'Self-Confidence',
    descCN: '你对自己到底几斤几两的底气，以及被外界一句话就能掀翻的脆皮程度。',
    descEN: 'How solid your sense of self-worth is, and how easily a random comment can knock you off balance.',
    group: 'self',
    groupNameCN: '自我模型',
    groupNameEN: 'Self Model',
    levels: {
      L: {
        cn: '对自己下手比别人还狠，夸你两句你都想先验明真伪。',
        en: 'You are harder on yourself than anyone else; even a compliment gets fact-checked first.',
      },
      M: {
        cn: '自信值随天气波动，顺风能飞，逆风先缩。',
        en: 'Your confidence rides the weather: soaring on good days, shrinking on bad ones.',
      },
      H: {
        cn: '心里对自己大致有数，不太会被路人一句话打散。',
        en: "You roughly know who you are, and a stranger's opinion doesn't derail you.",
      },
    },
  },
  {
    key: 'S2_selfClarity',
    shortCode: 'S2',
    nameCN: '自我清晰度',
    nameEN: 'Self-Clarity',
    descCN: '你对"我到底是谁、想要啥"这个问题的回答速度。',
    descEN: 'How quickly you can answer the question: "who am I and what do I actually want?"',
    group: 'self',
    groupNameCN: '自我模型',
    groupNameEN: 'Self Model',
    levels: {
      L: {
        cn: '内心频道雪花较多，常在"我是谁"里循环缓存。',
        en: 'Inner channel full of static; stuck buffering the "who am I" question.',
      },
      M: {
        cn: '平时还能认出自己，偶尔也会被情绪临时换号。',
        en: 'You usually recognize yourself, but strong moods can briefly swap your sim card.',
      },
      H: {
        cn: '对自己的脾气、欲望和底线都算门儿清。',
        en: 'You have a pretty clear read on your temper, your wants, and your hard lines.',
      },
    },
  },
  {
    key: 'S3_coreValue',
    shortCode: 'S3',
    nameCN: '核心价值',
    nameEN: 'Core Value Drive',
    descCN: '驱动你向前的是成长目标还是舒服躺平，以及排序的稳定度。',
    descEN: 'Whether growth or comfort drives you, and how stable that ranking is.',
    group: 'self',
    groupNameCN: '自我模型',
    groupNameEN: 'Self Model',
    levels: {
      L: {
        cn: '更在意舒服和安全，没必要天天给人生开冲刺模式。',
        en: 'You value comfort and safety; no need to live in sprint mode every day.',
      },
      M: {
        cn: '想上进，也想躺会儿，价值排序经常内部开会。',
        en: 'Half ambitious, half horizontal; your priorities hold frequent internal meetings.',
      },
      H: {
        cn: '很容易被目标、成长或某种重要信念推着往前。',
        en: 'Goals, growth or a core belief keeps pushing you forward almost on autopilot.',
      },
    },
  },

  // ========== Emotion 情感模型 ==========
  {
    key: 'E1_attachment',
    shortCode: 'E1',
    nameCN: '依恋安全感',
    nameEN: 'Attachment Security',
    descCN: '感情里你是先信任还是先怀疑，"已读不回"能不能自动脑补成大结局。',
    descEN: 'In relationships, do you trust first or suspect first; can "seen, no reply" spiral into a full movie?',
    group: 'emotion',
    groupNameCN: '情感模型',
    groupNameEN: 'Emotion Model',
    levels: {
      L: {
        cn: '感情里警报器灵敏，已读不回都能脑补到大结局。',
        en: 'Your relationship alarms are hair-trigger; "seen" can spiral into a full breakup script.',
      },
      M: {
        cn: '一半信任，一半试探，感情里常在心里拉锯。',
        en: 'Half trust, half test; a quiet tug-of-war runs in your head.',
      },
      H: {
        cn: '更愿意相信关系本身，不会被一点风吹草动吓散。',
        en: "You trust the bond itself; small ripples don't scatter you.",
      },
    },
  },
  {
    key: 'E2_emotionalInvest',
    shortCode: 'E2',
    nameCN: '情感投入度',
    nameEN: 'Emotional Investment',
    descCN: '你把心敞开的程度，是梭哈式投入还是留一半退路。',
    descEN: 'How much heart you pour in: all-in, or always keeping a backup exit.',
    group: 'emotion',
    groupNameCN: '情感模型',
    groupNameEN: 'Emotion Model',
    levels: {
      L: {
        cn: '感情投入偏克制，心门不是没开，是门禁太严。',
        en: 'You hold back emotionally; the door is open, the access control is just strict.',
      },
      M: {
        cn: '会投入，但会给自己留后手，不至于全盘梭哈。',
        en: "You commit, but keep a backup plan; you don't go all-in.",
      },
      H: {
        cn: '一旦认定就容易认真，情绪和精力都给得很足。',
        en: 'Once you lock in, you go deep; feelings and energy come in full servings.',
      },
    },
  },
  {
    key: 'E3_boundary',
    shortCode: 'E3',
    nameCN: '边界与依赖',
    nameEN: 'Dependence & Boundary',
    descCN: '亲密关系里你更想贴贴还是更想一人一把伞。',
    descEN: 'In intimacy, do you want to glue up or keep one umbrella per person.',
    group: 'emotion',
    groupNameCN: '情感模型',
    groupNameEN: 'Emotion Model',
    levels: {
      L: {
        cn: '容易黏人也容易被黏，关系里的温度感很重要。',
        en: 'You cling and welcome clinging; warmth matters most in a bond.',
      },
      M: {
        cn: '亲密和独立都要一点，属于可调节型依赖。',
        en: 'A bit of closeness, a bit of space; your dependence has an adjustable dial.',
      },
      H: {
        cn: '空间感很重要，再爱也得留一块属于自己的地。',
        en: 'Space is sacred; even in deep love, you keep a plot of your own.',
      },
    },
  },

  // ========== Attitude 态度模型 ==========
  {
    key: 'A1_worldview',
    shortCode: 'A1',
    nameCN: '世界观倾向',
    nameEN: 'Worldview',
    descCN: '对世界和人性是先相信还是先防备。',
    descEN: 'Do you face the world and other people with trust, or with a shield up.',
    group: 'attitude',
    groupNameCN: '态度模型',
    groupNameEN: 'Attitude Model',
    levels: {
      L: {
        cn: '看世界自带防御滤镜，先怀疑，再靠近。',
        en: 'You read the world through a defensive filter: suspect first, approach later.',
      },
      M: {
        cn: '既不天真也不彻底阴谋论，观望是你的本能。',
        en: 'Neither naive nor conspiracy-pilled; observing is your default move.',
      },
      H: {
        cn: '更愿意相信人性和善意，遇事不急着把世界判死刑。',
        en: "You lean toward trust; you don't sentence the world to death on day one.",
      },
    },
  },
  {
    key: 'A2_flexibility',
    shortCode: 'A2',
    nameCN: '规则与灵活度',
    nameEN: 'Rules & Flexibility',
    descCN: '秩序型选手还是破规型玩家，面对"必须"两个字的反应。',
    descEN: 'Are you an order lover or a rule breaker; how does the word "must" land on you.',
    group: 'attitude',
    groupNameCN: '态度模型',
    groupNameEN: 'Attitude Model',
    levels: {
      L: {
        cn: '规则能绕就绕，舒服和自由往往排在前面。',
        en: 'If a rule can be bypassed, you bypass it; comfort and freedom come first.',
      },
      M: {
        cn: '该守的时候守，该变通的时候也不死磕。',
        en: "You follow when needed, bend when needed; you don't cling to either extreme.",
      },
      H: {
        cn: '秩序感较强，能按流程来就不爱即兴炸场。',
        en: 'You like order; if a process exists, you would rather not improvise chaos.',
      },
    },
  },
  {
    key: 'A3_meaning',
    shortCode: 'A3',
    nameCN: '人生意义感',
    nameEN: 'Life Meaning',
    descCN: '你觉得人生像一条大道还是一个循环动图。',
    descEN: 'Does life feel like a road forward, or a looping gif on your timeline.',
    group: 'attitude',
    groupNameCN: '态度模型',
    groupNameEN: 'Attitude Model',
    levels: {
      L: {
        cn: '意义感偏低，容易觉得很多事都像在走过场。',
        en: 'Meaning runs low; a lot of life feels like you are just going through motions.',
      },
      M: {
        cn: '偶尔有目标，偶尔也想摆烂，人生观处于半开机。',
        en: 'Sometimes goal-mode, sometimes rot-mode; your worldview is on half-power.',
      },
      H: {
        cn: '做事更有方向，知道自己大概要往哪边走。',
        en: "You move with direction; you roughly know which way you're heading.",
      },
    },
  },

  // ========== Action 行动驱力模型 ==========
  {
    key: 'Ac1_motivation',
    shortCode: 'Ac1',
    nameCN: '动机导向',
    nameEN: 'Motivation Orientation',
    descCN: '推动你行动的是"想拿到"还是"怕出事"。',
    descEN: 'What gets you moving: chasing a win, or dodging a mess.',
    group: 'action',
    groupNameCN: '行动驱力模型',
    groupNameEN: 'Action Drive Model',
    levels: {
      L: {
        cn: '做事先考虑别翻车，避险系统比野心更先启动。',
        en: 'Not-crashing comes first; your risk radar fires before your ambition.',
      },
      M: {
        cn: '有时想赢，有时只想别麻烦，动机比较混合。',
        en: 'Sometimes you want to win, sometimes you just want to not be bothered.',
      },
      H: {
        cn: '更容易被成果、成长和推进感点燃。',
        en: 'Outcomes, growth and momentum light you up faster than anything.',
      },
    },
  },
  {
    key: 'Ac2_decisionStyle',
    shortCode: 'Ac2',
    nameCN: '决策风格',
    nameEN: 'Decision Style',
    descCN: '做决定时你是秒拍还是开三天会。',
    descEN: 'When making a call, are you an instant ship, or a three-day committee.',
    group: 'action',
    groupNameCN: '行动驱力模型',
    groupNameEN: 'Action Drive Model',
    levels: {
      L: {
        cn: '做决定前容易多转几圈，脑内会议常常超时。',
        en: 'You circle before deciding; your inner meetings routinely run overtime.',
      },
      M: {
        cn: '会想，但不至于想死机，属于正常犹豫。',
        en: "You think, but you don't crash; healthy amount of hesitation.",
      },
      H: {
        cn: '拍板速度快，决定一下就不爱回头磨叽。',
        en: 'You decide fast and you rarely look back to second-guess yourself.',
      },
    },
  },
  {
    key: 'Ac3_execution',
    shortCode: 'Ac3',
    nameCN: '执行模式',
    nameEN: 'Execution Mode',
    descCN: '把"想做"变成"已做"的转化率。',
    descEN: 'Your conversion rate from "wanna do" to "already done".',
    group: 'action',
    groupNameCN: '行动驱力模型',
    groupNameEN: 'Action Drive Model',
    levels: {
      L: {
        cn: '执行力和死线有深厚感情，越晚越像要觉醒。',
        en: 'You and deadlines go way back; the later it gets, the more awake you feel.',
      },
      M: {
        cn: '能做，但状态看时机，偶尔稳偶尔摆。',
        en: 'You can execute, but it depends on the vibe; sometimes steady, sometimes limp.',
      },
      H: {
        cn: '推进欲比较强，事情不落地心里都像卡了根刺。',
        en: 'An unfinished task is a thorn in your chest; you push until it lands.',
      },
    },
  },

  // ========== Social 社交模型 ==========
  {
    key: 'So1_socialInit',
    shortCode: 'So1',
    nameCN: '社交主动性',
    nameEN: 'Social Initiative',
    descCN: '进入一个陌生场合时，你是先开口还是先观察。',
    descEN: 'In a new room, do you speak first or scan first.',
    group: 'social',
    groupNameCN: '社交模型',
    groupNameEN: 'Social Model',
    levels: {
      L: {
        cn: '社交启动慢热，主动出击这事通常得攒半天气。',
        en: 'Slow to warm up; taking initiative usually needs a long charge cycle.',
      },
      M: {
        cn: '有人来就接，没人来也不硬凑，社交弹性一般。',
        en: "You reply if approached, don't push if not; average social elasticity.",
      },
      H: {
        cn: '更愿意主动打开场子，在人群里不太怕露头。',
        en: 'You happily start the vibe; crowds do not scare you.',
      },
    },
  },
  {
    key: 'So2_interpersonal',
    shortCode: 'So2',
    nameCN: '人际边界感',
    nameEN: 'Interpersonal Boundary',
    descCN: '关系的默认距离，是想贴近还是想留缝。',
    descEN: 'Default distance in a bond: do you want to merge or leave a crack.',
    group: 'social',
    groupNameCN: '社交模型',
    groupNameEN: 'Social Model',
    levels: {
      L: {
        cn: '关系里更想亲近和融合，熟了就容易把人划进内圈。',
        en: 'You crave closeness; once trust is earned, you drag people into your inner circle.',
      },
      M: {
        cn: '既想亲近又想留缝，边界感看对象调节。',
        en: 'You want both closeness and space; your boundary slides case by case.',
      },
      H: {
        cn: '边界感偏强，靠太近会先本能性后退半步。',
        en: 'Strong fence; someone stepping too close makes you instinctively step back.',
      },
    },
  },
  {
    key: 'So3_expression',
    shortCode: 'So3',
    nameCN: '表达与真实度',
    nameEN: 'Expression & Authenticity',
    descCN: '你嘴里说出来的话，和心里真正想的重合度。',
    descEN: 'How much your spoken words overlap with your actual inner monologue.',
    group: 'social',
    groupNameCN: '社交模型',
    groupNameEN: 'Social Model',
    levels: {
      L: {
        cn: '表达更直接，心里有啥基本不爱绕。',
        en: 'You say it straight; if it is on your mind, it tends to reach your mouth.',
      },
      M: {
        cn: '会看气氛说话，真实和体面通常各留一点。',
        en: 'You read the room; honesty and politeness each get a share.',
      },
      H: {
        cn: '对不同场景的自我切换更熟练，真实感会分层发放。',
        en: 'You switch versions of yourself by context; raw honesty is rationed by layer.',
      },
    },
  },
];

/** 通过 shortCode 拿到长 key */
export const shortToKey: Record<string, DimensionKey> = dimensions.reduce(
  (acc, d) => ({ ...acc, [d.shortCode]: d.key }),
  {} as Record<string, DimensionKey>,
);

/** 通过长 key 拿到 shortCode */
export const keyToShort: Record<DimensionKey, string> = dimensions.reduce(
  (acc, d) => ({ ...acc, [d.key]: d.shortCode }),
  {} as Record<DimensionKey, string>,
);

/** 维度顺序：用于曼哈顿距离向量化 */
export const dimensionOrder: DimensionKey[] = dimensions.map((d) => d.key);
