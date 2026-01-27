import React from 'react';

interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedLevel: string;
  setSelectedLevel: (v: string) => void;
  selectedDuration: string;
  setSelectedDuration: (v: string) => void;
  categories: string[];
}

const CourseSidebar: React.FC<SidebarProps> = ({
  selectedCategory, setSelectedCategory,
  selectedLevel, setSelectedLevel,
  selectedDuration, setSelectedDuration,
  categories
}) => {
  return (
    <div className="w-full lg:w-64 space-y-8">
      {/* Catégories */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Catégories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === category 
                ? 'bg-indigo-600 text-white font-bold shadow-md' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Niveaux (Radio style) */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Niveau</h3>
        <div className="space-y-2">
          {['Tous', 'Débutant', 'Intermédiaire', 'Avancé'].map(level => (
            <label key={level} className="flex items-center group cursor-pointer">
              <input
                type="radio"
                name="level"
                checked={selectedLevel === level}
                onChange={() => setSelectedLevel(level)}
                className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 transition-colors">
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSidebar;