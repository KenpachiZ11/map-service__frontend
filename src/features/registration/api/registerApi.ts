import { BaseApi } from '@/shared/api';
import type { AuthResponse, RegisterDto } from '@/shared/types/auth';

class RegisterApi extends BaseApi {
  constructor() {
    super('/v1/auth');
  }

  register(dto: RegisterDto, signal?: AbortSignal) {
    return this.post<AuthResponse>(`${this.endpoint}/register`, dto, signal).then(
      (res) => res.data,
    );
  }
}

export const registerApi = new RegisterApi();