import { Navigate } from 'react-router-dom';
import { ReactElement } from 'react';
import { useAuth } from '../hooks/useAuth';

interface RestrictedRouteProps {
  component: ReactElement;
  redirectTo?: string;
}

export const RestrictedRoute = ({
  component,
  redirectTo = '/',
}: RestrictedRouteProps) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};
