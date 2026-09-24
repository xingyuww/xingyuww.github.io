import type { Metadata } from 'next';
import AdminConsole from './admin-console';

export const metadata: Metadata = {
  title: '内容后台',
  description: '用于整理视频、游戏教学、动态壁纸和代理服务入口的本地内容后台。',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminConsole />;
}
