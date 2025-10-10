import { useAppSelector } from '../../hooks';
import { selectContacts } from '../../redux/contacts/selectors';
import ContactCounter from '../../components/ContactCounter/ContactCounter';
import ContactsList from '../../components/ContactsList/ContactsList';
import CustomText from '../../components/CustomText/CustomText';

import styles from './ContactsPage.module.css';

function ContactsPage() {
  const contactsArray = useAppSelector(selectContacts);
  return (
    <div className={styles.wrapper}>
      <ContactCounter contacts={contactsArray} />
      <CustomText>Contact List</CustomText>
      <ContactsList />
    </div>
  );
}

export default ContactsPage;
