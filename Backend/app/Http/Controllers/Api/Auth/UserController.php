    <?php

    namespace App\Http\Controllers\Api\Auth;

    // Importation des classes nécessaires
    use App\Http\Controllers\Controller;    
    use App\Http\Resources\UserResource;
    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Validation\Rules\Password;     // Règles de validation avancées pour les mots de passe

    class UserController extends Controller
    {
        /**
         * AFFICHER TOUS LES UTILISATEURS
         * Route: GET /api/users
         * Accessible uniquement aux administrateurs
         */
        public function index()
        {
            // ÉTAPE 1: Vérification des permissions
            // auth()->user() récupère l'utilisateur actuellement connecté
            // On vérifie si son rôle n'est ni 'admin' ni 'super_admin'
            if (auth()->user()->role !== 'admin' && auth()->user()->role !== 'super_admin') {
                // Si pas autorisé, on retourne une erreur 403 (Forbidden)
                return response()->json([
                    'message' => 'Accès non autorisé. Seuls les administrateurs peuvent voir la liste des utilisateurs.'
                ], 403);
            }

            // ÉTAPE 2: Récupération des utilisateurs
            // User::all() aurait récupéré tous les utilisateurs mais sans ordre précis
            // orderBy('created_at', 'desc') les trie du plus récent au plus ancien
            $users = User::orderBy('created_at', 'desc')->get();
            
            // ÉTAPE 3: Formatage et retour de la réponse
            // UserResource::collection() formate CHAQUE utilisateur selon les règles définies dans UserResource
            // Cela garantit que seules les informations nécessaires sont envoyées (pas de mot de passe, etc.)
            return UserResource::collection($users);
        }

        /**
         * METTRE À JOUR LE PROFIL DE L'UTILISATEUR CONNECTÉ
         * Route: PUT /api/user/profile
         * L'utilisateur peut modifier son propre nom et email
         */
        public function updateProfile(Request $request)
        {
            // ÉTAPE 1: Récupération de l'utilisateur connecté
            // $request->user() est équivalent à auth()->user() - récupère l'utilisateur authentifié
            $user = $request->user();

            // ÉTAPE 2: Validation des données envoyées
            $request->validate([
                // 'name' doit être présent, être une chaîne, entre 3 et 255 caractères
                'name' => 'required|string|min:3|max:255',
                
                // 'email' doit être présent, format email, maximum 255 caractères
                // 'unique:users,email,' . $user->id signifie:
                // - La table 'users' ne doit pas déjà avoir cet email
                // - Mais on ignore l'utilisateur actuel (le sien) dans la vérification
                // - Cela permet de garder son propre email sans erreur
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            ]);

            // ÉTAPE 3: Mise à jour en base de données
            // update() modifie les champs spécifiés pour cet utilisateur
            $user->update([
                'name' => $request->name,      // Nouveau nom
                'email' => $request->email,     // Nouvel email
            ]);

            // ÉTAPE 4: Retour de la réponse
            return response()->json([
                'message' => 'Profil mis à jour avec succès',  // Message de confirmation
                'user' => new UserResource($user)              // Données de l'utilisateur mis à jour (formatées)
            ]);
        }

        /**
         * METTRE À JOUR LE MOT DE PASSE
         * Route: PUT /api/user/password
         * L'utilisateur peut modifier son propre mot de passe
         */
        public function updatePassword(Request $request)
        {
            // ÉTAPE 1: Validation des données
            $request->validate([
                // Vérifie que le mot de passe actuel fourni correspond à celui en base de données
                // 'current_password' est une règle personnalisée de Laravel qui utilise Hash::check()
                'current_password' => 'required|current_password',
                
                // Règles pour le nouveau mot de passe:
                // - 'required' : champ obligatoire
                // - 'confirmed' : doit avoir un champ 'password_confirmation' identique
                // - Password::defaults() : applique les règles de sécurité par défaut (min:8, etc.)
                'password' => ['required', 'confirmed', Password::defaults()],
            ]);

            // ÉTAPE 2: Mise à jour du mot de passe
            // On hashe le nouveau mot de passe avant de le stocker (Hash::make)
            $request->user()->update([
                'password' => Hash::make($request->password),
            ]);

            // ÉTAPE 3: Retour de la confirmation
            // On ne retourne pas l'utilisateur car le mot de passe n'est pas nécessaire
            return response()->json([
                'message' => 'Mot de passe mis à jour avec succès'
            ]);
        }

        /**
         * SUPPRIMER UN UTILISATEUR
         * Route: DELETE /api/users/{user}
         * Accessible uniquement aux super administrateurs
         * {user} est l'ID de l'utilisateur à supprimer (injection de modèle automatique)
         */
        public function destroy(User $user)
        {
            // ÉTAPE 1: Vérification des permissions
            // Seul un super_admin peut supprimer des comptes
            if (auth()->user()->role !== 'super_admin') {
                return response()->json([
                    'message' => 'Action non autorisée. Seuls les super administrateurs peuvent supprimer des comptes.'
                ], 403);
            }

            // ÉTAPE 2: Protection contre l'auto-suppression
            // On empêche un super_admin de supprimer son propre compte
            // auth()->id() donne l'ID de l'utilisateur connecté
            // $user->id est l'ID de l'utilisateur qu'on veut supprimer
            if (auth()->id() === $user->id) {
                return response()->json([
                    'message' => 'Vous ne pouvez pas supprimer votre propre compte pour des raisons de sécurité.'
                ], 403);
            }

            // ÉTAPE 3: Suppression effective
            // delete() supprime l'enregistrement de la base de données
            $user->delete();
            
            // ÉTAPE 4: Confirmation de suppression
            return response()->json([
                'message' => 'Utilisateur supprimé avec succès'
            ]);
        }

        /**
         * METTRE À JOUR LE RÔLE D'UN UTILISATEUR
         * Route: PUT /api/users/{user}/role
         * Accessible uniquement aux super administrateurs
         * Permet de changer le rôle d'un utilisateur (student, teacher, admin, super_admin)
         */
        public function updateRole(Request $request, User $user)
        {
            // ÉTAPE 1: Vérification des permissions
            // Seul un super_admin peut modifier les rôles
            if (auth()->user()->role !== 'super_admin') {
                return response()->json([
                    'message' => 'Action non autorisée. Seuls les super administrateurs peuvent modifier les rôles.'
                ], 403);
            }

            // ÉTAPE 2: Validation du nouveau rôle
            $request->validate([
                // 'role' doit être présent, string, et faire partie de la liste spécifiée
                'role' => 'required|string|in:student,teacher,admin,super_admin',
            ]);

            // ÉTAPE 3: Protection du dernier super_admin
            // On vérifie si l'utilisateur qu'on veut modifier est un super_admin
            // ET si c'est le SEUL super_admin restant dans la base
            if ($user->role === 'super_admin' && User::where('role', 'super_admin')->count() === 1) {
                return response()->json([
                    'message' => 'Impossible de modifier ou supprimer le dernier super_admin du système.'
                ], 403);
            }

            // ÉTAPE 4: Mise à jour du rôle
            $user->update([
                'role' => $request->role
            ]);

            // ÉTAPE 5: Retour de la réponse avec l'utilisateur mis à jour
            return response()->json([
                'message' => 'Rôle mis à jour avec succès',
                'user' => new UserResource($user)  // On retourne l'utilisateur formaté
            ]);
        }
    }