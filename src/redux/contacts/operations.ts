import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Contact, ContactWithCalls, Call } from '../../types';

import { instance } from '../auth/operations';

export type NewContact = Omit<Contact, 'id'>;

type EditCallResponse = {
  result: Call;
  message: string;
};

export const addContact = createAsyncThunk<
  Contact,
  NewContact,
  { rejectValue: string }
>('contacts/addContact', async (newContact, thunkAPI) => {
  try {
    const response = await instance.post<Contact>('/contacts', newContact);
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
    const response = await instance.get<Contact[]>('/contacts');
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
    await instance.delete(`/contacts/${contactId}`);
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
    const response = await instance.put(`/contacts/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

export const fetchContactById = createAsyncThunk<
  ContactWithCalls,
  string,
  { rejectValue: string }
>('contacts/fetchById', async (id, thunkAPI) => {
  try {
    const response = await instance.get<ContactWithCalls>(`/contacts/${id}`);
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
    const { data } = await instance.patch(`/contacts/${id}/favorite`, {
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
    const { data } = await instance.patch(`/contacts/${id}/priority`, {
      priority,
    });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteCall = createAsyncThunk<
  { contactId: string; callId: string },
  { contactId: string; callId: string },
  { rejectValue: string }
>('contacts/deleteCall', async ({ contactId, callId }, thunkAPI) => {
  try {
    await instance.delete(`/contacts/${contactId}/calls/${callId}`);
    return { contactId, callId };
  } catch (error: unknown) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

export const addCall = createAsyncThunk<
  { contactId: string; newCall: Call },
  { contactId: string; newCall: Omit<Call, 'id'> },
  { rejectValue: string }
>('contacts/addCall', async ({ contactId, newCall }, thunkAPI) => {
  try {
    const response = await instance.post<Call>(
      `/contacts/${contactId}/calls`,
      newCall
    );
    return { contactId, newCall: response.data };
  } catch (error: unknown) {
    if (error instanceof Error) return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

export const editCall = createAsyncThunk<
  { contactId: string; updatedCall: Call },
  { contactId: string; callId: string; updatedFields: Partial<Call> },
  { rejectValue: string }
>(
  'contacts/editCall',
  async ({ contactId, callId, updatedFields }, thunkAPI) => {
    try {
      const response = await instance.put<EditCallResponse>(
        `/contacts/${contactId}/calls/${callId}`,
        updatedFields
      );
      return { contactId, updatedCall: response.data.result };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue('Unknown error');
    }
  }
);
