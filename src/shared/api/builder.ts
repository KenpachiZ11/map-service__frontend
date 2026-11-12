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

export const handlerExtraReducers = <TData, TArg>(
  builder: ActionReducerMapBuilder<AsyncState<TData>>,
  api: AsyncThunk<TData, TArg, {}>,
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
      state.isError =
        typeof action.payload === 'string'
          ? action.payload
          : action.error.message ?? 'Неизвестная ошибка';
    });
};

export const createInitialStateSlice = <TData, TArg>(
  name: string,
  api: AsyncThunk<TData, TArg, {}>,
  onSuccess?: (state: AsyncState<TData>, action: PayloadAction<TData>) => void,
  customInitialState?: AsyncState<TData>,
): Slice<AsyncState<TData>> =>
  createSlice({
    name,
    initialState:
      customInitialState ??
      (initialAsyncState as unknown as AsyncState<TData>),
    reducers: {},
    extraReducers: (builder) => {
      handlerExtraReducers(builder, api, onSuccess);
    },
  });