import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Container } from '../Container/Container';
import { ToasterBar } from '../ToasterBar/ToasterBar';

import { ModalManager } from '../../components/ModalManager/ModalManager';

import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layoutMain}>
      <Container>
        <Header />
      </Container>

      <main className={styles.layoutContent}>
        <Container>
          <Outlet />
        </Container>
      </main>

      <Container fluid>
        <Footer />
      </Container>
      <ModalManager />
      <ToasterBar />
    </div>
  );
};

export default Layout;
