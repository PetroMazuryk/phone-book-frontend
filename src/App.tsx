import { useEffect } from 'react';
import { useAppDispatch } from './hooks/reduxHooks';
import { Routes, Route } from 'react-router-dom';
import { refreshUser } from './redux/auth/operations';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
import ContactsPage from './pages/ContactsPage/ContactsPage';
import ContactIdPage from './pages/ContactIdPage/ContactIdPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginForm from './components/LoginForm/LoginForm';
import { HomeMessage } from './components/HomeMessage/HomeMessage';

function App() {
  const dispatch = useAppDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <b>Refreshing user...</b>;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeMessage />} />
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
            <RestrictedRoute redirectTo="/contacts" component={<LoginForm />} />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
        <Route path="/contacts/:id" element={<ContactIdPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
