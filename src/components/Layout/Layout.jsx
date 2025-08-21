import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layoutMain}>
      <Header />
      <div className={styles.container}>
        <div className={styles.card}>Картка 1</div>
        <div className={styles.card}>Картка 2</div>
        <div className={styles.card}>Картка 3</div>
        <div className={styles.card}>Картка 4</div>
        <div className={styles.card}>Картка 5</div>
        <div className={styles.card}>Картка 6</div>
        <div className={styles.card}>Картка 7</div>
        <div className={styles.card}>Картка 8</div>
      </div>
      <main className={styles.layoutContent}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
