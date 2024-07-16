import { Layout } from 'antd';
import HeaderComponent from './components/Header/Header';
import UsersControlPanel from './components/UsersControlPanel/UsersControlPanel';
import UsersTable from './components/UsersTable/UsersTable';
import UsersContextProvider from './contexts/UsersContextProvider';

const { Content } = Layout;

import styles from './App.module.css';
import { useState } from 'react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState('add');

  const handleOpenModal = (mode: string) => {
    setMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Layout>
        <HeaderComponent />

        <Content className={styles.main}>
          <UsersContextProvider>
            <UsersControlPanel
              isModalOpen={isModalOpen}
              mode={mode}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />

            <UsersTable
              isModalOpen={isModalOpen}
              mode={mode}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />
          </UsersContextProvider>
        </Content>
      </Layout>
    </>
  );
}

export default App;
