import React from 'react';

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'done';
}

export const createTodoTool = {
  definition: {
    name: 'create_todo',
    description:
      'Adds a new todo item to the todo list and saves it to localStorage.',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'The title of the todo item',
        },
        description: {
          type: 'string',
          description: 'The description of the todo item',
        },
      },
      required: ['title', 'description'],
    },
  },

  handler: (setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    return async ({ title, description }: { title: string; description: string }) => {
      const newTodo: Todo = { id: Date.now(), title, description, status: 'pending' };
      setTodoList((prevTodos) => {
        const newTodos = [...prevTodos, newTodo];
        localStorage.setItem('todo_list', JSON.stringify(newTodos));
        return newTodos;
      });
      return { ok: true, message: 'Todo added successfully', todo: newTodo };
    };
  },
};

export const readTodoListTool = {
  definition: {
    name: 'read_todo_list',
    description: 'Retrieves the current list of todos from localStorage.',
    parameters: {
      type: 'object',
      properties: {},
      required: [],
    },
  },

  handler: () => {
    return async () => {
      const todos: Todo[] = JSON.parse(
        localStorage.getItem('todo_list') || '[]'
      );
      return { todos };
    };
  },
};

export const updateTodoTool = {
  definition: {
    name: 'update_todo',
    description:
      'Updates an existing todo item and saves it to localStorage.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The id of the todo item to update',
        },
        title: {
          type: 'string',
          description: 'The new title for the todo item',
        },
        description: {
          type: 'string',
          description: 'The new description for the todo item',
        },
        status: {
          type: 'string',
          enum: ['pending', 'done'],
          description: 'The new status for the todo item',
        },
      },
      required: ['id'],
    },
  },

  handler: (setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    return async ({ id, title, description, status }: { id: number; title?: string; description?: string; status?: 'pending' | 'done' }) => {
      setTodoList((prevTodos) => {
        const newTodos = prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: title || todo.title, description: description || todo.description, status: status || todo.status } : todo
        );
        localStorage.setItem('todo_list', JSON.stringify(newTodos));
        return newTodos;
      });
      return { ok: true, message: 'Todo updated successfully' };
    };
  },
};

export const deleteTodoTool = {
  definition: {
    name: 'delete_todo',
    description:
      'Deletes a todo item from the todo list and saves it to localStorage.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The id of the todo item to delete',
        },
      },
      required: ['id'],
    },
  },

  handler: (setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    return async ({ id }: { id: number }) => {
      setTodoList((prevTodos) => {
        const newTodos = prevTodos.filter((todo) => todo.id !== id);
        localStorage.setItem('todo_list', JSON.stringify(newTodos));
        return newTodos;
      });
      return { ok: true, message: 'Todo deleted successfully' };
    };
  },
};
