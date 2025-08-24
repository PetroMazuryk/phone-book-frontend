import { Routes, Route } from 'react-router-dom';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<div style={{ textAlign: 'center' }}>Home Page</div>}
        />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
