import React, { useState } from 'react';
import { Contact } from '../../types';
import CustomButton from '../CustomButton/CustomButton';

import icon from '../../assets/sprite.svg';
import styles from './ContactCard.module.css';

type ContactCardProps = Pick<Contact, 'name' | 'phone'>;

const ContactCard: React.FC<ContactCardProps> = ({ name, phone }) => {
  const [liked, setLiked] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <button onClick={() => setLiked((prev) => !prev)} type="button">
        <svg className={`${styles.like} ${liked ? styles.likeActive : ''}`}>
          <use href={`${icon}#icon-heart`} />
        </svg>
      </button>

      <button
        onClick={() => setChecked((prev) => !prev)}
        type="button"
        aria-label="Toggle checkbox"
      >
        <svg className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
          <use href={`${icon}#icon-checkbox`} />
        </svg>
      </button>

      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardTitle}>{name}</div>
        <div className={styles.cardInfo}>{phone}</div>
      </div>

      <div className={styles.cardActions}>
        <CustomButton variant="primary">Edit</CustomButton>
        <CustomButton variant="secondary">Delete</CustomButton>
      </div>
    </div>
  );
};

export default ContactCard;
