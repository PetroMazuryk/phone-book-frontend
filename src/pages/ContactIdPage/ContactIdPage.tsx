import { useParams } from 'react-router-dom';

const ContactIdPage = () => {
  const { id } = useParams();

  return (
    <h2 style={{ textAlign: 'center', marginTop: 100 }}>Contact ID: {id}</h2>
  );
};

export default ContactIdPage;
