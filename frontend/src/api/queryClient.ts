import { QueryClient } from "@tanstack/react-query"
import type { AppApiError } from './types';

export const isNormalizedApiError = (error: unknown): error is AppApiError => {
  if (!error || typeof error !== 'object') return false;

  const value = error as Partial<AppApiError>;
  return typeof value.statusCode === 'number' && typeof value.message === 'string';
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const statusCode = isNormalizedApiError(error) ? error.statusCode : undefined;

        if (statusCode && [400, 404, 409].includes(statusCode)) {
          return false;
        }

        return failureCount < 2;
      },
    },
  }
});

export default queryClient;