import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Lesson, Course } from '../../types';
import { ChevronLeft, PlayCircle, FileText } from 'lucide-react';
import api from '../../api/axios';
import { CourseSyllabus } from './CourseSyllabus';

const LessonPlayerPage = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. On récupère la leçon actuelle
        const resLesson = await api.get(`/lessons/${lessonSlug}`);
        const lessonData = resLesson.data;
        setLesson(lessonData);

        // 2. On récupère le cours complet pour la barre latérale (Sidebar)
        const resCourse = await api.get(`/courses/${lessonData.course.slug}`);
        setCourse(resCourse.data);
      } catch (err) {
        console.error("Erreur de chargement", err);
        navigate('/courses'); // Retour si erreur
      } finally {
        setLoading(false);
      }
    };
    if (lessonSlug) fetchData();
  }, [lessonSlug]);

  if (loading || !lesson || !course) return <div className="h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 overflow-hidden">
      
      {/* SIDEBAR GAUCHE : Sommaire cliquable */}
      <aside className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col bg-gray-50 dark:bg-gray-900 hidden lg:flex">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <button onClick={() => navigate(-1)} className="flex items-center text-sm text-indigo-600 mb-2">
            <ChevronLeft size={16} /> Retour au cours
          </button>
          <h2 className="font-bold text-gray-900 dark:text-white line-clamp-2">{course.title}</h2>
        </div>
<div className="flex-1 overflow-y-auto custom-scrollbar">
  {/* AJOUTE CETTE CONDITION && */}
  {course && course.sections && (
    <CourseSyllabus 
      sections={course.sections} 
      isEnrolled={true} 
      completedLessons={new Set()} // Obligatoire selon ton interface
      toggleLessonCompletion={(id) => console.log("Terminer leçon", id)} 
    />
  )}
</div>
      </aside>

      {/* ZONE DE CONTENU (Droite) */}
      <main className="flex-1 overflow-y-auto bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto p-6 lg:p-10">
          
          {/* LECTEUR VIDÉO */}
          {lesson.video_url ? (
            <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl mb-8">
              <iframe 
                src={lesson.video_url.replace('watch?v=', 'embed/')} 
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="p-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl mb-8 flex items-center gap-4">
              <FileText className="text-indigo-600" size={40} />
              <p className="text-indigo-900 dark:text-indigo-200 font-medium">Leçon textuelle</p>
            </div>
          )}

          {/* TEXTE DE LA LEÇON */}
          <div className="prose prose-indigo dark:prose-invert max-w-none">
            <h1 className="text-3xl font-black mb-6">{lesson.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: lesson.content || 'Aucun texte pour cette leçon.' }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonPlayerPage;
