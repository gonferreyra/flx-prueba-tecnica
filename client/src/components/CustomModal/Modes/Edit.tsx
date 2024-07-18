import { FormState } from '../../../interfaces/interface';
import FieldGroup from '../FieldGroup';
import SelectField from '../SelectField';
import UserField from '../UserField';

type EditModeComponentProps = {
  formState: FormState;
  onSelectChange: (value: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditModeComponent({
  formState,
  onSelectChange,
  onInputChange,
}: EditModeComponentProps) {
  return (
    <div>
      <FieldGroup>
        <UserField
          label='Usuario'
          placeholder='johndoe123'
          name='username'
          value={formState?.username}
          onChange={onInputChange}
        />
        <UserField
          label='Email'
          placeholder='johndoe@domain.com'
          name='email'
          type='email'
          value={formState?.email}
          onChange={onInputChange}
        />
      </FieldGroup>
      <FieldGroup>
        <UserField
          label='Nombre'
          placeholder='John'
          name='name'
          value={formState?.name}
          onChange={onInputChange}
        />
        <UserField
          label='Apellido'
          placeholder='Doe'
          name='lastname'
          value={formState?.lastname}
          onChange={onInputChange}
        />
      </FieldGroup>
      <FieldGroup>
        <SelectField
          label='Estado'
          value={formState?.status}
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
          value={formState?.age}
          type='number'
          onChange={onInputChange}
        />
      </FieldGroup>
    </div>
  );
}
