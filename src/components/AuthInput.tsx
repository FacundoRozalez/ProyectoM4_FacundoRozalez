interface AuthInputProps {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string; 
}

export const AuthInput = ({ label, type, value, placeholder, onChange, autoComplete }: AuthInputProps) => (
  <div style={{ marginBottom: '15px' }}>
    <label style={{ fontSize: '14px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>{label}:</label>
    <input 
      type={type} 
      value={value} 
      onChange={onChange} 
      required 
      placeholder={placeholder}
      autoComplete={autoComplete} 
      style={{ width: '100%', padding: '10px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
    />
  </div>
);