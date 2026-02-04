import type { UserCourseStats } from '../types';

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

export const categoryOptions = [
  'Toutes les catégories',
  'Développement Web',
  'Design',
  'DevOps',
  'Mobile',
  'Data Science',
  'Maintenance IT',
  'Multimédia',
  'Sécurité'
];

export const levelOptions = [
  'Tous les niveaux',
  'Débutant',
  'Intermédiaire',
  'Avancé'
];

export const durationOptions = [
  'Toutes les durées',
  'Moins de 5h',
  '5-20h',
  'Plus de 20h'
];