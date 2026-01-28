import React from 'react';

interface CourseSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedDuration: string;
  setSelectedDuration: (duration: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredAndSortedCourses: any[];
  setCurrentPage: (page: number) => void;
  currentPage: number;
  resetFilters: () => void;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedDuration,
  setSelectedDuration,
  sortBy,
  setSortBy,
  filteredAndSortedCourses,
  setCurrentPage,
  currentPage,
  resetFilters
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

  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'rating', label: 'Meilleures notes' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'students', label: 'Plus d\'étudiants' },
    { value: 'duration', label: 'Durée' }
  ];

  return (
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
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Catégorie</h3>
        <div className="space-y-2">
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
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Niveau</h3>
        <div className="space-y-2">
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
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Durée</h3>
        <div className="space-y-2">
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

      {/* Tri */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Trier par</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Info sur les résultats */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="mb-1">
            <span className="font-semibold">{filteredAndSortedCourses.length}</span> cours trouvés
          </p>
          <p>
            Page <span className="font-semibold">{currentPage}</span> sur{' '}
            <span className="font-semibold">{Math.ceil(filteredAndSortedCourses.length / 9)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;