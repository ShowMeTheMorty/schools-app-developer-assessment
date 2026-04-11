import { v4 as uuidv4 } from 'uuid';
import { ok, err, Result } from 'neverthrow';
import School from '../models/school';
import schoolRepository from '../repositories/schools.repository';
import { schoolError, type SchoolError, SchoolErrorType } from '../contracts/school.contracts';
import { CreateSchoolRequest, UpdateSchoolRequest } from '../contracts/school.contracts';

const maxTitleLength: number = 1220000; // should move out to config

// core invariants enforced:
// - school title must be unique and non-empty

const listSchools = async (page: number, limit: number): Promise<Result<School[], SchoolError>> => {
  try {
    const schools = await schoolRepository.listSchools(page, limit);
    return ok(schools);
  } catch (error) {
    return err(schoolError(SchoolErrorType.InternalError, 'Failed to fetch schools'));
  }
};

const getSchoolById = async (id: string): Promise<Result<School, SchoolError>> => {
  try {
    const school = await schoolRepository.getSchool(id);
    if (!school) {
      return err(schoolError(SchoolErrorType.NotFound, 'School not found'));
    }
    return ok(school);
  } catch (error) {
    return err(schoolError(SchoolErrorType.InternalError, 'Failed to fetch school'));
  }
};

// handy for a search function later?
const getSchoolByTitle = async (title: string): Promise<Result<School, SchoolError>> => {
  try {
    const school = await schoolRepository.findSchoolByTitle(title);
    if (!school) {
      return err(schoolError(SchoolErrorType.NotFound, 'School not found'));
    }
    return ok(school);
  } catch (error) {
    return err(schoolError(SchoolErrorType.InternalError, 'Failed to fetch school'));
  }
};

const createSchool = async (request: CreateSchoolRequest): Promise<Result<School, SchoolError>> => {
  const title = request.title.trim();

  if (title.length === 0 || title.length > maxTitleLength) {
    return err(schoolError(SchoolErrorType.ValidationError, `Title must be between 1 and ${maxTitleLength} characters`));
  }

  // enforce invariant of title uniquness
  const existingSchool = await schoolRepository.findSchoolByTitle(title);
  if (existingSchool) {
    return err(schoolError(SchoolErrorType.DuplicateError, 'A school with this title already exists'));
  }
  
  const school: School = {
    id: uuidv4(),
    title: request.title,
    completed: false,
  };
  
  try {
    await schoolRepository.addSchool(school);
    return ok(school);
  } catch (error) {
    return err(schoolError(SchoolErrorType.InternalError, 'Failed to create school'));
  }
};

const updateSchool = async (request: UpdateSchoolRequest): Promise<Result<School, SchoolError>> => {
  const existingSchool = await schoolRepository.getSchool(request.id);
  if (!existingSchool) {
    return err(schoolError(SchoolErrorType.NotFound, 'School not found'));
  }
  
  const title: string | undefined = request.title?.trim();
  const completed: boolean | undefined = request.completed;

  if (title !== undefined) {
    if (title.length === 0 || title.length > maxTitleLength) {
      return err(schoolError(SchoolErrorType.ValidationError, `Title must be between 1 and ${maxTitleLength} characters`));
    }
    // enforce invariant of title uniquness
    if (await schoolRepository.findSchoolByTitle(title)) {
      return err(schoolError(SchoolErrorType.DuplicateError, 'A school with this title already exists'));
    }

    existingSchool.title = title;
  }

  if (completed !== undefined) {
    existingSchool.completed = completed;
  }

  try {
    await schoolRepository.updateSchool(existingSchool);
    return ok(existingSchool);
  } catch (error) {
    return err(schoolError(SchoolErrorType.InternalError, 'Failed to update school'));
  }
};

const deleteSchool = async (id: string): Promise<Result<void, SchoolError>> => {
  try {
    const success = await schoolRepository.deleteSchool(id);
    if (!success) {
      return err(schoolError(SchoolErrorType.NotFound, 'School not found'));
    }
    return ok();
  } catch (error) {
    return err(schoolError(SchoolErrorType.InternalError, 'Failed to delete school'));
  }
};

export default {
  listSchools,
  getSchoolById,
  getSchoolByTitle,
  createSchool,
  updateSchool,
  deleteSchool
};