import React, { useEffect, useMemo, useState } from 'react';
import { addMonths } from 'date-fns';
import './App.css';

import { Task, FilterType, Priority } from './components/Types';
import StatsGrid from './components/StatsGrid';   
import TaskForm from './components/TaskForm';
import CalendarView from './components/CalendarView';
import TaskList from './components/TaskList';
import TaskChart from './components/TaskChart';

const STORAGE_KEY = 'deadline-planner-tasks';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (data: Omit<Task, 'id' | 'completed'>) => {
    setTasks((prev) => [...prev, { ...data, id: Date.now(), completed: false }]);
  };

  const handleToggle = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate((prev) => (prev === dateStr ? '' : dateStr));
  };

  const handleMonthChange = (offset: number) => {
    setCurrentMonth((prev) => addMonths(prev, offset));
  };

  const filteredTasks = useMemo(() => {
    const priorityRank: Record<Priority, number> = { High: 1, Medium: 2, Low: 3 };
    return tasks
      .filter((t) => {
        if (filter === 'pending') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .filter((t) => (selectedDate ? t.deadline === selectedDate : true))
      .sort((a, b) => {
        if (a.deadline !== b.deadline) return a.deadline.localeCompare(b.deadline);
        return priorityRank[a.priority] - priorityRank[b.priority];
      });
  }, [tasks, filter, selectedDate]);

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Deadline Planner</h1>
          <p>Track your tasks, deadlines, priorities, and notes in one place.</p>
        </div>
        <div className="version-badge">v1.1.0</div>
      </header>

      <StatsGrid tasks={tasks} />

      <div className="main-grid">
        <TaskForm onAdd={handleAdd} />
        <CalendarView
          tasks={tasks}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onMonthChange={handleMonthChange}
          onDateSelect={handleDateSelect}
        />
      </div>

      <TaskChart tasks={tasks} />

      <TaskList
        tasks={filteredTasks}
        filter={filter}
        selectedDate={selectedDate}
        onFilterChange={setFilter}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onClearDate={() => setSelectedDate('')}
      />
      <footer className="app-footer">
        <p>Deadline Planner · v1.1.0 · Built with Electron + React</p>
      </footer>
    </div>
  );
};

export default App;