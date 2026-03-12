import React from 'react';
import { format, parseISO, isPast, isToday } from 'date-fns';
import { Task } from './Types';

interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  const deadlineDate = parseISO(task.deadline);
  const formattedDeadline = format(deadlineDate, 'MMM d, yyyy');
  const overdue = !task.completed && isPast(deadlineDate) && !isToday(deadlineDate);
  const dueToday = !task.completed && isToday(deadlineDate);

  return (
    <div className={`task-card${task.completed ? ' done' : ''}${overdue ? ' overdue' : ''}`}>
      <div className="task-card-top">
        <div>
          <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </h3>
          <p className={`task-date${overdue ? ' task-date--overdue' : ''}${dueToday ? ' task-date--today' : ''}`}>
            {overdue ? '⚠ Overdue · ' : dueToday ? '📅 Due today · ' : 'Due '}
            {formattedDeadline}
          </p>
        </div>
        <span className={`priority-badge ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      {task.notes && <p className="task-notes">{task.notes}</p>}

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? '↩ Reopen' : '✓ Complete'}
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;