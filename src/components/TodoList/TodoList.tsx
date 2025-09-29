import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  selectedTodo: Todo | null;
  todos: Todo[];
  onSelect: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  selectedTodo,
  todos,
  onSelect,
}) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo" className="">
          <td className="is-vcentered">{todo.id}</td>

          <td className="is-vcentered">
            {todo.completed && (
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check"></i>
              </span>
            )}
          </td>

          <td className="is-vcentered is-expanded">
            <p
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className={`button ${selectedTodo?.id === todo.id ? 'is-danger' : ''}`}
              type="button"
              onClick={() => selectedTodo?.id !== todo.id && onSelect(todo)}
            >
              <span className="icon">
                <i
                  className={
                    selectedTodo?.id === todo.id
                      ? 'fas fa-eye-slash'
                      : 'far fa-eye'
                  }
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
