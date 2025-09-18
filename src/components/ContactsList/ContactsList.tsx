import React, { useEffect } from 'react';
import ContactCard from '../ContactCard/ContactCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectContacts,
  selectLoading,
  selectError,
} from '../../redux/contacts/selectors';
import { fetchContacts } from '../../redux/contacts/operations';

import styles from './ContactsList.module.css';

const ContactsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className={styles.cardsGrid}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}
        />
      ))}
    </div>
  );
};

export default ContactsList;
