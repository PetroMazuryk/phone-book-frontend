import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { statusFilters } from './constants';

interface FiltersState {
  status: string;
  name: string;
  phone: string;
}

const initialState: FiltersState = {
  status: statusFilters.total,
  name: '',
  phone: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setNameFilter(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setPhoneFilter(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    resetFilters(state) {
      state.status = statusFilters.total;
      state.name = '';
      state.phone = '';
    },
  },
});

export const { setStatusFilter, setNameFilter, setPhoneFilter, resetFilters } =
  filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
