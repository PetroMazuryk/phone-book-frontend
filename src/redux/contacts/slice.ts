import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';
import { Contact } from '../../types';

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
          state.items = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch contacts';
      });
  },
});

export default contactsSlice.reducer;
