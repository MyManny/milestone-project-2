import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";

function TodoForm(props) {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const [input, setInput] = useState('');
    const [titleInput, setTitleInput] = useState('');

    const inputRef = useRef(null)
    const placeholderInputRef = useRef(null);

    const handlePlaceholderChange = e => {
        setTitleInput(e.target.value);
    };

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        console.log("im him")
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(token)
        
        const todoData = {   
            name: input,
            title: titleInput,
        };
        
        props.onSubmit(
            todoData
        );
        // Create an object with the data you want to send to the server
        

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

        setInput('')
        setTitleInput('');
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div>
            <div>
                <form className='todo-form' onSubmit={handleSubmit}  >

                    <div>
                        <input
                        
                            className="todo-title"
                            placeholder='Untitled List'
                            value={titleInput}
                            name='placeholderText'
                            onChange={handlePlaceholderChange}
                            ref={placeholderInputRef}
                            onFocus={() => {
                                inputRef.current && inputRef.current.blur();
                            }}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder='Add a todo'
                        value={input}
                        name='text'
                        className='todo-input'
                        onChange={handleChange}
                        ref={inputRef}
                        onFocus={() => {
                            placeholderInputRef.current.blur();
                        }}
                    />
                    <button className='todo-button'>Add Todo</button>
                </form>
            </div>
        </div>
    )
}

export default TodoForm