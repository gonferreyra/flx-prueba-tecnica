import { Breadcrumb, Select, Button, Input } from 'antd';
import styles from './UsersControlPanel.module.css';
import CustomModal from '../CustomModal/CustomModal';
import {
  useModalContext,
  useSearchTextContext,
  useUsersContext,
} from '../../lib/hooks';

const { Search } = Input;

export default function UsersControlPanel() {
  const { searchText, handleChangeSearchText } = useSearchTextContext();
  const { sortBy, handleChangeSortBy } = useUsersContext();
  const { isModalOpen, mode, handleOpenModal } = useModalContext();

  return (
    <>
      <Breadcrumb className={styles.breadCrumb}>
        <Breadcrumb.Item>Usuarios</Breadcrumb.Item>
        <Breadcrumb.Item>Listado de usuarios</Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles['control-panel']}>
        <div>
          <Search
            placeholder='Buscar usuarios'
            className={styles.search}
            value={searchText}
            onChange={(e) => handleChangeSearchText(e.target.value)}
          />
          <Select
            placeholder='Filtrar por estado'
            options={[
              { value: '', label: 'Todos' },
              { value: 'active', label: 'Activo' },
              { value: 'inactive', label: 'Inactivo' },
            ]}
            className={styles.select}
            value={sortBy || undefined}
            onChange={(value) => handleChangeSortBy(value)}
          />
        </div>
        <Button type='primary' onClick={() => handleOpenModal('add')}>
          Agregar usuario
        </Button>
      </div>

      {isModalOpen && mode === 'add' && <CustomModal />}
    </>
  );
}
