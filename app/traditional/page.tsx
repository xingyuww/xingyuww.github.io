import type { Metadata } from 'next';
import styles from './traditional-hero.module.css';

export const metadata: Metadata = {
  title: '个人站首屏 B 版',
  description: '以姓名、索引和淡紫色透明层构成的个人站首屏排版实验。',
};

const indexItems = ['想法', '方法', '项目', '记录'];

export default function TraditionalHeroPage() {
  return (
    <main className={styles.page} id="top">
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top" aria-label="回到页面顶部">
          <span>LZ</span>
          <strong>LIN ZIHAN</strong>
        </a>

        <nav className={styles.navigation} aria-label="首屏示意导航">
          <a href="#index">索引</a>
          <a href="#statement">关于</a>
          <a href="#statement">联系</a>
        </nav>

        <p className={styles.headerNote}>PERSONAL SITE / 2026</p>
      </header>

      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.cornerIndex} aria-hidden="true">
          <span>31.2304° N</span>
          <span>121.4737° E</span>
        </div>

        <div className={styles.transparentSheet} aria-hidden="true">
          <span>THOUGHTS BECOME VISIBLE</span>
          <i />
        </div>

        <div className={styles.nameBlock}>
          <p className={styles.eyebrow}>A PERSONAL INDEX OF THINGS IN PROGRESS</p>
          <h1 className={styles.name} id="hero-title" aria-label="Lin Zihan">
            <span className={styles.nameLineOne}>
              <b>LIN</b>
              <i aria-hidden="true">001</i>
            </span>
            <span className={styles.nameLineTwo}>
              <b>ZIHAN</b>
              <i aria-hidden="true">002</i>
            </span>
          </h1>
        </div>

        <div className={styles.indexRail} id="index">
          <p>INDEX / 01—04</p>
          <ol>
            {indexItems.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                <a href="#statement">{item}</a>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.statement} id="statement">
          <p className={styles.lead}>
            这里会放下正在形成的想法、<br />
            做过的项目，以及它们彼此之间的关系。
          </p>
          <div className={styles.statementBottom}>
            <p>
              首屏先让人记住一个人和一种思考方式，<br />
              而不是立刻被一排作品推着往下看。
            </p>
            <a href="#index">开始浏览 <span aria-hidden="true">↘</span></a>
          </div>
        </div>

        <div className={styles.bottomRegister} aria-hidden="true">
          <span>FIRST VIEW / B—01</span>
          <span className={styles.rule} />
          <span>NAME × INDEX × TRANSPARENT LAYER</span>
        </div>
      </section>
    </main>
  );
}
