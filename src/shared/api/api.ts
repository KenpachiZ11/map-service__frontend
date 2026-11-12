import { BaseApi } from './BaseApi';
import { buildQueryString } from './buildQueryString';
import type { QueryParams } from './buildQueryString';

export type IdArg = { id: string | number };
export type DataArg<TData = unknown> = { data: TData };
export type IdDataArg<TData = unknown> = { id: string | number; data: TData };

export class DataApi extends BaseApi {
  constructor() {
    super('/');
  }

  getData<T>(params: QueryParams = {}, signal?: AbortSignal) {
    return this.get<T>(`${this.endpoint}/?${buildQueryString(params)}`, signal);
  }

  getDataId<T>({ id }: IdArg, signal?: AbortSignal) {
    return this.get<T>(`${this.endpoint}/${id}`, signal);
  }

  postData<T>({ data }: DataArg, signal?: AbortSignal) {
    return this.post<T>(`${this.endpoint}/`, data, signal);
  }

  patchData<T>({ id, data }: IdDataArg, signal?: AbortSignal) {
    return this.patch<T>(`${this.endpoint}/${id}`, data, signal);
  }

  deleteData({ id }: IdArg, signal?: AbortSignal) {
    return this.delete(`${this.endpoint}/${id}`, signal);
  }
}

export const dataApi = new DataApi();