import React from 'react';

export interface Todo {
  id: number;
  text: string;
}

export const createTodoTool = {
  definition: {
    name: 'create_todo',
    description:
      'Adds a new todo item to the todo list and saves it to localStorage.',
    parameters: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The text of the todo item to add',
        },
      },
      required: ['text'],
    },
  },

  handler: (setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    return async ({ text }: { text: string }) => {
      const newTodo: Todo = { id: Date.now(), text };
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
      'Updates the text of an existing todo item and saves it to localStorage.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          description: 'The id of the todo item to update',
        },
        text: {
          type: 'string',
          description: 'The new text for the todo item',
        },
      },
      required: ['id', 'text'],
    },
  },

  handler: (setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    return async ({ id, text }: { id: number; text: string }) => {
      setTodoList((prevTodos) => {
        const newTodos = prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text } : todo
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
