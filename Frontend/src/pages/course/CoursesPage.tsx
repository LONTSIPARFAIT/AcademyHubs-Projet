import React, { useState } from 'react';
import CourseSearchHeader from '../../components/common/CourseSearchHeader';
import CourseFilters from '../../components/common/CourseFilters';
import CourseCard from '../../components/common/CourseCard';
import Pagination from '../../components/common/Pagination';
import NoResults from '../../components/common/NoResults';
import Recommendations from '../../components/common/Recommendations';
import CTASection from '../../components/common/CTASection';

const CoursesPage = () => {
  // États pour les filtres
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [selectedLevel, setSelectedLevel] = useState('Tous');
  const [selectedDuration, setSelectedDuration] = useState('Toutes');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  // États pour les sections déroulantes des filtres
  const [openFilterSections, setOpenFilterSections] = useState({
    category: true,
    level: true,
    duration: true
  });

  // Statistiques de progression
  const [enrolledStats] = useState({
    enrolled: 342,
    completed: 28,
    inProgress: 156,
    certificates: 15
  });

  // Tous les cours disponibles (copier-coller les 12 cours d'origine)
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

  // Fonction pour basculer l'état d'une section de filtre
  const toggleFilterSection = (section: 'category' | 'level' | 'duration') => {
    setOpenFilterSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filtrer les cours
  const filterCourses = () => {
    return allCourses.filter(course => {
      const matchesCategory = selectedCategory === 'Toutes' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
      const matchesDuration = selectedDuration === 'Toutes' || 
        (selectedDuration === 'Court (< 6 semaines)' && parseInt(course.duration) < 6) ||
        (selectedDuration === 'Moyen (6-10 semaines)' && parseInt(course.duration) >= 6 && parseInt(course.duration) <= 10) ||
        (selectedDuration === 'Long (> 10 semaines)' && parseInt(course.duration) > 10);
      const matchesSearch = searchTerm === '' || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesLevel && matchesDuration && matchesSearch;
    });
  };

  // Trier les cours
  const sortCourses = (courses: typeof allCourses) => {
    const sorted = [...courses];
    
    switch(sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
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
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Rendu des badges de niveau
  const renderLevelBadge = (level: string) => {
    const config = {
      'Débutant': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100', text: 'Débutant' },
      'Intermédiaire': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100', text: 'Intermédiaire' },
      'Avancé': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100', text: 'Avancé' }
    };
    
    const { color, text } = config[level as keyof typeof config] || config['Débutant'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
        {text}
      </span>
    );
  };

  // Rendu des étoiles de notation
  const renderStars = (rating: number) => {
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

  // Composant d'en-tête pour le contenu principal
  const CourseHeader = () => (
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
            <option value="popularity">Popularité</option>
            <option value="rating">Meilleures notes</option>
            <option value="newest">Plus récents</option>
            <option value="students">Plus d'étudiants</option>
            <option value="duration">Durée</option>
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex-1">
        <CourseSearchHeader
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          enrolledStats={enrolledStats}
          allCourses={allCourses}
        />

        <section className="py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <CourseFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                openFilterSections={openFilterSections}
                toggleFilterSection={toggleFilterSection}
                filteredAndSortedCourses={filteredAndSortedCourses}
                currentPage={currentPage}
                totalPages={totalPages}
                resetFilters={resetFilters}
                setCurrentPage={setCurrentPage}
              />

              <div className="lg:w-3/4">
                <CourseHeader />

                {currentCourses.length > 0 ? (
                  <>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {currentCourses.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          renderLevelBadge={renderLevelBadge}
                          renderStars={renderStars}
                        />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                    />
                  </>
                ) : (
                  <NoResults resetFilters={resetFilters} />
                )}

                {currentCourses.length > 0 && (
                  <Recommendations
                    allCourses={allCourses}
                    currentCourses={currentCourses}
                    renderLevelBadge={renderLevelBadge}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </main>
    </div>
  );
};

export default CoursesPage;