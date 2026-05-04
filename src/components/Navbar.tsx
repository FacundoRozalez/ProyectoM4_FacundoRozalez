import { useAuth } from '../hooks/useAuth';
import { logoutUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 30px',
      backgroundColor: '#2c3e50',
      color: 'white',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>🧉 MateCode</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontSize: '14px', opacity: 0.9 }}>
          Hola, <strong>{user?.email?.split('@')[0]}</strong>
        </span>
        <button 
          onClick={handleLogout}
          style={{
            padding: '6px 12px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600'
          }}
        >
          Salir
        </button>
      </div>
    </nav>
  );
};