<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'content',
        'video_url',
        'order',
    ];

    // Une leçon appartient à une section
    public function section() {
        return $this->belongsTo(Section::class);
    }

}
