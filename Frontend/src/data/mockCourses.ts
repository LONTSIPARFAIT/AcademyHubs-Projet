import { Course } from '../types';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Développement Web Fullstack',
    description: 'Maîtrisez HTML, CSS, JavaScript, Node.js et Tailwind pour créer des applications web complètes.',
    category: 'Développement Web',
    level: 'Débutant',
    duration: '12 semaines',
    lessons: 45,
    students: 1200,
    rating: 4.8,
    instructor: 'Jean Dupont',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4d0f5?auto=format&fit=crop&w=800&q=80',
    tags: ['Frontend', 'Backend', 'Projet', 'Certification'],
    featured: true,
    new: true,
    progress: 0
  },
  {
    id: 2,
    title: 'Laravel & Développement Backend',
    description: 'Construisez des applications robustes adaptées au marché africain avec Laravel et MySQL.',
    category: 'Développement Web',
    level: 'Intermédiaire',
    duration: '10 semaines',
    lessons: 38,
    students: 850,
    rating: 4.9,
    instructor: 'Marie Kamga',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?auto=format&fit=crop&w=800&q=80',
    tags: ['Backend', 'API', 'Base de données'],
    featured: true,
    new: false,
    progress: 0
  },
  {
    id: 3,
    title: 'React & Next.js Avancé',
    description: 'Créez des applications React modernes avec Next.js 14, TypeScript et Tailwind CSS.',
    category: 'Développement Web',
    level: 'Avancé',
    duration: '8 semaines',
    lessons: 32,
    students: 720,
    rating: 4.7,
    instructor: 'Samuel Nkono',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1633356122542-727a01e23861?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'TypeScript', 'Next.js'],
    featured: true,
    new: true,
    progress: 0
  },
  {
    id: 4,
    title: 'UI/UX Design pour Débutants',
    description: 'Apprenez les principes du design d\'interface et créez des expériences utilisateur exceptionnelles.',
    category: 'Design',
    level: 'Débutant',
    duration: '6 semaines',
    lessons: 25,
    students: 680,
    rating: 4.6,
    instructor: 'Sarah Mbala',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    tags: ['Design', 'Figma', 'Prototype'],
    featured: false,
    new: true,
    progress: 0
  },
  {
    id: 5,
    title: 'DevOps & Déploiement Cloud',
    description: 'Déployez vos applications avec Docker, AWS et CI/CD pour le marché africain.',
    category: 'DevOps',
    level: 'Intermédiaire',
    duration: '9 semaines',
    lessons: 35,
    students: 540,
    rating: 4.8,
    instructor: 'Paul Owono',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    tags: ['DevOps', 'Cloud', 'Docker'],
    featured: false,
    new: false,
    progress: 0
  },
  {
    id: 6,
    title: 'Mobile avec React Native',
    description: 'Développez des applications mobiles cross-platform pour le marché camerounais.',
    category: 'Mobile',
    level: 'Intermédiaire',
    duration: '11 semaines',
    lessons: 40,
    students: 490,
    rating: 4.5,
    instructor: 'Lisa Ndifor',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
    tags: ['Mobile', 'React Native', 'iOS/Android'],
    featured: false,
    new: false,
    progress: 0
  },
  {
    id: 7,
    title: 'HTML & CSS Fondamentaux',
    description: 'Apprenez les bases du développement web avec HTML5 et CSS3.',
    category: 'Développement Web',
    level: 'Débutant',
    duration: '4 semaines',
    lessons: 20,
    students: 2100,
    rating: 4.7,
    instructor: 'Jean Dupont',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tags: ['HTML', 'CSS', 'Responsive'],
    featured: false,
    new: false,
    progress: 0
  },
  {
    id: 8,
    title: 'JavaScript Moderne',
    description: 'Maîtrisez JavaScript ES6+, les APIs modernes et les concepts avancés.',
    category: 'Développement Web',
    level: 'Intermédiaire',
    duration: '8 semaines',
    lessons: 30,
    students: 1650,
    rating: 4.8,
    instructor: 'Jean Dupont',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
    tags: ['JavaScript', 'ES6+', 'Async'],
    featured: true,
    new: false,
    progress: 0
  },
  {
    id: 9,
    title: 'Figma Avancé',
    description: 'Créez des prototypes interactifs et des design systems professionnels.',
    category: 'Design',
    level: 'Avancé',
    duration: '5 semaines',
    lessons: 18,
    students: 320,
    rating: 4.9,
    instructor: 'Sarah Mbala',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
    tags: ['Figma', 'Prototype', 'Design System'],
    featured: false,
    new: true,
    progress: 0
  },
  {
    id: 10,
    title: 'Python pour la Data Science',
    description: 'Analysez des données et créez des modèles prédictifs avec Python.',
    category: 'Data Science',
    level: 'Intermédiaire',
    duration: '10 semaines',
    lessons: 42,
    students: 890,
    rating: 4.7,
    instructor: 'David Nkem',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Data', 'Machine Learning'],
    featured: true,
    new: false,
    progress: 0
  },
  {
    id: 11,
    title: 'Maintenance Informatique',
    description: 'Apprenez le dépannage et la maintenance des équipements informatiques.',
    category: 'Maintenance IT',
    level: 'Débutant',
    duration: '7 semaines',
    lessons: 28,
    students: 430,
    rating: 4.6,
    instructor: 'Pierre Mbarga',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    tags: ['Hardware', 'Réseau', 'Dépannage'],
    featured: false,
    new: true,
    progress: 0
  },
  {
    id: 12,
    title: 'Montage Vidéo avec Premiere Pro',
    description: 'Créez des vidéos professionnelles avec Adobe Premiere Pro.',
    category: 'Multimédia',
    level: 'Intermédiaire',
    duration: '8 semaines',
    lessons: 32,
    students: 380,
    rating: 4.5,
    instructor: 'Clara Fotso',
    price: 0,
    discountedPrice: 0,
    img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80',
    tags: ['Vidéo', 'Adobe', 'Montage'],
    featured: false,
    new: false,
    progress: 0
  }
];

// Fonctions utilitaires pour les cours
export const getCourseById = (id: number): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getFeaturedCourses = (): Course[] => {
  return mockCourses.filter(course => course.featured);
};

export const getNewCourses = (): Course[] => {
  return mockCourses.filter(course => course.new);
};

export const getCoursesByCategory = (category: string): Course[] => {
  if (category === 'Toutes') return mockCourses;
  return mockCourses.filter(course => course.category === category);
};

export const getCoursesByLevel = (level: string): Course[] => {
  if (level === 'Tous') return mockCourses;
  return mockCourses.filter(course => course.level === level);
};