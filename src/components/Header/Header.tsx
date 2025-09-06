import { NavLink } from 'react-router-dom';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import logo from '../../assets/logo.png';

import styles from './Header.module.css';
import { ContactCounter } from '../ContactCounter/ContactCounter';

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <NavLink to="/" className={styles.logoWrap}>
        <img src={logo} alt="PhoneBook Logo" className={styles.logo} />
        <p className={styles.logoText}>Phone Book</p>
      </NavLink>

      <nav className={styles.nav}>
        <CustomNavLink to="/" end>
          Home
        </CustomNavLink>
        <CustomNavLink to="/contacts">Contacts</CustomNavLink>
      </nav>
    </header>
  );
};

export default Header;
