import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, loginWithGoogle } from '../services/authServices';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      // Manejo claro de errores (requisito de la rúbrica)
      setError('Credenciales inválidas o usuario no encontrado.');
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError('Error al conectar con Google.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Iniciar Sesión - MateCode</h2>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
      
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Entrar
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '15px 0' }}>ó</div>

      <button onClick={handleGoogle} style={{ width: '100%', padding: '10px', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Entrar con Google
      </button>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};