import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState([]);
  const BASE_URL = "http://localhost:8080"; 

  function postTodo() {
    fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: value,
        isComplete: false
      })
    })
    // useEffect(() => [ // promiss가 있는 부분은 await을 붙여준다 
    //   async function getTodos(){
    //     const result = await fetch('$(BASE_URL)/todos')
    //     const data = await result.json();
    //     setTodos(data);
    //   }
    // ])
  }

  function fetchTodos() {
    fetch(`${BASE_URL}/todos`)
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.error("할 일 불러오기 실패", error));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>할 일 목록</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        postTodo();
      }}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
