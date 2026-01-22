import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CoursesPage = () => {
  // États pour les filtres
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedLevel, setSelectedLevel] = useState('Tous');
  const [selectedDuration, setSelectedDuration] = useState('Toutes');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  // Statistiques de progression
  const [enrolledStats, setEnrolledStats] = useState({
    enrolled: 342,
    completed: 28,
    inProgress: 156,
    certificates: 15
  });

  // Tous les cours disponibles
  const allCourses = [
    {
      id: 1,
      title: 'Développement Web Fullstack',
      description: 'Maîtrisez HTML, CSS, JavaScript, Node.js et Tailwind pour créer des applications web complètes.',
      category: 'Développement Web',
      level: 'Débutant',
      duration: '12 semaines',
      lessons: 45,
      students: 1200,
      rating: 4.8,
      instructor: 'Jean Dupont',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4d0f5?auto=format&fit=crop&w=800&q=80',
      tags: ['Frontend', 'Backend', 'Projet', 'Certification'],
      featured: true,
      new: true,
      progress: 0
    },
    {
      id: 2,
      title: 'Laravel & Développement Backend',
      description: 'Construisez des applications robustes adaptées au marché africain avec Laravel et MySQL.',
      category: 'Développement Web',
      level: 'Intermédiaire',
      duration: '10 semaines',
      lessons: 38,
      students: 850,
      rating: 4.9,
      instructor: 'Marie Kamga',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?auto=format&fit=crop&w=800&q=80',
      tags: ['Backend', 'API', 'Base de données'],
      featured: true,
      new: false,
      progress: 0
    },
    {
      id: 3,
      title: 'React & Next.js Avancé',
      description: 'Créez des applications React modernes avec Next.js 14, TypeScript et Tailwind CSS.',
      category: 'Développement Web',
      level: 'Avancé',
      duration: '8 semaines',
      lessons: 32,
      students: 720,
      rating: 4.7,
      instructor: 'Samuel Nkono',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1633356122542-727a01e23861?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'TypeScript', 'Next.js'],
      featured: true,
      new: true,
      progress: 0
    },
    {
      id: 4,
      title: 'UI/UX Design pour Débutants',
      description: 'Apprenez les principes du design d\'interface et créez des expériences utilisateur exceptionnelles.',
      category: 'Design',
      level: 'Débutant',
      duration: '6 semaines',
      lessons: 25,
      students: 680,
      rating: 4.6,
      instructor: 'Sarah Mbala',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      tags: ['Design', 'Figma', 'Prototype'],
      featured: false,
      new: true,
      progress: 0
    },
    {
      id: 5,
      title: 'DevOps & Déploiement Cloud',
      description: 'Déployez vos applications avec Docker, AWS et CI/CD pour le marché africain.',
      category: 'DevOps',
      level: 'Intermédiaire',
      duration: '9 semaines',
      lessons: 35,
      students: 540,
      rating: 4.8,
      instructor: 'Paul Owono',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      tags: ['DevOps', 'Cloud', 'Docker'],
      featured: false,
      new: false,
      progress: 0
    },
    {
      id: 6,
      title: 'Mobile avec React Native',
      description: 'Développez des applications mobiles cross-platform pour le marché camerounais.',
      category: 'Mobile',
      level: 'Intermédiaire',
      duration: '11 semaines',
      lessons: 40,
      students: 490,
      rating: 4.5,
      instructor: 'Lisa Ndifor',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      tags: ['Mobile', 'React Native', 'iOS/Android'],
      featured: false,
      new: false,
      progress: 0
    },
    {
      id: 7,
      title: 'HTML & CSS Fondamentaux',
      description: 'Apprenez les bases du développement web avec HTML5 et CSS3.',
      category: 'Développement Web',
      level: 'Débutant',
      duration: '4 semaines',
      lessons: 20,
      students: 2100,
      rating: 4.7,
      instructor: 'Jean Dupont',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      tags: ['HTML', 'CSS', 'Responsive'],
      featured: false,
      new: false,
      progress: 0
    },
    {
      id: 8,
      title: 'JavaScript Moderne',
      description: 'Maîtrisez JavaScript ES6+, les APIs modernes et les concepts avancés.',
      category: 'Développement Web',
      level: 'Intermédiaire',
      duration: '8 semaines',
      lessons: 30,
      students: 1650,
      rating: 4.8,
      instructor: 'Jean Dupont',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'ES6+', 'Async'],
      featured: true,
      new: false,
      progress: 0
    },
    {
      id: 9,
      title: 'Figma Avancé',
      description: 'Créez des prototypes interactifs et des design systems professionnels.',
      category: 'Design',
      level: 'Avancé',
      duration: '5 semaines',
      lessons: 18,
      students: 320,
      rating: 4.9,
      instructor: 'Sarah Mbala',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
      tags: ['Figma', 'Prototype', 'Design System'],
      featured: false,
      new: true,
      progress: 0
    },
    {
      id: 10,
      title: 'Python pour la Data Science',
      description: 'Analysez des données et créez des modèles prédictifs avec Python.',
      category: 'Data Science',
      level: 'Intermédiaire',
      duration: '10 semaines',
      lessons: 42,
      students: 890,
      rating: 4.7,
      instructor: 'David Nkem',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Data', 'Machine Learning'],
      featured: true,
      new: false,
      progress: 0
    },
    {
      id: 11,
      title: 'Maintenance Informatique',
      description: 'Apprenez le dépannage et la maintenance des équipements informatiques.',
      category: 'Maintenance IT',
      level: 'Débutant',
      duration: '7 semaines',
      lessons: 28,
      students: 430,
      rating: 4.6,
      instructor: 'Pierre Mbarga',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      tags: ['Hardware', 'Réseau', 'Dépannage'],
      featured: false,
      new: true,
      progress: 0
    },
    {
      id: 12,
      title: 'Montage Vidéo avec Premiere Pro',
      description: 'Créez des vidéos professionnelles avec Adobe Premiere Pro.',
      category: 'Multimédia',
      level: 'Intermédiaire',
      duration: '8 semaines',
      lessons: 32,
      students: 380,
      rating: 4.5,
      instructor: 'Clara Fotso',
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=800&q=80',
      tags: ['Vidéo', 'Adobe', 'Montage'],
      featured: false,
      new: false,
      progress: 0
    }
  ];

  // Catégories disponibles
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

  // Niveaux disponibles
  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

  // Durées disponibles
  const durations = ['Toutes', 'Court (< 6 semaines)', 'Moyen (6-10 semaines)', 'Long (> 10 semaines)'];

  // Options de tri
  const sortOptions = [
    { value: 'popularity', label: 'Popularité' },
    { value: 'rating', label: 'Meilleures notes' },
    { value: 'newest', label: 'Plus récents' },
    { value: 'students', label: 'Plus d\'étudiants' },
    { value: 'duration', label: 'Durée' }
  ];

  // Filtrer les cours
  const filterCourses = () => {
    return allCourses.filter(course => {
      // Filtre par catégorie
      const matchesCategory = selectedCategory === 'Toutes' || course.category === selectedCategory;
      
      // Filtre par niveau
      const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
      
      // Filtre par durée
      const matchesDuration = selectedDuration === 'Toutes' || 
        (selectedDuration === 'Court (< 6 semaines)' && parseInt(course.duration) < 6) ||
        (selectedDuration === 'Moyen (6-10 semaines)' && parseInt(course.duration) >= 6 && parseInt(course.duration) <= 10) ||
        (selectedDuration === 'Long (> 10 semaines)' && parseInt(course.duration) > 10);
      
      // Filtre par recherche
      const matchesSearch = searchTerm === '' || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesLevel && matchesDuration && matchesSearch;
    });
  };

  // Trier les cours
  const sortCourses = (courses) => {
    const sorted = [...courses];
    
    switch(sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => b.new - a.new);
      case 'students':
        return sorted.sort((a, b) => b.students - a.students);
      case 'duration':
        return sorted.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
      case 'popularity':
      default:
        return sorted;
    }
  };

  // Appliquer filtres et tri
  const filteredAndSortedCourses = sortCourses(filterCourses());

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredAndSortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCategory('Toutes');
    setSelectedLevel('Tous');
    setSelectedDuration('Toutes');
    setSortBy('popularity');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Gérer la recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Rendu des badges de niveau
  const renderLevelBadge = (level) => {
    const config = {
      'Débutant': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', text: 'Débutant' },
      'Intermédiaire': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100', text: 'Intermédiaire' },
      'Avancé': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100', text: 'Avancé' }
    };
    
    const { color, text } = config[level] || config['Débutant'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
        {text}
      </span>
    );
  };

  // Rendu des étoiles de notation
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-400">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">

      <main className="flex-1">
        {/* Hero Section de la page des cours */}
        <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
              alt="Étudiants suivant des cours en ligne"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                  Catalogue des Cours
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Découvrez tous nos cours 100% gratuits et commencez votre apprentissage dès aujourd'hui
              </p>

              {/* Barre de recherche */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un cours, une technologie, un instructeur..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Statistiques rapides */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-1">{allCourses.length}</div>
                  <div className="text-sm text-white/80">Cours disponibles</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-1">{enrolledStats.enrolled}</div>
                  <div className="text-sm text-white/80">Étudiants inscrits</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-1">{enrolledStats.certificates}</div>
                  <div className="text-sm text-white/80">Certifications</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-white/80">Gratuits</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section des filtres et contenu */}
        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar des filtres */}
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

              {/* Contenu principal */}
              <div className="lg:w-3/4">
                {/* En-tête avec options de tri */}
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

                {/* Liste des cours */}
                {currentCourses.length > 0 ? (
                  <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentCourses.map((course) => (
                        <div
                          key={course.id}
                          className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-500"
                        >
                          {/* Image du cours */}
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={course.img}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                              {course.new && (
                                <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                                  Nouveau
                                </span>
                              )}
                              {course.featured && (
                                <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                                  Populaire
                                </span>
                              )}
                            </div>
                            
                            <div className="absolute top-3 right-3">
                              {renderLevelBadge(course.level)}
                            </div>
                            
                            {/* Badge gratuit */}
                            <div className="absolute bottom-3 left-3">
                              <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                                GRATUIT
                              </span>
                            </div>
                          </div>

                          {/* Contenu du cours */}
                          <div className="p-5">
                            {/* Catégorie */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {course.category}
                              </span>
                              <div className="flex items-center gap-1">
                                {renderStars(course.rating)}
                              </div>
                            </div>

                            {/* Titre */}
                            <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                              <Link to={`/courses/${course.id}`}>
                                {course.title}
                              </Link>
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                              {course.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {course.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Infos supplémentaires */}
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span>{course.lessons} leçons</span>
                              </div>
                            </div>

                            {/* Instructeur et étudiants */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs">
                                    {course.instructor.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-600 dark:text-gray-400">{course.instructor}</span>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-500">{course.students} étudiants</div>
                              </div>
                            </div>

                            {/* Bouton d'action */}
                            <div className="mt-4">
                              <Link
                                to={`/courses/${course.id}`}
                                className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                              >
                                Démarrer le cours
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <nav className="flex items-center gap-2">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-lg ${
                              currentPage === 1
                                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>

                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                  currentPage === pageNum
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}

                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-lg ${
                              currentPage === totalPages
                                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  /* Aucun résultat */
                  <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="text-gray-400 dark:text-gray-500 mb-4">
                      <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
                      Aucun cours trouvé
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                      Aucun cours ne correspond à vos critères de recherche. Essayez de modifier vos filtres ou votre recherche.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}

                {/* Section de recommandations */}
                {currentCourses.length > 0 && (
                  <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6">Vous pourriez aussi aimer</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allCourses
                        .filter(course => course.featured && course.id !== currentCourses[0]?.id)
                        .slice(0, 3)
                        .map((course) => (
                          <div
                            key={course.id}
                            className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={course.img}
                                alt={course.title}
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-bold text-sm mb-1 line-clamp-2">{course.title}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                  {renderLevelBadge(course.level)}
                                  <span className="text-xs text-gray-500">{course.duration}</span>
                                </div>
                                <Link
                                  to={`/courses/${course.id}`}
                                  className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline"
                                >
                                  Voir le cours →
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à commencer votre apprentissage ?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'apprenants et développez vos compétences gratuitement
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                S'inscrire gratuitement
              </Link>
              <Link
                to="/paths"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors duration-300"
              >
                Explorer les parcours
              </Link>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default CoursesPage;