import { Request, Response } from 'express'
import schoolService from '../services/schools.service';
import {
  IdParam,
  IdParamSchema,
  ListSchoolsQuery,
  ListSchoolsQuerySchema,
  CreateSchoolBody,
  CreateSchoolBodySchema,
  UpdateSchoolBody,
  UpdateSchoolBodySchema
} from '../contracts/school.schemas';
import { sendDomainErrorAsApiError, sendZodErrorAsApiError } from './helpers/sendApiErrorResponse';
import { z } from 'zod';

const parseOrSendZodError = <T>(
  response: Response,
  schema: z.ZodSchema<T>,
  value: unknown,
): T | undefined => {
  const parseResult = schema.safeParse(value);
  if (!parseResult.success) {
    sendZodErrorAsApiError(response, parseResult.error);
    return undefined;
  }

  return parseResult.data;
};


export const listSchools = async (
  request: Request<{}, {}, {}, ListSchoolsQuery>, 
  response: Response
): Promise<void> => {
  const parsedQuery = parseOrSendZodError(response, ListSchoolsQuerySchema, request.query);
  if (!parsedQuery) {
    return;
  }

  const listSchoolsRequest = {
    page: parsedQuery.page,
    limit: parsedQuery.limit,
  };

  const schoolsResult = await schoolService.listSchools(listSchoolsRequest);
  
  if (!schoolsResult.isOk()) {
    sendDomainErrorAsApiError(response, schoolsResult.error);
    return;
  }
  
  response.status(200).json(schoolsResult.value);
};


export const getSchool = async (
  request: Request<IdParam>, 
  response: Response
): Promise<void> => {
  const parsedParams = parseOrSendZodError(response, IdParamSchema, request.params);
  if (!parsedParams) {
    return;
  }

  const schoolResult = await schoolService.getSchoolById(parsedParams.id);
  
  if (!schoolResult.isOk()) {
    sendDomainErrorAsApiError(response, schoolResult.error);
    return;
  }

  response.status(200).json(schoolResult.value);
};


export const createSchool = async (
  request: Request<{}, {}, CreateSchoolBody>, 
  response: Response
): Promise<void> => {
  const parsedBody = parseOrSendZodError(response, CreateSchoolBodySchema, request.body);
  if (!parsedBody) {
    return;
  }

  const createSchoolRequest = {
    title: parsedBody.title,
  };

  const schoolResult = await schoolService.createSchool(createSchoolRequest);
  
  if (!schoolResult.isOk()) {
    sendDomainErrorAsApiError(response, schoolResult.error);
    return;
  }
  
  response.status(201).json(schoolResult.value);
};


export const updateSchool = async (
  request: Request<IdParam, {}, UpdateSchoolBody>, 
  response: Response
): Promise<void> => {
  const parsedParams = parseOrSendZodError(response, IdParamSchema, request.params);
  if (!parsedParams) {
    return;
  }

  const parsedBody = parseOrSendZodError(response, UpdateSchoolBodySchema, request.body);
  if (!parsedBody) {
    return;
  }

  const updateSchoolRequest = {
    id: parsedParams.id,
    title: parsedBody.title,
    completed: parsedBody.completed
  };
  
  const schoolResult = await schoolService.updateSchool(updateSchoolRequest);
  
  if (!schoolResult.isOk()) {
    sendDomainErrorAsApiError(response, schoolResult.error);
    return;
  }

  response.status(200).json(schoolResult.value);
};


export const deleteSchool = async (
  request: Request<IdParam>, 
  response: Response
): Promise<void> => {
  const parsedParams = parseOrSendZodError(response, IdParamSchema, request.params);
  if (!parsedParams) {
    return;
  }

  const schoolResult = await schoolService.deleteSchool(parsedParams.id);
  
  if (!schoolResult.isOk()) {
    sendDomainErrorAsApiError(response, schoolResult.error);
    return;
  }

  response.status(204).send();
};