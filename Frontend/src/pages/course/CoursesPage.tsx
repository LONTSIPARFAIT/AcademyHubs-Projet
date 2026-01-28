import React, { useState } from 'react';
import CourseSearchHeader from '../../components/course/CourseSearchHeader';
import CourseFilters from '../../components/course/CourseFilters';
import CourseCard from '../../components/course/CourseCard';
import CourseHeader from '../../components/course/CourseHeader';
import Pagination from '../../components/course/Pagination';
import NoResults from '../../components/course/NoResults';
import Recommendations from '../../components/course/Recommendations';
import CTASection from '../../components/course/CTASection';

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

  // Tous les cours disponibles
  const allCourses = [
    // ... (garder exactement le même tableau de 12 cours)
    // Copier-coller tous les cours ici
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
                <CourseHeader
                  selectedCategory={selectedCategory}
                  filteredAndSortedCourses={filteredAndSortedCourses}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />

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