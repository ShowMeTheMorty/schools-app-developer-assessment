import cors from 'cors';
import express from 'express';
import { createSchoolsController } from './controllers/schools.controllers';
import schoolRepository from './repositories/schools.repository';
import { createSchoolsRouter } from './routes/schools.routes';
import { createSchoolsService } from './services/schools.service';

export const createApp = (): express.Express => {
  const schoolsService = createSchoolsService(schoolRepository);
  const schoolsController = createSchoolsController(schoolsService);
  const schoolsRouter = createSchoolsRouter(schoolsController);

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/schools', schoolsRouter);

  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });

  return app;
};