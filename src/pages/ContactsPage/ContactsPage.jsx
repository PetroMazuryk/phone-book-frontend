import ContactsList from '../../components/ContactsList/ContactsList';
import CustomText from '../../components/CustomText/CustomText';

function ContactsPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: 46 }}>
      <CustomText>Contact List</CustomText>
      <ContactsList />
    </div>
  );
}

export default ContactsPage;
