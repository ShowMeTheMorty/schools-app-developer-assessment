import express from 'express';
import type { SchoolsController } from '../controllers/schools.controllers';

export const createSchoolsRouter = (schoolsController: SchoolsController): express.Router => {
  const router = express.Router();

  router
    .route('/')
    .get(schoolsController.listSchools)
    .post(schoolsController.createSchool);

  router
    .route('/:id')
    .get(schoolsController.getSchool)
    .patch(schoolsController.updateSchool)
    .delete(schoolsController.deleteSchool);

  return router;
};