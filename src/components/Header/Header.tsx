import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAuth } from '../../hooks/useAuth';
import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import { openModal } from '../../redux/modal/modalSlice';
import CustomButton from '../CustomButton/CustomButton';
import { AuthNav } from '../AuthNav/AuthNav';
import { UserMenu } from '../UserMenu/UserMenu';

import logo from '../../assets/logo.png';
import styles from './Header.module.css';

export const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAuth();

  const contactId = pathname.startsWith('/contacts/')
    ? pathname.split('/').pop()
    : null;

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

      {contactId && (
        <CustomButton
          onClick={() =>
            dispatch(openModal({ type: 'addCall', props: { contactId } }))
          }
          variant="primary"
          style={{ width: 'auto', whiteSpace: 'nowrap' }}
        >
          Add Call
        </CustomButton>
      )}

      <nav className={styles.nav}>
        <CustomNavLink to="/" end>
          Home
        </CustomNavLink>
        <CustomNavLink to="/contacts">Contacts</CustomNavLink>
      </nav>
      {/* <AuthNav /> */}
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default Header;
