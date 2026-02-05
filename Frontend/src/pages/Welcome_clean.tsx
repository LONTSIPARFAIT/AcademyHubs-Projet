import { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/common/HeroSection';
import CategoriesSection from '../components/common/CategoriesSection';
import TestimonialsSection from '../components/common/TestimonialsSection';
import FeaturesSection from '../components/common/FeaturesSection';
import CoursesPreviewSection from '../components/common/CoursesPreviewSection';
import CTASection from '../components/common/CTASection';
import {
  mockCourses,
  mockWelcomeStats,
  welcomeCategories,
  mockTestimonials,
  mockFeatures,
  mockFormations,
  mockNiveaux
} from '../data';

const Welcome = () => {
  // État pour les statistiques animées
  const [stats, setStats] = useState(mockWelcomeStats);

  // Animation des statistiques
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeStudents: prev.activeStudents + Math.floor(Math.random() * 10)
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // États pour les filtres des cours
  const [selectedFormation, setSelectedFormation] = useState('Toutes');
  const [selectedLevel, setSelectedLevel] = useState('Tous');

  // Gestionnaire pour les clics sur les catégories
  const handleCategoryClick = (categoryName: string) => {
    setSelectedFormation(categoryName);
  };

  // Réinitialisation des filtres
  const resetFilters = () => {
    setSelectedFormation('Toutes');
    setSelectedLevel('Tous');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="flex-1">
        <HeroSection stats={stats} />
        <CategoriesSection categories={welcomeCategories} onCategoryClick={handleCategoryClick} />
        <TestimonialsSection testimonials={mockTestimonials} />
        <FeaturesSection features={mockFeatures} />
        <CoursesPreviewSection
          courses={mockCourses}
          selectedFormation={selectedFormation}
          selectedLevel={selectedLevel}
          formations={mockFormations}
          niveaux={mockNiveaux}
          onFormationChange={setSelectedFormation}
          onLevelChange={setSelectedLevel}
          onResetFilters={resetFilters}
        />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Welcome;