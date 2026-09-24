import Image from 'next/image';
import styles from './handoff.module.css';
import { explorations, profile } from '@/content/site-content';

export default function HandoffStudy() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p>PERSONAL SITE / 2026</p>
        <nav aria-label="主导航">
          <a href="#about">关于</a>
          <a href="/explorations/articles">文章</a>
          <a href="/explorations/wallpapers">壁纸</a>
        </nav>
        <span>{profile.location}</span>
      </header>

      <section className={styles.hero} id="about" aria-labelledby="site-title">
        <div className={styles.identity}>
          <p className={styles.eyebrow}>
            {profile.displayName} <span>/</span> {profile.romanizedName}
          </p>
          <h1 id="site-title">
            {profile.heroQuestion.map((line, index) => (
              <span className={index === 0 ? styles.questionContext : undefined} key={line}>
                {line}
              </span>
            ))}
          </h1>
        </div>

        <figure className={styles.portrait}>
          <div className={styles.portraitMatte}>
            <Image
              alt="深紫色短发、手持平板的星语人物形象"
              className={styles.portraitImage}
              fill
              priority
              sizes="(max-width: 820px) calc(100vw - 36px), 30vw"
              src="/images/xingyu-character.png"
            />
          </div>
        </figure>

        <div className={styles.statement}>
          <p className={styles.statementLead}>
            {profile.heroTension.map((line) => <span key={line}>{line}</span>)}
          </p>
          <p className={styles.statementClose}>
            {profile.heroPosition.map((line) => <span key={line}>{line}</span>)}
          </p>
        </div>

        <div className={styles.bottomLine} aria-hidden="true">
          <span>01 / ABOUT</span>
          <i />
          <span>NEXT / ARTICLES &amp; WALLPAPERS ↓</span>
        </div>
      </section>

      <section className={styles.explorations} id="explorations" aria-labelledby="explorations-title">
        <div>
          <p className={styles.sectionMarker}>02 / WRITING &amp; IMAGES</p>
          <h2 id="explorations-title">文章与壁纸</h2>
        </div>
        <div className={styles.explorationIndex}>
          {explorations.map((exploration) => (
            <a href={`/explorations/${exploration.slug}`} key={exploration.slug}>
              <span>{exploration.number}</span>
              <strong>{exploration.title}</strong>
              <small>{exploration.note}</small>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <span>{profile.displayName} / 2026</span>
      </footer>
    </main>
  );
}
