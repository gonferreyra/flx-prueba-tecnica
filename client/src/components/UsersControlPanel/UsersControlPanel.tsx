import { Breadcrumb, Select, Button, Input } from 'antd';

const { Search } = Input;

import styles from './UsersControlPanel.module.css';

export default function UsersControlPanel() {
  return (
    <>
      <Breadcrumb className={styles.breadCrumb}>
        <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles['control-panel']}>
        <div>
          <Search placeholder='Buscar usuarios' className={styles.search} />
          <Select
            placeholder='Filtrar por estado'
            options={[
              { value: 'active', label: 'Activo' },
              { value: 'inactive', label: 'Inactivo' },
            ]}
            className={styles.select}
          />
        </div>
        <Button type='primary'>Agregar usuario</Button>
      </div>
    </>
  );
}
