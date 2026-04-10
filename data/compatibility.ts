// SBTI 27 种类型配对数据
// 每种类型至少覆盖 5 种不同配对（destiny/great/fine/rocky/doomed 各一）
// 总条目数 135+

export type Verdict = 'destiny' | 'great' | 'fine' | 'rocky' | 'doomed';

export interface Compatibility {
  type1: string;
  type2: string;
  scorePercent: number; // 0-100
  verdict: Verdict;
  summaryCN: string;
  summaryEN: string;
  fightsCN: string[]; // 5 件会吵的事
  fightsEN: string[];
  dateIdeasCN: string[]; // 3 条
  dateIdeasEN: string[];
  relationshipTipsCN: string[]; // 3 条
  relationshipTipsEN: string[];
  shareableRoastCN: string; // 可分享的吐槽
  shareableRoastEN: string;
}

export const compatibilityData: Compatibility[] = [
  // ========== CTRL ==========
  {
    type1: 'CTRL',
    type2: 'MUM',
    scorePercent: 92,
    verdict: 'destiny',
    summaryCN:
      'CTRL 要秩序，MUM 要照顾人，两个人凑一起简直是「家庭运营合伙人」。一个负责把日程表画出来，一个负责把饭做好，对方起床前已经把今天的情绪也预判完了。就是有点太稳了，稳到像退休夫妇。',
    summaryEN:
      'CTRL wants order, MUM wants to take care of someone — together you are basically household ops co-founders. One runs the calendar, one runs the kitchen, and both of you predict each other\'s mood before breakfast. Almost too stable — you two feel retired already.',
    fightsCN: [
      '「你都不让我按自己的方式做」——MUM 觉得被指挥',
      '「你规划得太死」——CTRL 觉得被情绪管理',
      '谁来关灯这种小事都要走个 SOP',
      'CTRL 抱怨 MUM 太操心，MUM 抱怨 CTRL 太冷血',
      '家庭开支表格要不要共享',
    ],
    fightsEN: [
      '"You never let me do it my way" — MUM feels bossed around',
      '"Your plan is too rigid" — CTRL feels emotionally managed',
      'Even who turns off the light becomes an SOP discussion',
      'CTRL says MUM worries too much, MUM says CTRL is too cold',
      'Whether the shared spreadsheet needs a shared spreadsheet',
    ],
    dateIdeasCN: [
      '一起逛宜家，顺便把下个月的生活规划写完',
      '在家做饭、擦地、整理抽屉，两人都会觉得踏实',
      '周末去逛菜市场，顺路复盘一下本周 KPI',
    ],
    dateIdeasEN: [
      'IKEA trip and plan next month\'s life logistics on the way home',
      'Cook together, mop the floor, organize drawers — both of you get a dopamine hit',
      'Weekend farmers market with a side of KPI review',
    ],
    relationshipTipsCN: [
      'CTRL 每周至少让 MUM 赢一次，不然 MUM 会觉得自己像下属',
      'MUM 偶尔偷懒没关系，CTRL 需要学会「今天不复盘」',
      '把「我在担心你」和「我在控制你」这两句话分清楚',
    ],
    relationshipTipsEN: [
      'CTRL should let MUM win at least once a week, or MUM starts feeling like a report',
      'MUM can slack off sometimes — CTRL needs to practice "we are not reviewing this today"',
      'Learn the difference between "I\'m worrying about you" and "I\'m managing you"',
    ],
    shareableRoastCN: 'CTRL 配 MUM，生活像被行政总监接管，连吵架都有议程。',
    shareableRoastEN: 'CTRL x MUM: your life got acquired by an ops director. Even your fights have an agenda.',
  },
  {
    type1: 'CTRL',
    type2: 'BOSS',
    scorePercent: 78,
    verdict: 'great',
    summaryCN:
      '两个控制型人格住在一起，表面岁月静好，实际每天都在打无声权力拉锯。CTRL 喜欢流程，BOSS 喜欢结果，谁让谁听话都是送命题。好在两个人都讲效率，吵完架 15 分钟内能把问题解决。',
    summaryEN:
      'Two control types under one roof — looks peaceful, but you run a silent power struggle daily. CTRL loves process, BOSS loves results, and whoever tells whom to listen is a game of chicken. Upside: both of you are ruthlessly efficient, so fights resolve in 15 minutes.',
    fightsCN: [
      '谁来做最终决定',
      'CTRL 嫌 BOSS 不守流程，BOSS 嫌 CTRL 太墨迹',
      '家里应该按「规矩办」还是「我说了算」',
      '钱怎么花：BOSS 想投资，CTRL 想存定期',
      '客人来了听谁安排',
    ],
    fightsEN: [
      'Who gets the final call',
      'CTRL thinks BOSS skips process, BOSS thinks CTRL is a bottleneck',
      '"We do it by the book" vs "we do it my way"',
      'Money moves: BOSS wants to invest, CTRL wants a fixed deposit',
      'Whose hosting plan wins when guests show up',
    ],
    dateIdeasCN: [
      '一起做 PPT 写人生规划，当约会',
      '去看展，然后在咖啡馆写复盘笔记',
      '周末一起做一个小项目（比如整理出一年的账）',
    ],
    dateIdeasEN: [
      'Build a life-plan deck together and call it a date',
      'Go to an exhibition, end in a cafe writing a recap doc',
      'Spin up a weekend side project (like auditing a year of expenses)',
    ],
    relationshipTipsCN: [
      '每周轮流一个人完全让步一次',
      '不要同时在家里开项目管理会',
      '明确分工比互相指导更重要',
    ],
    relationshipTipsEN: [
      'Rotate who fully concedes each week',
      'Do not both run a PMO at home at the same time',
      'Division of labor beats mutual coaching every time',
    ],
    shareableRoastCN: 'CTRL 配 BOSS：家里不是家，是一家两个 CEO 在争首席执行。',
    shareableRoastEN: 'CTRL x BOSS: it\'s not a household, it\'s two CEOs fighting for the chief suffix.',
  },
  {
    type1: 'CTRL',
    type2: 'OJBK',
    scorePercent: 64,
    verdict: 'fine',
    summaryCN:
      'CTRL 追求完美,OJBK 追求过得去。CTRL 想改良一切,OJBK 觉得「这样就行吧」。不算天作之合但也不至于打起来,就是 CTRL 经常有种「我在一个人使劲」的错觉。',
    summaryEN:
      'CTRL wants it perfect, OJBK wants it passable. CTRL wants to refine everything, OJBK says "this is fine." Not a match made in heaven, not a fistfight either — CTRL just constantly feels like they\'re pulling the weight alone.',
    fightsCN: [
      '「差不多就行」和「差不多不行」',
      '装修怎么弄',
      '出门前的时间管理',
      '吃饭要不要提前订位',
      '周末安排还是放空',
    ],
    fightsEN: [
      '"Close enough" vs "not close enough"',
      'Renovation decisions',
      'Pre-departure timelines',
      'Do we book the table in advance',
      'Weekend plans vs weekend drift',
    ],
    dateIdeasCN: [
      '短途自驾，OJBK 负责嗨，CTRL 负责导航',
      '去 OJBK 常去的小店，让 CTRL 体验「不精致」的快乐',
      '一起看一部长电影，CTRL 负责选，OJBK 负责躺',
    ],
    dateIdeasEN: [
      'Short road trip — OJBK vibes, CTRL navigates',
      'Hit one of OJBK\'s favorite grimy spots so CTRL tastes "unpolished" joy',
      'Long movie night — CTRL picks, OJBK melts into the couch',
    ],
    relationshipTipsCN: [
      'CTRL 不要再改 OJBK 的生活方式',
      'OJBK 偶尔主动做一次 CTRL 喜欢的事',
      '「差不多」可以是一种哲学而不是犯错',
    ],
    relationshipTipsEN: [
      'CTRL: stop trying to redesign OJBK\'s lifestyle',
      'OJBK: voluntarily do one thing CTRL loves, occasionally',
      '"Good enough" can be a philosophy, not a mistake',
    ],
    shareableRoastCN: 'CTRL 配 OJBK：一个在画甘特图，一个在等他画完好去吃饭。',
    shareableRoastEN: 'CTRL x OJBK: one of you drafts gantt charts while the other waits so dinner can start.',
  },
  {
    type1: 'CTRL',
    type2: 'DRUNK',
    scorePercent: 38,
    verdict: 'rocky',
    summaryCN:
      'CTRL 要预期管理，DRUNK 要当场发挥。两个人相处像一个试图驯服龙卷风的气象局——CTRL 的计划书永远赶不上 DRUNK 下一秒的冲动。偶尔能互补，长期会把 CTRL 逼到失眠。',
    summaryEN:
      'CTRL runs on predictability, DRUNK runs on impulse. Living together is like a weather bureau trying to tame a tornado — CTRL\'s plan deck never catches up with DRUNK\'s next five seconds. Occasionally complementary, long-term CTRL stops sleeping.',
    fightsCN: [
      'DRUNK 临时取消行程',
      'CTRL 把每顿饭都排进日历',
      '钱花到哪了',
      '喝酒到几点回家',
      '「玩就玩，你激动啥」',
    ],
    fightsEN: [
      'DRUNK cancels plans at the door',
      'CTRL puts every meal on the calendar',
      'Where did the money go',
      'What time is "coming home from drinks"',
      '"We\'re just vibing, why are you shaking"',
    ],
    dateIdeasCN: [
      'Live House，CTRL 提前订票 DRUNK 现场嗨',
      '周五夜的小酒馆，限定两杯',
      '短途旅行：CTRL 做攻略 DRUNK 走偏锋',
    ],
    dateIdeasEN: [
      'Live house night — CTRL books early, DRUNK goes feral on the floor',
      'Friday dive bar, two-drink cap',
      'Short trip — CTRL makes the itinerary, DRUNK wanders off it',
    ],
    relationshipTipsCN: [
      '给 DRUNK 一个「随便的周末」，不做任何计划',
      'DRUNK 主动告知行程不要让 CTRL 自己脑补',
      '制定「禁计划日」和「必计划日」',
    ],
    relationshipTipsEN: [
      'Give DRUNK one "no-plan" weekend a month',
      'DRUNK — tell CTRL your whereabouts before CTRL imagines a funeral',
      'Schedule "planned days" and "unplanned days" officially',
    ],
    shareableRoastCN: 'CTRL 配 DRUNK：一个在 Notion 画生活，另一个把 Notion 喝了。',
    shareableRoastEN: 'CTRL x DRUNK: one of you runs life in Notion, the other drinks the Notion.',
  },
  {
    type1: 'CTRL',
    type2: 'SHIT',
    scorePercent: 22,
    verdict: 'doomed',
    summaryCN:
      'CTRL 看见 SHIT 的生活方式只会想报警。SHIT 的摆烂美学和 CTRL 的流程美学处于宇宙两端，CTRL 会想改造，SHIT 会消失，一个月后 CTRL 在朋友圈发「成年人的关系总是无声结束」。',
    summaryEN:
      'CTRL looks at SHIT\'s lifestyle and wants to call 911. SHIT\'s rot aesthetic and CTRL\'s spreadsheet aesthetic sit on opposite ends of the universe. CTRL tries to renovate, SHIT ghosts, and a month later CTRL posts "adult relationships just quietly end."',
    fightsCN: [
      '洗碗 / 倒垃圾 / 所有家务',
      '床上要不要叠被子',
      '起床时间 vs 起床是否存在',
      '周末要不要出门',
      '「你到底在干嘛」',
    ],
    fightsEN: [
      'Dishes / trash / literally any chore',
      'Do we fold the duvet',
      'Wake-up time vs wake-up existing',
      'Do we leave the house this weekend',
      '"What are you even doing with your life"',
    ],
    dateIdeasCN: [
      '说实话，这对连出门都难',
      '外卖+电影，CTRL 把厨房先擦一遍',
      '一起发呆，CTRL 别看钟就行',
    ],
    dateIdeasEN: [
      'Honestly, leaving the house is already too much',
      'Takeout + movie — CTRL scrubs the kitchen before pressing play',
      'Just stare at the ceiling together — CTRL, put the clock away',
    ],
    relationshipTipsCN: [
      '不要试图改造 SHIT，SHIT 也不要承诺做不到的事',
      '分房睡可能是救命稻草',
      '承认这段关系可能是阶段性的',
    ],
    relationshipTipsEN: [
      'Don\'t try to renovate SHIT, SHIT don\'t promise what you can\'t deliver',
      'Separate rooms might be a life-saver',
      'Accept this relationship is probably a phase',
    ],
    shareableRoastCN: 'CTRL 配 SHIT：一个想做人生管理，一个是人生本身需要被管理。',
    shareableRoastEN: 'CTRL x SHIT: one wants to manage life, the other IS the life that needs managing.',
  },

  // ========== BOSS ==========
  {
    type1: 'BOSS',
    type2: 'GOGO',
    scorePercent: 89,
    verdict: 'destiny',
    summaryCN:
      'BOSS 负责定方向，GOGO 负责冲，两个人凑一起能把任何小事做成一个项目。相处节奏快、野心大、沟通直接，唯一的问题是两个人都太强，吵架时像两台火箭对撞。',
    summaryEN:
      'BOSS sets the direction, GOGO runs it like a startup sprint. Anything — brunch, vacation, therapy — becomes a project. Fast, ambitious, direct. The only issue: you\'re both rockets, and rocket fights are loud.',
    fightsCN: [
      '谁是主导谁是执行',
      'BOSS 嫌 GOGO 冲太快，GOGO 嫌 BOSS 只会下指令',
      '周末是加班还是旅游',
      '「我是为你好」这句话谁能说',
      '钱的使用权',
    ],
    fightsEN: [
      'Who leads, who executes',
      'BOSS thinks GOGO moves too fast, GOGO thinks BOSS only issues orders',
      'Weekend = grind or vacation',
      'Who gets to say "I\'m doing this for you"',
      'Spending rights',
    ],
    dateIdeasCN: [
      '一起定一个两人目标：今年攒多少、读几本书',
      '去一个两人都没去过的城市，不做任何攻略',
      '共同学习一个新技能，比如冲浪或做饭',
    ],
    dateIdeasEN: [
      'Set a joint goal: savings, books read, whatever',
      'Fly somewhere neither of you has been — no itinerary',
      'Learn a new skill together, like surfing or cooking',
    ],
    relationshipTipsCN: [
      '约定每周一次「不谈事业」日',
      '别把对方当下属',
      '吵架时先暂停 10 分钟再说话',
    ],
    relationshipTipsEN: [
      'Declare one "no career talk" day a week',
      'Do not treat each other like a direct report',
      'During fights, pause 10 minutes before speaking',
    ],
    shareableRoastCN: 'BOSS 配 GOGO：他们的恋爱像两家创业公司在合并，浪漫约等于一份 term sheet。',
    shareableRoastEN: 'BOSS x GOGO: dating them is like two startups merging — romance is basically a term sheet.',
  },
  {
    type1: 'BOSS',
    type2: 'THIN-K',
    scorePercent: 75,
    verdict: 'great',
    summaryCN:
      'BOSS 擅长决策,THIN-K 擅长分析,一个拍板一个补刀,组合起来像董事长+首席战略官。问题是 BOSS 不爱听太多分析,THIN-K 又忍不住要分析,久了会憋出内伤。',
    summaryEN:
      'BOSS decides, THIN-K analyzes. One ships, one shades in the whys — chairman plus chief strategy officer. Catch: BOSS doesn\'t want long analysis, THIN-K can\'t help analyzing. Over time, THIN-K develops silent ulcers.',
    fightsCN: [
      '「你能不能别想这么多」',
      'THIN-K 觉得 BOSS 太冲动',
      '买大件之前要不要做 research',
      '情绪要不要表达',
      'BOSS 抱怨 THIN-K 不行动',
    ],
    fightsEN: [
      '"Can you just stop overthinking"',
      'THIN-K thinks BOSS moves reckless',
      'Do we research before big purchases',
      'Do we voice feelings',
      'BOSS complains THIN-K stalls',
    ],
    dateIdeasCN: [
      '一起逛书店再去咖啡馆聊书',
      '看一部悬疑片然后辩论结局',
      '做一个小的共同投资（基金或搞副业）',
    ],
    dateIdeasEN: [
      'Bookstore crawl, end in a cafe debating the chapters',
      'Watch a thriller and argue about the ending',
      'Run a small joint investment — an index fund, a side hustle, whatever',
    ],
    relationshipTipsCN: [
      'BOSS 要学会说「你分析得对」',
      'THIN-K 要接受有时候没有正确答案',
      '重要决定给 THIN-K 一天时间思考',
    ],
    relationshipTipsEN: [
      'BOSS: practice saying "your analysis is right"',
      'THIN-K: accept some calls have no clean answer',
      'Give THIN-K 24 hours before any big decision',
    ],
    shareableRoastCN: 'BOSS 配 THIN-K：一个人按照结论生活,另一个永远在写结论。',
    shareableRoastEN: 'BOSS x THIN-K: one lives by conclusions, the other is still writing them.',
  },
  {
    type1: 'BOSS',
    type2: 'SEXY',
    scorePercent: 62,
    verdict: 'fine',
    summaryCN:
      'BOSS 有吸引力,SEXY 也有吸引力,两个人互相吸引的那一刻很爽。但 BOSS 的世界观是「战斗」,SEXY 的世界观是「氛围」,慢慢两个人就会发现对方的语言系统不同。',
    summaryEN:
      'BOSS is magnetic, SEXY is magnetic — the attraction phase is electric. But BOSS sees the world as combat, SEXY sees it as ambience. Eventually you realize you\'re running on different operating systems.',
    fightsCN: [
      '谁在社交场合更受欢迎',
      'SEXY 嫌 BOSS 不够浪漫，BOSS 嫌 SEXY 不务正业',
      '约会还是加班',
      '朋友圈里的照片谁是 C 位',
      '「你是不是在装」',
    ],
    fightsEN: [
      'Who gets more attention at parties',
      'SEXY says BOSS isn\'t romantic, BOSS says SEXY isn\'t productive',
      'Date night or late night at work',
      'Who gets the center photo on social',
      '"Are you putting on a show again"',
    ],
    dateIdeasCN: [
      '高级餐厅+红酒，让 SEXY 的氛围感带节奏',
      '去看一场话剧或艺术展',
      '一起办一场小型派对',
    ],
    dateIdeasEN: [
      'High-end dinner with wine — let SEXY run the vibe',
      'Go to a play or gallery opening',
      'Co-host a small private party',
    ],
    relationshipTipsCN: [
      'BOSS 要学会偶尔不做「第一」',
      'SEXY 要理解 BOSS 的爱是「行动」而不是「氛围」',
      '互相夸奖要说出口',
    ],
    relationshipTipsEN: [
      'BOSS: step out of the spotlight sometimes',
      'SEXY: BOSS\'s love language is actions, not ambience',
      'Say the compliment out loud',
    ],
    shareableRoastCN: 'BOSS 配 SEXY：外人看是神仙眷侣，内部是两个主角在抢 C 位。',
    shareableRoastEN: 'BOSS x SEXY: outside people see power couple, inside it\'s two leads fighting for the center frame.',
  },
  {
    type1: 'BOSS',
    type2: 'ZZZZ',
    scorePercent: 41,
    verdict: 'rocky',
    summaryCN:
      'BOSS 想把人生跑成一场短跑,ZZZZ 想把人生睡过去。BOSS 会拉着 ZZZZ 去健身房、投资、学新技能,ZZZZ 只想在床上续命。爱可能有,但节奏差太多会累垮 BOSS。',
    summaryEN:
      'BOSS wants to sprint through life, ZZZZ wants to sleep through it. BOSS drags ZZZZ to the gym, to investing, to a new skill. ZZZZ just wants one more hour in bed. Love might exist — but the tempo gap will grind BOSS down.',
    fightsCN: [
      '为什么还在床上',
      'BOSS 给 ZZZZ 规划了人生,ZZZZ 没看',
      '「你这样下去怎么办」',
      '周末是健身还是补觉',
      '钱要不要花在自我投资上',
    ],
    fightsEN: [
      'Why are you still in bed',
      'BOSS made ZZZZ a life plan, ZZZZ never opened it',
      '"What are you going to do with your life"',
      'Weekend gym or weekend nap',
      'Should we spend on self-improvement',
    ],
    dateIdeasCN: [
      '宅家一整天不出门',
      '按摩+泡温泉,BOSS 得学着慢下来',
      '一起看一部让人想睡的文艺片',
    ],
    dateIdeasEN: [
      'Indoor day, zero outings',
      'Massage + hot springs — BOSS forced to downshift',
      'An art film long enough to nap through',
    ],
    relationshipTipsCN: [
      'BOSS 不要把 ZZZZ 当改造项目',
      'ZZZZ 主动做一件小事就能让 BOSS 感动',
      '每周至少一天允许躺着不动',
    ],
    relationshipTipsEN: [
      'BOSS: ZZZZ is not a renovation project',
      'ZZZZ: one small proactive move will melt BOSS',
      'Protect one guaranteed do-nothing day a week',
    ],
    shareableRoastCN: 'BOSS 配 ZZZZ：一个人在冲 KPI,另一个人在冲被窝。',
    shareableRoastEN: 'BOSS x ZZZZ: one of you is sprinting to KPIs, the other is sprinting back to bed.',
  },
  {
    type1: 'BOSS',
    type2: 'DEAD',
    scorePercent: 19,
    verdict: 'doomed',
    summaryCN:
      'BOSS 的能量场会把 DEAD 直接按在地上起不来。BOSS 想推进,DEAD 连「推进」这两个字都觉得重。这对从第一次约会就开始倒数分手日期。',
    summaryEN:
      'BOSS\'s energy field will pin DEAD to the floor. BOSS pushes forward, DEAD finds the word "forward" exhausting. You two start counting down to the breakup from date one.',
    fightsCN: [
      '「你能不能有点反应」',
      'BOSS 想冲,DEAD 觉得活着就够了',
      '朋友圈一个天天晒,一个半年不更',
      '钱谁来管',
      '未来规划之类的话题',
    ],
    fightsEN: [
      '"Can you please react"',
      'BOSS wants to charge, DEAD thinks breathing is enough',
      'One posts daily, the other hasn\'t posted in six months',
      'Who handles money',
      'Anything involving the word "future"',
    ],
    dateIdeasCN: [
      '低强度散步,BOSS 别带 to-do list',
      '在家点外卖看电视',
      '去个安静的咖啡馆,BOSS 不许打开笔记本',
    ],
    dateIdeasEN: [
      'A low-energy walk — BOSS, leave the to-do list',
      'Takeout on the couch in front of a screen',
      'A quiet cafe — BOSS, no laptops allowed',
    ],
    relationshipTipsCN: [
      'BOSS 不要指望 DEAD 回满你的情绪价值',
      'DEAD 要有基本的回应,哪怕一句「嗯」',
      '也许这段关系不适合长期经营',
    ],
    relationshipTipsEN: [
      'BOSS: don\'t expect DEAD to mirror your emotional output',
      'DEAD: bare-minimum responses matter — even a grunt helps',
      'Maybe this relationship is not built for the long haul',
    ],
    shareableRoastCN: 'BOSS 配 DEAD：一个在拼未来,一个在拼还有没有未来。',
    shareableRoastEN: 'BOSS x DEAD: one is building a future, the other is wondering if there is one.',
  },

  // ========== GOGO ==========
  {
    type1: 'GOGO',
    type2: 'LOVE-R',
    scorePercent: 91,
    verdict: 'destiny',
    summaryCN:
      'GOGO 的冲劲和 LOVE-R 的投入度拼在一起就是「热恋永动机」。一个推着关系向前,一个把感情烧到最浓。唯一的风险是两个人都容易过载,恋爱爽的时候爽,崩的时候也彻底。',
    summaryEN:
      'GOGO\'s drive plus LOVE-R\'s all-in devotion equals a perpetual honeymoon engine. One pushes the relationship forward, one burns the feelings to the max. Risk: both overload easily. When it\'s good, it\'s peak. When it crashes, it crashes hard.',
    fightsCN: [
      'GOGO 去忙了,LOVE-R 感觉被忽略',
      'LOVE-R 情感表达多到让 GOGO 喘不过气',
      '朋友和爱情谁优先',
      '「你今天为什么没说想我」',
      '未来规划冲突',
    ],
    fightsEN: [
      'GOGO gets busy, LOVE-R feels abandoned',
      'LOVE-R floods feelings, GOGO needs air',
      'Friends vs relationship priority',
      '"Why didn\'t you say you missed me today"',
      'Future planning mismatch',
    ],
    dateIdeasCN: [
      '连续三天约会不出门',
      '一起报一个双人课程',
      '写一个两人的未来时间线',
    ],
    dateIdeasEN: [
      'Three-day stay-in date marathon',
      'Sign up for a couples\' class together',
      'Draft a shared five-year timeline',
    ],
    relationshipTipsCN: [
      'GOGO 每天至少发一次「想你」',
      'LOVE-R 给 GOGO 一些事业空间',
      '冷静期一旦说出口就要执行',
    ],
    relationshipTipsEN: [
      'GOGO: send one "miss you" a day, minimum',
      'LOVE-R: give GOGO career breathing room',
      'If someone calls for a cool-down, honor it',
    ],
    shareableRoastCN: 'GOGO 配 LOVE-R：恋爱像被点火的火箭,过程刺激,结局炸不炸看运气。',
    shareableRoastEN: 'GOGO x LOVE-R: dating is a lit rocket — thrilling ride, landing is up to luck.',
  },
  {
    type1: 'GOGO',
    type2: 'HHHH',
    scorePercent: 80,
    verdict: 'great',
    summaryCN:
      'GOGO 的动力和 HHHH 的喜剧感简直是团建绝配。GOGO 推着 HHHH 往前冲,HHHH 让 GOGO 不至于太严肃。两个人走在一起就是一场没有剧本的真人秀。',
    summaryEN:
      'GOGO\'s drive plus HHHH\'s comedy instinct is the ultimate duo. GOGO drags HHHH forward, HHHH stops GOGO from taking everything too seriously. Together you\'re basically an unscripted reality show.',
    fightsCN: [
      'HHHH 把 GOGO 想认真谈的事变成段子',
      'GOGO 嫌 HHHH 不靠谱',
      '「你能不能一次正经一次」',
      '钱怎么花,一个要存一个要玩',
      '社交圈合并问题',
    ],
    fightsEN: [
      'HHHH turns GOGO\'s serious talk into a punchline',
      'GOGO thinks HHHH isn\'t reliable',
      '"Can you be serious for five minutes"',
      'Save vs spend on fun stuff',
      'Social circle merging drama',
    ],
    dateIdeasCN: [
      '脱口秀+夜宵',
      '一起做一个沙雕 vlog',
      '密室逃脱或剧本杀',
    ],
    dateIdeasEN: [
      'Stand-up show plus late-night food',
      'Film a dumb joint vlog',
      'Escape room or murder mystery night',
    ],
    relationshipTipsCN: [
      'GOGO 偶尔让 HHHH 主导氛围',
      'HHHH 遇到 GOGO 说「认真听」就要切换',
      '感情中不要拿对方当笑料',
    ],
    relationshipTipsEN: [
      'GOGO: occasionally let HHHH run the vibe',
      'HHHH: when GOGO says "listen", snap out of joke mode',
      'Don\'t turn your partner into material',
    ],
    shareableRoastCN: 'GOGO 配 HHHH：一个开车,一个在副驾一直在笑,连红绿灯都能笑出梗。',
    shareableRoastEN: 'GOGO x HHHH: one drives, the other cackles at every red light like it\'s a punchline.',
  },
  {
    type1: 'GOGO',
    type2: 'THAN-K',
    scorePercent: 58,
    verdict: 'fine',
    summaryCN:
      'GOGO 想往前冲,THAN-K 想先谢谢生活。两个人节奏不太一样但并不对立,THAN-K 会让 GOGO 学会停下来感恩,GOGO 会让 THAN-K 敢多要一点。就是有时候彼此会觉得「你在客气啥」。',
    summaryEN:
      'GOGO sprints ahead, THAN-K stops to thank the universe. Different tempo, not opposing energy. THAN-K teaches GOGO to pause and feel grateful, GOGO teaches THAN-K to ask for more. Sometimes both ask "why are you being so polite."',
    fightsCN: [
      'GOGO 抱怨 THAN-K 太客气',
      'THAN-K 觉得 GOGO 不懂惜福',
      '「你为什么总道歉」',
      '收礼物的反应对不上',
      '目标和满足感之间的矛盾',
    ],
    fightsEN: [
      'GOGO thinks THAN-K is too polite',
      'THAN-K feels GOGO doesn\'t appreciate enough',
      '"Why do you keep apologizing"',
      'Gift-receiving reactions mismatch',
      'Ambition vs contentment friction',
    ],
    dateIdeasCN: [
      '一起做一件感恩的小事,比如给父母写卡',
      '公园野餐边晒太阳边发呆',
      '吃一顿贵的但没什么理由的饭',
    ],
    dateIdeasEN: [
      'Do a small gratitude thing together, like writing to your parents',
      'Picnic in a park with zero agenda',
      'Have an expensive dinner for no reason',
    ],
    relationshipTipsCN: [
      'GOGO 不要让 THAN-K 觉得自己拖后腿',
      'THAN-K 有需求要直接说',
      '定期回看两人的「感恩时刻」',
    ],
    relationshipTipsEN: [
      'GOGO: don\'t make THAN-K feel like a drag',
      'THAN-K: state needs directly, stop softening',
      'Recap your shared "grateful moments" on a cadence',
    ],
    shareableRoastCN: 'GOGO 配 THAN-K：一个在冲业绩,一个在谢天谢地冲到这步。',
    shareableRoastEN: 'GOGO x THAN-K: one is chasing the next win, the other is thanking the sky for the last one.',
  },
  {
    type1: 'GOGO',
    type2: 'MONK',
    scorePercent: 35,
    verdict: 'rocky',
    summaryCN:
      'GOGO 的人生哲学是「冲」,MONK 的人生哲学是「算了」。GOGO 想要一起建功立业,MONK 只想在阳台种菜。本质不对立但方向相反,拧着拧着都累了。',
    summaryEN:
      'GOGO\'s life philosophy is "charge." MONK\'s life philosophy is "let it go." GOGO wants to build an empire together, MONK wants to grow herbs on the balcony. Not opposing forces, just diverging paths that both get tired fighting.',
    fightsCN: [
      '「你怎么一点欲望都没有」',
      'MONK 觉得 GOGO 太焦虑',
      '存钱方式:攒钱 vs 断舍离',
      '「你是不是不爱我了」因为 MONK 情绪波动小',
      '未来要不要买房',
    ],
    fightsEN: [
      '"Do you have zero ambition"',
      'MONK thinks GOGO runs on anxiety',
      'Saving vs minimalism',
      '"Are you losing interest" because MONK barely reacts',
      'Do we buy property, yes or no',
    ],
    dateIdeasCN: [
      '去寺庙或安静景区走一天',
      '茶馆聊天,GOGO 把手机放下',
      '做一顿素食,MONK 主导',
    ],
    dateIdeasEN: [
      'Spend a full day at a temple or quiet scenic area',
      'Teahouse chat — GOGO, phone off',
      'Cook a vegetarian meal — MONK leads',
    ],
    relationshipTipsCN: [
      'GOGO 不要逼 MONK 加速',
      'MONK 不要嘲笑 GOGO 的野心',
      '有些分歧是世界观级别的,承认就好',
    ],
    relationshipTipsEN: [
      'GOGO: don\'t force-accelerate MONK',
      'MONK: don\'t mock GOGO\'s ambition',
      'Some gaps are worldview-level — naming them is enough',
    ],
    shareableRoastCN: 'GOGO 配 MONK：一个在跑赛道,一个在问为什么要有赛道。',
    shareableRoastEN: 'GOGO x MONK: one runs the track, the other asks why the track exists.',
  },
  {
    type1: 'GOGO',
    type2: 'POOR',
    scorePercent: 28,
    verdict: 'doomed',
    summaryCN:
      'GOGO 要生活有势能,POOR 的人生常年在低电量模式。GOGO 的「一起冲」会让 POOR 脑内警报拉满,POOR 的「我不行」会让 GOGO 的耐心被快速消耗。感情里会变成一个推一个拉的循环,推到最后两个人都空了。',
    summaryEN:
      'GOGO wants momentum, POOR lives in power-save mode. GOGO\'s "let\'s go" sets off POOR\'s internal alarms, POOR\'s "I can\'t" drains GOGO\'s patience. It becomes a push-pull loop until both of you are empty.',
    fightsCN: [
      '「你怎么总觉得自己不行」',
      'POOR 觉得 GOGO 在炫耀',
      '花钱吵架,一个要投资一个不敢',
      '未来规划,GOGO 觉得 POOR 没有',
      '情绪责任分配',
    ],
    fightsEN: [
      '"Why do you always think you can\'t"',
      'POOR feels GOGO is showing off',
      'Money fights — GOGO wants to invest, POOR is scared',
      'Future planning — GOGO thinks POOR has none',
      'Emotional labor imbalance',
    ],
    dateIdeasCN: [
      '低成本但有小仪式的晚餐',
      '一起去免费展览,POOR 不用心虚',
      '徒步,GOGO 注意放慢脚步',
    ],
    dateIdeasEN: [
      'Low-cost dinner with a little ritual',
      'Free exhibition — POOR doesn\'t have to feel behind',
      'Hike — GOGO slows the pace on purpose',
    ],
    relationshipTipsCN: [
      'GOGO 别把 POOR 的小成就当小事',
      'POOR 不要把 GOGO 的积极当施压',
      '也许这段关系需要治疗而不是努力',
    ],
    relationshipTipsEN: [
      'GOGO: never call POOR\'s small wins small',
      'POOR: don\'t read GOGO\'s positivity as pressure',
      'This relationship may need therapy more than effort',
    ],
    shareableRoastCN: 'GOGO 配 POOR：一个问「我们今年要做什么」,一个答「活着吧」。',
    shareableRoastEN: 'GOGO x POOR: one asks "what\'s the year-end goal", the other answers "staying alive."',
  },

  // ========== SEXY ==========
  {
    type1: 'SEXY',
    type2: 'Dior-s',
    scorePercent: 90,
    verdict: 'destiny',
    summaryCN:
      'SEXY 负责气场,Dior-s 负责质感,两个人站一起就是一组移动时尚封面。生活充满审美仪式感,吃饭都要摆盘。唯一的问题是两个人对外界印象在意程度都很高,吵架容易上升到「你让我没面子」。',
    summaryEN:
      'SEXY brings aura, Dior-s brings taste. Together you\'re a walking editorial cover. Life becomes a rolling photoshoot — even dinner gets plated. Only catch: you both care deeply about appearances, and fights escalate fast to "you embarrassed me."',
    fightsCN: [
      '在朋友面前谁站 C 位',
      '穿搭意见冲突',
      '花钱方式,双方都不止',
      '社交活动频率',
      '「别人会怎么看我们」',
    ],
    fightsEN: [
      'Who gets the center position among friends',
      'Outfit opinions clash',
      'Both overspend — in different ways',
      'Event calendar density',
      '"What will people think of us"',
    ],
    dateIdeasCN: [
      '高档餐厅+小范围派对',
      '一起看时装周直播',
      '去 vintage 市集淘货',
    ],
    dateIdeasEN: [
      'High-end dinner plus a small, curated party',
      'Watch a fashion week livestream together',
      'Go thrifting at a vintage market',
    ],
    relationshipTipsCN: [
      '每周至少一次不为外人活的日子',
      '不要用对方的审美来衡量自己',
      '公开场合互相捧场比互相较劲好',
    ],
    relationshipTipsEN: [
      'Protect at least one "not performing for anyone" day a week',
      'Don\'t measure yourself with your partner\'s taste',
      'In public, hype each other up instead of subtly competing',
    ],
    shareableRoastCN: 'SEXY 配 Dior-s：他们的爱情每一帧都能发朋友圈,唯独没有素颜照。',
    shareableRoastEN: 'SEXY x Dior-s: every frame of their relationship is grid-worthy — none of them are makeup-free.',
  },
  {
    type1: 'SEXY',
    type2: 'LOVE-R',
    scorePercent: 77,
    verdict: 'great',
    summaryCN:
      'SEXY 收到的情绪投入 LOVE-R 全部拉满,SEXY 反过来给 LOVE-R 一种「被选中」的感觉。两个人的热恋像肥皂剧,浓度高到让朋友都吐槽。长期看需要 SEXY 学会踏实,LOVE-R 学会留白。',
    summaryEN:
      'LOVE-R pours every ounce of emotion into SEXY, SEXY makes LOVE-R feel "chosen." Honeymoon phase reads like a soap opera — your friends roll their eyes. Long-term, SEXY needs to settle, LOVE-R needs to leave breathing room.',
    fightsCN: [
      'SEXY 的社交圈让 LOVE-R 不安',
      'LOVE-R 的黏度让 SEXY 想透气',
      '「你以前也这样对别人吗」',
      '礼物标准',
      '吵架后谁先低头',
    ],
    fightsEN: [
      'SEXY\'s social circle makes LOVE-R uneasy',
      'LOVE-R\'s clinginess makes SEXY gasp for air',
      '"Did you act this way with your ex"',
      'Gift standards',
      'Who apologizes first',
    ],
    dateIdeasCN: [
      '浪漫晚餐配现场音乐',
      '周末 staycation',
      '一起拍一组写真',
    ],
    dateIdeasEN: [
      'Romantic dinner with live music',
      'Weekend staycation',
      'Book a photoshoot together',
    ],
    relationshipTipsCN: [
      'SEXY 不要让 LOVE-R 常感不安全',
      'LOVE-R 给 SEXY 一些独处时间',
      '不要把感情当成一场公演',
    ],
    relationshipTipsEN: [
      'SEXY: don\'t leave LOVE-R feeling unsafe',
      'LOVE-R: grant SEXY some solo hours',
      'Stop performing the relationship for the public',
    ],
    shareableRoastCN: 'SEXY 配 LOVE-R：爱情像演唱会,一个是主唱,一个是头排粉丝。',
    shareableRoastEN: 'SEXY x LOVE-R: love feels like a concert — one is the lead singer, the other is the front-row superfan.',
  },
  {
    type1: 'SEXY',
    type2: 'OJBK',
    scorePercent: 60,
    verdict: 'fine',
    summaryCN:
      'SEXY 是舞台型,OJBK 是观众型。SEXY 在的场合都是主角,OJBK 就默默给对方鼓掌。相处舒服,但久了 SEXY 会觉得「你对我没感觉」,OJBK 会觉得「你太爱演」。',
    summaryEN:
      'SEXY is stage-type, OJBK is audience-type. SEXY owns every room, OJBK just claps quietly from the back. It works — until SEXY starts feeling unfelt and OJBK starts feeling performed-at.',
    fightsCN: [
      'SEXY 抱怨 OJBK 没反应',
      'OJBK 抱怨 SEXY 太爱演',
      '「你到底在不在乎」',
      '社交场合频率',
      '花钱优先级',
    ],
    fightsEN: [
      'SEXY complains OJBK gives nothing back',
      'OJBK complains SEXY is always performing',
      '"Do you actually care"',
      'Event frequency',
      'Spending priorities',
    ],
    dateIdeasCN: [
      '去一个让 SEXY 发光的小型派对',
      '一起看电影,OJBK 负责选',
      '周末逛逛老街',
    ],
    dateIdeasEN: [
      'A small party where SEXY can shine',
      'Movie night — OJBK picks',
      'Stroll through an old street neighborhood',
    ],
    relationshipTipsCN: [
      'OJBK 偶尔说句「你今天真好看」',
      'SEXY 接受 OJBK 的爱是低调型',
      '不要互相比较表达力',
    ],
    relationshipTipsEN: [
      'OJBK: drop a "you look good today" once in a while',
      'SEXY: OJBK\'s love is low-key, accept it',
      'Stop comparing each other\'s expressiveness',
    ],
    shareableRoastCN: 'SEXY 配 OJBK：一个在舞台上发光,一个在观众席里刷手机。',
    shareableRoastEN: 'SEXY x OJBK: one is shining on stage, the other is scrolling in the audience.',
  },
  {
    type1: 'SEXY',
    type2: 'IMSB',
    scorePercent: 36,
    verdict: 'rocky',
    summaryCN:
      'SEXY 活在聚光灯下,IMSB 活在角落。SEXY 一走进房间就抢话题,IMSB 只想找个地方消失。SEXY 会觉得 IMSB「木」,IMSB 会觉得 SEXY「太亮」,久了两边都耗神。',
    summaryEN:
      'SEXY lives in the spotlight, IMSB lives in the corner. SEXY enters a room and hijacks the topic, IMSB just wants to disappear into the wallpaper. SEXY finds IMSB "flat," IMSB finds SEXY "too much." Over time, both get drained.',
    fightsCN: [
      '「你为什么不跟我去」',
      'IMSB 觉得 SEXY 的朋友太多',
      '派对 vs 宅家',
      '拍照频率',
      '「你是不是嫌我无聊」',
    ],
    fightsEN: [
      '"Why won\'t you come with me"',
      'IMSB thinks SEXY has too many friends',
      'Parties vs staying in',
      'Photo frequency',
      '"Do you find me boring"',
    ],
    dateIdeasCN: [
      '小型展览,安静又有氛围',
      '一起做手工或陶艺',
      '在家一起做饭不带任何直播',
    ],
    dateIdeasEN: [
      'Small exhibition — quiet, atmospheric',
      'Pottery or crafts class together',
      'Cook at home with zero cameras on',
    ],
    relationshipTipsCN: [
      'SEXY 不要拉 IMSB 去所有活动',
      'IMSB 偶尔陪一次就够 SEXY 记很久',
      '表达频率要找中间值',
    ],
    relationshipTipsEN: [
      'SEXY: don\'t drag IMSB to every event',
      'IMSB: showing up once will make SEXY feel loved for weeks',
      'Find a midpoint on expression frequency',
    ],
    shareableRoastCN: 'SEXY 配 IMSB：一个想发朋友圈,一个希望没人看到自己。',
    shareableRoastEN: 'SEXY x IMSB: one wants to post the moment, the other wants to not exist on camera.',
  },
  {
    type1: 'SEXY',
    type2: 'SHIT',
    scorePercent: 17,
    verdict: 'doomed',
    summaryCN:
      'SEXY 的生活需要光线、氛围、照片。SHIT 的生活需要没人打扰、无需洗澡。SEXY 走到哪儿都想留下痕迹,SHIT 最大的愿望是没有任何痕迹。这俩在一起基本就是一场 SEXY 在改造 SHIT 的自虐秀。',
    summaryEN:
      'SEXY\'s life needs lighting, vibes, photos. SHIT\'s life needs no interruption and optional showering. SEXY leaves traces everywhere, SHIT\'s dream is leaving zero traces. This couple is basically SEXY running a one-person makeover show on SHIT.',
    fightsCN: [
      '洗澡频率',
      '出门频率',
      '穿衣品味',
      '朋友圈对比',
      '「你到底有没有在乎我」',
    ],
    fightsEN: [
      'Shower frequency',
      'How often do we leave the house',
      'Wardrobe taste',
      'Social media comparisons',
      '"Do you actually care about me"',
    ],
    dateIdeasCN: [
      '不存在约会',
      '点外卖看电影,SEXY 少拍一次',
      '让 SHIT 陪 SEXY 去一次咖啡馆,就当极限运动',
    ],
    dateIdeasEN: [
      'Dates are theoretical at this point',
      'Takeout and a movie — SEXY, fewer photos',
      'Drag SHIT to a cafe — treat it as extreme sports',
    ],
    relationshipTipsCN: [
      '可能真的不合适',
      '不要互相改造',
      '保留基本尊重就好',
    ],
    relationshipTipsEN: [
      'This might genuinely not work',
      'Don\'t try to renovate each other',
      'Basic respect is the floor',
    ],
    shareableRoastCN: 'SEXY 配 SHIT：一个在演主角,一个连剧组都懒得去。',
    shareableRoastEN: 'SEXY x SHIT: one is playing the lead, the other can\'t even be bothered to show up to set.',
  },

  // ========== MUM ==========
  {
    type1: 'MUM',
    type2: 'JOKE-R',
    scorePercent: 86,
    verdict: 'destiny',
    summaryCN:
      'MUM 的照顾欲正好被 JOKE-R 的「永远像没长大的孩子」吸收。JOKE-R 负责制造快乐，MUM 负责善后。这俩一起相处像家庭情景喜剧，观众笑声都能听见。',
    summaryEN:
      'MUM\'s caregiving instincts get perfectly absorbed by JOKE-R\'s eternal-kid energy. JOKE-R manufactures joy, MUM handles cleanup. Together you feel like a sitcom — you can almost hear the laugh track.',
    fightsCN: [
      'JOKE-R 说错了话 MUM 收拾烂摊子',
      'MUM 觉得 JOKE-R 不够成熟',
      '「你能不能认真一下」',
      '家里谁做饭谁洗碗',
      '聚会上 JOKE-R 太放飞',
    ],
    fightsEN: [
      'JOKE-R says something dumb, MUM does damage control',
      'MUM thinks JOKE-R won\'t grow up',
      '"Can you be serious for a minute"',
      'Who cooks, who does dishes',
      'JOKE-R goes feral at parties',
    ],
    dateIdeasCN: [
      '在家里做饭 + 看脱口秀',
      '周末去看一场沙雕喜剧',
      '一起做一个手工烘焙',
    ],
    dateIdeasEN: [
      'Home cooking plus a stand-up special',
      'Catch a dumb comedy on the weekend',
      'Baking date',
    ],
    relationshipTipsCN: [
      'MUM 不要用「我为你好」压制 JOKE-R',
      'JOKE-R 在严肃话题上切换一下模式',
      '笑声是这段关系的资产，别消耗掉',
    ],
    relationshipTipsEN: [
      'MUM: stop using "for your own good" to silence JOKE-R',
      'JOKE-R: on real topics, switch modes',
      'Laughter is this relationship\'s core asset — don\'t burn it out',
    ],
    shareableRoastCN: 'MUM 配 JOKE-R：一个负责端汤，一个负责把汤说成段子。',
    shareableRoastEN: 'MUM x JOKE-R: one serves the soup, the other turns the soup into a bit.',
  },
  {
    type1: 'MUM',
    type2: 'THAN-K',
    scorePercent: 82,
    verdict: 'great',
    summaryCN:
      'MUM 爱照顾，THAN-K 懂感恩，两个人之间像一条温柔的循环链：MUM 给，THAN-K 记在心里并回馈。相处没啥戏剧冲突，就是偶尔 THAN-K 太客气让 MUM 觉得「我们不至于这么生疏吧」。',
    summaryEN:
      'MUM gives, THAN-K remembers and gives back. It\'s a gentle circular loop — very little drama. The only catch: THAN-K\'s over-politeness sometimes makes MUM ask "are we strangers or something?"',
    fightsCN: [
      '「你不用这么客气」',
      'MUM 觉得 THAN-K 太压抑自己',
      '节日怎么庆祝',
      '亲戚关系处理',
      'THAN-K 不敢开口要',
    ],
    fightsEN: [
      '"You don\'t need to be this formal"',
      'MUM thinks THAN-K bottles up',
      'How to do holidays',
      'Handling extended family',
      'THAN-K can\'t voice needs',
    ],
    dateIdeasCN: [
      '在家做一顿家常菜',
      '给双方父母写一封信',
      '去老城区散步',
    ],
    dateIdeasEN: [
      'Home-cooked family-style meal',
      'Write both sets of parents a letter',
      'Walk through the old town',
    ],
    relationshipTipsCN: [
      'THAN-K 要学会提要求',
      'MUM 要让 THAN-K 觉得可以任性一次',
      '定期做一次「相互感谢」的对话',
    ],
    relationshipTipsEN: [
      'THAN-K: practice asking',
      'MUM: give THAN-K permission to be a bit selfish',
      'Schedule a "mutual thanks" conversation regularly',
    ],
    shareableRoastCN: 'MUM 配 THAN-K：两个人互相客气得像去了亲戚家做客。',
    shareableRoastEN: 'MUM x THAN-K: they\'re so polite it feels like you\'re visiting someone else\'s relatives.',
  },
  {
    type1: 'MUM',
    type2: 'POOR',
    scorePercent: 63,
    verdict: 'fine',
    summaryCN:
      'MUM 的治愈能力对 POOR 来说是一味药，但不是万能药。POOR 的自我怀疑经常掉进 MUM 的「保护圈」，时间长了 MUM 会累，POOR 也会愧疚。感情能走，但得看 POOR 愿不愿意走出自己的洞。',
    summaryEN:
      'MUM\'s healing energy is medicine for POOR — but not a cure-all. POOR\'s self-doubt keeps falling into MUM\'s protection bubble. Over time MUM burns out and POOR feels guilty. It can work — if POOR chooses to climb out of the hole.',
    fightsCN: [
      'POOR 的情绪黑洞',
      '「你已经很好了」POOR 不信',
      '花钱的焦虑',
      '谁承担更多情感劳动',
      'MUM 的疲惫',
    ],
    fightsEN: [
      'POOR\'s emotional black hole',
      '"You\'re already good enough" — POOR refuses to believe',
      'Money anxiety',
      'Emotional labor imbalance',
      'MUM\'s burnout',
    ],
    dateIdeasCN: [
      '低成本但有仪式感的在家约会',
      '一起做一次志愿活动',
      '周末去一个便宜的小景点',
    ],
    dateIdeasEN: [
      'Low-cost but ritualized home date',
      'Volunteer together',
      'Weekend trip to a cheap local spot',
    ],
    relationshipTipsCN: [
      'MUM 要懂得自己也需要被照顾',
      'POOR 不要把 MUM 的爱变成救命稻草',
      '寻求外部支持不是弱点',
    ],
    relationshipTipsEN: [
      'MUM: you need care too',
      'POOR: don\'t make MUM\'s love your only lifeline',
      'Outside support is not weakness',
    ],
    shareableRoastCN: 'MUM 配 POOR：一个在发电，一个在充电，插头经常松。',
    shareableRoastEN: 'MUM x POOR: one is a power source, the other is charging — the plug keeps slipping.',
  },
  {
    type1: 'MUM',
    type2: 'FUCK',
    scorePercent: 39,
    verdict: 'rocky',
    summaryCN:
      'MUM 想照顾，FUCK 拒绝被照顾还偶尔反咬一口。MUM 的温柔会被 FUCK 的防备解读成越界，FUCK 的尖锐会让 MUM 受伤。可以相处但需要很强的情绪肌肉。',
    summaryEN:
      'MUM wants to take care, FUCK refuses care and occasionally bites the hand that feeds. MUM\'s softness gets read as overstepping, FUCK\'s edge wounds MUM. Workable, but only with thick emotional skin on both sides.',
    fightsCN: [
      '「我在关心你」vs「别管我」',
      'FUCK 的脏话让 MUM 不舒服',
      '节日不想过',
      'MUM 的控制感',
      '朋友介入频率',
    ],
    fightsEN: [
      '"I\'m caring for you" vs "leave me alone"',
      'FUCK\'s swearing makes MUM uncomfortable',
      'Skipping holidays',
      'MUM\'s hovering',
      'Friends getting involved too often',
    ],
    dateIdeasCN: [
      '看一场燥起来的 Live',
      'MUM 放手让 FUCK 规划一次',
      '去野一点的地方露营',
    ],
    dateIdeasEN: [
      'Loud live show',
      'MUM hands the planning to FUCK for once',
      'Camping somewhere wild',
    ],
    relationshipTipsCN: [
      'MUM 把「关心」改成「给空间」',
      'FUCK 用温柔的词说出真心',
      '不要试图感化对方的边界',
    ],
    relationshipTipsEN: [
      'MUM: rebrand "caring" as "giving space"',
      'FUCK: use softer words for real feelings',
      'Don\'t try to melt each other\'s edges',
    ],
    shareableRoastCN: 'MUM 配 FUCK：一个想递纸巾，一个一边骂街一边擦眼泪。',
    shareableRoastEN: 'MUM x FUCK: one offers tissues, the other swears through tears and refuses to take them.',
  },
  {
    type1: 'MUM',
    type2: 'IMFW',
    scorePercent: 24,
    verdict: 'doomed',
    summaryCN:
      'MUM 想用温柔把世界擦亮，IMFW 从来就没打算擦。IMFW 的「我他妈才不在乎」会直接撞碎 MUM 的付出感，MUM 会感觉自己在跟一面墙对话。',
    summaryEN:
      'MUM wants to polish the world with warmth. IMFW has zero interest in polishing anything. IMFW\'s "I do not give a damn" smashes MUM\'s sense of giving. MUM ends up talking to a wall.',
    fightsCN: [
      '一切「你怎么不在乎」话题',
      'IMFW 的冷漠',
      '节日忘记',
      '家里的秩序',
      '「你到底爱不爱我」',
    ],
    fightsEN: [
      'Every "why don\'t you care" topic',
      'IMFW\'s apathy',
      'Forgotten holidays',
      'House order',
      '"Do you even love me"',
    ],
    dateIdeasCN: [
      '看一部 IMFW 选的片子',
      '不带期待的一次散步',
      '在家各做各的事',
    ],
    dateIdeasEN: [
      'Watch a movie IMFW picks',
      'Expectation-free walk',
      'Parallel play at home',
    ],
    relationshipTipsCN: [
      'MUM 要学会 walk away',
      'IMFW 不要接受自己接不住的爱',
      '这段关系可能需要一段「pause」',
    ],
    relationshipTipsEN: [
      'MUM: practice walking away',
      'IMFW: stop accepting love you can\'t return',
      'This relationship might need a pause, not a push',
    ],
    shareableRoastCN: 'MUM 配 IMFW：一个在点灯，一个在关掉电闸。',
    shareableRoastEN: 'MUM x IMFW: one lights a candle, the other cuts the power.',
  },

  // ========== FAKE ==========
  {
    type1: 'FAKE',
    type2: 'Dior-s',
    scorePercent: 87,
    verdict: 'destiny',
    summaryCN:
      'FAKE 是得体大师，Dior-s 是审美大师，两个人凑一起简直是「人类精致生活合伙人」。出席任何场合都是一组 look，连冰箱贴都要好看。相处不累，只是有时候太形式感。',
    summaryEN:
      'FAKE is the master of polish, Dior-s is the master of taste. Together you\'re literal co-founders of the Aesthetic Lifestyle LLC. Every event a coordinated look, even the fridge magnets are curated. Low friction — just occasionally too formal.',
    fightsCN: [
      '哪个场合穿什么',
      '「你的表演我看出来了」',
      '和双方朋友交往的边界',
      '照片怎么发',
      '礼物的档次',
    ],
    fightsEN: [
      'What to wear to which event',
      '"I can see you\'re performing again"',
      'Where the line is with friends',
      'How to post photos',
      'Gift tier',
    ],
    dateIdeasCN: [
      '美术馆+下午茶',
      '选一个设计酒店过夜',
      '一起布置家里',
    ],
    dateIdeasEN: [
      'Museum plus afternoon tea',
      'Book a design hotel for a night',
      'Redo a corner of the apartment together',
    ],
    relationshipTipsCN: [
      '允许彼此在对方面前卸妆',
      '偶尔做一件很没品的事',
      '形式感之外留一点真实',
    ],
    relationshipTipsEN: [
      'Let each other be ugly sometimes',
      'Do one tacky thing together',
      'Keep a pocket of non-polished reality',
    ],
    shareableRoastCN: 'FAKE 配 Dior-s：他们的爱情精致到连吵架都有色调。',
    shareableRoastEN: 'FAKE x Dior-s: their love is so curated even their fights come color-graded.',
  },
  {
    type1: 'FAKE',
    type2: 'CTRL',
    scorePercent: 76,
    verdict: 'great',
    summaryCN:
      'FAKE 擅长表现，CTRL 擅长运行，一个负责对外一个负责对内。FAKE 维护形象，CTRL 搭后台基建，两个人配合起来像公司前台和 COO。就是都有点不敢真正放下防御。',
    summaryEN:
      'FAKE handles the front of house, CTRL runs the back office. FAKE polishes the image, CTRL builds the infrastructure. Like a receptionist and a COO — smooth on the outside, but both struggle to lower their guard.',
    fightsCN: [
      '「你从来不说真心话」',
      'CTRL 觉得 FAKE 太消耗情绪',
      '谁是真正的家主',
      '社交场合规则',
      '隐私和秩序的冲突',
    ],
    fightsEN: [
      '"You never say what you actually feel"',
      'CTRL thinks FAKE drains emotions',
      'Who\'s actually running the house',
      'Rules of engagement at events',
      'Privacy vs order',
    ],
    dateIdeasCN: [
      '一起做一个预算表',
      '去一个质感很好的餐厅',
      '周末整理家里',
    ],
    dateIdeasEN: [
      'Build a budget spreadsheet together',
      'Dinner at a place with great lighting',
      'Weekend deep-clean of the apartment',
    ],
    relationshipTipsCN: [
      'FAKE 在家里允许自己卸妆',
      'CTRL 不要把感情变成管理',
      '一周一次不带滤镜的真心对话',
    ],
    relationshipTipsEN: [
      'FAKE: at home, drop the makeup',
      'CTRL: don\'t turn love into management',
      'One filter-free real talk per week',
    ],
    shareableRoastCN: 'FAKE 配 CTRL：两个人都穿着正装谈恋爱，谁都不想先脱。',
    shareableRoastEN: 'FAKE x CTRL: both of them date in formal wear — nobody dares unbutton first.',
  },
  {
    type1: 'FAKE',
    type2: 'SEXY',
    scorePercent: 65,
    verdict: 'fine',
    summaryCN:
      'FAKE 会演，SEXY 也会演，两个人都很懂「对外形象」。合拍的点是互相懂得怎么撑场面，难点是谁都不想第一个卸下面具。相处像双人舞，美但有点累。',
    summaryEN:
      'FAKE performs, SEXY performs — both of you understand public image like a religion. You sync on "how to own a room," but neither wants to be the first to drop the mask. It\'s a duet — beautiful and a little exhausting.',
    fightsCN: [
      '谁是主角',
      '朋友圈互动',
      '真心话出现的频率',
      '花钱风格',
      '「你对别人比对我更好」',
    ],
    fightsEN: [
      'Who\'s the lead',
      'Social media interactions',
      'How often honesty appears',
      'Spending style',
      '"You\'re nicer to everyone else than to me"',
    ],
    dateIdeasCN: [
      '派对前一起选衣服',
      '拍一组复古写真',
      '去一个小众的私密酒吧',
    ],
    dateIdeasEN: [
      'Outfit planning before a party',
      'Retro photoshoot together',
      'A hidden, members-only kind of bar',
    ],
    relationshipTipsCN: [
      '约定一个「面具下班」时间段',
      '别和对方在朋友面前斗嘴',
      '真实比好看更长久',
    ],
    relationshipTipsEN: [
      'Declare a "masks off" time window',
      'No public sniping in front of friends',
      'Authenticity outlasts aesthetic',
    ],
    shareableRoastCN: 'FAKE 配 SEXY：两个人的爱情是一场没有幕后照的公映。',
    shareableRoastEN: 'FAKE x SEXY: their love is a wide release with zero behind-the-scenes footage.',
  },
  {
    type1: 'FAKE',
    type2: 'JOKE-R',
    scorePercent: 42,
    verdict: 'rocky',
    summaryCN:
      'FAKE 要维持形象，JOKE-R 最擅长的就是把形象拆成段子。FAKE 每次认真布场，JOKE-R 都能一句话毁掉气氛。可能在一起的原因是 JOKE-R 让 FAKE 觉得「终于有人戳穿我」。',
    summaryEN:
      'FAKE maintains the image, JOKE-R specializes in turning that image into a punchline. Every time FAKE stages the scene, JOKE-R torches it in one line. They might last because JOKE-R makes FAKE feel "finally, someone saw through me."',
    fightsCN: [
      'JOKE-R 拿 FAKE 当段子素材',
      'FAKE 觉得被 JOKE-R 公开拆台',
      '严肃话题怎么谈',
      '朋友面前的默契',
      '「你一点都不懂我」',
    ],
    fightsEN: [
      'JOKE-R turning FAKE into material',
      'FAKE feels publicly roasted',
      'How to talk about anything serious',
      'In-joke culture in public',
      '"You don\'t get me at all"',
    ],
    dateIdeasCN: [
      '脱口秀现场',
      '两人一起录个沙雕视频',
      '随便一家街边店',
    ],
    dateIdeasEN: [
      'Live stand-up night',
      'Record a dumb joint video',
      'Random hole-in-the-wall dinner',
    ],
    relationshipTipsCN: [
      'JOKE-R 不要在外人面前开 FAKE 玩笑',
      'FAKE 承认 JOKE-R 能看见的那个自己',
      '设定「不吐槽区」话题',
    ],
    relationshipTipsEN: [
      'JOKE-R: don\'t roast FAKE in public',
      'FAKE: admit JOKE-R sees the real you',
      'Set "no roasting" topics',
    ],
    shareableRoastCN: 'FAKE 配 JOKE-R：一个在精致演出，一个在后台喊 bazinga。',
    shareableRoastEN: 'FAKE x JOKE-R: one performs a polished show, the other yells bazinga from the wings.',
  },
  {
    type1: 'FAKE',
    type2: 'FUCK',
    scorePercent: 18,
    verdict: 'doomed',
    summaryCN:
      'FAKE 讲体面，FUCK 讲「去你的体面」。FAKE 的每一层面具都会被 FUCK 直接撕掉，FAKE 的防御机制会全面启动。不是不能互相吸引，而是互相吸引之后会互相毁灭。',
    summaryEN:
      'FAKE values composure, FUCK values "composure is a prison." Every layer of mask FAKE builds, FUCK rips off. FAKE\'s defense system goes red alert. Attraction is possible — mutual destruction is inevitable.',
    fightsCN: [
      '公共场合的脏话',
      '「你到底想不想要我」',
      '朋友圈差异',
      '真话 vs 漂亮话',
      '家人怎么处理',
    ],
    fightsEN: [
      'Swearing in public',
      '"Do you actually want me"',
      'Social circle friction',
      'Truth vs polish',
      'How to handle each other\'s families',
    ],
    dateIdeasCN: [
      'FAKE 学会不修图发一张照片',
      'FUCK 学会一次不爆炸的晚餐',
      '一起吃街边摊',
    ],
    dateIdeasEN: [
      'FAKE posts one unedited photo',
      'FUCK survives one dinner without exploding',
      'Street food date',
    ],
    relationshipTipsCN: [
      '可能真的没必要硬凑',
      '互相别当对方的治疗师',
      '知道自己要什么',
    ],
    relationshipTipsEN: [
      'Maybe don\'t force it',
      'Neither of you is the other\'s therapist',
      'Know what you\'re actually here for',
    ],
    shareableRoastCN: 'FAKE 配 FUCK：一个在演优雅，一个在演没在演。',
    shareableRoastEN: 'FAKE x FUCK: one performs elegance, the other performs "I\'m not performing."',
  },

  // ========== OJBK ==========
  {
    type1: 'OJBK',
    type2: 'MONK',
    scorePercent: 88,
    verdict: 'destiny',
    summaryCN:
      'OJBK 追求「差不多就好」，MONK 追求「清静就好」，两个人简直是躺平宇宙里的双子座。没有戏剧性，没有不必要的能量消耗，相处像两只猫共享一块阳光。',
    summaryEN:
      'OJBK wants "good enough," MONK wants "peaceful enough." Together you\'re the twin stars of chill universe. Zero drama, zero unnecessary energy spend. Living together feels like two cats sharing a single sunspot.',
    fightsCN: [
      '「该不该出门」',
      'MONK 太安静让 OJBK 寂寞',
      '要不要养宠物',
      '装修预算',
      '偶尔的情绪表达',
    ],
    fightsEN: [
      '"Should we even leave the house"',
      'MONK too quiet, OJBK feels lonely',
      'Do we get a pet',
      'Reno budget',
      'Occasional emotional expression',
    ],
    dateIdeasCN: [
      '周末爬一座不高的山',
      '一起冥想半小时',
      '煮一壶茶看书一下午',
    ],
    dateIdeasEN: [
      'Weekend low-stakes hike',
      '30 minutes of meditation together',
      'Brew tea, read books, half a day',
    ],
    relationshipTipsCN: [
      '不要把安静等于冷漠',
      '每月一次小仪式感',
      '有时候少说一句比多说一句好',
    ],
    relationshipTipsEN: [
      'Quiet is not coldness',
      'One small ritual a month',
      'Sometimes one less sentence wins',
    ],
    shareableRoastCN: 'OJBK 配 MONK：他俩的恋爱像在打坐，稳得连猫都能睡着。',
    shareableRoastEN: 'OJBK x MONK: their relationship looks like zazen — even the cat falls asleep.',
  },
  {
    type1: 'OJBK',
    type2: 'HHHH',
    scorePercent: 79,
    verdict: 'great',
    summaryCN:
      'OJBK 淡定，HHHH 欢脱，两个人是典型的「互补型乐子人」。HHHH 负责把日常变成喜剧，OJBK 负责笑着看。压力小、欢乐多，是那种能在沙发上腻歪一整天的组合。',
    summaryEN:
      'OJBK is chill, HHHH is bouncy — a classic complementary fun-couple. HHHH turns daily life into a comedy, OJBK watches and laughs. Low pressure, high joy — the type that can couch-potato an entire day.',
    fightsCN: [
      'HHHH 太闹 OJBK 累了',
      'OJBK 太淡让 HHHH 觉得 flat',
      '出门频率',
      '朋友圈取舍',
      '「你到底开不开心」',
    ],
    fightsEN: [
      'HHHH gets too loud, OJBK burns out',
      'OJBK gets too flat, HHHH feels the vibe drop',
      'Outing frequency',
      'Friend-group selection',
      '"Are you actually happy or not"',
    ],
    dateIdeasCN: [
      '在家玩桌游',
      '看一部搞笑电影',
      '一起去游乐场',
    ],
    dateIdeasEN: [
      'Board games at home',
      'A goofy comedy night',
      'Hit an amusement park',
    ],
    relationshipTipsCN: [
      'HHHH 注意 OJBK 的电量',
      'OJBK 主动捧场一次',
      '笑声要投喂也要回应',
    ],
    relationshipTipsEN: [
      'HHHH: watch OJBK\'s battery level',
      'OJBK: cheer HHHH on proactively',
      'Laughter needs both senders and receivers',
    ],
    shareableRoastCN: 'OJBK 配 HHHH：一个在被戳笑，一个在专业戳人。',
    shareableRoastEN: 'OJBK x HHHH: one gets tickled into laughing, the other tickles for a living.',
  },
  {
    type1: 'OJBK',
    type2: 'ATM-er',
    scorePercent: 55,
    verdict: 'fine',
    summaryCN:
      'OJBK 的淡定会被 ATM-er 的现实主义当成「没上进心」。两个人不是价值观相反，而是 ATM-er 总想着「能不能再多点」，OJBK 永远觉得「这样就行」。相处可以，得有钱话题协议。',
    summaryEN:
      'OJBK\'s chill reads to ATM-er as "no ambition." Not value-opposed, just off-beat: ATM-er always wants "a bit more," OJBK always says "this is plenty." Workable — but you need a money-talk treaty.',
    fightsCN: [
      '「你怎么不想多挣点」',
      '花钱风格',
      '存钱目标',
      '假期选远的还是近的',
      '谁买单',
    ],
    fightsEN: [
      '"Why don\'t you want to earn more"',
      'Spending style',
      'Saving goals',
      'Near or far for vacation',
      'Who picks up the check',
    ],
    dateIdeasCN: [
      '一起做财务规划',
      '去性价比高的小店',
      '周末去逛免费展',
    ],
    dateIdeasEN: [
      'Joint financial planning session',
      'Good-value hidden gems',
      'Free weekend exhibitions',
    ],
    relationshipTipsCN: [
      '坦诚聊钱',
      '把野心和知足都说出来',
      '别互相轻视生活方式',
    ],
    relationshipTipsEN: [
      'Have the money talk — openly',
      'Both ambition and contentment deserve airtime',
      'Don\'t look down on each other\'s lifestyle',
    ],
    shareableRoastCN: 'OJBK 配 ATM-er：一个说「够了吧」，一个回「再来点」。',
    shareableRoastEN: 'OJBK x ATM-er: one says "we\'re good," the other says "one more stack."',
  },
  {
    type1: 'OJBK',
    type2: 'BOSS',
    scorePercent: 44,
    verdict: 'rocky',
    summaryCN:
      'BOSS 是推进器，OJBK 是减速带。BOSS 会想提速 OJBK，OJBK 会在心里翻白眼「急什么」。不是没感情，是相处起来两边都觉得「你为什么是这样的」。',
    summaryEN:
      'BOSS is an engine, OJBK is a speed bump. BOSS tries to accelerate OJBK, OJBK internally rolls eyes "what\'s the rush." Not loveless — both of you just keep thinking "why are you like this."',
    fightsCN: [
      'BOSS 推进 OJBK 事业',
      'OJBK 觉得 BOSS 太急',
      '人生计划节奏',
      '家里谁做决定',
      '「你到底想怎样」',
    ],
    fightsEN: [
      'BOSS tries to accelerate OJBK\'s career',
      'OJBK finds BOSS too impatient',
      'Life-plan tempo',
      'Who calls the shots at home',
      '"What do you actually want"',
    ],
    dateIdeasCN: [
      '郊游一整天',
      '一起睡懒觉到中午',
      '逛市集不带目标',
    ],
    dateIdeasEN: [
      'A full-day suburban outing',
      'Sleep in together until noon',
      'Wander a market with no goal',
    ],
    relationshipTipsCN: [
      'BOSS 放下 KPI',
      'OJBK 别总说「随便」',
      '承认你们人生速度不同',
    ],
    relationshipTipsEN: [
      'BOSS: drop the KPI lens',
      'OJBK: stop saying "whatever"',
      'Admit your life-speeds don\'t match',
    ],
    shareableRoastCN: 'OJBK 配 BOSS：一个在油门，一个在刹车，车原地震动。',
    shareableRoastEN: 'OJBK x BOSS: one on the gas, one on the brake — the car just vibrates in place.',
  },
  {
    type1: 'OJBK',
    type2: 'DEAD',
    scorePercent: 25,
    verdict: 'doomed',
    summaryCN:
      'OJBK 的淡定加上 DEAD 的放弃系，两个人形成的不是舒适圈，是真空。没有前进动力，没有情绪浪花，连吵架都吵不起来。日子过着过着就没了。',
    summaryEN:
      'OJBK\'s chill plus DEAD\'s resignation doesn\'t form a comfort zone — it forms a vacuum. No momentum, no emotional ripples, not even real fights. Days just dissolve into nothing.',
    fightsCN: [
      '基本不吵，但也不聊',
      '「我们这样算在一起吗」',
      '节日没人主动',
      '钱谁管都没人管',
      '未来等于没有',
    ],
    fightsEN: [
      'Barely any fights — or conversations',
      '"Are we even dating"',
      'No one plans holidays',
      'Money is managed by nobody',
      'Future equals empty set',
    ],
    dateIdeasCN: [
      '约会变成各自躺',
      '一起点外卖',
      '去楼下便利店',
    ],
    dateIdeasEN: [
      'Dates become parallel lying down',
      'Shared takeout',
      'Walk to the downstairs convenience store',
    ],
    relationshipTipsCN: [
      '这段关系需要一个外力',
      '至少一个人要主动',
      '不然就坦然散',
    ],
    relationshipTipsEN: [
      'This relationship needs outside force',
      'At least one person has to act',
      'Or just let it go cleanly',
    ],
    shareableRoastCN: 'OJBK 配 DEAD：不是在恋爱，是在共享 WIFI。',
    shareableRoastEN: 'OJBK x DEAD: this isn\'t a relationship, it\'s a shared WIFI plan.',
  },

  // ========== LOVE-R ==========
  {
    type1: 'LOVE-R',
    type2: 'MUM',
    scorePercent: 93,
    verdict: 'destiny',
    summaryCN:
      'LOVE-R 想被爱,MUM 想去爱。两个人简直像终于找到了对方的充电器。LOVE-R 把情绪全盘交出,MUM 无条件接住,一个循环稳到让朋友都眼红。长期风险是 MUM 会把 LOVE-R 宠得失去独立。',
    summaryEN:
      'LOVE-R wants to be loved, MUM wants to love. You two are each other\'s long-lost charger. LOVE-R drops all emotions, MUM catches every single one. So stable your friends get jealous. Long-term risk: MUM coddles LOVE-R into total dependence.',
    fightsCN: [
      'MUM 太操心变成控制',
      'LOVE-R 觉得 MUM 不够浪漫',
      '「你把我当小孩」',
      '谁应该先关心谁',
      '家务责任分配',
    ],
    fightsEN: [
      'MUM\'s worry turns into control',
      'LOVE-R finds MUM too unromantic',
      '"You treat me like a kid"',
      'Who checks in on whom first',
      'Chore load distribution',
    ],
    dateIdeasCN: [
      '在家做饭配红酒',
      '互相写一封手写信',
      '去老电影院看一部老片',
    ],
    dateIdeasEN: [
      'Home cooking with a bottle of wine',
      'Write each other a handwritten letter',
      'Catch an old film at a repertory cinema',
    ],
    relationshipTipsCN: [
      'MUM 不要把爱变成替对方做决定',
      'LOVE-R 要主动表达需求',
      '每月一次浪漫小惊喜',
    ],
    relationshipTipsEN: [
      'MUM: love is not deciding for them',
      'LOVE-R: state your needs first',
      'One romantic surprise per month, minimum',
    ],
    shareableRoastCN: 'LOVE-R 配 MUM：一个在等爱,一个在发爱,中间还要报销一下。',
    shareableRoastEN: 'LOVE-R x MUM: one waits for love, one dispenses it, and somehow it comes with reimbursement slips.',
  },
  {
    type1: 'LOVE-R',
    type2: 'CTRL',
    scorePercent: 73,
    verdict: 'great',
    summaryCN:
      'LOVE-R 把生活交给对方,CTRL 正好需要这种「我来安排」的权限。两个人的关系稳稳地运行着,LOVE-R 感到安全,CTRL 感到被需要。就是 CTRL 要小心别把爱情变成工作。',
    summaryEN:
      'LOVE-R hands life over, CTRL loves holding the admin keys. The relationship runs on rails — LOVE-R feels safe, CTRL feels needed. Just be careful CTRL doesn\'t accidentally turn love into a management job.',
    fightsCN: [
      '「你是在管我还是在爱我」',
      'CTRL 觉得 LOVE-R 情绪太多',
      '决定大事的节奏',
      '家里规则是谁定',
      '情绪反馈不到位',
    ],
    fightsEN: [
      '"Are you managing me or loving me"',
      'CTRL thinks LOVE-R runs on too many emotions',
      'Pace of big decisions',
      'Who sets the house rules',
      'Emotional feedback gaps',
    ],
    dateIdeasCN: [
      'CTRL 制定的「惊喜日」',
      '旅行 CTRL 负责所有攻略,LOVE-R 负责开心',
      '一起整理一本共同相册',
    ],
    dateIdeasEN: [
      'A "surprise day" engineered by CTRL',
      'Trip where CTRL owns logistics, LOVE-R owns the joy',
      'Build a shared photo album together',
    ],
    relationshipTipsCN: [
      'CTRL 要记得 LOVE-R 需要的是陪伴不是 SOP',
      'LOVE-R 要学会自己做小决定',
      '情感账户比任务清单更重要',
    ],
    relationshipTipsEN: [
      'CTRL: LOVE-R needs presence, not an SOP',
      'LOVE-R: start deciding the small stuff yourself',
      'Emotional bank account beats task checklist',
    ],
    shareableRoastCN: 'LOVE-R 配 CTRL：一个在等浪漫,一个在 Google 日历上写「浪漫」。',
    shareableRoastEN: 'LOVE-R x CTRL: one is waiting for romance, the other scheduled "romance" on Google Calendar.',
  },
  {
    type1: 'LOVE-R',
    type2: 'OJBK',
    scorePercent: 57,
    verdict: 'fine',
    summaryCN:
      'LOVE-R 的爱是浓汤,OJBK 的爱是白开水。刚在一起的时候 OJBK 的淡定让 LOVE-R 觉得很安心,久了 LOVE-R 开始怀疑「你是不是不爱我」。不糟糕,但 OJBK 要学会「主动说点什么」。',
    summaryEN:
      'LOVE-R\'s love is a rich broth, OJBK\'s love is lukewarm water. Early on, OJBK\'s chill feels calming. Later, LOVE-R starts asking "do you even care." Not bad, but OJBK has to learn to "say something first."',
    fightsCN: [
      '「你怎么都不说想我」',
      'OJBK 觉得 LOVE-R 情绪戏太多',
      '周年纪念日 OJBK 忘了',
      '朋友圈互动少',
      '「你到底有没有在乎」',
    ],
    fightsEN: [
      '"Why don\'t you ever say you miss me"',
      'OJBK thinks LOVE-R over-dramatizes',
      'OJBK forgot the anniversary',
      'Barely any social media interaction',
      '"Do you even care"',
    ],
    dateIdeasCN: [
      '简单散步+便利店宵夜',
      '一起看一场老电影',
      'OJBK 主动策划一次惊喜',
    ],
    dateIdeasEN: [
      'Simple walk plus convenience-store snacks',
      'An old film together',
      'OJBK plans a surprise — yes, from scratch',
    ],
    relationshipTipsCN: [
      'OJBK 每天发一句「想你」就能把 LOVE-R 稳住',
      'LOVE-R 接受 OJBK 的爱没那么戏剧性',
      '别用对方的表达力去衡量爱意',
    ],
    relationshipTipsEN: [
      'OJBK: one "miss you" a day keeps LOVE-R regulated',
      'LOVE-R: OJBK\'s love has zero drama, and that\'s still love',
      'Stop measuring love by volume of expression',
    ],
    shareableRoastCN: 'LOVE-R 配 OJBK：一个等着肥皂剧,一个在放纪录片。',
    shareableRoastEN: 'LOVE-R x OJBK: one is waiting for a soap opera, the other is streaming a documentary.',
  },
  {
    type1: 'LOVE-R',
    type2: 'SOLO',
    scorePercent: 33,
    verdict: 'rocky',
    summaryCN:
      'LOVE-R 的满杯情感一倒进 SOLO 的独立杯子,SOLO 只会后退三步。LOVE-R 想 24h 贴贴,SOLO 想 24h 一人空间。两个人相处前三天是蜜糖,第七天就开始累。',
    summaryEN:
      'LOVE-R pours a full cup of feelings, SOLO takes three steps back. LOVE-R wants 24/7 closeness, SOLO wants 24/7 personal space. First three days feel like honey, day seven feels like exhaustion.',
    fightsCN: [
      '「你能不能让我一个人待会儿」',
      'LOVE-R 觉得 SOLO 冷漠',
      '回消息速度',
      '节日怎么过',
      '要不要同居',
    ],
    fightsEN: [
      '"Can I please have five minutes alone"',
      'LOVE-R reads SOLO as cold',
      'Reply speed debates',
      'How to spend holidays',
      'Do we move in together',
    ],
    dateIdeasCN: [
      '各自做自己的事但在一个屋子',
      'SOLO 带 LOVE-R 体验「独处」的好',
      '一起去远足一整天',
    ],
    dateIdeasEN: [
      'Same room, different tasks — parallel play',
      'SOLO teaches LOVE-R the perks of solitude',
      'A full-day hike',
    ],
    relationshipTipsCN: [
      'LOVE-R 要尊重 SOLO 的空间需求',
      'SOLO 要主动表达在意',
      '关系里可以有两个不同频率',
    ],
    relationshipTipsEN: [
      'LOVE-R: respect SOLO\'s space as a feature, not a bug',
      'SOLO: show affection proactively',
      'Two different frequencies can still share a relationship',
    ],
    shareableRoastCN: 'LOVE-R 配 SOLO：一个想黏紧,一个想搬家。',
    shareableRoastEN: 'LOVE-R x SOLO: one wants to glue, the other wants to move out.',
  },
  {
    type1: 'LOVE-R',
    type2: 'FAKE',
    scorePercent: 21,
    verdict: 'doomed',
    summaryCN:
      'LOVE-R 把真心掏出来,FAKE 把面具也掏出来。LOVE-R 想要的是真实情感,FAKE 擅长的是得体表演。LOVE-R 会慢慢发现自己抱的是一个幻觉,越爱越空。',
    summaryEN:
      'LOVE-R hands over their real heart, FAKE hands over a polished mask. LOVE-R wants real emotions, FAKE specializes in presentable performance. LOVE-R slowly realizes they\'re hugging an illusion, and the deeper they love, the emptier it gets.',
    fightsCN: [
      '「你说的是真的吗」',
      'FAKE 觉得 LOVE-R 太戏剧',
      '家人朋友之间的两副面孔',
      '隐私和坦诚的边界',
      '承诺是否可兑现',
    ],
    fightsEN: [
      '"Is anything you say real"',
      'FAKE thinks LOVE-R is too dramatic',
      'Two faces — one for family, one for everyone else',
      'Privacy vs honesty',
      'Whether promises are actually cashable',
    ],
    dateIdeasCN: [
      '不要任何需要表演的场合',
      '深夜长谈,FAKE 真的说一次心里话',
      '一起做一件很笨拙的事,让面具掉',
    ],
    dateIdeasEN: [
      'Skip anything performative',
      'Late-night talk — FAKE speaks a real sentence, once',
      'Do something clumsy together so the masks fall off',
    ],
    relationshipTipsCN: [
      'FAKE 要学会不表演也能被爱',
      'LOVE-R 不要接受「表演版」的爱',
      '信任没了就别硬撑',
    ],
    relationshipTipsEN: [
      'FAKE: learn to be loved without the mask',
      'LOVE-R: don\'t accept the performative version of love',
      'If trust is gone, don\'t white-knuckle it',
    ],
    shareableRoastCN: 'LOVE-R 配 FAKE：一个在掏心,一个在掏假体。',
    shareableRoastEN: 'LOVE-R x FAKE: one gives their heart, the other gives a prop.',
  },
  // ========== MALO ==========
  {
    type1: 'MALO',
    type2: 'HHHH',
    scorePercent: 85,
    verdict: 'destiny',
    summaryCN:
      'MALO 的坏笑配 HHHH 的傻笑，就是全世界最欠的一对。两个人日常都能互相逗到胃疼，走在街上像在拍一部无剧本综艺。唯一风险是两个人都不擅长认真表达。',
    summaryEN:
      'MALO\'s smirk plus HHHH\'s giggle is the most punchable couple on earth. Daily life is rib-aching laughter, walking down the street feels like an unscripted reality show. Only risk: neither of you is great at expressing anything serious.',
    fightsCN: [
      '「你能不能一次认真回我」',
      '嘴欠嘴过头',
      '谁的段子更好笑',
      '出门被陌生人打',
      '严肃话题被跳过',
    ],
    fightsEN: [
      '"Can you reply seriously, just once"',
      'Too much back-and-forth roasting',
      'Whose joke is funnier',
      'Almost got punched by strangers',
      'Serious topics keep getting skipped',
    ],
    dateIdeasCN: [
      '一起互怼直播',
      '密室逃脱',
      '半夜烧烤摊',
    ],
    dateIdeasEN: [
      'Two-person roast livestream',
      'Escape room',
      'Midnight BBQ stand',
    ],
    relationshipTipsCN: [
      '段子模式和认真模式要分开',
      'MALO 注意 HHHH 的敏感点',
      '「我爱你」说出来不会死',
    ],
    relationshipTipsEN: [
      'Separate joke-mode and real-mode',
      'MALO: watch HHHH\'s soft spots',
      'Saying "I love you" won\'t kill you',
    ],
    shareableRoastCN: 'MALO 配 HHHH：一个在挖坑，一个在跳坑还欢呼。',
    shareableRoastEN: 'MALO x HHHH: one digs the hole, the other cannonballs in cheering.',
  },
  {
    type1: 'MALO',
    type2: 'JOKE-R',
    scorePercent: 78,
    verdict: 'great',
    summaryCN:
      '两个坏蛋凑一起就是一个小型犯罪团伙——只不过犯的是「让周围人翻白眼」的罪。MALO 阴一点，JOKE-R 阳一点，配合起来能把任何聚会变成自己的场子。',
    summaryEN:
      'Two troublemakers form a tiny crime duo — except the crime is "making everyone in the room roll their eyes." MALO goes darker, JOKE-R goes brighter; together you hijack any gathering.',
    fightsCN: [
      '谁比较毒',
      '「你怎么总戳我的痛点」',
      '朋友聚会谁抢话',
      '认真的时候要不要认真',
      '互相揭短',
    ],
    fightsEN: [
      'Who\'s more savage',
      '"Why do you always poke my sore spot"',
      'Who hogs the mic at parties',
      'Do we ever actually get serious',
      'Public call-outs',
    ],
    dateIdeasCN: [
      '去刷一场脱口秀',
      '一起写一个段子',
      '互斗酒量',
    ],
    dateIdeasEN: [
      'Catch a stand-up show',
      'Write a joke together',
      'Drinking contest',
    ],
    relationshipTipsCN: [
      '划一个「不吐槽区」',
      '情绪低落时少开玩笑',
      '互相尊重边界',
    ],
    relationshipTipsEN: [
      'Designate a "no jokes here" zone',
      'When feelings run low, lower the joke dial',
      'Respect each other\'s limits',
    ],
    shareableRoastCN: 'MALO 配 JOKE-R：他们的恋爱爱是综艺现场，但你不是观众是炮灰。',
    shareableRoastEN: 'MALO x JOKE-R: their relationship is a variety show — and you\'re not the audience, you\'re collateral.',
  },
  {
    type1: 'MALO',
    type2: 'DRUNK',
    scorePercent: 61,
    verdict: 'fine',
    summaryCN:
      'MALO 的皮加上 DRUNK 的放飞，合起来是一场没有刹车的夜。玩得开心，酒局上所向披靡，但第二天醒来经常找不到自己的尊严。',
    summaryEN:
      'MALO\'s mischief plus DRUNK\'s looseness equals a night with no brake pedal. Max fun, unbeatable at bar tables, but you wake up the next day unable to locate your dignity.',
    fightsCN: [
      '酒后发生的事算不算',
      '谁喝吐了对方要照顾',
      '花钱节奏',
      '家人观感',
      '玩得太晚不回家',
    ],
    fightsEN: [
      'Does "it happened when drunk" count',
      'Who cleans up whose mess',
      'Spending pace',
      'Family impressions',
      'Out too late, didn\'t come home',
    ],
    dateIdeasCN: [
      '新开的酒吧',
      '一起做一顿宿醉早餐',
      '周末 short trip',
    ],
    dateIdeasEN: [
      'Brand new bar opening',
      'Cook a hangover breakfast together',
      'Weekend short trip',
    ],
    relationshipTipsCN: [
      '酒杯之外也得相处',
      '设定「不喝日」',
      '危险决定隔天再做',
    ],
    relationshipTipsEN: [
      'Have a life outside the bottle',
      'Set "sober days" in the week',
      'Risky decisions wait until tomorrow',
    ],
    shareableRoastCN: 'MALO 配 DRUNK：他们的关系有 80% 在夜店做的决定，20% 在第二天后悔。',
    shareableRoastEN: 'MALO x DRUNK: 80% of this relationship is decided at clubs, the other 20% is regretted the next morning.',
  },
  {
    type1: 'MALO',
    type2: 'THAN-K',
    scorePercent: 38,
    verdict: 'rocky',
    summaryCN:
      'MALO 的嘴是毒的，THAN-K 的心是软的。MALO 一次无心吐槽能把 THAN-K 的心情打低半年。不是恶意，但 THAN-K 接不住 MALO 的频率。',
    summaryEN:
      'MALO\'s mouth runs acid, THAN-K\'s heart is a marshmallow. One offhand MALO jab can nuke THAN-K\'s mood for months. No malice — THAN-K just cannot catch MALO\'s frequency.',
    fightsCN: [
      '「你讲话为什么这么难听」',
      '玩笑的尺度',
      '表达感情的方式',
      '在朋友面前的保护感',
      '「你根本没把我当回事」',
    ],
    fightsEN: [
      '"Why are you so harsh"',
      'Scale of jokes',
      'How feelings get expressed',
      'Public protection feeling',
      '"You don\'t actually care about me"',
    ],
    dateIdeasCN: [
      '小而温柔的庆祝',
      '一起做手工',
      '写一张感谢卡',
    ],
    dateIdeasEN: [
      'Small, gentle celebration',
      'Crafts date',
      'Write each other a thank-you card',
    ],
    relationshipTipsCN: [
      'MALO 对 THAN-K 开的玩笑减半',
      'THAN-K 及时告诉对方哪里受伤',
      '感情需要翻译',
    ],
    relationshipTipsEN: [
      'MALO: cut jokes aimed at THAN-K by half',
      'THAN-K: flag when it hurts, right away',
      'Love needs a translator here',
    ],
    shareableRoastCN: 'MALO 配 THAN-K：一个在随便说，一个在默默记一辈子。',
    shareableRoastEN: 'MALO x THAN-K: one speaks without thinking, the other remembers for life.',
  },
  {
    type1: 'MALO',
    type2: 'MUM',
    scorePercent: 27,
    verdict: 'doomed',
    summaryCN:
      'MUM 想给温柔，MALO 把温柔变成笑料。MUM 的付出换来的是 MALO 的嘴贱，MUM 会觉得自己被嘲弄，MALO 会觉得 MUM 太玻璃心。最后两个人都不快乐。',
    summaryEN:
      'MUM tries to give warmth, MALO turns the warmth into a punchline. MUM feels mocked, MALO thinks MUM is fragile. Nobody comes out of this happy.',
    fightsCN: [
      'MALO 拿 MUM 的关心开玩笑',
      'MUM 觉得 MALO 不懂感恩',
      '公开场合下 MUM 丢脸',
      '家庭观冲突',
      '「你从来不心疼我」',
    ],
    fightsEN: [
      'MALO mocks MUM\'s caring',
      'MUM thinks MALO doesn\'t appreciate anything',
      'MUM embarrassed in public',
      'Family-values clash',
      '"You never actually feel for me"',
    ],
    dateIdeasCN: [
      '一起去探望别人的家人（让 MALO 看见爱）',
      '厨房合作',
      '小范围烧烤',
    ],
    dateIdeasEN: [
      'Visit someone else\'s family together (MALO needs to see love)',
      'Cook together in the kitchen',
      'Small BBQ',
    ],
    relationshipTipsCN: [
      'MALO 改口前先想三秒',
      'MUM 不要用付出换认可',
      '必要时及时止损',
    ],
    relationshipTipsEN: [
      'MALO: three-second pause before opening your mouth',
      'MUM: stop trading care for validation',
      'Cut losses when needed',
    ],
    shareableRoastCN: 'MALO 配 MUM：一个想包容世界，一个想把世界嘲讽一遍。',
    shareableRoastEN: 'MALO x MUM: one wants to hug the world, the other wants to roast it first.',
  },

  // ========== JOKE-R ==========
  {
    type1: 'JOKE-R',
    type2: 'HHHH',
    scorePercent: 92,
    verdict: 'destiny',
    summaryCN:
      '两个天生乐子人凑一起就是春晚现场。JOKE-R 讲梗，HHHH 捧哏，彼此互为最佳观众。日常充满笑声，朋友一开始羡慕后来怕他们。',
    summaryEN:
      'Two born jokers form a full variety show. JOKE-R delivers, HHHH hypes it up — you\'re each other\'s best audience. Friends envy you for a week, then start avoiding your couch.',
    fightsCN: [
      '谁的段子更好笑',
      '严肃话题永远被跳过',
      '公共场合太吵',
      '「你能不能偶尔正经」',
      '家务没人想做',
    ],
    fightsEN: [
      'Whose joke lands harder',
      'Serious topics keep getting dodged',
      'Too loud in public',
      '"Can you be serious, like ever"',
      'Nobody wants to do chores',
    ],
    dateIdeasCN: [
      '脱口秀之夜',
      '录一个两人沙雕 vlog',
      '玩一个超无聊的桌游',
    ],
    dateIdeasEN: [
      'Stand-up night',
      'Shoot a dumb joint vlog',
      'Play an absurdly boring board game on purpose',
    ],
    relationshipTipsCN: [
      '笑声之外要有真话',
      '重要日子不能全靠梗',
      '学会给对方情绪价值',
    ],
    relationshipTipsEN: [
      'Laughter is not a substitute for honesty',
      'Important days can\'t survive on memes alone',
      'Learn to deliver emotional value',
    ],
    shareableRoastCN: 'JOKE-R 配 HHHH：恋爱像每天看脱口秀，但没人写严肃剧本。',
    shareableRoastEN: 'JOKE-R x HHHH: dating like a daily stand-up — and nobody\'s writing the dramatic scene.',
  },
  {
    type1: 'JOKE-R',
    type2: 'DRUNK',
    scorePercent: 76,
    verdict: 'great',
    summaryCN:
      'JOKE-R 清醒时已经很欢乐，DRUNK 一杯下肚更炸。两个人在酒桌上是灵魂知己，但第二天醒来 JOKE-R 得去捞 DRUNK 回家。',
    summaryEN:
      'JOKE-R sober is already fun, DRUNK after one drink is chaos. At the bar table you\'re soulmates. The next morning JOKE-R still has to drag DRUNK home.',
    fightsCN: [
      '喝多了谁买单',
      '酒后说的话算不算',
      '第二天谁做早餐',
      '「能不能少喝一次」',
      '玩太晚',
    ],
    fightsEN: [
      'Who picks up the drunk tab',
      'Does "what you said drunk" count',
      'Who makes the next-day breakfast',
      '"Can we skip drinks once"',
      'Out way too late',
    ],
    dateIdeasCN: [
      '一起开发一个鸡尾酒',
      '隐秘的 speakeasy',
      '酒庄游',
    ],
    dateIdeasEN: [
      'Invent a cocktail together',
      'Speakeasy crawl',
      'Winery tour',
    ],
    relationshipTipsCN: [
      '酒桌外也要认真相处',
      '设立 sober day',
      '别把快乐建立在醉意上',
    ],
    relationshipTipsEN: [
      'Be present outside the bar',
      'Schedule sober days',
      'Don\'t build happiness only on booze',
    ],
    shareableRoastCN: 'JOKE-R 配 DRUNK：他们的恋爱记忆一半在酒瓶里，另一半在朋友手机里。',
    shareableRoastEN: 'JOKE-R x DRUNK: half of this relationship is in the bottle, the other half is on friends\' phones.',
  },
  {
    type1: 'JOKE-R',
    type2: 'THIN-K',
    scorePercent: 59,
    verdict: 'fine',
    summaryCN:
      'JOKE-R 说段子，THIN-K 一边听一边分析段子结构。吊诡的是两个人居然互相喜欢：THIN-K 觉得 JOKE-R 让自己放松，JOKE-R 觉得 THIN-K 让自己被看见。',
    summaryEN:
      'JOKE-R tells jokes, THIN-K silently analyzes the punchline structure. Ironically, the pair works: THIN-K unwinds around JOKE-R, JOKE-R finally feels seen by THIN-K.',
    fightsCN: [
      'JOKE-R 觉得 THIN-K 太冷静',
      'THIN-K 觉得 JOKE-R 不认真',
      '共同决定太慢',
      '朋友圈差异',
      '要不要公开秀恩爱',
    ],
    fightsEN: [
      'JOKE-R thinks THIN-K is too calm',
      'THIN-K thinks JOKE-R is unserious',
      'Joint decisions move slow',
      'Social circle mismatch',
      'Public PDA or not',
    ],
    dateIdeasCN: [
      '看一部智力片然后聊到天亮',
      '桌游',
      '书店+脱口秀',
    ],
    dateIdeasEN: [
      'Smart movie followed by all-night debrief',
      'Board games',
      'Bookstore then stand-up',
    ],
    relationshipTipsCN: [
      'JOKE-R 偶尔收起段子听一句',
      'THIN-K 让 JOKE-R 看见被认真对待',
      '两个节奏要找到中间值',
    ],
    relationshipTipsEN: [
      'JOKE-R: put the jokes down sometimes',
      'THIN-K: let JOKE-R feel taken seriously',
      'Find a tempo between you',
    ],
    shareableRoastCN: 'JOKE-R 配 THIN-K：一个在讲段子，一个在开心地拆解段子。',
    shareableRoastEN: 'JOKE-R x THIN-K: one tells jokes, the other happily dissects them.',
  },
  {
    type1: 'JOKE-R',
    type2: 'FAKE',
    scorePercent: 43,
    verdict: 'rocky',
    summaryCN:
      'JOKE-R 爱拆人设，FAKE 靠人设维持生活。JOKE-R 在家里随口一句就能把 FAKE 的一整天毁掉。互相被吸引是真的，互相磨合也是真的费劲。',
    summaryEN:
      'JOKE-R loves dismantling personas, FAKE runs on them. A casual JOKE-R line can wreck FAKE\'s entire day. The attraction is real — and so is the friction.',
    fightsCN: [
      '「你能不能别拆我」',
      'FAKE 觉得被 JOKE-R 公开嘲笑',
      '聚会上的默契',
      '真心话的频率',
      '「你是不是瞧不起我」',
    ],
    fightsEN: [
      '"Can you stop decoding me publicly"',
      'FAKE feels roasted in public',
      'Party dynamics mismatch',
      'Frequency of honesty',
      '"Do you actually respect me"',
    ],
    dateIdeasCN: [
      '关门后的深谈',
      '一起装修一个小角落',
      '做一次没滤镜的合照',
    ],
    dateIdeasEN: [
      'Closed-door deep talk',
      'Decorate a corner together',
      'One unfiltered joint photo',
    ],
    relationshipTipsCN: [
      'JOKE-R 私下说真话',
      'FAKE 允许自己卸面具',
      '朋友圈少撕',
    ],
    relationshipTipsEN: [
      'JOKE-R: honest talk, privately',
      'FAKE: drop the mask sometimes',
      'Stop ripping each other up in group chats',
    ],
    shareableRoastCN: 'JOKE-R 配 FAKE：一个在说真话当段子，一个在把段子当攻击。',
    shareableRoastEN: 'JOKE-R x FAKE: one delivers truth as a punchline, the other receives it as an attack.',
  },
  {
    type1: 'JOKE-R',
    type2: 'OH-NO',
    scorePercent: 20,
    verdict: 'doomed',
    summaryCN:
      'JOKE-R 的欢乐踩到 OH-NO 的焦虑按钮上。JOKE-R 一开玩笑 OH-NO 脑补灾难，OH-NO 一焦虑 JOKE-R 想逃避。两个人在频率上天差地别。',
    summaryEN:
      'JOKE-R\'s jokes land right on OH-NO\'s anxiety triggers. A JOKE-R quip sends OH-NO into catastrophe mode; OH-NO\'s anxiety makes JOKE-R want to flee. Wavelengths don\'t match at all.',
    fightsCN: [
      '「你能不能别拿这事开玩笑」',
      'OH-NO 的焦虑话题',
      '「我认真的」vs「我闹着玩」',
      '社交场合的不同步',
      '半夜的情绪',
    ],
    fightsEN: [
      '"Can you stop joking about this"',
      'OH-NO\'s anxiety spirals',
      '"I\'m serious" vs "I\'m kidding"',
      'Party timing desync',
      'Midnight emotion dumps',
    ],
    dateIdeasCN: [
      '安静的散步',
      '低刺激的室内活动',
      '一起做冥想',
    ],
    dateIdeasEN: [
      'A quiet walk',
      'Low-stim indoor activities',
      'Try a meditation session together',
    ],
    relationshipTipsCN: [
      'JOKE-R 学会按暂停',
      'OH-NO 不要把 JOKE-R 变成稳定源',
      '这段关系可能要评估',
    ],
    relationshipTipsEN: [
      'JOKE-R: learn to hit pause',
      'OH-NO: JOKE-R is not your anxiety anchor',
      'This relationship may need real evaluation',
    ],
    shareableRoastCN: 'JOKE-R 配 OH-NO：一个想让人笑，一个一听就想报警。',
    shareableRoastEN: 'JOKE-R x OH-NO: one wants to make people laugh, the other hears "I\'m dying" and dials 911.',
  },

  // ========== WOC! ==========
  {
    type1: 'WOC!',
    type2: 'SEXY',
    scorePercent: 88,
    verdict: 'destiny',
    summaryCN:
      'WOC! 是情绪大爆发的那种人，SEXY 正好是聚光灯吸收体。WOC! 每一次尖叫都被 SEXY 转换成氛围感，两个人站一起就是派对的两个焦点。生活很热闹，但日常需要排气。',
    summaryEN:
      'WOC! is full-volume emotion, SEXY is a spotlight sponge. Every WOC! shriek becomes atmosphere thanks to SEXY; together you\'re both focal points at every party. High-energy life — just needs daily venting.',
    fightsCN: [
      '谁抢风头',
      '太闹引起邻居投诉',
      '情绪能量对撞',
      '「你是不是炫给别人看的」',
      '花钱节奏',
    ],
    fightsEN: [
      'Who steals the spotlight',
      'Neighbors complaining about noise',
      'Energy collisions',
      '"Are you showing off for other people"',
      'Spending cadence',
    ],
    dateIdeasCN: [
      '大型演唱会',
      '舞池',
      '两个人自办一个 mini 派对',
    ],
    dateIdeasEN: [
      'Stadium concert',
      'Dance floor',
      'Host your own tiny party',
    ],
    relationshipTipsCN: [
      '每周一次低强度日',
      '别用朋友来比较',
      '允许对方偶尔暗淡',
    ],
    relationshipTipsEN: [
      'One low-key day per week',
      'Stop comparing each other via friends',
      'Let each other be dim occasionally',
    ],
    shareableRoastCN: 'WOC! 配 SEXY：他们走进房间时整个房间都要重新调光。',
    shareableRoastEN: 'WOC! x SEXY: when they walk into a room the lighting rig needs a reset.',
  },
  {
    type1: 'WOC!',
    type2: 'DRUNK',
    scorePercent: 74,
    verdict: 'great',
    summaryCN:
      'WOC! 的爆发力 + DRUNK 的放松感 = 派对双人组。两个人在酒桌上永远是主角，各种故事从 0 到 100 只用一杯酒的时间。长期需要注意健康和节奏。',
    summaryEN:
      'WOC!\'s explosiveness plus DRUNK\'s looseness equals the ultimate party duo. Always the main characters at any bar. Stories go from 0 to 100 in one drink. Long-term: watch your health and your tempo.',
    fightsCN: [
      '谁喝更多',
      '第二天谁道歉',
      '工作日能不能喝',
      '和前男女友的界限',
      '吵架吵给所有人听',
    ],
    fightsEN: [
      'Who drinks more',
      'Who apologizes the next morning',
      'Can we drink on weekdays',
      'Limits with exes',
      'Fighting in front of everyone',
    ],
    dateIdeasCN: [
      '酒吧+夜宵',
      '一起参加一次派对',
      '周末醒酒早午餐',
    ],
    dateIdeasEN: [
      'Bar plus late-night food',
      'Party hop together',
      'Weekend hangover brunch',
    ],
    relationshipTipsCN: [
      '不喝酒的爱情也能谈',
      '身体是底线',
      '别把情绪全部交给酒精',
    ],
    relationshipTipsEN: [
      'Try loving each other sober',
      'Health is the floor',
      'Don\'t outsource feelings to alcohol',
    ],
    shareableRoastCN: 'WOC! 配 DRUNK：他们的恋爱不是用眼泪记录的，是用吐槽和酒局。',
    shareableRoastEN: 'WOC! x DRUNK: their relationship isn\'t recorded in tears — it\'s recorded in receipts and bar stories.',
  },
  {
    type1: 'WOC!',
    type2: 'BOSS',
    scorePercent: 56,
    verdict: 'fine',
    summaryCN:
      'WOC! 是情绪高能人，BOSS 是结果导向。两个人都很强势，谁也不让步。相处像两家公司 JV，一起赚钱可以，日常相处有点累。',
    summaryEN:
      'WOC! runs on max emotion, BOSS runs on outcomes. Both strong, both unyielding. It\'s like a JV between two firms — great for joint ventures, exhausting for daily life.',
    fightsCN: [
      '谁说了算',
      'BOSS 嫌 WOC! 情绪太大',
      'WOC! 嫌 BOSS 太冷血',
      '朋友圈谁是 C 位',
      '大事决策节奏',
    ],
    fightsEN: [
      'Who has final say',
      'BOSS thinks WOC! runs too hot',
      'WOC! thinks BOSS is ice-cold',
      'Who\'s the lead in the group photo',
      'Decision-making tempo',
    ],
    dateIdeasCN: [
      '一起看比赛',
      '去一个高强度的户外活动',
      '短途高端旅游',
    ],
    dateIdeasEN: [
      'Watch a game together',
      'High-intensity outdoor adventure',
      'Short luxury trip',
    ],
    relationshipTipsCN: [
      '情绪先降温再谈事',
      '谁都不是对方下属',
      '让对方赢一次',
    ],
    relationshipTipsEN: [
      'Cool down before talking shop',
      'Neither of you is a direct report',
      'Let each other win sometimes',
    ],
    shareableRoastCN: 'WOC! 配 BOSS：一个在喊「我受不了了」，一个在问「那 KPI 怎么办」。',
    shareableRoastEN: 'WOC! x BOSS: one yells "I can\'t take it anymore," the other replies "what about the KPIs."',
  },
  {
    type1: 'WOC!',
    type2: 'IMSB',
    scorePercent: 34,
    verdict: 'rocky',
    summaryCN:
      'WOC! 把情绪全拉满，IMSB 把情绪全压住。WOC! 的大开大合让 IMSB 想躲到衣柜，IMSB 的沉默让 WOC! 以为对方不爱。能在一起但每天都像做心肺复苏。',
    summaryEN:
      'WOC! runs emotion at 100, IMSB caps it at 5. WOC!\'s swings make IMSB want to hide in a closet, IMSB\'s silence makes WOC! think the love is gone. Sustainable only through daily emotional CPR.',
    fightsCN: [
      'WOC! 情绪一上来 IMSB 就撤',
      '「你从来不回应我」',
      '社交场合节奏差',
      '节日要不要庆祝',
      '争吵方式',
    ],
    fightsEN: [
      'WOC! explodes, IMSB retreats',
      '"You never respond to me"',
      'Social pacing mismatch',
      'Do we celebrate holidays at all',
      'Fight style clash',
    ],
    dateIdeasCN: [
      '去 IMSB 的舒适区一次',
      '独立书店+慢咖啡',
      '小众博物馆',
    ],
    dateIdeasEN: [
      'Meet in IMSB\'s comfort zone once',
      'Indie bookstore plus slow coffee',
      'Obscure museum',
    ],
    relationshipTipsCN: [
      'WOC! 学会降分贝',
      'IMSB 学会说一句',
      '情绪表达要翻译',
    ],
    relationshipTipsEN: [
      'WOC!: turn the volume down',
      'IMSB: say one sentence when needed',
      'Emotion needs a translator between you',
    ],
    shareableRoastCN: 'WOC! 配 IMSB：一个在放烟花，一个在找地下室避难。',
    shareableRoastEN: 'WOC! x IMSB: one launches fireworks, the other looks for a basement shelter.',
  },
  {
    type1: 'WOC!',
    type2: 'MONK',
    scorePercent: 16,
    verdict: 'doomed',
    summaryCN:
      'WOC! 的人生目标是把情绪放大到全世界都能听见，MONK 的人生目标是让世界听不见自己。两个人相处每天都在消耗对方的生命值，哪怕一句话都能打架。',
    summaryEN:
      'WOC!\'s life mission is making emotions audible to the whole planet. MONK\'s is making the planet not hear them. Every day drains the other\'s HP. A single sentence can start a war.',
    fightsCN: [
      '所有的一切',
      '音量',
      '社交频率',
      '情绪表达',
      '「你根本不懂我」',
    ],
    fightsEN: [
      'Literally everything',
      'Volume',
      'Social frequency',
      'Emotional expression',
      '"You don\'t get me at all"',
    ],
    dateIdeasCN: [
      '大概只能分开出门',
      'WOC! 去 KTV，MONK 去图书馆',
      '甚至不推荐',
    ],
    dateIdeasEN: [
      'Honestly, separate outings',
      'WOC! hits karaoke, MONK hits the library',
      'We almost don\'t recommend any',
    ],
    relationshipTipsCN: [
      '可能真的不要凑',
      '别试图改造对方',
      '保留尊重即可',
    ],
    relationshipTipsEN: [
      'Maybe don\'t force this',
      'Don\'t try to remodel each other',
      'Mutual respect is the only exit',
    ],
    shareableRoastCN: 'WOC! 配 MONK：一个在广场舞，一个在山里闭关。',
    shareableRoastEN: 'WOC! x MONK: one runs a plaza dance, the other runs a mountain retreat.',
  },

  // ========== THAN-K ==========
  {
    type1: 'THAN-K',
    type2: 'MUM',
    scorePercent: 91,
    verdict: 'destiny',
    summaryCN:
      'THAN-K 懂感恩，MUM 爱付出，两个人的爱形成了一个正向循环。MUM 的每份付出被 THAN-K 记得清清楚楚，THAN-K 的每次谢意让 MUM 觉得值得。稳是真稳，就是有时候太客气。',
    summaryEN:
      'THAN-K remembers, MUM gives. Each sacrifice is logged, every thank-you makes MUM feel worth it. Deeply stable, sometimes a little too formal.',
    fightsCN: [
      '「你不用这么谢我」',
      '节日礼物标准',
      '「我不是为了谢」',
      '家务分配太客气',
      '亲戚关系',
    ],
    fightsEN: [
      '"You don\'t have to thank me"',
      'Gift standards on holidays',
      '"I\'m not doing it for the thanks"',
      'Chore division gets too polite',
      'Extended family',
    ],
    dateIdeasCN: [
      '为对方做一顿饭',
      '写一封真诚的信',
      '一起看一场旧电影',
    ],
    dateIdeasEN: [
      'Cook for each other',
      'Write a real letter',
      'Old-film night together',
    ],
    relationshipTipsCN: [
      'THAN-K 偶尔任性一次',
      'MUM 接受 THAN-K 的回馈',
      '表达比客套重要',
    ],
    relationshipTipsEN: [
      'THAN-K: be selfish once',
      'MUM: accept THAN-K\'s gestures',
      'Real expression beats polite ritual',
    ],
    shareableRoastCN: 'THAN-K 配 MUM：每天的对话像是写感谢信的第一稿和最后稿。',
    shareableRoastEN: 'THAN-K x MUM: every daily chat reads like the first and final draft of a thank-you card.',
  },
  {
    type1: 'THAN-K',
    type2: 'LOVE-R',
    scorePercent: 80,
    verdict: 'great',
    summaryCN:
      'LOVE-R 给满，THAN-K 接得住还送回去。两个人都深情但 THAN-K 比 LOVE-R 更克制，经常 LOVE-R 一热闹 THAN-K 就红眼眶。稳定度很高但是容易陷入相互宠溺。',
    summaryEN:
      'LOVE-R gives all, THAN-K catches and gives back with interest. Both sentimental — THAN-K just holds it in tighter. LOVE-R goes loud and THAN-K tears up quietly. Very stable, with mild risk of mutual spoiling.',
    fightsCN: [
      '「你为什么不说你不舒服」',
      'LOVE-R 的戏剧性太多',
      'THAN-K 不敢表达需求',
      '朋友关系处理',
      '节日仪式感',
    ],
    fightsEN: [
      '"Why didn\'t you say you were hurt"',
      'LOVE-R\'s drama',
      'THAN-K can\'t voice needs',
      'Friend-group politics',
      'Holiday rituals',
    ],
    dateIdeasCN: [
      '写一封给对方的感谢信',
      '周年纪念大餐',
      '一起去一个有意义的地方',
    ],
    dateIdeasEN: [
      'Thank-you letter for each other',
      'Anniversary dinner',
      'Visit somewhere meaningful to both of you',
    ],
    relationshipTipsCN: [
      'THAN-K 要学会开口要',
      'LOVE-R 注意 THAN-K 的隐忍',
      '感情需要被听见而不是被感激',
    ],
    relationshipTipsEN: [
      'THAN-K: learn to ask out loud',
      'LOVE-R: notice when THAN-K is holding back',
      'Love wants to be heard, not thanked',
    ],
    shareableRoastCN: 'THAN-K 配 LOVE-R：他们的恋爱每一秒都像在说「谢谢来到我世界」。',
    shareableRoastEN: 'THAN-K x LOVE-R: every second of their relationship is a live-broadcast "thanks for showing up."',
  },
  {
    type1: 'THAN-K',
    type2: 'OJBK',
    scorePercent: 66,
    verdict: 'fine',
    summaryCN:
      'THAN-K 感恩，OJBK 淡定。两个人都不麻烦，也都不折腾，日常稳得像老夫老妻。就是感情浓度偏低，互相需要主动一点。',
    summaryEN:
      'THAN-K expresses gratitude, OJBK stays chill. Both low-maintenance, both unbothered — daily life feels already retired. The only catch: the emotional density is mild; both of you need to show up proactively.',
    fightsCN: [
      '「你到底想不想」',
      '周年纪念日两个人都忘',
      '决定节奏',
      '花钱风格',
      '家人关系',
    ],
    fightsEN: [
      '"Do you actually want this or not"',
      'Both of you forgot the anniversary',
      'Decision tempo',
      'Spending style',
      'Family dynamics',
    ],
    dateIdeasCN: [
      '散步+街头小吃',
      '做一顿简单饭',
      '旧电影之夜',
    ],
    dateIdeasEN: [
      'Walk plus street food',
      'Cook a simple meal',
      'Old-film night',
    ],
    relationshipTipsCN: [
      '主动制造小惊喜',
      '别把安静当默契',
      '情感账户要维护',
    ],
    relationshipTipsEN: [
      'Create small surprises on purpose',
      'Don\'t mistake silence for chemistry',
      'Maintain the emotional bank account',
    ],
    shareableRoastCN: 'THAN-K 配 OJBK：恋爱像在过一种很稳定但容易忘的假。',
    shareableRoastEN: 'THAN-K x OJBK: their relationship feels like a very stable vacation nobody remembers taking.',
  },
  {
    type1: 'THAN-K',
    type2: 'FUCK',
    scorePercent: 29,
    verdict: 'rocky',
    summaryCN:
      'THAN-K 温柔，FUCK 暴躁。THAN-K 的每句感谢都会被 FUCK 的「别这样」堵住，FUCK 的脏话会让 THAN-K 的内心一个个小声「哦」。相处需要大量翻译。',
    summaryEN:
      'THAN-K is soft, FUCK is stormy. Every THAN-K "thank you" gets blocked with "don\'t," every FUCK outburst leaves THAN-K quietly saying "oh" inside. Full-time translation required.',
    fightsCN: [
      '「你说话能不能好听点」',
      'FUCK 觉得 THAN-K 太假',
      'THAN-K 容易被 FUCK 一句话破防',
      '表达差距',
      '家人接触',
    ],
    fightsEN: [
      '"Can you say it nicer"',
      'FUCK thinks THAN-K is fake',
      'THAN-K breaks on one FUCK line',
      'Expression gap',
      'Family contact stress',
    ],
    dateIdeasCN: [
      '小范围独处',
      '一起做运动',
      '低压力的安静咖啡馆',
    ],
    dateIdeasEN: [
      'Small-scale alone time',
      'Workout together',
      'Quiet low-pressure cafe',
    ],
    relationshipTipsCN: [
      'FUCK 练习口语温柔',
      'THAN-K 表达需求不要客套',
      '冲突要解决不要拖',
    ],
    relationshipTipsEN: [
      'FUCK: practice softer delivery',
      'THAN-K: drop the polite cushioning',
      'Resolve conflict, don\'t delay it',
    ],
    shareableRoastCN: 'THAN-K 配 FUCK：一个在鞠躬，一个在骂人。',
    shareableRoastEN: 'THAN-K x FUCK: one is bowing in gratitude, the other is cursing at traffic.',
  },
  {
    type1: 'THAN-K',
    type2: 'IMFW',
    scorePercent: 21,
    verdict: 'doomed',
    summaryCN:
      'THAN-K 每做一件事都希望被看见，IMFW 连自己都懒得看见。THAN-K 的温柔直接跌进 IMFW 的黑洞，连个回声都没有。',
    summaryEN:
      'THAN-K wants every act to be seen, IMFW can\'t even be bothered to see themselves. THAN-K\'s warmth falls into IMFW\'s black hole without an echo.',
    fightsCN: [
      '「你到底在不在乎」',
      'IMFW 的无反应',
      'THAN-K 的失望',
      '节日无感',
      '未来规划空',
    ],
    fightsEN: [
      '"Do you even care"',
      'IMFW\'s non-reaction',
      'THAN-K\'s disappointment',
      'Zero holiday feelings',
      'Empty future plan',
    ],
    dateIdeasCN: [
      '可能没有',
      '各自做事',
      '一起看一场电影 IMFW 不睡就算赢',
    ],
    dateIdeasEN: [
      'Basically none',
      'Parallel solo tasks',
      'Movie night where IMFW not napping counts as a win',
    ],
    relationshipTipsCN: [
      'THAN-K 要保护自己',
      'IMFW 要诚实告诉对方自己的状态',
      '也许不该开始',
    ],
    relationshipTipsEN: [
      'THAN-K: protect yourself',
      'IMFW: be honest about your state',
      'Maybe this shouldn\'t have started',
    ],
    shareableRoastCN: 'THAN-K 配 IMFW：一个在说谢谢，一个已经不在了。',
    shareableRoastEN: 'THAN-K x IMFW: one says "thank you," the other already left the chat.',
  },

  // ========== OH-NO ==========
  {
    type1: 'OH-NO',
    type2: 'MUM',
    scorePercent: 87,
    verdict: 'destiny',
    summaryCN:
      'OH-NO 的焦虑正好被 MUM 的安抚吸收。MUM 的「没事没事」是 OH-NO 的精神药品，OH-NO 的小心翼翼让 MUM 觉得自己被需要。是那种「相处到最后连医院都一起去」的组合。',
    summaryEN:
      'OH-NO\'s anxiety gets absorbed perfectly by MUM\'s "it\'s okay, it\'s okay." MUM\'s voice is OH-NO\'s mental meds, OH-NO\'s carefulness makes MUM feel needed. The kind of couple who ends up going to doctor appointments together.',
    fightsCN: [
      'OH-NO 的焦虑爆发',
      'MUM 的过度保护',
      '「你能不能稍微放下心」',
      '双方家人',
      '决定要问几次',
    ],
    fightsEN: [
      'OH-NO\'s anxiety spirals',
      'MUM\'s over-protection',
      '"Can you just calm down a bit"',
      'Both sets of families',
      'How many times you re-ask the same question',
    ],
    dateIdeasCN: [
      '在家做一顿饭',
      '一起散步',
      '一起做一个减压 app',
    ],
    dateIdeasEN: [
      'Cook at home',
      'Take a walk',
      'Build a tiny stress-relief routine together',
    ],
    relationshipTipsCN: [
      'MUM 不能把 OH-NO 当小孩',
      'OH-NO 练习自己安抚自己',
      '焦虑有生活之外的出口',
    ],
    relationshipTipsEN: [
      'MUM: OH-NO is not a child',
      'OH-NO: practice self-soothing',
      'Anxiety needs an outlet outside the relationship',
    ],
    shareableRoastCN: 'OH-NO 配 MUM：一个在担心，一个在说没事，背景音永远是热水壶。',
    shareableRoastEN: 'OH-NO x MUM: one worries, one soothes, the background audio is always a kettle.',
  },
  {
    type1: 'OH-NO',
    type2: 'THAN-K',
    scorePercent: 77,
    verdict: 'great',
    summaryCN:
      '两个情绪敏感型凑一起,像两只小猫在互相舔毛。OH-NO 的焦虑被 THAN-K 的温柔软化,THAN-K 的委屈能被 OH-NO 第一时间察觉。外人看像两个玻璃娃娃,内部其实很和谐。',
    summaryEN:
      'Two emotionally sensitive people form a self-grooming cat pair. OH-NO\'s anxiety softens in THAN-K\'s warmth, THAN-K\'s hidden sadness gets caught by OH-NO instantly. Outsiders see two porcelain dolls; inside it actually works.',
    fightsCN: [
      '谁先安抚谁',
      '「你这样我也会焦虑」',
      '社交场合双焦虑',
      '决定都要问三次',
      '小事反复确认',
    ],
    fightsEN: [
      'Who soothes whom first',
      '"Now I\'m anxious because you are"',
      'Double anxiety at social events',
      'Every decision asked three times',
      'Endless re-confirmation on small things',
    ],
    dateIdeasCN: [
      '独立咖啡馆',
      '散步+听歌单',
      '一起整理房间',
    ],
    dateIdeasEN: [
      'Indie cafe',
      'Walk with a shared playlist',
      'Organize the apartment together',
    ],
    relationshipTipsCN: [
      '情绪互相照顾要有边界',
      '需要一个外部稳定源',
      '日常要有踏实的节奏',
    ],
    relationshipTipsEN: [
      'Emotional care still needs boundaries',
      'Have at least one outside stabilizer',
      'Keep a grounded daily rhythm',
    ],
    shareableRoastCN: 'OH-NO 配 THAN-K：恋爱像两只小动物互相用头顶对方。',
    shareableRoastEN: 'OH-NO x THAN-K: dating feels like two small animals headbumping each other for comfort.',
  },
  {
    type1: 'OH-NO',
    type2: 'THIN-K',
    scorePercent: 60,
    verdict: 'fine',
    summaryCN:
      'OH-NO 的情绪需要答案,THIN-K 擅长分析但不擅长给 emotional 支持。两个人可以坐下把焦虑拆成 excel,但 OH-NO 有时候想要的只是一个拥抱。',
    summaryEN:
      'OH-NO\'s emotions need answers, THIN-K is great at analysis but not great at hugs. You can sit down and turn anxiety into a spreadsheet — but sometimes OH-NO just wants a hug instead.',
    fightsCN: [
      '「我不是要你分析」',
      '情绪 vs 逻辑',
      'THIN-K 的决定太慢',
      '社交频率',
      '共同朋友谁来处理',
    ],
    fightsEN: [
      '"I\'m not asking for analysis"',
      'Feelings vs logic',
      'THIN-K decides too slow',
      'Social frequency',
      'Who handles shared friends',
    ],
    dateIdeasCN: [
      '冷色调的书店',
      '看一部脑洞悬疑片',
      '安静的花艺工作坊',
    ],
    dateIdeasEN: [
      'A cool-toned bookstore',
      'A high-concept mystery film',
      'A quiet floristry workshop',
    ],
    relationshipTipsCN: [
      'THIN-K 先给拥抱再分析',
      'OH-NO 明确说自己要什么',
      '建立「情绪急救包」',
    ],
    relationshipTipsEN: [
      'THIN-K: hug first, analyze second',
      'OH-NO: specify what you actually need',
      'Build an "emotion first-aid kit"',
    ],
    shareableRoastCN: 'OH-NO 配 THIN-K：一个在哭，一个在画流程图解释哭的原因。',
    shareableRoastEN: 'OH-NO x THIN-K: one cries, the other draws a flow chart explaining the cause.',
  },
  {
    type1: 'OH-NO',
    type2: 'DRUNK',
    scorePercent: 31,
    verdict: 'rocky',
    summaryCN:
      'DRUNK 随性到极致,OH-NO 焦虑到极致。DRUNK 的「今晚通宵」能让 OH-NO 脑补出急诊室场景,OH-NO 的「我担心你」会让 DRUNK 感到喘不过气。',
    summaryEN:
      'DRUNK is all impulse, OH-NO is all worry. DRUNK\'s "let\'s pull an all-nighter" makes OH-NO imagine the ER, OH-NO\'s "I\'m worried about you" makes DRUNK gasp for air.',
    fightsCN: [
      '安全感问题',
      '作息冲突',
      '钱花在哪',
      '喝酒频率',
      '「你爱我吗」',
    ],
    fightsEN: [
      'Safety concerns',
      'Sleep schedule collisions',
      'Where the money goes',
      'Drinking frequency',
      '"Do you actually love me"',
    ],
    dateIdeasCN: [
      '白天的小酒馆',
      'OH-NO 挑一个安心的地方',
      '两人一起做一次运动',
    ],
    dateIdeasEN: [
      'A daytime wine bar',
      'Let OH-NO pick somewhere calming',
      'A shared workout',
    ],
    relationshipTipsCN: [
      'DRUNK 要准时回消息',
      'OH-NO 不要脑补最坏结局',
      '共同设定底线',
    ],
    relationshipTipsEN: [
      'DRUNK: reply on time',
      'OH-NO: stop scripting worst-case endings',
      'Set shared red lines',
    ],
    shareableRoastCN: 'OH-NO 配 DRUNK：一个想安全，一个想放飞，结果两个人都没睡好。',
    shareableRoastEN: 'OH-NO x DRUNK: one wants safety, the other wants chaos — neither gets sleep.',
  },
  {
    type1: 'OH-NO',
    type2: 'IMFW',
    scorePercent: 18,
    verdict: 'doomed',
    summaryCN:
      'OH-NO 的焦虑渴望被接住,IMFW 连自己都不想接。OH-NO 会越来越紧张,IMFW 会越来越冷漠,相处到最后两个人都不说话,但都在内部崩溃。',
    summaryEN:
      'OH-NO\'s anxiety begs to be caught, IMFW can\'t even catch themselves. OH-NO spirals tighter, IMFW grows colder — until no one talks and everyone melts inside.',
    fightsCN: [
      '冷战 vs 哭战',
      '「你还爱我吗」',
      '情绪孤岛',
      '小事无人回应',
      '节日空气',
    ],
    fightsEN: [
      'Cold war vs tear war',
      '"Do you even love me anymore"',
      'Emotional isolation',
      'Small asks go unanswered',
      'Empty holidays',
    ],
    dateIdeasCN: [
      '几乎没有',
      '一起坐在沙发玩手机',
      '去一个彼此都没预期的地方',
    ],
    dateIdeasEN: [
      'Almost nothing',
      'Couch plus phones',
      'Go somewhere neither of you expects anything from',
    ],
    relationshipTipsCN: [
      '寻求外部帮助',
      '别把对方当稳定器',
      '必要时分开',
    ],
    relationshipTipsEN: [
      'Seek outside help',
      'Neither is the other\'s stabilizer',
      'Separate if needed',
    ],
    shareableRoastCN: 'OH-NO 配 IMFW：一个在怕失去，一个已经失去感觉了。',
    shareableRoastEN: 'OH-NO x IMFW: one is afraid to lose, the other already lost interest.',
  },

  // ========== ATM-er ==========
  {
    type1: 'ATM-er',
    type2: 'BOSS',
    scorePercent: 89,
    verdict: 'destiny',
    summaryCN:
      'ATM-er 擅长挣钱,BOSS 擅长定方向,两个人拼在一起就是一个小型家族企业。效率高,野心大,生活围着目标转。浪漫可能少一点,但「我们一起买了第三套房」的快乐没有上限。',
    summaryEN:
      'ATM-er makes the money, BOSS sets the direction. Together you\'re a boutique family holdings firm. High efficiency, big ambition, life orbits around targets. Less romance, but "we just bought our third apartment" hits different.',
    fightsCN: [
      '谁的业务更重要',
      '投资分配',
      '周末谁休息',
      '朋友圈是否要分开',
      '「你有没有把我当合伙人」',
    ],
    fightsEN: [
      'Whose biz is more important',
      'Investment split',
      'Who gets to rest this weekend',
      'Should we even share the same friend circle',
      '"Am I actually your partner"',
    ],
    dateIdeasCN: [
      '一起谈一笔小生意',
      '看一场大型展会',
      '高端健身房会员卡',
    ],
    dateIdeasEN: [
      'Plan a small joint venture',
      'Hit a big industry expo',
      'Shared high-end gym membership',
    ],
    relationshipTipsCN: [
      '每周一次非工作日',
      '别互相当下属',
      '情感 KPI 也要设',
    ],
    relationshipTipsEN: [
      'One non-work day a week',
      'Neither is the other\'s employee',
      'Set emotional KPIs too',
    ],
    shareableRoastCN: 'ATM-er 配 BOSS：他们的恋爱像一张财报，月月要对账。',
    shareableRoastEN: 'ATM-er x BOSS: their love is a quarterly report — reconciled monthly.',
  },
  {
    type1: 'ATM-er',
    type2: 'CTRL',
    scorePercent: 81,
    verdict: 'great',
    summaryCN:
      'ATM-er 赚钱,CTRL 管钱,两个人简直是一个小型 CFO 办公室。日子井井有条,家里的每个角落都有计划。唯一问题是娱乐预算要进 excel 表格。',
    summaryEN:
      'ATM-er earns, CTRL manages. Together you\'re a tiny CFO office. Orderly days, every corner of the house has a plan. Only catch: entertainment budget also goes in the spreadsheet.',
    fightsCN: [
      '投资方式',
      '家里谁签字',
      '谁决定大钱',
      '旅行预算',
      '节日怎么算',
    ],
    fightsEN: [
      'Investment style',
      'Who signs for what',
      'Who makes big-money calls',
      'Travel budget',
      'Holiday arithmetic',
    ],
    dateIdeasCN: [
      '做一个年度计划',
      '高级餐厅+红酒',
      '一起上一个财商课',
    ],
    dateIdeasEN: [
      'Draft a year plan together',
      'Fine dining plus wine',
      'Take a financial literacy class together',
    ],
    relationshipTipsCN: [
      '感情 KPI 也要有',
      '生活不能只是理财',
      '互相尊重决策权',
    ],
    relationshipTipsEN: [
      'Love also needs a KPI',
      'Life isn\'t just finance',
      'Respect each other\'s signing authority',
    ],
    shareableRoastCN: 'ATM-er 配 CTRL：他们的关系像两张信用卡,互相盯紧额度。',
    shareableRoastEN: 'ATM-er x CTRL: their relationship is two credit cards watching each other\'s limit.',
  },
  {
    type1: 'ATM-er',
    type2: 'SEXY',
    scorePercent: 58,
    verdict: 'fine',
    summaryCN:
      'ATM-er 会挣,SEXY 会花。短期来看是「你挣我花」的童话,长期要看 ATM-er 的忍耐力和 SEXY 的自觉性。偶尔互相羡慕,偶尔互相抱怨。',
    summaryEN:
      'ATM-er earns, SEXY spends. Short-term it\'s a cute "you earn I spend" fairy tale; long-term depends on ATM-er\'s patience and SEXY\'s self-awareness. Envy and complaint come in equal doses.',
    fightsCN: [
      '账单',
      '「你怎么又买了」',
      '节日消费等级',
      '社交成本',
      '谁决定花销',
    ],
    fightsEN: [
      'Bills',
      '"You bought that AGAIN?"',
      'Holiday spending tier',
      'Social scene costs',
      'Who approves purchases',
    ],
    dateIdeasCN: [
      '共同预算的小奢华',
      '一起挑一个礼物',
      '参加一个投资 workshop',
    ],
    dateIdeasEN: [
      'Pre-budgeted mini-luxury date',
      'Pick one gift together',
      'Investment workshop date',
    ],
    relationshipTipsCN: [
      '共同账户要透明',
      '偶尔让 SEXY 为爱买单',
      '别把钱当成唯一话题',
    ],
    relationshipTipsEN: [
      'Shared account, full transparency',
      'Let SEXY pay the bill sometimes',
      'Money isn\'t your only topic',
    ],
    shareableRoastCN: 'ATM-er 配 SEXY：一个在存，一个在花，账本是他们的情书。',
    shareableRoastEN: 'ATM-er x SEXY: one saves, one spends, the ledger is their love letter.',
  },
  {
    type1: 'ATM-er',
    type2: 'POOR',
    scorePercent: 34,
    verdict: 'rocky',
    summaryCN:
      'ATM-er 的「我再多赚点」在 POOR 耳里像讽刺。POOR 的自卑让 ATM-er 不知道该怎么爱,ATM-er 的野心让 POOR 感到压力山大。爱不是不行,但每天都在负重。',
    summaryEN:
      'ATM-er\'s "I just need to earn more" sounds like mockery to POOR. POOR\'s self-doubt makes ATM-er not know how to love, ATM-er\'s ambition crushes POOR daily. Love exists — with a very heavy backpack.',
    fightsCN: [
      '钱',
      '钱',
      '还是钱',
      '「你觉得我配吗」',
      '未来规划差距',
    ],
    fightsEN: [
      'Money',
      'Money',
      'More money',
      '"Do you think I deserve you"',
      'Future-plan mismatch',
    ],
    dateIdeasCN: [
      '便宜但精心的约会',
      '公园野餐',
      '看免费展',
    ],
    dateIdeasEN: [
      'Cheap but thoughtful date',
      'Park picnic',
      'Free exhibition',
    ],
    relationshipTipsCN: [
      'ATM-er 不要用钱衡量爱',
      'POOR 要学会接受爱',
      '不比较',
    ],
    relationshipTipsEN: [
      'ATM-er: stop measuring love in currency',
      'POOR: learn to accept being loved',
      'No comparisons',
    ],
    shareableRoastCN: 'ATM-er 配 POOR：一个越挣越多,一个越躲越远。',
    shareableRoastEN: 'ATM-er x POOR: one earns more and more, the other retreats more and more.',
  },
  {
    type1: 'ATM-er',
    type2: 'SHIT',
    scorePercent: 19,
    verdict: 'doomed',
    summaryCN:
      'ATM-er 生活里有预算表,SHIT 生活里有一团乱。ATM-er 的节奏和 SHIT 的节奏是相反的,ATM-er 会觉得在养一个废物,SHIT 会觉得被监视。',
    summaryEN:
      'ATM-er lives in a budget sheet, SHIT lives in a pile. Opposing rhythms — ATM-er feels like they\'re funding a dependent, SHIT feels surveilled.',
    fightsCN: [
      '打扫',
      '用钱',
      '出门',
      '家务',
      '未来要不要存',
    ],
    fightsEN: [
      'Cleaning',
      'Money',
      'Leaving the house',
      'Chores',
      'Do we even save money',
    ],
    dateIdeasCN: [
      '点外卖',
      'ATM-er 把家里收拾好',
      'SHIT 承诺出门一次',
    ],
    dateIdeasEN: [
      'Takeout',
      'ATM-er cleans the apartment',
      'SHIT promises to leave the house once',
    ],
    relationshipTipsCN: [
      '不要互相改造',
      '必要时分手',
      '各过各的',
    ],
    relationshipTipsEN: [
      'Don\'t try to renovate each other',
      'Break up if needed',
      'Live parallel lives',
    ],
    shareableRoastCN: 'ATM-er 配 SHIT：一个在攒钱,一个在攒灰尘。',
    shareableRoastEN: 'ATM-er x SHIT: one collects savings, the other collects dust.',
  },

  // ========== Dior-s ==========
  {
    type1: 'Dior-s',
    type2: 'SEXY',
    scorePercent: 90,
    verdict: 'destiny',
    summaryCN:
      'Dior-s 的审美和 SEXY 的气场是社交圈最致命的联名款。两个人走到哪都像一场品牌大秀。私下他俩反而挺松弛,因为根本不用向对方证明什么。',
    summaryEN:
      'Dior-s\'s taste plus SEXY\'s aura is the most lethal collab in your social circle. Every public appearance looks like a brand show. In private it\'s actually chill — they don\'t have to prove anything to each other.',
    fightsCN: ['买衣服预算', '谁是主角', '邀请名单', '拍照站位', '双方朋友圈'],
    fightsEN: ['Wardrobe budget', 'Who\'s the lead', 'Invite list', 'Photo positioning', 'Friend circles'],
    dateIdeasCN: ['一起看秀', '布置家里', '周末 design hotel'],
    dateIdeasEN: ['Front row together', 'Redecorate home', 'Design hotel weekend'],
    relationshipTipsCN: ['别互相比较衣品', '主动夸对方', '私下留真实时间'],
    relationshipTipsEN: ['Don\'t rank each other\'s outfits', 'Compliment proactively', 'Keep private unvarnished hours'],
    shareableRoastCN: 'Dior-s 配 SEXY：他们的恋爱是一个永远不打折的季节限定。',
    shareableRoastEN: 'Dior-s x SEXY: their love is a seasonal drop that never goes on sale.',
  },
  {
    type1: 'Dior-s',
    type2: 'FAKE',
    scorePercent: 79,
    verdict: 'great',
    summaryCN:
      '两个都爱面子、爱精致、爱场面。合在一起就是一对「人类形象管理」大师。日常会有一些「你怎么穿成这样出门」的小冲突,但在审美大方向上高度一致。',
    summaryEN:
      'Both care about image, both care about polish. Together: masters of the human-image-management discipline. Small clashes like "you\'re wearing that in public?" but aesthetic alignment is strong.',
    fightsCN: ['谁的面子更重要', '社交场合路线', '亲戚接触', '消费等级', '「你太演了」'],
    fightsEN: ['Whose face is at stake', 'Social script', 'Family contact', 'Spending tier', '"You\'re overperforming"'],
    dateIdeasCN: ['米其林餐厅', '一场私人展', '挑选家居'],
    dateIdeasEN: ['Michelin dinner', 'Private exhibition', 'Home furnishing date'],
    relationshipTipsCN: ['真实话要在家里说', '别用表演代替沟通', '一起做一件笨事'],
    relationshipTipsEN: ['Real talk happens at home', 'Stop performing instead of communicating', 'Do one clumsy thing together'],
    shareableRoastCN: 'Dior-s 配 FAKE：他们家里连一只袜子都要有品位。',
    shareableRoastEN: 'Dior-s x FAKE: even their socks have opinions.',
  },
  {
    type1: 'Dior-s',
    type2: 'LOVE-R',
    scorePercent: 62,
    verdict: 'fine',
    summaryCN:
      'Dior-s 爱美,LOVE-R 爱情。LOVE-R 会把 Dior-s 当成最美的礼物,Dior-s 接受但偶尔会觉得 LOVE-R 的情绪太浓到破坏画面感。',
    summaryEN:
      'Dior-s loves beauty, LOVE-R loves love. LOVE-R treats Dior-s like the most beautiful gift. Dior-s accepts it, occasionally feeling LOVE-R\'s emotional density ruins the composition.',
    fightsCN: ['「你只在乎外表吗」', '礼物标准', 'LOVE-R 的情绪戏', '节日仪式感', '照片滤镜'],
    fightsEN: ['"Do you only care about looks"', 'Gift standards', 'LOVE-R\'s drama', 'Holiday rituals', 'Photo filters'],
    dateIdeasCN: ['复古写真', '晚餐+现场音乐', '一起做手工'],
    dateIdeasEN: ['Retro photoshoot', 'Dinner with live music', 'Craft workshop'],
    relationshipTipsCN: ['Dior-s 也要表达情感', 'LOVE-R 接受 Dior-s 的爱有点冷静', '美和爱不矛盾'],
    relationshipTipsEN: ['Dior-s: express feelings too', 'LOVE-R: Dior-s\'s love runs a little cool', 'Beauty and love aren\'t opposites'],
    shareableRoastCN: 'Dior-s 配 LOVE-R：一个在摆 pose,一个在旁边哭出妆。',
    shareableRoastEN: 'Dior-s x LOVE-R: one poses, the other cries their eyeliner off next to them.',
  },
  {
    type1: 'Dior-s',
    type2: 'SHIT',
    scorePercent: 31,
    verdict: 'rocky',
    summaryCN:
      'Dior-s 要质感,SHIT 要躺平。两个人每次一出门都要吵一次,Dior-s 觉得 SHIT 拉低自己形象,SHIT 觉得 Dior-s 活得累。',
    summaryEN:
      'Dior-s wants texture, SHIT wants to rot. Every outing is a fight — Dior-s feels their image is compromised, SHIT finds Dior-s exhausting to even observe.',
    fightsCN: ['穿什么出门', '洗头频率', '社交场合', '家里审美', '花钱方式'],
    fightsEN: ['Outfit to leave the house', 'Shower schedule', 'Social events', 'Home aesthetic', 'Spending style'],
    dateIdeasCN: ['让 SHIT 去一次 Dior-s 的场子', 'Dior-s 在家吃外卖', '逛夜市妥协'],
    dateIdeasEN: ['Drag SHIT to one Dior-s event', 'Dior-s eats takeout at home', 'Compromise at the night market'],
    relationshipTipsCN: ['别互相嘲笑生活方式', '设一个中间区', '必要时各走各的'],
    relationshipTipsEN: ['Don\'t mock each other\'s lifestyles', 'Set a middle zone', 'Walk separate paths if needed'],
    shareableRoastCN: 'Dior-s 配 SHIT：一个在整理衣橱,一个躺在衣橱里。',
    shareableRoastEN: 'Dior-s x SHIT: one organizes the wardrobe, the other sleeps inside it.',
  },
  {
    type1: 'Dior-s',
    type2: 'POOR',
    scorePercent: 22,
    verdict: 'doomed',
    summaryCN:
      'Dior-s 的日常消费等于 POOR 的一周生活费。POOR 的自卑会被 Dior-s 的淡定刺激到,Dior-s 的随意被 POOR 理解成炫耀。',
    summaryEN:
      'Dior-s\'s daily spend equals POOR\'s weekly living budget. POOR\'s self-doubt gets triggered by Dior-s\'s casualness, and Dior-s\'s lack of thought reads as bragging to POOR.',
    fightsCN: ['钱', '礼物', '「你配不上我」或「你瞧不起我」', '社交场合谁买单', '未来'],
    fightsEN: ['Money', 'Gifts', '"You\'re too good / you look down on me"', 'Who pays in public', 'Future'],
    dateIdeasCN: ['选一个双方都能承受的地方', '自己做饭', 'Dior-s 体验一次便宜的乐趣'],
    dateIdeasEN: ['Somewhere both can afford', 'Home cooking', 'Let Dior-s enjoy one cheap thing'],
    relationshipTipsCN: ['钱不要成为唯一话题', 'Dior-s 不要秀', 'POOR 不要自贬'],
    relationshipTipsEN: ['Money can\'t be the only topic', 'Dior-s: stop flaunting', 'POOR: stop self-deprecating'],
    shareableRoastCN: 'Dior-s 配 POOR：一个在挑 LV,一个在算自己挑 LV 几次可以破产。',
    shareableRoastEN: 'Dior-s x POOR: one picks out LV, the other calculates how many picks until bankruptcy.',
  },

  // ========== THIN-K ==========
  {
    type1: 'THIN-K',
    type2: 'CTRL',
    scorePercent: 86,
    verdict: 'destiny',
    summaryCN:
      'THIN-K 擅长想,CTRL 擅长做,两个人合起来就是一台高效运行的人机。决策前 THIN-K 分析,CTRL 落地,几乎没有盲区。唯一的风险是日常太高效,容易忘了情感部分。',
    summaryEN:
      'THIN-K analyzes, CTRL executes — a fully tuned human machine. THIN-K dissects decisions, CTRL ships them. Almost no blind spots. Risk: so efficient that emotions get left out of the workflow.',
    fightsCN: ['「你能不能快点」', '「你能不能想清楚点」', '情绪回应慢', '节日要不要过', '工作 vs 生活'],
    fightsEN: ['"Can you move faster"', '"Can you think it through first"', 'Slow emotional response', 'Should we even do holidays', 'Work vs life'],
    dateIdeasCN: ['一起做年度计划', '看一部悬疑片辩论结局', '独立书店'],
    dateIdeasEN: ['Year-plan date', 'Thriller film plus debate', 'Indie bookstore'],
    relationshipTipsCN: ['每周一次「不工作」时间', '情感表达要有频率', '别把家里变成 office'],
    relationshipTipsEN: ['One "no work" window a week', 'Schedule emotional expression', 'Don\'t turn home into an office'],
    shareableRoastCN: 'THIN-K 配 CTRL：他们的恋爱进度都在同一个 notion page 里。',
    shareableRoastEN: 'THIN-K x CTRL: their relationship status lives in a shared Notion page.',
  },
  {
    type1: 'THIN-K',
    type2: 'MONK',
    scorePercent: 78,
    verdict: 'great',
    summaryCN:
      'THIN-K 思考哲学,MONK 实践哲学。两个人能对坐半小时不说话也不觉得尴尬。相处安静但不冷淡,时间一长感情会慢慢发酵成酒。',
    summaryEN:
      'THIN-K theorizes philosophy, MONK lives it. They can sit in silence for thirty minutes and nobody flinches. Quiet but not cold — the bond ferments into wine over time.',
    fightsCN: ['「你怎么不动」', '社交频率', '家人关系', '行动力差距', '表达频率'],
    fightsEN: ['"Why aren\'t you moving"', 'Social frequency', 'Family relations', 'Action gap', 'Expression frequency'],
    dateIdeasCN: ['长途徒步', '一起读同一本书', '静心禅修营'],
    dateIdeasEN: ['Long hike', 'Read the same book together', 'Meditation retreat'],
    relationshipTipsCN: ['允许对方慢', '安静不是冷漠', '偶尔主动出声'],
    relationshipTipsEN: ['Let each other be slow', 'Silence is not coldness', 'Speak up on purpose sometimes'],
    shareableRoastCN: 'THIN-K 配 MONK：他们约会像两个哲学系学生在林间对坐。',
    shareableRoastEN: 'THIN-K x MONK: dating them is two philosophy students sitting in a forest.',
  },
  {
    type1: 'THIN-K',
    type2: 'SOLO',
    scorePercent: 64,
    verdict: 'fine',
    summaryCN:
      '两个都有独立世界的人互相尊重对方的空间。关系看起来不热闹但很稳,偶尔会陷入「我们还好吗」的自我怀疑。',
    summaryEN:
      'Two people with independent inner worlds respecting each other\'s space. It looks low-heat but it\'s steady. Occasionally both spiral into "are we actually okay."',
    fightsCN: ['沟通频率', '谁先开口', '朋友圈介入', '节日是否过', '共同规划'],
    fightsEN: ['Communication frequency', 'Who speaks first', 'Friend involvement', 'Holidays or not', 'Joint planning'],
    dateIdeasCN: ['各做各的但同一个屋', '周末一个远一点的咖啡馆', '书店+电影'],
    dateIdeasEN: ['Parallel work in same room', 'Distant cafe weekend', 'Bookstore plus film'],
    relationshipTipsCN: ['定期约「复盘日」', '沉默不等于 ok', '主动给小惊喜'],
    relationshipTipsEN: ['Schedule recap days', 'Silence doesn\'t mean fine', 'Drop small surprises intentionally'],
    shareableRoastCN: 'THIN-K 配 SOLO：他们的爱情像两颗独立卫星,偶尔同轨道。',
    shareableRoastEN: 'THIN-K x SOLO: two solo satellites occasionally sharing an orbit.',
  },
  {
    type1: 'THIN-K',
    type2: 'WOC!',
    scorePercent: 37,
    verdict: 'rocky',
    summaryCN:
      'THIN-K 喜欢安静思考,WOC! 喜欢全世界都知道自己在想什么。WOC! 的每次情绪爆发都让 THIN-K 想躲进大脑的角落,THIN-K 的冷静又让 WOC! 觉得被忽略。',
    summaryEN:
      'THIN-K wants quiet reflection, WOC! wants the whole world to know what they\'re thinking. Every WOC! eruption sends THIN-K into the mental basement, and THIN-K\'s calmness makes WOC! feel ignored.',
    fightsCN: ['情绪 vs 分析', '音量', '社交频率', '「你根本不在乎」', '节日仪式感'],
    fightsEN: ['Feelings vs analysis', 'Volume', 'Social frequency', '"You don\'t care"', 'Holiday rituals'],
    dateIdeasCN: ['电影+咖啡', 'THIN-K 去一次 WOC! 的场子', '一起散步'],
    dateIdeasEN: ['Film plus coffee', 'THIN-K attends one WOC! event', 'Walk together'],
    relationshipTipsCN: ['双方都降半档', '给对方翻译情绪', '别用冷战'],
    relationshipTipsEN: ['Both dial down a notch', 'Translate feelings for each other', 'No cold war'],
    shareableRoastCN: 'THIN-K 配 WOC!：一个在大脑里开会,一个在楼道里呐喊。',
    shareableRoastEN: 'THIN-K x WOC!: one holds a meeting in their head, the other holds a rally in the hallway.',
  },
  {
    type1: 'THIN-K',
    type2: 'DEAD',
    scorePercent: 24,
    verdict: 'doomed',
    summaryCN:
      'THIN-K 想分析人生,DEAD 没有人生可分析。THIN-K 的问题清单抛向 DEAD 就像石头投进井,没有回声。',
    summaryEN:
      'THIN-K wants to analyze life, DEAD doesn\'t really have one to analyze. THIN-K tosses questions into DEAD like stones into a well — no echo.',
    fightsCN: ['沉默太久', '动力差距', '未来计划', '「你到底想要什么」', '情绪黑洞'],
    fightsEN: ['Silences too long', 'Energy gap', 'Future plans', '"What do you actually want"', 'Emotional void'],
    dateIdeasCN: ['几乎没有', '一起睡觉', '看一部长片'],
    dateIdeasEN: ['Barely any', 'Sleep together', 'Long film'],
    relationshipTipsCN: ['调整期待值', '必要时外援', '承认不合适'],
    relationshipTipsEN: ['Reset expectations', 'Seek outside help if needed', 'Admit incompatibility'],
    shareableRoastCN: 'THIN-K 配 DEAD：一个在写博士论文,一个在打论文评语:「嗯。」',
    shareableRoastEN: 'THIN-K x DEAD: one writes the dissertation, the other reviews it: "mm."',
  },

  // ========== SHIT ==========
  {
    type1: 'SHIT',
    type2: 'DEAD',
    scorePercent: 84,
    verdict: 'destiny',
    summaryCN:
      '两个摆烂老师凑一起就是摆烂双人舞。没有压力,没有期待,两个人一起躺平到地心。会越躺越默契,外人根本插不进去。',
    summaryEN:
      'Two rotting pros form the ultimate rot-duet. No pressure, no expectations, both sinking to the earth\'s core together. The lower you go, the tighter the bond — outsiders can\'t penetrate this level of mutual collapse.',
    fightsCN: ['谁点外卖', '谁关灯', '谁下楼取快递', '周末出不出门', '节日要不要过'],
    fightsEN: ['Who orders takeout', 'Who turns off the light', 'Who grabs the delivery', 'Leaving the house', 'Holidays at all'],
    dateIdeasCN: ['沙发合体', '一起点外卖', '一起追一部老番'],
    dateIdeasEN: ['Couch fusion', 'Shared takeout', 'Rewatch an old series'],
    relationshipTipsCN: ['至少一个人负责活着', '定期出门', '一起养一盆活不死的绿植'],
    relationshipTipsEN: ['At least one of you stays alive', 'Leave the house on a cadence', 'Adopt a hard-to-kill plant together'],
    shareableRoastCN: 'SHIT 配 DEAD：他们的恋爱照片都是天花板。',
    shareableRoastEN: 'SHIT x DEAD: every relationship photo is of the ceiling.',
  },
  {
    type1: 'SHIT',
    type2: 'ZZZZ',
    scorePercent: 77,
    verdict: 'great',
    summaryCN:
      '两个都是床的忠诚粉丝。SHIT 提供烂漫,ZZZZ 提供睡眠。相处很省能量,但需要一个人偶尔站起来。',
    summaryEN:
      'Both certified bed-loyalists. SHIT brings the rot, ZZZZ brings the sleep. Low-energy partnership, but someone has to occasionally stand up.',
    fightsCN: ['谁起床', '谁刷碗', '「我们要不要出门」', '共同朋友', '钱怎么花'],
    fightsEN: ['Who gets up', 'Who washes up', '"Should we leave the house"', 'Shared friends', 'Money'],
    dateIdeasCN: ['床上看剧', '一起午睡', '网上购物'],
    dateIdeasEN: ['Bed-binge a show', 'Nap together', 'Online shopping spree'],
    relationshipTipsCN: ['每周至少一次户外', '轮流负责基础生活', '保留一点仪式感'],
    relationshipTipsEN: ['At least one outdoor trip a week', 'Rotate basic life duties', 'Protect a shred of ritual'],
    shareableRoastCN: 'SHIT 配 ZZZZ：他们的爱情每天都在 48 小时续时。',
    shareableRoastEN: 'SHIT x ZZZZ: their love runs on a daily 48-hour extension.',
  },
  {
    type1: 'SHIT',
    type2: 'MONK',
    scorePercent: 58,
    verdict: 'fine',
    summaryCN:
      'MONK 的简朴和 SHIT 的烂漫像是同一种生活的两种解读——MONK 是「我不需要」,SHIT 是「我懒得要」。共存可以,但彼此看对方总是有点「怎么变这样」的感叹。',
    summaryEN:
      'MONK\'s minimalism and SHIT\'s rot are two reads of the same life — MONK "doesn\'t need," SHIT "can\'t be bothered." Coexistence works, but each sides eyes the other with a quiet "how did you end up like this."',
    fightsCN: ['卫生', '秩序', '生活哲学', '财务观', '社交频率'],
    fightsEN: ['Hygiene', 'Order', 'Life philosophy', 'Financial views', 'Social frequency'],
    dateIdeasCN: ['安静的寺庙', '家里的素食晚餐', '一起发呆'],
    dateIdeasEN: ['Quiet temple', 'Vegetarian dinner at home', 'Stare at the ceiling together'],
    relationshipTipsCN: ['尊重对方底线', '不劝对方成为自己', '维持基本卫生'],
    relationshipTipsEN: ['Respect each other\'s floors', 'Don\'t convert each other', 'Maintain baseline hygiene'],
    shareableRoastCN: 'SHIT 配 MONK：一个在修行,一个在修瘫。',
    shareableRoastEN: 'SHIT x MONK: one is in a spiritual retreat, the other is in a horizontal retreat.',
  },
  {
    type1: 'SHIT',
    type2: 'BOSS',
    scorePercent: 28,
    verdict: 'rocky',
    summaryCN:
      'BOSS 想要一切往前冲,SHIT 的人生哲学是「明天再说」。BOSS 的每一次推动都让 SHIT 想彻底躺死,SHIT 的躺平让 BOSS 血压升高。',
    summaryEN:
      'BOSS wants to charge, SHIT wants to "deal with it tomorrow." Every BOSS push makes SHIT want to go fully horizontal, every SHIT rot session raises BOSS\'s blood pressure.',
    fightsCN: ['起床', '家务', '未来', '花钱', '朋友圈'],
    fightsEN: ['Waking up', 'Chores', 'Future', 'Spending', 'Social circles'],
    dateIdeasCN: ['外卖+电影', 'BOSS 选场所 SHIT 去一次', '家里一起做一件小事'],
    dateIdeasEN: ['Takeout plus movie', 'BOSS picks, SHIT shows up once', 'Do one small thing at home together'],
    relationshipTipsCN: ['BOSS 别把 SHIT 当项目', 'SHIT 主动做一件小事', '接受节奏不同'],
    relationshipTipsEN: ['BOSS: stop project-managing SHIT', 'SHIT: do one small proactive thing', 'Accept the tempo gap'],
    shareableRoastCN: 'SHIT 配 BOSS：一个在冲刺,一个在被拖着。',
    shareableRoastEN: 'SHIT x BOSS: one is sprinting, the other is being dragged behind.',
  },
  {
    type1: 'SHIT',
    type2: 'CTRL',
    scorePercent: 17,
    verdict: 'doomed',
    summaryCN:
      'CTRL 的秩序狂和 SHIT 的烂漫是水火对立。CTRL 每看见 SHIT 的一眼都像看见 KPI 暴跌,SHIT 看见 CTRL 的一次日程就想装死。',
    summaryEN:
      'CTRL\'s order addiction vs SHIT\'s rot is literally oil and water. Every glance from CTRL lands on SHIT like a KPI crash; every CTRL schedule shown to SHIT triggers instant shutdown.',
    fightsCN: ['所有家务', '所有日程', '所有小事', '所有大事', '所有「你怎么能」'],
    fightsEN: ['Every chore', 'Every schedule', 'Every small thing', 'Every big thing', 'Every "how can you"'],
    dateIdeasCN: ['基本不存在', 'CTRL 清扫 SHIT 不许碰', '分房'],
    dateIdeasEN: ['Basically non-existent', 'CTRL cleans, SHIT doesn\'t touch anything', 'Separate rooms'],
    relationshipTipsCN: ['承认不合适', '分开各过', '必要时求助'],
    relationshipTipsEN: ['Admit incompatibility', 'Go separate ways', 'Seek help if needed'],
    shareableRoastCN: 'SHIT 配 CTRL：一个在修人生,一个在摆人生。',
    shareableRoastEN: 'SHIT x CTRL: one renovates life, the other IS life to be renovated.',
  },

  // ========== ZZZZ ==========
  {
    type1: 'ZZZZ',
    type2: 'DEAD',
    scorePercent: 83,
    verdict: 'destiny',
    summaryCN:
      '两个最懂「不想动」的人凑成组。ZZZZ 要睡,DEAD 要静,两个人像两块厚枕头,贴在一起谁也不烦谁。整个关系就像一段长午睡。',
    summaryEN:
      'The two world-champions of "not moving" form a tag team. ZZZZ wants sleep, DEAD wants stillness — together two thick pillows nobody disturbs. The entire relationship is one extended afternoon nap.',
    fightsCN: ['谁关窗', '外卖谁取', '要不要起来', '周末出门', '节日'],
    fightsEN: ['Who closes the window', 'Who grabs the delivery', 'Do we get up', 'Weekend outings', 'Holidays'],
    dateIdeasCN: ['床上看剧', '午睡', '点一次高级外卖'],
    dateIdeasEN: ['In-bed streaming', 'Nap together', 'Splurge on one fancy delivery'],
    relationshipTipsCN: ['定期晒太阳', '别让关系变植物', '每周出门一次'],
    relationshipTipsEN: ['Touch grass on a schedule', 'Don\'t let love go plant mode', 'One outing a week'],
    shareableRoastCN: 'ZZZZ 配 DEAD：他们的恋爱进度写在床头灯上。',
    shareableRoastEN: 'ZZZZ x DEAD: their relationship progress is measured in dimmer-switch clicks.',
  },
  {
    type1: 'ZZZZ',
    type2: 'MONK',
    scorePercent: 76,
    verdict: 'great',
    summaryCN:
      'ZZZZ 的睡眠需求与 MONK 的清净需求高度一致。两个人不是一起冲刺,而是一起过日子。没戏剧,没纠缠,偶尔会互相怀疑「这样算恋爱吗」。',
    summaryEN:
      'ZZZZ\'s sleep needs align perfectly with MONK\'s quiet needs. Not sprint partners — just daily-life partners. No drama, no entanglement. Occasionally you both wonder "is this even dating."',
    fightsCN: ['能量差异', '沟通太少', '决策缓慢', '表达方式', '共同朋友'],
    fightsEN: ['Energy gap', 'Too little talking', 'Slow decisions', 'Expression style', 'Shared friends'],
    dateIdeasCN: ['喝茶看云', '一起午休', '古镇慢游'],
    dateIdeasEN: ['Tea and clouds', 'Shared siesta', 'Slow old-town walk'],
    relationshipTipsCN: ['主动制造小温度', '不要误以为安静是无聊', '偶尔做一件新事'],
    relationshipTipsEN: ['Create small warmth on purpose', 'Quiet ≠ boring', 'Try one new thing occasionally'],
    shareableRoastCN: 'ZZZZ 配 MONK：他们的恋爱像在修一场长眠。',
    shareableRoastEN: 'ZZZZ x MONK: their love is a long-form meditation on sleeping.',
  },
  {
    type1: 'ZZZZ',
    type2: 'OJBK',
    scorePercent: 60,
    verdict: 'fine',
    summaryCN:
      'ZZZZ 要睡,OJBK 要顺其自然。两个人相处舒服到像没人在谈恋爱,但正因为这样感情容易平淡。',
    summaryEN:
      'ZZZZ wants sleep, OJBK wants "whatever." So chill it barely registers as dating. Downside: too flat to feel like love.',
    fightsCN: ['节日没人安排', '谁做饭', '「我们还在一起吗」', '共同计划', '朋友聚会'],
    fightsEN: ['Nobody plans holidays', 'Who cooks', '"Are we still dating"', 'Joint plans', 'Friend gatherings'],
    dateIdeasCN: ['家门口咖啡', '一起看一部老片', '周末小市集'],
    dateIdeasEN: ['Neighborhood cafe', 'Old film together', 'Weekend mini-market'],
    relationshipTipsCN: ['设立每月仪式', '主动小惊喜', '保持表达'],
    relationshipTipsEN: ['Monthly ritual', 'Small surprise moves', 'Keep expressing'],
    shareableRoastCN: 'ZZZZ 配 OJBK：他们的爱情跟天气预报一样,风平浪静,容易忘。',
    shareableRoastEN: 'ZZZZ x OJBK: their love is weather-channel calm — and just as forgettable.',
  },
  {
    type1: 'ZZZZ',
    type2: 'GOGO',
    scorePercent: 33,
    verdict: 'rocky',
    summaryCN:
      'GOGO 的节奏是每天 200 码,ZZZZ 的节奏是每天 0 码。GOGO 想带 ZZZZ 一起冲,ZZZZ 只想让 GOGO 安静下来。',
    summaryEN:
      'GOGO\'s pace is 200 miles a day, ZZZZ\'s is zero. GOGO tries to drag ZZZZ forward, ZZZZ just wants GOGO to sit the hell down.',
    fightsCN: ['起床时间', '周末安排', '「你有没有上进心」', '共同朋友', '运动'],
    fightsEN: ['Wake-up time', 'Weekend plans', '"Do you have ambition"', 'Shared friends', 'Exercise'],
    dateIdeasCN: ['郊外野餐', '短途温泉', '看电影不许 GOGO 讲话'],
    dateIdeasEN: ['Suburban picnic', 'Hot spring short trip', 'Movie night, GOGO not allowed to talk'],
    relationshipTipsCN: ['双方都得让步', '节奏表公开沟通', '不要把对方当改造对象'],
    relationshipTipsEN: ['Both sides compromise', 'Openly sync calendars', 'Neither partner is a project'],
    shareableRoastCN: 'ZZZZ 配 GOGO：一个在冲山顶,一个在床上翻身。',
    shareableRoastEN: 'ZZZZ x GOGO: one sprints to the summit, the other rolls over in bed.',
  },
  {
    type1: 'ZZZZ',
    type2: 'BOSS',
    scorePercent: 20,
    verdict: 'doomed',
    summaryCN:
      'BOSS 的人生是一张战术板,ZZZZ 的人生是一张床垫。BOSS 的热血对 ZZZZ 来说像噪音,ZZZZ 的躺平对 BOSS 来说像折寿。',
    summaryEN:
      'BOSS\'s life is a tactical board, ZZZZ\'s life is a mattress. BOSS\'s drive sounds like noise to ZZZZ, ZZZZ\'s rot looks like a life-shortening event to BOSS.',
    fightsCN: ['目标', '起床', '态度', '未来', '一切'],
    fightsEN: ['Goals', 'Getting up', 'Attitude', 'Future', 'Everything'],
    dateIdeasCN: ['不推荐', 'BOSS 给 ZZZZ 按摩', '在家一起吃外卖'],
    dateIdeasEN: ['Not recommended', 'BOSS massages ZZZZ', 'Takeout at home together'],
    relationshipTipsCN: ['各自活', '不合适别硬撑', '偶尔见面就够'],
    relationshipTipsEN: ['Live parallel lives', 'Don\'t force it', 'Occasional meetups are enough'],
    shareableRoastCN: 'ZZZZ 配 BOSS：一个人在冲业绩,一个在冲梦乡。',
    shareableRoastEN: 'ZZZZ x BOSS: one chases quarterly targets, the other chases REM cycles.',
  },

  // ========== POOR ==========
  {
    type1: 'POOR',
    type2: 'THAN-K',
    scorePercent: 82,
    verdict: 'destiny',
    summaryCN:
      'POOR 的自卑和 THAN-K 的感恩组合在一起,是一种温柔的疗愈组。THAN-K 看到 POOR 的每一个小进步都真心觉得「已经很好」,POOR 第一次觉得自己被看见。',
    summaryEN:
      'POOR\'s self-doubt meets THAN-K\'s gratitude — a gentle healing pair. THAN-K genuinely means "you\'re already good" whenever POOR makes a small move. POOR, for the first time, feels seen.',
    fightsCN: ['POOR 的自卑反复', '「你不用总是谢我」', '经济压力', '家庭观', '「你值得更好的人」'],
    fightsEN: ['POOR\'s recurring self-doubt', '"You don\'t have to keep thanking me"', 'Money pressure', 'Family values', '"You deserve someone better"'],
    dateIdeasCN: ['一起做一顿饭', '写感恩卡', '低成本郊游'],
    dateIdeasEN: ['Cook a meal together', 'Gratitude cards', 'Low-cost day trip'],
    relationshipTipsCN: ['POOR 学会接受爱', 'THAN-K 提供稳定源', '不比较外界'],
    relationshipTipsEN: ['POOR: accept love', 'THAN-K: provide stable ground', 'No comparing to outside'],
    shareableRoastCN: 'POOR 配 THAN-K：他们的爱情是一场长期的「谢谢你还在」。',
    shareableRoastEN: 'POOR x THAN-K: their love is a long-running "thanks for still being here."',
  },
  {
    type1: 'POOR',
    type2: 'MUM',
    scorePercent: 75,
    verdict: 'great',
    summaryCN:
      'MUM 的照顾刚好能接住 POOR 的脆弱。POOR 的每一次「我不行」都有 MUM 的「可以的」。可能会养成依赖,但至少生活不那么冰冷。',
    summaryEN:
      'MUM\'s caring catches every one of POOR\'s "I can\'t." POOR\'s every "I\'m not enough" gets met with MUM\'s "you can." Some co-dependence risk, but at least life stops being cold.',
    fightsCN: ['「你能不能振作」', 'MUM 的疲惫', 'POOR 的反复情绪', '钱的问题', '家人介入'],
    fightsEN: ['"Can you pull yourself together"', 'MUM\'s burnout', 'POOR\'s recurring mood dips', 'Money issues', 'Family interference'],
    dateIdeasCN: ['家里做饭+看剧', '散步+聊天', '一起整理家'],
    dateIdeasEN: ['Home cooking plus a show', 'Walk and talk', 'Organize the apartment together'],
    relationshipTipsCN: ['MUM 也要充电', 'POOR 学会独立一点', '外部支持很重要'],
    relationshipTipsEN: ['MUM: charge yourself too', 'POOR: a touch of independence', 'Outside support matters'],
    shareableRoastCN: 'POOR 配 MUM：一个在哭,一个在煮汤,汤永远热着。',
    shareableRoastEN: 'POOR x MUM: one cries, the other simmers soup — the soup is always warm.',
  },
  {
    type1: 'POOR',
    type2: 'SOLO',
    scorePercent: 55,
    verdict: 'fine',
    summaryCN:
      'SOLO 的独立给 POOR 空间,但也容易让 POOR 产生「你不在乎」的误解。相处不累但也不热,需要 SOLO 主动说明「我是真的在」。',
    summaryEN:
      'SOLO\'s independence gives POOR space — and also plants seeds of "you don\'t care." Low friction but low heat. SOLO has to actively say "I\'m here for real."',
    fightsCN: ['沟通少', '安全感问题', '表达频率', '节日无人安排', '「你累了吗」'],
    fightsEN: ['Too little communication', 'Security issues', 'Expression frequency', 'No one plans holidays', '"Are you tired of me"'],
    dateIdeasCN: ['各自做事+一起吃饭', '去一个免费公园', '旧书店'],
    dateIdeasEN: ['Parallel work plus shared meal', 'Free park visit', 'Used bookstore'],
    relationshipTipsCN: ['SOLO 发「想你」', 'POOR 学会信任', '建立可预测节奏'],
    relationshipTipsEN: ['SOLO: send "miss you" proactively', 'POOR: practice trust', 'Build a predictable rhythm'],
    shareableRoastCN: 'POOR 配 SOLO：一个想靠近,一个想消失,两边都很礼貌。',
    shareableRoastEN: 'POOR x SOLO: one wants to lean in, the other wants to vanish, both stay politely.',
  },
  {
    type1: 'POOR',
    type2: 'GOGO',
    scorePercent: 30,
    verdict: 'rocky',
    summaryCN:
      'GOGO 想带 POOR 一起冲,POOR 被 GOGO 的速度吓到原地不动。POOR 会越来越自责,GOGO 会越来越不理解。',
    summaryEN:
      'GOGO wants POOR to sprint together, POOR freezes at GOGO\'s pace. POOR spirals into guilt, GOGO loses comprehension.',
    fightsCN: ['速度', '目标', '钱', '未来', '「你怎么了」'],
    fightsEN: ['Pace', 'Goals', 'Money', 'Future', '"What\'s wrong with you"'],
    dateIdeasCN: ['慢一点的活动', '免费展', '家里做饭'],
    dateIdeasEN: ['Slower activities', 'Free exhibitions', 'Home cooking'],
    relationshipTipsCN: ['GOGO 放慢', 'POOR 不自责', '定期复盘'],
    relationshipTipsEN: ['GOGO: slow down', 'POOR: stop self-blaming', 'Regular check-ins'],
    shareableRoastCN: 'POOR 配 GOGO：一个想跑,一个想先坐一会儿。',
    shareableRoastEN: 'POOR x GOGO: one wants to run, the other wants to sit down for a minute first.',
  },
  {
    type1: 'POOR',
    type2: 'ATM-er',
    scorePercent: 22,
    verdict: 'doomed',
    summaryCN:
      'ATM-er 的数字游戏对 POOR 来说是一种每天的压力,POOR 的退缩对 ATM-er 来说是一种消耗。两个人的价值坐标系差太远。',
    summaryEN:
      'ATM-er\'s number game is daily pressure for POOR, POOR\'s retreat is daily drain for ATM-er. Your value axes are too far apart.',
    fightsCN: ['钱', '钱', '钱', '未来', '自尊'],
    fightsEN: ['Money', 'Money', 'Money', 'Future', 'Self-esteem'],
    dateIdeasCN: ['基本无', '一起做家务', '散步'],
    dateIdeasEN: ['Almost none', 'Do chores together', 'Walk'],
    relationshipTipsCN: ['可能真的不行', '各自成长', '保持基本尊重'],
    relationshipTipsEN: ['Might just not work', 'Grow independently', 'Maintain baseline respect'],
    shareableRoastCN: 'POOR 配 ATM-er：一个在清账,一个在躲账。',
    shareableRoastEN: 'POOR x ATM-er: one settles the ledger, the other hides from it.',
  },

  // ========== MONK ==========
  {
    type1: 'MONK',
    type2: 'OJBK',
    scorePercent: 89,
    verdict: 'destiny',
    summaryCN:
      '这对是全世界最安静的情侣。MONK 的清净和 OJBK 的随和刚好对齐,相处像两棵树共享同一片阴凉。没戏剧,但特别踏实。',
    summaryEN:
      'The quietest couple on earth. MONK\'s calm and OJBK\'s chill lock into place — two trees sharing the same patch of shade. Zero drama, full stability.',
    fightsCN: ['「你能不能主动一次」', '节日仪式感', '社交频率', '朋友介入', '表达方式'],
    fightsEN: ['"Can you initiate once"', 'Holiday rituals', 'Social frequency', 'Friend involvement', 'Expression style'],
    dateIdeasCN: ['山顶看日落', '寺庙', '茶馆一下午'],
    dateIdeasEN: ['Mountain sunset', 'Temple visit', 'All-afternoon teahouse'],
    relationshipTipsCN: ['别让安静变成空洞', '定期做一件新事', '主动夸一次'],
    relationshipTipsEN: ['Don\'t let quiet become empty', 'Try a new thing on schedule', 'Drop a compliment on purpose'],
    shareableRoastCN: 'MONK 配 OJBK：他们的恋爱像在泡一杯特别淡的茶,久了才香。',
    shareableRoastEN: 'MONK x OJBK: their love is a lightly brewed tea — only gets fragrant with time.',
  },
  {
    type1: 'MONK',
    type2: 'THIN-K',
    scorePercent: 79,
    verdict: 'great',
    summaryCN:
      'MONK 的静加 THIN-K 的深度,是典型的「长夜促膝谈」型组合。两个人能为一个话题聊到凌晨三点,彼此都不觉得累。',
    summaryEN:
      'MONK\'s stillness plus THIN-K\'s depth is the "deep-talk-at-3am" combo. You can stay on a single topic until dawn and nobody gets tired.',
    fightsCN: ['行动力', '「我们什么时候做」', '外出频率', '情绪表达', '共同朋友'],
    fightsEN: ['Action gap', '"When do we actually do it"', 'Outing frequency', 'Emotional expression', 'Shared friends'],
    dateIdeasCN: ['书店+酒馆', '夜间散步', '共同写一个小项目'],
    dateIdeasEN: ['Bookstore plus bar', 'Nightwalk', 'Co-build a tiny project'],
    relationshipTipsCN: ['思考不能取代行动', '每周一次真正「做」', '表达感情'],
    relationshipTipsEN: ['Thinking is not a substitute for action', 'One "actually do it" moment per week', 'Express feelings'],
    shareableRoastCN: 'MONK 配 THIN-K：他们的约会 20% 是动,80% 是坐着想。',
    shareableRoastEN: 'MONK x THIN-K: 20% of their dates are movement, 80% is sitting and thinking.',
  },
  {
    type1: 'MONK',
    type2: 'SOLO',
    scorePercent: 63,
    verdict: 'fine',
    summaryCN:
      '两个都独立的人相处几乎没有摩擦,但也没有火花。像两只猫住同一个房子,默默陪伴,偶尔贴贴。',
    summaryEN:
      'Two independent people with near-zero friction — and near-zero sparks. Like two cats sharing a house, quiet companionship with occasional contact.',
    fightsCN: ['沟通少', '节日懒', '情感表达', '家务', '共同朋友'],
    fightsEN: ['Minimal communication', 'Lazy holidays', 'Emotional expression', 'Chores', 'Shared friends'],
    dateIdeasCN: ['一人一本书', '一起散步', '茶馆'],
    dateIdeasEN: ['One book each', 'Shared walk', 'Teahouse'],
    relationshipTipsCN: ['主动表达', '建立仪式', '不把对方当 roommate'],
    relationshipTipsEN: ['Express proactively', 'Build rituals', 'Stop treating your partner as a roommate'],
    shareableRoastCN: 'MONK 配 SOLO：他们的恋爱像两朵并排的云,互不打扰。',
    shareableRoastEN: 'MONK x SOLO: their love is two clouds drifting side by side, never interfering.',
  },
  {
    type1: 'MONK',
    type2: 'SEXY',
    scorePercent: 32,
    verdict: 'rocky',
    summaryCN:
      'SEXY 需要舞台,MONK 需要静音。两个人如果能相处,是因为 MONK 被 SEXY 吸引的神秘感,SEXY 被 MONK 的淡定吸引。但日常相处很快会反噬。',
    summaryEN:
      'SEXY needs a stage, MONK needs mute. They sometimes end up together because MONK is drawn to SEXY\'s mystery, SEXY is drawn to MONK\'s calm. Daily life eats it fast.',
    fightsCN: ['社交', '出门频率', '朋友圈', '花钱', '节日'],
    fightsEN: ['Social events', 'Outing frequency', 'Social circle', 'Spending', 'Holidays'],
    dateIdeasCN: ['小众展', '山里一日游', '在家安静晚餐'],
    dateIdeasEN: ['Niche exhibition', 'Mountain day trip', 'Quiet dinner at home'],
    relationshipTipsCN: ['双方都让一半', '承认差异', '少比较生活方式'],
    relationshipTipsEN: ['Both meet halfway', 'Name the gap', 'Stop comparing lifestyles'],
    shareableRoastCN: 'MONK 配 SEXY：一个在山上禅修,一个在山下开派对。',
    shareableRoastEN: 'MONK x SEXY: one is in a mountain retreat, the other is hosting a rave at the base.',
  },
  {
    type1: 'MONK',
    type2: 'WOC!',
    scorePercent: 18,
    verdict: 'doomed',
    summaryCN:
      'MONK 的安静+WOC! 的尖叫=每天都像个错误的约会。MONK 会想搬家,WOC! 会觉得 MONK 在假死。',
    summaryEN:
      'MONK\'s silence plus WOC!\'s yelling equals a daily wrong-date. MONK starts eyeing the exits, WOC! thinks MONK is faking death.',
    fightsCN: ['音量', '情绪爆发', '社交', '节日', '一切'],
    fightsEN: ['Volume', 'Emotional eruptions', 'Socials', 'Holidays', 'Everything'],
    dateIdeasCN: ['分开出门', '不推荐', '家里安静一小时就是赢'],
    dateIdeasEN: ['Separate outings', 'Not recommended', 'One quiet hour at home is a win'],
    relationshipTipsCN: ['别硬凑', '保留尊重', '承认不同频率'],
    relationshipTipsEN: ['Don\'t force it', 'Keep respect', 'Name the frequency gap'],
    shareableRoastCN: 'MONK 配 WOC!：一个在打坐,一个在旁边 cosplay 地震。',
    shareableRoastEN: 'MONK x WOC!: one is meditating, the other is cosplaying an earthquake next door.',
  },

  // ========== IMSB ==========
  {
    type1: 'IMSB',
    type2: 'OH-NO',
    scorePercent: 82,
    verdict: 'destiny',
    summaryCN:
      '两个都容易怀疑自己的人凑一起,刚好形成一个互相安慰的泡泡。IMSB 的沉默被 OH-NO 的温柔看懂,OH-NO 的焦虑被 IMSB 的稳定接住。',
    summaryEN:
      'Two self-doubters form a tiny comfort bubble. IMSB\'s silence is understood by OH-NO\'s gentleness, and OH-NO\'s anxiety is absorbed by IMSB\'s quiet steadiness.',
    fightsCN: ['「我不好」vs「不,我更不好」', '谁先开口', '社交退缩', '节日无感', '情绪互传'],
    fightsEN: ['"I\'m worse" vs "no, I\'m worse"', 'Who opens up first', 'Social retreat', 'Holiday flatness', 'Anxiety ping-pong'],
    dateIdeasCN: ['独立书店', '安静散步', '在家看一部温柔的电影'],
    dateIdeasEN: ['Indie bookstore', 'Quiet walk', 'A gentle movie at home'],
    relationshipTipsCN: ['不互相比谁更惨', '建一个外部稳定源', '一起发展一个小爱好'],
    relationshipTipsEN: ['Stop competing for worst', 'Get one outside stabilizer', 'Develop a hobby together'],
    shareableRoastCN: 'IMSB 配 OH-NO：他们的恋爱像两只受惊的兔子互相舔毛。',
    shareableRoastEN: 'IMSB x OH-NO: their love is two startled rabbits grooming each other quietly.',
  },
  {
    type1: 'IMSB',
    type2: 'THAN-K',
    scorePercent: 75,
    verdict: 'great',
    summaryCN:
      'IMSB 常怀疑「我配吗」,THAN-K 永远说「你做的都很够」。THAN-K 的感恩像给 IMSB 每天发的一颗糖,IMSB 也因此慢慢敢表达。',
    summaryEN:
      'IMSB constantly wonders "am I enough," THAN-K always answers "you\'ve already done enough." THAN-K\'s gratitude is a daily candy for IMSB; over time IMSB learns to express.',
    fightsCN: ['「你不用谢我」', 'IMSB 反复自贬', '朋友介入', '节日小仪式', '家人关系'],
    fightsEN: ['"You don\'t need to thank me"', 'IMSB\'s recurring self-doubt', 'Friend involvement', 'Holiday rituals', 'Family relations'],
    dateIdeasCN: ['一起写感恩日记', '散步长聊', '慢咖啡馆'],
    dateIdeasEN: ['Shared gratitude journal', 'Long walking talks', 'Slow cafe'],
    relationshipTipsCN: ['别让爱变成证明', '建立稳定节奏', '定期互相夸'],
    relationshipTipsEN: ['Don\'t turn love into proof', 'Build a steady rhythm', 'Schedule mutual compliments'],
    shareableRoastCN: 'IMSB 配 THAN-K：他们相处像两个人互相鞠躬,鞠到天亮。',
    shareableRoastEN: 'IMSB x THAN-K: their interactions are two people bowing to each other until sunrise.',
  },
  {
    type1: 'IMSB',
    type2: 'CTRL',
    scorePercent: 61,
    verdict: 'fine',
    summaryCN:
      'CTRL 的秩序给 IMSB 提供了「外部大脑」,IMSB 的安静让 CTRL 有空间规划一切。相处舒服但容易变成上下级关系。',
    summaryEN:
      'CTRL\'s order gives IMSB an external brain; IMSB\'s quietness gives CTRL space to plan. Comfortable, but easily slides into boss/report dynamics.',
    fightsCN: ['「你能不能自己决定」', 'CTRL 的微管理', 'IMSB 的被动', '家务分配', '情感反馈'],
    fightsEN: ['"Can you just decide something"', 'CTRL\'s micromanaging', 'IMSB\'s passivity', 'Chore split', 'Emotional feedback'],
    dateIdeasCN: ['CTRL 规划的小惊喜', '一起整理家', '安静的晚餐'],
    dateIdeasEN: ['Small surprise planned by CTRL', 'Tidy the home together', 'Quiet dinner'],
    relationshipTipsCN: ['IMSB 自己下一些小决定', 'CTRL 不要当家长', '角色是伴侣不是员工'],
    relationshipTipsEN: ['IMSB: make some small calls yourself', 'CTRL: stop playing parent', 'Partners, not employees'],
    shareableRoastCN: 'IMSB 配 CTRL：一个在问「我可以吗」,一个在安排「几点」。',
    shareableRoastEN: 'IMSB x CTRL: one asks "am I allowed," the other answers "what time."',
  },
  {
    type1: 'IMSB',
    type2: 'BOSS',
    scorePercent: 40,
    verdict: 'rocky',
    summaryCN:
      'BOSS 一句话能把 IMSB 的自信拆到地底。IMSB 越沉默 BOSS 越想推,BOSS 越推 IMSB 越退,两人陷入死循环。',
    summaryEN:
      'One BOSS sentence can nuke IMSB\'s confidence to the basement. IMSB goes quieter, BOSS pushes harder, both spiral into a loop.',
    fightsCN: ['「你能不能说点什么」', 'BOSS 的压迫感', 'IMSB 的自贬', '决定速度', '社交压力'],
    fightsEN: ['"Can you say something"', 'BOSS\'s pressure', 'IMSB\'s self-deprecation', 'Decision speed', 'Social pressure'],
    dateIdeasCN: ['低压力的活动', 'BOSS 让 IMSB 主导一次', '安静的咖啡馆'],
    dateIdeasEN: ['Low-pressure activity', 'Let IMSB lead once', 'Quiet cafe'],
    relationshipTipsCN: ['BOSS 先听再说', 'IMSB 不要把 BOSS 当标准', '关系需要平等'],
    relationshipTipsEN: ['BOSS: listen before talking', 'IMSB: BOSS is not the benchmark', 'Equal ground'],
    shareableRoastCN: 'IMSB 配 BOSS：一个永远在被点名回答,一个永远在点名。',
    shareableRoastEN: 'IMSB x BOSS: one is always being called on, the other is always calling on.',
  },
  {
    type1: 'IMSB',
    type2: 'WOC!',
    scorePercent: 23,
    verdict: 'doomed',
    summaryCN:
      'WOC! 的能量直接让 IMSB 想失踪。两个人的频率天差地别,相处每天都像自我治疗失败。',
    summaryEN:
      'WOC!\'s energy makes IMSB want to vanish. Completely opposing frequencies — daily life feels like failed self-therapy.',
    fightsCN: ['音量', '社交', '表达方式', '节日', '一切'],
    fightsEN: ['Volume', 'Social', 'Expression', 'Holidays', 'Everything'],
    dateIdeasCN: ['基本不要约', '各自的朋友一起', '看电影'],
    dateIdeasEN: ['Basically don\'t', 'Each bring separate friends', 'Movie'],
    relationshipTipsCN: ['别硬凑', '承认不合', '各自继续'],
    relationshipTipsEN: ['Don\'t force it', 'Name the mismatch', 'Walk separate paths'],
    shareableRoastCN: 'IMSB 配 WOC!：一个想躲,一个想让全场都知道她在这。',
    shareableRoastEN: 'IMSB x WOC!: one wants to hide, the other wants the whole venue to know they\'re here.',
  },

  // ========== SOLO ==========
  {
    type1: 'SOLO',
    type2: 'MONK',
    scorePercent: 85,
    verdict: 'destiny',
    summaryCN:
      '两个独立灵魂互相尊重对方的空间。SOLO 的冷感被 MONK 的平和理解,MONK 的安静被 SOLO 当成珍贵资源。他们在一起像「最好的室友但也会贴贴」。',
    summaryEN:
      'Two independent souls respecting each other\'s space. SOLO\'s detachment is understood by MONK\'s calm, MONK\'s silence is treasured by SOLO. Together they\'re "best roommates with occasional cuddles."',
    fightsCN: ['「你需要我吗」', '亲密表达', '社交', '节日', '家人关系'],
    fightsEN: ['"Do you need me"', 'Intimacy expression', 'Social', 'Holidays', 'Family'],
    dateIdeasCN: ['徒步', '一起看书', '温泉'],
    dateIdeasEN: ['Hiking', 'Read together', 'Hot springs'],
    relationshipTipsCN: ['主动表达在意', '有自己的事', '不把冷当默认'],
    relationshipTipsEN: ['Express care proactively', 'Each keeps their own things', 'Don\'t default to cool'],
    shareableRoastCN: 'SOLO 配 MONK：他们的恋爱像一人一本书的图书馆约会。',
    shareableRoastEN: 'SOLO x MONK: their love is a library date with one book each.',
  },
  {
    type1: 'SOLO',
    type2: 'CTRL',
    scorePercent: 73,
    verdict: 'great',
    summaryCN:
      'CTRL 的计划给 SOLO 的世界增加了稳定性,SOLO 的独立让 CTRL 不用把关系当项目管。只要 CTRL 不追问情感细节,相处就很舒服。',
    summaryEN:
      'CTRL\'s planning adds stability to SOLO\'s world; SOLO\'s independence lets CTRL stop managing the relationship like a project. As long as CTRL doesn\'t interrogate feelings, it works great.',
    fightsCN: ['情绪表达', '朋友介入', '「你爱不爱我」', '共同时间', '计划 vs 自由'],
    fightsEN: ['Emotional expression', 'Friend involvement', '"Do you love me"', 'Shared time', 'Plans vs freedom'],
    dateIdeasCN: ['一个 CTRL 规划的周末', '独立书店+咖啡', '短途旅行'],
    dateIdeasEN: ['A weekend planned by CTRL', 'Indie bookstore plus coffee', 'Short trip'],
    relationshipTipsCN: ['CTRL 不要逼情感表达', 'SOLO 主动回应', '留各自的空间'],
    relationshipTipsEN: ['CTRL: don\'t force feelings', 'SOLO: reply proactively', 'Keep personal space'],
    shareableRoastCN: 'SOLO 配 CTRL：一个在 Notion 上爱,一个在朋友圈独立。',
    shareableRoastEN: 'SOLO x CTRL: one loves through Notion, the other is independent on Instagram.',
  },
  {
    type1: 'SOLO',
    type2: 'THIN-K',
    scorePercent: 66,
    verdict: 'fine',
    summaryCN:
      '两个人能一起沉默,一起思考,一起在咖啡馆各做各的事。互相不打扰是默认态,但也会偶尔 miss 到共鸣时刻。',
    summaryEN:
      'They can sit in silence together, think in parallel, do their own thing at the same cafe. Non-interference is the default — and sometimes the shared-vibe moments get missed.',
    fightsCN: ['谁先开口', '共同计划', '节日', '朋友圈', '「我们要不要聊聊」'],
    fightsEN: ['Who speaks first', 'Joint plans', 'Holidays', 'Social circles', '"Do we need to talk"'],
    dateIdeasCN: ['图书馆一起读一本书', '独立书店', '一起看艺术电影'],
    dateIdeasEN: ['Library, shared book', 'Indie bookstore', 'Arthouse film'],
    relationshipTipsCN: ['主动发起对话', '表达感情', '不让沉默变习惯'],
    relationshipTipsEN: ['Initiate conversation', 'Express love', 'Don\'t let silence become habit'],
    shareableRoastCN: 'SOLO 配 THIN-K：他们相处的 90% 是「嗯」。',
    shareableRoastEN: 'SOLO x THIN-K: 90% of their interaction is "mm."',
  },
  {
    type1: 'SOLO',
    type2: 'LOVE-R',
    scorePercent: 35,
    verdict: 'rocky',
    summaryCN:
      'LOVE-R 的浓情会让 SOLO 窒息,SOLO 的冷静会让 LOVE-R 心碎。两边都是真诚的,但频率错位。',
    summaryEN:
      'LOVE-R\'s thick love suffocates SOLO, SOLO\'s calmness breaks LOVE-R\'s heart. Both sincere, wavelengths mismatched.',
    fightsCN: ['回消息', '情感浓度', '节日', '家人介入', '共同朋友'],
    fightsEN: ['Reply speed', 'Emotional intensity', 'Holidays', 'Family involvement', 'Shared friends'],
    dateIdeasCN: ['低压力散步', '各做各的事一起呆', '共享一个 playlist'],
    dateIdeasEN: ['Low-pressure walk', 'Parallel play at home', 'Shared playlist'],
    relationshipTipsCN: ['SOLO 每天主动一次', 'LOVE-R 留空间', '表达频率的翻译'],
    relationshipTipsEN: ['SOLO: initiate once a day', 'LOVE-R: give space', 'Translate expression frequency'],
    shareableRoastCN: 'SOLO 配 LOVE-R：一个想独自呆着,一个想整天贴贴。',
    shareableRoastEN: 'SOLO x LOVE-R: one wants to be alone, the other wants to glue themselves on.',
  },
  {
    type1: 'SOLO',
    type2: 'WOC!',
    scorePercent: 19,
    verdict: 'doomed',
    summaryCN:
      'WOC! 的爆炸力全都打在 SOLO 的耳膜上。SOLO 的冷让 WOC! 觉得被无视,WOC! 的热让 SOLO 想躲进荒漠。',
    summaryEN:
      'WOC!\'s explosive force hits SOLO\'s eardrums. SOLO\'s chill makes WOC! feel ignored, WOC!\'s heat makes SOLO want to escape to a desert.',
    fightsCN: ['音量', '频率', '情绪表达', '社交场合', '节日'],
    fightsEN: ['Volume', 'Frequency', 'Emotional expression', 'Social scenes', 'Holidays'],
    dateIdeasCN: ['分开出门', '在家不说话', '各自的朋友'],
    dateIdeasEN: ['Separate outings', 'Silent home time', 'Separate friends'],
    relationshipTipsCN: ['承认不合', '各自精彩', '保持尊重'],
    relationshipTipsEN: ['Admit mismatch', 'Shine separately', 'Keep respect'],
    shareableRoastCN: 'SOLO 配 WOC!：一个在孤岛,一个在广场广播。',
    shareableRoastEN: 'SOLO x WOC!: one is on a lonely island, the other is on the town square loudspeaker.',
  },

  // ========== FUCK ==========
  {
    type1: 'FUCK',
    type2: 'MALO',
    scorePercent: 81,
    verdict: 'destiny',
    summaryCN:
      '两个都不怕脏话的灵魂凑在一起,就是最默契的街头组合。FUCK 的直接加 MALO 的毒舌,能把任何假笑瞬间击穿。对外是毒人组合,对内反而超级真诚。',
    summaryEN:
      'Two souls who never flinch at profanity form the ultimate street duo. FUCK\'s directness plus MALO\'s venom can pierce any fake smile. Public poison, private honesty.',
    fightsCN: ['谁说话更狠', '外人觉得他俩在吵', '共同朋友的站队', '决定速度', '家人接触'],
    fightsEN: ['Who\'s harsher', 'Strangers mistake it for fighting', 'Friend loyalty splits', 'Decision speed', 'Family contact'],
    dateIdeasCN: ['半夜烧烤', '一起骂老板', '地下 live'],
    dateIdeasEN: ['Midnight BBQ', 'Roast the boss together', 'Underground live show'],
    relationshipTipsCN: ['对内留软话', '别把骂当爱的证明', '互相保护心底'],
    relationshipTipsEN: ['Save the soft words for each other', 'Swearing is not proof of love', 'Guard each other\'s deep spots'],
    shareableRoastCN: 'FUCK 配 MALO：他们的恋爱广告词只有一个字:爷。',
    shareableRoastEN: 'FUCK x MALO: their love slogan is one word: "bruh."',
  },
  {
    type1: 'FUCK',
    type2: 'DRUNK',
    scorePercent: 74,
    verdict: 'great',
    summaryCN:
      'FUCK 的反骨加 DRUNK 的放飞,是夜生活组合拳。两个人一杯下肚就开始爆粗口式真心话,酒醒之后发现说的其实都对。',
    summaryEN:
      'FUCK\'s rebellion plus DRUNK\'s looseness is a nightlife knockout combo. One drink in, the profanity-laced truths start flowing. Sober you realize they were all correct.',
    fightsCN: ['喝多了吵架', '谁买单', '酒后决定', '工作日能不能喝', '家人看法'],
    fightsEN: ['Drunk arguments', 'Who pays', 'Drunk decisions', 'Weekday drinking', 'What the family thinks'],
    dateIdeasCN: ['新开的 dive bar', '一起去看 live house', '深夜路边摊'],
    dateIdeasEN: ['New dive bar', 'Live house gig', 'Midnight street stall'],
    relationshipTipsCN: ['酒外也要真心', '设定底线', '照顾身体'],
    relationshipTipsEN: ['Be real sober too', 'Set red lines', 'Take care of your body'],
    shareableRoastCN: 'FUCK 配 DRUNK：他们的恋爱发生在凌晨三点,醒来还算数。',
    shareableRoastEN: 'FUCK x DRUNK: their love happens at 3am and still counts the next morning.',
  },
  {
    type1: 'FUCK',
    type2: 'BOSS',
    scorePercent: 60,
    verdict: 'fine',
    summaryCN:
      'BOSS 不怕 FUCK 的凶,FUCK 也不怕 BOSS 的压迫。两个都是硬茬,相处像两只狮子共享地盘——互相瞪视,但谁也不退。',
    summaryEN:
      'BOSS isn\'t scared of FUCK\'s edge, FUCK isn\'t scared of BOSS\'s pressure. Two hardheads sharing turf — mutual staring, no retreat.',
    fightsCN: ['谁说了算', '职业冲突', '朋友圈分歧', '花钱决定', '面子'],
    fightsEN: ['Who decides', 'Career conflict', 'Friend circle disputes', 'Spending decisions', 'Face-saving'],
    dateIdeasCN: ['高强度运动', '短途旅行', '辣火锅'],
    dateIdeasEN: ['High-intensity workout', 'Short trip', 'Spicy hotpot'],
    relationshipTipsCN: ['别把感情当竞赛', '轮流让步', '私下留温柔'],
    relationshipTipsEN: ['Love isn\'t a tournament', 'Take turns giving in', 'Soft moments in private'],
    shareableRoastCN: 'FUCK 配 BOSS：他们每天都在家里开两个公司对打。',
    shareableRoastEN: 'FUCK x BOSS: they run two companies at home and fight each other for market share.',
  },
  {
    type1: 'FUCK',
    type2: 'THAN-K',
    scorePercent: 31,
    verdict: 'rocky',
    summaryCN:
      'THAN-K 的温柔遇上 FUCK 的尖锐,常常是一场单方面的内伤。FUCK 没恶意,但出口就带刀,THAN-K 受伤也不敢说。',
    summaryEN:
      'THAN-K\'s softness meets FUCK\'s sharp edge, often a one-sided internal wound. FUCK means no harm but their mouth comes with a knife — and THAN-K won\'t say when it cuts.',
    fightsCN: ['「你这样说话好伤人」', '脏话频率', '表达方式', '社交场合', '「你根本不在乎」'],
    fightsEN: ['"The way you talk hurts"', 'Swearing frequency', 'Expression style', 'Social situations', '"You don\'t care"'],
    dateIdeasCN: ['慢咖啡馆', '低刺激的活动', '一起做手工'],
    dateIdeasEN: ['Slow cafe', 'Low-stim activity', 'Crafts together'],
    relationshipTipsCN: ['FUCK 私下柔软', 'THAN-K 及时表达', '不让伤积累'],
    relationshipTipsEN: ['FUCK: soft in private', 'THAN-K: flag hurt right away', 'Don\'t let wounds accumulate'],
    shareableRoastCN: 'FUCK 配 THAN-K：一个在发泄人生,一个在默默收拾。',
    shareableRoastEN: 'FUCK x THAN-K: one is venting life, the other is quietly cleaning up behind them.',
  },
  {
    type1: 'FUCK',
    type2: 'OH-NO',
    scorePercent: 20,
    verdict: 'doomed',
    summaryCN:
      'OH-NO 的焦虑一被 FUCK 的爆脾气碰,就像玻璃遇上锤子。FUCK 的一句「没事」能让 OH-NO 失眠三天。',
    summaryEN:
      'OH-NO\'s anxiety meets FUCK\'s temper like glass meets hammer. One FUCK "it\'s fine" gives OH-NO three sleepless nights.',
    fightsCN: ['所有紧张时刻', '音量', '情绪对话', '安全感', '未来规划'],
    fightsEN: ['Every tense moment', 'Volume', 'Emotional talks', 'Security', 'Future plans'],
    dateIdeasCN: ['安静的地方', '低刺激约会', '一起散步'],
    dateIdeasEN: ['Quiet spot', 'Low-stim date', 'Walk'],
    relationshipTipsCN: ['FUCK 学控脾气', 'OH-NO 寻求外部支持', '可能不合适'],
    relationshipTipsEN: ['FUCK: learn to regulate', 'OH-NO: find outside support', 'Probably not compatible'],
    shareableRoastCN: 'FUCK 配 OH-NO：一个在喊,一个在脑补葬礼。',
    shareableRoastEN: 'FUCK x OH-NO: one is yelling, the other is already planning a funeral in their head.',
  },

  // ========== DEAD ==========
  {
    type1: 'DEAD',
    type2: 'ZZZZ',
    scorePercent: 86,
    verdict: 'destiny',
    summaryCN:
      '两个摆烂到底的灵魂在一起不需要做任何事。DEAD 的冷漠和 ZZZZ 的嗜睡相互保护,形成了一道「不要打扰」的结界。',
    summaryEN:
      'Two souls who\'ve fully rotted don\'t need to do anything together. DEAD\'s detachment and ZZZZ\'s sleep addiction form a perfect "do not disturb" barrier around the relationship.',
    fightsCN: ['谁起床', '谁关灯', '外卖取货', '月租谁付', '家人来访'],
    fightsEN: ['Who gets up', 'Who turns off the light', 'Who grabs the takeout', 'Who pays rent', 'Family visits'],
    dateIdeasCN: ['沙发一整天', '点外卖看综艺', '午睡'],
    dateIdeasEN: ['Couch for a whole day', 'Takeout plus variety show', 'Shared nap'],
    relationshipTipsCN: ['定期晒太阳', '保持基本清洁', '每月一次出门'],
    relationshipTipsEN: ['Get sunlight on a cadence', 'Maintain hygiene floor', 'One outing a month'],
    shareableRoastCN: 'DEAD 配 ZZZZ：恋爱进度在呼吸频率上体现。',
    shareableRoastEN: 'DEAD x ZZZZ: relationship progress measured by breathing rate.',
  },
  {
    type1: 'DEAD',
    type2: 'MONK',
    scorePercent: 74,
    verdict: 'great',
    summaryCN:
      'DEAD 的空和 MONK 的静很像,一个是「没」一个是「无」。相处没有任何戏剧性,两个人能在一个房间呆一整天不说话也不会觉得怪。',
    summaryEN:
      'DEAD\'s emptiness and MONK\'s stillness look alike — one is "none," the other is "naught." Zero drama, both can share a room in silence all day and nobody finds it weird.',
    fightsCN: ['动力差', '生活规划', '节日', '社交', '表达方式'],
    fightsEN: ['Energy gap', 'Life planning', 'Holidays', 'Socializing', 'Expression'],
    dateIdeasCN: ['一起打坐', '慢咖啡馆', '读同一本书'],
    dateIdeasEN: ['Meditate together', 'Slow cafe', 'Read the same book'],
    relationshipTipsCN: ['偶尔主动一次', '别误解对方的安静', '定期小仪式'],
    relationshipTipsEN: ['Initiate occasionally', 'Don\'t misread silence', 'Small rituals'],
    shareableRoastCN: 'DEAD 配 MONK：他们的恋爱像两块叠在一起的纸,稳但没声音。',
    shareableRoastEN: 'DEAD x MONK: their love is two sheets of paper stacked — stable, silent.',
  },
  {
    type1: 'DEAD',
    type2: 'IMFW',
    scorePercent: 60,
    verdict: 'fine',
    summaryCN:
      '「都无所谓」和「我他妈才不在乎」是一对 meme。两个人对生活都没兴趣,但反而因为共通的空洞感产生了连接。',
    summaryEN:
      '"I don\'t care" meets "I don\'t give a damn" — a meme couple. Neither one has interest in life, yet the shared hollowness creates a connection.',
    fightsCN: ['「你有没有情绪」', '节日无感', '社交拒绝', '共同朋友无', '家人关系'],
    fightsEN: ['"Do you have any emotions"', 'Holiday flatness', 'Social refusal', 'No shared friends', 'Family relations'],
    dateIdeasCN: ['看一部无聊电影', '一起发呆', '凌晨便利店'],
    dateIdeasEN: ['A boring movie', 'Share a void together', '3am convenience store'],
    relationshipTipsCN: ['别把空洞当默契', '定期小互动', '寻求外部温度'],
    relationshipTipsEN: ['Don\'t confuse emptiness with chemistry', 'Small interactions on schedule', 'Borrow warmth from outside'],
    shareableRoastCN: 'DEAD 配 IMFW：他们的恋爱像一个被永远按下去的静音按钮。',
    shareableRoastEN: 'DEAD x IMFW: their love is a permanently pressed mute button.',
  },
  {
    type1: 'DEAD',
    type2: 'LOVE-R',
    scorePercent: 28,
    verdict: 'rocky',
    summaryCN:
      'LOVE-R 的满杯情感洒进 DEAD 的空洞,蒸发得比水还快。LOVE-R 会越来越受伤,DEAD 会越来越抱歉但无力。',
    summaryEN:
      'LOVE-R\'s full cup of feelings poured into DEAD\'s void — evaporates faster than water. LOVE-R gets more wounded, DEAD gets more sorry and more helpless.',
    fightsCN: ['情感投入', '回应速度', '节日', '「你爱不爱我」', '未来'],
    fightsEN: ['Emotional investment', 'Response speed', 'Holidays', '"Do you love me"', 'Future'],
    dateIdeasCN: ['低刺激的陪伴', '静静看电影', '一起做家务'],
    dateIdeasEN: ['Low-stim companionship', 'Quiet movie', 'Shared chores'],
    relationshipTipsCN: ['调整期待', 'DEAD 寻求外援', 'LOVE-R 学会自我照顾'],
    relationshipTipsEN: ['Reset expectations', 'DEAD: seek outside help', 'LOVE-R: self-care first'],
    shareableRoastCN: 'DEAD 配 LOVE-R：一个在掏心,一个在找心在哪。',
    shareableRoastEN: 'DEAD x LOVE-R: one offers their heart, the other forgot where the heart is.',
  },
  {
    type1: 'DEAD',
    type2: 'GOGO',
    scorePercent: 15,
    verdict: 'doomed',
    summaryCN:
      'GOGO 的速度是每小时 100 公里,DEAD 的速度是每小时「别动」。GOGO 会把 DEAD 视作需要拯救的对象,DEAD 会被 GOGO 逼到彻底缩壳。',
    summaryEN:
      'GOGO runs at 100 km/h, DEAD runs at "do not move." GOGO treats DEAD as a rescue mission, DEAD retreats into the shell entirely.',
    fightsCN: ['起床', '目标', '节日', '朋友圈', '未来'],
    fightsEN: ['Waking up', 'Goals', 'Holidays', 'Social circles', 'Future'],
    dateIdeasCN: ['基本不存在', '各过各的', 'GOGO 自己出门'],
    dateIdeasEN: ['Basically non-existent', 'Live separately', 'GOGO goes out alone'],
    relationshipTipsCN: ['承认不合适', '别当救世主', '各自前进'],
    relationshipTipsEN: ['Admit incompatibility', 'Stop playing savior', 'Move forward separately'],
    shareableRoastCN: 'DEAD 配 GOGO：一个在冲刺人生,一个连起跑线都懒得看。',
    shareableRoastEN: 'DEAD x GOGO: one is sprinting through life, the other won\'t even look at the starting line.',
  },

  // ========== IMFW ==========
  {
    type1: 'IMFW',
    type2: 'DEAD',
    scorePercent: 80,
    verdict: 'destiny',
    summaryCN:
      '两个「无所谓」组合起来反而形成一种微妙的平衡。IMFW 的「老子不在乎」 和 DEAD 的「老子啥也没感觉」互相懂,懂到都懒得解释。',
    summaryEN:
      'Two "whatever" souls forming an oddly balanced equilibrium. IMFW\'s "I do not care" and DEAD\'s "I feel nothing" understand each other — too well to bother explaining.',
    fightsCN: ['谁先开口', '节日无感', '家人', '朋友圈', '共同计划'],
    fightsEN: ['Who speaks first', 'Zero holiday feelings', 'Family', 'Social circles', 'Joint planning'],
    dateIdeasCN: ['一起发呆', '看一部无脑剧', '点外卖'],
    dateIdeasEN: ['Stare at the void together', 'Watch a mindless show', 'Order takeout'],
    relationshipTipsCN: ['至少一个人假装有情绪', '保持基本生活', '别让关系变植物'],
    relationshipTipsEN: ['At least one of you fakes emotion', 'Keep basic life function', 'Don\'t let love go plant mode'],
    shareableRoastCN: 'IMFW 配 DEAD：他们的恋爱是一场没有台词的话剧。',
    shareableRoastEN: 'IMFW x DEAD: their love is a theatre play with no lines.',
  },
  {
    type1: 'IMFW',
    type2: 'SHIT',
    scorePercent: 73,
    verdict: 'great',
    summaryCN:
      'IMFW 不care,SHIT 也不 care,两个人互不打扰地烂漫着。生活没有高潮,也没有低谷,像一杯温度合适的糖水。',
    summaryEN:
      'IMFW doesn\'t care, SHIT doesn\'t care, and neither of them interrupts the other\'s rot. No highs, no lows — just lukewarm sugar water.',
    fightsCN: ['家务没人做', '外卖', '睡眠', '共同决定', '「你还活着吗」'],
    fightsEN: ['Nobody does chores', 'Takeout', 'Sleep', 'Joint decisions', '"Are you still alive"'],
    dateIdeasCN: ['一起躺', '看老剧', '不出门'],
    dateIdeasEN: ['Lie down together', 'Rewatch old shows', 'Stay inside'],
    relationshipTipsCN: ['维持基本卫生', '至少一个人起床', '每周一次对话'],
    relationshipTipsEN: ['Maintain hygiene floor', 'At least one of you gets up', 'One conversation a week'],
    shareableRoastCN: 'IMFW 配 SHIT：他们的恋爱名片上写着「请勿打扰」。',
    shareableRoastEN: 'IMFW x SHIT: their relationship business card reads "do not disturb."',
  },
  {
    type1: 'IMFW',
    type2: 'MONK',
    scorePercent: 58,
    verdict: 'fine',
    summaryCN:
      'IMFW 的「没必要」和 MONK 的「不必要」接近,但动机完全不同。一个是彻底摆烂,一个是已经超脱。可以相处,但容易聊不到一起。',
    summaryEN:
      'IMFW\'s "no need" and MONK\'s "not necessary" are close — but from different places. One is full rot, one is transcended. Coexistence yes, conversation hard.',
    fightsCN: ['人生观', '社交', '节日', '消费观', '家人'],
    fightsEN: ['Worldview', 'Social', 'Holidays', 'Money', 'Family'],
    dateIdeasCN: ['安静茶馆', '看一部纪录片', '公园散步'],
    dateIdeasEN: ['Quiet teahouse', 'Watch a documentary', 'Park walk'],
    relationshipTipsCN: ['接受差异', '每周一次真谈', '主动表达'],
    relationshipTipsEN: ['Accept the gap', 'One real talk a week', 'Express proactively'],
    shareableRoastCN: 'IMFW 配 MONK：一个在懒得成佛,一个已经成了。',
    shareableRoastEN: 'IMFW x MONK: one is too lazy to enlighten, the other already did.',
  },
  {
    type1: 'IMFW',
    type2: 'MUM',
    scorePercent: 30,
    verdict: 'rocky',
    summaryCN:
      'MUM 的爱像一盆热汤直接浇到 IMFW 冷若冰箱的脸上。MUM 会觉得付出没回音,IMFW 会觉得被持续打扰。',
    summaryEN:
      'MUM\'s love pours like hot soup onto IMFW\'s fridge-cold face. MUM feels the giving echoes into nothing, IMFW feels constantly bothered.',
    fightsCN: ['情感反馈', '节日', '家人介入', '「你还在乎我吗」', '表达'],
    fightsEN: ['Emotional feedback', 'Holidays', 'Family involvement', '"Do you still care"', 'Expression'],
    dateIdeasCN: ['低强度约会', 'IMFW 主动一次', '散步'],
    dateIdeasEN: ['Low-intensity date', 'IMFW initiates once', 'Walk'],
    relationshipTipsCN: ['MUM 保护自己', 'IMFW 承认自己的状态', '外部支持'],
    relationshipTipsEN: ['MUM: protect yourself', 'IMFW: own your state', 'Seek outside support'],
    shareableRoastCN: 'IMFW 配 MUM：一个在做饭,一个在问「为什么」。',
    shareableRoastEN: 'IMFW x MUM: one is cooking dinner, the other is asking "why bother."',
  },
  {
    type1: 'IMFW',
    type2: 'LOVE-R',
    scorePercent: 14,
    verdict: 'doomed',
    summaryCN:
      'LOVE-R 的每一次用心都被 IMFW 打上「懒得理」。两个人的情感对话等于单向直播,主播累,观众还走了。',
    summaryEN:
      'Every sincere LOVE-R move gets stamped "can\'t be bothered" by IMFW. The emotional broadcast is one-way — the host is exhausted, the audience left.',
    fightsCN: ['回消息', '节日', '感情投入', '家人', '未来'],
    fightsEN: ['Replies', 'Holidays', 'Emotional investment', 'Family', 'Future'],
    dateIdeasCN: ['基本无', '看电影 LOVE-R 别期望太多', '散步'],
    dateIdeasEN: ['Basically none', 'Movie night, LOVE-R lower expectations', 'Walk'],
    relationshipTipsCN: ['LOVE-R 学会离开', 'IMFW 诚实告知', '止损'],
    relationshipTipsEN: ['LOVE-R: learn to leave', 'IMFW: be honest', 'Cut losses'],
    shareableRoastCN: 'IMFW 配 LOVE-R：一个掏心,一个已经下播。',
    shareableRoastEN: 'IMFW x LOVE-R: one gives their heart, the other already logged off.',
  },

  // ========== HHHH ==========
  {
    type1: 'HHHH',
    type2: 'JOKE-R',
    scorePercent: 91,
    verdict: 'destiny',
    summaryCN:
      'HHHH 是笑点低的观众,JOKE-R 是高产的段子手,两个人就是天然的 CP。一起生活每一天都像在拍喜剧片,连吵架都带笑声。',
    summaryEN:
      'HHHH has the lowest laugh threshold, JOKE-R is a joke factory — instant OTP. Every day feels like a sitcom set, even the fights come with a laugh track.',
    fightsCN: ['严肃话题被跳过', '谁收拾家里', '决定速度', '共同朋友抢话题', '「你能不能认真」'],
    fightsEN: ['Serious topics skipped', 'Who cleans', 'Decision speed', 'Friends hijacking the joke', '"Can you be serious"'],
    dateIdeasCN: ['脱口秀', '游乐场', '做一顿失败的晚餐'],
    dateIdeasEN: ['Stand-up', 'Amusement park', 'Cook a disastrous dinner'],
    relationshipTipsCN: ['笑声之外要有真话', '严肃话题要专门时段', '不拿对方当素材'],
    relationshipTipsEN: ['Beyond the laughs, real talk', 'Dedicated serious-talk slots', 'Don\'t turn each other into material'],
    shareableRoastCN: 'HHHH 配 JOKE-R：他们家里一天产出的梗比一整季脱口秀还多。',
    shareableRoastEN: 'HHHH x JOKE-R: their apartment produces more jokes in a day than a full stand-up season.',
  },
  {
    type1: 'HHHH',
    type2: 'MUM',
    scorePercent: 78,
    verdict: 'great',
    summaryCN:
      'MUM 的温柔给 HHHH 一个安全的舞台,HHHH 的欢乐给 MUM 一个每天开心的理由。一个付出爱,一个传递快乐,循环健康。',
    summaryEN:
      'MUM\'s warmth gives HHHH a safe stage; HHHH\'s joy gives MUM a daily reason to smile. One gives love, the other gives laughter — a healthy loop.',
    fightsCN: ['HHHH 太闹', 'MUM 觉得被忽略', '家务', '节日', '朋友圈'],
    fightsEN: ['HHHH too loud', 'MUM feels overlooked', 'Chores', 'Holidays', 'Friend circles'],
    dateIdeasCN: ['在家做饭+看喜剧', '短途游', '市集'],
    dateIdeasEN: ['Home cooking plus comedy', 'Short trip', 'Market stroll'],
    relationshipTipsCN: ['HHHH 专注听一次', 'MUM 告诉对方累了', '感情需要回应'],
    relationshipTipsEN: ['HHHH: fully listen once', 'MUM: say when you\'re tired', 'Love needs reciprocation'],
    shareableRoastCN: 'HHHH 配 MUM：一个在送温暖,一个在笑到打嗝。',
    shareableRoastEN: 'HHHH x MUM: one delivers warmth, the other cackles until they hiccup.',
  },
  {
    type1: 'HHHH',
    type2: 'THAN-K',
    scorePercent: 66,
    verdict: 'fine',
    summaryCN:
      'HHHH 把欢乐当礼物,THAN-K 真心感谢每一个笑点。两个人相处像慢速肥皂剧,温柔但偶尔 HHHH 会觉得 THAN-K 太压抑。',
    summaryEN:
      'HHHH gives joy as a gift, THAN-K sincerely thanks every laugh line. A slow-cooked sitcom dynamic — warm, but HHHH sometimes feels THAN-K holds too much in.',
    fightsCN: ['严肃话题', '表达方式', '节日', '家人介入', '朋友选择'],
    fightsEN: ['Serious topics', 'Expression', 'Holidays', 'Family involvement', 'Friend choice'],
    dateIdeasCN: ['脱口秀', '慢咖啡馆', '公园野餐'],
    dateIdeasEN: ['Stand-up show', 'Slow cafe', 'Park picnic'],
    relationshipTipsCN: ['HHHH 注意 THAN-K 的隐忍', 'THAN-K 大胆表达', '双方都留真心话时间'],
    relationshipTipsEN: ['HHHH: watch THAN-K\'s quiet strain', 'THAN-K: speak up bravely', 'Both carve out real-talk time'],
    shareableRoastCN: 'HHHH 配 THAN-K：他们的恋爱是一组谢谢+哈哈哈的表情包合辑。',
    shareableRoastEN: 'HHHH x THAN-K: their love is a best-of reel of "thank you" and "lmao" stickers.',
  },
  {
    type1: 'HHHH',
    type2: 'CTRL',
    scorePercent: 43,
    verdict: 'rocky',
    summaryCN:
      'CTRL 的秩序碰 HHHH 的无厘头,一开始觉得新鲜,后期 CTRL 会觉得自己在带一个幼儿园。HHHH 会觉得 CTRL 太紧。',
    summaryEN:
      'CTRL\'s order meets HHHH\'s nonsense. Novel at first — later CTRL feels like running a daycare. HHHH finds CTRL too tight.',
    fightsCN: ['计划 vs 乱', '家务', '朋友聚会', '决定速度', '「你能不能认真」'],
    fightsEN: ['Plans vs chaos', 'Chores', 'Friend gatherings', 'Decision speed', '"Can you be serious"'],
    dateIdeasCN: ['CTRL 规划一个有梗的日子', '看喜剧', '短途游'],
    dateIdeasEN: ['CTRL plans a joke-friendly day', 'Watch a comedy', 'Short trip'],
    relationshipTipsCN: ['CTRL 放下 SOP', 'HHHH 顺便整理一下', '互相翻译'],
    relationshipTipsEN: ['CTRL: loosen the SOP', 'HHHH: tidy up a little', 'Translate for each other'],
    shareableRoastCN: 'HHHH 配 CTRL：一个在笑,一个在做笑容的 SWOT 分析。',
    shareableRoastEN: 'HHHH x CTRL: one laughs, the other runs a SWOT analysis on the laugh.',
  },
  {
    type1: 'HHHH',
    type2: 'DEAD',
    scorePercent: 19,
    verdict: 'doomed',
    summaryCN:
      'HHHH 讲十个段子,DEAD 一个都没反应。HHHH 的光亮被 DEAD 的黑洞完全吞掉,最终两个人都变灰。',
    summaryEN:
      'HHHH delivers ten jokes, DEAD reacts to zero. HHHH\'s light gets swallowed by DEAD\'s void — both end up gray.',
    fightsCN: ['「你能不能笑一次」', '能量差', '节日', '未来', '共同朋友'],
    fightsEN: ['"Can you laugh just once"', 'Energy gap', 'Holidays', 'Future', 'Shared friends'],
    dateIdeasCN: ['低压力的陪伴', '沙发日', '一起点外卖'],
    dateIdeasEN: ['Low-pressure company', 'Couch day', 'Shared takeout'],
    relationshipTipsCN: ['别强行拯救', 'DEAD 需要真正的休息', 'HHHH 保留自己的快乐源'],
    relationshipTipsEN: ['Don\'t force a rescue', 'DEAD needs real rest', 'HHHH: protect your joy sources'],
    shareableRoastCN: 'HHHH 配 DEAD：一个是电台,一个是断电收音机。',
    shareableRoastEN: 'HHHH x DEAD: one is a live radio broadcast, the other is an unplugged receiver.',
  },

  // ========== DRUNK ==========
  {
    type1: 'DRUNK',
    type2: 'WOC!',
    scorePercent: 83,
    verdict: 'destiny',
    summaryCN:
      'DRUNK 的放飞配 WOC! 的情绪大爆发,两个人凑一起就是人形派对发电机。所到之处都是高光和鸡毛,第二天醒来再复盘。',
    summaryEN:
      'DRUNK\'s looseness plus WOC!\'s emotional fireworks equals a human party generator. Wherever they go: highlight reels and feather explosions. Debrief the next morning.',
    fightsCN: ['谁花更多', '家人看法', '作息', '酒后决定', '共同朋友'],
    fightsEN: ['Who spends more', 'Family opinions', 'Sleep schedule', 'Drunk decisions', 'Shared friends'],
    dateIdeasCN: ['酒吧', '演唱会', 'road trip'],
    dateIdeasEN: ['Bar', 'Concert', 'Road trip'],
    relationshipTipsCN: ['留 sober 时间', '钱要透明', '身体是底线'],
    relationshipTipsEN: ['Protect sober windows', 'Transparent money', 'Health is the floor'],
    shareableRoastCN: 'DRUNK 配 WOC!：他们的爱情是一场天天都在返场的跨年 party。',
    shareableRoastEN: 'DRUNK x WOC!: their love is a new year\'s party that keeps doing encores every single night.',
  },
  {
    type1: 'DRUNK',
    type2: 'JOKE-R',
    scorePercent: 77,
    verdict: 'great',
    summaryCN:
      'DRUNK 是即兴发挥大师,JOKE-R 是段子供应商。两人一坐下就是一整晚的现场版。就是第二天不太记得说过啥。',
    summaryEN:
      'DRUNK is the improvisation king, JOKE-R is the joke supplier. Together it\'s a live set every single night. Only problem: neither remembers what was said.',
    fightsCN: ['酒后话算不算', '谁是主角', '工作日喝酒', '花钱', '家人'],
    fightsEN: ['Does drunk talk count', 'Who\'s the lead', 'Weekday drinking', 'Spending', 'Family'],
    dateIdeasCN: ['深夜烧烤', '一起写段子', 'live house'],
    dateIdeasEN: ['Late-night BBQ', 'Write jokes together', 'Live house'],
    relationshipTipsCN: ['真心话不只在酒桌上说', '设 sober day', '健康优先'],
    relationshipTipsEN: ['Real talk off the bar stool too', 'Sober days', 'Health first'],
    shareableRoastCN: 'DRUNK 配 JOKE-R：他们一半的情话是酒精说的,另一半是梗。',
    shareableRoastEN: 'DRUNK x JOKE-R: half their pillow talk is alcohol speaking, the other half is memes.',
  },
  {
    type1: 'DRUNK',
    type2: 'SEXY',
    scorePercent: 62,
    verdict: 'fine',
    summaryCN:
      'SEXY 的氛围感和 DRUNK 的微醺状态简直是同一首歌的两个声部。派对之王+派对之后,浪漫但也容易失控。',
    summaryEN:
      'SEXY\'s vibe and DRUNK\'s buzz are two harmonies in the same song. King of the party plus after-the-party. Romantic — and often out of control.',
    fightsCN: ['朋友圈界限', '花钱', '醉后行为', '节日', '照片'],
    fightsEN: ['Friend-circle limits', 'Money', 'Drunk behavior', 'Holidays', 'Photos'],
    dateIdeasCN: ['精致酒吧', '私房 party', '夜游'],
    dateIdeasEN: ['Upscale bar', 'House party', 'Night drive'],
    relationshipTipsCN: ['酒前定界限', '互相保护', '偶尔 sober 约会'],
    relationshipTipsEN: ['Set limits before drinks', 'Guard each other', 'Occasional sober date'],
    shareableRoastCN: 'DRUNK 配 SEXY：他们的爱情大多数发生在灯光和酒精同时生效的时刻。',
    shareableRoastEN: 'DRUNK x SEXY: most of their relationship happens in the overlap of lighting and alcohol.',
  },
  {
    type1: 'DRUNK',
    type2: 'CTRL',
    scorePercent: 36,
    verdict: 'rocky',
    summaryCN:
      'CTRL 的秩序和 DRUNK 的即兴天然对立。CTRL 会试图给 DRUNK 搞一个「每周几杯」的表,DRUNK 会立刻越界。',
    summaryEN:
      'CTRL\'s order vs DRUNK\'s improvisation. CTRL drafts a "drinks per week" spreadsheet, DRUNK breaks it immediately.',
    fightsCN: ['计划', '喝酒', '起床', '花钱', '节日'],
    fightsEN: ['Plans', 'Drinking', 'Waking up', 'Spending', 'Holidays'],
    dateIdeasCN: ['白天小酒馆', 'CTRL 选场所', '短途游'],
    dateIdeasEN: ['Daytime wine bar', 'CTRL picks venue', 'Short trip'],
    relationshipTipsCN: ['CTRL 放松一点', 'DRUNK 保留一些 sober 时段', '双方妥协'],
    relationshipTipsEN: ['CTRL: loosen up', 'DRUNK: protect sober hours', 'Mutual compromise'],
    shareableRoastCN: 'DRUNK 配 CTRL：一个在 excel 记酒量,一个一杯就让 excel 没意义。',
    shareableRoastEN: 'DRUNK x CTRL: one tracks booze in Excel, the other drinks the Excel file.',
  },
  {
    type1: 'DRUNK',
    type2: 'OH-NO',
    scorePercent: 20,
    verdict: 'doomed',
    summaryCN:
      'DRUNK 的每一次「今晚通宵」都会把 OH-NO 送进焦虑的深渊。OH-NO 的每一次「你能早回吗」都让 DRUNK 想出门喝更多。',
    summaryEN:
      'DRUNK\'s every "let\'s pull an all-nighter" ships OH-NO straight into the anxiety pit. OH-NO\'s every "can you come home early" makes DRUNK want to drink more.',
    fightsCN: ['安全感', '作息', '花钱', '醉后话', '未来'],
    fightsEN: ['Security', 'Sleep schedule', 'Money', 'Drunk talk', 'Future'],
    dateIdeasCN: ['白天约会', '不喝酒的晚餐', '散步'],
    dateIdeasEN: ['Daytime date', 'No-booze dinner', 'Walk'],
    relationshipTipsCN: ['DRUNK 按时回消息', 'OH-NO 不要脑补', '必要时止损'],
    relationshipTipsEN: ['DRUNK: reply on time', 'OH-NO: stop catastrophizing', 'Cut losses if needed'],
    shareableRoastCN: 'DRUNK 配 OH-NO：一个在酒桌,一个在家计算对方还有多少肝。',
    shareableRoastEN: 'DRUNK x OH-NO: one is at the bar, the other is at home calculating remaining liver function.',
  },
  // ============================================================
  // IMFW 代表性配对补全（lint 要求每类型 >= 5 次）
  // ============================================================
  {
    type1: 'IMFW',
    type2: 'THAN-K',
    scorePercent: 72,
    verdict: 'fine',
    summaryCN:
      'IMFW 每天认定自己是个废物，THAN-K 看到的全是对方的好。前三个月 THAN-K 的感恩能把 IMFW 从井底捞上来；第六个月 IMFW 开始觉得「她只是不忍心嫌弃我」然后自己又掉回去。THAN-K 学不会让 IMFW「相信自己值得」，只能陪着。',
    summaryEN:
      'IMFW decides they\'re trash every single day. THAN-K only sees the good. First three months, THAN-K\'s gratitude pulls IMFW out of the pit. By month six, IMFW starts thinking "she just doesn\'t have the heart to ditch me" and slides back in. THAN-K cannot teach IMFW to believe they deserve this — THAN-K can only sit with them.',
    fightsCN: [
      'IMFW 每次被夸都要反驳「我没那么好」',
      'THAN-K 一累下来 IMFW 立刻觉得是自己拖累的',
      '"要不你和更好的人在一起吧" —— IMFW 的口头禅',
      'THAN-K 想庆祝什么，IMFW 觉得没什么值得庆祝',
      '家务分配：IMFW 抢着做但做不好，THAN-K 不让做又怕 IMFW 觉得被嫌弃',
    ],
    fightsEN: [
      'IMFW rejects every compliment with "I\'m not that good"',
      'When THAN-K gets tired, IMFW immediately thinks it\'s their fault',
      '"Maybe you should be with someone better" — IMFW\'s catchphrase',
      'THAN-K wants to celebrate something. IMFW thinks nothing deserves celebration',
      'Chores: IMFW insists on doing everything but does it badly; THAN-K refuses but worries IMFW feels rejected',
    ],
    dateIdeasCN: [
      '去吃 IMFW 最爱的路边摊，THAN-K 负责说「你带我来这里真好」',
      '一起看一部很烂的电影，让 IMFW 发现「还有比自己更烂的东西」',
      '周末去公园坐着不说话，这对 IMFW 来说是唯一能放松的时刻',
    ],
    dateIdeasEN: [
      'Go to IMFW\'s favorite street food stall; THAN-K\'s job is to say "I\'m so glad you brought me here"',
      'Watch a genuinely terrible movie together so IMFW can discover "something is worse than me"',
      'Sit in the park on weekends in silence — for IMFW this is the only truly relaxing hour',
    ],
    relationshipTipsCN: [
      'THAN-K 不要天天夸，IMFW 会怀疑你有目的',
      'IMFW 试着每周接受一次赞美不反驳，一次就好',
      '两个人一起承认「今天就是很糟」比假装积极更有用',
    ],
    relationshipTipsEN: [
      'THAN-K: do not compliment every day — IMFW will start suspecting you\'re up to something',
      'IMFW: try accepting one compliment a week without pushing back. Just one',
      'Admitting "today sucks" together beats pretending to be positive',
    ],
    shareableRoastCN: 'IMFW 配 THAN-K：一个认定自己一无是处，一个发现对方每一处都值得感恩，结果互相洗脑了半年。',
    shareableRoastEN: 'IMFW x THAN-K: one is convinced they\'re worthless, the other sees every inch as worth thanking. They brainwashed each other for half a year.',
  },
  {
    type1: 'IMFW',
    type2: 'MUM',
    scorePercent: 68,
    verdict: 'fine',
    summaryCN:
      'MUM 需要被需要，IMFW 需要有人说「你不是废物」。表面看这是完美互补，实际上是两个破洞互相堵。MUM 的照顾会让 IMFW 暂时好一点，但只要 MUM 一忙 IMFW 就立刻回到「果然我不值得」的叙事。长期来看，MUM 会累到怀疑人生，IMFW 会内疚到加倍自我厌恶。',
    summaryEN:
      'MUM needs to be needed. IMFW needs someone to say "you\'re not trash." Looks like perfect complementarity, actually two holes patching each other. MUM\'s care makes IMFW feel briefly better, but the moment MUM gets busy, IMFW snaps right back to "see, I knew I wasn\'t worth it." Long-term: MUM hits existential exhaustion, IMFW hits double-strength self-loathing.',
    fightsCN: [
      '"我不是要你照顾我" —— IMFW 每次崩溃后的标准开场白',
      'MUM 累到哭，IMFW 立刻觉得是自己活着浪费她的人生',
      '谁做晚饭：IMFW 要做，MUM 怕她做不好又不放心',
      'MUM 的妈味上线后 IMFW 觉得自己像个小孩子',
      '"我拖累你了对吧" vs "我没说过这种话"，无限循环',
    ],
    fightsEN: [
      '"I\'m not asking you to take care of me" — IMFW\'s standard opener after every breakdown',
      'MUM cries from exhaustion. IMFW immediately thinks they\'re wasting her life by existing',
      'Who cooks dinner: IMFW insists; MUM worries IMFW can\'t and hovers',
      'MUM slips into mom-mode; IMFW feels infantilized',
      '"I\'m dragging you down, right?" vs "I never said that." On infinite loop',
    ],
    dateIdeasCN: [
      'MUM 带 IMFW 去做一次头发，让她被人夸一次',
      '一起给父母打电话，IMFW 会发现自己「至少还在被记挂」',
      '在家煮汤，IMFW 切菜 MUM 看着，不评价',
    ],
    dateIdeasEN: [
      'MUM takes IMFW to get a haircut, just so someone else compliments her once',
      'Call both sets of parents together — IMFW will notice "at least someone thinks of me"',
      'Make soup at home. IMFW chops vegetables, MUM watches without commentary',
    ],
    relationshipTipsCN: [
      'MUM 不要包办，把一些小事留给 IMFW 做，她需要的是"能做成一件事"的证据',
      'IMFW 学会说「谢谢」而不是「对不起」',
      '每周一次「MUM 今天不做妈」：让 IMFW 当那个照顾人的',
    ],
    relationshipTipsEN: [
      'MUM: stop doing everything. Leave small tasks for IMFW — she needs evidence of "I can finish one thing"',
      'IMFW: practice saying "thank you" instead of "sorry"',
      'Once a week "MUM is off duty tonight" — let IMFW be the caretaker for one evening',
    ],
    shareableRoastCN: 'IMFW 配 MUM：一个天天道歉，一个天天说没事，两年后两个人都学会用叹气代替说话。',
    shareableRoastEN: 'IMFW x MUM: one apologizes daily, the other says "it\'s fine" daily. Two years in, both have replaced talking with sighing.',
  },
  // ============================================================
  // HHHH 代表性配对补全
  // ============================================================
  {
    type1: 'HHHH',
    type2: 'HHHH',
    scorePercent: 52,
    verdict: 'fine',
    summaryCN:
      '两个 HHHH 住一起，外面世界塌了也不会影响他们。没有争吵，没有激情，没有"今天我特别想见你"，也没有"我受不了你了"。日子过得像一份长期续订的外卖套餐：知道味道、不会失望、也不会惊喜。直到某天其中一个人突然开始哭，另一个完全不知道该说什么。',
    summaryEN:
      'Two HHHHs under one roof. The world could collapse outside and it wouldn\'t affect them. No fights. No passion. No "I really want to see you today," no "I can\'t stand you anymore." Life runs like a long-running takeout subscription: predictable flavor, no disappointment, no surprises. Until one day one of them suddenly starts crying, and the other has absolutely no idea what to say.',
    fightsCN: [
      '他们几乎不吵架（这才是问题）',
      '"你今晚想吃什么" —— "都行" —— "那吃 X" —— "好" ×365 天',
      '纪念日：两个人都忘了，然后都假装"本来也没想过要庆祝"',
      '搬家：两个人都不想做决定，拖了 9 个月',
      '其中一方突然"我想改变一下生活"，另一方完全懵',
    ],
    fightsEN: [
      'They barely fight (and that\'s the problem)',
      '"What do you want for dinner?" — "Anything." — "Then X." — "Sure." × 365 days',
      'Anniversary: both forgot, both pretend "we weren\'t planning to celebrate anyway"',
      'Moving apartments: neither wants to decide, drags on for 9 months',
      'One suddenly says "I want to change my life"; the other is completely blindsided',
    ],
    dateIdeasCN: [
      '去做一件你们从来不会做的事（攀岩、即兴话剧、跳伞）',
      '各自写下"对方让我最不理解的一件事"然后交换',
      '一起去一个没去过的城市，故意不查攻略',
    ],
    dateIdeasEN: [
      'Do something neither of you would ever do (rock climbing, improv theater, skydiving)',
      'Each write down "the one thing about you I still don\'t understand" and swap',
      'Go to a city neither has been to — deliberately do not check the guide',
    ],
    relationshipTipsCN: [
      '强制制造摩擦：每周安排一次必须表态的话题',
      '承认"稳定"和"麻木"只有一线之隔，每 3 个月复盘一次',
      '允许一方有"不够 HHHH"的时刻，不要拉回来',
    ],
    relationshipTipsEN: [
      'Force friction: schedule one topic per week where both must take a position',
      'Admit "stable" and "numb" are one inch apart. Review every 3 months',
      'Let one side have moments of being "less HHHH" — do not pull them back',
    ],
    shareableRoastCN: 'HHHH 配 HHHH：两个人住一起像两台待机的路由器，亮着灯但没在传数据。',
    shareableRoastEN: 'HHHH x HHHH: two people living together like two routers on standby — lights on, no data moving.',
  },
];

