import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";

function TodoForm(props) {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const [input, setInput] = useState('');

    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    })

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
                setInput(response.data.todos);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        // Create an object with the data you want to send to the server
        const todoData = {
            text: input,
        };

        // Send a POST request to the server
        axios
            .post(`${API_URL}/todos`, todoData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log(response);
                // Call a function to handle the response if needed
                // For example, you can update your UI to reflect the successful addition of the todo.
                props.onSubmit(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setInput('');
    };

    return (
        <div>
            <form className='todo-form' onSubmit={handleSubmit}  >
                <input 
                type="text"
                placeholder="Add a todo"
                value={input}
                name="text"
                className="todo-input"
                onChange={handleChange}
                ref={inputRef}
            />
                <button className='todo-button'>Add Todo</button>
            </form>
        </div>
    )
}

export default TodoForm