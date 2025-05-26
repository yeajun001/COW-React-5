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
      .then(newTodo => {
        setTodos([...todos, newTodo]);
        setInput('');
      });
  };

  const handleDelete = (id) => {
    fetch(`${API}/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(todo => todo.id !== id)));
  };

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditContent(todo.content);
  };

  const handleEditSubmit = () => {
    fetch(`${API}/contents/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent }),
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(todos.map(t => t.id === updated.id ? updated : t));
        setEditId(null);
        setEditContent('');
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // 수평 가운데 정렬
      justifyContent: 'center', // 수직 가운데 정렬
      minHeight: '100vh', // 화면 전체 높이 사용
      backgroundColor: '#f9f9f9',
    }}>
      <div style={{ width: '100%', maxWidth: '500px', background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center' }}>Todo List</h1>

        <form
  onSubmit={handleSubmit}
  style={{
    display: 'flex',
    justifyContent: 'center',   // ⬅ 가로 정렬 핵심!
    gap: '10px',
    marginBottom: '20px',
  }}
>
  <input
    type="text"
    placeholder="할 일을 입력하세요"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    style={{ padding: '8px', width: '70%' }} // ⬅ 폭 조절 (선택)
  />
  <button type="submit">추가</button>
</form>


        <ul style={{ padding: 0, listStyle: 'none' }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: '10px' }}>
              {editId === todo.id ? (
                <>
                  <input
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <button onClick={handleEditSubmit}>저장</button>
                  <button onClick={() => setEditId(null)}>취소</button>
                </>
              ) : (
                <>
                  <span style={{ marginRight: '10px' }}>{todo.content}</span>
                  <button onClick={() => handleEdit(todo)}>수정</button>
                  <button onClick={() => handleDelete(todo.id)}>삭제</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
