export interface User {
  age: number;
  email: string;
  id: number;
  lastname: string;
  name: string;
  status: 'active' | 'inactive';
  username: string;
}

export interface DataType {
  id: number;
  username: string;
  name: string;
  lastname: string;
  status: string;
}

// TYPES ------------------------------------------------------------------

export type FormState = {
  username: string;
  email: string;
  name: string;
  lastname: string;
  status: 'active' | 'inactive';
  age: number;
};
