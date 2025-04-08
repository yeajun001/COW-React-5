import './style.css' // CSS 파일 불러오기

// HTML 구조를 app 요소에 삽입
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <!-- header 부분 입니다다 -->
  <header>
    <h1>📝 My To-Do List</h1>
  </header>

  <main>
    <section aria-labelledby="todo-section-title">
      <h2 id="todo-section-title">할 일 목록</h2>
      <form id="todo-form">
        <input type="text" id="todo-input" placeholder="할 일을 입력하세요" required />
        <button type="submit">추가</button>
      </form>
      <ul id="todo-list" aria-live="polite">
        <!-- 할 일 항목이 여기에 추가됩니다 -->
      </ul>
    </section>
  </main>

  <footer>
    <p class="read-the-docs">To-Do site입니다.</p>
  </footer>
`

// DOM 요소 선택
const form = document.querySelector<HTMLFormElement>('#todo-form')!
const input = document.querySelector<HTMLInputElement>('#todo-input')!
const list = document.querySelector<HTMLUListElement>('#todo-list')!

// 폼 제출 이벤트 처리
form.addEventListener('submit', (e) => {
  e.preventDefault() // 폼 기본 동작 방지

  const text = input.value.trim() // 입력값 가져오기
  if (text === '') return // 빈 값이면 무시

  const li = document.createElement('li') // li 요소 생성
  const id = `todo-${Date.now()}` // 고유 id 생성

  // 항목 HTML 구조 정의
  li.innerHTML = `
    <label for="${id}">${text}</label>
    <button class="delete-btn" aria-label="삭제">×</button>
  `

  // 삭제 버튼 기능 추가
  const deleteBtn = li.querySelector('.delete-btn') as HTMLButtonElement
  deleteBtn.addEventListener('click', () => {
    li.remove() // 해당 li 요소 삭제
  })

  list.appendChild(li) // 목록에 항목 추가
  input.value = '' // 입력창 초기화
})
