import { RootState } from '../store';

export const selectStatusFilter = (state: RootState) => state.filters.status;

export const selectNameFilter = (state: RootState) => state.filters.name;
export const selectPhoneFilter = (state: RootState) => state.filters.phone;
