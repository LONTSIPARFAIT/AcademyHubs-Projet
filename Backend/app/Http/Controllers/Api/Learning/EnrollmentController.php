<?php

namespace App\Http\Controllers\Api\Learning;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnrollmentController extends Controller
{
    public function enroll(Course $course) {
        $user = Auth::user();

        // On lie l'utilisateur au cours dans la table pivot (enrollments)
        // syncWithoutDetaching évite les doublons si on clique 2 fois
        $user->enrolenrolledCourses()->syncWithoutDetaching([$course->id]);

        return response()->json([
            'message' => 'Inscription Reussie !',
            'status' => 'enrolled'
        ]);
    }
}
