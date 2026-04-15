// SEO 长文本 + 页面文案
// 首页 / 配对页 / 总览页的中英双语内容

export interface FAQItem {
  q: string;
  a: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCTA: string;
  introSection: string;
  whatIsSBTI: string;
  howItWorks: string;
  whyViral: string;
  vsMBTI: string;
  faqs: FAQItem[];
  ctaBottom: string;
}

export interface MatchPageContent {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  howToUse: string;
  sampleResults: string;
  faqs: FAQItem[];
}

export interface TypesPageContent {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  categoryIntros: {
    self: string;
    emotion: string;
    attitude: string;
    action: string;
    social: string;
  };
}

export const seoContent = {
  home: {
    zh: {
      heroTitle: 'SBTI 沙雕人格测试',
      heroSubtitle: '免费 SBTI 沙雕人格测试 · 27 种扎心类型 · 情侣配对 · 3 分钟出结果',
      heroCTA: '立刻开始测试',
      introSection:
        'SBTI（Silly Big Personality Test）是 2026 年微博爆火的「反 MBTI」沙雕人格测试。不同于 MBTI 的严肃心理学包装，SBTI 用 31 道题把你拍成 27 种荒诞人格之一——可能是「死者 DEAD」、「吗喽 MALO」、「草者 FUCK」、「拿捏者 CTRL」或「狗屎人 SHIT」。没有科学性，100% 纯娱乐，但测完笑着笑着就哭了。本站提供完整的 SBTI 在线测试、27 种类型深度解读、情侣/朋友 SBTI 配对、SBTI vs MBTI 对比、以及按 SBTI 类型推荐的电影/歌单/活动/礼物。免费无注册，中英双语，3 分钟出结果。',
      whatIsSBTI:
        'SBTI 全称 Silly Big Personality Test（傻乎乎的大人格测试），是一个以 MBTI 为框架的恶搞人格测试，2026 年 4 月由一位 B 站 up 主创作并上线，因为名字里的「SB」和内容的扎心自嘲风格迅速在微博、小红书、抖音引爆。首日测试量突破千万。\n\nSBTI 和 MBTI 最大的区别是：MBTI 试图告诉你「你是谁」，SBTI 只告诉你「你现在这个状态叫什么」。SBTI 不追求稳定性——同一个人今天测到 DEAD（摆烂），明天可能就变成 GOGO（冲锋）。它的价值不在分类，而在「让你用一个荒诞的标签原谅当下的自己」。\n\n27 种类型包括：CTRL 拿捏者、BOSS 领导者、GOGO 行者、SEXY 尤物、LOVE-R 多情者、MUM 妈妈、FAKE 伪人、OJBK 无所谓人、MALO 吗喽、JOKE-R 小丑、WOC! 握草人、THAN-K 感恩者、OH-NO 哦不人、ATM-er 送钱者、Dior-s 屌丝、THIN-K 思考者、SHIT 愤世者、ZZZZ 装死者、POOR 穷鬼、MONK 僧人、IMSB 傻者、SOLO 孤儿、FUCK 草者、DEAD 死者、IMFW 废物、HHHH 傻乐者（兜底）、DRUNK 酒鬼（隐藏）。\n\n本站的 SBTI 测试是完整版：31 道真实问题，15 个心理维度评分，曼哈顿距离匹配 25 个标准类型 + 1 个兜底 + 1 个隐藏。无需注册，无需付费，无广告打扰。',
      howItWorks:
        'SBTI 测试的原理是这样的：31 道题覆盖 15 个维度（自我 3 维 + 情感 3 维 + 态度 3 维 + 行动 3 维 + 社交 3 维）。每题 4 个选项，每个选项对 1-2 个维度打分。全部答完后，系统计算你在 15 个维度上的 H（高）/M（中）/L（低）分布，生成一个 15 位的 pattern 字符串（比如 LLL-LLL-LHL-LLL-LHM 就是 DEAD）。然后用曼哈顿距离算法把你的 pattern 和 25 个标准类型的 pattern 做比对，距离最近的就是你的主类型。如果距离都太远（匹配度低于 60%），系统会把你归入兜底类型 HHHH。如果你在第 31 题（隐藏题）选中特定选项，会强制触发隐藏类型 DRUNK。',
      whyViral:
        'SBTI 爆火的原因不是算法，是**情绪**。在一个到处都是 KPI、焦虑、内卷、鸡汤的时代，年轻人需要的不是「你的优势是共情」这种正能量洗白，而是「你是 DEAD，最近状态很差也没关系」这种被看见的感觉。SBTI 的标签全是负面词——死者、草者、穷鬼、废物、吗喽——但正因为它们够狠，才够真实。当一个 25 岁的打工人测到 DEAD，她不会生气，她会笑着截图发朋友圈配文「救命这比算命还准」。这是一种**自嘲式解压**。SBTI 的本质是：用荒诞的外壳，保护年轻人脆弱的真实感受。',
      vsMBTI:
        'SBTI vs MBTI 的核心区别：\n\n**MBTI**：严肃心理学包装，16 种类型，强调稳定性和「你的天生优势」。适合职场人格定位、求职简历、招聘评估。\n\n**SBTI**：恶搞风格，27 种类型，强调当下状态和「你的现在有点烂」。适合自嘲解压、社交分享、朋友互测。\n\nMBTI 告诉你「你是 INFJ，富有共情力和使命感」。SBTI 告诉你「你是 IMSB，脑子里 24 小时在开庭」。哪一个更准？看你今天想听什么。\n\n很多人两个都测了——白天的你是 MBTI 的 INTJ，深夜的你是 SBTI 的 DEAD。这并不矛盾，这叫**完整的人**。',
      faqs: [
        {
          q: 'SBTI 是什么？',
          a: 'SBTI 全称 Silly Big Personality Test，是 2026 年爆火的「反 MBTI」沙雕人格测试。用 31 道题把你归到 27 种荒诞人格类型中的一种，比如死者 DEAD、吗喽 MALO、草者 FUCK。没有科学性，100% 娱乐，但扎心程度远超 MBTI。',
        },
        {
          q: 'SBTI 测试准吗？',
          a: '科学上不准——SBTI 不是一个经过心理学验证的人格评估工具，它是一个恶搞测试。但在情绪层面很准——因为它用的是荒诞的语言说出了很多人真实的状态。把它当心理学看就输了，把它当解压工具就赢了。',
        },
        {
          q: '为什么我每次测 SBTI 结果都不一样？',
          a: '这不是 bug，是 feature。SBTI 测量的不是「你是什么人」，而是「你现在是什么状态」。你今天被老板骂了可能测到 DEAD，明天升职了可能测到 BOSS。人的状态是流动的，SBTI 只是抓取了你答题那一瞬间的切片。想要稳定性？去测 MBTI。',
        },
        {
          q: 'SBTI 一共有多少种人格？',
          a: '27 种：25 种标准类型（CTRL、BOSS、GOGO、SEXY、LOVE-R、MUM、FAKE、OJBK、MALO、JOKE-R、WOC!、THAN-K、OH-NO、ATM-er、Dior-s、THIN-K、SHIT、ZZZZ、POOR、MONK、IMSB、SOLO、FUCK、DEAD、IMFW）+ 1 种兜底类型 HHHH（匹配度<60% 时触发）+ 1 种隐藏类型 DRUNK（选中特定选项时触发）。',
        },
        {
          q: 'SBTI 和 MBTI 有什么区别？',
          a: 'MBTI 是严肃心理学包装的 16 型人格测试，强调稳定性和优势。SBTI 是恶搞版的 27 型人格测试，强调当下状态和扎心自嘲。MBTI 适合求职简历，SBTI 适合朋友圈分享。两个都不是真正的心理学诊断，但 SBTI 更诚实地承认自己是娱乐。',
        },
        {
          q: '如何测出隐藏的 DRUNK 人格？',
          a: 'DRUNK 是 SBTI 的隐藏类型，需要在第 31 题（关于周五晚上的选项）选中「连干三杯/借酒浇愁」之类的特定选项才会触发。这个类型是作者专门设计给一位爱酗酒的朋友的，带有温和劝诫意味——如果你测到了 DRUNK，请认真考虑一下你和酒精的关系。',
        },
        {
          q: 'SBTI 免费吗？',
          a: '完全免费。本站的 SBTI 测试、27 种类型深度解读、情侣配对、推荐内容全部免费，无需注册，无广告打扰。未来可能会推出可选的 AI 深度报告等增值服务，但基础测试永远免费。',
        },
        {
          q: '测到 DEAD/FUCK/SHIT 这种负面类型正常吗？',
          a: '完全正常。SBTI 的 27 种类型里有至少一半是「负面」的，因为它反映的是当代年轻人的真实状态——累、迷茫、愤怒、摆烂、自嘲。这些不是病，是时代情绪。测到负面类型不代表你有问题，代表你诚实。',
        },
        {
          q: 'SBTI 结果能用在工作/面试吗？',
          a: '别。认真的，**别**。SBTI 是娱乐测试，结果里有「死者」、「废物」、「草者」这种词，你拿去面试简历里能把 HR 吓死。SBTI 适合朋友间互测、社交分享、自我解压，不适合任何正式场合。',
        },
        {
          q: 'SBTI 和情侣配对怎么用？',
          a: '本站提供 SBTI 情侣/朋友配对器。你和对方各自测完 SBTI 后，输入两人的类型代号，就能看到你们的匹配度百分比、最可能吵的 5 件事、约会建议、相处 tips 和一段可分享的吐槽文案。适合情侣互测、闺蜜互测、同事互测——只要你能承受真相。',
        },
        {
          q: '27 种类型的 pattern 字符串是什么意思？',
          a: '每个类型对应一个 15 位的 H/M/L pattern，代表它在 15 个心理维度上的特征。比如 DEAD 的 pattern 是 LLL-LLL-LHL-LLL-LHM，意思是 15 维度里绝大多数都是 L（低能量）。这个 pattern 用曼哈顿距离和你的测试结果比对，距离最近的类型就是你的匹配结果。',
        },
      ],
      ctaBottom: '现在就开始测一下，看看你今天是 27 种 SBTI 里的哪一种。',
    },
    en: {
      heroTitle: 'SBTI Personality Test',
      heroSubtitle: 'Free Silly Big Personality Test · 27 viral types · couple matcher · 3-minute result',
      heroCTA: 'Start the SBTI Test',
      introSection:
        "SBTI (Silly Big Personality Test) is the 2026 viral anti-MBTI personality test. Instead of MBTI's serious psychological framing, SBTI uses 31 questions to brand you one of 27 absurd personality types — DEAD, MALO (the rebel monkey), FUCK (the wildling), CTRL (the controller), SHIT (the cynic), and 22 more. Zero science, 100% entertainment, but you'll laugh-cry by the end. This site offers the full SBTI test, deep interpretations of all 27 types, couple/friend compatibility, SBTI vs MBTI comparison, and type-based movie/music/activity/gift recommendations. Free, no signup, bilingual, 3-minute result.",
      whatIsSBTI:
        "SBTI stands for Silly Big Personality Test — an MBTI-framed parody personality quiz created by a Bilibili creator in April 2026. The name itself (SB + TI) is part of the joke. It went viral overnight on Weibo, Xiaohongshu, and TikTok because the tone hits a nerve: instead of motivational self-help, SBTI tells you 'you're DEAD (burned out), and it's okay.'\n\nThe biggest difference between SBTI and MBTI: MBTI tries to tell you who you are. SBTI only tells you what state you're in right now. SBTI doesn't chase stability — the same person can test as DEAD today and BOSS tomorrow. Its value isn't classification, it's permission to forgive your current self with an absurd label.\n\nThe 27 types: CTRL (Controller), BOSS (Leader), GOGO (Doer), SEXY (Enchanter), LOVE-R (Romantic), MUM (Nurturer), FAKE (Chameleon), OJBK (Whatever), MALO (Rebel Monkey), JOKE-R (Clown), WOC! (Astounded), THAN-K (Grateful), OH-NO (Guardian), ATM-er (Giver), Dior-s (Realist), THIN-K (Thinker), SHIT (Grumbler), ZZZZ (Dormant), POOR (Broke), MONK (Monk), IMSB (Overthinker), SOLO (Lone Wolf), FUCK (Wildling), DEAD (Departed), IMFW (Self-Crusher), HHHH (Wildcard fallback), DRUNK (hidden).",
      howItWorks:
        "The SBTI algorithm: 31 questions cover 15 psychological dimensions (3 self + 3 emotion + 3 attitude + 3 action + 3 social). Each question has 4 options, each scoring 1-2 dimensions. After all answers, the system computes your H (high) / M (medium) / L (low) distribution across the 15 dimensions, generating a 15-char pattern string (e.g. LLL-LLL-LHL-LLL-LHM = DEAD). It then uses Manhattan distance to match your pattern against 25 standard type patterns — the closest wins. If all distances are too high (match < 60%), you fall back to HHHH (The Wildcard). If you select a specific option in question 31 (hidden), DRUNK is force-triggered.",
      whyViral:
        "SBTI went viral not because of the algorithm, but because of the **emotion**. In an era of KPIs, anxiety, hustle culture, and motivational slop, young people don't want 'your superpower is empathy.' They want 'you're DEAD, it's okay to be a mess right now.' SBTI's labels are brutal — dead, trash, broke, clown — but the brutality is exactly what makes them feel true. When a 25-year-old tests as DEAD, she doesn't get angry. She screenshots it and posts 'OMG this is scarier than horoscope.' This is **self-deprecating decompression**. SBTI's real function: use an absurd shell to protect the fragile real feelings underneath.",
      vsMBTI:
        "SBTI vs MBTI — the core difference:\n\n**MBTI**: serious psychological framing, 16 types, stability-focused, 'your natural strengths.' Good for resumes, corporate assessments.\n\n**SBTI**: parody tone, 27 types, state-focused, 'your current situation is kind of cooked.' Good for self-roasting, social sharing, friend-testing.\n\nMBTI says 'you're INFJ, empathetic and purpose-driven.' SBTI says 'you're IMSB, your inner monologue runs 24/7.' Which is more accurate? Depends what you need to hear today.\n\nMany people take both: daytime you is MBTI's INTJ, 2am you is SBTI's DEAD. Not a contradiction. That's a **whole human**.",
      faqs: [
        {
          q: 'What is SBTI?',
          a: 'SBTI stands for Silly Big Personality Test — the 2026 viral anti-MBTI parody test. It uses 31 questions to assign you one of 27 absurd personality types (DEAD, MALO, FUCK, etc.). Zero science, 100% entertainment — but it hits harder than MBTI emotionally.',
        },
        {
          q: 'Is the SBTI test accurate?',
          a: "Scientifically? No — SBTI is not a validated psychological instrument, it's a parody. Emotionally? Often scary-accurate, because it uses absurd labels to name real states most people are afraid to name. Take it as psychology and you lose; take it as decompression and you win.",
        },
        {
          q: 'Why do I get different results every time?',
          a: "It's not a bug, it's a feature. SBTI measures not 'who you are' but 'what state you're in right now.' Yelled at by your boss? You might test DEAD. Just got promoted? Could be BOSS. Human states are fluid; SBTI just snapshots the moment you answered. Want stability? Take MBTI.",
        },
        {
          q: 'How many SBTI personality types are there?',
          a: '27 total: 25 standard types (CTRL, BOSS, GOGO, SEXY, LOVE-R, MUM, FAKE, OJBK, MALO, JOKE-R, WOC!, THAN-K, OH-NO, ATM-er, Dior-s, THIN-K, SHIT, ZZZZ, POOR, MONK, IMSB, SOLO, FUCK, DEAD, IMFW), plus 1 fallback (HHHH, triggered when match < 60%), plus 1 hidden (DRUNK, triggered by a specific option).',
        },
        {
          q: 'What is the difference between SBTI and MBTI?',
          a: "MBTI is a serious 16-type personality framework emphasizing stability and natural strengths. SBTI is the parody 27-type version emphasizing present state and self-deprecation. MBTI is for resumes; SBTI is for group chats. Neither is real psychology — but SBTI is honest about being a joke.",
        },
        {
          q: 'How do I trigger the hidden DRUNK type?',
          a: "DRUNK is the hidden type, triggered only when you select a specific heavy-drinking option in question 31 (the Friday night question). The author designed this type specifically for a friend with drinking issues, as a gentle warning. If you got DRUNK, please honestly reflect on your relationship with alcohol.",
        },
        {
          q: 'Is SBTI free?',
          a: "100% free. The test, all 27 deep interpretations, the couple matcher, and the recommendations are all free, no signup, no paywalls. Premium add-ons (AI deep reports) may come later, but the base test will always stay free.",
        },
        {
          q: 'Is it bad to get a negative SBTI type like DEAD or SHIT?',
          a: "Totally normal. At least half of SBTI's 27 types are 'negative' because they reflect the real state of modern young people: exhausted, lost, angry, numb. They aren't disorders — they're era-moods. Testing as a negative type doesn't mean something's wrong with you. It means you were honest.",
        },
        {
          q: 'Can I use my SBTI result on my resume or in interviews?',
          a: "Please don't. Seriously. The 27 types include 'The Departed,' 'The Broke,' 'The Wildling' — HR will not know how to react. SBTI is for group chats, not cover letters. Use MBTI for professional contexts.",
        },
        {
          q: 'How does the SBTI couple matcher work?',
          a: "Both of you take the SBTI test separately, then enter both type codes in our couple matcher. You'll get a compatibility percentage, the 5 things you're most likely to fight about, date ideas, relationship tips, and a shareable roast line. Great for couples, best friends, or even coworkers — if you can handle the truth.",
        },
        {
          q: 'What do the 15-letter pattern strings mean?',
          a: "Each SBTI type has a 15-character H/M/L pattern representing its profile across 15 psychological dimensions. For example, DEAD is LLL-LLL-LHL-LLL-LHM — mostly low energy. The algorithm uses Manhattan distance between your answer pattern and each type's pattern to find your closest match.",
        },
      ],
      ctaBottom: 'Take the test now. See which of the 27 SBTI types you are today.',
    },
  },

  match: {
    zh: {
      title: 'SBTI 情侣配对 - 测测你们的匹配度',
      description: '免费 SBTI 情侣/朋友配对器。输入两人的 SBTI 类型，一键生成匹配度、最可能吵的 5 件事、约会建议、相处 tips 和可分享吐槽文案。',
      heroTitle: 'SBTI 情侣配对',
      heroSubtitle: '输入你和 TA 的 SBTI 类型，看你们的匹配度、最可能吵的 5 件事，以及能不能走到最后',
      intro:
        'SBTI 情侣配对是本站的独家功能。你和对方各自测完 SBTI 后，输入两人的类型代号（比如 DEAD + MALO），配对器会基于 15 维人格向量计算匹配度百分比，并给出：① 5 件你们最可能吵的事；② 3 条约会建议；③ 3 条相处 tips；④ 一段可分享到朋友圈的吐槽文案。适合情侣互测、闺蜜互测、同事互测——前提是你能承受真相。MBTI 配对早就有人做了，但 SBTI 配对这个赛道还是蓝海——你测到 CTRL 配 MALO 时能看到的一句话吐槽是「一个要征服世界，一个觉得世界不值得」。这种诚实是 MBTI 给不了你的。',
      howToUse:
        '使用方法很简单：1) 你和 TA 各自先测一次 SBTI（3 分钟）；2) 回到这个页面，在下拉框选你的类型和 TA 的类型；3) 点"生成配对报告"；4) 查看匹配度百分比、5 件吵架事项、约会建议、相处 tips；5) 截图分享到朋友圈/小红书/微博，让大家看看你们的「扎心程度」。',
      sampleResults:
        '示例结果预览：如果你是 DEAD + TA 是 MALO，你们的匹配度是 88%（destiny 级）。你们最可能吵的第一件事是「谁先站起来去关灯」。吐槽一句：「DEAD 配 MALO：我们的爱情很稳定，因为我们都没有力气离开。」',
      faqs: [
        {
          q: 'SBTI 配对的匹配度是怎么算的？',
          a: '基于 15 维人格向量的曼哈顿距离。两个类型在 15 个心理维度（自我、情感、态度、行动、社交）上的向量差越小，匹配度越高。同时我们内嵌了编辑精选的配对解读——最合适的组合给 destiny（>85%），最相冲的组合给 doomed（<35%）。',
        },
        {
          q: '匹配度低就一定不适合吗？',
          a: '不一定。SBTI 是恶搞测试，它测量的是当下状态而不是人的本质。匹配度低可能意味着你们短期会吵架，但长期能互补。MBTI 配对数据显示很多稳定婚姻都是"互补型"——一个强一个弱，一个内向一个外向。匹配度只是一个参考指标，不是判决书。',
        },
        {
          q: '可以用来测和前任/暗恋对象的关系吗？',
          a: '完全可以。本站的配对器不需要注册，不保留数据，输入两个代号就能算。很多人用它来回顾前任关系为什么没走到最后，或者预演和暗恋对象的潜在冲突点。',
        },
        {
          q: '三个人或者一群人可以一起测吗？',
          a: '目前配对器只支持两人对比。未来我们会推出"团体画像"功能，支持 3-10 人的团队/朋友圈分析——敬请期待。',
        },
        {
          q: '情侣配对结果可以截图分享吗？',
          a: '当然，而且我们鼓励你分享。每个配对结果页下方都有"分享卡"按钮，一键生成适合小红书/朋友圈的精美图片，带有你们的匹配度、主要吵架点和那一句灵魂吐槽。',
        },
      ],
    },
    en: {
      title: 'SBTI Compatibility - Test Your Couple Match',
      description: 'Free SBTI couple / friend compatibility matcher. Enter two SBTI types to get match percentage, 5 likely fights, date ideas, relationship tips, and a shareable roast line.',
      heroTitle: 'SBTI Couple Matcher',
      heroSubtitle: "Enter your SBTI type and theirs. See the match score, the 5 things you'll fight about, and whether you'll last.",
      intro:
        "The SBTI couple matcher is this site's signature feature. After both of you take the SBTI test, enter the two type codes (e.g. DEAD + MALO) and the matcher uses 15-dimension personality vectors to compute a match percentage — plus: 5 things you're most likely to fight about, 3 date ideas, 3 relationship tips, and one shareable roast line for your feed. Works for couples, best friends, or coworkers — if you can handle the truth. MBTI couple matchers are common; SBTI couple matching is a blue ocean. When you try CTRL + MALO, you get the line 'one wants to conquer the world, one thinks the world isn't worth it.' MBTI doesn't give you that kind of honesty.",
      howToUse:
        "How to use: 1) Both of you take the SBTI test first (3 minutes each); 2) Come back here; 3) Select both type codes from the dropdowns; 4) Click 'Generate Match Report'; 5) View the match percentage, 5 likely fights, date ideas, relationship tips; 6) Screenshot and share to your feed — let your followers see the savagery.",
      sampleResults:
        "Example preview: if you're DEAD and they're MALO, the match score is 88% (destiny level). The first thing you'll fight about is 'who gets up to turn off the light.' The shareable roast: 'DEAD + MALO — our love is stable because neither of us has the energy to leave.'",
      faqs: [
        {
          q: 'How is SBTI compatibility calculated?',
          a: "Based on Manhattan distance between two types' 15-dimension personality vectors. Smaller distance = higher match percentage. We also embedded hand-picked compatibility interpretations — the best combos get 'destiny' (>85%), the worst 'doomed' (<35%).",
        },
        {
          q: 'Does a low match score mean we\'re incompatible?',
          a: "Not necessarily. SBTI is a parody test measuring current state, not deep essence. Low matches may mean short-term fights but long-term complementarity. Many stable marriages are 'complementary' pairs — one strong, one soft; one introvert, one extrovert. Treat the score as a reference, not a verdict.",
        },
        {
          q: 'Can I use this to analyze my ex or a crush?',
          a: "Absolutely. The matcher requires no signup and stores no data — just enter two type codes. Many people use it to understand why a past relationship didn't work, or to preview potential conflicts with someone they like.",
        },
        {
          q: 'Can three or more people test together?',
          a: "The current matcher only supports 2-person compatibility. A 'group portrait' feature for 3-10 people (teams / friend circles) is coming soon.",
        },
        {
          q: 'Can I share the compatibility result?',
          a: "Yes — we encourage it. Every result page has a 'Share Card' button that generates a polished image with your match score, key fights, and the roast line, formatted for Instagram / Weibo / Xiaohongshu.",
        },
      ],
    },
  },

  types: {
    zh: {
      title: '27 种 SBTI 人格类型完整图鉴（2026 最全）',
      description: '你是 DEAD 还是 CTRL？2026 最全 SBTI 27 种人格图鉴：每种类型配 15 维雷达图 + 情侣配对 + 名人代表。找到你的扎心类型 →',
      heroTitle: '全部 27 种 SBTI 人格类型',
      heroSubtitle: '从 CTRL 到 DRUNK，这是 SBTI 的完整灵魂图鉴',
      intro:
        'SBTI 一共有 27 种人格类型，分为 3 个大类：① 25 种标准类型（可以通过常规答题匹配到）；② 1 种兜底类型 HHHH「傻乐者」——当你的测试匹配度低于 60% 时，系统会把你归入这里，意味着你的灵魂太复杂，标准算法无法精确定位；③ 1 种隐藏类型 DRUNK「酒鬼」——只有在第 31 题选中特定选项才会触发，是作者专门为一位爱酗酒的朋友设计的彩蛋类型。\n\n27 种类型按照 5 个心理维度组（自我、情感、态度、行动、社交）可以进一步分类。有些类型偏自我（如 BOSS、CTRL、MONK），有些偏情感（如 LOVE-R、MUM、IMSB），有些偏态度（如 FUCK、SHIT、MALO），有些偏行动（如 GOGO、DEAD、ZZZZ），有些偏社交（如 SEXY、JOKE-R、SOLO）。下面你可以浏览所有 27 种类型，点进去看每一种的深度解读。\n\n提醒一下：SBTI 不是心理学诊断，它只是一个把当代年轻人的真实状态用荒诞标签重新命名的娱乐工具。看到 "死者"、"废物"、"草者" 这种词不要生气——它们只是帮你笑一下自己。真正的你比任何一个标签都复杂。',
      categoryIntros: {
        self: '自我模型类型：BOSS、CTRL、MONK、IMFW 等。这些类型的核心特征是他们与自己的关系——自信、清晰度、核心价值。有的对自己下手很狠（IMFW），有的对自己非常笃定（BOSS）。',
        emotion: '情感模型类型：LOVE-R、MUM、IMSB、ATM-er 等。这些类型在情感维度上能量很高，要么是极度付出（MUM、ATM-er），要么是极度投入（LOVE-R），要么是极度内耗（IMSB）。',
        attitude: '态度模型类型：FUCK、SHIT、MALO、OJBK 等。这些类型的核心特征是他们对世界的态度——有的叛逆（FUCK），有的愤世（SHIT），有的躺平（MALO、OJBK）。',
        action: '行动模型类型：GOGO、DEAD、ZZZZ、POOR 等。这些类型的核心特征是他们的行动力谱系——GOGO 是执行机器，DEAD 和 ZZZZ 是低电量待机，POOR 是被经济压力消耗。',
        social: '社交模型类型：SEXY、JOKE-R、SOLO、WOC! 等。这些类型在社交维度上有鲜明特征——SEXY 自带聚光灯，JOKE-R 用笑话维持关系，SOLO 主动远离人群。',
      },
    },
    en: {
      title: 'All 27 SBTI Personality Types',
      description: 'Complete list of all 27 SBTI personality types: CTRL, BOSS, DEAD, MALO, FUCK and 20 more standard types + HHHH fallback + DRUNK hidden. Each type includes deep interpretation, 15-dimension radar chart, compatibility and movie/music recommendations.',
      heroTitle: 'All 27 SBTI Personality Types',
      heroSubtitle: 'From CTRL to DRUNK — the complete SBTI soul atlas',
      intro:
        "SBTI has 27 personality types total, split into 3 categories: ① 25 standard types (reachable through regular answers); ② 1 fallback type HHHH 'The Wildcard' — when your test match drops below 60%, the system routes you here, meaning your soul is too complex for the standard algorithm to pin down; ③ 1 hidden type DRUNK 'The Lush' — triggered only by selecting a specific option in question 31, an easter egg the author designed for a friend with drinking issues.\n\nThe 27 types can be further grouped by the 5 psychological dimension categories (self, emotion, attitude, action, social). Some are self-focused (BOSS, CTRL, MONK), some emotion-focused (LOVE-R, MUM, IMSB), some attitude-focused (FUCK, SHIT, MALO), some action-focused (GOGO, DEAD, ZZZZ), some social-focused (SEXY, JOKE-R, SOLO). Browse them all below and click into any type for the deep interpretation.\n\nReminder: SBTI is not a clinical diagnosis. It's a decompression toy that re-labels real young-adult states in absurd terms. When you see 'The Departed' or 'The Wildling,' don't get offended — they exist to let you laugh at yourself. You are more complex than any single label.",
      categoryIntros: {
        self: 'Self-model types: BOSS, CTRL, MONK, IMFW. These types are defined by their relationship with themselves — self-confidence, self-clarity, core values. Some are harsh on themselves (IMFW), some are rock-solid certain (BOSS).',
        emotion: 'Emotion-model types: LOVE-R, MUM, IMSB, ATM-er. These types run high on emotional dimensions — either extreme giving (MUM, ATM-er), extreme romantic investment (LOVE-R), or extreme inner spiral (IMSB).',
        attitude: "Attitude-model types: FUCK, SHIT, MALO, OJBK. These types are defined by their stance toward the world — rebellious (FUCK), cynical (SHIT), flatlined (MALO, OJBK).",
        action: 'Action-model types: GOGO, DEAD, ZZZZ, POOR. These types sit along the execution spectrum — GOGO is the action machine, DEAD/ZZZZ are low-battery standby, POOR is drained by economic pressure.',
        social: 'Social-model types: SEXY, JOKE-R, SOLO, WOC!. These types have distinctive social signatures — SEXY owns the spotlight, JOKE-R maintains relationships through humor, SOLO actively stays away from crowds.',
      },
    },
  },
};
