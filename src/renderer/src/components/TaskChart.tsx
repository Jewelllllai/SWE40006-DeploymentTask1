import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Task } from './Types';

interface Props {
  tasks: Task[];
}

const COLORS = {
  High: '#f687b3',
  Medium: '#4ecdc4',
  Low: '#4a6278',
};

const TaskChart: React.FC<Props> = ({ tasks }) => {
  const data = [
    {
      name: 'High',
      Total: tasks.filter((t) => t.priority === 'High').length,
      Done: tasks.filter((t) => t.priority === 'High' && t.completed).length,
    },
    {
      name: 'Medium',
      Total: tasks.filter((t) => t.priority === 'Medium').length,
      Done: tasks.filter((t) => t.priority === 'Medium' && t.completed).length,
    },
    {
      name: 'Low',
      Total: tasks.filter((t) => t.priority === 'Low').length,
      Done: tasks.filter((t) => t.priority === 'Low' && t.completed).length,
    },
  ];

  if (tasks.length === 0) {
    return (
      <section className="panel chart-panel">
        <h2>Priority Overview</h2>
        <div className="empty-state"><p>Add tasks to see your chart.</p></div>
      </section>
    );
  }

  return (
    <section className="panel chart-panel">
      <h2>Priority Overview</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="30%">
          <XAxis
            dataKey="name"
            tick={{ fill: '#8fa8b8', fontSize: 12, fontFamily: 'DM Sans' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#4a6278', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: '#0d1a28',
              border: '1px solid rgba(100,180,180,0.3)',
              borderRadius: 10,
              color: '#f0f4f8',
              fontFamily: 'DM Sans',
              fontSize: 13,
            }}
            labelStyle={{ color: '#a8edea', fontWeight: 600, marginBottom: 4 }}
            itemStyle={{ color: '#f0f4f8' }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="Total" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as keyof typeof COLORS]}
                fillOpacity={0.4}
              />
            ))}
          </Bar>
          <Bar dataKey="Done" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {data.map((entry) => (
              <Cell
                key={entry.name}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="chart-legend">Light bar = Total · Dark bar = Completed</p>
    </section>
  );
};

export default TaskChart;