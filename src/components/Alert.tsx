interface AlertProps {
  message: string;
  type: 'error' | 'success';
}

export const Alert = ({ message, type }: AlertProps) => (
  <div style={{
    padding: '10px 15px',
    borderRadius: '6px',
    marginBottom: '15px',
    backgroundColor: type === 'error' ? '#f8d7da' : '#d4edda',
    color: type === 'error' ? '#721c24' : '#155724',
    border: `1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'}`
  }}>
    {message}
  </div>
);