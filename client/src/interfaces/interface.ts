export interface User {
  age: number;
  email: string;
  id: number;
  lastname: string;
  name: string;
  status: Status;
  username: string;
}

export enum Status {
  Active = 'active',
  Inactive = 'inactive',
}
