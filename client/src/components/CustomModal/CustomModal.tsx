import { Divider, Modal, Typography, Input, Button, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { useUsersContext } from '../../lib/hooks';
const { Title, Text } = Typography;

type CustomModalProps = {
  isModalOpen: boolean;
  mode: string;
  handleCloseModal: () => void;
};

export default function CustomModal({
  isModalOpen,
  mode,
  handleCloseModal,
}: CustomModalProps) {
  const { getUser, activeId, currentUser } = useUsersContext();
  // console.log(isLoading);

  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    lastname: '',
    status: '',
    age: 0,
  });

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // funcionando con muchos renderizados
  useEffect(() => {
    if (mode === 'edit' && activeId) {
      getUser(activeId);
    }
  }, [mode, activeId, getUser]);

  useEffect(() => {
    if (mode === 'add') {
      setForm({
        username: '',
        email: '',
        name: '',
        lastname: '',
        status: '',
        age: 0,
      });
    } else if (mode === 'edit' && currentUser) {
      setForm({
        username: currentUser.username,
        email: currentUser.email,
        name: currentUser.name,
        lastname: currentUser.lastname,
        status: currentUser.status,
        age: currentUser.age,
      });
    }
  }, [mode, currentUser]);

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCloseModal}
      // onOk={} Call for submit
      centered
      footer={null}
    >
      <Title level={5} style={{ fontWeight: 400 }}>
        {mode === 'add' ? 'Agregar usuario' : 'Editar usuario'}
      </Title>
      <Divider style={{ margin: '1rem 0' }} />

      {mode === 'edit' ? (
        <div>
          <Input.Group style={{ marginTop: '2rem' }}>
            <Row gutter={8}>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Usuario</Text>
                <Input
                  placeholder='johndoe123'
                  name='username'
                  value={currentUser?.username}
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Email</Text>
                <Input
                  type='email'
                  name='email'
                  placeholder='johndoe@domain.com'
                  value={currentUser?.email}
                />
              </Col>
            </Row>
          </Input.Group>
          <Input.Group style={{ marginTop: '2rem' }}>
            <Row gutter={8}>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Nombre</Text>
                <Input
                  placeholder='John'
                  name='name'
                  value={currentUser?.name}
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Apellido</Text>
                <Input
                  placeholder='Doe'
                  name='lastname'
                  value={currentUser?.lastname}
                />
              </Col>
            </Row>
          </Input.Group>

          <Input.Group style={{ marginTop: '2rem' }}>
            <Row gutter={8}>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Estado</Text>
                <Input
                  placeholder='Estado'
                  name='status'
                  value={currentUser?.status}
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Edad</Text>
                <Input placeholder='Edad' name='age' value={currentUser?.age} />
              </Col>
            </Row>
          </Input.Group>
        </div>
      ) : (
        <div>
          <Input.Group style={{ marginTop: '2rem' }}>
            <Row gutter={8}>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Usuario</Text>
                <Input
                  placeholder='johndoe'
                  name='username'
                  value={form.username}
                  onChange={onFormChange}
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Email</Text>
                <Input
                  type='email'
                  name='email'
                  placeholder='johndoe@domain.com'
                  value={form.email}
                  onChange={onFormChange}
                />
              </Col>
            </Row>
          </Input.Group>
          <Input.Group style={{ marginTop: '2rem' }}>
            <Row gutter={8}>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Nombre</Text>
                <Input
                  placeholder='John'
                  name='name'
                  value={form.name}
                  onChange={onFormChange}
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Apellido</Text>
                <Input
                  placeholder='Doe'
                  name='lastname'
                  value={form.lastname}
                  onChange={onFormChange}
                />
              </Col>
            </Row>
          </Input.Group>

          <Input.Group style={{ marginTop: '2rem' }}>
            <Row gutter={8}>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Estado</Text>
                <Input
                  placeholder='Estado'
                  name='status'
                  value={form.status}
                  onChange={onFormChange}
                />
              </Col>
              <Col
                span={12}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem',
                }}
              >
                <Text>Edad</Text>
                <Input
                  placeholder='Edad'
                  type='number'
                  name='age'
                  value={form.age}
                  onChange={onFormChange}
                />
              </Col>
            </Row>
          </Input.Group>
        </div>
      )}

      <Divider style={{ margin: '1rem 0' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type='primary'>
          {mode === 'add' ? 'Agregar usuario' : 'Editar usuario'}
        </Button>
      </div>
    </Modal>
  );
}
