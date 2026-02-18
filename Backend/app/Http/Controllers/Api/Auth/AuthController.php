<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register (Request $request) {
        //  1- verification des info envoyer par react
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);

        // 2- on cree un utilisateur dans la bd
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // cryptage du mot de passe
            'role' => 'student',
        ]);

        // 3- on lui genere un token d'authentification
        $token = $user->createToken('auth_token')->plainTextToken;

        // 4- on retourne une reponse a react
        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login (Request $request) {
        // 1. Validation : on verifie que l'email et le pass ont ete envoyer
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. on verifie que le user existe et que le mot de passe est correct
        $user = User::where('email', $request->email)->first();

        // 3.Vérification : si le user n'existe pas ou que le mot de passe est incorrect
        // on utilise Hash::check pour comparer le pass saisir avec celui crypté en base
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401); // 401 : Unauthorized
        }

        // 4. Suppression des anciens tokens (optionnel mais recommandé)
        $user->tokens()->delete();

        // 5. Création d'un nouveau token
        $token = $user->createToken('auth_token')->plainTextToken;

        // 6. on retourne une reponse a react
        return response()->json([
            'user' => new UserResource($user),
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    public function logout (Request $request) {
        // 1. on supprime le token du user
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté'], 200);
    }

    public function me(Request $request){
        // on renvoie l'utilisateur avec ses IDs de cours inscrit
        return new UserResource($request->user()->load('enrolledCourses'));
    }
}
