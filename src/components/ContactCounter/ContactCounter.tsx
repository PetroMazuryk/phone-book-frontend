import React from 'react';
import css from './TaskCounter.module.css';

type Contact = {
  id: string;
  title: string;
  favorite: boolean;
};

type ContactCounterProps = {
  contacts: Contact[];
};

export const ContactCounter: React.FC<ContactCounterProps> = ({ contacts }) => {
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
