import React from 'react';
import styled from 'styled-components';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// React Query의 QueryClient 생성
const queryClient = new QueryClient();

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

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <Title>Todo List</Title>
        <TodoInput />
        <TodoList />
      </AppContainer>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}