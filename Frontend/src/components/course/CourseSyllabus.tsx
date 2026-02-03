import { type Course } from '../../types/course';

interface CourseSyllabusProps {
  course: Course;
}

export const CourseSyllabus: React.FC<CourseSyllabusProps> = ({ course }) => {
  if (!course.syllabus || course.syllabus.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          Le programme détaillé sera bientôt disponible.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {course.syllabus.map((week, index) => (
        <div key={week.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                {index + 1}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {week.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {week.description}
              </p>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Sujets abordés :
                </h4>
                <ul className="space-y-1">
                  {week.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};