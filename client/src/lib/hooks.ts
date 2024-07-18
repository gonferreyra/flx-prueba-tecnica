import { useContext, useEffect, useState } from 'react';
import { UsersContext } from '../contexts/UsersContextProvider';
import { SearchTextContext } from '../contexts/SearchTextContextProvider';
import { ModalContext } from '../contexts/ModalContextProvider';

// Context --------------------------------------------------------------

export function useUsersContext() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error(
      'useUsersContext must be used within a UsersContextProvider'
    );
  }

  return context;
}

export function useSearchTextContext() {
  const context = useContext(SearchTextContext);

  if (!context) {
    throw new Error(
      'useSearchTextContext must be used within a SearchTextContextProvider'
    );
  }

  return context;
}

export function useModalContext() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a useModalContext');
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

// ----------------------------------------------------------------------

export function useDebounce(searchText: string, delay: 1000) {
  const [debouncedSearchText, setDebouncedSearchText] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, delay);

    return () => clearTimeout(timerId);
  }, [searchText, delay]);

  return debouncedSearchText;
}
