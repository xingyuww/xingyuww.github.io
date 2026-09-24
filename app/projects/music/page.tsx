import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './music-project.module.css';

export const metadata: Metadata = {
  title: '内容已整理',
  description: '原有占位项目已从主要项目中移除，相关内容回到个人站继续整理。',
};

export default function ArchivedProjectPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/#work">← 返回近期记录</Link>
        <span>ARCHIVE / 2026</span>
        <span>星语 / 2026</span>
      </header>

      <section className={styles.hero} aria-labelledby="archive-title">
        <div className={styles.titleBlock}>
          <p className={styles.eyebrow}>ARCHIVE NOTICE</p>
          <h1 id="archive-title">内容已整理到首页</h1>
          <p className={styles.lead}>
            原来的音乐开发页面只有占位说明，没有足够资料支撑一个独立项目，因此不再作为主要项目展示。
          </p>
        </div>

        <dl className={styles.statusGrid}>
          <div>
            <dt>整理原则</dt>
            <dd>不使用空项目填满页面</dd>
          </div>
          <div>
            <dt>当前内容</dt>
            <dd>近期记录、文字稿与网页练习</dd>
          </div>
          <div>
            <dt>后续更新</dt>
            <dd>资料明确后再建立独立页面</dd>
          </div>
        </dl>
      </section>

      <footer className={styles.footer}>
        <Link href="/#work">返回近期记录</Link>
        <span>ARCHIVED PLACEHOLDER</span>
      </footer>
    </main>
  );
}
