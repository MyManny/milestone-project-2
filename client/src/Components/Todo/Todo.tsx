import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { Todo as TodoType } from "../DropMenu/DropMenu";

interface TodoProps {
  todos: TodoType[];
  completeTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newValue: string) => void;
}

function Todo({ todos, completeTodo, removeTodo, updateTodo }: TodoProps) {
  const [edit, setEdit] = useState<{
    id: number | null;
    title: string;
    name: string;
  }>({
    id: null,
    title: "",
    name: "",
  });

  const submitUpdate = (value: string) => {
    if (edit.id !== null) {
      updateTodo(edit.id, value);
      setEdit({
        id: null,
        title: "",
        name: "",
      });
    }
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={(data) => submitUpdate(data.title)} />;
  }

  return (
    <div>
      {todos.map((todo, index) => (
        <div
          className={todo.isComplete ? "todo-row complete" : "todo-row"}
          key={index}
        >
          <div key={todo.id} onClick={() => completeTodo(todo.id)}>
            {todo.title} - {todo.name}
          </div>
          <div className="icons">
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className="delete-icon"
            />
            <TiEdit onClick={() => setEdit({ ...todo })} className="edit-icon" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Todo;
