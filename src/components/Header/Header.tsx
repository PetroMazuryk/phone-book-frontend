import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.nav}>
        <NavLink to="/" className={getLinkClass} end>
          Home
        </NavLink>
        <NavLink to="/contacts" className={getLinkClass}>
          Contacts
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
