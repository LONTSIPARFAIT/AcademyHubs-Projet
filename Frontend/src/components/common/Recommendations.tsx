import React from 'react';
import { Link } from 'react-router-dom';

interface RecommendationsProps {
  allCourses: any[];
  currentCourses: any[];
  renderLevelBadge: (level: string) => React.ReactNode;
}

const Recommendations: React.FC<RecommendationsProps> = ({
  allCourses,
  currentCourses,
  renderLevelBadge
}) => {
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