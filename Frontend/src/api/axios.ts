import axios from "axios";

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
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api