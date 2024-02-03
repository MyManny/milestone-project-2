/* eslint-disable no-empty-pattern */
import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import  Todo from "./Todo";
import axios from "axios";

interface TodoListProps {}

function TodoList({}: TodoListProps) {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [todos, setTodos] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const addTodo = (todo: any) => {
    axios
      .post(`${API_URL}/todos`, todo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const newTodo = response.data.todo;
        setTodos((prevTodos) => [newTodo, ...prevTodos] as never[]);
      })
      .catch((error) => {
        console.error("Error creating a todo:", error);
      });
  };

  const updateTodo = (todoId: any, newValue: any) => {
    axios
      .put(`${API_URL}/todos/${todoId}`, newValue, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedTodo = response.data.todo;
        setTodos((prevTodos) =>
          prevTodos.map(
            (todo) => (todo.id === todoId ? updatedTodo : todo) as never
          )
        );
      })
      .catch((error) => {
        console.error("Error updating a todo:", error);
      });
  };

  const removeTodo = (id: any) => {
    axios
      .delete(`${API_URL}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting a todo:", error);
      });
  };

  const completeTodo = (id: any) => {
    setTodos((prevTodos) =>
      prevTodos.map(
        (todo) =>
          (todo.id === id
            ? { ...todo, isComplete: !todo.isComplete }
            : todo) as never
      )
    );
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTodos(response.data.todos);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, [API_URL, token]);

  return (
    <div>
      <TodoForm onSubmit={addTodo} />
      {todos.map((todo, index) => (
        // Use JSX syntax to render each Todo component
        <Todo
          key={index}
          todos={[todo]}  // Pass a single todo as an array to Todo component
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
