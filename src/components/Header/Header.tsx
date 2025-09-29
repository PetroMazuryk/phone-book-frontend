import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import { openModal } from '../../redux/modal/modalSlice';
import CustomButton from '../CustomButton/CustomButton';
import logo from '../../assets/logo.png';

import styles from './Header.module.css';
import { AuthNav } from '../AuthNav/AuthNav';

export const Header = () => {
  const dispatch = useAppDispatch();
  return (
    <header className={styles.headerContainer}>
      <NavLink to="/" className={styles.logoWrap}>
        <img src={logo} alt="PhoneBook Logo" className={styles.logo} />
        <p className={styles.logoText}>Phone Book</p>
      </NavLink>

      <CustomButton
        onClick={() => dispatch(openModal({ type: 'add' }))}
        variant="primary"
        style={{ width: 'auto', whiteSpace: 'nowrap' }}
      >
        Add Contact
      </CustomButton>

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
