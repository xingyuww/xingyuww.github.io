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
        <Link href="/#explorations">← 返回内容与练习</Link>
        <span>{exploration.number} / {exploration.label}</span>
        <span>星语 / 2026</span>
      </header>

      <section className={styles.hero} aria-labelledby="exploration-title">
        <p>{exploration.number} / CONTENT NOTE</p>
        <h1 id="exploration-title">{exploration.title}</h1>
        <div className={styles.summary}>
          <strong>{exploration.note}</strong>
          <p>{exploration.description}</p>
        </div>
      </section>

      <section className={styles.placeholder} aria-label="内容概览">
        {exploration.sections.map((section, index) => (
          <div key={section.title}>
            <span>0{index + 1}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        ))}
      </section>

      <footer className={styles.footer}>
        <Link href="/#explorations">返回内容与练习</Link>
        <span>MORE TO FOLLOW</span>
      </footer>
    </main>
  );
}
