// src/data/mockWelcomeData.ts
export const mockWelcomeStats = {
  activeStudents: 1200,
  courses: 45,
  hours: 280,
  successRate: 92
};

export const mockCategories = [
  {
    name: 'Développement Web',
    icon: '💻',
    courses: 12,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    name: 'Design',
    icon: '🎨',
    courses: 8,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    name: 'DevOps',
    icon: '⚙️',
    courses: 6,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    name: 'Mobile',
    icon: '📱',
    courses: 10,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    name: 'Data Science',
    icon: '📊',
    courses: 7,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    name: 'Maintenance IT',
    icon: '🔧',
    courses: 5,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50 dark:bg-gray-900/20'
  },
  {
    name: 'Multimédia',
    icon: '🎬',
    courses: 9,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20'
  },
  {
    name: 'Sécurité',
    icon: '🔒',
    courses: 4,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
  }
];

export const mockTestimonials = [
  {
    name: 'Marie K.',
    role: 'Développeuse Full-Stack',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    content: 'Les cours sont d\'une qualité exceptionnelle. J\'ai trouvé un emploi en 3 mois grâce aux compétences acquises.',
    rating: 5
  },
  {
    name: 'Jean-Paul M.',
    role: 'Designer UX/UI',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'La plateforme est intuitive et les instructeurs sont très pédagogues. Formation recommandée !',
    rating: 5
  },
  {
    name: 'Sophie L.',
    role: 'Data Analyst',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'Cours pratiques et adaptés au marché camerounais. Excellente expérience d\'apprentissage.',
    rating: 5
  }
];

export const mockFeatures = [
  {
    icon: '🎯',
    title: 'Formations ciblées',
    description: 'Cours adaptés aux besoins du marché camerounais et aux réalités locales.'
  },
  {
    icon: '👨‍🏫',
    title: 'Experts locaux',
    description: 'Instructeurs expérimentés connaissant parfaitement le contexte professionnel camerounais.'
  },
  {
    icon: '📱',
    title: 'Apprentissage flexible',
    description: 'Étudiez où et quand vous voulez avec notre plateforme accessible 24/7.'
  },
  {
    icon: '💼',
    title: 'Projets pratiques',
    description: 'Mettez en pratique vos connaissances sur des projets concrets du marché local.'
  },
  {
    icon: '🎓',
    title: 'Certifications reconnues',
    description: 'Obtenez des certifications valorisables sur le marché du travail.'
  },
  {
    icon: '🤝',
    title: 'Communauté active',
    description: 'Rejoignez une communauté d\'apprenants et de professionnels motivés.'
  }
];

export const mockFormations = [
  'Toutes',
  'Développement Web',
  'Design',
  'DevOps',
  'Mobile',
  'Data Science',
  'Maintenance IT',
  'Multimédia'
];

export const mockNiveaux = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];