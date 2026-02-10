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

    
}
