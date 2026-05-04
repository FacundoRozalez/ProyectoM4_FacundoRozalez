import { createContext, useContext, useEffect, useState,type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../services/firebase';

// 1. Definimos qué información va a compartir el contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Creamos el Proveedor que envolverá a la App
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged escucha los cambios de Firebase (login, logout, persistencia)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Limpiamos el listener al desmontar
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {/* Si está cargando, podemos mostrar un splash o nada para evitar parpadeos */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para usar la auth fácilmente en cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};