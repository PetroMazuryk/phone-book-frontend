import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  component: ReactElement;
  redirectTo?: string;
}

export const PrivateRoute = ({
  component,
  redirectTo = '/',
}: PrivateRouteProps) => {
  const { isLoggedIn, isRefreshing } = useAuth();

  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : component;
};
