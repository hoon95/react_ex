import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 서버에 Todo를 추가하는 함수
const addTodo = async (newTodo) => {
  const response = await fetch('http://localhost:3001/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: newTodo, completed: false }),
  });
  if (!response.ok) {
    throw new Error('Failed to add todo');
  }
  return response.json();
};

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function TodoInput() {
  const [input, setInput] = useState('');
  const queryClient = useQueryClient();
  // const mutation = useMutation(addTodo, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['todos']);  // Todo 추가 후 캐시된 데이터를 새로 고침
  //   },
  // });
  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      mutation.mutate(input);
      setInput('');
    }
  };

  return (
    <InputContainer>
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo"
      />
      <Button onClick={handleSubmit}>Add</Button>
    </InputContainer>
  );
}

export default TodoInput;