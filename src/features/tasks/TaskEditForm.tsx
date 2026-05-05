import { useState } from 'react';
import type { Priority } from '../../types';
import { validateTaskInput } from '../../utils/validation';

interface TaskEditFormValues {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  [key: string]: any;
}

interface Props {
  values: TaskEditFormValues;
  setValues: (values: TaskEditFormValues) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const TaskEditForm = ({ values, setValues, onSave, onCancel }: Props) => {
  const [error, setError] = useState('');

  const handleSaveClick = () => {
    const validation = validateTaskInput(values);

    if (!validation.valid) {
      setError(Object.values(validation.errors)[0] || 'Revisa los datos de la tarea.');
      return;
    }

    setError('');
    onSave();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
      <input 
        value={values.title} 
        onChange={e => setValues({...values, title: e.target.value})}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0' }}
      />
    <textarea 
      value={values.description} 
      onChange={e => setValues({...values, description: e.target.value})}
      style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e0', minHeight: '60px' }}
    />
    <div style={{ display: 'flex', gap: '10px' }}>
      <select 
        value={values.priority} 
        onChange={e => setValues({...values, priority: e.target.value as Priority})}
        style={{ flex: 1, padding: '8px' }}
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
      </select>
      <input 
        type="date" 
        value={values.dueDate} 
        onChange={e => setValues({...values, dueDate: e.target.value})}
        style={{ flex: 1, padding: '8px' }}
      />
    </div>
    {error && (
      <div style={{ color: '#c53030', fontSize: '14px', marginTop: '4px' }} role="alert">
        {error}
      </div>
    )}
    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
      <button onClick={handleSaveClick} style={{ flex: 1, padding: '10px', backgroundColor: '#38a169', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Guardar</button>
      <button onClick={onCancel} style={{ flex: 1, padding: '10px', backgroundColor: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
    </div>
  </div>
  );
};