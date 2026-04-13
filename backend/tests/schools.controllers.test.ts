import type { Request, Response } from 'express';
import { err, ok } from 'neverthrow';
import { DomainErrorType } from '../contracts/domainError';
import type School from '../models/school';
import { createSchoolsController } from '../controllers/schools.controllers';
import type { SchoolsService } from '../services/schools.service';

const mockSchoolsService = (): jest.Mocked<SchoolsService> => ({
  listSchools: jest.fn(),
  getSchoolById: jest.fn(),
  getSchoolByTitle: jest.fn(),
  createSchool: jest.fn(),
  updateSchool: jest.fn(),
  deleteSchool: jest.fn(),
});

const createMockResponse = () => {
  const response: Partial<Response> = {};

  response.status = jest.fn().mockReturnValue(response as Response);
  response.json = jest.fn().mockReturnValue(response as Response);
  response.send = jest.fn().mockReturnValue(response as Response);

  return response as Response & {
    status: jest.Mock;
    json: jest.Mock;
    send: jest.Mock;
  };
};

describe('schools controller', () => {
  it('lists schools successfully', async () => {
    const service = mockSchoolsService();
    const controller = createSchoolsController(service);
    const response = createMockResponse();

    const schools: School[] = [
      { id: '11111111-1111-4111-8111-111111111111', title: 'Alpha', completed: false },
    ];

    service.listSchools.mockResolvedValue(ok(schools));

    const request = {
      query: { page: '1', limit: '10' },
    } as unknown as Request;

    await controller.listSchools(request as any, response);

    expect(service.listSchools).toHaveBeenCalledWith({ page: 1, limit: 10 });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(schools);
  });

  it('returns 400 when list query is invalid', async () => {
    const service = mockSchoolsService();
    const controller = createSchoolsController(service);
    const response = createMockResponse();

    const request = {
      query: { page: 'abc', limit: '10' },
    } as unknown as Request;

    await controller.listSchools(request as any, response);

    expect(service.listSchools).not.toHaveBeenCalled();
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: 'Request validation failed',
      })
    );
  });

  it('creates a school successfully', async () => {
    const service = mockSchoolsService();
    const controller = createSchoolsController(service);
    const response = createMockResponse();

    const school: School = {
      id: '11111111-1111-4111-8111-111111111111',
      title: 'New School',
      completed: false,
    };

    service.createSchool.mockResolvedValue(ok(school));

    const request = {
      body: { title: '  New School  ' },
    } as unknown as Request;

    await controller.createSchool(request as any, response);

    expect(service.createSchool).toHaveBeenCalledWith({ title: 'New School' });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(school);
  });

  it('returns 404 when service cannot find school by id', async () => {
    const service = mockSchoolsService();
    const controller = createSchoolsController(service);
    const response = createMockResponse();

    service.getSchoolById.mockResolvedValue(
      err({ type: DomainErrorType.NotFound, message: 'School not found' })
    );

    const request = {
      params: { id: '11111111-1111-4111-8111-222222222222' },
    } as unknown as Request;

    await controller.getSchool(request as any, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        message: 'School not found',
      })
    );
  });

  it('updates a school successfully', async () => {
    const service = mockSchoolsService();
    const controller = createSchoolsController(service);
    const response = createMockResponse();

    const updatedSchool: School = {
      id: '11111111-1111-4111-8111-111111111111',
      title: 'Updated',
      completed: true,
    };

    service.updateSchool.mockResolvedValue(ok(updatedSchool));

    const request = {
      params: { id: '11111111-1111-4111-8111-111111111111' },
      body: { title: 'Updated', completed: true },
    } as unknown as Request;

    await controller.updateSchool(request as any, response);

    expect(service.updateSchool).toHaveBeenCalledWith({
      id: '11111111-1111-4111-8111-111111111111',
      title: 'Updated',
      completed: true,
    });
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(updatedSchool);
  });

  it('deletes school successfully', async () => {
    const service = mockSchoolsService();
    const controller = createSchoolsController(service);
    const response = createMockResponse();

    service.deleteSchool.mockResolvedValue(ok(undefined));

    const request = {
      params: { id: '11111111-1111-4111-8111-111111111111' },
    } as unknown as Request;

    await controller.deleteSchool(request as any, response);

    expect(service.deleteSchool).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111');
    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.send).toHaveBeenCalledWith();
  });
});
