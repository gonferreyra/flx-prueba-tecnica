import { Layout } from 'antd';
import HeaderComponent from './components/Header/Header';
import UsersControlPanel from './components/UsersControlPanel/UsersControlPanel';
import UsersTable from './components/UsersTable/UsersTable';

import styles from './App.module.css';

const { Content } = Layout;

function App() {
  return (
    <>
      <Layout>
        <HeaderComponent />

        <Content className={styles.main}>
          <UsersControlPanel />

          <UsersTable />
        </Content>
      </Layout>
    </>
  );
}

export default App;
