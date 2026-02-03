import { useState, useEffect } from 'react';
import { type Course } from '../types/course';
import { mockCourses } from '../data';

export const useCourseDetail = (id: string | undefined) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setIsLoggedIn(!!user);

    // Trouver le cours
    if (id) {
      const foundCourse = mockCourses.find(c => c.id === parseInt(id));
      setCourse(foundCourse || null);

      // Vérifier si l'utilisateur est inscrit
      if (user) {
        const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
        setEnrolled(enrolledCourses.includes(parseInt(id)));
      }
    }

    setLoading(false);
  }, [id]);

  const toggleEnrollment = () => {
    if (!isLoggedIn) return;

    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const courseId = parseInt(id || '0');

    if (enrolled) {
      // Désinscrire
      const updatedCourses = enrolledCourses.filter((id: number) => id !== courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedCourses));
      setEnrolled(false);
    } else {
      // Inscrire
      enrolledCourses.push(courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setEnrolled(true);
    }
  };

  return {
    course,
    loading,
    enrolled,
    isLoggedIn,
    toggleEnrollment
  };
};