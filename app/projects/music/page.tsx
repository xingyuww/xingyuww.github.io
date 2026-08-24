import type { Metadata } from 'next';
import Link from 'next/link';
import { featuredProjects } from '@/content/site-content';
import styles from './music-project.module.css';

const project = featuredProjects.find((item) => item.key === 'music')!;

export const metadata: Metadata = {
  title: '音乐开发项目',
  description: '一个由星语担任策划、目前具体资料尚未公开的音乐开发项目。',
};

const trackNames = ['SOURCE', 'VOICE', 'RHYTHM', 'TEXTURE', 'OUTPUT'];

export default function MusicProjectPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/#work">← 返回主要项目</Link>
        <span>{project.number} / {project.label}</span>
        <span>星语 / 2026</span>
      </header>

      <section className={styles.hero} aria-labelledby="music-title">
        <div className={styles.titleBlock}>
          <p className={styles.eyebrow}>PROJECT PAGE / MATERIALS PENDING</p>
          <h1 id="music-title">{project.title}</h1>
          <p className={styles.lead}>
            一句话介绍待补充：传统项目的音乐分轨，将在资料确认后补全它具体解决什么问题。
          </p>
        </div>

        <dl className={styles.statusGrid}>
          <div>
            <dt>我的角色</dt>
            <dd>策划</dd>
          </div>
          <div>
            <dt>公开状态</dt>
            <dd>具体项目资料暂未公开</dd>
          </div>
          <div>
            <dt>项目名称</dt>
            <dd>待补充</dd>
          </div>
        </dl>
      </section>

      <section className={styles.trackSection} aria-labelledby="track-title">
        <div className={styles.trackHeading}>
          <p>01 / PROJECT STRUCTURE</p>
          <h2 id="track-title">把项目理解为一组正在形成的分轨。</h2>
          <span>这里先呈现结构，不虚构尚未公开的内容。</span>
        </div>

        <div className={styles.trackBoard} aria-label="音乐分轨结构示意">
          <div className={styles.scale}><span>00</span><span>08</span><span>16</span><span>24</span><span>32</span></div>
          <div className={styles.tracks}>
            {trackNames.map((track, index) => (
              <div className={styles.track} key={track}>
                <span>0{index + 1} / {track}</span>
                <div><i /><i /><i /></div>
              </div>
            ))}
          </div>
          <i className={styles.playhead} aria-hidden="true" />
        </div>
      </section>

      <section className={styles.infoSection} aria-label="项目资料补充清单">
        <article>
          <span>01</span>
          <h2>项目介绍</h2>
          <p>补充一句话：这个项目是什么、面向谁，以及音乐分轨在其中起到什么作用。</p>
        </article>
        <article>
          <span>02</span>
          <h2>我的工作</h2>
          <p>当前已确认：策划。后续补充你的具体职责、合作方式和关键判断。</p>
        </article>
        <article>
          <span>03</span>
          <h2>项目资料</h2>
          <p>具体资料暂未公开。图片、过程材料和外部链接将在允许公开后补充。</p>
        </article>
      </section>

      <footer className={styles.footer}>
        <Link href="/#work">返回主要项目</Link>
        <span>DETAILS WILL FOLLOW</span>
      </footer>
    </main>
  );
}
