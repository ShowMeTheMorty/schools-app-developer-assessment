import { QueryClient } from "@tanstack/react-query"

type NormalizedApiError = {
  statusCode: number;
  message: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const apiError = error as Partial<NormalizedApiError>;
        const statusCode = apiError?.statusCode;

        if (statusCode && [400, 404, 409].includes(statusCode)) {
          return false;
        }

        return failureCount < 2;
      },
    },
  }
});

export default queryClient;