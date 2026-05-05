import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { updateTask } from '../services/taskService';
import { validateTaskInput } from '../utils/validation';

export const useTaskItem = (task: any, isDraggable: boolean, onDelete: Function) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ ...task });

  useEffect(() => {
    setEditValues({ ...task });
  }, [task]);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id: task.id,
    disabled: !isDraggable || isEditing 
  });

  const handleSave = async () => {
    const validation = validateTaskInput(editValues);
    if (!validation.valid) {
      alert(Object.values(validation.errors)[0] || 'Revisa los datos de la tarea.');
      return;
    }

    if (!window.confirm("¿Guardar los cambios?")) return;
    try {
      await updateTask(task.id, editValues);
      setIsEditing(false);
    } catch (error) { 
      console.error(error);
      alert("Error al actualizar"); 
    }
  };

  const handleDelete = () => {
    if (!window.confirm(`¿Estás seguro de que querés eliminar: "${task.title}"?`)) return;
    onDelete(task.id);
  };

  return {
    state: { isExpanded, isEditing, editValues, isDragging },
    actions: { setIsExpanded, setIsEditing, setEditValues, handleSave, handleDelete },
    dnd: { attributes, listeners, setNodeRef, transform, transition }
  };
};