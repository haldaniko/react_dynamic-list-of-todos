/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';
import { Todo } from './types/Todo';
import { User } from './types/User';

export enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const [filterStatus, setFilterStatus] = useState<TodoStatus>(TodoStatus.All);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
    setLoadingModal(true);

    getUser(todo.userId)
      .then(user => setSelectedUser(user))
      .finally(() => setLoadingModal(false));
  };

  const filteredTodos = todos.filter(todo => {
    if (filterStatus === 'completed' && !todo.completed) {
      return false;
    }

    if (filterStatus === 'active' && todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                query={query}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {loading ? (
                <Loader />
              ) : (
                <TodoList
                  selectedTodo={selectedTodo}
                  todos={filteredTodos}
                  onSelect={handleSelectTodo}
                />
              )}
            </div>
          </div>
        </div>

        <TodoModal
          todo={selectedTodo}
          user={selectedUser}
          loading={loadingModal}
          onClose={() => {
            setSelectedTodo(null);
            setSelectedUser(null);
          }}
        />
      </div>
    </>
  );
};
