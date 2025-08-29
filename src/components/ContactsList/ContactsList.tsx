import ContactCard from '../ContactCard/ContactCard';
import styles from './ContactsList.module.css';
import { Contact } from '../../types';

type ContactsListProps = {
  contacts: Contact[];
};

const ContactsList: React.FC<ContactsListProps> = ({ contacts }) => (
  <div className={styles.cardsGrid}>
    {contacts.map((contact) => (
      <ContactCard key={contact.id} name={contact.name} phone={contact.phone} />
    ))}
  </div>
);

export default ContactsList;
