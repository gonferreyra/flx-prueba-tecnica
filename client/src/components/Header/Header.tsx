import { Layout } from 'antd';

const { Header } = Layout;

import styles from './Header.module.css';

export default function HeaderComponent() {
  return (
    <>
      <Header className={styles.header}>
        <img src='./img/logo.png' alt='flexxus-logo' className={styles.logo} />
      </Header>
    </>
  );
}
