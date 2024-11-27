import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 서버에서 Todo 목록을 가져오는 함수
const fetchTodos = async () => {
  const response = await fetch('/api/todos');  // 실제 API URL로 대체
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Todo 항목을 업데이트하는 함수
const updateTodo = async (id) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to update todo');
  }
  return response.json();
};

// Todo 항목을 삭제하는 함수
const deleteTodo = async (id) => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }
  return id;
};

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

function TodoList() {
  const queryClient = useQueryClient();

  // useQuery를 사용하여 서버에서 Todo 목록을 가져옵니다.
  
  /*
    v5 migration : useQuery, useMutation의 인자 형식(query 관련 함수 : 객체 형식만 허용)
    ['todos'] 대신 객체 형식 사용
  */

  // useQuery v5 migration
  // const { data: todos, isLoading, error } = useQuery(['todos'], fetchTodos);
  const { data: todos, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })

  // useMutation migration
  // const mutationUpdate = useMutation(updateTodo, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['todos']);  // Todo 업데이트 후 캐시된 데이터를 새로 고침
  //   },
  // });
  // const mutationDelete = useMutation(deleteTodo, {
  //   onSuccess: (id) => {
  //     queryClient.invalidateQueries(['todos']);  // Todo 삭제 후 캐시된 데이터를 새로 고침
  //   },
  // });
  const mutationUpdate = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);   // Todo 업데이트 후 캐시된 데이터를 새로고침
    },
  })
  const mutationDelete = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);   // Todo 삭제 후 캐시된 데이터를 새로고침
    }
  })

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ListContainer>
      {todos.map((todo) => (
        <ListItem key={todo.id} completed={todo.completed}>
          <TodoText onClick={() => mutationUpdate.mutate(todo.id)}>
            {todo.text}
          </TodoText>
          <Button onClick={() => mutationUpdate.mutate(todo.id)}>
            {todo.completed ? 'Success' : 'check'}
          </Button>
          <Button delete onClick={() => mutationDelete.mutate(todo.id)}>
            Delete
          </Button>
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default TodoList;
