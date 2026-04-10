import type { DimensionKey } from './dimensions';

export interface QuestionOption {
  id: 'a' | 'b' | 'c' | 'd';
  textCN: string;
  textEN: string;
  /**
   * 该选项对相关维度的原始打分。
   * 每个维度由 2 道题覆盖，单题原始分 1~3，两题相加得 2~6 的原始总分。
   * 其中：总分 ≤ 3 → L，= 4 → M，≥ 5 → H
   */
  scores: Partial<Record<DimensionKey, number>>;
}

export interface Question {
  id: number;
  textCN: string;
  textEN: string;
  /** 该题主要影响的维度（1~2 个） */
  dimensions: DimensionKey[];
  /** 4 个选项：a/b/c/d */
  options: [QuestionOption, QuestionOption, QuestionOption, QuestionOption];
  /** 是否是隐藏 DRUNK 触发题 */
  isHiddenTrigger?: boolean;
  /** 触发 DRUNK 的选项 id */
  hiddenTriggerOption?: 'a' | 'b' | 'c' | 'd';
}

/**
 * 31 道题：
 *  - 30 道常规题覆盖 15 维度，每个维度由 2 道题打分（原始分 1~3）
 *  - 第 31 道是隐藏饮酒触发题，选中 'c' 强制触发 DRUNK 人格
 *
 * 打分规则：
 *  - 每道常规题的每个选项都会给该题的主要维度打 1/2/3 分
 *  - 有些选项会顺带对一个相邻维度做轻度加分（1 分），增加信息密度
 */
