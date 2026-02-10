import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
    const { user , loading, isAuthenticated} = useAuth();

    // on utilise useNavigate pour rediriger l'utilisateur vers la page de login s'il n'est pas authentifié
    const navigate = useNavigate();

    // le chargement de la page
    if (loading) return <div>Loading...</div>;

    // Securite: si pas connecter retour au login
    if (!isAuthenticated) {
        navigate("/login");
        return null; // on retourne null pour ne rien afficher pendant la redirection
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Bienvenue, {user.name} ! </h1>
            <p className="">Tu es connecter avec l'email : {user.email} </p>

            {/* Button de deconnexion */}
            <button
              onClick = {() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >Se Deconnecter</button>
        </div>
    )
}

export default DashboardPage;