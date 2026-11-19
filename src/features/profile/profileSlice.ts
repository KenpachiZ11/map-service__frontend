import { createInitialStateSlice, createInitialThunk } from '@/shared/api';
import type { ProfileUser } from '@/shared/types/profile';

import { profileApi } from './api/profileApi';

export const profileThunk = createInitialThunk<ProfileUser>(
  'auth/me',
  (_, signal) => profileApi.profile(signal),
)

export const profileSlice = createInitialStateSlice<ProfileUser>('profile', profileThunk);
export const profileReducer = profileSlice.reducer;