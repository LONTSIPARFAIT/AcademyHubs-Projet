import React, { useState } from 'react';
// import { ChevronDown, PlayCircle, Lock } from 'lucide-react';
import type { Section } from '../../types';

interface SyllabusProps {
  sections: Section[];
}

export const CourseSyllabus = ({ sections }: SyllabusProps) => {
  // État pour savoir quelle section est ouverte (par défaut la première)
  const [openSectionId, setOpenSectionId] = useState<number | null>(sections[0]?.id || null);

  const toggleSection = (id: number) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div 
          key={section.id} 
          className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900"
        >
          {/* En-tête du Chapitre (Section) */}
          <button
            onClick={() => toggleSection(section.id)}
            className="w-full p-5 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">
                Module {section.order}
              </span>
              <h3 className="font-bold text-gray-900 dark:text-white">{section.title}</h3>
            </div>
            {/* <ChevronDown 
              className={`text-gray-400 transition-transform duration-300 ${openSectionId === section.id ? 'rotate-180' : ''}`} 
            /> */} icone
          </button>

          {/* Liste des Leçons (Accordéon) */}
          <div className={`overflow-hidden transition-all duration-300 ${openSectionId === section.id ? 'max-h-[1000px]' : 'max-h-0'}`}>
            <div className="p-2 space-y-1">
              {section.lessons.map((lesson) => (
                <div 
                  key={lesson.id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600">
                      {/* <PlayCircle size={20} /> */}icone
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">10:00</span>
                    {/* <Lock size={14} className="text-gray-300" /> */} icone
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
