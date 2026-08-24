import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://xingyuww.github.io'),
  title: {
    default: '星语｜AI 开发与探索',
    template: '%s｜星语',
  },
  description: '星语的个人网站，关注 AI 时代人与 AI 如何共同发展，并在协作中建立更高的专业上限。',
  applicationName: '星语个人站',
  creator: '星语',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: '星语个人站',
    title: '星语｜AI 开发与探索',
    description: '关注 AI 时代人与 AI 如何共同发展，并在协作中建立更高的专业上限。',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: '星语｜AI 开发与探索',
    description: '关注 AI 时代人与 AI 如何共同发展，并在协作中建立更高的专业上限。',
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
