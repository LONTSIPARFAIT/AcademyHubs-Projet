export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  joinDate: Date;
  bio?: string;
  skills?: string[];
  enrolledCourses: number[];
  completedCourses: number[];
}

export interface UserProfile extends User {
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface UserProgress {
  userId: number;
  enrolledCourses: number;
  completedCourses: number;
  totalLearningHours: number;
  certificates: number;
  currentStreak: number;
}

export interface UserCourseStats {
  enrolled: number;
  completed: number;
  inProgress: number;
  certificates: number;
}