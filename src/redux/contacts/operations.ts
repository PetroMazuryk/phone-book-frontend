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

export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('contacts/delete', async (contactId, thunkAPI) => {
  try {
    await axios.delete(`/contacts/${contactId}`);
    return contactId;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

export const editContact = createAsyncThunk<
  Contact,
  { id: string; data: Partial<Contact> },
  { rejectValue: string }
>('contacts/edit', async ({ id, data }, thunkAPI) => {
  try {
    const response = await axios.patch(`/contacts/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

export const fetchContactById = createAsyncThunk<
  Contact,
  string,
  { rejectValue: string }
>('contacts/fetchById', async (id, thunkAPI) => {
  try {
    const response = await axios.get<Contact>(`/contacts/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue('Unknown error');
  }
});
