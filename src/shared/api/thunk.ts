import { createAsyncThunk } from '@reduxjs/toolkit';
import { errorMessage } from './errorMessage';
import type { ApiErrorPayload } from './errorMessage';

type RequestFn<TArg, TData> = (
  args: TArg,
  signal: AbortSignal | undefined,
) => Promise<TData>;

export const createInitialThunk = <TData, TArg = void>(
  typePrefix: string,
  func: RequestFn<TArg, TData>,
) =>
  createAsyncThunk<TData, TArg, { rejectValue: ApiErrorPayload }>(
    typePrefix,
    async (args, { signal, rejectWithValue }) => {
      try {
        return await func(args, signal);
      } catch (error) {
        return rejectWithValue(errorMessage(error));
      }
    },
  );