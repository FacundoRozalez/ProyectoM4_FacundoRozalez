import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc, 
  doc,
  writeBatch
} from "firebase/firestore";
import { db } from "./firebase";
import type { Task } from "../types";

const tasksCollection = collection(db, "tasks");

const priorityWeights: Record<string, number> = { high: 100, medium: 200, low: 300 };

// CREAR TAREA
export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
  const baseIndex = priorityWeights[task.priority] || 400;
  const newIndex = baseIndex + (Date.now() % 100000);

  return await addDoc(tasksCollection, {
    ...task,
    createdAt: Date.now(),
    completed: false,
    index: newIndex 
  });
};

// LEER TAREAS
export const getTasksByUser = async (userId: string) => {
  // Quitamos el orderBy de aquí para que NO falle por falta de índices
  const q = query(
    tasksCollection, 
    where("userId", "==", userId)
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Task[];
};

// ACTUALIZAR TAREA 
export const updateTask = async (taskId: string, data: Partial<Task>) => {
  const taskRef = doc(db, "tasks", taskId);
  return await updateDoc(taskRef, data);
};

// GUARDAR NUEVO ORDEN
export const updateTasksOrder = async (sortedTasks: Task[]) => {
  const batch = writeBatch(db);
  
  sortedTasks.forEach((task, idx) => {
    const taskRef = doc(db, "tasks", task.id);
    batch.update(taskRef, { index: idx * 10 });
  });

  return await batch.commit();
};

// ELIMINAR TAREA
export const deleteTask = async (taskId: string) => {
  const taskRef = doc(db, "tasks", taskId);
  return await deleteDoc(taskRef);
};