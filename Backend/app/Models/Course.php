<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'title',
        'slug', 
        'description', 
        'category_id', 
        'instructor_id','
        is_published',
        'thumbnail'
    ];

    // un cours appartient à une catégorie
    public function category(){
        return $this->belongsTo(Category::class);
    }

    // un cours appartient à un instructeur
    public function instructor(){
        return $this->belongsTo(User::class, 'instructor_id');
    }

    // un cours a plusieurs leçons
    public function lessons(){
        return $this->hasMany(Lesson::class)->orderBy('order', 'asc');
    }

    // pour que Laravel utilise le slug au lieu de l'id dans les URLs
    public function getRouteKeyName(){
        return 'slug';
    }
}
