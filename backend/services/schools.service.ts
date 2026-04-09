import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];

export const schoolService = {
  findAll: async (): Promise<Todo[]> => {
    return todos;
  },

  find: async (id: string): Promise<Todo | undefined> => {
    return todos.find((t) => t.id === id);
  },

  create: async (title: string): Promise<Todo> => {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Title is required and must be a non-empty string');
    }

    const existingTodo = todos.find(
      (t) => t.title.toLowerCase() === title.trim().toLowerCase()
    );
    if (existingTodo) {
      throw new Error('A todo with this title already exists');
    }

    const newTodo: Todo = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  },

  update: async (id: string, updates: Partial<Todo>): Promise<Todo> => {
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const { title, completed } = updates;
    if (
      title !== undefined &&
      (typeof title !== 'string' || title.trim() === '')
    ) {
      throw new Error('Title must be a non-empty string');
    }

    const updatedTodo = { ...todos[todoIndex] };
    if (title !== undefined) {
      const existingTodo = todos.find(
        (t) =>
          t.id !== id && t.title.toLowerCase() === title.trim().toLowerCase()
      );
      if (existingTodo) {
        throw new Error('A todo with this title already exists');
      }
      updatedTodo.title = title.trim();
    }
    if (completed !== undefined) updatedTodo.completed = Boolean(completed);

    todos[todoIndex] = updatedTodo;
    return updatedTodo;
  },

  remove: async (id: string): Promise<void> => {
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    todos.splice(todoIndex, 1);
  },
};
