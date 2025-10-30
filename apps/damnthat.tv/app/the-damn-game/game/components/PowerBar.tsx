import React from 'react';
import styles from './PowerBar.module.scss';

const PowerBar = ({ amount, max, color }) => (
  <div className={styles.bar}>
    <div
      style={{ width: (amount / max) * 100 + '%', background: color }}
      className={styles.amount}
    />
  </div>
);

export default PowerBar;
