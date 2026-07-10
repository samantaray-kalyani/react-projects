import React from 'react';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="checkbox"
      />
      <span className="todo-text">{todo.text}</span>
      <small className="todo-date">{todo.createdAt}</small>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;