import { Button, Divider, Modal, Typography } from 'antd';
import { FormState } from '../../../interfaces/interface';

import styles from './Delete.module.css';

const { Title } = Typography;

type DeleteModeProps = {
  formState: FormState;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  onUserDelete: (id: number) => void;
  activeId: number | null;
};

export default function DeleteModeComponent({
  formState,
  isModalOpen,
  handleCloseModal,
  onUserDelete,
  activeId,
}: DeleteModeProps) {
  return (
    <Modal
      open={isModalOpen}
      centered
      onCancel={handleCloseModal}
      footer={null}
    >
      <Title level={5} className={styles.title}>
        Eliminar usuario
      </Title>
      <Divider style={{ margin: '1rem 0' }} />

      <p className={styles.text}>
        Esta seguro que quiere eliminar el usuario
        <span className={styles.span}> @{formState.username}</span>
      </p>

      <Divider className={styles.divider} />
      <div className={styles['btn-container']}>
        <Button type='primary' htmlType='submit' onClick={handleCloseModal}>
          Cancelar
        </Button>
        <Button
          type='primary'
          danger
          htmlType='submit'
          onClick={() => onUserDelete(activeId as number)}
        >
          Eliminar
        </Button>
      </div>
    </Modal>
  );
}
