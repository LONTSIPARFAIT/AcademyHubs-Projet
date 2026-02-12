import React, { useState } from 'react';
import { ChevronDown, PlayCircle, Lock, Clock, CheckCircle } from 'lucide-react';
import type { Section } from '../../types';
import { useNavigate } from 'react-router-dom';

interface SyllabusProps {
  sections: Section[];
  completedLessons: Set<number>; // On utilise un Set pour une recherche ultra-rapide
  toggleLessonCompletion: (lessonId: number) => void;
  isEnrolled: boolean; // Pour savoir si l'élève a le droit de cliquer
}

export const CourseSyllabus = ({ sections, isEnrolled }: SyllabusProps)  => {
 
  const [openSectionId, setOpenSectionId] = React.useState<number | null>(sections[0]?.id || null);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
   const navigate = useNavigate();

  const toggleSection = (id: number) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  const toggleLessonCompletion = (lessonId: number) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  // Calculate progress
  const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
  const completedCount = completedLessons.size;
  const progressPercentage = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Votre progression
          </span>
          <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {completedCount}/{totalLessons} leçons
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, sectionIndex) => {
        const sectionLessons = section.lessons.length;
        const completedInSection = section.lessons.filter(lesson => completedLessons.has(lesson.id)).length;
        
        return (
          <div 
            key={section.id} 
            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-lg"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full p-6 flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 hover:from-indigo-50/30 dark:hover:from-indigo-900/10"
            >
              <div className="flex items-start gap-4 text-left">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                      {String(sectionIndex + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      Module {section.order}
                    </span>
                    <div className="w-1.5 h-1.5 bg-indigo-300 dark:bg-indigo-600 rounded-full"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {sectionLessons} leçons • {completedInSection} terminées
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {section.title}
                  </h3>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                  openSectionId === section.id ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Lessons List */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openSectionId === section.id ? 'max-h-[2000px]' : 'max-h-0'
            }`}>
              <div className="p-4 space-y-2">
                {section.lessons.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const canAccess = isEnrolled || lesson.is_preview;

                  return (
                    <div 
                      key={lesson.id}
                      // MODIFICATION 1 : Clic pour lire la leçon
                      onClick={() => canAccess ? navigate(`/watch/${lesson.slug}`) : alert("Veuillez vous inscrire")}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group/lesson ${
                        !canAccess ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                      } ${
                        isCompleted 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 border border-green-100' 
                          : 'bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isCompleted ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-5 h-5 text-white" /> : <PlayCircle className="w-5 h-5 text-gray-400" />}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-medium ${isCompleted ? 'text-green-700' : 'text-gray-700'}`}>
                              {lesson.title}
                            </span>
                            {lesson.is_preview && <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-full uppercase">Gratuit</span>}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                             <span className="flex items-center gap-1"><Clock size={12}/> 10:00</span>
                             {!canAccess && <span className="flex items-center gap-1"><Lock size={12}/> Premium</span>}
                          </div>
                        </div>
                      </div>

                      {/* MODIFICATION 2 : Clic pour terminer (Stop Propagation important !) */}
                      <div className="flex items-center gap-3" onClick={(e) => { e.stopPropagation(); toggleLessonCompletion(lesson.id); }}>
                        {isCompleted ? (
                          <span className="text-xs font-semibold text-green-600 px-3 py-1 bg-green-100 rounded-full">Terminé</span>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover/lesson:border-indigo-500 transition-colors">
                            <div className="w-4 h-4 rounded-full bg-gray-300 group-hover/lesson:bg-indigo-500"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};