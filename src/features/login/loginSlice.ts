import { createInitialStateSlice, createInitialThunk } from '@/shared/api';
import type { AuthResponse, LoginDto } from '@/shared/types/auth';

import { loginApi } from './api/loginApi';

export const loginThunk = createInitialThunk<AuthResponse, LoginDto>(
  'auth/login',
  (dto, signal) => loginApi.login(dto, signal),
);

export const loginSlice = createInitialStateSlice<AuthResponse>('login', loginThunk);
export const loginReducer = loginSlice.reducer;