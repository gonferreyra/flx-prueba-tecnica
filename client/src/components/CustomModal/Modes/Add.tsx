import { FormState } from '../../../interfaces/interface';
import FieldGroup from '../FieldGroup';
import SelectField from '../SelectField';
import UserField from '../UserField';

type AddModeComponentProps = {
  formState: FormState;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string) => void;
};

export default function AddModeComponent({
  formState,
  onInputChange,
  onSelectChange,
}: AddModeComponentProps) {
  const { username, email, name, lastname, status, age } = formState;

  return (
    <div>
      <FieldGroup>
        <UserField
          label='Usuario'
          placeholder='johndoe'
          name='username'
          value={username}
          onChange={onInputChange}
        />
        <UserField
          label='Email'
          placeholder='johndoe@domain.com'
          name='email'
          type='email'
          value={email}
          onChange={onInputChange}
        />
      </FieldGroup>
      <FieldGroup>
        <UserField
          label='Nombre'
          placeholder='John'
          name='name'
          value={name}
          onChange={onInputChange}
        />
        <UserField
          label='Apellido'
          placeholder='Doe'
          name='lastname'
          value={lastname}
          onChange={onInputChange}
        />
      </FieldGroup>
      <FieldGroup>
        <SelectField
          label='Estado'
          value={status}
          placeholder='Seleccione un estado'
          onChange={onSelectChange}
          options={[
            { value: 'active', label: 'Activo' },
            { value: 'inactive', label: 'Inactivo' },
          ]}
        />
        <UserField
          label='Edad'
          placeholder='Edad'
          name='age'
          type='number'
          value={age}
          onChange={onInputChange}
        />
      </FieldGroup>
    </div>
  );
}
