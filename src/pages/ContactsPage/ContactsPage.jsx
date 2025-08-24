import ContactCard from '../../components/ContactCard/ContactCard';

const mockContacts = [
  { name: 'Alice', phone: '123-456-7890' },
  { name: 'Bob', phone: '987-654-3210' },
  { name: 'Charlie', phone: '555-555-5555' },
];

function ContactsPage() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Contacts</h2>
      {mockContacts.map((contact, index) => (
        <ContactCard key={index} name={contact.name} phone={contact.phone} />
      ))}
    </div>
  );
}

export default ContactsPage;
