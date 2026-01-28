import { UserCourseStats } from '../types';

export const mockEnrolledStats: UserCourseStats = {
  enrolled: 342,
  completed: 28,
  inProgress: 156,
  certificates: 15
};

export const mockPlatformStats = {
  totalCourses: 12,
  totalStudents: 4500,
  totalInstructors: 8,
  satisfactionRate: 98
};

export const mockSortOptions = [
  { value: 'popularity', label: 'Popularité' },
  { value: 'rating', label: 'Meilleures notes' },
  { value: 'newest', label: 'Plus récents' },
  { value: 'students', label: 'Plus d\'étudiants' },
  { value: 'duration', label: 'Durée' }
];