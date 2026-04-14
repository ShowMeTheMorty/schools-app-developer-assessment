import axios from 'axios';
import type { ApiError, AppApiError } from './types';

const httpClient = axios.create({
  baseURL: 'http://localhost:7777/api', // Using CRA proxy??
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const isApiError = (value: unknown): value is ApiError => {
  if (!value || typeof value !== 'object') return false;

  const v = value as Partial<ApiError>;
  return typeof v.statusCode === 'number' && typeof v.message === 'string';
};


httpClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response?.data && isApiError(error.response.data)) {
        const normalized: AppApiError = {
          statusCode: error.response.data.statusCode,
          message: error.response.data.message,
          details: error.response.data.details,
        };
        return Promise.reject(normalized);
      }

      if (!error.response) {
        return Promise.reject<AppApiError>({
          statusCode: 0,
          message: 'Network error. Please check your connection.',
        });
      }

      return Promise.reject<AppApiError>({
        statusCode: error.response.status ?? 500,
        message: 'Request failed',
      });
    }

    return Promise.reject<AppApiError>({
      statusCode: 500,
      message: 'Unexpected error',
    });
  }
);

export default httpClient;