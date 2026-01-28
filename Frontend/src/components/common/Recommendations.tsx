import React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../../types';

interface RecommendationsProps {
  allCourses: Course[];
  currentCourses: Course[];
}

const Recommendations: React.FC<RecommendationsProps> = ({
  allCourses,
  currentCourses
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

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold mb-6">Vous pourriez aussi aimer</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses
          .filter(course => course.featured && course.id !== currentCourses[0]?.id)
          .slice(0, 3)
          .map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-sm mb-1 line-clamp-2">{course.title}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    {renderLevelBadge(course.level)}
                    <span className="text-xs text-gray-500">{course.duration}</span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                  >
                    Voir le cours →
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recommendations;