'use client';

import type { CSSProperties, PointerEvent } from 'react';
import { useState } from 'react';
import styles from './hero-lab.module.css';

type HeroVars = CSSProperties & Record<`--${string}`, string>;

const concepts = [
  { id: '01', name: '紫色透影', english: 'WIDE REVEAL' },
  { id: '02A', name: '文字构造', english: 'TYPE CONSTRUCTION' },
  { id: '02B', name: '句子整理', english: 'SENTENCE SYSTEM' },
  { id: '02C', name: '系统吸附', english: 'SYSTEM INTEGRATION' },
  { id: '05', name: '形状未定', english: 'LIVING FORMS' },
];

const initialVars: HeroVars = {
  '--pointer-x': '38%',
  '--pointer-y': '48%',
  '--reveal-left': '20%',
  '--reveal-right': '44%',
  '--build-right': '62%',
  '--progress': '0.38',
  '--progress-inverse': '0.62',
  '--drift-x': '-15px',
  '--drift-y': '-1px',
};

export default function HeroLab() {
  const [active, setActive] = useState(0);

  const movePointer = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = Math.max(0, Math.min(event.clientX - bounds.left, bounds.width));
    const localY = Math.max(0, Math.min(event.clientY - bounds.top, bounds.height));
    const progress = localX / bounds.width;
    const vertical = localY / bounds.height;
    const percentX = progress * 100;
    const percentY = vertical * 100;
    const revealHalf = bounds.width < 620 ? 28 : 18;

    event.currentTarget.style.setProperty('--pointer-x', `${percentX}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${percentY}%`);
    event.currentTarget.style.setProperty('--reveal-left', `${Math.max(0, percentX - revealHalf)}%`);
    event.currentTarget.style.setProperty('--reveal-right', `${Math.max(0, 100 - percentX - revealHalf)}%`);
    event.currentTarget.style.setProperty('--build-right', `${100 - percentX}%`);
    event.currentTarget.style.setProperty('--progress', progress.toFixed(3));
    event.currentTarget.style.setProperty('--progress-inverse', (1 - progress).toFixed(3));
    event.currentTarget.style.setProperty('--drift-x', `${(progress - 0.5) * 120}px`);
    event.currentTarget.style.setProperty('--drift-y', `${(vertical - 0.5) * 62}px`);
  };

  return (
    <main className={styles.lab}>
      <header className={styles.toolbar}>
        <div className={styles.identity}>
          <strong>HERO STUDY</strong>
          <span>首页首屏排版修改</span>
        </div>
        <nav aria-label="首屏版本切换">
          {concepts.map((concept, index) => (
            <button
              aria-current={active === index ? 'page' : undefined}
              className={active === index ? styles.activeTab : ''}
              key={concept.id}
              onClick={() => setActive(index)}
              type="button"
            >
              <span>{concept.id}</span>{concept.name}
            </button>
          ))}
        </nav>
        <p className={styles.progress}>VERSION {concepts[active].id}</p>
      </header>

      <section
        aria-label={`${concepts[active].name}首屏交互演示`}
        className={`${styles.stage} ${[styles.revealStage, styles.buildStage, styles.sentenceStage, styles.systemStage, styles.formsStage][active]}`}
        onPointerDown={movePointer}
        onPointerMove={movePointer}
        style={initialVars}
      >
        <div className={styles.stageMeta}>
          <span>STUDY {concepts[active].id}</span>
          <span>{concepts[active].english}</span>
        </div>

        {active === 0 && <RevealConcept />}
        {active === 1 && <ConstructionConcept />}
        {active === 2 && <SentenceConcept />}
        {active === 3 && <SystemIntegrationConcept />}
        {active === 4 && <LivingFormsConcept />}

        <div className={styles.moveHint} aria-hidden="true">
          <span>←</span><i /><b>移动</b><i /><span>→</span>
        </div>
      </section>
    </main>
  );
}

const headline = ['让', '想', '法', '留', '下', '形', '状'];

function RevealLine({ alternate = false }: { alternate?: boolean }) {
  return (
    <div className={`${styles.revealLine} ${alternate ? styles.alternateLine : ''}`} aria-hidden={alternate || undefined}>
      {headline.map((character, index) => <span key={`${character}-${index}`}>{character}</span>)}
    </div>
  );
}

function RevealConcept() {
  return (
    <div className={styles.revealComposition}>
      <p className={styles.revealSide}>IDEAS, MADE VISIBLE<br />PORTFOLIO — 2026</p>
      <RevealLine />
      <div className={styles.revealLayer} aria-hidden="true">
        <RevealLine alternate />
      </div>
      <div className={styles.revealHandle} aria-hidden="true">
        <i /><span>↔</span><i />
      </div>
    </div>
  );
}

const constructionGlyphs = ['想', '法', '成', '形'];

