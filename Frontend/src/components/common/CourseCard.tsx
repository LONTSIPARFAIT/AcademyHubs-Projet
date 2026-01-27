import React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">{course.category}</span>
          <span className="text-gray-500 text-xs">{course.duration}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
        <Link to={`/courses/${course.id}`} className="block text-center py-2 bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-all">
          Voir le cours
        </Link>
      </div>
    </div>
  );
};