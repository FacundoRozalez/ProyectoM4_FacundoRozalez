import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, loginWithGoogle } from '../services/authServices';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { validateAuthInput } from '../utils/validation';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateAuthInput(email, password);
    if (!validation.valid) {
      setError(Object.values(validation.errors)[0] || 'Revisa los datos del formulario.');
      return;
    }

    try {
      await loginUser(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Correo o contraseña incorrectos.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      // Una vez que el popup de Google cierra con éxito, redirigimos
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('No se pudo iniciar sesión con Google.');
    }
  };

  return (
    <AuthLayout title="Iniciar Sesión - MateCode" error={error}>
      <form onSubmit={handleLogin}>
        <AuthInput 
          label="Email" 
          type="email" 
          value={email} 
          placeholder="tu@correo.com" 
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username" 
        />
        <AuthInput 
          label="Contraseña" 
          type="password" 
          value={password} 
          placeholder="Tu contraseña" 
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password" 
        />
        <AuthButton type="submit" color="#28a745">Entrar</AuthButton>
      </form>

      <div style={{ textAlign: 'center', margin: '20px 0', color: '#666', fontSize: '14px' }}>ó</div>
      
      <AuthButton color="#db4437" onClick={handleGoogleLogin}>
        Entrar con Google
      </AuthButton>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        ¿No tienes cuenta? <Link to="/register" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Regístrate aquí</Link>
      </p>
    </AuthLayout>
  );
};