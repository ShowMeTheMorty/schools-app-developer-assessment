// extracting routes logic into controllers
import { Request, Response } from 'express'
import { schoolService } from '../services/schools.service';
import School from '../models/school';

const listSchools = async (req: Request, res: Response) => {
  const todos = await schoolService.findAll();
  res.json(todos);
};

const getSchool = async (req: Request<{id: string}>, res: Response) => {
  try {
    const todo = await schoolService.find(req.params.id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    res.json(todo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

const createSchool = async (req: Request, res: Response) => {
  try {
      const newTodo = await schoolService.create(req.body.title);
      res.status(201).json(newTodo);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
  }
};

const updateSchool = async (req: Request<{id: string}>, res: Response) => {
  
};

const deleteSchool = async (req: Request<{id: string}>, res: Response) => {
  try {
    await schoolService.remove(req.params.id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(404).json({ error: 'An unknown error occurred' });
    }
  }
};

export { 
    listSchools, 
    getSchool, 
    createSchool as addSchool, 
    updateSchool,
    deleteSchool
};