import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './hooks/useAuth.tsx' // Importamos el proveedor
import './index.css' // Asegúrate de tener este archivo creado, aunque sea vacío

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)