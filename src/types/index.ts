export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  userId: string;
  createdAt: number;
  index?: number; // <--- AGREGÁ ESTA LÍNEA AQUÍ
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
}