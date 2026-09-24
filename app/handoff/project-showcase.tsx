'use client';

import { useState, type PointerEvent } from 'react';
import { featuredProjects } from '@/content/site-content';
import styles from './handoff.module.css';

type ProjectKey = (typeof featuredProjects)[number]['key'];

const readingRows = [
  ['01', '问题', '前景遮挡如何影响观看'],
  ['02', '资料', '来源、范围与证据'],
  ['03', '实验', '观察、假设与修改'],
  ['04', '复盘', '结论与下一步'],
] as const;

function ReadingLayer({ className }: { className: string }) {
  return (
    <div className={`${styles.readingLayer} ${className}`}>
      <div className={styles.readingHeading}>
        <span>OBSERVATION / EVIDENCE</span>
        <span>WORKSHOP LOG</span>
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
      <strong className={styles.readingWord}>观画</strong>
    </div>
  );
}

const productionTracks = ['REFERENCE', 'LIGHT', 'TEST', 'REVIEW'];

function ProductionBoard() {
  return (
    <div className={styles.musicBoard}>
      <div className={styles.musicScale}><span>INPUT</span><span>CHECK</span><span>REVISE</span><span>OUTPUT</span></div>
      <div className={styles.musicTracks}>
        {productionTracks.map((track, index) => (
          <div className={styles.musicTrack} key={track}>
            <span>0{index + 1} / {track}</span>
            <div><i /><i /><i /></div>
          </div>
        ))}
      </div>
      <i className={styles.musicPlayhead} />
      <p className={styles.musicStatus}>PRODUCTION LOG / ITERATION TRACE</p>
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
  const isReadingProject = event.currentTarget.dataset.projectKind === 'workshop';
  event.currentTarget.style.setProperty('--pointer-x', '0px');
  event.currentTarget.style.setProperty('--pointer-y', '0px');
  event.currentTarget.style.setProperty('--cursor-x', isReadingProject ? '34%' : '50%');
  event.currentTarget.style.setProperty('--cursor-y', isReadingProject ? '52%' : '50%');
}

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState<ProjectKey>('workshop');
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
            onClick={() => setActiveProject(project.key)}
            onPointerLeave={resetLayers}
            onPointerMove={moveLayers}
          >
            <div className={styles.cardTopline}>
              <span>{project.number} / {project.label}</span>
              <span>READ ↓</span>
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
                <ProductionBoard />
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
          <p>{active.label} / CURRENT RECORD</p>
          <h3>{active.title}</h3>
          <p>{active.detail}</p>
        </div>
      </article>
    </>
  );
}
