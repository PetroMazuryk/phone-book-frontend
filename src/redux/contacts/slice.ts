import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
  toggleFavorite,
  togglePriority,
  fetchContactById,
  deleteCall,
  addCall,
} from './operations';
import { Contact, Call } from '../../types';

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
      })

      .addCase(toggleFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to toggle favorite';
      })

      .addCase(togglePriority.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePriority.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(togglePriority.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to toggle priority';
      })
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchContactById.fulfilled,
        (state, action: PayloadAction<Contact>) => {
          const existing = state.items.find(
            (item) => item.id === action.payload.id
          );
          if (existing) {
            Object.assign(existing, action.payload);
          } else {
            state.items.push(action.payload);
          }
          state.loading = false;
        }
      )
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch contact by id';
      })
      .addCase(deleteCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCall.fulfilled,
        (
          state,
          action: PayloadAction<{ contactId: string; callId: string }>
        ) => {
          state.loading = false;
          const { contactId, callId } = action.payload;
          const contact = state.items.find((c) => c.id === contactId);
          if (contact?.calls) {
            contact.calls = contact.calls.filter((call) => call.id !== callId);
          }
        }
      )
      .addCase(deleteCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to delete call';
      })
      .addCase(addCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCall.fulfilled,
        (
          state,
          action: PayloadAction<{ contactId: string; newCall: Call }>
        ) => {
          state.loading = false;
          const { contactId, newCall } = action.payload;
          state.items = state.items.map((contact) => {
            if (contact.id === contactId) {
              const calls = contact.calls
                ? [...contact.calls, newCall]
                : [newCall];
              return { ...contact, calls };
            }
            return contact;
          });
        }
      )
      .addCase(addCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to add call';
      });
  },
});

export default contactsSlice.reducer;
