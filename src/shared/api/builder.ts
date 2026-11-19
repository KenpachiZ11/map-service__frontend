import { createSlice } from '@reduxjs/toolkit';
import type {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';

export type AsyncState<TData = unknown> = {
  data: TData;
  isLoading: boolean;
  isError: boolean | string;
};

export const initialAsyncState: AsyncState<null> = {
  data: null,
  isLoading: false,
  isError: false,
};

const defaultOnSuccess = <TData>(
  state: AsyncState<TData>,
  action: PayloadAction<TData>,
) => {
  state.data = action.payload;
};

/**
 * Достаёт человекочитаемое сообщение из отклонённого thunk-действия.
 * Покрывает rejectWithValue({ status, message }) и стандартную ошибку thunk (error.message).
 */
const getRejectedMessage = (payload: unknown, error: unknown): string => {
  const p = payload as { message?: unknown } | undefined;
  if (p && typeof p.message === 'string' && p.message) return p.message;

  const e = error as { message?: unknown } | undefined;
  if (e && typeof e.message === 'string' && e.message) return e.message;

  return 'Неизвестная ошибка';
};

export const handlerExtraReducers = <TData>(
  builder: ActionReducerMapBuilder<AsyncState<TData>>,
  api: AsyncThunk<TData, any, any>,
  onSuccess: (state: AsyncState<TData>, action: PayloadAction<TData>) => void = defaultOnSuccess,
) => {
  builder
    .addCase(api.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    })
    .addCase(api.fulfilled, (state, action) => {
      state.isLoading = false;
      onSuccess(state as unknown as AsyncState<TData>, action);
    })
    .addCase(api.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = getRejectedMessage(action.payload, action.error);
    });
};

/**
 * Слайс с async-состоянием { data, isLoading, isError } для одного thunk.
 * TData задаётся явно (тип данных из fulfilled-ответа); thunk принимается как unknown
 * и приводится на границе — хелпер совместим с любым AsyncThunk (в т.ч. от createInitialThunk
 * с rejectValue, который структурно не совместим с типизированным AsyncThunk).
 */
export const createInitialStateSlice = <TData>(
  name: string,
  api: unknown,
  onSuccess?: (state: AsyncState<TData>, action: PayloadAction<TData>) => void,
  customInitialState?: AsyncState<TData>,
): Slice<AsyncState<TData>> => {
  const thunk = api as AsyncThunk<TData, any, any>;
  return createSlice({
    name,
    initialState:
      customInitialState ??
      (initialAsyncState as unknown as AsyncState<TData>),
    reducers: {},
    extraReducers: (builder) => {
      handlerExtraReducers<TData>(builder, thunk, onSuccess);
    },
  });
};