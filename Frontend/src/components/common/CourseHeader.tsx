import React from 'react';

interface CourseHeaderProps {
  selectedCategory: string;
  filteredAndSortedCourses: any[];
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  selectedCategory,
  filteredAndSortedCourses,
  sortBy,
  setSortBy
}) => {
  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'rating', label: 'Meilleures notes' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'students', label: 'Plus d\'étudiants' },
    { value: 'duration', label: 'Durée' }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h2 className="text-2xl font-bold">
          {selectedCategory === 'Toutes' ? 'Tous les cours' : selectedCategory}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {filteredAndSortedCourses.length} cours disponibles
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Trier par :</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Vue :</span>
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
          <button className="p-2 text-indigo-600 dark:text-indigo-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;