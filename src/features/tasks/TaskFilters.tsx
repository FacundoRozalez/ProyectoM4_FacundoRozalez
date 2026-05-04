interface TaskFiltersProps {
  // Mejoramos el tipado de currentFilter para que coincida con onFilterChange
  currentFilter: 'all' | 'pending' | 'completed'; 
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}

export const TaskFilters = ({ currentFilter, onFilterChange }: TaskFiltersProps) => {
  // Tipamos el argumento del estilo para mayor seguridad
  const buttonStyle = (filter: 'all' | 'pending' | 'completed') => ({
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid #007bff',
    backgroundColor: currentFilter === filter ? '#007bff' : 'transparent',
    color: currentFilter === filter ? 'white' : '#007bff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s'
  });

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
      <button onClick={() => onFilterChange('all')} style={buttonStyle('all')}>Todas</button>
      <button onClick={() => onFilterChange('pending')} style={buttonStyle('pending')}>Pendientes</button>
      <button onClick={() => onFilterChange('completed')} style={buttonStyle('completed')}>Completadas</button>
    </div>
  );
};