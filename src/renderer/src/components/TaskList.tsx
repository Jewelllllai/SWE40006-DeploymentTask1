import React from 'react';
import { Task, FilterType } from './Types';
import TaskCard from './TaskCard';

interface Props {
  tasks: Task[];
  filter: FilterType;
  selectedDate: string;
  onFilterChange: (f: FilterType) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onClearDate: () => void;
}

const FILTERS: FilterType[] = ['all', 'pending', 'completed'];

const TaskList: React.FC<Props> = ({
  tasks,
  filter,
  selectedDate,
  onFilterChange,
  onToggle,
  onDelete,
  onClearDate,
}) => {
  return (
    <section className="panel">
      <div className="task-list-header">
        <h2>Task List</h2>
        <div className="filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' pending' : ''}`}
              onClick={() => onFilterChange(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="active-date-filter">
          Filtering by: <strong>{selectedDate}</strong>
          <button className="link-btn" onClick={onClearDate}>✕ Clear</button>
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>{selectedDate ? 'No tasks for this date.' : 'No tasks found. Add one above!'}</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default TaskList;