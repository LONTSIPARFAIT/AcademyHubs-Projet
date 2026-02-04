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
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'web', label: 'Développement Web' },
  { value: 'design', label: 'Design' },
  { value: 'devops', label: 'DevOps' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'data', label: 'Data Science' },
  { value: 'maintenance', label: 'Maintenance IT' },
  { value: 'multimedia', label: 'Multimédia' },
  { value: 'security', label: 'Sécurité' }
];

export const levelOptions = [
  { value: 'all', label: 'Tous les niveaux' },
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Avancé' }
];

export const durationOptions = [
  { value: 'all', label: 'Toutes les durées' },
  { value: 'short', label: 'Moins de 5h' },
  { value: 'medium', label: '5-20h' },
  { value: 'long', label: 'Plus de 20h' }
];