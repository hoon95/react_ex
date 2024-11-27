const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());

// Sample in-memory todos array
let todos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build Todo App", completed: true }
];

app.use(express.json()); // JSON body parsing

// GET /api/todos - 모든 Todo 목록 조회
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST /api/todos - 새로운 Todo 추가
app.post('/api/todos', (req, res) => {
  const { text, completed } = req.body;
  const newTodo = { id: Date.now(), text, completed };
  todos.push(newTodo);
  res.json(newTodo);
});

// PATCH /api/todos/:id - Todo 업데이트
app.patch('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    todo.completed = completed;
    res.json(todo);
  } else {
    res.status(404).send('Todo not found');
  }
});

// DELETE /api/todos/:id - Todo 삭제
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id != id);
  res.json({ message: 'Todo deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
