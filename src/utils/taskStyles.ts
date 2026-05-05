import { CSS } from '@dnd-kit/utilities';
import { priorityConfig } from '../features/tasks/task.constants';

export const getTaskItemStyles = (task: any, isDragging: boolean, transform: any, transition: any) => ({
  transform: CSS.Transform.toString(transform),
  transition,
  backgroundColor: 'white',
  borderRadius: '12px',
  borderLeft: `6px solid ${task.completed ? '#cbd5e0' : (priorityConfig[task.priority]?.color || '#e2e8f0')}`,
  borderTop: '1px solid #e2e8f0',
  borderRight: '1px solid #e2e8f0',
  borderBottom: '1px solid #e2e8f0',
  marginBottom: '12px',
  boxShadow: isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 4px rgba(0,0,0,0.02)',
  position: 'relative' as const,
  zIndex: isDragging ? 10 : 1,
  opacity: task.completed ? 0.7 : 1,
});