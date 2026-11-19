import { createInitialStateSlice, createInitialThunk } from '@/shared/api';
import type { AuthResponse, RegisterDto } from '@/shared/types/auth';

import { registerApi } from './api/registerApi';

export const registerThunk = createInitialThunk<AuthResponse, RegisterDto>(
  'auth/register',
  (dto, signal) => registerApi.register(dto, signal),
);

export const registerSlice = createInitialStateSlice<AuthResponse>('registration', registerThunk);
export const registerReducer = registerSlice.reducer;