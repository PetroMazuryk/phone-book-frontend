import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className={styles.headerContainer}>
      <Link
        to="/"
        className={`${styles.navLink} ${
          location.pathname === '/' ? styles.activeLink : ''
        }`}
      >
        Home
      </Link>
      <Link
        to="/contacts"
        className={`${styles.navLink} ${
          location.pathname === '/contacts' ? styles.activeLink : ''
        }`}
      >
        Contacts
      </Link>
    </header>
  );
};

export default Header;
