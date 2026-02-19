import { useEffect, useState } from "react";
import api from "../api/axios";

export const useAuth = () => {
   const [user, setUser] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(true);

   // Vérification au chargement
  useEffect(() => {
    // on va chercher le token dans le navigateur
    const fetchUser = async () => {
      // on appele la route /user de laravel pour voir si le token est valide
      // NB: l'intercepteur axios va automatiquement ajouter le token a la requete
      try {
        const response = await api.get("/me");
        setUser(response.data.data); // On descend dans .data.data (Resource Laravel)

      } catch (error) {
         // si le token est perimer ou absent on nettoie tous
        localStorage.removeItem("token");
        setUser(null);

      } finally {
        // 
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // LA FONCTION LOGIN (Celle attendue par ton Context)
  const login = async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });

    // on enreigistre le token pour que axios l'utilise
    localStorage.setItem("token", response.data.access_token);

    // on met a jour l'utilisateur pour que le context reagisse
    setUser(response.data.user);
  };

  const logout = () => {
    api.post("/logout").finally(()=>{
      localStorage.removeItem("token");
      setUser(null);
    });
  }

  const register = async (userData: any) => {
    const response = await api.post("/register", userData);
    localStorage.setItem("token", response.data.access_token);
    setUser(response.data.user);
  };

  return { user, isLoading, isAuthenticated: !!user, login, logout, register}

}