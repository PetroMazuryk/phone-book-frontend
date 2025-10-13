import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import ContactIdPage from './pages/ContactIdPage/ContactIdPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <div style={{ textAlign: 'center', marginTop: 50 }}>Home Page</div>
          }
        />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="/contacts/:id" element={<ContactIdPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
