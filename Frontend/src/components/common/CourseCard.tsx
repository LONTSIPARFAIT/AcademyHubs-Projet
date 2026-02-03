import React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  showProgress = false,
  className = ''
}) => {
  // Fonction pour rendre le badge de niveau
  const renderLevelBadge = (level: Course['level']) => {
    const config = {
      'Débutant': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', text: 'Débutant' },
      'Intermédiaire': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100', text: 'Intermédiaire' },
      'Avancé': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100', text: 'Avancé' }
    };
    
    const { color, text } = config[level] || config['Débutant'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
        {text}
      </span>
    );
  };

  // Fonction pour rendre les étoiles de notation
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Obtenir les initiales de l'instructeur
  const getInstructorInitials = (instructor: string | { name: string }) => {
    const name = typeof instructor === 'string' ? instructor : instructor.name;
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Rendu de la barre de progression
  const renderProgressBar = () => {
    if (!showProgress || course.progress === undefined) return null;
    
    const progress = course.progress || 0;
    return (
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <span>Progression</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 ${className}`}>
      {/* Image du cours */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {course.new && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
              Nouveau
            </span>
          )}
          {course.featured && (
            <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
              Populaire
            </span>
          )}
        </div>
        
        <div className="absolute top-3 right-3">
          {renderLevelBadge(course.level)}
        </div>
        
        {/* Badge gratuit */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
            GRATUIT
          </span>
        </div>
      </div>

      {/* Contenu du cours */}
      <div className="p-5">
        {/* Catégorie */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {course.category}
          </span>
          <div className="flex items-center gap-1">
            {renderStars(course.rating)}
          </div>
        </div>

        {/* Titre */}
        <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          <Link to={`/courses/${course.id}`} className="hover:no-underline">
            {course.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {course.tags.length > 3 && (
            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
              +{course.tags.length - 3}
            </span>
          )}
        </div>

        {/* Infos supplémentaires */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>{course.lessons} leçons</span>
          </div>
        </div>

        {/* Barre de progression (si activée) */}
        {renderProgressBar()}

        {/* Instructeur et étudiants */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                {getInstructorInitials(course.instructor)}
              </span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[100px]">
              {typeof course.instructor === 'string' ? course.instructor : course.instructor.name}
            </span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">
              {course.students.toLocaleString()} étudiants
            </div>
          </div>
        </div>

        {/* Bouton d'action */}
        <div className="mt-4">
          <Link
            to={`/courses/${course.id}`}
            className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 hover:no-underline"
          >
            {course.enrolled ? 'Continuer le cours' : 'Démarrer le cours'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;