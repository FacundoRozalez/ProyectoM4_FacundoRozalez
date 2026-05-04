import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Task } from '../../types';
import { SortableTaskItem } from './SortableTaskItem';
import { updateTasksOrder } from '../../services/taskService';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string, status: boolean) => void;
  onDelete: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  currentFilter: 'all' | 'pending' | 'completed';
}

export const TaskList = ({ tasks, onToggle, onDelete, setTasks, currentFilter }: TaskListProps) => {
  // Solo habilitamos el sensor de movimiento si el filtro es "all"
  const isAllFilter = currentFilter === 'all';

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Si no es "all", ponemos una restricción de distancia imposible para que no inicie el drag
      activationConstraint: !isAllFilter ? { distance: 9999 } : undefined,
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (isAllFilter && over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);
      
      const newOrder = arrayMove(tasks, oldIndex, newIndex);
      setTasks(newOrder);

      try {
        await updateTasksOrder(newOrder);
      } catch (error) {
        console.error("Error al guardar el nuevo orden:", error);
      }
    }
  };

  if (tasks.length === 0) return <p style={{ textAlign: 'center', marginTop: '20px' }}>No hay tareas.</p>;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tasks.map((task) => (
            <SortableTaskItem 
              key={task.id} 
              task={task} 
              onToggle={onToggle} 
              onDelete={onDelete}
              isDraggable={isAllFilter} // <--- Pasamos esta prop nueva
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};