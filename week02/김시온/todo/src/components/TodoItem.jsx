import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './TodoItem.css';

function TodoItem({ item, deleteTodo, toggleComplete }) {
  return (
    <li className={`list ${item.completed ? 'completed' : ''}`} key={item.id}>
      <input type='checkbox' className='todoCheck' checked={item.completed} onChange={() => toggleComplete(item.id)} />
      {item.text}
      <button className='deleteBtn' onClick={() => deleteTodo(item.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </li>
  );
}

export default TodoItem;
