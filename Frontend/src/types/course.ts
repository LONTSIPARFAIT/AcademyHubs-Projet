// Types pour les cours
export interface Course {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  categoryId: number;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  instructor: string | Instructor;
  price: number;
  discountedPrice: number;
  img: string;
  bannerImg?: string;
  tags: string[];
  featured: boolean;
  new: boolean;
  progress: number;
  enrolled?: boolean;
  completedLessons?: number;
  outcomes?: string[];
  requirements?: string[];
  resources?: string[];
  syllabus?: SyllabusWeek[];
}

export interface CourseCategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  courseCount: number;
}

export interface CourseFilter {
  category?: string;
  level?: string;
  duration?: string;
  searchTerm?: string;
  sortBy?: 'popularity' | 'rating' | 'newest' | 'students' | 'duration';
}

export interface CourseProgress {
  courseId: number;
  userId: number;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  lastAccessed: Date;
  completed: boolean;
}

export interface Instructor {
  id: number;
  name: string;
  avatar: string;
  bio: string;
  rating: number;
  courses: number;
  students: number;
  experience: string;
}

export interface SyllabusWeek {
  id: number;
  title: string;
  description: string;
  topics: string[];
}

export interface CourseReview {
  id: number;
  courseId: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
}

export type SortOption = 'popularity' | 'rating' | 'newest' | 'students' | 'duration';

export interface FilterSectionState {
  category: boolean;
  level: boolean;
  duration: boolean;
}