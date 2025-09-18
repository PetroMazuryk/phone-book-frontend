import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { deleteContact } from '../../redux/contacts/operations';
import { Contact } from '../../types';
import CustomButton from '../CustomButton/CustomButton';

import icon from '../../assets/sprite.svg';
import styles from './ContactCard.module.css';

type ContactCardProps = Pick<Contact, 'id' | 'name' | 'phone'>;

const ContactCard: React.FC<ContactCardProps> = ({ id, name, phone }) => {
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconsWrapper}>
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
        <CustomButton variant="primary">Edit</CustomButton>
        <CustomButton variant="secondary" onClick={handleDelete}>
          Delete
        </CustomButton>
      </div>
    </div>
  );
};

export default ContactCard;
