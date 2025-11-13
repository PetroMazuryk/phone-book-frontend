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

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await instance.post('/users/logout');
      setToken(null);
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      return rejectWithValue(err.response?.data?.message || 'Logout error');
    }
  }
);

interface RefreshResponse {
  name: string;
  email: string;
}

export const refreshUser = createAsyncThunk<
  RefreshResponse,
  void,
  { rejectValue: string; state: { auth: { token: string | null } } }
>('auth/refresh', async (_, { getState, rejectWithValue }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return rejectWithValue('No token found');
  }

  try {
    setToken(persistedToken);
    const { data } = await instance.get<RefreshResponse>('/users/current');
    return data;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return rejectWithValue(err.response?.data?.message || 'Refresh failed');
  }
});
