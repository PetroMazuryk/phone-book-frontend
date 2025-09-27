import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './operations';
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
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          state.items.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to add contact';
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteContact.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.items = state.items.filter(
            (contact) => contact.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to delete contact';
      })
      .addCase(editContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        editContact.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          const index = state.items.findIndex(
            (contact) => contact.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.loading = false;
        }
      )
      .addCase(editContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to edit contact';
      });
  },
});

export default contactsSlice.reducer;
