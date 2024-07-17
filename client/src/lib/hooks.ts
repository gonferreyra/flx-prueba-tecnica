import { useContext, useState } from 'react';
import { UsersContext } from '../contexts/UsersContextProvider';

export function useUsersContext() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(
      'useUsersContext must be used within a UsersContextProvider'
    );
  }

  return context;
}

// ----------------------------------------------------------------------

export const useForm = <T>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onSelectChange = (value: string) => {
    const event = {
      target: {
        name: 'status',
        value,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    onInputChange(event);
  };

  const onResetForm = () => {
    setFormState(initialState);
  };

  return {
    ...formState,
    setFormState,
    formState,
    onInputChange,
    onResetForm,
    onSelectChange,
  };
};
