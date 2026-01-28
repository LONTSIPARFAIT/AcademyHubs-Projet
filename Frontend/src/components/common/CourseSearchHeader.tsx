import React from 'react';
import type { UserCourseStats, Course } from '../../types';

interface CourseSearchHeaderProps {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  enrolledStats: UserCourseStats;
  allCourses: Course[];
}

const CourseSearchHeader: React.FC<CourseSearchHeaderProps> = ({
  searchTerm,
  handleSearch,
  enrolledStats,
  allCourses
}) => {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          alt="Étudiants suivant des cours en ligne"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
              Catalogue des Cours
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Découvrez tous nos cours 100% gratuits et commencez votre apprentissage dès aujourd'hui
          </p>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un cours, une technologie, un instructeur..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{allCourses.length}</div>
              <div className="text-sm text-white/80">Cours disponibles</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{enrolledStats.enrolled}</div>
              <div className="text-sm text-white/80">Étudiants inscrits</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">{enrolledStats.certificates}</div>
              <div className="text-sm text-white/80">Certifications</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-white/80">Gratuits</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSearchHeader;