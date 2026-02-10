<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register(Request $request) {
    $request->validate([
        "name" => "required|string",
        "email" => "required|email|unique:users",
        "password" => "required|min:6",
    ]);

    $user = User::create([
        "name" => $request->name,
        "email" => $request->email,
        "password" => bcrypt($request->password),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'user' => $user,
        'auth_token' => $token,
        'token_type' => 'Bearer',
    ], 201);
   }

   public function login(Request $request){
    $request->validate([
        "email" => "required|email",
        "password" => "required",
    ]);

    $user = User::where("email", $request->email)->first();

    if (!$user || !Hash::check($request->email, $user->password) ) {
        // r
    }
   }
}
