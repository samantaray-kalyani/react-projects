import React from 'react';

function Filters({ activeFilter, onFilterChange, totalTodos, completedTodos }) {
  const activeTodos = totalTodos - completedTodos;

  return (
    <div className="filters">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All ({totalTodos})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active ({activeTodos})
        </button>
        <button
          className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed ({completedTodos})
        </button>
      </div>
    </div>
  );
}

export default Filters;