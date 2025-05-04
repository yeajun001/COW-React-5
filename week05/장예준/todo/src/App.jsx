import { useState, useEffect } from 'react';
import './index.css';

function App() {
  // 1번 조건식: localStorage에서 저장된 todos가 있다면 초기값으로 사용 없으면 빈 배열로 시작
  // useState에 함수를 넘기면 컴포넌트 처음 렌더링 시에만 실행됨
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos'); // localStorage에서 todos 가져오기
    return saved ? JSON.parse(saved) : [];
  });

  // 입력창에 입력된 텍스트 상태
  const [input, setInput] = useState('');

  // 2번, 3번 조건식: todos 배열이 바뀔 때마다 localStorage에 자동 저장
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); 
    // localStorage는 문자열만 저장 가능하므로 JSON으로 변환
  }, [todos]); // todos가 변경될 때만 실행됨

  // 할 일 추가
  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지 (form 기본 동작 취소)
    const text = input.trim(); // 입력값에서 앞뒤 공백 제거
    if (text === '') return; // 빈 문자열이면 추가하지 않음

    const newTodo = {
      id: Date.now(), // 고유한 id 생성 (현재 시간 기준)
      text: text // 할 일 텍스트 저장
    };

    setTodos([...todos, newTodo]); // 기존 할 일 목록에 새 항목 추가
    setInput(''); // 입력창 초기화
  };

  // 할 일 삭제
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); 
    // 클릭된 항목의 id와 다른 것만 필터링하여 새로운 배열 생성
  };

  return (
    <div id="app">
      <header>
        <h1>todo list 입니다</h1>
      </header>

      <main>
        {/* 할 일 입력 폼 */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="할 일을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)} // 입력값이 바뀔 때마다 상태 업데이트
          />
          <button type="submit">추가</button>
        </form>

        {/* 할 일 목록 출력 */}
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
