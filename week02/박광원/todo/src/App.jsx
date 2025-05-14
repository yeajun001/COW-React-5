import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  const deleteTodo = (id) => {
    setTodos(todos => todos.filter((todo) => todo.id !== id));
  }
  
  return (
    <>
      <TodoInput
        todos = {todos}
        setTodos = {setTodos}
      />
      <ul>
        {todos.map((todo) => (
          <TodoList
            key={todo.id}
            todo = {todo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </>
  )
}

const TodoInput = ({todos, setTodos}) => {
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input
    }
    setTodos([...todos, newTodo]);
    setInput("");
  };

  return(
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>
    </div>
  )
}

const TodoList = ({todo, deleteTodo}) => {
  const [check, setCheck] = useState(false);
  const isChecked = () => {
    setCheck(!check);
  }
  console.log(todo)

  return (
    <li>
      <input type="checkbox" value={check} onChange={isChecked}/>
      {check === true ? <del>{todo.text}</del> : todo.text}
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </li>
  )
}

export default App