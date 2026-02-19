<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Auth\UserController;
use App\Http\Controllers\Api\Learning\CourseController;
use App\Http\Controllers\Api\Learning\EnrollmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group( function () {
    Route::get('/user', [AuthController::class, 'me']); 

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users', [UserController::class, 'index']);
    Route::put('/users/{user}/role', [UserController::class, 'updateRole']);

    // Inscription au cours
    Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'enroll']);

    // Lecture d'une lecons
    Route::get('/lessons/{lesson:slug}', [CourseController::class, 'showLesson']);
});

// --- ROUTES PUBLIQUES (Tout le monde voit) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);