// ============================================================
// 兜底配对生成器
// 当数据库里没有某个 type1 x type2 组合时，基于 pattern 距离自动生成
// ============================================================

/**
 * 计算两个 15 维 pattern 字符串的曼哈顿距离
 * pattern 格式：如 "HMLHMMLLHMHMHHL"（15 个 H/M/L 字符）
 */
function patternDistance(p1: string, p2: string): number {
  if (!p1 || !p2 || p1.length !== p2.length) return 15; // 未知 → 默认最远
  const v = (c: string) => (c === 'L' ? 0 : c === 'M' ? 1 : 2);
  let sum = 0;
  for (let i = 0; i < p1.length; i++) {
    sum += Math.abs(v(p1[i]) - v(p2[i]));
  }
  return sum;
}

/** 距离 → verdict 等级 */
function distanceToVerdict(distance: number): { verdict: Verdict; score: number } {
  // 最大距离约 30（15 维 × 2），最小 0
  if (distance <= 5) return { verdict: 'destiny', score: 90 - distance * 1 };
  if (distance <= 10) return { verdict: 'great', score: 80 - (distance - 5) * 2 };
  if (distance <= 15) return { verdict: 'fine', score: 68 - (distance - 10) * 2 };
  if (distance <= 21) return { verdict: 'rocky', score: 54 - (distance - 15) * 2 };
  return { verdict: 'doomed', score: Math.max(10, 40 - (distance - 21) * 2) };
}

