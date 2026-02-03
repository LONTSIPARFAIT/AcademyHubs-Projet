import { type Course } from '../../types/course';

interface CourseOverviewProps {
  course: Course;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({ course }) => {
  return (
    <div className="space-y-8">
      {/* Description longue */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          À propos de ce cours
        </h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {course.longDescription || course.description}
        </p>
      </div>

      {/* Objectifs d'apprentissage */}
      {course.outcomes && course.outcomes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Ce que vous apprendrez
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {course.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prérequis */}
      {course.requirements && course.requirements.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Prérequis
          </h3>
          <ul className="space-y-2">
            {course.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ressources incluses */}
      {course.resources && course.resources.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Ressources incluses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.resources.map((resource, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 dark:text-gray-300">{resource}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};