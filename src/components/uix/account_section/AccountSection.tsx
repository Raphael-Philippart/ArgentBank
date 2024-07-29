import React from 'react';
import styles from './AccountSection.module.scss';

interface AccountProps {
  title: string;
  amount: string;
  description: string;
}

const AccountSection: React.FC<AccountProps> = ({ title, amount, description }) => (
  <section className={styles.account}>
    <div className={styles.accountContentWrapper}>
      <h3 className={styles.accountTitle}>{title}</h3>
      <p className={styles.accountAmount}>{amount}</p>
      <p className={styles.accountAmountDescription}>{description}</p>
    </div>
    <div className={`${styles.accountContentWrapper} ${styles.cta}`}>
      <button className={styles.transactionButton}>View transactions</button>
    </div>
  </section>
);

export default AccountSection;
