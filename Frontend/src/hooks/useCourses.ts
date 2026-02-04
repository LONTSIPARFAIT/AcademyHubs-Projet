import { mockCourses, courseCategories } from '../data';

export const useCourses = () => {
  const courses = mockCourses;
  const categories = courseCategories;
  const isLoading = false;

  const getCourseById = (id: number) => {
    return courses.find(course => course.id === id);
  };

  const getCoursesByCategory = (categoryId: number) => {
    return courses.filter(course => course.categoryId === categoryId);
  };

  return {
    courses,
    categories,
    isLoading,
    getCourseById,
    getCoursesByCategory
  };
};