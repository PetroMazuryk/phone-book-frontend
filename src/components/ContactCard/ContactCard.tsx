import React from 'react';
import { Contact } from '../../types';
import CustomButton from '../CustomButton/CustomButton';

import icon from '../../assets/sprite.svg';
import styles from './ContactCard.module.css';

type ContactCardProps = Pick<Contact, 'name' | 'phone'>;

const ContactCard: React.FC<ContactCardProps> = ({ name, phone }) => (
  <div className={styles.cardContainer}>
    <button>
      <svg className={`${styles.like} ${true ? styles.likeActive : ''}`}>
        <use href={`${icon}#icon-heart`}></use>
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

export default ContactCard;
