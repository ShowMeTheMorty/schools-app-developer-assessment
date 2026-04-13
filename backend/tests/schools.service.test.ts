import { DomainErrorType } from '../contracts/domainError';
import type { SchoolRepository } from '../contracts/school.repository.interface';
import type School from '../models/school';
import { createSchoolsService } from '../services/schools.service';

const mockSchoolRepository = (): jest.Mocked<SchoolRepository> => {
  return {
    listSchools: jest.fn(),
    getSchool: jest.fn(),
    addSchool: jest.fn(),
    findSchoolByTitle: jest.fn(),
    updateSchool: jest.fn(),
    deleteSchool: jest.fn(),
  };
};

describe('createSchoolsService', () => {
  it('lists schools successfully', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);
    const schools: School[] = [
      { id: '1', title: 'School A', completed: false },
      { id: '2', title: 'School B', completed: true },
    ];

    schoolRepo.listSchools.mockResolvedValue(schools);

    const result = await schoolService.listSchools({ page: 1, limit: 10 });

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(schools);
    }
    expect(schoolRepo.listSchools).toHaveBeenCalledWith(1, 10);
  });

  it('returns internal error when listing schools fails', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    schoolRepo.listSchools.mockRejectedValue(new Error('db down'));

    const result = await schoolService.listSchools({ page: 1, limit: 10 });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.type).toBe(DomainErrorType.InternalError);
      expect(result.error.message).toBe('Failed to fetch schools');
    }
  });

  it('gets school by id successfully', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);
    const school: School = { id: '1', title: 'School A', completed: false };

    schoolRepo.getSchool.mockResolvedValue(school);

    const result = await schoolService.getSchoolById('1');

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(school);
    }
  });

  it('returns not found when school id does not exist', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    schoolRepo.getSchool.mockResolvedValue(undefined);

    const result = await schoolService.getSchoolById('missing');

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.type).toBe(DomainErrorType.NotFound);
      expect(result.error.message).toBe('School not found');
    }
  });

  it('gets school by title successfully', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);
    const school: School = { id: '1', title: 'School A', completed: false };

    schoolRepo.findSchoolByTitle.mockResolvedValue(school);

    const result = await schoolService.getSchoolByTitle('School A');

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(school);
    }
  });

  it('creates a school successfully', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    schoolRepo.findSchoolByTitle.mockResolvedValue(undefined);

    const result = await schoolService.createSchool({ title: 'Test School' });

    expect(result.isOk()).toBe(true);
    expect(schoolRepo.findSchoolByTitle).toHaveBeenCalledWith('Test School');
    expect(schoolRepo.addSchool).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Test School', completed: false })
    );
  });

  it('fails to create a school with duplicate title', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    schoolRepo.findSchoolByTitle.mockResolvedValue({
      id: '1',
      title: 'Test School',
      completed: false
    });

    const result = await schoolService.createSchool({ title: 'Test School' });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.type).toBe(DomainErrorType.DuplicateError);
      expect(result.error.message).toBe('A school with this title already exists');
    }
    expect(schoolRepo.addSchool).not.toHaveBeenCalled();
  });

  it('fails to create a school with invalid title', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    const result = await schoolService.createSchool({ title: 'Execute Order 66' });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.type).toBe(DomainErrorType.ValidationError);
      expect(result.error.message).toBe('Sith order injection is not allowed');
    }
  });

  it('updates title and completed status successfully', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);
    const existingSchool: School = { id: '1', title: 'Old Title', completed: false };

    schoolRepo.getSchool.mockResolvedValue(existingSchool);
    schoolRepo.findSchoolByTitle.mockResolvedValue(undefined);

    const result = await schoolService.updateSchool({
      id: '1',
      title: 'New Title',
      completed: true,
    });

    expect(result.isOk()).toBe(true);
    expect(schoolRepo.updateSchool).toHaveBeenCalledWith({
      id: '1',
      title: 'New Title',
      completed: true,
    });
  });

  it('returns not found when updating missing school', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    schoolRepo.getSchool.mockResolvedValue(undefined);

    const result = await schoolService.updateSchool({ id: 'missing', title: 'X' });

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.type).toBe(DomainErrorType.NotFound);
    }
  });

  it('returns not found when deleting missing school', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    schoolRepo.deleteSchool.mockResolvedValue(false);

    const result = await schoolService.deleteSchool('missing');

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error.type).toBe(DomainErrorType.NotFound);
    }
  });

  it('deletes school successfully', async () => {
    const schoolRepo = mockSchoolRepository();
    const schoolService = createSchoolsService(schoolRepo);

    schoolRepo.deleteSchool.mockResolvedValue(true);

    const result = await schoolService.deleteSchool('1');

    expect(result.isOk()).toBe(true);
    expect(schoolRepo.deleteSchool).toHaveBeenCalledWith('1');
  });
});

