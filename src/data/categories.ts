export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  desc: string;
  tagline: string;
  emoji: string;
  badge: string;
  color: string;
  sortDimension: string;
  criteria: string[];
  seoTitle: string;
  seoDesc: string;
  seoGuide: string;
  highlights: string[];
  faqs: CategoryFaq[];
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  iplc: {
    id: 'iplc',
    name: '纯 IPLC 专线',
    desc: '最稳不走公网',
    tagline: '点对点物理内网直连 · 晚高峰 0% 丢包 · 极限带宽狂飙',
    emoji: '🔒',
    badge: '👑 骨干专线旗舰',
    color: 'sky',
    sortDimension: '专线极限实测峰值带宽降序（Mbps ⬇）',
    criteria: [
      '物理内网点对点传输，不经 GFW',
      '晚高峰实测下行带宽 ≥ 880Mbps',
      '千次 ICMP 丢包率趋近 0.00%'
    ],
    seoTitle: '纯 IPLC / IEPL 专线机场梯子推荐 · 2026 最稳不走公网节点评测 - 节点实验室',
    seoDesc: '精选 2026 年最稳定的纯 IPLC/IEPL 内网专线机场梯子。点对点物理内网直连，全程不经过公网 GFW，晚高峰 0 丢包、超低延迟，无惧敏感期封锁。',
    seoGuide: '什么是 IPLC 纯物理专线？IPLC（International Private Leased Circuit，国际私有租用线路）是跨国电信运营商提供的端到端点对点内网专用通信信道。与普通公网中继和 BGP 隧道不同，IPLC 专线的数据流量在国内骨干网汇聚后，直接借由专用内网陆缆或海缆直达境外机房 POP 节点，通信路径物理绕过公网 GFW 防火墙审查入口与国际公网出口拥堵。无论外界网络波动如何剧烈，IPLC 专线都能维持 0% 极低丢包率与毫秒级延迟稳定性。本专题严格按照“专线极限实测峰值速度”排序，仅精选 4 款真正具备大带宽物理专线架构的顶级机皇，适合对网络高可用性有刚性需求的跨国科研、商务外贸及极客用户。',
    highlights: [
      '全程内网点对点传输，物理绕过 GFW 防火墙过滤',
      '晚高峰 20:30~22:30 实测丢包率趋近 0.00%',
      '单节点峰值最高支持 2.5Gbps 超大带宽吞吐',
      '敏感时期抗封锁能力位居行业第一梯队'
    ],
    faqs: [
      {
        question: 'IPLC 专线与普通 BGP 隧道中继的核心区别是什么？',
        answer: 'BGP 隧道中继是在公网入口上建立加密隧道，虽然入口在国内多线机房，但在跨境段依然走公网国际出口，在敏感时期或晚高峰极易遭遇国际出口拥堵和丢包；而 IPLC 是向电信运营商租用的端到端物理私有内网信道，全程不走公网，因此丢包率恒定为零且不受公网拥堵影响。'
      },
      {
        question: '为什么 IPLC 专线价格通常高于普通公网机场？',
        answer: 'IPLC 专线属于电信级物理陆缆/海缆专线资源，运营商按 Gbps/月收取极其高昂的固定专线月租成本。高品质 IPLC 机场需要承担昂贵的带宽底仓成本，但换来的是晚高峰 4K/8K 视频毫无卡顿、外服联机 0 丢包的顶级网络 SLA 体验。'
      }
    ]
  },
  streaming: {
    id: 'streaming',
    name: '4K 流媒体首选',
    desc: 'Netflix/Disney+',
    tagline: 'Netflix / Disney+ / YouTube 8K 原生住宅 IP 解锁 · 4K 高码率秒开',
    emoji: '🎬',
    badge: '🍿 4K/8K 追剧神器',
    color: 'violet',
    sortDimension: '流媒体专项体验与解锁评测评分降序（10 分制 ⬇）',
    criteria: [
      '全区 Netflix / Disney+ / YouTube 原生解锁',
      '海外原生住宅 ISP 纯净 IP 池',
      '单节点 800Mbps+ 支持 8K 60FPS 秒开'
    ],
    seoTitle: '4K/8K 流媒体解锁机场梯子推荐 · Netflix/Disney+ 极速播放专线 - 节点实验室',
    seoDesc: '2026 精选支持 Netflix 全区、Disney+、YouTube 4K/8K 与 TikTok 原生解锁的流媒体专线机场。住宅纯净 IP 出口，高码率秒开不转圈。',
    seoGuide: '为什么观看 Netflix 和 Disney+ 必须选择专门的流媒体解锁专线？国际主流流媒体平台（如 Netflix、Disney+、HBO Max 及 YouTube Premium 等）对版权地域有着极其苛刻的风控审查，通过动态 IP 数据库识别机房 IDC IP 并拦截报错。流媒体首选机场在海外节点大量部署了本土原生住宅 ISP 与纯净宽带 IP 资源池，结合智能 DNS 分流与 500Mbps~1000Mbps+ 的大带宽储备，不仅能 100% 完美解锁各区独占片库及繁简中文字幕，更能保障 4K HDR 及 8K 60FPS 极速秒开、任意拖拽无回旋缓冲。本专题严格按流媒体专项表现精选 4 款追剧机皇。',
    highlights: [
      '出口配置高纯净度原生住宅 ISP IP，无视流媒体风控',
      '全区解锁 Netflix HK/TW/JP/SG/US 专属独播剧集与中文字幕',
      'YouTube 8K 60FPS 极速预载，缓冲条始终大幅领先',
      '完美适配 Apple TV、Android TV 电视盒子与投影大屏'
    ],
    faqs: [
      {
        question: '为什么普通节点看 Netflix 只能看自制剧，看不到版权剧？',
        answer: '这是因为节点 IP 被 Netflix 识别为了机房 IDC IP，触发了版权地域限制，平台只展示拥有全球版权的自制剧（Netflix Originals）。只有使用配备原生住宅 ISP 宽带 IP 或经住宅 DNS 解锁的专属流媒体节点，才能看全所有国家/地区的独占版权剧。'
      },
      {
        question: '电视盒子（如 Apple TV / Google TV）如何流畅播放 4K 流媒体？',
        answer: '建议在路由器端部署 Clash / Sing-box 透明代理，或在 Apple TV 上安装 Surge / Loon / Shadowrocket 客户端，并选择本榜单中支持 UDP Full-Cone 与流媒体 DNS 优化的亚太专线节点，即可实现 4K HDR / Dolby Vision 秒开。'
      }
    ]
  },
  ai: {
    id: 'ai',
    name: 'ChatGPT / AI',
    desc: 'GPT-4o Claude 专线',
    tagline: 'ChatGPT-4o / Claude 3.5 / Sora 纯净直连 · 零人机拼图验证',
    emoji: '🤖',
    badge: '⚡ AI 大模型加速',
    color: 'emerald',
    sortDimension: '原生住宅 IP 纯净度与 AI 免人机验证综合权重 ⬇',
    criteria: [
      '原生住宅 IP 出口，免 Cloudflare 图形拼图',
      'TCP 长连接持久保持，代码会话不中断',
      '全量支持 ChatGPT-4o / Claude 3.5 / Sora'
    ],
    seoTitle: 'ChatGPT / Claude 专线机场梯子推荐 · 2026 AI 开发与大模型免拦截直连 - 节点实验室',
    seoDesc: '汇总 2026 年完美适配 ChatGPT-4o、Claude 3.5 Sonnet、Sora 与 Midjourney 的 AI 专用翻墙梯子。纯净住宅 IP，登录免人机验证，长连接持续稳定。',
    seoGuide: '日常访问 ChatGPT 与 Claude 为什么经常遭遇封号拦截或频繁出现人机验证？OpenAI、Anthropic 及 Midjourney 等 AI 巨头针对跨境访问建立了极高严密度的 Cloudflare 盾牌与欺诈风控模型。如果节点 IP 被大量用户滥用、或属于劣质机房段，便会频繁触发图形拼图人机验证甚至账号遭封禁。AI 专属梯子通过在美区、日区及新加坡节点配置经过深度清洗的高信誉原生住宅 IP，并实施动态风控轮换机制，能够保障 ChatGPT-4o、Claude 3.5 Sonnet 及 API 调试秒速直连、会话持久稳定且免图形验证。本专题精选 4 款经实测通过率超 99.8% 的 AI 专线。',
    highlights: [
      '专属纯净住宅 IP 池，登录 OpenAI 控制台零图形拼图验证',
      '长连接 TCP 会话平稳，保障代码调试与 Claude 长上下文不中断',
      '全量支持 Midjourney、Sora、Copilot 及各大海外 AI 开放平台',
      '支持多平台自动化代理分流，仅 AI 流量走专线省流耐用'
    ],
    faqs: [
      {
        question: '为什么访问 Claude 3.5 比访问 ChatGPT 更容易被封号？',
        answer: 'Anthropic 对 Claude 的 IP 风控等级是行业最为苛刻的，只要检测到来自公共机房 IP、或者该 IP 存在大量不同用户同时登录，就会直接触发封号（Account Disabled）。因此使用 Claude 必须选择拥有独立纯净住宅 IP 池的专线节点，且避免频繁切换不同国家节点。'
      },
      {
        question: '如何配置代理客户端实现只有 AI 流量走海外专线？',
        answer: '在 Clash Verge Rev 或 Sing-box 客户端中启用分流规则集（如 rule-providers 包含 OpenAI 与 Claude 规则集），将 AI 域名与 IP 段定向走美区/新加坡住宅专线，国内与日常流量走直连或其他节点，既稳定又省流量。'
      }
    ]
  },
  gaming: {
    id: 'gaming',
    name: '低延迟电竞',
    desc: '游戏稳定低 Ping',
    tagline: '外服联机 0 丢包 · 港日节点 19ms 极速响应 · 媲美专业游戏加速器',
    emoji: '🎮',
    badge: '🏆 外服联机神油',
    color: 'amber',
    sortDimension: '网络稳定性 SLA 与外服低延迟 Ping 综合降序 ⬇',
    criteria: [
      '香港 IPLC 延迟 ≤ 20ms，日本专线 ≤ 38ms',
      '连续 1000 次探测 0.00% 丢包',
      '完美兼容 Clash / Sing-box TUN 虚拟网卡'
    ],
    seoTitle: '低延迟电竞游戏机场梯子推荐 · Steam / Apex / 瓦罗兰特外服联机加速 - 节点实验室',
    seoDesc: '2026 游戏联机专属低延迟机场梯子推荐。支持 TUN 虚拟网卡模式，香港日本专线 Ping 延迟低至 19ms，晚高峰 0% 丢包，媲美专业游戏加速器。',
    seoGuide: '为什么普通翻墙中继玩外服游戏卡顿跳 Ping，而电竞专线能媲美专业加速器？多人在线电竞游戏（如 Steam、Apex Legends、瓦罗兰特、英雄联盟外服等）对网络的核心指标是“极低物理延迟”与“晚高峰 0% 丢包率”。普通公网中继在国际骨干网高峰期极易产生剧烈抖动与红色丢包。低延迟电竞专线依托内网直连的 IPLC/IEPL 国际专线，港日节点延迟低至 19ms~38ms，抖动控制在 1ms 左右。配合 Clash 或 Sing-box 开启 TUN 虚拟网卡模式，可直接全局透明接管游戏流量，无需额外购买昂贵的游戏加速器。本专题汇聚 4 款硬核低延迟专线。',
    highlights: [
      '香港 IPLC 专线物理延迟低至 19.8ms，日本专线 38ms',
      '千次连续 ICMP 探测 0.00% 零丢包，告别红色跳 Ping',
      '支持 TUN 模式直接接管游戏 UDP 数据包，畅玩外服全平台',
      '无需额外订阅高价游戏加速器，一专线多用途省心省力'
    ],
    faqs: [
      {
        question: '为什么需要开启 TUN 模式玩外服游戏？',
        answer: '普通代理模式仅代理浏览器 HTTP/HTTPS 流量，而绝大部分游戏客户端（如 Steam、战网、Apex 等）采用 UDP 通信协议。开启 TUN 虚拟网卡模式后，系统会在底层虚拟出一张网卡，将整机包括游戏 UDP 数据包全量接管并走专线转发，从而实现游戏全局加速。'
      },
      {
        question: '用机场专线玩外服游戏相比 UU、迅游等商业加速器有何优势？',
        answer: '商业游戏加速器仅能加速游戏进程，且无法访问 Google、YouTube 等网页；而顶级 IPLC 专线机场不仅游戏延迟同样能达到 19ms~30ms 级别，同时兼具网页浏览、Discord 语音通话与 4K 视频加速，性价比大幅领先。'
      }
    ]
  },
  budget: {
    id: 'budget',
    name: '高性价比平价',
    desc: '月付 5.6 元起',
    tagline: '年付月均 5.6 元起 · 极低门槛享真专线服务 · 拒绝虚标',
    emoji: '💰',
    badge: '🔥 省钱超值精选',
    color: 'rose',
    sortDimension: '月均起步折算价格从低到高升序（¥5.6 起 ⬆）',
    criteria: [
      '年付折算单价最低（月均 ¥5.6 起）',
      '平价不减配，全栈采用 IEPL 内网专线',
      '全节点 1.0x 真实倍率计费，无暗扣套路'
    ],
    seoTitle: '高性价比平价机场梯子推荐 · 2026 月付 5 元起便宜好用的专线梯子 - 节点实验室',
    seoDesc: '精选 2026 年最高性价比的平价专线机场梯子。月均仅需 5.6 元起，全 IEPL 内网专线，不限速不降质，学生党与轻度办公追剧党省钱首选。',
    seoGuide: '寻找兼顾高速专线品质与极低使用成本的高性价比平价机场梯子？在传统认知中，高规格的 IPLC/IEPL 专线往往月费高昂。但随着新一代高密度节点架构与动态专线调度技术的成熟，一批平价黑马打破了行业高定价坚冰。本专题严格比对全网 9 款顶级机场的起步价格与年付折算单价，精选出入门月均仅需 5.6 元的 3 款平价机皇。无论是一年仅需几十元的年付轻量尝鲜包，还是折后单月几块钱的高速专线，都能以极低的试错成本享受到正规专线带来的 4K 秒开与晚高峰不限速体验，是广大留学生、轻度办公族与日常追剧党的省钱利器。',
    highlights: [
      '年付月均折算低至 5.6 元/月，一年开销仅相当于一杯咖啡钱',
      '平价不减配，全栈采用纯 IEPL 专线，晚高峰绝不挤公网',
      '全节点 1.0x 真实倍率计费，绝无高倍率暗扣流量套路',
      '支持入门小包与一次性不限时流量包，资金压力降至最低'
    ],
    faqs: [
      {
        question: '为什么这几款机场能做到月均仅 5.6 元且依然是 IEPL 专线？',
        answer: '主要得益于两点：一是集约化大规模采购国际专线带宽，平摊了单位带宽成本；二是推出了针对轻度用户的 60GB/月梯度套餐，适合日常社交、网页浏览与轻度追剧，避免了传统大包的高额溢价。'
      },
      {
        question: '平价机场是否存在晚高峰限速或跑路风险？',
        answer: '本榜单收录的 3 款平价品牌均采用企业级管理后台与分布式冗余专线，实测晚高峰测速均在 780Mbps~850Mbps 以上，且全节点采用 1.0x 真实倍率计费，绝非那些用公网中继冒充专线的廉价月抛机场。'
      }
    ]
  },
  enterprise: {
    id: 'enterprise',
    name: '企业跨境专用',
    desc: '原生住宅 IP',
    tagline: '不限多设备在线 · 原生住宅 IP 防关联 · 商业级高可用 SLA',
    emoji: '🏢',
    badge: '🌐 商业级生产力',
    color: 'indigo',
    sortDimension: '商业专线与原生住宅 IP / 多设备并发权重综合排序 ⬇',
    criteria: [
      '不限制多设备同时在线并发，团队共享',
      '海外商业住宅 ISP 原生纯净 IP 出口',
      '企业级 2.5Gbps 峰值带宽与线路冗余容灾'
    ],
    seoTitle: '企业跨境出海与外贸电商专用机场梯子 · 2026 不限设备原生 IP 专线 - 节点实验室',
    seoDesc: '2026 企业级跨境商务、外贸协同、海外社媒运营与电商直播专用机场。多设备不限并发，纯净原生住宅 IP，大带宽无拥堵保障。',
    seoGuide: '企业跨国商务、出海协同与跨境电商运营对代理网络有何严苛标准？普通消费级梯子往往限制在线设备数量（如仅限 2-3 台）、IP 频繁变动且容易触发跨境平台风控。企业跨境专用机场具备三大关键核心特性：一是支持不限制客户端在线设备并发，满足整个工作室或多人团队共享；二是海外 POP 出口配置了商业住宅 ISP 原生纯净 IP，保障亚马逊、TikTok Shop、PayPal 等电商店铺安全运营；三是拥有 60+ 冗余节点与高达 1000GB+ 的大流量月包，确保 24 小时高清直播与海量数据回传稳定不断流。本专题精选 3 款具备顶级商业 SLA 稳定率的商用专线首选。',
    highlights: [
      '不限制客户端安装数与多设备同时在线并发，团队全员共享',
      '纯净住宅 IP 与本土宽带，跨境电商与海外社媒开播防封控',
      '60+ 顶级专线节点冗余，主备节点自动容灾无缝切换',
      '提供高达 1000GB~1200GB 超大流量套餐，满足企业重度传输'
    ],
    faqs: [
      {
        question: '为什么跨境电商（亚马逊、eBay、TikTok）必须使用原生住宅 IP？',
        answer: '跨国电商平台对登录 IP 拥有极高的风控检测机制。如果多个店铺使用相同的机房 IDC IP，极易被判定为关联店铺而导致批量封店。原生住宅 IP 来源于海外本土居民宽带，在平台风控系统中具备极高信誉度，能有效避免因 IP 污染导致的封控。'
      },
      {
        question: '工作室多名员工如何共享同一个机场订阅套餐？',
        answer: '本专题收录的商业专线品牌支持不限设备同时在线并发，工作室可在软路由上部署网关代理让所有办公电脑连入，也可直接将订阅链接分发给全体员工，无需为每台电脑重复购买单独账号。'
      }
    ]
  }
};

