import { useEffect } from 'react';
import { useForm, useModalContext, useUsersContext } from '../../lib/hooks';
import { Divider, Modal, Typography, Button, Form, message } from 'antd';
import { User, FormState } from '../../interfaces/interface';
import DeleteModeComponent from './Modes/Delete';
import EditModeComponent from './Modes/Edit';
import AddModeComponent from './Modes/Add';
import { generateUUID, isEmailRegistered, validateForm } from '../../lib/utils';

import styles from './CustomModal.module.css';

const { Title } = Typography;

const initialState: FormState = {
  username: '',
  email: '',
  name: '',
  lastname: '',
  status: 'active',
  age: 0,
};

export default function CustomModal() {
  const { getUser, activeId, createUser, users, deleteUser, updateUser } =
    useUsersContext();
  const { isModalOpen, mode, handleCloseModal } = useModalContext();

  const {
    formState,
    setFormState,
    onInputChange,
    onResetForm,
    onSelectChange,
  } = useForm<FormState>(initialState);

  const { username, email, name, lastname, status, age } = formState;

  const handleSubmit = async () => {
    // validations
    const validationError = validateForm(formState);
    if (validationError) {
      message.error(validationError);
      return;
    }

    // email registered
    if (isEmailRegistered(email, users)) {
      message.error('The email is already registered in the database');
      return;
    }

    // check if username is unique
    if (users.some((user) => user.username === username)) {
      message.error('The username is already registered in the database');
      return;
    }

    // Generate a number uuid
    const numberId = generateUUID();

    const newUser: User = {
      id: numberId,
      username,
      email,
      name,
      lastname,
      status,
      age,
    };

    await createUser(newUser);

    // close modal & reset fields
    handleCloseModal();
    onResetForm();

    message.success('User created successfully');
  };

  const onUserDelete = async (id: number) => {
    await deleteUser(id);

    message.success('User deleted successfully');

    handleCloseModal();
  };

  const onUserUpdate = async (id: number) => {
    // validations
    const validationError = validateForm(formState);
    if (validationError) {
      message.error(validationError);
      return;
    }

    const existingUser = await getUser(id);
    if (
      existingUser.username === username &&
      existingUser.email === email &&
      existingUser.name === name &&
      existingUser.lastname === lastname &&
      existingUser.status === status &&
      existingUser.age === age
    ) {
      message.info('No changes detected');
      return;
    }

    if (activeId === null) {
      message.error('Active ID is null');
      return;
    }

    // Max length validation
    if (name.length > 25 || lastname.length > 25) {
      message.error('Name and Lastname must be 25 characters or less');
      return;
    }

    // check if username is unique
    if (users.some((user) => user.username === username)) {
      message.error('The username is already registered in the database');
      return;
    }

    const updatedUser: FormState = {
      username,
      email,
      name,
      lastname,
      status,
      age,
    };

    await updateUser(activeId, updatedUser);

    message.success('User updated successfully');
    handleCloseModal();
  };

  useEffect(() => {
    if (isModalOpen) {
      if (mode === 'add') {
        onResetForm();
      } else if ((mode === 'edit' || mode === 'delete') && activeId !== null) {
        getUser(activeId).then((res) => {
          if (res) {
            setFormState(res);
          } else {
            setFormState(initialState);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, mode, activeId]);

  if (mode === 'delete') {
    return (
      <DeleteModeComponent
        formState={formState}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onUserDelete={onUserDelete}
        activeId={activeId}
      />
    );
  }

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCloseModal}
      centered
      footer={null}
    >
      <Title level={5} className={styles.title}>
        {mode === 'add' ? 'Agregar usuario' : 'Editar usuario'}
      </Title>
      <Divider style={{ margin: '1rem 0' }} />

      <Form
        onFinish={
          mode === 'add' ? handleSubmit : () => onUserUpdate(activeId as number)
        }
      >
        {mode === 'edit' ? (
          <EditModeComponent
            formState={formState}
            onSelectChange={onSelectChange}
            onInputChange={onInputChange}
          />
        ) : (
          <AddModeComponent
            formState={formState}
            onSelectChange={onSelectChange}
            onInputChange={onInputChange}
          />
        )}

        <Divider className={styles.divider} />

        <div className={styles['btn-container']}>
          <Button type='primary' htmlType='submit'>
            {mode === 'add' ? 'Agregar usuario' : 'Editar usuario'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
