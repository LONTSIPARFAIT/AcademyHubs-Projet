<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    protected $fillable = ['course_id', 'title', 'order'];

    // Une section appartient à un cours
    public function course() {
        return $this->belongsTo(Course::class);
    }

    // Une section contient plusieurs leçons
    public function lessons() {
        return $this->hasMany(Lesson::class)->orderBy('order', 'asc');
    }
}
