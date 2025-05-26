import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const API = 'http://localhost:8080/todos';

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(setTodos);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, isComplete: false }),
    })
      .then(res => res.json())
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
        setInput('');
      });
  };

  const handleDelete = (id) => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)));
  };

  const handleToggle = (todo) => {
    fetch(`${API}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...todo, isComplete: !todo.isComplete }),
    })
      .then(res => res.json())
      .then((updated) => {
        setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
      });
  };

  const handleEditSubmit = () => {
    fetch(`${API}/contents/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent }),
    })
      .then(res => res.json())
      .then((updated) => {
        setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
        setEditId(null);
        setEditContent('');
      });
  };

  return (
    <div id="app" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h1>할일 목록</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 입력"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: '10px' }}>
            {editId === todo.id ? (
              <>
                <input
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button onClick={handleEditSubmit}>제출</button>
                <button onClick={() => setEditId(null)}>취소</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.isComplete ? 'line-through' : 'none',
                  }}
                >
                  {todo.content}
                </span>
                <button onClick={() => handleToggle(todo)}>
                  {todo.isComplete ? '취소' : '완료'}
                </button>
                <button onClick={() => {
                  setEditId(todo.id);
                  setEditContent(todo.content);
                }}>
                  수정
                </button>
                <button onClick={() => handleDelete(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
