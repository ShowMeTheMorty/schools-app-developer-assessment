import express from 'express';
import * as schoolsController from '../controllers/schools.controllers'
const router = express.Router();

router
  .route('/')
  .get(schoolsController.listSchools)
  .post(schoolsController.addSchool);

router
  .route('/:id')
  .get(schoolsController.getSchool)
  .patch(schoolsController.updateSchool)
  .delete(schoolsController.deleteSchool);

export default router;