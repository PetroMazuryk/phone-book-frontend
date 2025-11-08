import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser } from './operations';

interface User {
  name: string | null;
  email: string | null;
}

interface AuthState {
  user: User;
  token: string | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
}

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false,
  isRefreshing: false,
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
        state.user = action.payload.user || { name: null, email: null };
        state.token = action.payload.token || null;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
