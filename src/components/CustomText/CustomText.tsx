import React from 'react';
import styles from './CustomText.module.css';

type CustomTextProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'error';
  className?: string;
};

const CustomText: React.FC<CustomTextProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  return (
    <span className={`${styles.text} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default CustomText;
