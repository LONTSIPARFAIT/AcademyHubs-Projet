<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

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
}
