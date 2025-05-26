import { useState, useEffect } from 'react';
import './index.css';

function App() {
  //1번 조건식 입니다다
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // 2번 3번 조건 식
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (text === '') return;
    const newTodo = {
      id: Date.now(),
      text: text
    };
    setTodos([...todos, newTodo]);
    setInput('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div id="app">
      <header>
        <h1>todo list 입니다</h1>
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">추가</button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}
              <button onClick={() => handleDelete(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </main>

      
    </div>
  );
}

export default App;
