import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

import './DropMenu.css'


function Dropdown() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [state, setstate] =useState(false);
  const [todos, setTodos] = useState([]);
  
  const showDropdown=()=>{
    setstate(true);
  }
  const hideDropdown=()=>{
    setstate(false);
  }
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
        })
        .catch((error) => {
            console.log(error);
        });
}, []);

  return (
    <div className="dropdown">
        <div className="dropdown-menu" onMouseEnter= {showDropdown} onMouseLeave={hideDropdown}>
        Dropdown

        {state ?(<ul className="dropdown-list" onMouseEnter={showDropdown}>
        {todos.map((todo) => (
                    <li key={todo.id}>
                      {todo.title}:
                      {todo.name}</li>
                ))}
                
        </ul>):
        null}

        </div>
    </div>
  )
}

export default Dropdown;