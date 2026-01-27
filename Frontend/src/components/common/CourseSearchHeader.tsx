import React from 'react';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  count: number;
}

const CourseSearchHeader: React.FC<SearchProps> = ({ searchTerm, setSearchTerm, sortBy, setSortBy, count }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div className="relative w-full md:w-96">
        <input
          type="text"
          placeholder="Rechercher une formation..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="absolute left-3 top-3 text-gray-400">🔍</span>
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{count} formations</p>
        <select 
          className="bg-transparent text-sm font-bold text-gray-700 dark:text-gray-300 outline-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popularity">Plus populaires</option>
          <option value="rating">Mieux notés</option>
          <option value="newest">Plus récents</option>
        </select>
      </div>
    </div>
  );
};

export default CourseSearchHeader;