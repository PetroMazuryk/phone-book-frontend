import ContactsList from '../../components/ContactsList/ContactsList';

const mockContacts = [
  { id: 1, name: 'Alice', phone: '123-456-7890' },
  { id: 2, name: 'Bob', phone: '987-654-3210' },
  { id: 3, name: 'Charlie', phone: '555-555-5555' },
  { id: 4, name: 'Alice', phone: '123-456-7890' },
  { id: 5, name: 'Bob', phone: '987-654-3210' },
  { id: 6, name: 'Charlie', phone: '555-555-5555' },
  { id: 7, name: 'Alice', phone: '123-456-7890' },
  { id: 8, name: 'Bob', phone: '987-654-3210' },
  { id: 9, name: 'Charlie', phone: '555-555-5555' },
];

function ContactsPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: 46 }}>
      <h2>Contacts</h2>
      <ContactsList contacts={mockContacts} />
    </div>
  );
}

export default ContactsPage;
