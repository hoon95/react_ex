import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 400px;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.completed ? '#d4edda' : 'white')};
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
`;

const TodoText = styled.span`
  flex: 1;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  font-size: 0.9rem;
  color: white;
  background-color: ${(props) => (props.delete ? '#dc3545' : '#007bff')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.delete ? '#c82333' : '#0056b3')};
  }
`;

function TodoList({ todos, toggleTodo, removeTodo }) {
  return (
    <ListContainer>
      {todos.map((todo, index) => (
        <ListItem key={index} completed={todo.completed}>
          <TodoText onClick={() => toggleTodo(index)}>{todo.text}</TodoText>
          <Button onClick={() => toggleTodo(index)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </Button>
          <Button delete onClick={() => removeTodo(index)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default TodoList;
