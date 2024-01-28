import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';
import './main.scss';


function TodoList() {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem('token');

  const addTodo = (todo) => {
    console.log(todo);
    console.log('please');
    // Create a new todo on the backend and add it to the local state
    axios
    .post(`${API_URL}/todos`, todo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const newTodo = response.data.todo;
        setTodos((prevTodos) => [newTodo, ...prevTodos]);
      })
      .catch((error) => {
        console.error('Error creating a todo:', error);
      });
  };

  const updateTodo = (todoId, newValue) => {
    
    // Update the todo on the backend and update the local state
    axios
    .put(`${API_URL}/todos/${todoId}`, newValue, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const updatedTodo = response.data.todo;
        setTodos((prevTodos) =>
          prevTodos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item))
        );
      })
      .catch((error) => {
        console.error('Error updating a todo:', error);
      });
  };

  const removeTodo = (id) => {
    // Delete the todo from the backend and update the local state
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
        console.error('Error deleting a todo:', error);
      });
  };
  const completeTodo = (id) => {
    

    setTodos((prevTodos) =>
    prevTodos.map((todo) => (todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo))
    );
  };
  useEffect(() => {
    // Fetch todos from the backend when the component mounts
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
        console.error('Error fetching todos:', error);
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
