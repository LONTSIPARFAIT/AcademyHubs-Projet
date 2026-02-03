import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../data';

const Welcome = () => {
  const [stats, setStats] = useState({
    activeStudents: 1200,
    courses: 45,
    hours: 280,
    successRate: 92
  });

  // Animation pour les statistiques
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeStudents: prev.activeStudents + Math.floor(Math.random() * 10)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // États pour les filtres
  const [selectedFormation, setSelectedFormation] = useState('Toutes');
  const [selectedLevel, setSelectedLevel] = useState('Tous');

  // Formations disponibles
  const formations = [
    'Toutes',
    'Développement Web',
    'Design',
    'DevOps',
    'Mobile',
    'Data Science',
    'Maintenance IT',
    'Multimédia'
  ];

  // Niveaux disponibles
  const niveaux = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

  // Filtrer les cours depuis mockCourses
  const filteredCourses = mockCourses.filter(course => {
    const matchesFormation = selectedFormation === 'Toutes' || course.category === selectedFormation;
    const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
    return matchesFormation && matchesLevel;
  });

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedFormation('Toutes');
    setSelectedLevel('Tous');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${(i * 23) % 100}%`,
                  top: `${(i * 31) % 100}%`,
                  animationDelay: `${(i * 0.5) % 5}s`,
                  animationDuration: `${10 + (i * 0.5) % 10}s`
                }}
              />
            ))}
          </div>

          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
              alt="Apprenants en développement web"
              className="w-full h-full object-cover opacity-15"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-6 animate-fade-in text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-medium">+{stats.activeStudents} apprenants actifs</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6 animate-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Deviens Développeur
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                au Cameroun
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
              Formations 100% gratuites • Projets concrets du marché local • Certifications reconnues • Communauté active
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {[
                { label: 'Apprenants', value: `${stats.activeStudents}+`, color: 'text-green-400' },
                { label: 'Cours', value: `${stats.courses}+`, color: 'text-blue-400' },
                { label: 'Heures', value: `${stats.hours}+`, color: 'text-purple-400' },
                { label: 'Réussite', value: `${stats.successRate}%`, color: 'text-yellow-400' }
              ].map((stat, i) => (
                <div key={i} className="text-center p-2 sm:p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <Link
                to="/register"
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Commencer gratuitement
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/courses"
                className="group border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Explorer les cours
              </Link>
            </div>

            <div className="mt-8 md:mt-10 text-gray-300 animate-fade-in" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="text-yellow-400 text-base sm:text-lg">★</div>
                  ))}
                </div>
                <span className="font-medium text-sm sm:text-base">4.8/5 sur 320 avis</span>
              </div>
              <p className="text-xs sm:text-sm">Recommandé par 95% de nos apprenants</p>
            </div>
          </div>
        </section>

        {/* Section des cours filtrés */}
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Formation
                    </label>
                    <div className="relative">
                      <select
                        value={selectedFormation}
                        onChange={(e) => setSelectedFormation(e.target.value)}
                        className="w-full sm:w-64 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        {formations.map((formation, index) => (
                          <option key={index} value={formation}>
                            {formation}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Niveau
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full sm:w-48 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        {niveaux.map((niveau, index) => (
                          <option key={index} value={niveau}>
                            {niveau}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
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
                    onClick={resetFilters}
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
                {filteredCourses.map((course, i) => (
                  <div
                    key={i}
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <img
                        src={course.img}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          course.level === 'Débutant' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                          course.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">
                          {course.category.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, j) => (
                              <div key={j} className={j < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}>
                                ★
                              </div>
                            ))}
                          </div>
                          <span className="text-sm font-medium ml-1">{course.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500">{course.students} étudiants</span>
                      </div>

                      <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.tags.map((tag, j) => (
                          <span key={j} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                              {typeof course.instructor === 'string' ? course.instructor.split(' ').map(n => n[0]).join('') : course.instructor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {typeof course.instructor === 'string' ? course.instructor : course.instructor.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500">{course.duration} • {course.lessons} leçons</div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                >
                  Réinitialiser les filtres
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Welcome;
