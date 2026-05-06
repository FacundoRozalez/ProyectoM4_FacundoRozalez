import type { Task } from "../types";

export const sendTaskSummary = async (userEmail: string, tasks: Task[]) => {
const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userEmail,
      tasks: tasks
    }),
  });

  if (!response.ok) {
    throw new Error('No se pudo enviar el resumen por email');
  }

  return response.json();
};