import { useState } from "react";
import "./App.css";
//js도 기본개념정도만 알고 react도 처음이기에 생소했던 부분이나 처음 알게된 개념 다 주석으로 달았습니다.

function App() {
  //컴포넌트 하나에 다 때려박는 관점으로 코드를 짰습니다.
  const [inputValue, setInputValue] = useState("");
  const [inputList, setInputList] = useState([]);
  //inputvalue는 string으로 inputList는 배열로
  //useState 훅 사용시 [a,b]이런식이라면 a는 현재상태의 값, b는 상태를 업데이트하는 함수(이함수를 호출하면 a의 값을 변경가능)
  // 입력값을 setInputValue 으로 set
  const changeTodoInput = (e) => {
    setInputValue(e.target.value);
  };
  //setInputValue 함수 호출해서 inputValue를 업데이트하는식
  // 할일 추가
  const addTodo = () => {
    if (inputValue.trim() === "") return; // 빈 입력값 방지 //조건에 맞으면 함수작동안되도록
    //trim()메소드는 앞뒤 공백을 제거한 문자열의 복사본 리턴
    setInputList([...inputList, inputValue]); // ...으로 기존값 가져오기, 현재 입력값
    setInputValue(""); // 입력값 초기화
  };
  // 할일 삭제
  const deleteTodo = (index) => {
    const newInputList = inputList.filter((_, i) => i !== index); // 선택된 인덱스를 제외한 새로운 리스트 생성
    setInputList(newInputList); // 새로운 리스트로 업데이트
  };
  //inputList.filter((_, i) => i !== index); inputList배열 순회하면서 새 배열을 생성
  //여기서는 조건이 !==즉 아닐때 이므로 해당 index와 다를때만 해당요소를 새로운 배열에 포함시킴 그래서 선택된 리스트를 제외한 모든 리스트가 새 배열에 포함되고 그 새로운 리스트로 inputList상태를 업데이트한다.

  return (
    <div className="App">
      <div>
        <input type="input" value={inputValue} onChange={changeTodoInput} />
        <button onClick={addTodo}>추가</button>
      </div>
      <ul>
        {inputList.map(
          (
            todo,
            index //map메서드는 inputList 배열의 각 요소에 대해 함수를 실행, 새 배열을 생성
          ) => (
            <li key={index}>
              {todo}
              <button onClick={() => deleteTodo(index)}>삭제</button>{" "}
            </li> // 할일 리스트 렌더링  //앞서서 말했듯이 index를 게속 이용했기에 여기서도 리스트를 렌더링할때 각 항목에 index라는 키를 부여하는것 //자바스크립트 표현식사용, 변수출력
          )
        )}
      </ul>
    </div>
  );
}

export default App;