export const questions: Question[] = [
  // ======================================================================
  // S1 自尊自信 — Q1, Q2
  // ======================================================================
  {
    id: 1,
    textCN: '同事随口一句"你今天看起来有点累"，十分钟后你的心理状态是？',
    textEN: 'A coworker casually says "you look tired today". Ten minutes later, your inner state is:',
    dimensions: ['S1_selfConfidence'],
    options: [
      {
        id: 'a',
        textCN: '是不是我最近状态太差了，是不是其实大家都觉得我不行',
        textEN: "Wait, am I actually falling apart? Does everyone secretly think I'm done for?",
        scores: { S1_selfConfidence: 1 },
      },
      {
        id: 'b',
        textCN: '偷偷打开手机前置，确认一下自己的黑眼圈进度',
        textEN: 'Secretly open the front camera to audit the dark circle situation',
        scores: { S1_selfConfidence: 1, S2_selfClarity: 1 },
      },
      {
        id: 'c',
        textCN: '心里咯噔一下，但三分钟后回到工作',
        textEN: 'A small "uh-oh", then back to work three minutes later',
        scores: { S1_selfConfidence: 2 },
      },
      {
        id: 'd',
        textCN: '累就累呗，我本来就是来上班又不是来走秀',
        textEN: "Tired is tired. I came here to work, not to walk a runway.",
        scores: { S1_selfConfidence: 3 },
      },
    ],
  },
  {
    id: 2,
    textCN: '朋友圈发了张自拍，半小时后只有 2 个赞，你？',
    textEN: 'You post a selfie. Thirty minutes in, it has 2 likes. You:',
    dimensions: ['S1_selfConfidence'],
    options: [
      {
        id: 'a',
        textCN: '光速删除，就当从没发过，假装无事发生',
        textEN: 'Delete at the speed of light, pretend it never happened',
        scores: { S1_selfConfidence: 1 },
      },
      {
        id: 'b',
        textCN: '开始怀疑照片角度 / 滤镜 / 光线 / 脸本身',
        textEN: 'Start questioning the angle, the filter, the lighting, the face itself',
        scores: { S1_selfConfidence: 1, S2_selfClarity: 1 },
      },
      {
        id: 'c',
        textCN: '算了不管了，但手机还是会忍不住刷一下',
        textEN: 'Whatever, but still sneak another refresh on the way',
        scores: { S1_selfConfidence: 2 },
      },
      {
        id: 'd',
        textCN: '发出来是让自己开心的，2 个赞也是赞',
        textEN: 'I posted to make myself happy. Two likes are still likes.',
        scores: { S1_selfConfidence: 3 },
      },
    ],
  },

  // ======================================================================
  // S2 自我清晰度 — Q3, Q4
  // ======================================================================
  {
    id: 3,
    textCN: '半夜三点，你突然问自己"我到底喜欢什么"，答案是？',
    textEN: 'At 3am you suddenly ask yourself "what do I actually like?". The answer is:',
    dimensions: ['S2_selfClarity'],
    options: [
      {
        id: 'a',
        textCN: '一片空白，大概最喜欢钱吧',
        textEN: 'Complete blank. Probably money, I guess.',
        scores: { S2_selfClarity: 1 },
      },
      {
        id: 'b',
        textCN: '能列几个，但忍不住反问"真的是我自己喜欢的吗"',
        textEN: 'I can list a few, then immediately go "but do I really like these?"',
        scores: { S2_selfClarity: 1 },
      },
      {
        id: 'c',
        textCN: '大致知道，只是一时半会儿拼不全',
        textEN: "I mostly know, just can't assemble the full picture on the spot",
        scores: { S2_selfClarity: 2 },
      },
      {
        id: 'd',
        textCN: '像背菜单一样一气呵成，还能附带排序',
        textEN: 'Rattle it off like a menu, with a ranking attached',
        scores: { S2_selfClarity: 3 },
      },
    ],
  },
  {
    id: 4,
    textCN: '同事 / 同学夸你"你好像变了"，你的第一反应是？',
    textEN: 'Someone you know says "you seem different lately". Your first reaction is:',
    dimensions: ['S2_selfClarity'],
    options: [
      {
        id: 'a',
        textCN: '完了，是不是我又变得自己不认识自己了',
        textEN: "Oh no, did I become someone even I don't recognize again",
        scores: { S2_selfClarity: 1 },
      },
      {
        id: 'b',
        textCN: '哦？怎么个变法，先礼貌追问一下再说',
        textEN: 'Oh? In what way? Politely dig for details first',
        scores: { S2_selfClarity: 2 },
      },
      {
        id: 'c',
        textCN: '哈哈还好吧，其实我一直就是这样',
        textEN: "Haha, not really, I've pretty much always been like this",
        scores: { S2_selfClarity: 3 },
      },
      {
        id: 'd',
        textCN: '变的是你眼中的我，不是我',
        textEN: "What changed is your version of me, not me.",
        scores: { S2_selfClarity: 3, S1_selfConfidence: 1 },
      },
    ],
  },

  // ======================================================================
  // S3 核心价值 — Q5, Q6
  // ======================================================================
  {
    id: 5,
    textCN: '领导说"只要你肯拼，下季度给你升一级"，你心里真实的声音是？',
    textEN: 'Boss says "grind a bit more and you\'ll get promoted next quarter". Your real inner voice:',
    dimensions: ['S3_coreValue'],
    options: [
      {
        id: 'a',
        textCN: '升了又怎样，我只想周末多睡两小时',
        textEN: "Promoted or not, I just want two more hours of sleep on weekends",
        scores: { S3_coreValue: 1 },
      },
      {
        id: 'b',
        textCN: '说实话有点心动，也有点想摆',
        textEN: 'Honestly a bit tempted, also a bit wanna flop',
        scores: { S3_coreValue: 2 },
      },
      {
        id: 'c',
        textCN: '可以冲一下，反正也没别的事',
        textEN: "I can push for it, not like I have anything better going on",
        scores: { S3_coreValue: 2, Ac1_motivation: 1 },
      },
      {
        id: 'd',
        textCN: '来，我要的就是这个机会',
        textEN: "Bring it on. This is exactly the opening I've been waiting for.",
        scores: { S3_coreValue: 3 },
      },
    ],
  },
  {
    id: 6,
    textCN: '同龄人晒出年薪、买房、结婚、孩子三件套，你的内心戏是？',
    textEN: 'Peers flex their salary, new apartment, marriage, and kid combo. Your inner monologue:',
    dimensions: ['S3_coreValue'],
    options: [
      {
        id: 'a',
        textCN: '没事的没事的，大家都有自己的节奏，真的',
        textEN: "It's fine, it's fine, everyone has their own pace, really",
        scores: { S3_coreValue: 1 },
      },
      {
        id: 'b',
        textCN: '羡慕五秒，然后继续刷剧',
        textEN: 'Five seconds of envy, then back to my show',
        scores: { S3_coreValue: 2 },
      },
      {
        id: 'c',
        textCN: '有点被刺激到，默默把 deadline 往前提',
        textEN: 'A bit stung. Quietly move my personal deadlines earlier',
        scores: { S3_coreValue: 2 },
      },
      {
        id: 'd',
        textCN: '这正是我想要的节奏，下一个就是我',
        textEN: "That's exactly the pace I want. I'm next.",
        scores: { S3_coreValue: 3 },
      },
    ],
  },

  // ======================================================================
  // E1 依恋安全感 — Q7, Q8
  // ======================================================================
  {
    id: 7,
    textCN: '对象连续 5 小时没回消息，发了个"在忙"就消失，你？',
    textEN: "Your partner hasn't replied for 5 hours, sent a single 'busy' and vanished. You:",
    dimensions: ['E1_attachment'],
    options: [
      {
        id: 'a',
        textCN: '大脑开始自动播放小剧场，结局已经杀青',
        textEN: 'My brain autoplays a full drama, the finale is already wrapped',
        scores: { E1_attachment: 1 },
      },
      {
        id: 'b',
        textCN: '心里咯噔一下，但努力说服自己相信 ta',
        textEN: 'A small pang, but I talk myself into trusting them',
        scores: { E1_attachment: 2 },
      },
      {
        id: 'c',
        textCN: '嗯，那就等 ta 忙完呗',
        textEN: "Alright, I'll wait until they're free",
        scores: { E1_attachment: 3 },
      },
      {
        id: 'd',
        textCN: '我也忙的，根本没注意到',
        textEN: "I'm busy too, honestly didn't even notice",
        scores: { E1_attachment: 3 },
      },
    ],
  },
  {
    id: 8,
    textCN: '感情中你最怕的一句话是？',
    textEN: 'In a relationship, the sentence that scares you the most is:',
    dimensions: ['E1_attachment'],
    options: [
      {
        id: 'a',
        textCN: '"我们聊一下"',
        textEN: '"Can we talk?"',
        scores: { E1_attachment: 1 },
      },
      {
        id: 'b',
        textCN: '"我觉得我最近有点累"',
        textEN: '"I think I\'ve been a bit tired lately"',
        scores: { E1_attachment: 1 },
      },
      {
        id: 'c',
        textCN: '"我们要不要冷静冷静"',
        textEN: '"Maybe we should cool off for a bit"',
        scores: { E1_attachment: 2 },
      },
      {
        id: 'd',
        textCN: '没啥特别怕的，有啥说啥',
        textEN: "Nothing in particular. Just say what you mean.",
        scores: { E1_attachment: 3 },
      },
    ],
  },

  // ======================================================================
  // E2 情感投入度 — Q9, Q10
  // ======================================================================
  {
    id: 9,
    textCN: '刚认识一个很合拍的人，你会多快进入"认真模式"？',
    textEN: 'You just met someone who really clicks. How fast do you enter "serious mode"?',
    dimensions: ['E2_emotionalInvest'],
    options: [
      {
        id: 'a',
        textCN: '先观察个三年再说，反正我也不亏',
        textEN: "I'll observe for three years first. Doesn't cost me anything.",
        scores: { E2_emotionalInvest: 1 },
      },
      {
        id: 'b',
        textCN: '会投入，但始终留一只脚在门外',
        textEN: "I'll engage, but I always keep one foot outside the door",
        scores: { E2_emotionalInvest: 2 },
      },
      {
        id: 'c',
        textCN: '感觉对了就往里走，但会提醒自己理智',
        textEN: 'If the vibe is right I move in, while reminding myself to stay rational',
        scores: { E2_emotionalInvest: 2 },
      },
      {
        id: 'd',
        textCN: '梭哈，心跳到哪里人就到哪里',
        textEN: "All in. I go wherever my heart drags me.",
        scores: { E2_emotionalInvest: 3 },
      },
    ],
  },
  {
    id: 10,
    textCN: '恋爱中，你更接近哪种状态？',
    textEN: 'In love, you feel closer to which state:',
    dimensions: ['E2_emotionalInvest'],
    options: [
      {
        id: 'a',
        textCN: '我有点像在做项目，情绪成本严格控制',
        textEN: 'Feels like I\'m running a project; emotional cost is tightly controlled',
        scores: { E2_emotionalInvest: 1 },
      },
      {
        id: 'b',
        textCN: '投入但会算账，该清醒的时候很清醒',
        textEN: 'Invested but keeping the books; I stay clear-eyed when I need to',
        scores: { E2_emotionalInvest: 2 },
      },
      {
        id: 'c',
        textCN: '我可以为对方打破大半个自己',
        textEN: 'I can break most of myself open for the other person',
        scores: { E2_emotionalInvest: 3 },
      },
      {
        id: 'd',
        textCN: '只要爱了，基本就是恋爱脑本脑',
        textEN: 'Once I love, I basically become the textbook love-drunk brain',
        scores: { E2_emotionalInvest: 3, E1_attachment: 1 },
      },
    ],
  },

  // ======================================================================
  // E3 边界与依赖 — Q11, Q12
  // ======================================================================
  {
    id: 11,
    textCN: '对象一天没联系你，你的感受是？',
    textEN: "Your partner doesn't contact you the whole day. You feel:",
    dimensions: ['E3_boundary'],
    options: [
      {
        id: 'a',
        textCN: '好空虚，感觉心被掏走了一块',
        textEN: 'So empty. Like a chunk of my heart got scooped out',
        scores: { E3_boundary: 1 },
      },
      {
        id: 'b',
        textCN: '会有点不习惯，但还顶得住',
        textEN: "A bit weird, but I'll survive",
        scores: { E3_boundary: 2 },
      },
      {
        id: 'c',
        textCN: '挺好的，我正好也需要独处一下',
        textEN: "Actually nice, I needed my alone time anyway",
        scores: { E3_boundary: 3 },
      },
      {
        id: 'd',
        textCN: '完美，我甚至希望 ta 多放空几天',
        textEN: 'Perfect. Honestly I hope they take a few more days off me',
        scores: { E3_boundary: 3 },
      },
    ],
  },
  {
    id: 12,
    textCN: '对象说"我今晚想和你同居 / 整天黏在一起"，你？',
    textEN: 'Partner says "I want to live together tonight / be glued to you all day". You:',
    dimensions: ['E3_boundary'],
    options: [
      {
        id: 'a',
        textCN: '我的心在尖叫：终于有人懂我了',
        textEN: 'My heart screams: finally someone gets me',
        scores: { E3_boundary: 1 },
      },
      {
        id: 'b',
        textCN: '好呀，反正我们也合拍',
        textEN: "Sure, we click anyway",
        scores: { E3_boundary: 2 },
      },
      {
        id: 'c',
        textCN: '好，但请给我至少半个房间的独立空间',
        textEN: 'Ok, but please give me at least half a room of private space',
        scores: { E3_boundary: 3 },
      },
      {
        id: 'd',
        textCN: '再爱也请保留人类最基本的独处权',
        textEN: 'Even in deep love, please respect the basic human right to be alone',
        scores: { E3_boundary: 3 },
      },
    ],
  },

  // ======================================================================
  // A1 世界观倾向 — Q13, Q14
  // ======================================================================
  {
    id: 13,
    textCN: '陌生人在地铁上突然对你微笑，你？',
    textEN: 'A stranger on the subway suddenly smiles at you. You:',
    dimensions: ['A1_worldview'],
    options: [
      {
        id: 'a',
        textCN: '警觉拉满：这人是不是有啥目的',
        textEN: 'Full alert: what is this person up to',
        scores: { A1_worldview: 1 },
      },
      {
        id: 'b',
        textCN: '先下意识不笑，再慢慢反应过来礼节性回一下',
        textEN: 'Instinctively keep a straight face, then slowly force a polite smile back',
        scores: { A1_worldview: 2 },
      },
      {
        id: 'c',
        textCN: '自然回笑，今天运气不错',
        textEN: "Smile back naturally. Nice little moment.",
        scores: { A1_worldview: 3 },
      },
      {
        id: 'd',
        textCN: '笑回去，然后真心希望 ta 今天一切顺利',
        textEN: 'Smile back and genuinely hope they have a great day',
        scores: { A1_worldview: 3 },
      },
    ],
  },
  {
    id: 14,
    textCN: '你看到"某明星捐款一千万"的新闻，第一反应是？',
    textEN: 'You see "celebrity donates 10 million" in the news. First thought:',
    dimensions: ['A1_worldview'],
    options: [
      {
        id: 'a',
        textCN: '肯定是为了洗什么白，这世界没有无缘无故的善',
        textEN: 'Definitely a PR wash. Nothing in this world is kindness for kindness\' sake',
        scores: { A1_worldview: 1 },
      },
      {
        id: 'b',
        textCN: '观望一下，等后续反转再说',
        textEN: 'Wait and see, there could be a plot twist',
        scores: { A1_worldview: 2 },
      },
      {
        id: 'c',
        textCN: '不管动机如何，这一千万到位了就是好事',
        textEN: "Whatever the motive, 10 million reaching the ground is a good thing",
        scores: { A1_worldview: 3 },
      },
      {
        id: 'd',
        textCN: '愿意相信是真心的，毕竟世上好人也不少',
        textEN: "I'll believe it's sincere. There are a lot of good people out there.",
        scores: { A1_worldview: 3 },
      },
    ],
  },

  // ======================================================================
  // A2 规则与灵活度 — Q15, Q16
  // ======================================================================
  {
    id: 15,
    textCN: '公司规定 9 点打卡，今天你 8:58 冲到公司楼下发现电梯爆满，你？',
    textEN: "Company rules 9am punch-in. At 8:58 you hit the lobby and the elevator is packed. You:",
    dimensions: ['A2_flexibility'],
    options: [
      {
        id: 'a',
        textCN: '反正会迟到两分钟，干脆下楼买杯咖啡',
        textEN: "Already late by two minutes anyway, might as well grab coffee first",
        scores: { A2_flexibility: 1 },
      },
      {
        id: 'b',
        textCN: '发微信让同事帮我先点一下',
        textEN: 'WeChat a coworker to punch in for me',
        scores: { A2_flexibility: 1 },
      },
      {
        id: 'c',
        textCN: '等下一趟电梯，迟到就迟到解释清楚就行',
        textEN: "Wait for the next elevator. If I'm late, I'll just explain",
        scores: { A2_flexibility: 2 },
      },
      {
        id: 'd',
        textCN: '立刻冲楼梯间，一层都不能晚',
        textEN: "Rush to the stairwell. Not a single floor late.",
        scores: { A2_flexibility: 3 },
      },
    ],
  },
  {
    id: 16,
    textCN: '朋友提议"反正没人看，闯一个红灯吧"，你？',
    textEN: 'A friend says "no cameras here, just run this red light". You:',
    dimensions: ['A2_flexibility'],
    options: [
      {
        id: 'a',
        textCN: '来都来了，走',
        textEN: 'Already here, let\'s go',
        scores: { A2_flexibility: 1 },
      },
      {
        id: 'b',
        textCN: '犹豫一下，然后跟着走',
        textEN: 'Hesitate for a sec, then follow',
        scores: { A2_flexibility: 2 },
      },
      {
        id: 'c',
        textCN: '不行，再晚也得等绿灯',
        textEN: "No way. Late or not, I wait for green.",
        scores: { A2_flexibility: 3 },
      },
      {
        id: 'd',
        textCN: '还当场给朋友上一课',
        textEN: 'And give my friend a whole lecture on the spot',
        scores: { A2_flexibility: 3 },
      },
    ],
  },

  // ======================================================================
  // A3 人生意义感 — Q17, Q18
  // ======================================================================
  {
    id: 17,
    textCN: '周日晚上 10 点，想到明天要上班，你脑子里蹦出的一句话是？',
    textEN: "Sunday 10pm, tomorrow is Monday. The sentence popping in your head is:",
    dimensions: ['A3_meaning'],
    options: [
      {
        id: 'a',
        textCN: '这种日子到底有什么意思？',
        textEN: 'What exactly is the point of this kind of life?',
        scores: { A3_meaning: 1 },
      },
      {
        id: 'b',
        textCN: '算了，上就上吧，反正大家都这样',
        textEN: "Whatever, off we go. Everyone else is doing the same thing.",
        scores: { A3_meaning: 2 },
      },
      {
        id: 'c',
        textCN: '有点不想，但想到下周计划还是有点期待',
        textEN: "Kind of don't want to, but I'm a bit excited about next week's plan",
        scores: { A3_meaning: 2 },
      },
      {
        id: 'd',
        textCN: '冲，这周我有事要推进',
        textEN: "Let's go. I have real things to push this week.",
        scores: { A3_meaning: 3 },
      },
    ],
  },
  {
    id: 18,
    textCN: '如果告诉你"人活着本来就没什么大意义"，你？',
    textEN: 'If someone tells you "life has no grand meaning by default", you:',
    dimensions: ['A3_meaning'],
    options: [
      {
        id: 'a',
        textCN: '对，这就是我一直以来的真实感受',
        textEN: "Yeah, that's been my actual lived experience all along",
        scores: { A3_meaning: 1 },
      },
      {
        id: 'b',
        textCN: '有时候信，有时候又被某件事燃一下',
        textEN: 'Sometimes I believe it, sometimes a random thing lights me up',
        scores: { A3_meaning: 2 },
      },
      {
        id: 'c',
        textCN: '没意义就没意义，那就自己造一个',
        textEN: "No meaning? Fine, I'll build one myself",
        scores: { A3_meaning: 3 },
      },
      {
        id: 'd',
        textCN: '我有自己坚信的东西，不需要被说服',
        textEN: "I believe in something of my own. Don't need to be convinced.",
        scores: { A3_meaning: 3 },
      },
    ],
  },

  // ======================================================================
  // Ac1 动机导向 — Q19, Q20
  // ======================================================================
  {
    id: 19,
    textCN: '领导给你一个有风险但可能爆的项目，你？',
    textEN: 'Boss hands you a risky project that could blow up — or blow up huge. You:',
    dimensions: ['Ac1_motivation'],
    options: [
      {
        id: 'a',
        textCN: '先想怎么推给别人，万一背锅呢',
        textEN: 'First think how to pass it on. What if it becomes a blame magnet?',
        scores: { Ac1_motivation: 1 },
      },
      {
        id: 'b',
        textCN: '接是接，但先把退路想清楚',
        textEN: "I'll take it, but first map the escape routes",
        scores: { Ac1_motivation: 2 },
      },
      {
        id: 'c',
        textCN: '接，做好就是一个拿得出手的战果',
        textEN: "Take it. Done right, it becomes a real trophy on the shelf",
        scores: { Ac1_motivation: 3 },
      },
      {
        id: 'd',
        textCN: '不用想，冲，我就是来打大仗的',
        textEN: "No thinking. Let's go. I'm here for the big fights.",
        scores: { Ac1_motivation: 3 },
      },
    ],
  },
  {
    id: 20,
    textCN: '你决定做一件事，主要是因为？',
    textEN: 'When you decide to do something, it is mostly because:',
    dimensions: ['Ac1_motivation'],
    options: [
      {
        id: 'a',
        textCN: '不做会出事，或会被骂',
        textEN: "Not doing it means trouble or scolding",
        scores: { Ac1_motivation: 1 },
      },
      {
        id: 'b',
        textCN: '怕后悔，也怕麻烦，两边都想避一下',
        textEN: "I'm afraid of regret and of hassle, trying to dodge both",
        scores: { Ac1_motivation: 2 },
      },
      {
        id: 'c',
        textCN: '它能让我更强 / 更赚 / 更爽',
        textEN: "It makes me stronger / richer / happier",
        scores: { Ac1_motivation: 3 },
      },
      {
        id: 'd',
        textCN: '我想，就够了',
        textEN: "Because I want to. That's enough.",
        scores: { Ac1_motivation: 3 },
      },
    ],
  },

  // ======================================================================
  // Ac2 决策风格 — Q21, Q22
  // ======================================================================
  {
    id: 21,
    textCN: '奶茶店排队，你站到点单机前要花多久？',
    textEN: "At the bubble tea counter, how long does it take you to decide once you're at the machine:",
    dimensions: ['Ac2_decisionStyle'],
    options: [
      {
        id: 'a',
        textCN: '从看菜单开始纠结，身后已经排了三个人',
        textEN: "I've been agonizing since the menu. Three people now queueing behind me.",
        scores: { Ac2_decisionStyle: 1 },
      },
      {
        id: 'b',
        textCN: '需要问店员"你们招牌是啥"，再纠结一下',
        textEN: 'Need to ask the staff "what\'s your bestseller" and then agonize some more',
        scores: { Ac2_decisionStyle: 2 },
      },
      {
        id: 'c',
        textCN: '基本锁定经典款，再看当天心情微调',
        textEN: 'Basically lock onto the classic, micro-adjust with today\'s mood',
        scores: { Ac2_decisionStyle: 2 },
      },
      {
        id: 'd',
        textCN: '老规矩，三秒报菜名',
        textEN: 'Same as always. Three seconds, full order out.',
        scores: { Ac2_decisionStyle: 3 },
      },
    ],
  },
  {
    id: 22,
    textCN: '一个重要决定你已经想了两周，现在？',
    textEN: "You've been thinking about a big decision for two weeks. Now:",
    dimensions: ['Ac2_decisionStyle'],
    options: [
      {
        id: 'a',
        textCN: '还在纠结，甚至开始列第三版利弊表',
        textEN: "Still torn. Now drafting the third version of the pros-and-cons list",
        scores: { Ac2_decisionStyle: 1 },
      },
      {
        id: 'b',
        textCN: '心里其实有答案，但需要一个外部声音帮我盖章',
        textEN: 'I know the answer deep down, but need someone to rubber-stamp it',
        scores: { Ac2_decisionStyle: 2 },
      },
      {
        id: 'c',
        textCN: '好，就这么定了，剩下的交给时间',
        textEN: "Alright, that's it. The rest is time's problem.",
        scores: { Ac2_decisionStyle: 3 },
      },
      {
        id: 'd',
        textCN: '两周？这种事我三分钟前就定了',
        textEN: 'Two weeks? I decided three minutes ago.',
        scores: { Ac2_decisionStyle: 3 },
      },
    ],
  },

  // ======================================================================
  // Ac3 执行模式 — Q23, Q24
  // ======================================================================
  {
    id: 23,
    textCN: 'DDL 是明天早上 9 点，现在是晚上 11 点，你？',
    textEN: 'Deadline is 9am tomorrow. It is now 11pm. You:',
    dimensions: ['Ac3_execution'],
    options: [
      {
        id: 'a',
        textCN: '刚刚开始有写的欲望，创造力马上觉醒',
        textEN: 'Just starting to feel the urge to write. Creative juice about to awaken.',
        scores: { Ac3_execution: 1 },
      },
      {
        id: 'b',
        textCN: '写一半了，再开一瓶红牛冲一下',
        textEN: 'Half done. Cracking another Red Bull to grind',
        scores: { Ac3_execution: 2 },
      },
      {
        id: 'c',
        textCN: '早写完了，现在在检查最后一版',
        textEN: 'Finished a while ago. Doing the final check now.',
        scores: { Ac3_execution: 3 },
      },
      {
        id: 'd',
        textCN: '什么 DDL？我昨天就交了',
        textEN: 'Deadline? I submitted yesterday.',
        scores: { Ac3_execution: 3 },
      },
    ],
  },
  {
    id: 24,
    textCN: '列完一份 to-do list 后，一周后回头看？',
    textEN: 'You wrote a to-do list. One week later:',
    dimensions: ['Ac3_execution'],
    options: [
      {
        id: 'a',
        textCN: '基本还是那张 list，画了两个勾已经算努力',
        textEN: "Basically the same list. Two checkmarks count as effort at this point",
        scores: { Ac3_execution: 1 },
      },
      {
        id: 'b',
        textCN: '完成了一半，剩下的自动滚到下周',
        textEN: 'Half done, the rest rolls into next week automatically',
        scores: { Ac3_execution: 2 },
      },
      {
        id: 'c',
        textCN: '基本清完了，并且已经写好下一张',
        textEN: 'Mostly cleared. Already drafted the next list.',
        scores: { Ac3_execution: 3 },
      },
      {
        id: 'd',
        textCN: 'list 从来不是给自己看的，事情在动就行',
        textEN: "The list isn't the point — the work moving forward is.",
        scores: { Ac3_execution: 3, Ac1_motivation: 1 },
      },
    ],
  },

  // ======================================================================
  // So1 社交主动性 — Q25, Q26
  // ======================================================================
  {
    id: 25,
    textCN: '公司团建，你进入那种"大桌子吃饭"的场合时？',
    textEN: 'Company dinner, one of those giant round-table events. You:',
    dimensions: ['So1_socialInit'],
    options: [
      {
        id: 'a',
        textCN: '默默找个角落坐下，盯着手机装忙',
        textEN: 'Quietly find a corner seat, pretend to be busy on my phone',
        scores: { So1_socialInit: 1 },
      },
      {
        id: 'b',
        textCN: '坐旁边人开口我就接，不开口就低头吃饭',
        textEN: "If my neighbor speaks I reply, if not I eat",
        scores: { So1_socialInit: 2 },
      },
      {
        id: 'c',
        textCN: '主动开启话题，气氛总得有人带',
        textEN: 'Kick off the topics. Someone has to carry the vibe',
        scores: { So1_socialInit: 3 },
      },
      {
        id: 'd',
        textCN: '十分钟内已经和半桌人加微信了',
        textEN: 'Ten minutes in, already swapped WeChat with half the table',
        scores: { So1_socialInit: 3 },
      },
    ],
  },
  {
    id: 26,
    textCN: '周末朋友取消聚会，你？',
    textEN: 'Friends cancel the weekend hangout. You:',
    dimensions: ['So1_socialInit'],
    options: [
      {
        id: 'a',
        textCN: '谢天谢地，终于可以心安理得地躺平',
        textEN: "Thank god. Now I can flop guilt-free.",
        scores: { So1_socialInit: 1 },
      },
      {
        id: 'b',
        textCN: '有点失落，就宅在家里追个剧',
        textEN: 'A bit down. Stay in, binge a show.',
        scores: { So1_socialInit: 2 },
      },
      {
        id: 'c',
        textCN: '顺手约另一个朋友，不能白打扮',
        textEN: "Hit up another friend. Can't waste the outfit",
        scores: { So1_socialInit: 3 },
      },
      {
        id: 'd',
        textCN: '直接在群里发"还有谁今晚有空的，报数"',
        textEN: 'Drop in a group chat: "who\'s free tonight, count off"',
        scores: { So1_socialInit: 3 },
      },
    ],
  },

  // ======================================================================
  // So2 人际边界感 — Q27, Q28
  // ======================================================================
  {
    id: 27,
    textCN: '同事问"你工资多少"，你？',
    textEN: "Coworker asks \"how much is your salary\". You:",
    dimensions: ['So2_interpersonal'],
    options: [
      {
        id: 'a',
        textCN: '如实说，大家都打工，有啥不能聊的',
        textEN: 'Tell the truth. We\'re all working stiffs, what\'s to hide',
        scores: { So2_interpersonal: 1 },
      },
      {
        id: 'b',
        textCN: '报个大致区间，关系再深点再细说',
        textEN: 'Give a rough range, go into detail only if we\'re close',
        scores: { So2_interpersonal: 2 },
      },
      {
        id: 'c',
        textCN: '笑笑打个哈哈岔过去',
        textEN: 'Laugh it off and change the subject',
        scores: { So2_interpersonal: 3 },
      },
      {
        id: 'd',
        textCN: '内心：这也能问？立刻拉开心理距离',
        textEN: 'Inner voice: really? Instantly increase psychological distance.',
        scores: { So2_interpersonal: 3 },
      },
    ],
  },
  {
    id: 28,
    textCN: '和新朋友认识多久，你会觉得"可以叫家人了"？',
    textEN: 'How long until a new friend feels like "basically family"?',
    dimensions: ['So2_interpersonal'],
    options: [
      {
        id: 'a',
        textCN: '一顿火锅的时间，熟了就是一家人',
        textEN: 'One hotpot dinner. Close is family.',
        scores: { So2_interpersonal: 1 },
      },
      {
        id: 'b',
        textCN: '大概几个月，经过一两次重要瞬间',
        textEN: 'Few months, after one or two important moments together',
        scores: { So2_interpersonal: 2 },
      },
      {
        id: 'c',
        textCN: '一两年起步，而且也不会真的说"家人"这个词',
        textEN: "A year or two at least, and I still wouldn't actually use the word 'family'",
        scores: { So2_interpersonal: 3 },
      },
      {
        id: 'd',
        textCN: '家人这个词我留给真正的家人',
        textEN: "I reserve 'family' for actual family.",
        scores: { So2_interpersonal: 3 },
      },
    ],
  },

  // ======================================================================
  // So3 表达与真实度 — Q29, Q30
  // ======================================================================
  {
    id: 29,
    textCN: '朋友兴冲冲给你看 ta 新买的衣服，你觉得"很一般"，你会？',
    textEN: 'A friend excitedly shows you their new outfit. You think it\'s "meh". You:',
    dimensions: ['So3_expression'],
    options: [
      {
        id: 'a',
        textCN: '直接说"说实话一般"，关系好更要实话',
        textEN: '"Honestly, it\'s meh". The closer the friend, the more honest I am',
        scores: { So3_expression: 1 },
      },
      {
        id: 'b',
        textCN: '夸一句具体的优点，其余的不提',
        textEN: 'Compliment one specific good thing, skip the rest',
        scores: { So3_expression: 2 },
      },
      {
        id: 'c',
        textCN: '"挺适合你的！"然后心里默默吐槽',
        textEN: '"Looks great on you!" — roast silently in my head',
        scores: { So3_expression: 3 },
      },
      {
        id: 'd',
        textCN: '立刻进入夸夸模式，表情管理满分',
        textEN: 'Instantly enter full compliment mode. Face control: perfect.',
        scores: { So3_expression: 3 },
      },
    ],
  },
  {
    id: 30,
    textCN: '你在领导面前、朋友面前、陌生人面前的"你"，重合度有多高？',
    textEN: 'How much overlap is there between your "self" in front of boss, friends, and strangers?',
    dimensions: ['So3_expression'],
    options: [
      {
        id: 'a',
        textCN: '基本完全一样，我懒得演',
        textEN: 'Basically identical. Too lazy to perform.',
        scores: { So3_expression: 1 },
      },
      {
        id: 'b',
        textCN: '差别不大，主要是说话口气',
        textEN: 'Not a big gap. Mostly tone of voice.',
        scores: { So3_expression: 1 },
      },
      {
        id: 'c',
        textCN: '会分场合，但核心是同一个人',
        textEN: 'I switch by context, but the core is the same person',
        scores: { So3_expression: 2 },
      },
      {
        id: 'd',
        textCN: '三个人完全不一样，切换熟练度 MAX',
        textEN: 'Three completely different people. Switching proficiency: max.',
        scores: { So3_expression: 3 },
      },
    ],
  },

  // ======================================================================
  // Q31: 隐藏 DRUNK 触发题
  // ======================================================================
  {
    id: 31,
    textCN: '周五晚上 9 点，下班刚到家，你的第一件事是？',
    textEN: 'Friday 9pm, just got home after work. First thing you do:',
    dimensions: [],
    isHiddenTrigger: true,
    hiddenTriggerOption: 'c',
    options: [
      {
        id: 'a',
        textCN: '洗个澡，打开投影，点一份夜宵',
        textEN: 'Take a shower, fire up the projector, order late-night food',
        scores: {},
      },
      {
        id: 'b',
        textCN: '瘫在沙发上刷手机，刷到睡着',
        textEN: 'Collapse on the sofa, scroll phone until I pass out',
        scores: {},
      },
      {
        id: 'c',
        textCN: '冰箱里拿出昨天剩的酒，先给自己连干三杯',
        textEN: 'Grab yesterday\'s leftover liquor, pour myself three shots straight',
        scores: {},
      },
      {
        id: 'd',
        textCN: '约朋友出门，周五怎么能浪费',
        textEN: "Text a friend to go out. No way I'm wasting a Friday.",
        scores: {},
      },
    ],
  },
];
