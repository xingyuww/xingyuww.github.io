export const profile = {
  displayName: '星语',
  romanizedName: 'XINGYU',
  location: 'CHENGDU · CN',
  focus: 'AI 创作与交互实验',
  heroQuestion: [
    'AI时代，',
    '人与AI如何一起发展？',
    '如何一起把一个领域',
    '走得更深？',
  ],
  heroTension: [
    'AI能让我们更快做到六七十分，',
    '也可能让我们困在一个',
    '并不真正理解的六七十分。',
  ],
  heroPosition: [
    '不只得到更好的结果，',
    '也把过程整理成可以继续使用的方法。',
  ],
} as const;

export const featuredProjects = [
  {
    key: 'workshop',
    number: '01',
    label: 'VISUAL STUDY WORKBENCH',
    title: '观画间',
    href: '#project-detail',
    note: '视觉研究与共学工作台 · 原型阶段',
    detail: '从一个具体的观看问题出发，把资料来源、观察、实验、修订和复盘放进同一个工作台。当前保留了一条完整练习：前景遮挡如何影响观看与构图。',
  },
  {
    key: 'visual',
    number: '02',
    label: 'IMAGE PRODUCTION LOG',
    title: '图像落地生产台',
    href: '#project-detail',
    note: '图像生成、检查与回退记录 · 原型阶段',
    detail: '围绕主页横幅图像，把参考冻结、光影分析、试产、拒收和下一轮修改串成可追溯记录。重点不是展示一张“完成图”，而是留下判断过程。',
  },
] as const;

export const explorations = [
  {
    number: '01',
    slug: 'tutorials',
    label: 'VIDEO NOTES & SCRIPTS',
    title: '视频教程与文字稿',
    note: '先整理讲过的方法，再逐步补充视频',
    description: '把已经讲过、做过的内容先整理成可以阅读的文字稿，包括参考拆解、生成过程、修改依据和最终实现。视频尚未整理完成的部分，不设置空播放入口。',
    sections: [
      {
        title: '先整理文字稿',
        body: '先把教程要解决的问题、操作步骤和关键判断写清楚，让内容即使脱离视频也能够阅读。',
      },
      {
        title: '再补视频',
        body: '视频、配音和演示素材准备好之后，再把它们补进对应文章，而不是为了填满页面先放占位内容。',
      },
      {
        title: '保留修改过程',
        body: '每一篇尽量记录第一版哪里不够、后来改了什么，以及哪些方法可以继续复用。',
      },
    ],
  },
  {
    number: '02',
    slug: 'web',
    label: 'WEB & INTERACTION',
    title: '网页与交互',
    note: '酒店网页、滚动叙事与动效练习',
    description: '这里记录网页内容、页面结构和交互实现。现阶段主要包括酒店网站、滚动叙事页面，以及对滚轮锁定、入场退场、视差和文字节奏的练习。',
    sections: [
      {
        title: '页面内容',
        body: '先说明网页面向谁、希望对方记住什么，再决定标题、说明文字、图片和行动入口。',
      },
      {
        title: '滚动与动效',
        body: '滚动不只是把页面向下移动，而是控制镜头推进、遮罩切换、分层视差和文字出现的时间。',
      },
      {
        title: '当前状态',
        body: 'Lumen House 与酒店滚动网页已有可打开版本；其余动效练习仍在整理，后续只补充能够说明清楚的部分。',
      },
    ],
  },
  {
    number: '03',
    slug: 'work-in-progress',
    label: 'WORK IN PROGRESS',
    title: '未完成的记录',
    note: '不把原型包装成已经成熟的项目',
    description: '有些方向已经做过尝试，但还没有形成稳定结果。它们会先留在内部记录里，等到目标、过程和结果都能说清楚时，再进入主要项目。',
    sections: [
      {
        title: '只放能说明的',
        body: '有明确问题、过程或阶段结果的内容可以出现；只有概念名称、没有实际内容的项目暂时不展示。',
      },
      {
        title: '标明真实状态',
        body: '原型、练习、暂停和完成会使用不同表述，避免让浏览者误以为所有内容都已经成熟。',
      },
      {
        title: '后续逐步补充',
        body: '新的文字稿、网页和视频准备好之后，再按同一结构补充，不需要为了更新而重新设计整站。',
      },
    ],
  },
] as const;

export type FeaturedProject = (typeof featuredProjects)[number];
export type Exploration = (typeof explorations)[number];
