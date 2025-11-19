import { useEffect, lazy } from 'react';
import { useAppDispatch } from './hooks/reduxHooks';
import { Routes, Route } from 'react-router-dom';
import { refreshUser } from './redux/auth/operations';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute';
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const ContactIdPage = lazy(() => import('./pages/ContactIdPage/ContactIdPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));

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
        <Route index element={<HomePage />} />
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
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
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
