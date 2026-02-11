import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Course } from '../../types';
import api from '../../api/axios';
import { CourseSyllabus } from './CourseSyllabus';
import { useAuth } from '../../hooks/useAuth';

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>(); // On récupère le slug de l'URL
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {isAuthenticated, user} = useAuth();
  const [isEnrolled,setIsEnrolled] = useState(false);
  const [isEnrolling,setIsEnrolling] = useState(false);

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
  
  // 1. on verifie si le user est geja inscrit
  useEffect(() => {
    if (course && user) {
      // On vérifie si l'ID du cours est dans la liste des inscriptions de l'user
      // Note: Il faudra que ton API /user renvoie aussi les IDs des cours inscrits
      const  checkEnrollment = user.enrolled_courses?.some((c: any) => c.id === course.id);
      setIsEnrolled(!!checkEnrollment);
    }
  }, [course, user]);

  if (isLoading) return <div className="p-10 text-center">Chargement du cours...</div>;
  if (!course) return <div className="p-10 text-center">Cours non trouvé.</div>;


  // 2. la fonction d'inscription
  const handleEnroll = async () => {
    if(!isAuthenticated) {
      navigate('/login');
      return ;
    }
     
    setIsEnrolling(true);
    
    try {
      await api.post(`/course/${course.slug}/enroll`);
      setIsEnrolled(true);
      alert('Felicitation vous etes inscrit ');
    } catch (err) {
      alert("Erreur lors de l'inscription");
    } finally {
      setIsEnrolling(false);
    }
  }

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

          <h2 className="text-2xl font-bold mb-6">Contenu de la formation</h2>
  {course.sections && course.sections.length > 0 ? (
    <CourseSyllabus sections={course.sections} />
  ) : (
    <p className="text-gray-500 italic">Le programme n'est pas encore disponible.</p>
  )}
        </div>

        {/* Colonne Droite : Action */}
        <div className="lg:col-span-1">
          <div className="p-6 border rounded-xl shadow-sm sticky top-24 bg-white dark:bg-gray-800">
            <p className="text-3xl font-bold mb-6">Gratuit</p>
            <button 
              onClick={handleEnroll}
              disabled = {isEnrolling}
              className={`w-full py-3 rounded-lg font-bold transition ${
                isEnrolled
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              { isEnrolling ? 'Traitement...' : isEnrolled ? "Continuer le cours" : "S'incrire"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
