import React, { useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [todoId, setTodoId] = useState(0);

  const addTodo = () => {
    if (todo.trim() !== '') {
      const newTodo = {
        id: todoId,
        text: todo,
        completed: false,
      };
      setTodoList([...todoList, newTodo]);
      setTodo('');
      setTodoId((prev) => prev + 1);
    }
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTodoList(todoList.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  return (
    <div>
      <h1 id='listName'>Todo List</h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addTodo} />
      <TodoList todoList={todoList} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
