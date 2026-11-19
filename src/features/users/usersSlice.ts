import { createInitialStateSlice, createInitialThunk } from '@/shared/api';
import type { ProfileUser } from '@/shared/types/profile';
import type { UpdateUsersIdDto } from '@/shared/types/users';

import { usersIdUpdApi } from './api/usersApi';

type UsersIdUpdArgs = {
  id: string;
  data: UpdateUsersIdDto;
};

// TData = ProfileUser, т.к. PATCH /users/:id возвращает полного пользователя (User).
export const usersIdUpdThunk = createInitialThunk<ProfileUser, UsersIdUpdArgs>(
  'users/id',
  (args, signal) => usersIdUpdApi.usersIdUpd(args.id, args.data, signal),
)

export const usersIdUpdSlice = createInitialStateSlice<ProfileUser>('users/id', usersIdUpdThunk);
export const usersIdUpdReducer = usersIdUpdSlice.reducer;