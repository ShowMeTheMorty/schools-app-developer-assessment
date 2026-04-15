import express from 'express';
import request from 'supertest';
import { createSchoolsController } from '../controllers/schools.controllers';
import { createSchoolsRouter } from '../routes/schools.routes';
import { createSchoolsService } from '../services/schools.service';
import type { SchoolRepository } from '../contracts/school.repository.interface';
import type School from '../models/school';

const mockSchoolRepository = (): jest.Mocked<SchoolRepository> => ({
  listSchools: jest.fn(),
  getSchool: jest.fn(),
  addSchool: jest.fn(),
  findSchoolByTitle: jest.fn(),
  updateSchool: jest.fn(),
  deleteSchool: jest.fn(),
});

const buildTestApp = (repo: jest.Mocked<SchoolRepository>) => {
  const service = createSchoolsService(repo);
  const controller = createSchoolsController(service);
  const router = createSchoolsRouter(controller);

  const app = express();
  app.use(express.json());
  app.use('/api/schools', router);

  return app;
};

const existingSchool: School = {
  id: '11111111-1111-4111-8111-111111111111',
  title: 'Existing School',
  completed: false,
  address: 'Existing Address',
  contactEmail: 'existing@example.com',
  contactPhone: '555-4000',
  note: 'Existing Note',
};

describe('Schools API', () => {
  it('should create a new school', async () => {
    const repo = mockSchoolRepository();
    repo.findSchoolByTitle.mockResolvedValue(undefined);
    repo.addSchool.mockResolvedValue();
    const app = buildTestApp(repo);

    const response = await request(app)
      .post('/api/schools')
      .send({
        title: 'New School',
        address: 'New Address',
        contactEmail: 'new@example.com',
        contactPhone: '555-5000',
        note: 'New Note',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New School');
    expect(response.body.completed).toBe(false);
  });

  it('should return 409 for duplicate school title', async () => {
    const repo = mockSchoolRepository();
    repo.findSchoolByTitle.mockResolvedValue(existingSchool);
    const app = buildTestApp(repo);

    const response = await request(app)
      .post('/api/schools')
      .send({
        title: 'Existing School',
        address: 'Duplicate Address',
        contactEmail: 'duplicate@example.com',
        contactPhone: '555-5001',
        note: 'Duplicate Note',
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 409,
        message: 'A school with this title already exists',
      })
    );
  });

  it('should return 400 for invalid create payload', async () => {
    const repo = mockSchoolRepository();
    const app = buildTestApp(repo);

    const response = await request(app)
      .post('/api/schools')
      .send({
        title: '',
        address: 'Invalid Address',
        contactEmail: 'invalid@example.com',
        contactPhone: '555-5002',
        note: 'Invalid Note',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 400,
        message: 'Request validation failed',
      })
    );
  });

  it('should list schools', async () => {
    const repo = mockSchoolRepository();
    repo.listSchools.mockResolvedValue([existingSchool]);
    const app = buildTestApp(repo);

    const response = await request(app)
      .get('/api/schools')
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([existingSchool]);
  });

  it('should return 400 for invalid list query', async () => {
    const repo = mockSchoolRepository();
    const app = buildTestApp(repo);

    const response = await request(app)
      .get('/api/schools')
      .query({ page: 'abc', limit: 10 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 400,
        message: 'Request validation failed',
      })
    );
  });

  it('should get school by id', async () => {
    const repo = mockSchoolRepository();
    repo.getSchool.mockResolvedValue(existingSchool);
    const app = buildTestApp(repo);

    const response = await request(app).get(`/api/schools/${existingSchool.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(existingSchool);
  });

  it('should return 404 when getting missing school', async () => {
    const repo = mockSchoolRepository();
    repo.getSchool.mockResolvedValue(undefined);
    const app = buildTestApp(repo);

    const response = await request(app).get('/api/schools/11111111-1111-4111-8111-222222222222');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 404,
        message: 'School not found',
      })
    );
  });

  it('should update school title and completed status', async () => {
    const repo = mockSchoolRepository();
    repo.getSchool.mockResolvedValue({ ...existingSchool });
    repo.findSchoolByTitle.mockResolvedValue(undefined);
    repo.updateSchool.mockResolvedValue();
    const app = buildTestApp(repo);

    const response = await request(app)
      .patch(`/api/schools/${existingSchool.id}`)
      .send({ title: 'Updated School', completed: true });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: existingSchool.id,
        title: 'Updated School',
        completed: true,
      })
    );
  });

  it('should return 400 when id is not a valid uuid', async () => {
    const repo = mockSchoolRepository();
    const app = buildTestApp(repo);

    const response = await request(app).get('/api/schools/not-a-uuid');

    expect(response.status).toBe(400);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 400,
        message: 'Request validation failed',
      })
    );
  });

  it('should delete school successfully', async () => {
    const repo = mockSchoolRepository();
    repo.deleteSchool.mockResolvedValue(true);
    const app = buildTestApp(repo);

    const response = await request(app).delete(`/api/schools/${existingSchool.id}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it('should return 404 when deleting missing school', async () => {
    const repo = mockSchoolRepository();
    repo.deleteSchool.mockResolvedValue(false);
    const app = buildTestApp(repo);

    const response = await request(app).delete('/api/schools/11111111-1111-4111-8111-333333333333');

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        statusCode: 404,
        message: 'School not found',
      })
    );
  });
});