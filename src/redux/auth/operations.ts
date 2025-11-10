import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    credentials: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post('/users/register', credentials);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Registration error'
      );
    }
  }
);
