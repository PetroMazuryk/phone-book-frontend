import React, { useEffect } from 'react';
import { Contact } from '../../types';
import ContactCard from '../ContactCard/ContactCard';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchContacts } from '../../redux/contacts/operations';
import { statusFilters } from '../../redux/filters/constants';

import styles from './ContactsList.module.css';

const getVisibleContacts = (
  contacts: Contact[],
  statusFilter: string
): Contact[] => {
  switch (statusFilter) {
    case statusFilters.favorite:
      return contacts.filter((contact) => contact.favorite);
    case statusFilters.priority:
      return contacts.filter((contact) => contact.priority);
    default:
      return contacts;
  }
};

const ContactsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.items);
  const loading = useAppSelector((state) => state.contacts.loading);
  const error = useAppSelector((state) => state.contacts.error);
  const statusFilter = useAppSelector((state) => state.filters.status);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const visibleContacts = getVisibleContacts(contacts, statusFilter);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className={styles.cardsGrid}>
      {visibleContacts.map((contact) => (
        <ContactCard
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}
          favorite={contact.favorite}
          priority={contact.priority}
        />
      ))}
    </div>
  );
};

export default ContactsList;
