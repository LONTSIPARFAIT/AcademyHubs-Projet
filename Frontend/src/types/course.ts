import type { Category } from "./common";
import type { User } from "./user";

export interface Lesson {
  id: number;
  section_id: number;
  course_id: number;
  title: string;
  slug: string;
  content: string | null;
  video_url: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null; // correspond au champ 'thumbnail' dans le backend
  category?: Category; // Relation Laravel belongsTo (objet avec name)
  instructor: User; // Relation Laravel belongsTo (objet User)
  sections?: Section[]; // Relation Laravel hasMany
  is_enrolled?: boolean;

  // Champs optionnels utilisés côté UI (backend peut ne pas les fournir)
  img?: string; // alias éventuel côté front
  new?: boolean;
  featured?: boolean;
  level?: 'Débutant' | 'Intermédiaire' | 'Avancé';
  rating?: number;
  tags?: string[];
  duration?: string;
  progress?: number;
  students?: number;
  enrolled?: boolean;
}

export interface Section {
  id: number;
  course_id: number;
  title: string;
  order: number;
  lessons: Lesson[]; // une section contient un tableau de lecons 
}