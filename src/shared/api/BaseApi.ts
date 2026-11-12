import { http } from './axiosInstance';

export class BaseApi {
  readonly endpoint: string;

  #headers = { 'Content-Type': 'application/json' };

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get defaultHeaders() {
    return this.#headers;
  }

  get<T = unknown>(url: string, signal?: AbortSignal) {
    return http.get<T>(url, {
      headers: this.defaultHeaders,
      signal,
    });
  }

  post<T = unknown>(url: string, data?: unknown, signal?: AbortSignal) {
    return http.post<T>(url, data, {
      headers: this.defaultHeaders,
      signal,
    });
  }

  patch<T = unknown>(url: string, data?: unknown, signal?: AbortSignal) {
    return http.patch<T>(url, data, {
      headers: this.defaultHeaders,
      signal,
    });
  }

  delete<T = unknown>(url: string, signal?: AbortSignal) {
    return http.delete<T>(url, {
      headers: this.defaultHeaders,
      signal,
    });
  }
}