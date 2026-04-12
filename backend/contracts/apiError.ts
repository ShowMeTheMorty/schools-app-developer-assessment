import { z } from 'zod';
import { DomainError, DomainErrorType } from './domainError';

export enum ApiErrorType {
  NotFound,
  ValidationError,
  InternalError,
  DuplicateError,
}

export interface ApiError {
  statusCode: number;
  type: ApiErrorType;
  message: string;
  details?: {
    errors: string[];
  };
}

// add mappers here
export const zodErrorToApiError = (zodError: z.ZodError): ApiError => {
  const treeified = z.treeifyError(zodError);

  return {
    statusCode: 400,
    type: ApiErrorType.ValidationError,
    message: 'Request validation failed',
    details: {
      errors: treeified.errors,
    },
  };
};

export const domainErrorToApiError = (domainError: DomainError): ApiError => {
  let statusCode: number;
  let type: ApiErrorType;

  switch (domainError.type) {
    case DomainErrorType.NotFound:
      statusCode = 404;
      type = ApiErrorType.NotFound;
      break;
    case DomainErrorType.ValidationError:
      statusCode = 400;
      type = ApiErrorType.ValidationError;
      break;
    case DomainErrorType.DuplicateError:
      statusCode = 409;
      type = ApiErrorType.DuplicateError;
      break;
    case DomainErrorType.InternalError:
    default:
      statusCode = 500;
      type = ApiErrorType.InternalError;
      break;
  }

  return {
    statusCode,
    type,
    message: domainError.message,
  };
}