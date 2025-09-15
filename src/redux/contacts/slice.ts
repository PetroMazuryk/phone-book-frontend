import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface ContactsState {
  items: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk<
  Contact[],
  void,
  { rejectValue: string }
>('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Contact[]>('api//contacts');
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return thunkAPI.rejectWithValue('Unknown error');
  }
});

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchContacts.fulfilled,
        (state, action: PayloadAction<Contact[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch contacts';
      });
  },
});

export default contactsSlice.reducer;
