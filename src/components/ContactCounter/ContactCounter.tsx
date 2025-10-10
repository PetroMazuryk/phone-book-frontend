import { Contact } from '../../types';
import styles from './ContactCounter.module.css';

type ContactCounterProps = {
  contacts: Contact[];
};

const ContactCounter = ({ contacts }: ContactCounterProps) => {
  const count = contacts.reduce(
    (acc, contact) => {
      if (contact.favorite) acc.favorite += 1;
      if (contact.priority) acc.priority += 1;
      return acc;
    },
    { priority: 0, favorite: 0 }
  );

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>Total: {contacts.length}</p>
      <p className={styles.text}>Priority: {count.priority}</p>
      <p className={styles.text}>Favorite: {count.favorite}</p>
      <hr className={styles.line} />
    </div>
  );
};

export default ContactCounter;
