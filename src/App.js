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
    -> TodoInput.js에서 function TodoInput({ test }) 형식으로 props가 전달 됨

    1. TodoInput 컴포넌트에서 input이라는 state를 onChange이벤트를 통해 입력 할 때마다 state를 업데이트
    2. 버튼의 클릭 이벤트가 실행되면 handleSubmit 함수가 실행되고, input값이 있는지 없는지 검사하여 있는 경우에 test(input)이 실행
    3. test는 부모 컨테이너에서 props로 전달한 값이고, 부모 컨테이너 안에 선언 된 addTodo 함수가 실행되어 Todos의 상태를 업데이트
  
  4. <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
    todos : TodoList에서 리스트의 현재 상태(todos)를 모두 보여줄거임
    -> 리스트 컴포넌트(TodoList.js)에서 ListContainer에 todos.map((todo,index) => ())을 통해 반복문으로 모든 값을 출력함

    toggleTodo : TodoText, Button은 click 이벤트로 toggleTodo(index)를 반환함
    1. 만약 투두리스트의 두 번쨰 text를 클릭하면 TodoText의 click 이벤트가 발생하고, toggleTodo(1)라는 prop이 리턴됨
    2. 부모 컴포넌트에 함수로 선언되어있는 toggleTodo의 index 값이 1로 들어가고, updatedTodos는 map함수를 이용하여 todos의 요소를 하나씩 검사
    3. todos의 0번째 요소는 map의 조건문을 만족하지 못하므로 todo 그대로 반환하고, 첫 번째 요소에서 i값이랑 index값이 일치하므로 {...todo, completed: !todo.completed}를 반환
    4. 만약 todos의 요소가 100개라면 100번 반복해서 검사

    removeTodo : toggleTodo와 동일한 방식으로 index를 받아와 updateTodos 함수가 실행됨
    todos.filter((_, i) => i !== index) 함수를 통해 i와 index가 같지 않은 요소들로 새로운 배열 생성
    -> under_score : 이 값은 사용하지 않는다
    (why? i !== index로 인덱스 값만 비교하고 있으므로 todos의 각 요소들은 사용하지 않는다는 의미)

    1. 인덱스가 일치하는 경우 : 삭제 버튼을 클릭한 그 요소이므로 updateTodos에 포함하지 않음
    2. 인덱스가 일치하지 않는 경우 : 삭제하지 않으려는 나머지 모든 요소이므로 해당 요소들만 setTodos로 상태 업데이트

*/