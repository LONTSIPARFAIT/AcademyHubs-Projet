import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/common/HeroSection';
import CategoriesSection from '../components/common/CategoriesSection';
import TestimonialsSection from '../components/common/TestimonialsSection';
import FeaturesSection from '../components/common/FeaturesSection';
import CoursesPreviewSection from '../components/common/CoursesPreviewSection';
import CTASection from '../components/common/CTASection';


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
    'Développement Web Fullstack',
    'Laravel & Backend',
    'React & Next.js',
    'UI/UX Design',
    'DevOps & Cloud',
    'Mobile React Native'
  ];

  // Niveaux disponibles
  const niveaux = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

  const courses = [
    {
      title: 'Développement Web Fullstack',
      desc: 'Maîtrisez HTML, CSS, JavaScript, Node.js et Tailwind pour créer des applications web complètes.',
      level: 'Débutant',
      duration: '12 semaines',
      lessons: 45,
      students: 450,
      rating: 4.8,
      instructor: 'Jean Dupont',
      img: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4d0f5?auto=format&fit=crop&w=800&q=80',
      tags: ['Frontend', 'Backend', 'Projet'],
      formation: 'Développement Web Fullstack'
    },
    {
      title: 'Laravel & Développement Backend',
      desc: 'Construisez des applications robustes adaptées au marché africain avec Laravel et MySQL.',
      level: 'Intermédiaire',
      duration: '10 semaines',
      lessons: 38,
      students: 320,
      rating: 4.9,
      instructor: 'Marie Kamga',
      img: 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?auto=format&fit=crop&w=800&q=80',
      tags: ['Backend', 'API', 'Base de données'],
      formation: 'Laravel & Backend'
    },
    {
      title: 'React & Next.js Avancé',
      desc: 'Créez des applications React modernes avec Next.js 14, TypeScript et Tailwind CSS.',
      level: 'Avancé',
      duration: '8 semaines',
      lessons: 32,
      students: 280,
      rating: 4.7,
      instructor: 'Samuel Nkono',
      img: 'https://images.unsplash.com/photo-1633356122542-727a01e23861?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'TypeScript', 'Next.js'],
      formation: 'React & Next.js'
    },
    {
      title: 'UI/UX Design pour Débutants',
      desc: 'Apprenez les principes du design d\'interface et créez des expériences utilisateur exceptionnelles.',
      level: 'Débutant',
      duration: '6 semaines',
      lessons: 25,
      students: 190,
      rating: 4.6,
      instructor: 'Sarah Mbala',
      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
      tags: ['Design', 'Figma', 'Prototype'],
      formation: 'UI/UX Design'
    },
    {
      title: 'DevOps & Déploiement Cloud',
      desc: 'Déployez vos applications avec Docker, AWS et CI/CD pour le marché africain.',
      level: 'Intermédiaire',
      duration: '9 semaines',
      lessons: 35,
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

