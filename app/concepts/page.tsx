import type { Metadata } from 'next';
import HeroLab from './hero-lab';

export const metadata: Metadata = {
  title: '首页首屏排版实验｜淡紫色个人网站',
  description: '紫色透影、文字构造、句子整理、系统吸附与形状变化五种排版交互修改稿。',
  openGraph: {
    title: '首页首屏排版实验',
    description: '五种可交互的排版交互修改稿。',
    images: ['https://lavender-portfolio-study.linzihan2770438492.chatgpt.site/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '首页首屏排版实验',
    description: '五种可交互的排版交互修改稿。',
    images: ['https://lavender-portfolio-study.linzihan2770438492.chatgpt.site/og.png'],
  },
};

export default function ConceptsPage() {
  return <HeroLab />;
}
