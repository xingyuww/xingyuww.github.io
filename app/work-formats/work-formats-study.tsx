'use client';

import { useEffect, useRef } from 'react';
import styles from './work-formats.module.css';

type StudyVars = React.CSSProperties & Record<`--${string}`, string>;

const projects = [
  {
    number: '01',
    category: '个人网站',
    title: '一个持续生长的个人索引',
    summary: '身份、想法与作品如何进入同一套阅读结构。',
    year: '2026',
    role: '方向 / 设计 / 构建',
  },
  {
    number: '02',
    category: '内容系统',
    title: '从零散观察到持续表达',
    summary: '把尚未成形的判断，组织成可以继续使用的方法。',
    year: '2026',
    role: '研究 / 编辑 / 工作流',
  },
  {
    number: '03',
    category: '视觉实验',
    title: '让身份拥有不止一种表情',
    summary: '在保持辨识度的同时，让视觉随内容发生变化。',
    year: '2025',
    role: '概念 / 视觉方向',
  },
];

export default function WorkFormatsStudy() {
  const generationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = generationRef.current;
    if (!section) return;
    const targetSection = section;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let target = 0;
    let current = reduceMotion ? 1 : 0;
    let frame = 0;
    let running = false;

    const measure = () => {
      const rect = targetSection.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      target = reduceMotion ? 1 : Math.min(1, Math.max(0, -rect.top / distance));
      if (!running) {
        running = true;
        frame = window.requestAnimationFrame(render);
      }
    };

    function render() {
      current += (target - current) * (reduceMotion ? 1 : 0.085);
      const eased = current * current * (3 - 2 * current);
      targetSection.style.setProperty('--generation', eased.toFixed(4));
      targetSection.style.setProperty('--generation-raw', current.toFixed(4));
      targetSection.style.setProperty('--build-edge', `${18 + eased * 68}%`);
      targetSection.style.setProperty('--loose-x', `${(1 - eased) * 72}px`);
      targetSection.style.setProperty('--loose-y', `${(1 - eased) * 28}px`);
      targetSection.style.setProperty('--rot-a', `${(1 - eased) * -8}deg`);
      targetSection.style.setProperty('--rot-b', `${(1 - eased) * 5}deg`);
      targetSection.style.setProperty('--rot-c', `${(1 - eased) * -4}deg`);
      targetSection.style.setProperty('--rot-d', `${(1 - eased) * 7}deg`);
      if (Math.abs(target - current) > 0.0005) {
        frame = window.requestAnimationFrame(render);
      } else {
        running = false;
      }
    }

    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a href="#top" className={styles.brand}>WORK FORMAT STUDY</a>
        <nav aria-label="比较页导航">
          <a href="#motion">滚动生成</a>
          <a href="#route-a">A 档案列表</a>
          <a href="#route-b">B 项目章节</a>
          <a href="#route-c">C 混合结构</a>
        </nav>
        <span>3 DIRECTIONS / 2026</span>
      </header>

      <section className={styles.intro} id="top">
        <p>SCROLL FEEL + WORK PRESENTATION</p>
        <h1><span>先看它如何生成，</span><span>再看作品如何出现。</span></h1>
        <div>
          <span>本页内容均为排版示意</span>
          <span>向下滚动开始比较</span>
        </div>
      </section>

      <section
        className={styles.generation}
        id="motion"
        ref={generationRef}
        style={{ '--generation': '0', '--generation-raw': '0', '--build-edge': '18%', '--loose-x': '72px', '--loose-y': '28px', '--rot-a': '-8deg', '--rot-b': '5deg', '--rot-c': '-4deg', '--rot-d': '7deg' } as StudyVars}
      >
        <div className={styles.generationSticky}>
          <div className={styles.generationMeta}>
            <span>02A / TYPE CONSTRUCTION</span>
            <span>滚轮是输入，画面带缓冲追随</span>
          </div>
          <div className={styles.construction} aria-label="想法成形的滚动生成示意">
            <div className={styles.rawGlyphs} aria-hidden="true">
              <span>想</span><span>法</span><span>成</span><span>形</span>
            </div>
            <div className={styles.formedWindow} aria-hidden="true">
              <div className={styles.formedGlyphs}>
                <span>想</span><span>法</span><span>成</span><span>形</span>
              </div>
            </div>
            <div className={styles.buildEdge} aria-hidden="true"><span>BUILD</span><i /></div>
            <span className={styles.rawLabel}>RAW / 01</span>
            <span className={styles.formedLabel}>FORMED / 04</span>
          </div>
          <p className={styles.motionNote}>继续滚动，感受画面不是立即停住，而是短暂追上你的滚轮。</p>
        </div>
      </section>

      <section className={`${styles.route} ${styles.archiveRoute}`} id="route-a">
        <RouteHeading
          label="ROUTE A / ARCHIVE INDEX"
          title="作品档案列表"
          description="一眼看见作品数量与结构；滚到某一项时，视觉材料才进入。"
        />

        <div className={styles.archiveStage}>
          <div className={styles.archiveRows}>
            <div className={styles.archiveColumns} aria-hidden="true">
              <span>NO. / TYPE</span><span>PROJECT</span><span>YEAR / ROLE</span>
            </div>
            {projects.map((project) => (
              <article className={styles.archiveRow} key={project.number}>
                <p><span>{project.number}</span>{project.category}</p>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <p><span>{project.year}</span>{project.role}</p>
                <div className={styles.rowVisual} aria-hidden="true">
                  <span>{project.number}</span><i /><b>PROJECT VISUAL</b>
                </div>
              </article>
            ))}
          </div>

          <aside className={styles.archivePreview} aria-hidden="true">
            <div><span>01</span><i /><b>PROJECT VISUAL</b></div>
            <p>滚动或悬停时出现当前作品主视觉</p>
          </aside>
        </div>
      </section>

      <section className={`${styles.route} ${styles.chapterRoute}`} id="route-b">
        <RouteHeading
          label="ROUTE B / PROJECT CHAPTERS"
          title="单个作品章节"
          description="每件作品获得一段完整的阅读时间，像杂志专题一样逐个展开。"
        />

        <div className={styles.chapterStack}>
          {projects.slice(0, 2).map((project, index) => (
            <article className={styles.projectChapter} key={project.number}>
              <header>
                <span>PROJECT / {project.number}</span>
                <span>{project.category}</span>
                <span>{project.year}</span>
              </header>
              <div className={styles.chapterVisual} aria-hidden="true">
                <span>{project.number}</span>
                <div className={index === 0 ? styles.visualFrameOne : styles.visualFrameTwo} />
                <b>SELECTED WORK</b>
              </div>
              <div className={styles.chapterCopy}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div><span>{project.role}</span><a href="#route-c">查看详情 ↗</a></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.route} ${styles.hybridRoute}`} id="route-c">
        <RouteHeading
          label="ROUTE C / INDEX + FEATURE"
          title="目录与重点项目结合"
          description="先快速建立作品全貌，再把真正重要的一件事展开成视觉章节。"
        />

        <div className={styles.hybridIndex}>
          <div className={styles.hybridIndexHead} aria-hidden="true">
            <span>INDEX</span><span>PROJECT / TYPE</span><span>ROLE</span><span>YEAR</span>
          </div>
          {projects.map((project) => (
            <a href="#featured-project" key={project.number}>
              <span>{project.number}</span>
              <strong>{project.title}<small>{project.category}</small></strong>
              <span>{project.role}</span>
              <span>{project.year} ↘</span>
            </a>
          ))}
        </div>

        <article className={styles.featuredProject} id="featured-project">
          <div className={styles.featuredTopline}>
            <span>FEATURED / 01</span>
            <span>PERSONAL WEBSITE</span>
          </div>
          <div className={styles.featuredTitle}>
            <h3>一个持续生长的<br />个人索引</h3>
            <p>不是一次性介绍自己，而是让作品、判断和正在发生的事情继续进入同一个结构。</p>
          </div>
          <div className={styles.featuredVisual} aria-hidden="true">
            <span>01</span><i /><b>FEATURED PROJECT</b>
          </div>
          <div className={styles.featuredMeta}>
            <span>方向 / 设计 / 构建</span>
            <span>2026 — 进行中</span>
            <a href="#top">进入项目 ↗</a>
          </div>
        </article>
      </section>

      <footer className={styles.footer}>
        <span>END OF COMPARISON</span>
        <a href="#top">回到顶部 ↑</a>
      </footer>
    </main>
  );
}

function RouteHeading({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className={styles.routeHeading}>
      <p>{label}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
