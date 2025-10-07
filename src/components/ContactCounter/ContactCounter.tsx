import { Contact } from '../../types';
import css from './ContactCounter.module.css';

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
    <div>
      <p className={css.text}>Total: {contacts.length}</p>
      <p className={css.text}>Priority: {count.priority}</p>
      <p className={css.text}>Favorite: {count.favorite}</p>
    </div>
  );
};

export default ContactCounter;
