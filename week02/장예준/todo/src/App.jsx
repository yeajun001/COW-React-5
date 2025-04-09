// react jsx로 수정하였습니다다
import { useState } from 'react';
import './index.css';  
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (text === '') return;
  // 폼 제출 시 호출되는 함수
    const newTodo = {
      id: `todo-${Date.now()}`,
      text,
    };
// 목록 추가
    setTodos([...todos, newTodo]);
    setInput('');
  };
// 삭제 버튼 클릭 시 호출되는 함수
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div id="app">
      {/* header 부분 이니당 */}
      <header>
        <h1>📝 My To-Do List</h1>
      </header>
      {/* main 콘텐츠 영역 */}
      <main>
        <section aria-labelledby="todo-section-title">
          <h2 id="todo-section-title">할 일 목록</h2>
          <form id="todo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="todo-input"
              placeholder="할 일을 입력하세요"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">추가</button>
          </form>
          <ul id="todo-list" aria-live="polite">
            {todos.map((todo) => (
              <li key={todo.id}>
                <label htmlFor={todo.id}>{todo.text}</label>
                <button
                  className="delete-btn"
                  aria-label="삭제"
                  onClick={() => handleDelete(todo.id)}
                >
                  {/* 삭제 기능 연결 부분 입니다 */}
                  ×
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
            {/* 푸터 영역 입니다다 */}
      <footer>
        <p className="read-the-docs">To-Do site입니다.</p>
      </footer>
    </div>
  );
}

export default App;
