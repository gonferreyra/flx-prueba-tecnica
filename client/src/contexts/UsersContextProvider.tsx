import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import { userReducer } from './usersReducer';
import { FormState, User } from '../interfaces/interface';
import { useSearchTextContext } from '../lib/hooks';
import { TablePaginationConfig } from 'antd/es/table';

type State = {
  users: User[];
  usersPaginated: User[];
  isLoading: boolean;
  isInitialLoading: boolean;
  currentUser: User | null;
  error: string;
};

const INITIAL_STATE: State = {
  users: [],
  usersPaginated: [],
  isLoading: false,
  isInitialLoading: true,
  currentUser: null,
  error: '',
};

type UserContextStore = {
  users: User[];
  usersPaginated: User[];
  activeId: number | null;
  handleActiveIdChange: (id: number) => void;
  getUser: (id: number) => Promise<User>;
  isLoading: boolean;
  currentUser: User | null;
  createUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  updateUser: (id: number, user: FormState) => Promise<void>;
  sortBy: string;
  handleChangeSortBy: (newSortBy: string) => void;
  handleTableChange: (pagination: TablePaginationConfig) => void;
  setCurrentPage: (page: number) => void;
  usersLength: number;
  currentPage: number;
};

export const UsersContext = createContext<UserContextStore | null>(null);

export default function UsersContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [
    { users, usersPaginated, isLoading, isInitialLoading, currentUser },
    dispatch,
  ] = useReducer(userReducer, INITIAL_STATE);
  const [activeId, setActiveId] = useState<number | null>(null);
  const { debouncedSearchText } = useSearchTextContext();
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const baseURL = import.meta.env.VITE_BASE_URL;

  const filteredAndSortedUsers = useMemo(() => {
    // Filter by name or lastname
    setCurrentPage(1);
    const filteredByNameOrLastname = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(debouncedSearchText.toLowerCase()) ||
        user.lastname.toLowerCase().includes(debouncedSearchText.toLowerCase())
      );
    });

    // Paso 2: filter by state
    const filteredByStatus = filteredByNameOrLastname.filter((user) => {
      if (sortBy === 'active') {
        return user.status === 'active';
      } else if (sortBy === 'inactive') {
        return user.status === 'inactive';
      } else {
        return true; // Show all if no sort option is selected
      }
    });

    // Paso 3: Sort by status
    return filteredByStatus.sort((a, b) => {
      if (sortBy === 'active') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'inactive') {
        return b.status.localeCompare(a.status);
      } else {
        return a.id - b.id; // Order ID in ascending order
      }
    });
  }, [users, debouncedSearchText, sortBy]);

  const handleActiveIdChange = (id: number) => {
    setActiveId(id);
  };

  const handleChangeSortBy = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setCurrentPage(pagination.current);
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await fetch(baseURL);
        const data = await resp.json();
        dispatch({ type: 'users/loaded', payload: data });
        dispatch({ type: 'initialLoading' });
      } catch (error) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data',
        });
      }
    };

    fetchUsers();
  }, [baseURL]);

  // Handle pagination
  useEffect(() => {
    if (!isInitialLoading) {
      // initialLoading
      dispatch({ type: 'isLoading' });
      setTimeout(() => {
        const start = (currentPage - 1) * limit;
        const paginatedData = filteredAndSortedUsers.slice(
          start,
          start + limit
        );
        dispatch({ type: 'users/paginated', payload: paginatedData });
      }, 1500);
    }
  }, [filteredAndSortedUsers, currentPage, limit, isInitialLoading]);

  const getUser = async (id: number) => {
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
        usersPaginated,
        activeId,
        handleActiveIdChange,
        getUser,
        currentUser,
        isLoading,
        createUser,
        deleteUser,
        updateUser,
        sortBy,
        handleChangeSortBy,
        handleTableChange,
        setCurrentPage,
        usersLength: filteredAndSortedUsers.length,
        currentPage,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
