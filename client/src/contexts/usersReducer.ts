import { User } from '../interfaces/interface';

type ReducerActions =
  | { type: 'isLoading' }
  | { type: 'users/loaded'; payload: User[] }
  | { type: 'user/loaded'; payload: User }
  | { type: 'rejected'; payload: string };

type state = {
  users: User[];
  isLoading: boolean;
  currentUser: User | null;
  error: string;
};

export const userReducer = (state: state, action: ReducerActions) => {
  switch (action.type) {
    case 'isLoading':
      return { ...state, isLoading: true };
    case 'users/loaded':
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };
    case 'user/loaded':
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
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
