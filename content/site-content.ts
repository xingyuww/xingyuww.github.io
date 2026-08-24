export const profile = {
  displayName: '星语',
  romanizedName: 'XINGYU',
  location: 'CHENGDU · CN',
  focus: 'AI 开发与探索',
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
    '也在协作中建立更高的专业上限。',
  ],
} as const;

export const featuredProjects = [
  {
    key: 'yiliu',
    number: '01',
    label: 'MEDICAL EXPRESSION',
    title: '忆流',
    href: '#project-detail',
    note: '项目定位 · 表达对象 · 我的角色待补充',
    detail: '项目背景、表达方式、内容结构与实际成果待补充。',
  },
  {
    key: 'music',
    number: '02',
    label: 'MUSIC DEVELOPMENT',
    title: '音乐开发项目',
    href: '/projects/music',
    note: '我的角色：策划 · 具体项目资料暂未公开',
    detail: '一句话介绍待补充：传统项目的音乐分轨，将在资料确认后补全具体表达。',
  },
] as const;

export const explorations = [
  {
    number: '01',
    slug: 'image',
    label: 'IMAGE GENERATION',
    title: '图像生成',
    note: '项目与图像资料待补充',
    description: '图像生成相关项目、实验过程与最终作品将在资料补充后更新。',
  },
  {
    number: '02',
    slug: 'expression',
    label: 'WRITING & EXPRESSION',
    title: '文章与表达',
    note: '重要文章与表达项目待补充',
    description: '文章索引、口播表达与相关内容项目将在资料补充后整理。',
  },
  {
    number: '03',
    slug: 'ongoing',
    label: 'ONGOING EXPLORATIONS',
    title: '进行中的探索',
    note: '影视与其他方向待补充',
    description: '尚在形成中的影视与其他方向会在内容明确后继续补充。',
  },
] as const;

export type FeaturedProject = (typeof featuredProjects)[number];
export type Exploration = (typeof explorations)[number];
