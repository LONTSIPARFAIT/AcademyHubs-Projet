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
        <TestimonialsSection testimonials={mockTestimonials} />
        <FeaturesSection features={mockFeatures} />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Welcome;
      students: 210,
      rating: 4.8,
      instructor: 'Paul Owono',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
      tags: ['DevOps', 'Cloud', 'Docker'],
      formation: 'DevOps & Cloud'
    },
    {
      title: 'Mobile avec React Native',
      desc: 'Développez des applications mobiles cross-platform pour le marché camerounais.',
      level: 'Intermédiaire',
      duration: '11 semaines',
      lessons: 40,
      students: 180,
      rating: 4.5,
      instructor: 'Lisa Ndifor',
      img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      tags: ['Mobile', 'React Native', 'iOS/Android'],
      formation: 'Mobile React Native'
    },
    {
      title: 'HTML & CSS Fondamentaux',
      desc: 'Apprenez les bases du développement web avec HTML5 et CSS3.',
      level: 'Débutant',
      duration: '4 semaines',
      lessons: 20,
      students: 510,
      rating: 4.7,
      instructor: 'Jean Dupont',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      tags: ['HTML', 'CSS', 'Responsive'],
      formation: 'Développement Web Fullstack'
    },
    {
      title: 'JavaScript Moderne',
      desc: 'Maîtrisez JavaScript ES6+, les APIs modernes et les concepts avancés.',
      level: 'Intermédiaire',
      duration: '8 semaines',
      lessons: 30,
      students: 380,
      rating: 4.8,
      instructor: 'Jean Dupont',
      img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
      tags: ['JavaScript', 'ES6+', 'Async'],
      formation: 'Développement Web Fullstack'
    },
    {
      title: 'Figma Avancé',
      desc: 'Créez des prototypes interactifs et des design systems professionnels.',
      level: 'Avancé',
      duration: '5 semaines',
      lessons: 18,
      students: 120,
      rating: 4.9,
      instructor: 'Sarah Mbala',
      img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80',
      tags: ['Figma', 'Prototype', 'Design System'],
      formation: 'UI/UX Design'
    }
  ];

  // Filtrer les cours
  const filteredCourses = courses.filter(course => {
    const matchesFormation = selectedFormation === 'Toutes' || course.formation === selectedFormation;
    const matchesLevel = selectedLevel === 'Tous' || course.level === selectedLevel;
    return matchesFormation && matchesLevel;
  });

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedFormation('Toutes');
    setSelectedLevel('Tous');
  };

  const learningPaths = [
    {
      title: 'Développeur Web Fullstack',
      duration: '6 mois',
      courses: 4,
      jobs: ['Développeur Fullstack', 'Frontend Engineer', 'Backend Developer'],
      icon: '💻'
    },
    {
      title: 'Designer UI/UX',
      duration: '4 mois',
      courses: 3,
      jobs: ['UI Designer', 'UX Researcher', 'Product Designer'],
      icon: '🎨'
    },
    {
      title: 'DevOps Engineer',
      duration: '5 mois',
      courses: 3,
      jobs: ['DevOps Engineer', 'Cloud Architect', 'SRE'],
      icon: '⚙️'
    }
  ];

  // Catégories de formations
  const formationCategories = [
    {
      title: 'Développement Web',
      description: 'Devenez développeur web fullstack avec HTML, CSS, JavaScript et frameworks modernes',
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      courses: 8
    },
    {
      title: 'Graphisme & Design',
      description: 'Maîtrisez le design UI/UX, la création graphique et les outils professionnels',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      courses: 6
    },
    {
      title: 'Maintenance IT',
      description: 'Apprenez la maintenance informatique, le dépannage et la gestion de réseau',
      icon: '🔧',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      courses: 5
    },
    {
      title: 'Montage Vidéo',
      description: 'Créez des vidéos professionnelles avec les techniques de montage et trucage',
      icon: '🎬',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      courses: 4
    }
  ];

  // Témoignages
  const testimonials = [
    {
      name: 'Kevin M.',
      role: 'Développeur Fullstack',
      company: 'Startup Tech, Douala',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'Grâce à AcademyHub, j\'ai pu décrocher mon premier emploi en 4 mois seulement. Les projets concrets m\'ont donné confiance.',
      improvement: '+85% de salaire'
    },
    {
      name: 'Amina B.',
      role: 'UI/UX Designer',
      company: 'Agence Digitale, Yaoundé',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80',
      quote: 'La communauté m\'a énormément aidée. Les mentors sont disponibles et les projets sont réalistes.',
      improvement: 'Promotion en 3 mois'
    },
    {
      name: 'Samuel T.',
      role: 'DevOps Engineer',
      company: 'Banque Internationale',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      quote: 'Les cours sur le cloud et DevOps étaient parfaits pour le marché africain. Je recommande à 100%.',
      improvement: 'Certification AWS obtenue'
    }
  ];

  // FAQ
  const faqs = [
    {
      q: 'Les cours sont-ils vraiment gratuits ?',
      a: 'Oui, tous nos cours sont 100% gratuits et le resteront. Nous croyons en l\'accès libre à l\'éducation tech en Afrique.'
    },
    {
      q: 'Les certificats sont-ils reconnus ?',
      a: 'Nos certificats sont reconnus par plusieurs entreprises partenaires au Cameroun et en Afrique francophone.'
    },
    {
      q: 'Quel est le rythme recommandé ?',
      a: 'Nous recommandons 5-10h par semaine. Nos cours sont conçus pour être suivis en parallèle d\'études ou d\'un emploi.'
    },
    {
      q: 'Y a-t-il un accompagnement ?',
      a: 'Oui, vous aurez accès à une communauté active, des mentors et des sessions de questions-réponses hebdomadaires.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 10}s`
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

        {/* Catégories de Formations */}
        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-400">
                  Catégories de Formations
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez nos principales catégories de formations spécialisées
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {formationCategories.map((formation, i) => (
                <div
                  key={i}
                  className={`group ${formation.bgColor} p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${formation.color} flex items-center justify-center text-2xl`}>
                      {formation.icon}
                    </div>
                    <h3 className="text-xl font-bold">{formation.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {formation.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formation.courses} cours disponibles
                    </span>
                    <Link
                      to={`/courses?category=${formation.title.toLowerCase()}`}
                      className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      Voir →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Parcours d'apprentissage */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Parcours Certifiants
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Suivez un parcours structuré pour atteindre vos objectifs professionnels
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {learningPaths.map((path, i) => (
                <div
                  key={i}
                  className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                >
                  <div className="text-3xl mb-4">{path.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{path.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-600 dark:text-gray-400">Durée : {path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{path.courses} cours</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Débouchés :</h4>
                    <div className="flex flex-wrap gap-1">
                      {path.jobs.map((job, j) => (
                        <span key={j} className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs rounded-full">
                          {job}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    to={`/paths/${path.title.toLowerCase().replace(/ /g, '-')}`}
                    className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold text-sm hover:gap-2 transition-all duration-300"
                  >
                    Découvrir ce parcours
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catalogue des cours avec filtres */}
        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Nos Cours par Formation
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explorez nos cours organisés par formation. Utilisez les filtres pour affiner votre recherche.
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
                  {/* Filtre Formation */}
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

                  {/* Filtre Niveau */}
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

              {/* Boutons d'action filtres */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>
                    Filtres actifs: {selectedFormation !== 'Toutes' && 'Formation'} {selectedLevel !== 'Tous' && 'Niveau'}
                  </span>
                </div>

                {(selectedFormation !== 'Toutes' || selectedLevel !== 'Tous') && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            </div>

            {/* Liste des cours filtrés */}
            {filteredCourses.length > 0 ? (
              <>
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
                            {course.formation.split(' ')[0]}
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
                          {course.desc}
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
                                {course.instructor.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{course.instructor}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">{course.duration} • {course.lessons} leçons</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    to="/courses"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Voir tous les cours
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </>
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

        {/* Témoignages */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Ils ont Réussi
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez les parcours inspirants de nos anciens apprenants
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-base">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{testimonial.role}</p>
                      <p className="text-gray-500 dark:text-gray-500 text-xs">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-4">"{testimonial.quote}"</p>
                  <div className="px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-green-700 dark:text-green-300 text-sm font-medium">{testimonial.improvement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                  Questions Fréquentes
                </span>
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-700"
                >
                  <h3 className="font-bold text-base sm:text-lg mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
              alt="Développeur motivé"
              className="w-full h-full object-cover opacity-10"
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Prêt à Transformer
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                Ta Carrière ?
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
              Rejoignez la première communauté de développeurs camerounais et accédez à toutes nos formations gratuitement.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/register"
                className="group bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="relative flex items-center justify-center gap-2">
                  Commencer gratuitement
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link
                to="/contact"
                className="border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                Nous contacter
              </Link>
            </div>

            <div className="mt-8 md:mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Support 7j/7', value: 'WhatsApp & Forum' },
                { label: 'Projets', value: '20+ réels' },
                { label: 'Mentors', value: '15 experts' },
                { label: 'Entreprises', value: '30+ partenaires' }
              ].map((item, i) => (
                <div key={i} className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
                  <div className="text-lg sm:text-xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-xs sm:text-sm text-white/70">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Welcome;