// Long-form L3 guide content (哥飞 methodology Phase 3: L3 long-tail landing pages).
//
// Each guide targets a specific high-intent keyword identified by SERP research.
// Content is hand-written, 2000+ characters, internally linked back to /test,
// /match, and relevant /type pages. Shipped as /guide/[slug] static routes.

export interface GuideSection {
  /** H2 heading */
  heading: string;
  /** Paragraphs — each element becomes a <p>. Supports **bold** markup. */
  paragraphs: string[];
}

export interface Guide {
  slug: string;
  /** Primary keyword this page targets. Also used in H1. */
  title: string;
  /** Meta title override (defaults to `title`). */
  metaTitle?: string;
  /** Meta description — 120-160 chars, keyword-rich, click-baity. */
  metaDescription: string;
  /** Subheading below H1 shown in hero. */
  subtitle: string;
  /** ISO date string; used for schema.org datePublished. */
  datePublished: string;
  /** Primary keyword list used in <meta keywords>. */
  keywords: string[];
  /** Optional TL;DR paragraph rendered in an AI-quotable callout. */
  tldr: string;
  /** Main body — an array of H2 sections. */
  sections: GuideSection[];
  /** 5 FAQ items generating FAQPage schema at the bottom. */
  faqs: { q: string; a: string }[];
}

