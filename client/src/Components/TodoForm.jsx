import React, { useState, useEffect, useRef } from 'react'

function TodoForm(props) {
    const [input, setInput] = useState('');
    const [placeholderInput, setPlaceholderInput] = useState('');

    const inputRef = useRef(null)
    const placeholderInputRef = useRef(null);

    const handlePlaceholderChange = e => {
        setPlaceholderInput(e.target.value);
    };

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 500000),
            text: input,
            placeholder: placeholderInput
        });

        setInput('')
        setPlaceholderInput('');
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
                            placeholder='Untitled List'
                            value={placeholderInput}
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