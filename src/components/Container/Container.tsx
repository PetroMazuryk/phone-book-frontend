import React, { ReactNode } from 'react';
import styles from './Container.module.css';

type ContainerProps = {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  fluid = false,
  className = '',
}) => {
  return (
    <div
      className={`${styles.container} ${
        fluid ? styles.fluid : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
