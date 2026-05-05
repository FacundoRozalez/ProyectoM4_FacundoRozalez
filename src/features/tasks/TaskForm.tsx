import React, { useState } from 'react';
import type { Priority } from '../../types';
import { validateTaskInput } from '../../utils/validation';

interface TaskFormProps {
  onAdd: (title: string, description: string, priority: Priority, dueDate: string) => void;
}

export const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTaskInput({ title, dueDate });

    if (!validation.valid) {
      setError(Object.values(validation.errors)[0] || 'Revisa los datos del formulario.');
      return;
    }

    setError('');
    onAdd(title, description, priority, dueDate);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      backgroundColor: '#f9f9f9', 
      padding: '20px', 
      borderRadius: '8px', 
      marginBottom: '20px',
      border: '1px solid #ddd' 
    }}>
      <h3 style={{ marginTop: 0 }}>Nueva Tarea</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <textarea
          placeholder="Descripción (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '60px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '12px' }}>Prioridad:</label>
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as Priority)}
            style={{ width: '100%', padding: '8px' }}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <div style={{ flex: 1 }}>
          <label style={{ fontSize: '12px' }}>Vencimiento:</label>
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {error && (
        <div style={{ color: '#c53030', marginBottom: '12px', fontSize: '14px' }} role="alert">
          {error}
        </div>
      )}

      <button type="submit" style={{ 
        width: '100%', 
        padding: '10px', 
        backgroundColor: '#007bff', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        Agregar Tarea
      </button>
    </form>
  );
};