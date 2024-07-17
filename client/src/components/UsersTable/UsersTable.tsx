import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import styles from './UsersTable.module.css';
import { useUsersContext } from '../../lib/hooks';
// import { useState } from 'react';
import CustomModal from '../CustomModal/CustomModal';

interface DataType {
  id: number;
  username: string;
  name: string;
  lastname: string;
  status: string;
}

type UsersTableProps = {
  isModalOpen: boolean;
  mode: string;
  handleOpenModal: (mode: string) => void;
  handleCloseModal: () => void;
};

export default function UsersTable({
  isModalOpen,
  mode,
  handleOpenModal,
  handleCloseModal,
}: UsersTableProps) {
  const { users, handleActiveIdChange, isLoading } = useUsersContext();

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
              // console.log(record.id);
              handleOpenModal('edit');
            }}
          >
            Editar
          </a>
          <a
            onClick={() => {
              handleActiveIdChange(record.id);
              handleOpenModal('delete');
              // console.log(record.id);
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
        dataSource={users}
        columns={columns}
        className={styles.table}
        pagination={{ pageSize: 9 }}
        loading={isLoading}
      />

      {isModalOpen && mode === 'edit' ? (
        <CustomModal
          isModalOpen={isModalOpen}
          mode={'edit'}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <CustomModal
          isModalOpen={isModalOpen}
          mode={'delete'}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}
