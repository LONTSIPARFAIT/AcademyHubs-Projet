import { type Course } from '../../types/course';

interface CourseInstructorProps {
  course: Course;
}

export const CourseInstructor: React.FC<CourseInstructorProps> = ({ course }) => {
  if (!course.instructor) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          Informations sur l'instructeur non disponibles.
        </p>
      </div>
    );
  }

  const instructor = course.instructor;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {instructor.name}
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(instructor.rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-gray-600 dark:text-gray-400 ml-1">
                {instructor.rating} Note d'instructeur
              </span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {instructor.bio}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {instructor.courses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Cours
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {Math.floor(instructor.rating * 20)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Satisfaction
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {instructor.students.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Étudiants
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};