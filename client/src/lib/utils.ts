import { v4 as uuidv4 } from 'uuid';
import { FormState, User } from '../interfaces/interface';

// VALIDATIONS --------------------------------------------------------------

export const generateUUID = () => {
  const uuid = uuidv4();
  return parseInt(uuid.replace(/-/g, ''), 16);
};

export const validateForm = (formState: FormState) => {
  const { username, email, name, lastname, status, age } = formState;

  if (!username || !email || !name || !lastname || !status || !age) {
    return 'All fields are required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Invalid email format';
  }

  if (isNaN(age) || age <= 0) {
    return 'Age must be a positive number';
  }

  return null;
};

export const isEmailRegistered = (email: string, users: User[]) => {
  return users.some((user) => user.email === email);
};

// -----------------------------------------------------------------------------
