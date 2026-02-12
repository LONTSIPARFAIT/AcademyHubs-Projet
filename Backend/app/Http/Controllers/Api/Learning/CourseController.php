<?php

namespace App\Http\Controllers\Api\Learning;

use App\Http\Controllers\Controller;
use App\Models\Course;
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
        // $course->load(['category', 'instructor', 'lessons']);
        // return response()->json($course);
        return response()->json($course->load([
            'category', 
            'instructor', 
            'sections.lessons'
        ]));
    }

    public function ShowLesson($slug){
        $user = auth()->user();

        // 1. on cherche la lesson
        $lesson = Lesson::where('slug', $slug)->firtOrFail();

        // 2.on verifie si le user est inscrire a ce cours
        $isEnrolled = $user->enrolledCourses()->where('course_id', $lesson->course_id)->exists();

        if(!$isEnroled) {
            return response()->json(['message' => "Vous n'etes pas inscrire a ce cours"], 403);
        }

        return response()->json($lesson);
    }
}
