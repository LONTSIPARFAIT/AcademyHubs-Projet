<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
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
            'password' => 'required|min:6',
        ]);

        // 2- on cree un utilisateur dans la bd
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password), // cryptage du mot de passe
        ]);

        // 3- on lui genere un token d'authentification
        $token = $user->createToken('auth_token')->plainTextToken;

        // 4- on retourne une reponse a react
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login (Request $request) {
        // 1. Validation : on verifie que leimail et le pass ont ete envoyer
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
                'message' => 'Invalid credentials'
            ], 401); // 401 : Unauthorized
        }

        // 4. Succès : On crée un nouveau jeton (token)
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. on retourne une reponse a react
        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    public function logout (Request $request) {
        // 1. on supprime le token du user
        $request->user()->tokens()->delete();
    }

    public function me(Request $request){
        // on renvoie l'utilisateur avec ses IDs de cours inscrit
        return $request->user()->load('enrolledCourses:id');
    }
}
