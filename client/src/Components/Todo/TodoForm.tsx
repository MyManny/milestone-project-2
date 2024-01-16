/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';

interface TodoFormProps {
  edit?: {
    name: string;
    title: string;
  };
  onSubmit: (data: { name: string; title: string }) => void;
}

function TodoForm({ edit, onSubmit }: TodoFormProps) {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [input, setInput] = useState(edit ? edit.name : '');
  const [titleInput, setTitleInput] = useState(edit ? edit.title : '');

  const inputRef = useRef<HTMLInputElement | null>(null);
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    e.preventDefault();

    // Create an object with the data you want to send to the server
    const todoData = {
      name: input,
      title: titleInput,
    };

    onSubmit(todoData);

    setInput('');
    setTitleInput('');
    // Reset focus to the main input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // On page load, set the focus to the main input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <div>
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
