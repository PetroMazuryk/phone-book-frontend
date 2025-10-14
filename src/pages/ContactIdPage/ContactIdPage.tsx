import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  selectContacts,
  selectLoading,
  selectError,
} from '../../redux/contacts/selectors';
import { fetchContactById } from '../../redux/contacts/operations';
import icon from '../../assets/sprite.svg';
import styles from './ContactIdPage.module.css';

const ContactIdPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const contact = contacts.find((c) => c.id === id);

  useEffect(() => {
    if (id && !contact) {
      dispatch(fetchContactById(id));
    }
  }, [dispatch, id, contact]);

  if (loading) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: 100 }}>
        Loading contact...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: 100, color: 'red' }}>
        Error: {error}
      </h2>
    );
  }

  if (!contact) {
    return (
      <h2 style={{ textAlign: 'center', marginTop: 100 }}>
        Contact not found 😔
      </h2>
    );
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.iconsWrapper}>
        <svg
          className={`${styles.like} ${
            contact.favorite ? styles.likeActive : ''
          }`}
        >
          <use href={`${icon}#icon-heart`} />
        </svg>

        <svg
          className={`${styles.checkbox} ${
            contact.priority ? styles.checked : ''
          }`}
        >
          <use href={`${icon}#icon-checkbox`} />
        </svg>
      </div>

      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardTitle}>{contact.name}</div>
        <div className={styles.cardInfo}>{contact.phone}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/contacts" style={{ color: 'var(--color-btn-active)' }}>
          ← Back
        </Link>
      </div>
    </div>
  );
};

export default ContactIdPage;
