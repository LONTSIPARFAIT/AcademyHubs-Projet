import React from 'react';

interface Category {
  name: string;
  icon: string;
  courses: number;
  color: string;
  bgColor: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  onCategoryClick: (categoryName: string) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories, onCategoryClick }) => {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Explorez nos catégories
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez une variété de formations adaptées à vos besoins professionnels
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, i) => (
            <div
              key={i}
              className="group cursor-pointer"
              onClick={() => onCategoryClick(category.name)}
            >
              <div className={`${category.bgColor} ${category.color} bg-gradient-to-br p-6 rounded-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:shadow-lg`}>
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{category.courses} cours</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;