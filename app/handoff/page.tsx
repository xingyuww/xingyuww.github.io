import type { Metadata } from 'next';
import HandoffStudy from './handoff-study';

export const metadata: Metadata = {
  title: {
    absolute: '星语｜AI 开发与探索',
  },
  description: '星语的个人网站，关注 AI 时代人与 AI 如何共同发展，并在协作中建立更高的专业上限。',
  alternates: {
    canonical: '/',
  },
};

export default function HandoffPage() {
  return <HandoffStudy />;
}
