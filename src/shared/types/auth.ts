export type AuthUser = {
  id: string;
  login: string;
  role: string;
  firstName?: string;
  lastName?: string;
  access: boolean | string[];
  createAt: string;
  updateAt: string;
  lastActiveAt?: string | null;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export type LoginDto = {
  login: string;
  password: string;
};

export type RegisterDto = {
  login: string;
  password: string;
};