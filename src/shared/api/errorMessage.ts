import type { AxiosError } from 'axios';

export type ApiErrorPayload = {
  status: number | null;
  message: string;
};

export const errorMessage = (error: unknown): ApiErrorPayload => {
  const axiosError = error as AxiosError<{ message?: string }> | undefined;

  return {
    status: axiosError?.response?.status ?? null,
    message:
      axiosError?.response?.data?.message ??
      axiosError?.message ??
      'Неизвестная ошибка',
  };
};