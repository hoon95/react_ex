import React, { useState } from 'react';
import styled from 'styled-components';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, { text: newTodo, completed: false }]);
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <AppContainer>
      <Title>Todo List</Title>
      <TodoInput test={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    </AppContainer>
  );
}

export default App;

/*
  이해를 돕기 위한 컴포넌트 설명
  1. App 함수는 AppContainer라는 스타일링 된 컴포넌트(styled-components)를 반환
  2. addTodo, toggleTodo, removeTodo 함수는 부모 컴포넌트(App) 안에서 정의된 props
     -> 이 함수들은 각 기능을 수행하며 자식 컴포넌트에 props로 전달하여 사용하도록 함
  3. <TodoInput test={addTodo} />
      test    : 자식 컴포넌트(TodoInput.js)에 전달되는 props
      addTodo : 부모 컴포넌트(App.js)에서 정의된 함수
  4. TodoInput.js에서 function TodoInput({ test }) 형식으로 props가 전달 됨
*/