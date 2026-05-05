import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore'; // Importamos onSnapshot
import { db } from '../services/firebase'; // Asegurá que la ruta a tu 'db' sea correcta
import type { Task } from '../types';
import { createTask, updateTask, deleteTask } from '../services/taskService';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si no hay usuario, limpiamos la lista y dejamos de cargar
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // 1. Configuramos la consulta
    const q = query(
      collection(db, "tasks"), 
      where("userId", "==", user.uid)
    );

    // 2. Escuchamos cambios en tiempo real con onSnapshot
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];

      // 3. Ordenamos por el campo index (importante para mantener tu orden manual)
      const sortedData = data.sort((a, b) => (a.index || 0) - (b.index || 0));
      
      setTasks(sortedData);
      setLoading(false);
    }, (err) => {
      console.error("Error en tiempo real:", err);
      setError("Error al conectar con la base de datos");
      setLoading(false);
    });

    // 4. Limpieza: al desmontar el componente se cierra la conexión con Firebase
    return () => unsubscribe();
  }, [user]);

  const addTask = async (title: string, description: string, priority: any, dueDate: string) => {
    if (!user) return;
    try {
      await createTask({
        title,
        description,
        priority,
        dueDate,
        userId: user.uid,
        completed: false,
      });
      // Ya NO necesitás llamar a fetchTasks(), onSnapshot lo detecta solo
    } catch (err) {
      setError('No se pudo crear la tarea');
    }
  };

  const toggleTaskStatus = async (taskId: string, newStatus: boolean) => {
    try {
      await updateTask(taskId, { completed: newStatus });
      // Ya NO necesitás el setTasks manual, Firebase avisa del cambio
    } catch (err) {
      setError('No se pudo actualizar la tarea');
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      // Ya NO necesitás el setTasks manual
    } catch (err) {
      setError('No se pudo eliminar la tarea');
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    error,
    addTask,
    toggleTaskStatus,
    removeTask,
  };
};