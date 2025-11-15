import { useEffect } from 'react';
import ContactCard from '../ContactCard/ContactCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
  selectContacts,
  selectLoading,
  selectError,
} from '../../redux/contacts/selectors';
import {
  selectStatusFilter,
  selectNameFilter,
  selectPhoneFilter,
} from '../../redux/filters/selectors';
import { fetchContacts } from '../../redux/contacts/operations';
import { statusFilters } from '../../redux/filters/constants';

import styles from './ContactsList.module.css';

const ContactsList = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const status = useAppSelector(selectStatusFilter);
  const nameFilter = useAppSelector(selectNameFilter);
  const phoneFilter = useAppSelector(selectPhoneFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const normalizePhone = (phone: string) => phone.replace(/[\s\-()]/g, '');

  const visibleContacts = contacts.filter((contact) => {
    const matchesName = contact.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());

    const matchesPhone = normalizePhone(contact.phone).includes(
      normalizePhone(phoneFilter)
    );

    const matchesStatus =
      status === statusFilters.total ||
      (status === statusFilters.favorite && contact.favorite) ||
      (status === statusFilters.priority && contact.priority);

    return matchesName && matchesPhone && matchesStatus;
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.cardsGrid}>
      {visibleContacts.map((contact) => (
        <ContactCard key={contact.id} {...contact} />
      ))}
    </div>
  );
};

export default ContactsList;
