import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, loginWithGoogle } from '../services/authServices';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { validateAuthInput } from '../utils/validation';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateAuthInput(email, password);
    if (!validation.valid) {
      setError(Object.values(validation.errors)[0] || 'Revisa los datos del formulario.');
      return;
    }

    try {
      await registerUser(email, password);
      navigate('/dashboard'); 
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') setError('Este correo ya está registrado.');
      else setError('Error al registrarse. Inténtalo de nuevo.');
    }
  };

  const handleGoogleRegister = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard'); // Redirige tras éxito con Google
    } catch (err: any) {
      console.error(err);
      setError('No se pudo registrar con Google.');
    }
  };

  return (
    <AuthLayout title="Crear Cuenta en MateCode" error={error}>
      <form onSubmit={handleRegister}>
        <AuthInput 
          label="Email" 
          type="email" 
          value={email} 
          placeholder="ejemplo@correo.com" 
          onChange={(e) => setEmail(e.target.value)} 
          autoComplete="email"
        />
        <AuthInput 
          label="Contraseña" 
          type="password" 
          value={password} 
          placeholder="Mínimo 6 caracteres" 
          onChange={(e) => setPassword(e.target.value)} 
          autoComplete="new-password" 
        />
        <AuthButton type="submit" color="#007bff">Registrarse</AuthButton>
      </form>

      <div style={{ textAlign: 'center', margin: '20px 0', color: '#666', fontSize: '14px' }}>ó</div>
      
      <AuthButton color="#db4437" onClick={handleGoogleRegister}>
        Registrarse con Google
      </AuthButton>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
        ¿Ya tienes cuenta? <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Inicia sesión</Link>
      </p>
    </AuthLayout>
  );
};