<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role,
            'enrolled_course_ids' => $this->whenLoaded('enrolledCourses', function() {
                return $this->enrolledCourses->pluck('id');
            }),
            'created_at' => $this->created_at ? $this->created_at->format('d/m/Y') : null,
        ];
        return parent::toArray($request);
    }
}
