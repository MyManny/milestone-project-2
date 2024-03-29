import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import './main.scss';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        title: '',
        name: '',
      });
      const submitUpdate = (value) => {
        updateTodo(edit.id, value);
        setEdit({
          id: null,
          title: '',
          name: '',
        });
      };
    
      if (edit.id) {
        return <TodoForm edit={edit} onSubmit={submitUpdate} />;
      }
    

      return todos.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
          <div key={todo.id} onClick={() => completeTodo(todo.id)}>
             {todo.title} - {todo.name}
          </div>
          <div className='icons'>
            <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className='delete-icon' />
            <TiEdit onClick={() => setEdit({ ...todo })} className='edit-icon' />
          </div>
        </div>
      ));
}

export default Todo