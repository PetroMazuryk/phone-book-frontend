import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './CustomNavLink.module.css';

type CustomNavLinkProps = NavLinkProps & {
  className?: string;
  activeClassName?: string;
};

export const CustomNavLink = ({
  className = styles.navLink,
  activeClassName = styles.activeLink,
  ...props
}: CustomNavLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        isActive ? `${className} ${activeClassName}` : className
      }
    />
  );
};
