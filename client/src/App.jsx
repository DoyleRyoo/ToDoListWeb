import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // 서버 주소
  const BASE_URL = "http://localhost:3000";



  // ======================
  // 목록 가져오기
  // ======================

  const fetchTodos = async () => {
    const res = await fetch(`${BASE_URL}/todos`);
    const data = await res.json();

    setTodos(data);
  };



  // ======================
  // 추가
  // ======================

  const addTodo = async () => {
    if (!text.trim()) return;

    await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchTodos();
  };



  // ======================
  // 삭제
  // ======================

  const deleteTodo = async (id) => {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  };



  // ======================
  // 완료 상태 변경
  // ======================

  const toggleTodo = async (id) => {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: "PATCH",
    });

    fetchTodos();
  };



  // 첫 화면 로드
  useEffect(() => {
    fetchTodos();
  }, []);




  return (
    <div style={{ width: "400px", margin: "40px auto" }}>
      <h1>Todo List</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일 입력"
      />

      <button onClick={addTodo}>추가</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                cursor: "pointer",
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;