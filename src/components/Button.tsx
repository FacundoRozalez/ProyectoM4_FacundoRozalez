import React from 'react';

// Definimos las variantes para cumplir con buenos estándares de UI
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary' | 'success';
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  style, 
  disabled, 
  ...props 
}: ButtonProps) => {
  
  // Mapeo de colores según la variante
  const getBackgroundColor = () => {
    if (disabled || isLoading) return '#ffffffff'; // Gris si está deshabilitado
    switch (variant) {
      case 'danger': return '#e53e3e';
      case 'secondary': return '#4a5568';
      case 'success': return '#38a169';
      default: return '#3182ce'; // Primary blue
    }
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    backgroundColor: getBackgroundColor(),
    border: 'none',
    borderRadius: '6px',
    cursor: (disabled || isLoading) ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: props.className?.includes('w-full') ? '100%' : 'auto', // Soporte para ancho completo
    ...style
  };

  return (
    <button 
      style={buttonStyle} 
      disabled={disabled || isLoading} 
      {...props}
    >
      {isLoading ? 'Cargando...' : children}
    </button>
  );
};