import { BaseApi } from '@/shared/api';
import type { ProfileUser } from '@/shared/types/profile';
import type { UpdateUsersIdDto } from '@/shared/types/users';

class UsersApi extends BaseApi {
  constructor() {
    super('/v1/users');
  }

  // PATCH /api/v1/users/:id — обновить свои данные; возвращает полного пользователя (User).
  usersIdUpd(id: string, data: UpdateUsersIdDto, signal?: AbortSignal) {
    return this.patch<ProfileUser>(`${this.endpoint}/${id}`, data, signal).then(
      (res) => res.data,
    );
  }
}

export const usersIdUpdApi = new UsersApi();