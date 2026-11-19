import { BaseApi } from '@/shared/api';
import type { ProfileUser } from '@/shared/types/profile';

class ProfileApi extends BaseApi {
  constructor() {
    super('/v1/auth');
  }

  profile(signal?: AbortSignal) {
    return this.get<ProfileUser>(`${this.endpoint}/me`, signal).then(
      (res) => res.data,
    );
  }
}

export const profileApi = new ProfileApi();