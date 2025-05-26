import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const port = 8080;

// JSON 파일을 DB 어댑터로 설정
const adapter = new JSONFile('./db.json');

// Low 인스턴스 생성 시 기본값 설정
const db = new Low(adapter, { todos: [] });

await db.read();

app.use(cors());
app.use(express.json());

app.get('/todos', (req, res) => {
  res.json(db.data.todos);
});

app.post('/todos', async (req, res) => {
  const newTodo = {
    id: Date.now(),
    content: req.body.content,
    isComplete: false,
  };
  db.data.todos.push(newTodo);
  await db.write();
  res.json(newTodo);
});

app.listen(port, () => {
  console.log(`서버가 실행 http://localhost:${port}`);
});
