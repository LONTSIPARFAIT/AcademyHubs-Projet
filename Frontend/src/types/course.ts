import type { Category } from "./common";
import type { User } from "./user";

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  slug: string;
  content?: string;
  video_url?: string;
  order: number; 
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  category: Category; // Relation Laravel belongsTo
  instructor: User; // Relation Laravel belongsTo
  lesson?: Lesson[]; // Relation Laravel hasMany (optionnelle car pas toujours chargée)
}