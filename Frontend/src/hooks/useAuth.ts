import { useEffect, useState } from "react";
import api from "../api/axios";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // on va chercher le token dans le navigateur
    const fetchUser = async () => {
      // on appele la route /user de laravel pour voir si le token est valide
      // NB: l'intercepteur axios va automatiquement ajouter le token a la requete
      try {
        const response = await api.get("/user");
        setUser(response.data); // si le token est valide, on met a jour l'etat user avec les infos de l'utilisateur
      } catch (error) {
        // si le token est perimer ou absent on nettoie tous
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, loading, isAuthenticated: !!user };
}