import { useState } from 'react'

export default function TodoInput({setTodos}) {
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      checked: false
    }
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  return(
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            addTodo();
          }
        }}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTodo}>추가</button>
    </div>
  )
}