const verdictTemplatesCN: Record<Verdict, {
  summary: (a: string, b: string) => string;
  fights: string[];
  dates: string[];
  tips: string[];
  roast: (a: string, b: string) => string;
}> = {
  destiny: {
    summary: (a, b) =>
      `${a} 和 ${b} 就像两个相互咬合的齿轮，脾气、节奏、世界观都对得上。相处不累，吵架少，但小心太顺反而失去成长。`,
    fights: [
      '太默契了反而懒得沟通',
      '共同朋友分配不均',
      '谁说话更算数',
      '舒适区太大不想突破',
      '偶尔的小误会被各自脑补放大',
    ],
    dates: ['窝在家做一顿复杂的饭', '去一个两人都没去过的小城', '一起写未来五年的计划'],
    tips: [
      '定期主动沟通，不要吃老本',
      '保留各自的独立空间',
      '别把默契当作不用努力的借口',
    ],
    roast: (a, b) => `${a} 配 ${b}：两个人像提前彩排过一样，连吵架都很整齐。`,
  },
  great: {
    summary: (a, b) =>
      `${a} 和 ${b} 整体互补得不错，价值观大致吻合，偶有摩擦但都在可处理范围。关系稳，只要别让日常磨损浪漫就好。`,
    fights: ['生活节奏差一点', '表达方式不同', '家务分配', '金钱使用观', '「你没听懂我」'],
    dates: ['周末短途游', '一起看展或看剧', '做一件新事情（比如上课）'],
    tips: [
      '每周固定一次深聊',
      '学会 translate 对方的表达方式',
      '保留三成独立兴趣',
    ],
    roast: (a, b) => `${a} 配 ${b}：默契不是满分，但至少不会在饭桌上摔筷子。`,
  },
  fine: {
    summary: (a, b) =>
      `${a} 和 ${b} 不是最顺的那种，但也没差到崩盘。双方得多主动一点，关系才能自己往前走。顺其自然会变成顺其消耗。`,
    fights: ['沟通频率', '情绪反馈慢', '朋友圈重合度', '家务责任', '「你是不是累了」'],
    dates: ['简单晚餐+散步', '一起做家务算约会', '看老电影'],
    tips: ['每天一句真心话', '不要用冷战解决问题', '节日要有仪式感'],
    roast: (a, b) => `${a} 配 ${b}：凑合过不是坏事，不凑合过就散了也不是坏事。`,
  },
  rocky: {
    summary: (a, b) =>
      `${a} 和 ${b} 在某些核心维度上方向不同。相处需要双方都能低头、都能让步，否则会变成无限内耗。不是不能在一起，但要有心理准备。`,
    fights: [
      '三观上的小分歧被放大',
      '沟通总在鸡同鸭讲',
      '「你根本不懂我」',
      '钱/家务/未来规划',
      '情绪劳动分配不均',
    ],
    dates: ['降低预期的低成本约会', '各自做自己的事但在一起', '咨询一次 couple therapy'],
    tips: [
      '承认差异而不是修好差异',
      '别把对方当成改造项目',
      '设一个「不谈敏感话题」的 safe zone',
    ],
    roast: (a, b) => `${a} 配 ${b}：爱情像去爬一座没修路的山，风景是有，累也是真。`,
  },
  doomed: {
    summary: (a, b) =>
      `${a} 和 ${b} 在核心维度上几乎是镜像相反。短期相处可能因为新鲜感而电光火石，长期会进入「互相耗能」模式。不是有爱就能成的那种组合。`,
    fights: [
      '几乎所有生活决定',
      '根本沟通不在一个频道',
      '价值观冲突',
      '情绪模式互相触发',
      '「我们为什么在一起」',
    ],
    dates: ['三天内别做重要决定', '分开各自透气再见面', '正式聊一次关系定位'],
    tips: [
      '承认不合适不是失败',
      '别用付出去绑架对方',
      '离开不是坏事，继续才可能是',
    ],
    roast: (a, b) => `${a} 配 ${b}：爱情不是万能的，你俩就是最硬的反例。`,
  },
};

