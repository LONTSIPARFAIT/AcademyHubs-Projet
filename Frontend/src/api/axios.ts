import axios from "axios";

// on creer une instance d'axios pour configurer la baseURL et les headers par défaut
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // URL de base de votre API Laravel
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
})

// ce petit bout  de code va chercher le token dans le navigateur
// et le donne a laravel automatiquement a chaque appel d'api
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") // on cherche le token dans le navigateur
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // on le montre a laravel
    }
    return config // on retourne la config pour que l'appel d'api puisse continuer
})

export default api 