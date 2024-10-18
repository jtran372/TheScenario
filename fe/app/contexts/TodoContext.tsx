import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTodos, createTodo, toggleComplete, deleteTodo, Todo, editTodoTitle } from '../services/todoService';

interface TodoContextProps {
  todos: Todo[];
  addTodo: (title: string) => Promise<void>;
  editTodo: (id: string, newTitle: string) => Promise<void>;
  toggleTodoComplete: (id: string) => Promise<void>;
  removeTodo: (id: string) => Promise<void>;
}

const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const TodoProvider = ({children}: {children: ReactNode}) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  const addTodo = async (title: string) => {
    if (!title) return;
    const newTodo = await createTodo(title);
    setTodos([...todos, newTodo]);
  };
  
  const editTodo = async (id: string, newTitle: string) => {
    const updatedTodo = await editTodoTitle(id, newTitle);
    setTodos(todos.map(todo => (todo._id === id ? updatedTodo : todo)));
  };

  const toggleTodoComplete = async (id: string) => {
    const updatedTodo = await toggleComplete(id);
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  const removeTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, toggleTodoComplete, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = (): TodoContextProps => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
};