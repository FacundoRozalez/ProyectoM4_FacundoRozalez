import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../types';
import { updateTask } from '../../services/taskService';

interface Props {
  task: Task;
  onToggle: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  isDraggable: boolean;
}

// 1. DICCIONARIO DE TRADUCCIÓN Y COLORES
const priorityConfig: Record<string, { label: string; color: string }> = {
  high: { label: 'Alta', color: '#e53e3e' },
  medium: { label: 'Media', color: '#dd6b20' },
  low: { label: 'Baja', color: '#38a169' }
};

export const SortableTaskItem = ({ task, onToggle, onDelete, isDraggable }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate
  });

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: task.id,
    disabled: !isDraggable || isEditing 
  });

  const handleSave = async () => {
    if (!window.confirm("¿Guardar los cambios?")) return;
    try {
      await updateTask(task.id, editValues);
      setIsEditing(false);
    } catch (error) {
      alert("Error al actualizar");
    }
  };

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la tarea "${task.title}"?`)) {
      onDelete(task.id);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: 'white',
    borderRadius: '12px',
    // 2. BORDE LATERAL SEGÚN PRIORIDAD
    borderLeft: `6px solid ${priorityConfig[task.priority]?.color || '#e2e8f0'}`,
    borderTop: '1px solid #e2e8f0',
    borderRight: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '12px',
    boxShadow: isDragging ? '0 10px 20px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden'
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '15px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div 
            {...(isDraggable && !isEditing ? { ...attributes, ...listeners } : {})} 
            style={{ cursor: isDraggable && !isEditing ? 'grab' : 'default', marginRight: '15px', color: '#cbd5e0' }}
          >
            ⠿
          </div>
          
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id, task.completed)}
            style={{ width: '18px', height: '18px', marginRight: '15px', cursor: 'pointer' }}
          />
          
          <div 
            onClick={() => !isEditing && setIsExpanded(!isExpanded)} 
            style={{ cursor: 'pointer', flex: 1 }}
          >
            <h4 style={{ 
              margin: 0, 
              fontSize: '16px',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#a0aec0' : '#2d3748'
            }}>
              {task.title}
            </h4>
          </div>
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          style={{ 
            background: '#f7fafc', 
            border: '1px solid #edf2f7', 
            borderRadius: '6px',
            padding: '5px 10px',
            cursor: 'pointer', 
            fontSize: '14px',
            marginLeft: '10px'
          }}
        >
          {isExpanded ? '▲ Cerrar' : '▼ Ver más'}
        </button>
      </div>

      {isExpanded && (
        <div style={{ padding: '0 20px 20px 50px', borderTop: '1px solid #edf2f7', backgroundColor: '#f8fafc' }}>
          {isEditing ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <input 
                value={editValues.title} 
                onChange={e => setEditValues({...editValues, title: e.target.value})}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
              />
              <textarea 
                value={editValues.description} 
                onChange={e => setEditValues({...editValues, description: e.target.value})}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0', minHeight: '60px' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <select 
                  value={editValues.priority} 
                  onChange={e => setEditValues({...editValues, priority: e.target.value as any})}
                  style={{ flex: 1, padding: '8px' }}
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
                <input 
                  type="date" 
                  value={editValues.dueDate} 
                  onChange={e => setEditValues({...editValues, dueDate: e.target.value})}
                  style={{ flex: 1, padding: '8px' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={handleSave} style={{ flex: 1, padding: '10px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Guardar</button>
                <button onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '10px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '15px' }}>
              <p style={{ margin: '0 0 15px 0', color: '#4a5568', fontSize: '14px', lineHeight: '1.5' }}>
                {task.description || <i style={{color: '#a0aec0'}}>Sin descripción</i>}
              </p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#718096', marginBottom: '20px' }}>
                {/* 3. PRIORIDAD EN ESPAÑOL USANDO EL DICCIONARIO */}
                <span>🔥 Prioridad: <b style={{color: priorityConfig[task.priority]?.color || '#2d3748'}}>
                  {priorityConfig[task.priority]?.label || task.priority}
                </b></span>
                <span>📅 Vence: <b style={{color: '#2d3748'}}>{task.dueDate}</b></span>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setIsEditing(true)} 
                  style={{ padding: '8px 16px', backgroundColor: '#ebf8ff', color: '#3182ce', border: '1px solid #bee3f8', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                >
                  ✏️ Editar
                </button>
                <button 
                  onClick={handleDelete} 
                  style={{ padding: '8px 16px', backgroundColor: '#fff5f5', color: '#e53e3e', border: '1px solid #fed7d7', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};