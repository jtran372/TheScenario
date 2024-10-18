import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Input,
  Text,
  Title,
} from "@mantine/core";
import {MdCancel, MdCheck, MdDelete, MdEdit} from "react-icons/md";
import {SetStateAction, useState} from "react";
import {useTodos} from "../contexts/TodoContext";

const TodoList: React.FC = () => {
  const {todos, addTodo, editTodo, toggleTodoComplete, removeTodo} = useTodos();
  const [newTodo, setNewTodo] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  const handleCreate = async () => {
    if (!newTodo) return;
    await addTodo(newTodo);
    setNewTodo("");
  };

  const handleEditClick = (todoId: string, oldTitle: string) => {
    setEditId(todoId);
    setNewTitle(oldTitle);
  };

  const handleSaveClick = async (todoId: string) => {
    if (newTitle.trim()) {
      await editTodo(todoId, newTitle);
      setEditId(null);
    }
  };

  return (
    <Flex style={{width: "100%"}} direction="column">
      <Title>Simple To Do List</Title>
      <Divider my="md" />
      <Flex direction="row">
        <Input
          value={newTodo}
          style={{width: "100%"}}
          onChange={(e: {target: {value: SetStateAction<string>}}) =>
            setNewTodo(e.target.value)
          }
          placeholder="Add a new task"
        />
        <Button onClick={handleCreate}>Add</Button>
      </Flex>
      <Text size="lg"> To Do List</Text>
      <Flex direction="column" gap="sm">
        {todos.map((todo) => (
          <>
            {editId === todo._id ? (
              <Flex direction="row" gap="md">
                <Input
                  value={newTitle}
                  style={{width: "100%"}}
                  onChange={(e: {target: {value: SetStateAction<string>}}) =>
                    setNewTitle(e.target.value)
                  }
                  placeholder={todo.title}
                />
                <Button onClick={() => handleSaveClick(todo._id)} size="sm">
                  <MdCheck />
                </Button>
                <Button onClick={() => setEditId(null)} size="sm">
                  <MdCancel />
                </Button>
              </Flex>
            ) : (
              <Flex>
                <Flex style={{width: "100%"}} gap="md">
                  <Checkbox onChange={() => toggleTodoComplete(todo._id)} />
                  <Text
                    style={{
                      textDecoration: todo.completed ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </Text>
                </Flex>
                <Flex justify="flex-end" gap="md">
                  <Button onClick={() => handleEditClick(todo._id, todo.title)} size="sm">
                    <MdEdit />
                  </Button>
                  <Button onClick={() => removeTodo(todo._id)} size="sm">
                    <MdDelete />
                  </Button>
                </Flex>
              </Flex>
            )}
          </>
        ))}
      </Flex>
    </Flex>
  );
};

export default TodoList;
