import { Breadcrumb, Select, Button, Input } from 'antd';
import styles from './UsersControlPanel.module.css';
import CustomModal from '../CustomModal/CustomModal';

const { Search } = Input;

type UsersControlPanelProps = {
  isModalOpen: boolean;
  handleOpenModal: (mode: string) => void;
  mode: string;
  handleCloseModal: () => void;
};

export default function UsersControlPanel({
  isModalOpen,
  handleOpenModal,
  mode,
  handleCloseModal,
}: UsersControlPanelProps) {
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
        <Button type='primary' onClick={() => handleOpenModal('add')}>
          Agregar usuario
        </Button>
      </div>

      {isModalOpen && mode === 'add' && (
        <CustomModal
          isModalOpen={isModalOpen}
          mode={'add'}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}
