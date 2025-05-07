import { useState, useEffect } from 'react';
// hook useState useEffect 사용할수 있는 클래스
// useState는 컴포넌트에 state 변수를 추가 // 값을 저장 
// useEffect는 외부 시스템과 컴포넌트를 동기화 // 
function App() {
  const [todos, setTodos] = useState(() => { // todo라는 state를 만들기 위해 useState를 사용함 
    // todo에는 할일의 목록이 저장됨 
    // setTodos 할일 목록을 수정할떄 사용됨
    // localStorage란 무엇인가? 웹 브라우저에 데이터를 저장하고 검색하는 데 사용되는 웹 스토리지 API
    const saved = localStorage.getItem('todos'); // localStorage.getItem value 읽어오기
    // localStorage 브라우저에 저장된 todo 데이터를 가져옴
    if (saved) { // 만일 saved 값이 있다면
      return JSON.parse(saved); // 문자열로 지정된데이터를 자바스크립트 객체(배열)로 변환
    } else { // 만일 조건에 성립하지 않으면
      return []; // 저장된 값이 없으면 빈 배열로 시작함
    }
  })

  // 처음 시도한 코드
  //return saved ? JSON.parse(saved) : [];
  // 풀이 (만일 saved값이 있다면 json.parse(saved를 반환하고 없으면 빈 배열로 반환함))
  // ?는 삼항연산자로 참이면 값을 실행하는 명령어어

  const [input, setInput] = useState('') // 입력을 한 값을 useState를 통해 저장 초기상태에는 빈 문자열
  // setInput 값을 바꾸고 싶을떄 사용용
  useEffect(() => { // todo에서 할일 목록이 수정할떄 마다 안에있는 코드를 실행
    //JSON.stringify(todos) todo 배열을 문자열로 변환
  // 공부한점 == react는 자동으로 화면을 업데이트 해주지만 외부저장소 서버 콘솔 타이머는 직접 동기화 해주어야함 
  // useEffect 사용자가 일을 추가 or 삭제하면 todo가 바뀜 최신 todo 배열을 --> localStorage에 저장
    localStorage.setItem('todos', JSON.stringify(todos));
    // localstorge.setitem key value 추가
  }, [todos]);

// 정리
//useEffect는 todos가 바뀔 때마다 실행되며
// 그 안의 localStorage.setItem('todos', JSON.stringify(todos)) 코드는
// 추가, 수정, 삭제된 todos를 문자열로 변환해 브라우저 저장소(localStorage)에 저장하는 역할을 합니다.
  const handleSubmit = (e) => { // e == event 객체 폼을 제출 --> 자동으로 객체를 함수에 넘김김 
    e.preventDefault(); // e.pre 사용자가 버튼을 클릭 --> 클릭 정보가 e에 담김 즉 e.pre는 새로고침을 막는 매소드임
    const text = input.trim(); // trim은 앞뒤 공백제거
    if (text === '') return; // 입력값이 없으면 --> 아무것도 하지 x 함수 종료

    const newTodo = { id: Date.now(), text }; 
    // newtodo라는 새로운 객체를 생성하고 입력한 내용을 기반으로 새로운 todo 객체를 생성함
    setTodos([...todos, newTodo]);
    //
    //...는 배열이나 객체의 요소를 펼쳐서 새로운 배열이나 객체를 만들 때 사용합니다.
    //기존 데이터를 변경하지 않고 복사하거나 추가할 때 유용합니다.
    setInput(''); // 입력창을 비워 사용가가 다음 작성할 내용을 작성할수 있도록 합니다.
  }
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div id="app">
      <h1>할일 목록록</h1>

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
          <li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
