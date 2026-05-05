interface AuthButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const AuthButton = ({ children, onClick, color, type = "button", disabled }: AuthButtonProps) => (
  <button 
    type={type} 
    onClick={onClick}
    disabled={disabled}
    style={{ 
      width: '100%', padding: '12px', backgroundColor: color, 
      color: 'white', border: 'none', borderRadius: '4px', 
      cursor: 'pointer', fontWeight: 'bold', fontSize: '16px',
      marginTop: '10px'
    }}
  >
    {children}
  </button>
);