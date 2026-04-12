import { Response } from 'express';
import { ApiError, domainErrorToApiError, zodErrorToApiError } from '../../contracts/apiError';
import { DomainError } from '../../contracts/domainError';
import { ZodError } from 'zod';

const sendApiErrorResponse = (response: Response, apiError: ApiError): void => {
    response.status(apiError.statusCode).json(apiError);
}

export const sendDomainErrorAsApiError = (response: Response, domainError: DomainError): void => {
    const apiErrorResponse = domainErrorToApiError(domainError);
    sendApiErrorResponse(response, apiErrorResponse);
}

export const sendZodErrorAsApiError = (response: Response, zodError: ZodError): void => {
    const apiErrorResponse = zodErrorToApiError(zodError);
    sendApiErrorResponse(response, apiErrorResponse);
}