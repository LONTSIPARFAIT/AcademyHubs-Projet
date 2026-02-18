<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function updatePoofile(Request $request) {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|min:3'
        ]);
    }
}
