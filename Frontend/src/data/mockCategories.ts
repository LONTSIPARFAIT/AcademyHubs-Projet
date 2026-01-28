import type { CourseCategory } from '../types';

export const mockCategories: CourseCategory[] = [
  {
    id: 1,
    name: 'Développement Web',
    description: 'Cours de développement frontend et backend',
    icon: '💻',
    courseCount: 5
  },
  {
    id: 2,
    name: 'Design',
    description: 'UI/UX, Figma, design graphique',
    icon: '🎨',
    courseCount: 2
  },
  {
    id: 3,
    name: 'DevOps',
    description: 'Déploiement, cloud et infrastructure',
    icon: '⚙️',
    courseCount: 1
  },
  {
    id: 4,
    name: 'Mobile',
    description: 'Développement d\'applications mobiles',
    icon: '📱',
    courseCount: 1
  },
  {
    id: 5,
    name: 'Data Science',
    description: 'Analyse de données et machine learning',
    icon: '📊',
    courseCount: 1
  },
  {
    id: 6,
    name: 'Maintenance IT',
    description: 'Hardware, réseau et dépannage',
    icon: '🔧',
    courseCount: 1
  },
  {
    id: 7,
    name: 'Multimédia',
    description: 'Vidéo, audio et montage',
    icon: '🎬',
    courseCount: 1
  }
];

export const categoryOptions = [
  'Toutes',
  'Développement Web',
  'Design',
  'DevOps',
  'Mobile',
  'Data Science',
  'Maintenance IT',
  'Multimédia'
];

export const levelOptions = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

export const durationOptions = [
  'Toutes',
  'Court (< 6 semaines)',
  'Moyen (6-10 semaines)',
  'Long (> 10 semaines)'
];