const verdictTemplatesEN: Record<Verdict, {
  summary: (a: string, b: string) => string;
  fights: string[];
  dates: string[];
  tips: string[];
  roast: (a: string, b: string) => string;
}> = {
  destiny: {
    summary: (a, b) =>
      `${a} and ${b} click like gears built for each other — tempo, values, worldview, all in sync. Low friction, low drama. Just watch out: too much comfort can quietly flatten growth.`,
    fights: [
      'Too in-sync — you stop actually talking',
      'Shared friend attention imbalance',
      'Whose voice carries more weight',
      'Comfort zone too big, nobody pushes',
      'Small misreads blown up by silent overthinking',
    ],
    dates: ['Cook a complicated meal at home', 'Fly somewhere neither of you has been', 'Draft your joint five-year plan'],
    tips: [
      'Schedule real talks; stop coasting on chemistry',
      'Protect each other\'s solo time',
      'Don\'t let "we get it" become "we stopped trying"',
    ],
    roast: (a, b) => `${a} x ${b}: so in-sync, even their fights look pre-rehearsed.`,
  },
  great: {
    summary: (a, b) =>
      `${a} and ${b} complement each other well. Core values roughly aligned, small frictions but nothing explosive. Solid — just don\'t let daily grind corrode the romance.`,
    fights: ['Slightly different tempo', 'Expression style mismatch', 'Chores', 'Money mindset', '"You didn\'t get what I meant"'],
    dates: ['Weekend mini-trip', 'Gallery or theatre together', 'Take a class together'],
    tips: [
      'One deep talk per week, non-negotiable',
      'Learn to translate each other\'s expression style',
      'Keep 30% of hobbies separate',
    ],
    roast: (a, b) => `${a} x ${b}: not a perfect score, but nobody\'s throwing chopsticks at dinner.`,
  },
  fine: {
    summary: (a, b) =>
      `${a} and ${b} aren\'t the smoothest pairing, but nothing\'s on fire. You\'ll both need to show up actively — "going with the flow" here often means "drifting apart."`,
    fights: ['Communication frequency', 'Slow emotional feedback', 'Social circle overlap', 'Chore fairness', '"Are you tired of me"'],
    dates: ['Simple dinner + a walk', 'Treat chores as a date', 'Old-film night'],
    tips: ['One honest sentence a day', 'No cold wars — ever', 'Make rituals on small holidays'],
    roast: (a, b) => `${a} x ${b}: "making it work" isn\'t bad — and "making it end" isn\'t either.`,
  },
  rocky: {
    summary: (a, b) =>
      `${a} and ${b} point in different directions on core dimensions. Both sides need to bend, apologize, and actively translate — otherwise it becomes mutual burnout. Workable, but go in with eyes open.`,
    fights: [
      'Small value gaps become canyons',
      'You keep talking past each other',
      '"You just don\'t get me"',
      'Money / chores / future',
      'Unequal emotional labor',
    ],
    dates: ['Low-expectation, low-cost date', 'Parallel hobbies in one room', 'Try a session of couples therapy'],
    tips: [
      'Accept the gap instead of fixing it',
      'Don\'t treat your partner as a renovation project',
      'Create a "no-go topics" safe zone',
    ],
    roast: (a, b) => `${a} x ${b}: love is a hike up an unpaved mountain — yes there\'s a view, yes your legs hurt.`,
  },
  doomed: {
    summary: (a, b) =>
      `${a} and ${b} are near-mirror opposites on core dimensions. Short-term sparks from novelty, long-term slide into mutual drain. Love alone won\'t patch this.`,
    fights: [
      'Basically every life decision',
      'Not even on the same frequency',
      'Value clashes',
      'Emotional patterns keep triggering each other',
      '"Why are we even together"',
    ],
    dates: ['No big decisions for three days', 'Take space, regroup, then meet', 'Have the "define the relationship" talk for real'],
    tips: [
      'Accepting incompatibility is not failure',
      'Don\'t weaponize sacrifice',
      'Leaving isn\'t the tragedy — staying might be',
    ],
    roast: (a, b) => `${a} x ${b}: love isn\'t magic, and you two are the counter-example.`,
  },
};

