export type QueryParams = Record<string, unknown>;

export const buildQueryString = (params: QueryParams = {}): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    };
  });

  return searchParams.toString();
};