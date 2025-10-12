import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bg404}>404</div>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Page not found 😔</p>
      <Link to="/" className={styles.button}>
        To the main page
      </Link>
    </div>
  );
};

export default NotFoundPage;
