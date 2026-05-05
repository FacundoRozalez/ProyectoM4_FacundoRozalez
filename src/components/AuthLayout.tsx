interface AuthLayoutProps {
  title: string;
  error?: string;
  children: React.ReactNode;
}

export const AuthLayout = ({ title, error, children }: AuthLayoutProps) => (
  <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
    <h2 style={{ textAlign: 'center', margin: '0 0 20px 0', color: '#333' }}>{title}</h2>
    
    {error && (
      <p style={{ color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', padding: '10px', borderRadius: '4px', fontSize: '13px', textAlign: 'center', marginBottom: '15px' }}>
        {error}
      </p>
    )}
    {children}
  </div>
);