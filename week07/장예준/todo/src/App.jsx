import { useEffect, useState } from 'react'; // React의 훅(hook) 사용을 위한 import

function App() {
  const [todos, setTodos] = useState([]); // 할 일 목록 상태
  const [input, setInput] = useState(''); // 입력창에 입력 중인 문자열 상태
  const [editId, setEditId] = useState(null); // 현재 수정 중인 todo의 ID
  const [editContent, setEditContent] = useState(''); // 수정 입력창에 표시할 문자열

  const API = 'http://localhost:8080/todos'; // 사용할 백엔드 API 주소 

  useEffect(() => {
    fetch(API) // 백엔드에서 할 일 목록 데이터를 요청 (GET)
      .then(res => res.json()) // 응답을 JSON으로 변환
      .then(setTodos); // 가져온 목록을 상태에 저장
  }, []); // 빈 배열 컴포넌트가 처음 렌더링될 때만 실행됨

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    const content = input.trim(); // 앞뒤 공백 제거
    if (!content) return; // 공백만 있으면 아무 것도 안 함

    fetch(API, {
      method: 'POST', // 할 일 추가 요청
      headers: { 'Content-Type': 'application/json' }, // JSON 형식으로 전송
      body: JSON.stringify({ content, isComplete: false }), // 보낼 데이터 객체를 문자열로 변환
    })
      .then(res => res.json()) // 응답을 JSON으로 변환
      .then(newTodo => {
        setTodos([...todos, newTodo]); // 기존 목록에 새 항목 추가
        setInput(''); // 입력창 초기화
      });
  };

  const handleDelete = (id) => {
    fetch(`${API}/${id}`, { method: 'DELETE' }) // 특정 id 항목 삭제 요청
      .then(() => setTodos(todos.filter(todo => todo.id !== id))); // 해당 항목을 목록에서 제거
  };

  const handleEdit = (todo) => {
    setEditId(todo.id); // 수정할 항목의 ID 저장
    setEditContent(todo.content); // 기존 내용을 수정창에 표시
  };

  const handleEditSubmit = () => {
    fetch(`${API}/contents/${editId}`, {
      method: 'PUT', // 수정 요청
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: editContent }), // 수정된 내용 전송
    })
      .then(res => res.json())
      .then(updated => {
        setTodos(todos.map(t => t.id === updated.id ? updated : t)); // 목록 업데이트
        setEditId(null); // 수정 모드 종료
        setEditContent(''); // 입력 초기화
      });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center', 
      minHeight: '100vh', 
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px', // 최대 너비
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
      }}>
        <h1 style={{ textAlign: 'center' }}>Todo List</h1> 

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex', 
            justifyContent: 'center', 
            gap: '10px', 
            marginBottom: '20px',
          }}
        >
          <input
            type="text"
            placeholder="입력하세요" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            style={{ padding: '8px', width: '70%' }} 
          />
          <button type="submit">추가</button> {/* 추가 버튼 */}
        </form>

        <ul style={{ padding: 0, listStyle: 'none' }}> {/* 할 일 목록 시작 */}
          {todos.map((todo) => ( // todos 배열 반복 렌더링
            <li key={todo.id} style={{ marginBottom: '10px' }}>
              {editId === todo.id ? ( 
                <>
                  <input
                    value={editContent} // 수정창 입력값
                    onChange={(e) => setEditContent(e.target.value)} // 입력값 변경
                    style={{ marginRight: '10px' }}
                  />
                  <button onClick={handleEditSubmit}>저장</button> {/* 수정 저장 */}
                  <button onClick={() => setEditId(null)}>취소</button> {/* 수정 취소 */}
                </>
              ) : (
                <>
                  <span style={{ marginRight: '10px' }}>{todo.content}</span> {/* 할 일 텍스트 표시 */}
                  <button onClick={() => handleEdit(todo)}>수정</button> {/* 수정 */}
                  <button onClick={() => handleDelete(todo.id)}>삭제</button> {/* 삭제 */}
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
