import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from '../../types';

axios.defaults.baseURL = 'http://localhost:3000/api';

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Contact[]>('/contacts');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});
