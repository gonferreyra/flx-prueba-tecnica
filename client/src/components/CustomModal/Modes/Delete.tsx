import { Button, Divider, Modal, Typography } from 'antd';
import { FormState } from '../../../interfaces/interface';
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
      <Title level={5} style={{ fontWeight: 400 }}>
        Eliminar usuario
      </Title>
      <Divider style={{ margin: '1rem 0' }} />
      <p style={{ padding: '2rem 0' }}>
        Esta seguro que quiere eliminar el usuario{' '}
        <span>@{formState.username}</span>{' '}
      </p>
      <Divider style={{ margin: '1rem 0' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '2rem' }}>
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
