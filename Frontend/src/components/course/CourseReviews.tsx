import { type Course } from '../../types/course';

interface CourseReviewsProps {
  course: Course;
}

export const CourseReviews: React.FC<CourseReviewsProps> = ({ course }) => {
  return (
    <div className="space-y-6">
      {/* Note globale */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">
            {course.rating}/5
          </h3>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(course.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-500'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Basé sur {course.reviews} avis
        </p>
      </div>

      {/* Placeholder pour les avis individuels */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Avis des étudiants
        </h3>

        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Les avis détaillés seront bientôt disponibles.
          </p>
        </div>
      </div>
    </div>
  );
};