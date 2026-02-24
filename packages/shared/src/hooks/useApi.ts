import { useState, useCallback } from 'react';

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  get: (url: string) => Promise<T | null>;
  post: (url: string, body: unknown) => Promise<T | null>;
}

export function useApi<T = unknown>(): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const request = useCallback(
    async (url: string, options?: RequestInit): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await fetch(url, {
          headers: { 'Content-Type': 'application/json' },
          ...options,
        });
        if (!response.ok) {
          throw new Error(`Request failed: ${response.statusText}`);
        }
        const data = (await response.json()) as T;
        setState({ data, loading: false, error: null });
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setState((prev) => ({ ...prev, loading: false, error: message }));
        return null;
      }
    },
    []
  );

  const get = useCallback((url: string) => request(url), [request]);

  const post = useCallback(
    (url: string, body: unknown) =>
      request(url, { method: 'POST', body: JSON.stringify(body) }),
    [request]
  );

  return { ...state, get, post };
}
