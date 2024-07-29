import {FC} from 'react';
import AccountSection from "../account_section/AccountSection";
import styles from './Transactions.module.scss';

interface TTransactionsProps {

}

const Transactions: FC<TTransactionsProps> = (props: TTransactionsProps) => {
  return <div className={styles.Transactions}>
    <AccountSection
      title="Argent Bank Checking (x8349)"
      amount="$2,082.79"
      description="Available Balance"/>
    <AccountSection
      title="Argent Bank Savings (x6712)"
      amount="$10,928.42"
      description="Available Balance"
    />
    <AccountSection
      title="Argent Bank Credit Card (x8349)"
      amount="$184.30"
      description="Current Balance"
    />
  </div>
};

export default Transactions;
