import axios from "axios";

const API_URL = "http://localhost:3000/todos";

export interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post(API_URL, {title});
  return response.data;
};

export const editTodoTitle = async (id: string, newTitle: string): Promise<Todo> => {
  const response = await axios.patch(`${API_URL}/${id}/edit-title`, { title: newTitle });
  return response.data;
};

export const toggleComplete = async (id: string): Promise<Todo> => {
  const response = await axios.patch(`${API_URL}/${id}/toggle-complete`);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
