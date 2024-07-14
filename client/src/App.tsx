import { Layout } from 'antd';

const { Content } = Layout;

import styles from './App.module.css';
import HeaderComponent from './components/Header/Header';
import UsersControlPanel from './components/UsersControlPanel/UsersControlPanel';
import UsersTable from './components/UsersTable/UsersTable';

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