/**
 * 分类专属评测匹配对象
 */
export interface CategoryReviewItem {
  review: any;
  categoryRank: number; // 分类专属名次 #1, #2, #3, #4
  categoryBadge: string; // 分类专属亮点角标
  highlightMetric: {
    label: string;
    value: string;
  };
}

/**
 * 根据分类规则执行严格的过滤与重排逻辑：
 * 1. 严格限制收录数量：仅 3 到 4 款最符合该标签特征的机场
 * 2. 采用针对性的排序维度（打破固定排名）
 * 3. 赋予分类专属名次与亮点角标
 */
export function filterReviewsForCategory(categoryId: string, allReviews: any[]): CategoryReviewItem[] {
  const getReview = (id: string) => allReviews.find((r) => r.id === id);

  switch (categoryId) {
    case 'iplc': {
      // 纯 IPLC 专线：必须按照“专线带宽或极限测速”从高到低排序，收录 4 款
      // 1. 边缘节点 (950Mbps 实测, 峰值 2.5Gbps 点对点纯 IPLC) -> #1
      // 2. 云界线 (920Mbps 实测, 全 IEPL 骨干) -> #2
      // 3. 神行加速 (900Mbps 实测, 大流量 IEPL 专线) -> #3
      // 4. 可信云 (890Mbps 实测, 全 IEPL 商业专线) -> #4
      const targets = [
        { id: 'edgenova-review', badge: '👑 测速冠军 · 峰值 2.5Gbps', metricLabel: '晚高峰极限测速', metricVal: '950 Mbps' },
        { id: 'yunjiexian-review', badge: '⚡ 晚高峰秒开 · 920Mbps', metricLabel: '晚高峰极限测速', metricVal: '920 Mbps' },
        { id: 'shenxing-review', badge: '🚀 旗舰大带宽 · 900Mbps', metricLabel: '晚高峰极限测速', metricVal: '900 Mbps' },
        { id: 'kexinyun-review', badge: '💎 骨干商业专线 · 890Mbps', metricLabel: '晚高峰极限测速', metricVal: '890 Mbps' },
      ];

      return targets.map((t, idx) => {
        const rev = getReview(t.id);
        return {
          review: rev,
          categoryRank: idx + 1,
          categoryBadge: t.badge,
          highlightMetric: { label: t.metricLabel, value: t.metricVal }
        };
      }).filter((item) => Boolean(item.review));
    }

    case 'streaming': {
      // 4K 流媒体首选：按照流媒体专项评分与体验从高到低排序，收录 4 款
      // 1. 云界线 (9.8 分, Netflix 全区 + YouTube 8K) -> #1
      // 2. 大佬云 (9.6 分, 4K/8K 任意拖拽零缓冲) -> #2
      // 3. 环球梯 (9.5 分, Disney+ / YouTube 秒开) -> #3
      // 4. 神行加速 (9.2 分, 120GB 超大月流量追剧包) -> #4
      const targets = [
        { id: 'yunjiexian-review', badge: '🎬 全区片库 · YouTube 8K 秒开', metricLabel: '流媒体专项评分', metricVal: '9.8 分' },
        { id: 'dalaoyun-review', badge: '🍿 Netflix 4K 原生解锁', metricLabel: '流媒体专项评分', metricVal: '9.6 分' },
        { id: 'huanqiuti-review', badge: '📺 电视大屏首选 · 零缓冲', metricLabel: '流媒体专项评分', metricVal: '9.5 分' },
        { id: 'shenxing-review', badge: '🔥 120GB 追剧大流量包', metricLabel: '流媒体专项评分', metricVal: '9.2 分' },
      ];

      return targets.map((t, idx) => {
        const rev = getReview(t.id);
        return {
          review: rev,
          categoryRank: idx + 1,
          categoryBadge: t.badge,
          highlightMetric: { label: t.metricLabel, value: t.metricVal }
        };
      }).filter((item) => Boolean(item.review));
    }

    case 'ai': {
      // ChatGPT / AI：提取带有“原生住宅 IP”或 AI 专线属性表现最突出的品牌，收录 4 款
      // 1. 可信云 (原生住宅 IP 出口, 免 Cloudflare 拼图人机验证) -> #1
      // 2. 云界线 (稳定性 9.9, TCP 长连接持续稳定不中断) -> #2
      // 3. 边缘节点 (纯净 IP 调度, AI 开放平台与 API 调试) -> #3
      // 4. 神行加速 (ChatGPT-4o / Claude 3.5 原生直连) -> #4
      const targets = [
        { id: 'kexinyun-review', badge: '🤖 原生住宅 IP · 免人机拼图', metricLabel: 'AI 会话通过率', metricVal: '99.9%' },
        { id: 'yunjiexian-review', badge: '⚡ 会话持久稳定 · 长连接', metricLabel: 'SLA 稳定性保障', metricVal: '99.9%' },
        { id: 'edgenova-review', badge: '💡 AI 开发与 API 调试首选', metricLabel: '专线抗封锁评级', metricVal: 'A+ 级' },
        { id: 'shenxing-review', badge: '🎯 GPT-4o / Claude 3.5 双模型', metricLabel: 'AI 模型原生支持', metricVal: '全量支持' },
      ];

      return targets.map((t, idx) => {
        const rev = getReview(t.id);
        return {
          review: rev,
          categoryRank: idx + 1,
          categoryBadge: t.badge,
          highlightMetric: { label: t.metricLabel, value: t.metricVal }
        };
      }).filter((item) => Boolean(item.review));
    }

    case 'gaming': {
      // 低延迟电竞：必须按照“延迟/稳定性评分”从高到低排序，收录 4 款
      // 1. 云界线 (稳定性 9.9, 港日专线 19.8ms, 0% 丢包) -> #1
      // 2. 大佬云 (稳定性 9.7, 延迟 21ms, 超低抖动) -> #2
      // 3. 环球梯 (稳定性 9.5, TUN 模式电竞加速) -> #3
      // 4. 闪电鼠 (稳定性 9.3, 极速首包握手响应) -> #4
      const targets = [
        { id: 'yunjiexian-review', badge: '🏆 港日 19.8ms · 0.00% 丢包', metricLabel: '稳定性专项评分', metricVal: '9.9 分' },
        { id: 'dalaoyun-review', badge: '🎮 外服联机稳定利器 · 21ms', metricLabel: '稳定性专项评分', metricVal: '9.7 分' },
        { id: 'huanqiuti-review', badge: '⚡ TUN 模式外服游戏直连', metricLabel: '稳定性专项评分', metricVal: '9.5 分' },
        { id: 'shandianshu-review', badge: '🚀 极速响应 · 低抖动低 Ping', metricLabel: '稳定性专项评分', metricVal: '9.3 分' },
      ];

      return targets.map((t, idx) => {
        const rev = getReview(t.id);
        return {
          review: rev,
          categoryRank: idx + 1,
          categoryBadge: t.badge,
          highlightMetric: { label: t.metricLabel, value: t.metricVal }
        };
      }).filter((item) => Boolean(item.review));
    }

    case 'budget': {
      // 高性价比平价：只保留价格最低的 3 款，必须按照“价格从低到高”排序
      // 1. 榴莲云 (¥5.6/月起，主打高性价比平价爆款) -> #1
      // 2. 闪电鼠 (¥5.6/月起，极低门槛闪电爆款) -> #2
      // 3. 环球梯 (¥5.6/月起，平价 IEPL 专线) -> #3
      const targets = [
        { id: 'liulianyun-review', badge: '💰 年付月均 ¥5.6 · 平价爆款机皇', metricLabel: '起步折算单价', metricVal: '¥5.6 /月' },
        { id: 'shandianshu-review', badge: '🔥 年付月均 ¥5.6 · 极速高性价比', metricLabel: '起步折算单价', metricVal: '¥5.6 /月' },
        { id: 'huanqiuti-review', badge: '⭐ 年付月均 ¥5.6 · 平价内网专线', metricLabel: '起步折算单价', metricVal: '¥5.6 /月' },
      ];

      return targets.map((t, idx) => {
        const rev = getReview(t.id);
        return {
          review: rev,
          categoryRank: idx + 1,
          categoryBadge: t.badge,
          highlightMetric: { label: t.metricLabel, value: t.metricVal }
        };
      }).filter((item) => Boolean(item.review));
    }

    case 'enterprise': {
      // 企业跨境专用：只保留带有原生住宅 IP 或企业专线特征的 3 款（如可信云等）
      // 1. 可信云 (全 IEPL 商业专线, 原生住宅 IP 出口, 不限设备数量) -> #1
      // 2. 边缘节点 (全 IPLC 点对点专线, 企业级 2.5Gbps, 商业商务高可用) -> #2
      // 3. 快狸 (50+ 节点冗余调度, 商业多设备并发, 大流量容灾) -> #3
      const targets = [
        { id: 'kexinyun-review', badge: '🏢 全 IEPL 商业专线 · 原生住宅 IP', metricLabel: '设备限制', metricVal: '不限设备数' },
        { id: 'edgenova-review', badge: '🌐 企业级 2.5Gbps · 点对点专线', metricLabel: 'SLA 可用率', metricVal: '99.9%' },
        { id: 'kuaili-review', badge: '🛡️ 50+ 专线超密冗余 · 团队多并发', metricLabel: '骨干节点储备', metricVal: '50+ 条' },
      ];

      return targets.map((t, idx) => {
        const rev = getReview(t.id);
        return {
          review: rev,
          categoryRank: idx + 1,
          categoryBadge: t.badge,
          highlightMetric: { label: t.metricLabel, value: t.metricVal }
        };
      }).filter((item) => Boolean(item.review));
    }

    default:
      return [];
  }
}
