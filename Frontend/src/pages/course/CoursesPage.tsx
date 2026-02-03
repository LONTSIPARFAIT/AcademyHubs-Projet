// pages/course/CoursesPage.tsx
import React, { useState } from 'react';
import type { Course } from '../../types/course';
import {
  mockCourses,
  mockEnrolledStats,
  categoryOptions,
  levelOptions,
  durationOptions,
  mockSortOptions
} from '../../data';
import CourseSearchHeader from '../../components/common/CourseSearchHeader';
import CourseFilters from '../../components/common/CourseFilters';
import CourseCard from '../../components/common/CourseCard';
import Pagination from '../../components/common/Pagination';
import NoResults from '../../components/common/NoResults';
import Recommendations from '../../components/common/Recommendations';
import CTASection from '../../components/common/CTASection';

// Définir localement FilterSectionState
interface FilterSectionState {
  category: boolean;
  level: boolean;
  duration: boolean;
}

interface CourseHeaderProps {
  selectedCategory: string;
  filteredAndSortedCourses: Course[];
  sortBy: string;
  setSortBy: (value: string) => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({
  selectedCategory,
  filteredAndSortedCourses,
  sortBy,
  setSortBy
}) => (
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
          {mockSortOptions.map((option) => (
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
);

const CoursesPage = () => {
  // États pour les filtres
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [selectedLevel, setSelectedLevel] = useState<string>('Tous');
  const [selectedDuration, setSelectedDuration] = useState<string>('Toutes');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 9;

  // États pour les sections déroulantes des filtres
  const [openFilterSections, setOpenFilterSections] = useState<FilterSectionState>({
    category: true,
    level: true,
    duration: true
  });

  // Fonction pour basculer l'état d'une section de filtre
  const toggleFilterSection = (section: keyof FilterSectionState) => {
    setOpenFilterSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Filtrer les cours
  const filterCourses = (): Course[] => {
    return mockCourses.filter(course => {
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
  const sortCourses = (courses: Course[]): Course[] => {
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

  // Composant d'en-tête pour le contenu principal
  // const CourseHeader = () => (
  //   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
  //     <div>
  //       <h2 className="text-2xl font-bold">
  //         {selectedCategory === 'Toutes' ? 'Tous les cours' : selectedCategory}
  //       </h2>
  //       <p className="text-gray-600 dark:text-gray-400 mt-1">
  //         {filteredAndSortedCourses.length} cours disponibles
  //       </p>
  //     </div>

  //     <div className="flex items-center gap-4">
  //       <div className="flex items-center gap-2">
  //         <span className="text-sm text-gray-600 dark:text-gray-400">Trier par :</span>
  //         <select
  //           value={sortBy}
  //           onChange={(e) => setSortBy(e.target.value)}
  //           className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
  //         >
  //           {mockSortOptions.map((option) => (
  //             <option key={option.value} value={option.value}>
  //               {option.label}
  //             </option>
  //           ))}
  //         </select>
  //       </div>

  //       <div className="hidden sm:flex items-center gap-2">
  //         <span className="text-sm text-gray-600 dark:text-gray-400">Vue :</span>
  //         <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
  //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  //           </svg>
  //         </button>
  //         <button className="p-2 text-indigo-600 dark:text-indigo-400">
  //           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  //           </svg>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main className="flex-1">
        <CourseSearchHeader
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          enrolledStats={mockEnrolledStats}
          allCourses={mockCourses}
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
                categories={categoryOptions}
                levels={levelOptions}
                durations={durationOptions}
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
                        <CourseCard key={course.id} course={course} />
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
                    allCourses={mockCourses}
                    currentCourses={currentCourses}
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