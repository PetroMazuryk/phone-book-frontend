import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
});

export const setToken = (token: string | null): void => {
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
  }
};

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterCredentials,
  { rejectValue: string }
>('auth/register', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<RegisterResponse>(
      '/users/register',
      credentials
    );

    setToken(data.token);
    return data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return rejectWithValue(err.response?.data?.message || 'Registration error');
  }
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<LoginResponse>(
      '/users/login',
      credentials
    );

    setToken(data.token);
    return data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return rejectWithValue(err.response?.data?.message || 'Login error');
  }
});
