import { useAppDispatch } from '../../hooks/reduxHooks';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../redux/auth/operations';
import logo from '../../assets/Avatar_1.png';

import styles from './UserMenu.module.css';
import CustomButton from '../CustomButton/CustomButton';

export const UserMenu = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <img className={styles.avatar} src={logo} alt="User avatar" />
        <p className={styles.username}>Welcome, {user?.name || 'Guest'}!</p>
      </div>

      <button
        className={styles.logoutBtn}
        type="button"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button>
    </div>
  );
};
