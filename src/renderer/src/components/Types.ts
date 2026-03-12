export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  title: string;
  deadline: string; // ISO date string yyyy-MM-dd
  priority: Priority;
  notes: string;
  completed: boolean;
}

export type FilterType = 'all' | 'pending' | 'completed';