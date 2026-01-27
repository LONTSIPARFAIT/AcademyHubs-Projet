import React from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedLevel: string;
  setSelectedLevel: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  categories: string[];
}

const CourseFilters: React.FC<FiltersProps> = ({
  searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory,
  selectedLevel, setSelectedLevel,
  sortBy, setSortBy,
  categories
}) => {
  return (
    <section className="sticky top-20 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Barre de recherche (Identique à ton original) */}
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Rechercher une formation..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filtres Selects (Identiques à ton original) */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              {['Tous', 'Débutant', 'Intermédiaire', 'Avancé'].map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 transition-all cursor-pointer"
            >
              <option value="popularity">Plus populaires</option>
              <option value="rating">Mieux notés</option>
              <option value="newest">Plus récents</option>
            </select>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CourseFilters;