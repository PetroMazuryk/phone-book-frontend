import { NavLink } from 'react-router-dom';
import styles from './HomeMessage.module.css';

export const HomeMessage = () => {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Please{' '}
        <NavLink to="/login" className={styles.span}>
          Login
        </NavLink>{' '}
        or{' '}
        <NavLink to="/register" className={styles.span}>
          Register
        </NavLink>{' '}
        to view and save your own contacts!
      </p>
    </div>
  );
};
