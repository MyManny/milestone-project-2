import React, { useState, useEffect, useRef } from 'react';
import './main.scss';

function TodoForm(props) {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [input, setInput] = useState(props.edit ? props.edit.name : '');
  const [titleInput, setTitleInput] = useState(props.edit ? props.edit.title : '');

  const inputRef = useRef(null);
  const titleInputRef = useRef(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitleInput(e.target.value);
  };
 
  useEffect(() => {
    inputRef.current.focus();
  }, []);
        
  const handleSubmit = (e) => {
    e.preventDefault();

        // Create an object with the data you want to send to the server
    const todoData = {
        name: input,
        title: titleInput,
    };

    props.onSubmit(todoData);

    setInput('');
    setTitleInput('');
    // Reset focus to the main input field
    inputRef.current.focus();
  };

  useEffect(() => {
    // On page load, set the focus to the main input field
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <div >
        <form className='todo-form' onSubmit={handleSubmit}>
          <div>
            <input
              type='text'
              className='todo-title'
              placeholder='Title'
              value={titleInput}
              name='placeholderText'
              onChange={handleTitleChange}
              ref={titleInputRef}
            />
          </div>
          <input
            type='text'
            placeholder='Add a todo'
            value={input}
            name='text'
            className='todo-input'
            onChange={handleChange}
            ref={inputRef}
          />
          <button className='todo-button'>Add Todo</button>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;