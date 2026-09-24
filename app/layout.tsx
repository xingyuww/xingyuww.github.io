import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://xingyuww.github.io'),
  title: {
    default: '星语｜文章与个人作品',
    template: '%s｜星语',
  },
  description: '星语的个人网站，整理文章、视频文字稿与个人壁纸。',
  applicationName: '星语个人站',
  creator: '星语',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '星语个人站',
    title: '星语｜文章与个人作品',
    description: '整理真正写过、做过，并愿意留下的文章、文字稿与壁纸。',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: '星语｜文章与个人作品',
    description: '整理真正写过、做过，并愿意留下的文章、文字稿与壁纸。',
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
