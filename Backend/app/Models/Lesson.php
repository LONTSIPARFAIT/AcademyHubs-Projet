<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'section_id',
        'course_id',
        'title',
        'slug',
        'content',
        'video_url',
        'order',
    ];

    // CETTE FONCTION EST OBLIGATOIRE ICI :
    public function course(){
        return $this->belongsTo(Course::class);
    }

    // Une leçon appartient à une section
    public function section() {
        return $this->belongsTo(Section::class);
    }

}
