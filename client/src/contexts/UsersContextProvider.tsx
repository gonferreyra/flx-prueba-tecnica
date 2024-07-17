import { createContext, useEffect, useReducer, useState } from 'react';
import { userReducer } from './usersReducer';
import { FormState, User } from '../interfaces/interface';

type State = {
  users: User[];
  isLoading: boolean;
  currentUser: User | null;
  error: string;
};

const INITIAL_STATE: State = {
  users: [],
  isLoading: false,
  // Chequear si lo vamos a usar o no-------------------------------
  currentUser: null,
  error: '',
};

type UserContextStore = {
  users: User[];
  activeId: number | null;
  handleActiveIdChange: (id: number) => void;
  getUser: (id: number) => Promise<User>;
  isLoading: boolean;
  currentUser: User | null;
  createUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, user: FormState) => Promise<void>;
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

  // Ver el timeout para esta funcion
  const getUser = async (id: number) => {
    // if (id === currentUser?.id) return;

    dispatch({ type: 'isLoading' });

    try {
      const res = await fetch(`${baseURL}/${id}`);
      const data = await res.json();
      dispatch({ type: 'user/loaded', payload: data });
      return data;
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the user',
      });
      // return null;
    }
  };

  const createUser = async (user: User) => {
    dispatch({ type: 'isLoading' });

    try {
      const res = await fetch(`${baseURL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      dispatch({ type: 'user/created', payload: data });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error creating the user',
      });
    }
  };

  const deleteUser = async (id: number) => {
    dispatch({ type: 'isLoading' });

    try {
      // const res =
      await fetch(`${baseURL}/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'user/delete', payload: id });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the user',
      });
    }
  };

  const updateUser = async (id: number, user: FormState) => {
    dispatch({ type: 'isLoading' });

    try {
      await fetch(`${baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      dispatch({ type: 'user/update', payload: { ...user, id } });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error updating the user',
      });
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
        createUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
