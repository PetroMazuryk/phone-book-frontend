import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import { openModal } from '../../redux/modal/modalSlice';
import CustomButton from '../CustomButton/CustomButton';
import { AuthNav } from '../AuthNav/AuthNav';

import logo from '../../assets/logo.png';
import styles from './Header.module.css';

export const Header = () => {
  const { pathname } = useLocation();

  const dispatch = useAppDispatch();

  return (
    <header className={styles.headerContainer}>
      <NavLink to="/" className={styles.logoWrap}>
        <img src={logo} alt="PhoneBook Logo" className={styles.logo} />
        <p className={styles.logoText}>Phone Book</p>
      </NavLink>

      {pathname === '/contacts' && (
        <CustomButton
          onClick={() => dispatch(openModal({ type: 'add' }))}
          variant="primary"
          style={{ width: 'auto', whiteSpace: 'nowrap' }}
        >
          Add Contact
        </CustomButton>
      )}

      <nav className={styles.nav}>
        <CustomNavLink to="/" end>
          Home
        </CustomNavLink>
        <CustomNavLink to="/contacts">Contacts</CustomNavLink>
      </nav>
      <AuthNav />
    </header>
  );
};

export default Header;
