import React, { useState } from 'react';
import { format } from 'date-fns';
import { Priority, Task } from './Types';

interface Props {
  onAdd: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Task title is required.'); return; }
    if (!deadline) { setError('Please pick a deadline.'); return; }
    setError('');
    onAdd({ title: title.trim(), deadline, priority, notes: notes.trim() });
    setTitle('');
    setDeadline('');
    setPriority('Medium');
    setNotes('');
  };

  // Show a friendly "today's date" hint using date-fns
  const todayFormatted = format(new Date(), 'MMMM d, yyyy');

  return (
    <section className="panel">
      <h2>Add New Task</h2>
      <p className="form-hint">Today is {todayFormatted}</p>
      {error && <p className="form-error">{error}</p>}
      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          Task Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </label>

        <label>
          Deadline
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>

        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Notes
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes or context..."
          />
        </label>

        <button type="submit" className="primary-btn">+ Add Task</button>
      </form>
    </section>
  );
};

export default TaskForm;