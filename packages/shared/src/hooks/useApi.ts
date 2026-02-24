import { useState, useEffect, useCallback } from 'react';
import type { ApiResponse } from '../types';

export const useApi = <T>(fetcher: () => Promise<T>): ApiResponse<T> & { refetch: () => void } => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: true,
  });

  const fetch = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await fetcher();
      setState({ data, error: null, loading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setState({ data: null, error: message, loading: false });
    }
  }, [fetcher]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
