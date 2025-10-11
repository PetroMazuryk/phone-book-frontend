import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { statusFilters } from './constants';

type FiltersState = {
  status: string;
};

const filtersInitialState: FiltersState = {
  status: statusFilters.total,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