export const guides: Guide[] = [
  // =====================================================================
  // 1. SBTI vs MBTI — the single biggest traffic opportunity per research
  // =====================================================================
  {
    slug: 'sbti-vs-mbti',
    title: 'SBTI 和 MBTI 有什么区别？一篇讲清 16 型 vs 27 型的所有差别',
    metaTitle: 'SBTI 和 MBTI 有什么区别？2026 最新对比（27 型 vs 16 型）',
    metaDescription:
      '一篇讲清 SBTI 和 MBTI 的 7 大区别：起源、题量、类型数、算法、适用场景、稳定性、权威性。看完你就知道面试用 MBTI，朋友圈用 SBTI。2026 微博爆火后最权威的对比文。',
    subtitle: '16 型严肃心理学 vs 27 型沙雕自嘲测试，到底哪个准？哪个适合你？',
    datePublished: '2026-04-10',
    keywords: [
      'SBTI vs MBTI',
      'SBTI 和 MBTI 区别',
      'SBTI MBTI 对比',
      '沙雕人格测试 对比',
      'MBTI 替代',
      '27 型 vs 16 型',
      'SBTI vs MBTI difference',
    ],
    tldr: 'SBTI 和 MBTI 最核心的区别只有一句话：MBTI 告诉你「你是谁」，SBTI 只告诉你「你现在这个状态叫什么」。MBTI 稳定、严肃、适合写在简历上；SBTI 会变、沙雕、适合发朋友圈。两个都不是严格意义的心理学，但 SBTI 更诚实地承认自己是娱乐。一个 25 岁的打工人，白天是 MBTI 的 INTJ，深夜是 SBTI 的 DEAD——这不矛盾，这叫完整的人。',
    sections: [
      {
        heading: '一、起源：一个卖了 80 年，一个卖了 36 小时',
        paragraphs: [
          'MBTI（Myers-Briggs Type Indicator）由美国的 Katharine Cook Briggs 和她女儿 Isabel Briggs Myers 在 1940 年代基于心理学家 Carl Jung 的理论开发。商业化版本由 CPP 公司（现 Myers-Briggs Company）销售，至今已在全球商业培训、人力资源、职业咨询中使用了将近 80 年。它已经是一个成熟的商业产品，一次测试收费通常在 50-100 美元之间。',
          'SBTI（Silly Big Personality Test）是一个**一夜之间的爆款**。它诞生于 2026 年 4 月 9 日，由一位 B 站 up 主创作并发布，没有心理学背景，没有商业团队，最初只是一次恶搞自嘲的内容实验。结果测试版本在微博热搜第一、小红书和抖音病毒传播，**首日测试量破千万**。目前全网已经出现十几个 SBTI 主题的克隆站点在争抢流量。',
          '两者的"血统"决定了它们的气质：MBTI 有一层严肃心理学的包装，SBTI 从诞生第一天起就说自己"很 SB"（Silly Big）。',
        ],
      },
      {
        heading: '二、类型数：16 vs 27 的背后哲学',
        paragraphs: [
          'MBTI 有 **16 种类型**，基于 4 对二元维度组合：E/I（外向/内向）、S/N（感觉/直觉）、T/F（思考/情感）、J/P（判断/感知）。2×2×2×2 = 16。比如 INTJ、ESFP、INFP 等常见代号。',
          'SBTI 有 **27 种类型**：25 种标准类型（如 CTRL 拿捏者、BOSS 领导者、DEAD 摆烂死者、MALO 吗喽、FUCK 草者）+ 1 种兜底类型 HHHH（匹配度 <60% 时触发）+ 1 种隐藏类型 DRUNK（第 31 题选中特定选项才会出现）。',
          '为什么是 27 种？因为 SBTI 不追求"类别干净"，它追求"情绪覆盖"。MBTI 的 16 型主打"你的天生优势"，所有类型都是正面描述。SBTI 的 27 型**一半以上是负面词**——死者、草者、愤世者、摆烂者、废物——因为它要反映的是当代年轻人的真实状态，而不是一个励志模板。',
          '这就是为什么 SBTI 在微博爆火：它敢说 MBTI 不敢说的话。',
        ],
      },
      {
        heading: '三、题量和时间：93 道 vs 31 道',
        paragraphs: [
          '完整版的 MBTI 官方测试（Form M 或 Form Q）有 **93 道题**，做完大约需要 20-25 分钟。每道题强制二选一，没有中间选项。',
          'SBTI 只有 **31 道题**，做完大约 3 分钟。每题 4 个选项，覆盖 15 个维度（5 个模型 × 3 个维度）。',
          '题量差别的本质是测量精度的差别。MBTI 追求每个维度反复交叉验证，用统计学把误差降到最低；SBTI 追求"快速切片"——它不关心你今天和明天是不是同一个人，它只想知道你**此刻**是什么状态。',
          '所以如果你测 MBTI 测了 10 年都是 INTJ，这是 feature。但如果你测 SBTI 今天是 DEAD 明天是 BOSS，这也是 feature。',
        ],
      },
      {
        heading: '四、算法：二元维度 vs 15 维曼哈顿距离',
        paragraphs: [
          'MBTI 的算法很简单：4 对二元维度，每对根据你的回答加权求和，哪边得分高你就是哪边。INTJ 就是 Introversion + iNtuition + Thinking + Judging 四个维度各自占优的组合。',
          'SBTI 的算法要复杂一点：**15 维度向量 + 曼哈顿距离匹配**。系统会计算你在 15 个维度上的 H（高）/ M（中）/ L（低）分布，生成一个 15 位的 pattern 字符串（比如 DEAD 的 pattern 是 LLL-LLL-LHL-LLL-LHM）。然后用曼哈顿距离把你的 pattern 和 25 个标准类型的 pattern 做比对，距离最近的就是你的主类型。',
          '曼哈顿距离的好处是：它不是硬分类，而是软匹配。同一个人今天答的和昨天答的可能有 3 个维度不同，但算出来的类型可能只差一个。这让 SBTI 有一种"柔软"的感觉——它不会生硬地把你塞进某个盒子。',
          '当然，这个复杂度对用户完全透明。对普通人来说，SBTI 的使用体验和 MBTI 没什么区别：答题 → 出结果 → 截图分享。',
        ],
      },
      {
        heading: '五、稳定性：MBTI 求稳，SBTI 求变',
        paragraphs: [
          '这是 MBTI 和 SBTI 最根本的哲学分歧。',
          '**MBTI 追求稳定性**。它的核心主张是"人格是稳定的"——你测到 INTJ，5 年后再测应该还是 INTJ，这才叫"准"。如果你每次测都不一样，MBTI 会认为你要么答题不认真，要么测试失败。',
          '**SBTI 追求变动性**。它的核心主张是"人格是流动的"——你今天被老板骂了测到 DEAD，明天升职了测到 BOSS，这一点都不矛盾，因为它抓的就是**此刻**的状态。如果你每次测都一样，SBTI 反而会觉得你"可能压抑了自己的情绪波动"。',
          '很多人第一次接触 SBTI 会问："为什么我每次测结果都不一样？" 作者的官方回答是：**这不是 bug，是 feature**。',
        ],
      },
      {
        heading: '六、适用场景：简历 vs 朋友圈',
        paragraphs: [
          '**MBTI 适合严肃场合**：求职简历、入职背调、团队建设、职业咨询、恋爱相亲（相亲市场上 ESTP 和 INFJ 还有专门的粉丝群）。HR 看到 INTJ 会想"内敛、深度思考、适合研发"，看到 ESFP 会想"外向、灵活、适合销售"——虽然这些刻板印象不一定准，但至少 HR 能懂。',
          '**SBTI 只适合娱乐场合**：朋友圈、微博、小红书、闺蜜互测、情侣互吐槽、解压。你把 SBTI 写进简历，HR 打开一看是"DEAD 死者"、"FUCK 草者"、"SHIT 狗屎人"，可能会以为你在挑衅公司。SBTI 的作者也在 FAQ 里专门强调："别把 SBTI 放进面试材料。真的，别。"',
          '用一个类比：MBTI 是宜家家具，SBTI 是路边摊的搞笑 T 恤。场合不同，功能不同，谁都不能替代谁。',
        ],
      },
      {
        heading: '七、准确性：都不是心理学，但一个更诚实',
        paragraphs: [
          '很多人对 MBTI 有一个误解：它是科学的。事实上，**MBTI 在主流心理学界的争议非常大**——它没有通过同行评审的严格心理测量学验证，大五人格模型（Big Five / OCEAN）在学术界认可度远高于 MBTI。但因为 MBTI 商业化早、市场推广好，它在大众认知里几乎等同于"人格测试"。',
          '**SBTI 从第一天就承认自己不是心理学**。作者在 FAQ 里直接写："科学上 SBTI 不准，它是一个恶搞测试。但在情绪层面很准，因为它用的是荒诞的语言说出了很多人真实的状态。"',
          '所以真相是：MBTI 假装严肃但其实很娱乐，SBTI 直接承认自己娱乐。**哪一个更诚实？这个问题的答案你应该已经知道了。**',
          '这并不代表 MBTI 没用——它是一个非常好的"共同语言工具"，让不熟的人快速找到话题。也不代表 SBTI 取代 MBTI——它们根本不在一个赛道。',
        ],
      },
      {
        heading: '八、总结：什么情况下用哪个',
        paragraphs: [
          '经过 7 个维度的对比，可以给出一个很清楚的使用建议：',
          '**用 MBTI 的时候**：求职、职业规划、团队磨合、严肃心理自省、长期自我认知。MBTI 的优势是它能给你一个稳定的"人格身份"，让你有参照系。',
          '**用 SBTI 的时候**：刷朋友圈、闺蜜互测、情侣配对、加班崩溃后的自我解压、想发一条扎心的微博。SBTI 的优势是它能给你一个"情绪出口"，让你用荒诞原谅当下。',
          '**两个一起用**：这其实是最好的方式。你的 MBTI 是 INTJ（长期身份），你的 SBTI 是 DEAD（此刻状态），这两个标签一起贴在你身上，才是一个完整的你。',
          '想体验一下 SBTI 吗？点这里直接开始 31 道题测试：[开始 SBTI 测试 →](/test)。3 分钟出结果，免费，无需注册。测完还能和 TA 一起做配对分析。',
        ],
      },
    ],
    faqs: [
      {
        q: 'SBTI 会取代 MBTI 吗？',
        a: '不会。它们服务于完全不同的场景。MBTI 是严肃的长期人格工具，SBTI 是娱乐的此刻情绪工具。就像一张身份证和一条朋友圈动态不会互相取代一样。很多人两个都测了，并不冲突。',
      },
      {
        q: 'SBTI 比 MBTI 更准吗？',
        a: '看你怎么定义"准"。科学严谨度：MBTI 比 SBTI 更有统计学验证（虽然 MBTI 在主流心理学里争议也不小）。情绪共鸣度：SBTI 更诚实，它敢说 MBTI 不敢说的负面话。MBTI 告诉你"你的优势"，SBTI 告诉你"你的现状"——两种"准"，选你需要的那一种。',
      },
      {
        q: 'SBTI 的 27 种类型和 MBTI 的 16 种类型怎么对应？',
        a: '它们没有一一对应关系，因为两套测试用的维度不一样。MBTI 是 4 对二元维度（E/I、S/N、T/F、J/P），SBTI 是 15 个连续维度（分 5 个模型）。你可以大致类比：MBTI 的 INTJ 偏向 SBTI 的 CTRL、BOSS、MONK，MBTI 的 ESFP 偏向 SBTI 的 GOGO、SEXY、JOKE-R，但这只是粗略映射。',
      },
      {
        q: '我是 MBTI 的 INFJ，那我的 SBTI 应该是什么？',
        a: '最接近 INFJ 画像的 SBTI 类型可能是 IMSB（傻者，内心戏爆棚）、LOVE-R（多情者）或 MUM（妈妈，共情过度）。但这只是猜测，真实结果要你自己做一次 SBTI 测试才知道——而且很可能每次测都不一样。',
      },
      {
        q: 'SBTI 和 MBTI 哪个更适合情侣配对？',
        a: 'MBTI 情侣配对早就有人做了，市场很饱和；SBTI 情侣配对是 2026 年新出现的功能，全网只有 sbti-test.club 提供了完整的 27×27 = 351 对配对分析。你可以输入两个 SBTI 类型，看匹配度、最可能吵的 5 件事、约会建议和一句灵魂吐槽。娱乐价值拉满。',
      },
    ],
  },

  // =====================================================================
  // 2. What is SBTI — definition/explainer keyword
  // =====================================================================
  {
    slug: 'what-is-sbti',
    title: 'SBTI 是什么？一篇看懂 2026 微博爆火的沙雕人格测试',
    metaTitle: 'SBTI 是什么意思？2026 最新解释（附免费在线测试）',
    metaDescription:
      'SBTI 全称 Silly Big Personality Test，是 2026 年 4 月微博爆火的「反 MBTI」沙雕人格测试。27 种扎心类型，31 道题 3 分钟出结果。本文讲清 SBTI 的起源、算法、类型、用法。',
    subtitle: '起源、原理、27 种类型、适用场景——关于 SBTI 你要知道的一切',
    datePublished: '2026-04-10',
    keywords: [
      'SBTI 是什么',
      'SBTI 意思',
      'SBTI 测试',
      'Silly Big Personality Test',
      'SBTI 全称',
      'SBTI 怎么测',
      '沙雕人格测试',
      'what is SBTI',
    ],
    tldr: 'SBTI 全称 Silly Big Personality Test（傻乎乎的大人格测试），是 2026 年 4 月 9 日由一位 B 站 up 主发布的恶搞人格测试。它用 31 道题把你归到 27 种扎心人格中的一种，比如「DEAD 死者」「FUCK 草者」「CTRL 拿捏者」。名字里的 SB 是作者故意玩的梗，正体现了它"不装不严肃"的气质。首日测试量破千万，全网克隆站点十几个。本站 sbti-test.club 提供完整中英双语版本，免费无需注册。',
    sections: [
      {
        heading: 'SBTI 的字面意思：Silly Big Personality Test',
        paragraphs: [
          'SBTI 是 **Silly Big Personality Test** 的缩写，直译过来是"傻乎乎的大人格测试"。注意，这不是作者起错了名字——缩写里的"SB"是**故意**玩的谐音梗，因为它是一个"反 MBTI"的恶搞测试，作者从命名上就要和严肃心理学拉开距离。',
          '"SB"在中文互联网上是一个带娱乐色彩的骂人词（sha bi），作者在取名时已经考虑到这一点。这不是一个 bug，而是整个测试气质的一部分：**它就是要你笑着做，笑着骂，笑着分享**。',
          '如果你看到"SBTI"这四个字母觉得有点冒犯，那你已经误会了。SBTI 的核心就是让你用沙雕的外壳保护真实的情绪——它的扎心之处，恰恰在它的不正经之中。',
        ],
      },
      {
        heading: 'SBTI 从哪里来？2026 年 4 月 9 日的那次爆火',
        paragraphs: [
          'SBTI 的诞生时间非常明确：**2026 年 4 月 9 日**。作者是一位 B 站的内容创作者，最初只是做了一期搞笑视频，讲 "如果 MBTI 有一个沙雕版会是什么样"，然后在视频结尾放了一个简陋的网页链接让观众去试。',
          '第一天上午还没什么人，中午开始有人把结果截图发到微博，下午"SBTI 测试"冲上微博热搜第一，晚上服务器被挤爆。次日小红书、抖音同步爆发。**首日测试量突破千万**。',
          '爆火之后的 48 小时内，全网涌现了十几个独立域名的 SBTI 克隆站点（sbti.dev、sbti.pics、sbti.world、sbti.one、sbti.cam、sbti-test.club 等），各自以不同的 UI 和内容深度争抢流量。Wikipedia 中文版也上线了"SBTI 测试"词条。',
          '为什么突然爆？研究者普遍认为，SBTI 击中了 2026 年年轻人的一个共同情绪出口：在经历了 KPI、内卷、内耗之后，他们不想要正能量，他们想要**被看见的负面情绪**。',
        ],
      },
      {
        heading: '27 种类型到底是哪 27 种？',
        paragraphs: [
          'SBTI 一共有 27 种人格类型，分成 3 大类：',
          '**① 25 种标准类型**（通过正常答题可以匹配到）：CTRL 拿捏者、BOSS 领导者、GOGO 行者、SEXY 尤物、LOVE-R 多情者、MUM 妈妈、FAKE 伪人、OJBK 无所谓人、MALO 吗喽、JOKE-R 小丑、WOC! 握草人、THAN-K 感恩者、OH-NO 哦不人、ATM-er 送钱者、Dior-s 屌丝、THIN-K 思考者、SHIT 愤世者、ZZZZ 装死者、POOR 穷鬼、MONK 僧人、IMSB 傻者、SOLO 孤儿、FUCK 草者、DEAD 死者、IMFW 废物。',
          '**② 1 种兜底类型 HHHH 傻乐者**：当你的测试匹配度低于 60% 时，系统会把你归入这里。HHHH 的含义是"你的灵魂太复杂，标准算法无法精确定位"——它不是失败，是"超纲"。',
          '**③ 1 种隐藏类型 DRUNK 酒鬼**：只有在第 31 题（关于周五晚上的问题）选中"连干三杯/借酒浇愁"之类的特定选项才会触发。这是作者为一位爱酗酒的朋友专门设计的彩蛋类型，带有温和劝诫的含义。',
          '想一次看完所有 27 种类型的详细介绍？访问：[27 种 SBTI 人格完整图鉴 →](/types)',
        ],
      },
      {
        heading: 'SBTI 的算法原理',
        paragraphs: [
          'SBTI 的算法核心是 **15 维人格向量 + 曼哈顿距离匹配**。听起来很复杂，但其实可以拆成 4 步：',
          '**第 1 步 · 答题**：31 道题，覆盖 15 个心理维度（5 个模型 × 3 个维度）。每题 4 个选项，每个选项对 1-2 个维度打分。',
          '**第 2 步 · 打分**：所有题答完后，系统计算你在 15 个维度上的 H（高）/ M（中）/ L（低）分布，生成一个 15 位的 pattern 字符串。比如 DEAD 死者的 pattern 是 LLL-LLL-LHL-LLL-LHM，意思是 15 维度里绝大多数都是 L（低能量）。',
          '**第 3 步 · 匹配**：用曼哈顿距离算法，把你的 pattern 和 25 个标准类型的 pattern 做比对，距离最近的就是你的主类型。',
          '**第 4 步 · 兜底与隐藏**：如果所有距离都太远（匹配度 <60%），系统归入 HHHH。如果第 31 题选中隐藏选项，强制触发 DRUNK。',
          '想立刻体验？[开始 SBTI 测试 →](/test)',
        ],
      },
      {
        heading: 'SBTI 适合做什么？不适合做什么？',
        paragraphs: [
          '**适合**：自嘲解压、朋友圈分享、闺蜜互测、情侣配对、微博小红书发段子、写日记时吐槽自己今天是哪种状态。',
          '**不适合**：写简历、面试背调、严肃心理咨询、恋爱相亲市场定位、职业规划参考。作者在 FAQ 里原话说："SBTI 是娱乐测试，结果里有\'死者\'、\'废物\'、\'草者\'这种词，你拿去面试简历里能把 HR 吓死。"',
          '简单来说：**SBTI 是给你笑的，不是给你用的**。',
        ],
      },
      {
        heading: '和 MBTI 的对比',
        paragraphs: [
          '这是最多人问的问题，所以我们专门写了一篇对比长文：[SBTI 和 MBTI 有什么区别 →](/guide/sbti-vs-mbti)',
          '一句话总结：**MBTI 告诉你你是谁，SBTI 告诉你你现在是什么状态**。一个追求稳定，一个追求变动。一个写在简历上，一个发在朋友圈里。两个都不是严格心理学，但 SBTI 更诚实。',
        ],
      },
    ],
    faqs: [
      {
        q: 'SBTI 是什么？一句话解释',
        a: 'SBTI 是 Silly Big Personality Test 的缩写，是 2026 年 4 月微博爆火的沙雕版 MBTI。用 31 道题把你归到 27 种扎心人格中的一种，比如死者 DEAD、草者 FUCK、拿捏者 CTRL。100% 娱乐，0% 心理学，但扎心程度远超 MBTI。',
      },
      {
        q: 'SBTI 的作者是谁？',
        a: 'SBTI 由一位 2026 年 4 月发布的 B 站 up 主创作，最初只是一期恶搞视频的附属测试页，结果因为命中当代年轻人的情绪出口而一夜爆火。作者本人没有心理学背景，也没有商业团队，这个测试完全是一次"反 MBTI"的情绪实验。',
      },
      {
        q: '为什么 SBTI 叫 "SB"？',
        a: 'SBTI 全称是 Silly Big Personality Test，首字母 SB 是作者故意玩的谐音梗。"SB" 在中文互联网上带有娱乐色彩的调侃含义，这正体现了 SBTI 的气质——不装严肃，不装高端，直接用沙雕的外壳保护真实的情绪。',
      },
      {
        q: '做一次 SBTI 测试要多久？',
        a: '大约 3 分钟。31 道题，每题 4 个选项，答完就出结果。完全免费，无需注册，无需登录，无广告打扰。可以直接截图发朋友圈。',
      },
      {
        q: 'SBTI 能相信吗？准不准？',
        a: '科学上不准——SBTI 不是一个经过心理学验证的人格评估工具，它明确承认自己是恶搞测试。但在情绪层面很准，因为它用荒诞的语言说出了很多人真实的状态。把它当心理学看就输了，把它当解压工具就赢了。',
      },
    ],
  },
];

export const guidesBySlug: Record<string, Guide> = Object.fromEntries(
  guides.map((g) => [g.slug, g]),
);
