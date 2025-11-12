import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { RestrictedRoute } from './components/RestrictedRoute';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import ContactIdPage from './pages/ContactIdPage/ContactIdPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RegisterPage from './components/RegisterForm/RegisterForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <div style={{ textAlign: 'center', marginTop: 80 }}>Home Page</div>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={
                <div style={{ textAlign: 'center', marginTop: 80 }}>Login</div>
              }
            />
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
