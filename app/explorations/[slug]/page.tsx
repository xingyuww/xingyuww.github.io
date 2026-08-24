import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { explorations } from '@/content/site-content';
import styles from './exploration.module.css';

type ExplorationPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return explorations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ExplorationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const exploration = explorations.find((item) => item.slug === slug);

  if (!exploration) return {};

  return {
    title: exploration.title,
    description: exploration.description,
  };
}

export default async function ExplorationPage({ params }: ExplorationPageProps) {
  const { slug } = await params;
  const exploration = explorations.find((item) => item.slug === slug);

  if (!exploration) notFound();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/#explorations">← 返回其他探索</Link>
        <span>{exploration.number} / {exploration.label}</span>
        <span>星语 / 2026</span>
      </header>

      <section className={styles.hero} aria-labelledby="exploration-title">
        <p>{exploration.number} / EXPLORATION</p>
        <h1 id="exploration-title">{exploration.title}</h1>
        <div className={styles.summary}>
          <strong>资料待补充</strong>
          <p>{exploration.description}</p>
        </div>
      </section>

      <section className={styles.placeholder} aria-label="等待补充的内容">
        <div>
          <span>01</span>
          <h2>为什么做</h2>
          <p>动机、问题与方向待补充。</p>
        </div>
        <div>
          <span>02</span>
          <h2>做了什么</h2>
          <p>项目、过程与个人角色待补充。</p>
        </div>
        <div>
          <span>03</span>
          <h2>留下什么</h2>
          <p>作品、文章、图片与外部链接待补充。</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <Link href="/#explorations">返回其他探索</Link>
        <span>CONTENT WILL FOLLOW</span>
      </footer>
    </main>
  );
}
