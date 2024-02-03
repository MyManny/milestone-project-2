/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import "./DropMenu.css";
import axios from "axios";

export interface Todo {
  isComplete: any;
  id: number;
  title: string;
  name: string;
}

function Dropdown() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const showDropdown = () => {
    setIsDropdownVisible(true);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setTodos(response.data.todos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setIsLoading(false);
      });
  }, [API_URL]);

  return (
    <div className="dropdown">
      <div className="dropdown-menu" onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
        My todo list
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching todos</p>
        ) : (
          <ul className="dropdown-list" onMouseEnter={showDropdown}>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.title}: {todo.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
