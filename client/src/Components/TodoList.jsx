import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import axios from "axios";

function TodoList() {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos]
        setTodos(newTodos)

    console.log(todo)
    console.log("please")
    // Create a new todo on the backend and add it to the local state
    axios
      .post(`${API_URL}/todos`, todo)
      .then((response) => {
        const newTodo = response.data;
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
      })
      .catch((error) => {
        console.error("Error creating a todo:", error);
      });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    // Update the todo on the backend and update the local state
    axios
      .put(`${API_URL}/todos/${todoId}`, newValue)
      .then((response) => {
        const updatedTodo = response.data;
        setTodos((prevTodos) =>
          prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item))
        );
      })
      .catch((error) => {
        console.error("Error updating a todo:", error);
      });
  };

  const removeTodo = (id) => {
    // Delete the todo from the backend and update the local state
    axios
      .delete(`${API_URL}/todos/${id}`)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting a todo:", error);
      });
  };
  const completeTodo = (id) => {
    

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo
      )
    );
  };
  useEffect(() => {
    // Fetch todos from the backend when the component mounts
    axios
      .get(`${API_URL}/todos`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return (
    <div>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
