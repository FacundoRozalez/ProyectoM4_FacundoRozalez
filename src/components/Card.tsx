interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export const Card = ({ children, title }: CardProps) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    border: '1px solid #f7ededff',
    marginBottom: '20px'
  }}>
    {title && <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#2d3748' }}>{title}</h3>}
    {children}
  </div>
);