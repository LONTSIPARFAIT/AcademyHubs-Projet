import type { Course } from "../types";


export const allCourses: Course[] = [
  {
    id: 1,
    title: 'Développement Web Fullstack',
    description: 'Maîtrisez HTML, CSS, JavaScript, Node.js et Tailwind.',
    category: 'Développement Web',
    level: 'Débutant',
    duration: '12 semaines',
    lessons: 45,
    students: 1200,
    rating: 4.8,
    instructor: 'Jean Dupont',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  },
  // Ajoute les autres cours ici...
];