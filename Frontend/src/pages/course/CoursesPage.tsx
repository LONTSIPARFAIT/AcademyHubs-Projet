import { useState, useMemo } from 'react';
import { allCourses } from '../../data/courses';
import { CourseCard } from '../../components/common/CourseCard';
import type { Course } from '../../types';

const CoursesPage = () => {
  // --- ÉTATS ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedLevel, setSelectedLevel] = useState('Tous');
  const [sortBy, setSortBy] = useState('popularity');

  // --- LOGIQUE DE FILTRE DYNAMIQUE ---
  // On récupère les catégories uniques directement depuis tes données
  const categories = useMemo(() => 
    ['Toutes', ...new Set(allCourses.map(c => c.category))], 
  []);

  const filteredCourses = useMemo(() => {
    let result = allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Toutes' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Tri
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'newest') result.sort((a, b) => b.id - a.id); // Simule le plus récent
    
    return result;
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header de la page */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            Catalogue des Formations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Découvrez nos cours gratuits et commencez votre aventure dans la tech dès aujourd'hui.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* --- BARRE LATÉRALE DE FILTRES (Sidebar) --- */}
          <aside className="w-full lg:w-64 space-y-8">
            {/* Recherche */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Recherche</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Chercher un cours..."
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Catégories */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Catégories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category 
                        ? 'bg-indigo-600 text-white font-bold' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Niveaux */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Niveau</h3>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-none"
              >
                {['Tous', 'Débutant', 'Intermédiaire', 'Avancé'].map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* --- GRILLE DE COURS --- */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">{filteredCourses.length}</span> formations disponibles
              </p>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 outline-none cursor-pointer"
              >
                <option value="popularity">Plus populaires</option>
                <option value="rating">Mieux notés</option>
                <option value="newest">Plus récents</option>
              </select>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Aucun cours ne correspond à vos filtres. 
                  <button onClick={() => {setSearchTerm(''); setSelectedCategory('Toutes'); setSelectedLevel('Tous');}} className="ml-2 text-indigo-600 font-bold hover:underline">
                    Réinitialiser
                  </button>
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;