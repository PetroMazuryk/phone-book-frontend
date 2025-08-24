import { CustomNavLink } from '../CustomNavLink/CustomNavLink';
import styles from './Header.module.css';

export const Header = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  return (
    <header className={styles.headerContainer}>
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
