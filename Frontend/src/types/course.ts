// Types pour les cours
export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  price: number;
  discountedPrice: number;
  img: string;
  tags: string[];
  featured: boolean;
  new: boolean;
  progress: number;
  enrolled?: boolean;
  completedLessons?: number;
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

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  duration: number;
  videoUrl?: string;
  content: string;
  order: number;
  completed: boolean;
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