import { useTaskItem } from '../../hooks/useTaskItem';
import { getTaskItemStyles } from '../../utils/taskStyles';
import { TaskEditForm } from './TaskEditForm';
import { TaskDetailView } from './TaskDetailView';

export const SortableTaskItem = ({ task, onToggle, onDelete, isDraggable }: any) => {
  const { state, actions, dnd } = useTaskItem(task, isDraggable, onDelete);
  const style = getTaskItemStyles(task, state.isDragging, dnd.transform, dnd.transition);

  return (
    <div ref={dnd.setNodeRef} style={style}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '15px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div 
            {...(isDraggable && !state.isEditing ? { ...dnd.attributes, ...dnd.listeners } : {})} 
            style={{ cursor: isDraggable && !state.isEditing ? 'grab' : 'default', marginRight: '12px', color: '#a0aec0' }}
          >
            ⠿
          </div>

          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id, !task.completed)} 
            disabled={!isDraggable} 
            style={{ marginRight: '15px', cursor: isDraggable ? 'pointer' : 'not-allowed' }} 
          />

          <div onClick={() => !state.isEditing && actions.setIsExpanded(!state.isExpanded)} style={{ cursor: 'pointer', flex: 1 }}>
            <h4 style={{ margin: 0, textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#94a3b8' : '#1e293b' }}>
              {task.title}
            </h4>
          </div>
        </div>

        <button onClick={() => actions.setIsExpanded(!state.isExpanded)} style={{ cursor: 'pointer' }}>
          {state.isExpanded ? 'CERRAR ▲' : 'VER ▼'}
        </button>
      </div>

      {state.isExpanded && (
        <div style={{ padding: '0 20px 20px 45px', borderTop: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
          {state.isEditing ? (
            <TaskEditForm 
              values={state.editValues} 
              setValues={actions.setEditValues} 
              onSave={actions.handleSave} 
              onCancel={() => actions.setIsEditing(false)} 
            />
          ) : (
            <TaskDetailView 
              task={task} 
              onEdit={() => actions.setIsEditing(true)} 
              onDelete={actions.handleDelete} 
            />
          )}
        </div>
      )}
    </div>
  );
};