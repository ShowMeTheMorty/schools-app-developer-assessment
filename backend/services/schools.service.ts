import { v4 as uuidv4 } from 'uuid';
import { ok, err, Result } from 'neverthrow';
import School from '../models/school';
import { type DomainError, DomainErrorType } from '../contracts/domainError';
import { CreateSchoolRequest, ListSchoolsRequest, UpdateSchoolRequest } from '../contracts/school.contracts';
import type { SchoolRepository } from '../contracts/school.repository.interface';

// core invariants enforced:
// - school title must be unique

export const createSchoolsService = (schoolRepository: SchoolRepository) => {
  const listSchools = async (request: ListSchoolsRequest): Promise<Result<School[], DomainError>> => {
    try {
      const schools = await schoolRepository.listSchools(request.page, request.limit);
      return ok(schools);
    } catch (error) {
      return err({ type: DomainErrorType.InternalError, message: 'Failed to fetch schools' });
    }
  };

  const getSchoolById = async (id: string): Promise<Result<School, DomainError>> => {
    try {
      const school = await schoolRepository.getSchool(id);
      if (!school) {
        return err({ type: DomainErrorType.NotFound, message: 'School not found' });
      }
      return ok(school);
    } catch (error) {
      return err({ type: DomainErrorType.InternalError, message: 'Failed to fetch school' });
    }
  };

  // handy for a search function later?
  const getSchoolByTitle = async (title: string): Promise<Result<School, DomainError>> => {
    try {
      const school = await schoolRepository.findSchoolByTitle(title);
      if (!school) {
        return err({ type: DomainErrorType.NotFound, message: 'School not found' });
      }
      return ok(school);
    } catch (error) {
      return err({ type: DomainErrorType.InternalError, message: 'Failed to fetch school' });
    }
  };

  const createSchool = async (request: CreateSchoolRequest): Promise<Result<School, DomainError>> => {
    const title = request.title.trim();

    // novelty validation error for star wars fans, as placeholder for enforcing validation invariants
    if (title.toLowerCase() === 'execute order 66') {
      return err({ type: DomainErrorType.ValidationError, message: "Sith order injection is not allowed" });
    }

    try {
      // enforce invariant of title uniquness
      const existingSchool = await schoolRepository.findSchoolByTitle(title);
      if (existingSchool) {
        return err({ type: DomainErrorType.DuplicateError, message: 'A school with this title already exists' });
      }

      const school: School = {
        id: uuidv4(),
        title: request.title,
        completed: false,
      };

      await schoolRepository.addSchool(school);
      return ok(school);
    } catch (error) {
      return err({ type: DomainErrorType.InternalError, message: 'Failed to create school' });
    }
  };

  const updateSchool = async (request: UpdateSchoolRequest): Promise<Result<School, DomainError>> => {
    const title: string | undefined = request.title?.trim();
    const completed: boolean | undefined = request.completed;

    try {
      const existingSchool = await schoolRepository.getSchool(request.id);
      if (!existingSchool) {
        return err({ type: DomainErrorType.NotFound, message: 'School not found' });
      }

      if (title !== undefined) {
        // novelty validation error for star wars fans, as placeholder for enforcing validation invariants
        if (title.toLowerCase() === 'execute order 66') {
          return err({ type: DomainErrorType.ValidationError, message: "Sith order injection is not allowed" });
        }
        // enforce invariant of title uniquness
        if (await schoolRepository.findSchoolByTitle(title)) {
          return err({ type: DomainErrorType.DuplicateError, message: 'A school with this title already exists' });
        }

        existingSchool.title = title;
      }

      if (completed !== undefined) {
        existingSchool.completed = completed;
      }

      await schoolRepository.updateSchool(existingSchool);
      return ok(existingSchool);
    } catch (error) {
      return err({ type: DomainErrorType.InternalError, message: 'Failed to update school' });
    }
  };

  const deleteSchool = async (id: string): Promise<Result<void, DomainError>> => {
    try {
      const success = await schoolRepository.deleteSchool(id);
      if (!success) {
        return err({ type: DomainErrorType.NotFound, message: 'School not found' });
      }
      return ok();
    } catch (error) {
      return err({ type: DomainErrorType.InternalError, message: 'Failed to delete school' });
    }
  };

  return {
    listSchools,
    getSchoolById,
    getSchoolByTitle,
    createSchool,
    updateSchool,
    deleteSchool,
  };
};

export type SchoolsService = ReturnType<typeof createSchoolsService>;