import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO,
} from 'date-fns';
import { Task } from './Types';

interface Props {
  tasks: Task[];
  currentMonth: Date;
  selectedDate: string;
  onMonthChange: (offset: number) => void;
  onDateSelect: (dateStr: string) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarView: React.FC<Props> = ({
  tasks,
  currentMonth,
  selectedDate,
  onMonthChange,
  onDateSelect,
}) => {
  // Build a full 6-week grid using date-fns
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const allDays = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const getTasksForDay = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    return tasks.filter((t) => t.deadline === key);
  };

  return (
    <section className="panel">
      <div className="calendar-header">
        <h2>Calendar View</h2>
        <div className="calendar-controls">
          <button onClick={() => onMonthChange(-1)}>‹</button>
          <span>{format(currentMonth, 'MMMM yyyy')}</span>
          <button onClick={() => onMonthChange(1)}>›</button>
        </div>
      </div>

      <div className="weekday-row">
        {WEEKDAYS.map((d) => <span key={d}>{d}</span>)}
      </div>

      <div className="calendar-grid">
        {allDays.map((day) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const inMonth = isSameMonth(day, currentMonth);
          const dayTasks = getTasksForDay(day);
          const today = isToday(day);
          const selected = dayStr === selectedDate;

          return (
            <button
              key={dayStr}
              className={[
                'calendar-cell',
                !inMonth ? 'out-of-month' : '',
                today ? 'today' : '',
                selected ? 'selected' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => onDateSelect(dayStr)}
              disabled={!inMonth}
            >
              <span className="day-number">{format(day, 'd')}</span>
              {dayTasks.length > 0 && (
                <span className="task-count">{dayTasks.length}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="calendar-note">
        {selectedDate ? (
          <p>
            Showing: <strong>{format(parseISO(selectedDate), 'MMMM d, yyyy')}</strong>
            <button className="link-btn" onClick={() => onDateSelect(selectedDate)}>✕ Clear</button>
          </p>
        ) : (
          <p>Click any date to filter tasks.</p>
        )}
      </div>
    </section>
  );
};

export default CalendarView;