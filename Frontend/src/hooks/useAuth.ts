import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Simuler la vérification de l'authentification
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        // Ici, vous feriez un appel API pour vérifier le token
        // Pour l'instant, on simule un utilisateur connecté
        setAuthState({
          user: { id: 1, name: 'Utilisateur Test', email: 'test@example.com' },
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, _password: string) => {
    // Simuler un appel API de connexion
    setAuthState(prev => ({ ...prev, isLoading: true }));

    // Simulation d'un délai
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simuler une connexion réussie
    const user = { id: 1, name: 'Utilisateur Test', email };
    localStorage.setItem('auth_token', 'fake_token');
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};