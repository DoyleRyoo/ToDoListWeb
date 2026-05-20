// express 불러오기 import와 같음
const express = require("express");

// react와 통신 허용 import와 같음
const cors = require("cors");

const app = express();
const PORT = 3000;

// JSON 데이터 받을 수 있게 설정
app.use(express.json());

// 다른 포트 접근 허용
app.use(cors());


// =============================
// 메모리 배열 (DB 대신 사용)
// =============================

let todos = [
  {
    id: 1,
    text: "리액트 공부",
    completed: false,
  },
];


// =============================
// 목록 조회
// GET /todos
// =============================

app.get("/todos", (req, res) => {
  res.json(todos);
});


// =============================
// 추가
// POST /todos
// =============================

app.post("/todos", (req, res) => {
  const { text } = req.body;

  const newTodo = {
    id: Date.now(), // 고유 id
    text,
    completed: false,
  };

  todos.push(newTodo);

  res.json(newTodo);
});


// =============================
// 삭제
// DELETE /todos/:id
// =============================

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.filter((todo) => todo.id !== id);

  res.json({ message: "삭제 완료" });
});


// =============================
// 완료 상태 변경
// PATCH /todos/:id
// =============================

app.patch("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  todos = todos.map((todo) =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  res.json({ message: "상태 변경 완료" });
});


// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행: http://localhost:${PORT}/todos`);
});