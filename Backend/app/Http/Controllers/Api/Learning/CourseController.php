<?php

namespace App\Http\Controllers\Api\Learning;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(){
        // on recupere les cours publier avec leur categorie et leur instructeur
        $courses = Course::with(['category', 'instructor'])
        ->where('is_published', true)
        ->get();
        
        // on retourne les cours a react
        return response()->json($courses);
    }

    public function show(Course $course) {
        // on charge les cours avec ses lecons trier selon la categorie
        $course->load(['category', 'instructor', 'lessons']);

        // on ajoute l'info de l'inscription
        $user = auth('sanctum')->user();

        // on ajoute dynamiquement une propriete 'is_enrolled'
        $course->is_enrolled = $user ? $user->enrolledCourses()->where('course_id', $course->id)->exists() : false;

        return response()->json($course);
    }

    public function ShowLesson($slug){
        $user = auth()->user();

        // 1. on cherche la lesson
        $lesson = Lesson::where('slug', $slug)->firstOrFail();

        // 2.on verifie si le user est inscrire a ce cours
        $isEnrolled = $user->enrolledCourses()->where('course_id', $lesson->course_id)->exists();

        if(!$isEnrolled) {
            return response()->json(['message' => "Vous n'etes pas inscrire a ce cours"], 403);
        }

        return response()->json($lesson);
    }
}