/**
 * 兜底生成器：基于 pattern 距离自动生成配对结果
 */
export function generateFallbackCompatibility(
  type1: string,
  type2: string,
  pattern1: string = '',
  pattern2: string = '',
): Compatibility {
  const dist = patternDistance(pattern1, pattern2);
  const { verdict, score } = distanceToVerdict(dist);
  const tCN = verdictTemplatesCN[verdict];
  const tEN = verdictTemplatesEN[verdict];

  return {
    type1,
    type2,
    scorePercent: Math.round(score),
    verdict,
    summaryCN: tCN.summary(type1, type2),
    summaryEN: tEN.summary(type1, type2),
    fightsCN: [...tCN.fights],
    fightsEN: [...tEN.fights],
    dateIdeasCN: [...tCN.dates],
    dateIdeasEN: [...tEN.dates],
    relationshipTipsCN: [...tCN.tips],
    relationshipTipsEN: [...tEN.tips],
    shareableRoastCN: tCN.roast(type1, type2),
    shareableRoastEN: tEN.roast(type1, type2),
  };
}

/**
 * 查询函数：优先查表，查不到调用 fallback
 */
export function getCompatibility(
  type1: string,
  type2: string,
  pattern1?: string,
  pattern2?: string,
): Compatibility {
  const found = compatibilityData.find(
    (c) =>
      (c.type1 === type1 && c.type2 === type2) ||
      (c.type1 === type2 && c.type2 === type1),
  );
  if (found) return found;
  return generateFallbackCompatibility(type1, type2, pattern1 ?? '', pattern2 ?? '');
}
