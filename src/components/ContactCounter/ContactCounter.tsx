import { Contact } from '../../types';
import css from './ContactCounter.module.css';

type ContactCounterProps = {
  contacts: Contact[];
};

const ContactCounter = ({ contacts }: ContactCounterProps) => {
  const count = contacts.reduce(
    (acc, contact) => {
      if (contact.favorite) {
        acc.favorite += 1;
      } else {
        acc.hot += 1;
      }
      return acc;
    },
    { hot: 0, favorite: 0 }
  );

  return (
    <div>
      <p className={css.text}>Hot: {count.hot}</p>
      <p className={css.text}>Favorite: {count.favorite}</p>
    </div>
  );
};

export default ContactCounter;
