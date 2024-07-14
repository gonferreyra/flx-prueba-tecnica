import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import styles from './UsersTable.module.css';

interface DataType {
  key: number;
  usuario: string;
  nombre: string;
  apellido: string;
  estado: string;
}

const dataSource = [
  {
    key: 1,
    usuario: 'Gonzalo123',
    nombre: 'Gonzalo',
    apellido: 'text',
    estado: 'Activo',
  },
  {
    key: 2,
    usuario: 'Gonzalo1232',
    nombre: 'Gonzalo',
    apellido: 'text',
    estado: 'Inactivo',
  },
];

const columns: ColumnsType<DataType> = [
  {
    title: 'Usuario',
    dataIndex: 'usuario',
    key: 'usuario',
    width: '30%',
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    width: '30%',
  },
  {
    title: 'Apellido',
    dataIndex: 'apellido',
    key: 'apellido',
    width: '30%',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    render: (text: string) => (
      <Tag color={text === 'Activo' ? 'green' : 'red'}>{text}</Tag>
    ),
    width: '5%',
  },
  {
    title: 'Acciones',
    key: 'action',
    render: () => (
      <Space size='middle'>
        <a>Editar</a>
        <a>Eliminar</a>
      </Space>
    ),
    width: '5%',
  },
];

export default function UsersTable() {
  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        className={styles.table}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
