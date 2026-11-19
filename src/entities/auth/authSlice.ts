import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { loadAuthState } from '@/shared/lib/authStorage';
import type { AuthResponse } from '@/shared/types/auth';

type AuthState = {
  user: AuthResponse['user'] | null;
  accessToken: string | null;
};

// Восстанавливаем сессию из sessionStorage при старте приложения (rehydrate).
const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loggedIn: (state, action: PayloadAction<AuthResponse>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    loggedOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;