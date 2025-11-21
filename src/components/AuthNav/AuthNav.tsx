import { NavLink } from 'react-router-dom';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import clsx from 'clsx';
import css from './AuthNav.module.css';

export const AuthNav: React.FC = () => {
  // const buildLinkClass = ({ isActive }: { isActive: boolean }) => {
  //   return clsx(css.link, isActive && css.active);
  // };

  return (
    <div className={css.wrapper}>
      <CustomNavLink to="/register">Register</CustomNavLink>
      <CustomNavLink to="/login">Login</CustomNavLink>
    </div>
  );
};
