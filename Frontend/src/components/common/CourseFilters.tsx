import React from 'react';

interface FilterSection {
  category: boolean;
  level: boolean;
  duration: boolean;
}

interface CourseFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
  openFilterSections: FilterSection;
  toggleFilterSection: (section: keyof FilterSection) => void;
  filteredAndSortedCourses: any[];
  currentPage: number;
  totalPages: number;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedDuration,
  setSelectedDuration,
  openFilterSections,
  toggleFilterSection,
  filteredAndSortedCourses,
  currentPage,
  totalPages,
  resetFilters,
  setCurrentPage
}) => {
  const categories = [
    'Toutes',
    'Développement Web',
    'Design',
    'DevOps',
    'Mobile',
    'Data Science',
    'Maintenance IT',
    'Multimédia'
  ];

  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

  const durations = ['Toutes', 'Court (< 6 semaines)', 'Moyen (6-10 semaines)', 'Long (> 10 semaines)'];

  return (
    <div className="lg:w-1/4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filtres</h2>
          <button
            onClick={resetFilters}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réinitialiser
          </button>
        </div>

        {/* Filtre Catégorie */}
        <div className="mb-6">
          <button
            onClick={() => toggleFilterSection('category')}
            className="flex items-center justify-between w-full font-semibold mb-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <span>Catégorie</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${openFilterSections.category ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`space-y-2 overflow-hidden transition-all duration-300 ${openFilterSections.category ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filtre Niveau */}
        <div className="mb-6">
          <button
            onClick={() => toggleFilterSection('level')}
            className="flex items-center justify-between w-full font-semibold mb-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <span>Niveau</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${openFilterSections.level ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`space-y-2 overflow-hidden transition-all duration-300 ${openFilterSections.level ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => {
                  setSelectedLevel(level);
                  setCurrentPage(1);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedLevel === level
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Filtre Durée */}
        <div className="mb-6">
          <button
            onClick={() => toggleFilterSection('duration')}
            className="flex items-center justify-between w-full font-semibold mb-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <span>Durée</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${openFilterSections.duration ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`space-y-2 overflow-hidden transition-all duration-300 ${openFilterSections.duration ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {durations.map((duration) => (
              <button
                key={duration}
                onClick={() => {
                  setSelectedDuration(duration);
                  setCurrentPage(1);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedDuration === duration
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        {/* Bouton pour afficher/masquer tous les filtres sur mobile */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => {
              const allOpen = Object.values(openFilterSections).every(v => v);
              toggleFilterSection('category');
              toggleFilterSection('level');
              toggleFilterSection('duration');
            }}
            className="w-full text-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium py-2 border border-indigo-200 dark:border-indigo-800 rounded-lg"
          >
            {Object.values(openFilterSections).every(v => v) ? 'Masquer tous' : 'Afficher tous'}
          </button>
        </div>

        {/* Info sur les résultats */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-1">
              <span className="font-semibold">{filteredAndSortedCourses.length}</span> cours trouvés
            </p>
            <p>
              Page <span className="font-semibold">{currentPage}</span> sur{' '}
              <span className="font-semibold">{totalPages}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilters;