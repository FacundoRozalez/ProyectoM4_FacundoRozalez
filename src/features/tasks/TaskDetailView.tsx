import type { Task } from '../../types';
import { priorityConfig } from './task.constants';

interface Props {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskDetailView = ({ task, onEdit, onDelete }: Props) => (
  <div style={{ 
    marginTop: '15px',
    // EL FONDO CAMBIA AQUÍ: Verde muy suave si está lista, Gris azulado si no.
     backgroundColor: task.completed ? '#f0fdf4' : '#fff7ed', 
    padding: '20px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    // Borde: Verde esmeralda si está lista, Naranja vibrante si está pendiente
    border: `1px solid ${task.completed ? '#bbf7d0' : '#fdba74'}`,
    // Opcional: una sombra muy sutil que combine
    boxShadow: `0 2px 8px ${task.completed ? 'rgba(34, 197, 94, 0.05)' : 'rgba(249, 115, 22, 0.05)'}`
  }}>
    <p style={{ margin: '0 0 15px 0', color: '#4a5568', fontSize: '14px', lineHeight: '1.5' }}>
      {task.description || <i style={{color: '#a0aec0'}}>Sin descripción</i>}
    </p>

    <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#718096', marginBottom: '20px', flexWrap: 'wrap' }}>
      
      {/* INDICADOR DE ESTADO */}
      <span>
        📌 Estado: 
        <b style={{ 
          marginLeft: '5px',
          color: task.completed ? '#2f855a' : '#c53030', 
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {task.completed ? '✅ Completada' : '⏳ Pendiente'}
        </b>
      </span>

      <span>🔥 Prioridad: <b style={{color: priorityConfig[task.priority]?.color}}>
        {priorityConfig[task.priority]?.label}
      </b></span>
      
      <span>📅 Vence: <b style={{color: '#2d3748'}}>{task.dueDate}</b></span>
    </div>

    <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '15px' }}>
      <button 
        onClick={onEdit} 
        style={{ padding: '8px 16px', backgroundColor: 'white', color: '#3182ce', border: '1px solid #bee3f8', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
      >
        ✏️ Editar
      </button>
      <button 
        onClick={onDelete} 
        style={{ padding: '8px 16px', backgroundColor: 'white', color: '#e53e3e', border: '1px solid #fed7d7', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '13px' }}
      >
        🗑️ Eliminar
      </button>
    </div>
  </div>
);