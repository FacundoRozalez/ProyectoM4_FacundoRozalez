import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, loginWithGoogle } from '../services/authServices';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(email, password);
      navigate('/dashboard'); // Redirige al entrar con éxito
    } catch (err: any) {
      setError('Error al registrarse: ' + err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err: any) {
      setError('Error con Google: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Crear Cuenta en MateCode</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Registrarse
        </button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      <button onClick={handleGoogle} style={{ width: '100%', padding: '10px', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Registrarse con Google
      </button>

      <p style={{ marginTop: '15px', textAlign: 'center' }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};