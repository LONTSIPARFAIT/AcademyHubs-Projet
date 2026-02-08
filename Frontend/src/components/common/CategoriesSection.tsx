import React from 'react';

interface Category {
  name: string;
  icon: React.ReactNode | string;
  courses: number;
  color: string;
  bgColor: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  onCategoryClick: (categoryName: string) => void;
  isLoading?: boolean;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ 
  categories, 
  onCategoryClick,
  isLoading = false
}) => {
  const getCourseText = (count: number) => {
    return `${count} cours${count > 1 ? 's' : ''}`;
  };

  return (
    <section 
      className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      aria-labelledby="categories-headi"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              Catégories
            </span>
          </div>
          
          <h2 
            id="categories-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Explorez nos catégories
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez une variété de formations adaptées à vos besoins professionnels
          </p>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => onCategoryClick(category.name)}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 text-left 
                  hover:shadow-2xl transition-all duration-300 hover:-translate-y-1
                  border border-gray-100 dark:border-gray-700
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label={`Explorer les formations ${category.name}`}
              >
                {/* Background Effect */}
                <div className={`absolute inset-0 ${category.bgColor} rounded-2xl opacity-0 
                  group-hover:opacity-10 transition-opacity duration-300`} 
                />
                
                {/* Icon Container */}
                <div className="relative mb-4">
                  <div className={`w-14 h-14 rounded-xl ${category.bgColor} flex items-center 
                    justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <span className={`text-2xl ${category.color}`}>
                      {category.icon}
                    </span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white dark:bg-gray-900 
                    rounded-full border-2 border-gray-100 dark:border-gray-800 flex items-center 
                    justify-center group-hover:animate-pulse">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 
                  group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {getCourseText(category.courses)} disponibles
                </p>

                {/* Action Indicator */}
                <div className="flex items-center text-indigo-600 dark:text-indigo-400">
                  <span className="text-sm font-semibold mr-2">
                    Découvrir
                  </span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                  group-hover:border-indigo-200 dark:group-hover:border-indigo-900 
                  transition-colors duration-300 pointer-events-none" 
                />
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {categories.length} catégories • {categories.reduce((acc, cat) => acc + cat.courses, 0)} formations
          </p>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;