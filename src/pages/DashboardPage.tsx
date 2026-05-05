import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';

import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { DashboardLayout } from '../components/DashboardLayout';

import { TaskForm } from '../features/tasks/TaskForm';
import { TaskList } from '../features/tasks/TaskList';
import { TaskFilters } from '../features/tasks/TaskFilters';
import { TaskEmailSummary } from '../features/tasks/TaskEmailSummary';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { tasks, setTasks, loading, addTask, toggleTaskStatus, removeTask } = useTasks();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <DashboardLayout>
      <Card title="Añadir Nueva Tarea">
        <TaskForm onAdd={addTask} />
      </Card>

      <Card>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <h2 style={{ margin: 0, color: '#1a202c' }}>Mis Tareas</h2>
          <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <TaskList 
            tasks={filteredTasks} 
            onToggle={toggleTaskStatus} 
            onDelete={removeTask}
            setTasks={setTasks} 
            currentFilter={filter} 
          />
        )}
      </Card>

      {/* Acción modulizada */}
      <TaskEmailSummary email={user?.email} tasks={tasks} />
    </DashboardLayout>
  );
};