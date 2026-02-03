import React from 'react';
import { Link } from 'react-router-dom';
import type { Course } from '../../types/course';
import { Select } from '../ui';
import CourseCard from './CourseCard';

interface CoursesPreviewSectionProps {
  courses: Course[];
  selectedFormation: string;
  selectedLevel: string;
  formations: string[];
  niveaux: string[];
  onFormationChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onResetFilters: () => void;
}

const CoursesPreviewSection: React.FC<CoursesPreviewSectionProps> = ({
  courses,
  selectedFormation,
  selectedLevel,
  formations,
  niveaux,
  onFormationChange,
  onLevelChange,
  onResetFilters
}) => {
  const formationOptions = formations.map(formation => ({
    value: formation,
    label: formation
  }));

  const niveauOptions = niveaux.map(niveau => ({
    value: niveau,
    label: niveau
  }));

  const filteredCourses = courses.filter(course => {
    const matchesFormation = selectedFormation === 'Toutes' || course.category === selectedFormation;
    const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
    return matchesFormation && matchesLevel;
  });

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Nos Cours Disponibles
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez notre catalogue de formations. Utilisez les filtres pour affiner votre recherche.
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-8 md:mb-10 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Filtrer les cours</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredCourses.length} cours trouvés
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-auto">
                <Select
                  label="Formation"
                  name="formation"
                  value={selectedFormation}
                  onChange={(e) => onFormationChange(e.target.value)}
                  options={formationOptions}
                  className="w-full sm:w-64"
                />
              </div>

              <div className="w-full sm:w-auto">
                <Select
                  label="Niveau"
                  name="level"
                  value={selectedLevel}
                  onChange={(e) => onLevelChange(e.target.value)}
                  options={niveauOptions}
                  className="w-full sm:w-48"
                />
              </div>
            </div>
          </div>

          {(selectedFormation !== 'Toutes' || selectedLevel !== 'Tous') && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>
                  Filtres actifs: {selectedFormation !== 'Toutes' && 'Formation'} {selectedLevel !== 'Tous' && 'Niveau'}
                </span>
              </div>

              <button
                onClick={onResetFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Liste des cours filtrés */}
        {filteredCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredCourses.slice(0, 6).map((course, i) => (
              <CourseCard key={i} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
              Aucun cours trouvé
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Aucun cours ne correspond à vos critères de filtrage. Essayez de modifier vos filtres.
            </p>
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
            >
              Réinitialiser les filtres
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        )}

        {/* Bouton voir tous les cours */}
        {filteredCourses.length > 6 && (
          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors duration-300"
            >
              Voir tous les cours
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesPreviewSection;