import React from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: {
    id: number;
    title: string;
    description: string;
    category: string;
    level: string;
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
  };
  renderLevelBadge: (level: string) => React.ReactNode;
  renderStars: (rating: number) => React.ReactNode;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, renderLevelBadge, renderStars }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500">
      {/* Image du cours */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.img}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          <Link to={`/courses/${course.id}`}>
            {course.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
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

        {/* Instructeur et étudiants */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                {course.instructor.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">{course.instructor}</span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">{course.students} étudiants</div>
          </div>
        </div>

        {/* Bouton d'action */}
        <div className="mt-4">
          <Link
            to={`/courses/${course.id}`}
            className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            Démarrer le cours
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;