export const profile = {
  displayName: '星语',
  romanizedName: 'XINGYU',
  location: 'CHENGDU · CN',
  focus: '文章与个人作品',
  heroQuestion: [
    '慢慢整理，',
    '我真正写过的、',
    '做过的，',
    '和愿意留下的东西。',
  ],
  heroTension: [
    '不急着把每一次尝试都叫作项目，',
    '也不需要为了显得丰富',
    '放入还没有准备好的内容。',
  ],
  heroPosition: [
    '先从文章和壁纸开始，',
    '其余的，我会继续努力。',
  ],
} as const;

export const explorations = [
  {
    number: '01',
    slug: 'articles',
    label: 'ARTICLES & SCRIPTS',
    title: '文章与文字稿',
    note: '文章、口播和视频教程文字稿',
    description: '这里会放我真正写完、愿意公开的文章，也会整理口播和视频教程的文字稿。内容不必很多，但每一篇都应该能够独立说明一个问题。',
    sections: [
      {
        title: '文章',
        body: '记录我真正想清楚的问题、阶段性的判断，以及值得继续追踪的想法。整理完成后再逐篇公开。',
      },
      {
        title: '视频文字稿',
        body: '把视频里讲过的方法和过程变成可以阅读的文字，让内容离开视频以后仍然成立。',
      },
      {
        title: '持续整理',
        body: '先写完、校对和确认，再发布链接。暂时没有准备好的题目不会为了填满页面提前出现。',
      },
    ],
  },
  {
    number: '02',
    slug: 'wallpapers',
    label: 'WALLPAPER ARCHIVE',
    title: '壁纸',
    note: '整理自己愿意长期保留的图像',
    description: '这里会收录我做过、并且愿意公开的壁纸。当前原图还没有整理进网站，因此先保留栏目与说明，不放压缩图冒充可下载版本。',
    sections: [
      {
        title: '保留原图',
        body: '壁纸以原始尺寸和清晰画质为准；没有找到可靠原图之前，不使用聊天截图或二次压缩图片。',
      },
      {
        title: '整理规格',
        body: '后续会分别标注桌面、手机和其他适配尺寸，并为每张壁纸提供明确的预览与下载入口。',
      },
      {
        title: '逐步发布',
        body: '第一批图片整理好后再正式上线。以后新增壁纸时，只需要补充图片、标题、尺寸和简短说明。',
      },
    ],
  },
] as const;

export type Exploration = (typeof explorations)[number];
