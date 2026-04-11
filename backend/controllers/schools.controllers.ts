// extracting routes logic into controllers
import { Request, Response } from 'express'
import schoolService from '../services/schools.service';
import School from '../models/school';
import { Result } from 'neverthrow';
import { CreateSchoolRequest, SchoolError, SchoolErrorType, UpdateSchoolRequest } from '../contracts/school.contracts';

// uniform error handling
const handleErrorResponse = (response: Response, error: SchoolError) => {
  switch (error.type) {
    case SchoolErrorType.NotFound:
      response.status(404).json(error);
      break;
    case SchoolErrorType.ValidationError:
      response.status(400).json(error);
      break;
    case SchoolErrorType.DuplicateError:
      response.status(409).json(error);
      break;
    case SchoolErrorType.InternalError:
    default:
      response.status(500).json(error);
      break;
  }
};

const listSchools = async (request: Request, response: Response): Promise<void> => {
  // todo: use request
  const schoolsResult: Result<School[], SchoolError> = await schoolService.listSchools(1, 17);
  
  if (schoolsResult.isOk()) {
    response.status(200).json(schoolsResult.value);
    return;
  }

  handleErrorResponse(response, schoolsResult.error);
};

const getSchool = async (request: Request<{id: string}>, response: Response): Promise<void> => {
  // todo: use request
  const schoolResult = await schoolService.getSchoolById(request.params.id);
  
  if (schoolResult.isOk()) {
    response.status(200).json(schoolResult.value);
    return;
  }

  handleErrorResponse(response, schoolResult.error);
};

const createSchool = async (request: Request, response: Response): Promise<void> => {
  // todo: use request
  const placeholder: CreateSchoolRequest = {
    title: 'placeholder request title'
  };
  
  const schoolResult = await schoolService.createSchool(placeholder);
  
  if (schoolResult.isOk()) {
    response.status(201).json(schoolResult.value);
    return;
  }

  handleErrorResponse(response, schoolResult.error);
};

const updateSchool = async (request: Request<{id: string}>, response: Response): Promise<void> => {
  // todo: use request
  const placeholder: UpdateSchoolRequest = {
    id: request.params.id,
    title: 'placeholder updated title',
    completed: true
  };
  
  const schoolResult = await schoolService.updateSchool(placeholder);
  
  if (schoolResult.isOk()) {
    response.status(200).json(schoolResult.value);
    return;
  }

  handleErrorResponse(response, schoolResult.error);
};

const deleteSchool = async (request: Request<{id: string}>, response: Response): Promise<void> => {
  const schoolResult = await schoolService.deleteSchool(request.params.id);
  
  if (schoolResult.isOk()) {
    response.status(204).send();
    return;
  }

  handleErrorResponse(response, schoolResult.error);
};

export default { 
  listSchools, 
  getSchool,
  createSchool, 
  updateSchool,
  deleteSchool,
};