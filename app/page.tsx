import type { Metadata } from 'next';
import HandoffStudy from './handoff/handoff-study';

export const metadata: Metadata = {
  title: {
    absolute: '星语｜文章与个人作品',
  },
  description: '星语的个人网站，整理文章、视频文字稿与个人壁纸。',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HandoffStudy />;
}
