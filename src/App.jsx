import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import './styles.css'

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
};


const Todo = ({ todo, toggleTodo, removeTodo }) => (
  <div className="flex items-center justify-between mb-2">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => toggleTodo(todo.id)}
      className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
    />
    <span
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      className={todo.completed ? "line-through text-gray-500" : ""}
    >
      {todo.text}
    </span>
    <button
      onClick={() => removeTodo(todo.id)}
      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Delete
    </button>
  </div>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  removeTodo: PropTypes.func.isRequired
};


const TodoList = ({ todos, dispatch }) => (
  <div>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        toggleTodo={id => dispatch({ type: 'TOGGLE_TODO', id })}
        removeTodo={id => dispatch({ type: 'REMOVE_TODO', id })}
      />
    ))}
  </div>
);


TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
};


const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = text => {
    dispatch({ type: 'ADD_TODO', text });
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <input
        type="text"
        placeholder="Add todo"
        onKeyDown={e => e.key === 'Enter' && addTodo(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-indigo-500"
      />
      <TodoList todos={todos} dispatch={dispatch} />
    </div>
  );
};

export default App;
