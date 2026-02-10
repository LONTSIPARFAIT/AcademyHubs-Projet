import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Course } from '../../types';
import api from '../../api/axios';

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>(); // On récupère le slug de l'URL
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // On appelle la route Laravel : GET /api/courses/{slug}
        const response = await api.get(`/courses/${slug}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du cours", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [slug]);

  if (isLoading) return <div className="p-10 text-center">Chargement du cours...</div>;
  if (!course) return <div className="p-10 text-center">Cours non trouvé.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
      <div className="flex items-center gap-4 mb-8">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {course.category.name}
        </span>
        <span className="text-gray-500">Par {course.instructor.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Colonne Gauche : Description et Leçons */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">À propos de ce cours</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">{course.description}</p>

          <h2 className="text-2xl font-semibold mb-4">Programme du cours</h2>
          <div className="space-y-3">
            {course.lessons?.map((lesson, index) => (
              <div key={lesson.id} className="p-4 border rounded-lg flex justify-between items-center bg-white dark:bg-gray-800">
                <span>{index + 1}. {lesson.title}</span>
                <span className="text-gray-400 text-sm italic">Contenu protégé</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Droite : Action */}
        <div className="lg:col-span-1">
          <div className="p-6 border rounded-xl shadow-sm sticky top-24 bg-white dark:bg-gray-800">
            <p className="text-3xl font-bold mb-6">Gratuit</p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              S'inscrire maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