function ConstructionGlyphs({ settled = false }: { settled?: boolean }) {
  return (
    <div className={`${styles.constructionGlyphs} ${settled ? styles.settledGlyphs : styles.skeletonGlyphs}`} aria-hidden={settled || undefined}>
      {constructionGlyphs.map((character, index) => (
        <span className={styles[`glyph${index + 1}`]} key={character}>{character}</span>
      ))}
    </div>
  );
}

function ConstructionConcept() {
  return (
    <div className={styles.constructionComposition}>
      <div className={styles.constructionGrid} aria-hidden="true" />
      <ConstructionGlyphs />
      <div className={styles.settledWindow} aria-hidden="true">
        <ConstructionGlyphs settled />
      </div>
      <div className={styles.buildRule} aria-hidden="true">
        <span>BUILD</span><i />
      </div>
      <p className={styles.leftIndex}>RAW<br />01</p>
      <p className={styles.rightIndex}>FORMED<br />04</p>
    </div>
  );
}

const scatteredSentence = [
  { text: '我把', className: 'sentenceToken1' },
  { text: '游离', className: 'sentenceToken2' },
  { text: '的想法', className: 'sentenceToken3' },
  { text: '整理成', className: 'sentenceToken4' },
  { text: '看得见', className: 'sentenceToken5' },
  { text: '的系统', className: 'sentenceToken6' },
];

function OrderedSentence() {
  return (
    <h1 className={styles.orderedSentence}>
      <span className={styles.sentenceRow1}><i>我把</i><b>游离的想法，</b></span>
      <span className={styles.sentenceRow2}>整理成</span>
      <span className={styles.sentenceRow3}>看得见的系统。</span>
    </h1>
  );
}

function SentenceConcept() {
  return (
    <div className={styles.sentenceComposition}>
      <div className={styles.sentenceGrid} aria-hidden="true" />
      <div className={styles.scatteredSentence} aria-hidden="true">
        {scatteredSentence.map((token) => (
          <span className={styles[token.className]} key={token.text}>{token.text}</span>
        ))}
      </div>
      <div className={styles.orderedWindow}>
        <OrderedSentence />
      </div>
      <div className={styles.sortingField} aria-hidden="true" />
      <div className={styles.sentenceRule} aria-hidden="true">
        <span>SORT</span><i />
      </div>
      <p className={styles.dispersedLabel}>DISPERSED<br />IDEAS</p>
      <p className={styles.systemLabel}>VISIBLE<br />SYSTEM</p>
    </div>
  );
}

const systemParts = [
  { index: '01', english: 'ORIGIN', text: '想法', className: 'systemIdea' },
  { index: '02', english: 'OBSERVE', text: '观察', className: 'systemObserve' },
  { index: '03', english: 'RELATE', text: '关系', className: 'systemRelate' },
  { index: '04', english: 'STRUCTURE', text: '结构', className: 'systemStructure' },
  { index: '05', english: 'METHOD', text: '方法', className: 'systemMethod' },
  { index: '06', english: 'VERIFY', text: '验证', className: 'systemVerify' },
  { index: '07', english: 'RESULT', text: '结果', className: 'systemResult' },
];

function SystemIntegrationConcept() {
  return (
    <div className={styles.systemComposition}>
      <h1 className={styles.srOnly}>想法进入系统，并成为系统的一部分。</h1>
      <div className={styles.systemGrid} aria-hidden="true" />
      <div className={styles.systemParts} aria-hidden="true">
        {systemParts.map((part) => (
          <span className={`${styles.systemPart} ${styles[part.className]}`} key={part.index}>
            <i>{part.index} / {part.english}</i>
            <b>{part.text}</b>
          </span>
        ))}
      </div>
      <div className={styles.integrationRule} aria-hidden="true">
        <span>INTEGRATE</span><i />
      </div>
      <p className={styles.systemStateLeft}>LOOSE MATERIAL<br />NO FIXED ROLE</p>
      <p className={styles.systemStateRight}>ONE MATERIAL<br />SEVEN ROLES</p>
    </div>
  );
}

const livingGlyphs = ['形', '状', '未', '定'];

function LivingGlyph({ character, index }: { character: string; index: number }) {
  return (
    <span className={`${styles.livingGlyph} ${styles[`livingGlyph${index + 1}`]}`} aria-label={character}>
      <i className={styles.formGhost} aria-hidden="true">{character}</i>
      <i className={styles.formTop} aria-hidden="true">{character}</i>
      <i className={styles.formMiddle} aria-hidden="true">{character}</i>
      <i className={styles.formBottom} aria-hidden="true">{character}</i>
    </span>
  );
}

function LivingFormsConcept() {
  return (
    <div className={styles.formsComposition}>
      <p className={styles.formsCode}>FORM<br />IS NEVER<br />FINAL</p>
      <div className={styles.formsHeadline}>
        {livingGlyphs.map((character, index) => <LivingGlyph character={character} index={index} key={character} />)}
      </div>
      <div className={styles.formsAxis} aria-hidden="true"><i /></div>
      <p className={styles.formsCount}>04 CHARACTERS<br />12 MOVING PLANES</p>
    </div>
  );
}
