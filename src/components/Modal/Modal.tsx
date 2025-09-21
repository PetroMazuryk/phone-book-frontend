import { ReactNode } from 'react';
import CustomButton from '../CustomButton/CustomButton';

import styles from './Modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  actions?: ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <div className={styles.modalButtons}>
          {actions}
          <CustomButton onClick={onClose} variant="primary">
            Cansel
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
