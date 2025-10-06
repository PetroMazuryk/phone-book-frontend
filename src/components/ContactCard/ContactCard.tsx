import React, { useState } from 'react';
import { Contact } from '../../types';
import { useAppDispatch } from '../../hooks';
import CustomButton from '../CustomButton/CustomButton';
import { ModalManager } from '../../components/ModalManager/ModalManager';
import { openModal } from '../../redux/modal/modalSlice';
import { toggleFavorite } from '../../redux/contacts/operations';

import icon from '../../assets/sprite.svg';
import styles from './ContactCard.module.css';

type ContactCardProps = Pick<Contact, 'id' | 'name' | 'phone' | 'favorite'>;

const ContactCard: React.FC<ContactCardProps> = ({
  id,
  name,
  phone,
  favorite,
}) => {
  const dispatch = useAppDispatch();

  const [checked, setChecked] = useState(false);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ id, favorite: !favorite }));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconsWrapper}>
        <button onClick={handleToggleFavorite} type="button">
          <svg
            className={`${styles.like} ${favorite ? styles.likeActive : ''}`}
          >
            <use href={`${icon}#icon-heart`} />
          </svg>
        </button>

        <button
          onClick={() => setChecked((prev) => !prev)}
          type="button"
          aria-label="Toggle checkbox"
        >
          <svg
            className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
          >
            <use href={`${icon}#icon-checkbox`} />
          </svg>
        </button>
      </div>

      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardTitle}>{name}</div>
        <div className={styles.cardInfo}>{phone}</div>
      </div>

      <div className={styles.cardActions}>
        <CustomButton
          onClick={() => dispatch(openModal({ type: 'edit', props: { id } }))}
          variant="primary"
        >
          Edit
        </CustomButton>

        <CustomButton
          variant="secondary"
          onClick={() =>
            dispatch(
              openModal({ type: 'confirmDelete', props: { id, name, phone } })
            )
          }
        >
          Delete
        </CustomButton>
        <ModalManager />
      </div>
    </div>
  );
};

export default ContactCard;
