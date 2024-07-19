import { Space, Table, Tag, Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useModalContext, useUsersContext } from '../../lib/hooks';
import CustomModal from '../CustomModal/CustomModal';
import { DataType } from '../../interfaces/interface';

import styles from './UsersTable.module.css';

export default function UsersTable() {
  const {
    handleActiveIdChange,
    isLoading,
    handleTableChange,
    setCurrentPage,
    usersLength,
    usersPaginated,
    currentPage,
  } = useUsersContext();
  const { isModalOpen, handleOpenModal } = useModalContext();

  const columns: ColumnsType<DataType> = [
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
      width: '30%',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Apellido',
      dataIndex: 'lastname',
      key: 'lastname',
      width: '30%',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag color={text === 'active' ? 'green' : 'red'}>
          {text === 'active' ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
      width: '5%',
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (_, record: DataType) => (
        <Space size='middle'>
          <a
            onClick={() => {
              handleActiveIdChange(record.id);
              handleOpenModal('edit');
            }}
          >
            Editar
          </a>
          <a
            onClick={() => {
              handleActiveIdChange(record.id);
              handleOpenModal('delete');
            }}
          >
            Eliminar
          </a>
        </Space>
      ),
      width: '5%',
    },
  ];

  return (
    <>
      <Table
        rowKey={(record) => record.id}
        dataSource={usersPaginated}
        columns={columns}
        className={styles.table}
        pagination={false}
        loading={isLoading}
        onChange={handleTableChange}
      />

      <Pagination
        current={currentPage}
        total={usersLength}
        pageSize={10}
        onChange={(page) => setCurrentPage(page)}
        className={styles.pagination}
        showSizeChanger={false}
      />

      {isModalOpen && <CustomModal />}
    </>
  );
}
