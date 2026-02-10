<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
   public function register(Request $request) {
    $request->validated([
        "name" => "required|string",
        "eamil" => "required|email|unique:user",
        "password" => "required|max:6",
    ]);

    $users = User::create([
        "name" => $request["name"],
        "email" => $request["email"],
        "password" => bcrypt($request['password']),
    ]);
   }
}
