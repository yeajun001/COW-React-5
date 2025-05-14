import React from 'react';
import './TodoInput.css';

function TodoInput({ todo, setTodo, addTodo }) {
  return (
    <div id='inputBlock'>
      <input
        id='listInput'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo();
          }
        }}
      />
      <button id='addBtn' onClick={addTodo}>
        추가
      </button>
    </div>
  );
}

export default TodoInput;
