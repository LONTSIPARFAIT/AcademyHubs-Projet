import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/client';
import { Lesson, Course } from '../../types';
import { CourseSyllabus } from '../../components/course/CourseSyllabus';

const LessonPlayerPage = () => {
  const { lessonSlug } = useParams<{ lessonSlug: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchLessonData = async () => {
      // 1. On récupère la leçon actuelle
      const resLesson = await api.get(`/lessons/${lessonSlug}`);
      setLesson(resLesson.data);
      
      // 2. On récupère aussi tout le cours pour afficher le sommaire à gauche
      const resCourse = await api.get(`/courses/${resLesson.data.course_id}`);
      setCourse(resCourse.data);
    };
    fetchLessonData();
  }, [lessonSlug]);

  if (!lesson || !course) return <div>Chargement...</div>;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      {/* SIDEBAR : Le Sommaire (Comme DevInsto) */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-y-auto hidden lg:block">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="font-bold text-sm text-gray-500 uppercase">Contenu du cours</h2>
        </div>
        {/* On réutilise notre composant Syllabus ici ! */}
        <CourseSyllabus sections={course.sections} isEnrolled={true} />
      </div>

      {/* MAIN : Le Lecteur */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
          {/* TITRE */}
          <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

          {/* ZONE VIDÉO (si elle existe) */}
          {lesson.video_url && (
            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-8 shadow-2xl">
               <iframe 
                src={lesson.video_url} 
                className="w-full h-full"
                allowFullScreen
               ></iframe>
            </div>
          )}

          {/* ZONE TEXTE / ÉCRIT (Comme DevInsto) */}
          <div className="prose prose-blue dark:prose-invert max-w-none bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            {lesson.content ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            ) : (
              <p className="text-gray-500 italic">Aucun contenu écrit pour cette leçon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};