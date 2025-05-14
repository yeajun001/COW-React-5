import { useState, useEffect } from 'react'
import './App.css'
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState(saveTodos);

  const deleteTodo = (id) => {
    setTodos(todos => todos.filter((todo) => todo.id !== id));
  }

  const checkTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? {...todo, checked: !todo.checked} : todo
      )
    )
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <TodoInput
        setTodos = {setTodos}
      />
      <ul>
        {todos.map((todo) => (
          <TodoList
            key = {todo.id}
            todo = {todo}
            deleteTodo = {deleteTodo}
            checkTodo = {checkTodo}
          />
        ))}
      </ul>
    </>
  )
}

const saveTodos = () => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
}

export default App