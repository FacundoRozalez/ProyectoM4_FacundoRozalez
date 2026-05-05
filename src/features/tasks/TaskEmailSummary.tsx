import { useState } from 'react';
import { Button } from '../../components/Button';
import { sendTaskSummary } from '../../services/emailService';

interface Props {
  email?: string | null;
  tasks: any[]; // Idealmente usar tu interfaz Task
}

export const TaskEmailSummary = ({ email, tasks }: Props) => {
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!email || tasks.length === 0) {
      alert("No hay tareas para enviar.");
      return;
    }
    try {
      setSending(true);
      await sendTaskSummary(email, tasks);
      alert("✅ ¡Resumen enviado!");
    } catch {
      alert("❌ Error al enviar.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', paddingBottom: '40px' }}>
      <Button onClick={handleSend} variant="secondary" disabled={sending || tasks.length === 0}>
        {sending ? 'Enviando...' : '📧 Enviar Resumen por Email'}
      </Button>
    </div>
  );
};