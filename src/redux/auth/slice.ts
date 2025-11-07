import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from './operations';

interface User {
  name?: string;
  email?: string;
}

interface AuthState {
  user: User | {};
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {},
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload.user || {};
        state.token = action.payload.token || null;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      });
  },
});

export default authSlice.reducer;
