import React from 'react';
import styles from './Loader.module.css';

export const Loader: React.FC = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonHeader}></div>
      <div className={styles.skeletonLine}></div>
      <div className={styles.skeletonLine}></div>
      <div className={styles.skeletonLineShort}></div>
    </div>
  );
};
