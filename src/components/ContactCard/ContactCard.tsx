import React from 'react';
import { Contact } from '../../types';

import styles from './ContactCard.module.css';

type ContactCardProps = Pick<Contact, 'name' | 'phone'>;

const ContactCard: React.FC<ContactCardProps> = ({ name, phone }) => (
  <div className={styles.cardContainer}>
    <div className={styles.cardTitle}>{name}</div>
    <div className={styles.cardInfo}>{phone}</div>
  </div>
);

export default ContactCard;
