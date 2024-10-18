"use client";

import TodoList from "./components/TodoList";
import {TodoProvider} from "./contexts/TodoContext";

export default () => (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  </main>
);
