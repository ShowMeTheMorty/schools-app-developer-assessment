import express from 'express';
import { schoolService } from '../services/schools.service';

const router = express.Router();
type IdParams = { id: string };

// Create a todo
router.post('/', async (req: express.Request, res: express.Response) => {
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
});

// Get all todos
router.get('/', async (req: express.Request, res: express.Response) => {
  const todos = await schoolService.findAll();
  res.json(todos);
});

// Get a single todo
router.get('/:id', async (req: express.Request<IdParams>, res: express.Response) => {
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
});

// Update a todo
router.put('/:id', async (req: express.Request<IdParams>, res: express.Response) => {
  try {
    const updatedTodo = await schoolService.update(req.params.id, req.body);
    res.json(updatedTodo);
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'Todo not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json({ error: 'An unknown error occurred' });
    }
  }
});

// Delete a todo
router.delete('/:id', async (req: express.Request<IdParams>, res: express.Response) => {
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
});

export default router;