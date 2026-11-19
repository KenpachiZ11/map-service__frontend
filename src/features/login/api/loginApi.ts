import { BaseApi } from '@/shared/api';
import type { AuthResponse, LoginDto } from '@/shared/types/auth';

class LoginApi extends BaseApi {
  constructor() {
    super('/v1/auth');
  }

  login(dto: LoginDto, signal?: AbortSignal) {
    return this.post<AuthResponse>(`${this.endpoint}/login`, dto, signal).then(
      (res) => res.data,
    );
  }
}

export const loginApi = new LoginApi();