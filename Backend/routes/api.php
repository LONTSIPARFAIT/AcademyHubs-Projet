<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Learning\CourseController;
use App\Http\Controllers\Api\Learning\EnrollmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group( function () {

    // Inscription au cours
    Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'enroll']);

    // Lecture d'une lecons
    Route::get('/lessons/{lesson:slug}' [CourseController::class, 'ShowLesson']);
});

// --- ROUTES PUBLIQUES (Tout le monde voit) ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{course}', [CourseController::class, 'show']);