export default function TodoList({todo, deleteTodo, checkTodo}) {
  const isChecked = () => {
    checkTodo(todo.id);
  }
  
  return (
    <li>
      <input type="checkbox" onChange={isChecked} checked={todo.checked}/>
      {todo.checked === true ? <del>{todo.text}</del> : todo.text}
      <button onClick={() => deleteTodo(todo.id)}>삭제</button>
    </li>
  )
}