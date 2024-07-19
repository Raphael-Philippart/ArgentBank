import React from 'react';
import styles from './HomeHeader.module.scss'

const HomeHeader = () => {
  return <div className={styles.hero}>
    <section className={styles.heroContent}>
      <h2 className="sr-only">Promoted Content</h2>
      <p className={styles.heroSubtitle}>No fees.</p>
      <p className={styles.heroSubtitle}>No minimum deposit.</p>
      <p className={styles.heroSubtitle}>High interest rates.</p>
      <p className={styles.heroText}>Open a savings account with Argent Bank today!</p>
    </section>
  </div>
};

export default HomeHeader;
