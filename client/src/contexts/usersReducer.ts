import { User } from '../interfaces/interface';

type ReducerActions =
  | { type: 'isLoading' }
  | { type: 'initialLoading' }
  | { type: 'users/loaded'; payload: User[] }
  | { type: 'users/paginated'; payload: User[] }
  | { type: 'user/loaded'; payload: User }
  | { type: 'user/created'; payload: User }
  | { type: 'user/delete'; payload: number }
  | { type: 'user/update'; payload: User }
  | { type: 'rejected'; payload: string };

type state = {
  users: User[];
  usersPaginated: User[];
  isLoading: boolean;
  isInitialLoading: boolean;
  currentUser: User | null;
  error: string;
};

export const userReducer = (state: state, action: ReducerActions) => {
  switch (action.type) {
    case 'isLoading':
      return { ...state, isLoading: true };
    case 'initialLoading':
      return {
        ...state,
        isInitialLoading: false,
      };
    case 'users/loaded':
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case 'users/paginated':
      return {
        ...state,
        isLoading: false,
        usersPaginated: action.payload,
      };
    case 'user/loaded':
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
      };
    case 'user/created':
      return {
        ...state,
        isLoading: false,
        users: [...state.users, action.payload],
      };
    case 'user/delete':
      return {
        ...state,
        isLoading: false,
        users: [...state.users.filter((user) => user.id !== action.payload)],
      };
    case 'user/update':
      return {
        ...state,
        isLoading: false,
        users: [
          ...state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
        ],
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
