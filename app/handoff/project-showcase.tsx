'use client';

import { useState, type PointerEvent } from 'react';
import { featuredProjects } from '@/content/site-content';
import styles from './handoff.module.css';

type ProjectKey = (typeof featuredProjects)[number]['key'];

const readingRows = [
  ['01', '项目背景', '内容待补充'],
  ['02', '表达对象', '内容待补充'],
  ['03', '信息结构', '内容待补充'],
  ['04', '阶段成果', '内容待补充'],
] as const;

function ReadingLayer({ className }: { className: string }) {
  return (
    <div className={`${styles.readingLayer} ${className}`}>
      <div className={styles.readingHeading}>
        <span>YILIU / INFORMATION FLOW</span>
        <span>READING MAP</span>
      </div>
      <div className={styles.readingRows}>
        {readingRows.map(([number, label, value]) => (
          <p key={number}>
            <span>{number}</span>
            <strong>{label}</strong>
            <small>{value}</small>
          </p>
        ))}
      </div>
      <strong className={styles.readingWord}>忆流</strong>
    </div>
  );
}

function MusicBoard() {
  return (
    <div className={styles.musicBoard}>
      <div className={styles.musicScale}><span>00</span><span>08</span><span>16</span><span>24</span></div>
      <div className={styles.musicTracks}>
        {[1, 2, 3, 4].map((track) => (
          <div className={styles.musicTrack} key={track}>
            <span>TRACK 0{track}</span>
            <div><i /><i /><i /></div>
          </div>
        ))}
      </div>
      <i className={styles.musicPlayhead} />
      <p className={styles.musicStatus}>COLLABORATIVE BUILD / DETAILS TO FOLLOW</p>
    </div>
  );
}

function moveLayers(event: PointerEvent<HTMLAnchorElement>) {
  if (event.pointerType === 'touch') return;

  const visual = event.currentTarget.querySelector<HTMLElement>('[data-project-visual]');
  if (!visual) return;

  const bounds = visual.getBoundingClientRect();
  const localX = Math.min(bounds.width, Math.max(0, event.clientX - bounds.left));
  const localY = Math.min(bounds.height, Math.max(0, event.clientY - bounds.top));
  const x = localX / bounds.width - 0.5;
  const y = localY / bounds.height - 0.5;
  event.currentTarget.style.setProperty('--pointer-x', `${(x * 30).toFixed(2)}px`);
  event.currentTarget.style.setProperty('--pointer-y', `${(y * 24).toFixed(2)}px`);
  event.currentTarget.style.setProperty('--cursor-x', `${((localX / bounds.width) * 100).toFixed(2)}%`);
  event.currentTarget.style.setProperty('--cursor-y', `${((localY / bounds.height) * 100).toFixed(2)}%`);
}

function resetLayers(event: PointerEvent<HTMLAnchorElement>) {
  const isReadingProject = event.currentTarget.dataset.projectKind === 'yiliu';
  event.currentTarget.style.setProperty('--pointer-x', '0px');
  event.currentTarget.style.setProperty('--pointer-y', '0px');
  event.currentTarget.style.setProperty('--cursor-x', isReadingProject ? '34%' : '50%');
  event.currentTarget.style.setProperty('--cursor-y', isReadingProject ? '52%' : '50%');
}

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState<ProjectKey>('yiliu');
  const active = featuredProjects.find((project) => project.key === activeProject) ?? featuredProjects[0];

  return (
    <>
      <div className={styles.projectGrid}>
        {featuredProjects.map((project, index) => (
          <a
            className={`${styles.projectCard} ${index === 0 ? styles.primaryCard : styles.showcaseCard}`}
            href={project.href}
            key={project.key}
            data-project-kind={project.key}
            onClick={project.key === 'yiliu' ? () => setActiveProject(project.key) : undefined}
            onPointerLeave={resetLayers}
            onPointerMove={moveLayers}
          >
            <div className={styles.cardTopline}>
              <span>{project.number} / {project.label}</span>
              <span>OPEN ↗</span>
            </div>

            <div
              className={`${styles.cardVisual} ${index === 0 ? styles.readingVisual : styles.musicVisual}`}
              data-project-visual
              aria-hidden="true"
            >
              {index === 0 ? (
                <>
                  <ReadingLayer className={styles.readingBase} />
                  <ReadingLayer className={styles.readingFocus} />
                  <i className={styles.readingCursor} />
                </>
              ) : (
                <MusicBoard />
              )}
            </div>

            <div className={styles.cardCopy}>
              <h3>{project.title}</h3>
              <p>{project.note}</p>
            </div>
          </a>
        ))}
      </div>

      <article className={styles.projectDetail} id="project-detail" aria-live="polite">
        <span>{active.number}</span>
        <div>
          <p>{active.label} / SELECTED</p>
          <h3>{active.title}</h3>
          <p>{active.detail}</p>
        </div>
      </article>
    </>
  );
}
