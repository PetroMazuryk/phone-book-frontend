import React from 'react';
import { Contact } from '../../types';
import CustomButton from '../CustomButton/CustomButton';

import styles from './ContactCard.module.css';

type ContactCardProps = Pick<Contact, 'name' | 'phone'>;

const ContactCard: React.FC<ContactCardProps> = ({ name, phone }) => (
  <div className={styles.cardContainer}>
    <div className={styles.cardTitle}>{name}</div>
    <div className={styles.cardInfo}>{phone}</div>
    <CustomButton variant="primary">Edit</CustomButton>
    <CustomButton variant="secondary">Delete</CustomButton>
  </div>
);

export default ContactCard;
