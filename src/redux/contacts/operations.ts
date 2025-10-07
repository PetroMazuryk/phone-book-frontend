import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact } from '../../types';

axios.defaults.baseURL = 'http://localhost:3000/api';

export type NewContact = Omit<Contact, 'id'>;

export const addContact = createAsyncThunk<
  Contact,
  NewContact,
  { rejectValue: string }
>('contacts/addContact', async (newContact, thunkAPI) => {
  try {
    const response = await axios.post<Contact>('/contacts', newContact);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

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
    const response = await axios.put(`/contacts/${id}`, data);
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

export const toggleFavorite = createAsyncThunk<
  Contact,
  { id: string; favorite: boolean },
  { rejectValue: string }
>('contacts/toggleFavorite', async ({ id, favorite }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(`/contacts/${id}/favorite`, {
      favorite,
    });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const togglePriority = createAsyncThunk<
  Contact,
  { id: string; priority: boolean },
  { rejectValue: string }
>('contacts/togglePriority', async ({ id, priority }, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(`/contacts/${id}/priority`, {
      priority,
    });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
