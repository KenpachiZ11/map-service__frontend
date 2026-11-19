export type ProfileUser = {
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

export type ProfileFormFields = {
  firstName: string;
  lastName: string;
};