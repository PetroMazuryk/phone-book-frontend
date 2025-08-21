import styles from './ContactCard.module.css';

const ContactCard = ({ name, phone }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitle}>{name}</div>
      <div className={styles.cardInfo}>{phone}</div>
    </div>
  );
};

export default ContactCard;
