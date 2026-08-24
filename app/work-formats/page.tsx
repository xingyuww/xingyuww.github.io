import type { Metadata } from 'next';
import WorkFormatsStudy from './work-formats-study';

export const metadata: Metadata = {
  title: '作品呈现方式比较',
  description: '滚动生成手感与三种个人网站作品呈现方式的可视化比较。',
};

export default function WorkFormatsPage() {
  return <WorkFormatsStudy />;
}
