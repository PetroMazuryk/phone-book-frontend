import React from 'react';
import styles from './ContactCard.module.css';

type ContactCardProps = {
  name: string;
  phone: string;
};

const ContactCard: React.FC<ContactCardProps> = ({ name, phone }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>{name}</div>
      <div className={styles.cardInfo}>{phone}</div>
    </div>
  );
};

export default ContactCard;
