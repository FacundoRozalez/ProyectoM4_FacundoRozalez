import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useTasks } from '../hooks/useTasks';
import { sendTaskSummary } from '../services/emailService';

import { Navbar } from '../components/Navbar';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Button } from '../components/Button';

import { TaskForm } from '../features/tasks/TaskForm';
import { TaskList } from '../features/tasks/TaskList';
import { TaskFilters } from '../features/tasks/TaskFilters';

export const DashboardPage = () => {
  const { user } = useAuth();
  // 'tasks' ya viene ordenado por 'index' desde el hook useTasks -> taskService
  const { tasks, setTasks, loading, addTask, toggleTaskStatus, removeTask } = useTasks();
  
  console.log("DEBUG DASHBOARD:", {
    userUID: user?.uid,
    estaCargando: loading,
    totalTareas: tasks.length,
    tareas: tasks
  });

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sendingEmail, setSendingEmail] = useState(false);

  
  // Lógica de Filtrado: mantiene el orden de los índices de Firebase
  const filteredTasks = tasks
  .filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  })


  const handleSendEmail = async () => {
    if (!user?.email || tasks.length === 0) {
      alert("No hay tareas para enviar en el resumen.");
      return;
    }
    try {
      setSendingEmail(true);
      await sendTaskSummary(user.email, tasks);
      alert("✅ ¡Resumen enviado con éxito!");
    } catch (error) {
      alert("❌ Error al enviar el email.");
    } finally {
      setSendingEmail(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ padding: '20px', maxWidth: '850px', margin: '0 auto' }}>
        
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
              // Pasamos el filtro actual por si querés deshabilitar DND en filtros específicos
              currentFilter={filter} 
            />
          )}
        </Card>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', paddingBottom: '40px' }}>
          <Button 
            onClick={handleSendEmail} 
            variant="secondary"
            disabled={sendingEmail || tasks.length === 0}
          >
            {sendingEmail ? 'Enviando...' : '📧 Enviar Resumen por Email'}
          </Button>
        </div>
      </main>
    </div>
  );
};