import { createContext, useEffect, useReducer, useState } from 'react';
import { userReducer } from './usersReducer';
import { User } from '../interfaces/interface';

type State = {
  users: User[];
  isLoading: boolean;
  currentUser: User | null;
  error: string;
};

const INITIAL_STATE: State = {
  users: [],
  isLoading: false,
  currentUser: null,
  error: '',
};

type UserContextStore = {
  users: User[];
  activeId: number | null;
  handleActiveIdChange: (id: number) => void;
  getUser: (id: number) => Promise<void>;
  isLoading: boolean;
  currentUser: User | null;
};

export const UsersContext = createContext<UserContextStore | null>(null);

export default function UsersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ users, isLoading, currentUser }, dispatch] = useReducer(
    userReducer,
    INITIAL_STATE
  );
  const [activeId, setActiveId] = useState<number | null>(null);
  // console.log(isLoading);

  const handleActiveIdChange = (id: number) => {
    setActiveId(id);
  };

  // console.log(users);
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    dispatch({ type: 'isLoading' });
    setTimeout(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch(baseURL);
          const data = await response.json();
          // console.log(data);
          dispatch({ type: 'users/loaded', payload: data });
        } catch (error) {
          dispatch({
            type: 'rejected',
            payload: 'There was an error loading data',
          });
        }
      };
      fetchUsers();
    }, 1500);
  }, [baseURL]);

  const getUser = async (id: number) => {
    if (id === currentUser?.id) return;

    dispatch({ type: 'isLoading' });

    try {
      const res = await fetch(`${baseURL}/${id}`);
      const data = await res.json();
      dispatch({ type: 'user/loaded', payload: data });
      // return data;
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the user',
      });
      // return null;
    }
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        activeId,
        handleActiveIdChange,
        getUser,
        currentUser,
        isLoading,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
