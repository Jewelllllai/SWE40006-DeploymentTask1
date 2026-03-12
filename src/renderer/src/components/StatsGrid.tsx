import React from 'react';
import { Task } from './Types';
import { isPast, isToday, parseISO } from 'date-fns';

interface Props {
  tasks: Task[];
}

interface StatItem {
  label: string;
  value: number;
  highlight?: boolean;
  color: 'blue' | 'yellow' | 'green' | 'pink';
}

const StatsGrid: React.FC<Props> = ({ tasks }) => {
  const stats: StatItem[] = [
    { label: 'Total Tasks', value: tasks.length, color: 'blue' },
    { label: 'Pending', value: tasks.filter((t) => !t.completed).length, color: 'yellow' },
    { label: 'Completed', value: tasks.filter((t) => t.completed).length, color: 'green' },
     { label: 'Overdue', value: tasks.filter((t) => !t.completed && isPast(parseISO(t.deadline)) && !isToday(parseISO(t.deadline))).length, color: 'pink' },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <div key={stat.label} className={`stat-card stat-card--${stat.color}`}>
          <h3>{stat.label}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </section>
  );
};

export default StatsGrid;