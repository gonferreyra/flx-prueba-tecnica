import { useContext } from 'react';
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
