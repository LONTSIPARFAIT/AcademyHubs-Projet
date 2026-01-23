import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Données des cours (vous pouvez déplacer ça dans un fichier séparé ou API)
  const allCourses = [
    {
      id: 1,
      title: 'Développement Web Fullstack',
      description: 'Maîtrisez HTML, CSS, JavaScript, Node.js et Tailwind pour créer des applications web complètes.',
      longDescription: 'Ce cours complet vous enseignera toutes les compétences nécessaires pour devenir un développeur web fullstack. Vous apprendrez à créer des sites web responsives avec HTML5 et CSS3, à ajouter de l\'interactivité avec JavaScript moderne, à construire des APIs avec Node.js et Express, et à gérer des bases de données. Le cours inclut 10 projets pratiques inspirés du marché camerounais.',
      category: 'Développement Web',
      level: 'Débutant',
      duration: '12 semaines',
      lessons: 45,
      students: 1200,
      rating: 4.8,
      reviews: 342,
      instructor: {
        name: 'Jean Dupont',
        bio: 'Développeur fullstack avec 8 ans d\'expérience, spécialisé dans les technologies web modernes. A formé plus de 2000 étudiants au Cameroun.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        courses: 5,
        rating: 4.9
      },
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4d0f5?auto=format&fit=crop&w=800&q=80',
      bannerImg: 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?auto=format&fit=crop&w=1600&q=80',
      tags: ['Frontend', 'Backend', 'Projet', 'Certification'],
      featured: true,
      new: true,
      syllabus: [
        {
          week: 1,
          title: 'Introduction au Web Development',
          lessons: 5,
          topics: ['Histoire du web', 'Outils de développement', 'HTML5 de base'],
          duration: '8 heures'
        },
        {
          week: 2,
          title: 'HTML5 Avancé et Sémantique',
          lessons: 4,
          topics: ['Balises sémantiques', 'Formulaires HTML5', 'Accessibilité'],
          duration: '6 heures'
        },
        {
          week: 3,
          title: 'CSS3 et Responsive Design',
          lessons: 6,
          topics: ['Flexbox', 'Grid CSS', 'Media Queries', 'Animations CSS'],
          duration: '10 heures'
        },
        {
          week: 4,
          title: 'JavaScript Fondamentaux',
          lessons: 5,
          topics: ['Variables et types', 'Fonctions', 'DOM Manipulation'],
          duration: '8 heures'
        },
        {
          week: 5,
          title: 'JavaScript Moderne (ES6+)',
          lessons: 4,
          topics: ['Promesses', 'Async/Await', 'Modules ES6'],
          duration: '7 heures'
        },
        {
          week: 6,
          title: 'Introduction à Node.js',
          lessons: 5,
          topics: ['Environnement Node', 'NPM', 'Serveur HTTP basique'],
          duration: '8 heures'
        },
        {
          week: 7,
          title: 'Express.js et REST APIs',
          lessons: 4,
          topics: ['Routing', 'Middleware', 'CRUD Operations'],
          duration: '7 heures'
        },
        {
          week: 8,
          title: 'Bases de Données avec MongoDB',
          lessons: 4,
          topics: ['Schémas MongoDB', 'Mongoose ODM', 'Relations'],
          duration: '7 heures'
        },
        {
          week: 9,
          title: 'Authentification et Sécurité',
          lessons: 4,
          topics: ['JWT', 'Bcrypt', 'Validation'],
          duration: '6 heures'
        },
        {
          week: 10,
          title: 'Projet Backend Complet',
          lessons: 3,
          topics: ['API pour application locale', 'Tests unitaires', 'Déploiement'],
          duration: '10 heures'
        },
        {
          week: 11,
          title: 'Révision et Projet Final',
          lessons: 2,
          topics: ['Best Practices', 'Optimisation', 'Présentation'],
          duration: '8 heures'
        }
      ],
      requirements: [
        'Ordinateur avec connexion internet',
        'Motivation et régularité',
        'Aucune connaissance préalable requise'
      ],
      outcomes: [
        'Créer des sites web responsives modernes',
        'Développer des applications fullstack',
        'Déployer des projets en production',
        'Travailler avec Git en équipe'
      ],
      resources: [
        'PDFs de cours téléchargeables',
        'Code source des projets',
        'Quiz interactifs',
        'Support communautaire'
      ]
    },
    {
      id: 2,
      title: 'Laravel & Développement Backend',
      description: 'Construisez des applications robustes adaptées au marché africain avec Laravel et MySQL.',
      longDescription: 'Apprenez à développer des applications web robustes avec Laravel, le framework PHP le plus populaire. Ce cours vous guidera de l\'installation de Laravel à la création d\'applications complètes avec authentification, APIs REST, et intégration avec les services africains de paiement.',
      category: 'Développement Web',
      level: 'Intermédiaire',
      duration: '10 semaines',
      lessons: 38,
      students: 850,
      rating: 4.9,
      reviews: 245,
      instructor: {
        name: 'Marie Kamga',
        bio: 'Développeuse backend spécialisée en PHP/Laravel. Fondatrice d\'une startup tech à Douala.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200&q=80',
        courses: 3,
        rating: 4.8
      },
      price: 0,
      discountedPrice: 0,
      img: 'https://images.unsplash.com/photo-1555066931-bf19c0fd1085?auto=format&fit=crop&w=800&q=80',
      bannerImg: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1600&q=80',
      tags: ['Backend', 'API', 'Base de données', 'PHP'],
      featured: true,
      new: false
    },
    // ... Ajoutez les autres cours ici
  ];

  // Simuler le chargement
  useEffect(() => {
    const foundCourse = allCourses.find(c => c.id === parseInt(id));
    setCourse(foundCourse);
    
    // Simuler un état d'inscription (à remplacer par votre logique d'authentification)
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    setEnrolled(enrolledCourses.includes(parseInt(id)));
    
    setLoading(false);
  }, [id]);

  const handleEnroll = () => {
    if (!enrolled) {
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      enrolledCourses.push(parseInt(id));
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
      setEnrolled(true);
    }
    navigate(`/learn/${id}/lesson/1`);
  }; 

  const handleToggleLesson = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
    // Mettre à jour la progression
    const totalLessons = course.lessons;
    const newProgress = ((completedLessons.length + 1) / totalLessons) * 100;
    setProgress(Math.min(newProgress, 100));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Cours non trouvé</h1>
        <Link to="/courses" className="text-indigo-600 hover:text-indigo-800">
          Retour aux cours
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0">
          <img
            src={course.bannerImg || course.img}
            alt={course.title}
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <nav className="flex items-center text-sm mb-6">
                <Link to="/" className="text-gray-300 hover:text-white">Accueil</Link>
                <span className="mx-2">/</span>
                <Link to="/courses" className="text-gray-300 hover:text-white">Cours</Link>
                <span className="mx-2">/</span>
                <span className="text-white">{course.title}</span>
              </nav>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
                  {course.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  course.level === 'Débutant' ? 'bg-green-600' :
                  course.level === 'Intermédiaire' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {course.level}
                </span>
                {course.new && (
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">
                    Nouveau
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm">
                  GRATUIT
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-400'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span>{course.rating} ({course.reviews} avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span>{course.lessons} leçons</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{course.students} étudiants</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleEnroll}
                  className={`px-8 py-3 rounded-lg font-bold text-lg ${
                    enrolled
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } transition-colors duration-300`}
                >
                  {enrolled ? 'Continuer le cours' : 'S\'inscrire gratuitement'}
                </button>
                <button className="px-8 py-3 border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                  Ajouter aux favoris
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
                <div className="relative mb-4">
                  <img
                    src={course.img}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                </div>
                
                <div className="space-y-4">
                  {enrolled && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Votre progression</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Prix :</span>
                      <span className="text-2xl font-bold text-green-400">GRATUIT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Durée :</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Niveau :</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Leçons :</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="font-bold mb-3">Ce cours comprend :</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Accès à vie</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Certificat de complétion</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Support communautaire</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Projets pratiques</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex flex-wrap -mb-px">
            {['overview', 'syllabus', 'instructor', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                {tab === 'overview' && 'Aperçu'}
                {tab === 'syllabus' && 'Programme'}
                {tab === 'instructor' && 'Instructeur'}
                {tab === 'reviews' && 'Avis'}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 dark:text-gray-300">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Description du cours</h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {course.longDescription || course.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Ce que vous apprendrez</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.outcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Prérequis</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                    {course.requirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Ressources incluses</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.resources?.map((resource, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Syllabus Tab */}
            {activeTab === 'syllabus' && course.syllabus && (
              <div className="space-y-4">
                {course.syllabus.map((week, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <button
                      className="w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => {
                        // Toggle week content
                        const element = document.getElementById(`week-${index}`);
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">
                            {week.week}
                          </span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold">{week.title}</h3>
                          <p className="text-sm text-gray-500">
                            {week.lessons} leçons • {week.duration}
                          </p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div id={`week-${index}`} className="hidden px-4 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="font-semibold mb-2">Sujets couverts :</h4>
                        <ul className="space-y-2">
                          {week.topics.map((topic, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Instructor Tab */}
            {activeTab === 'instructor' && course.instructor && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-start gap-6 mb-6">
                  <img
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{course.instructor.name}</h2>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(course.instructor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">
                        {course.instructor.rating} Note d'instructeur
                      </span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300">
                      {course.instructor.bio}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                      {course.instructor.courses}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cours</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                      {Math.floor(course.instructor.rating * 20)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{course.rating}/5</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Basé sur {course.reviews} avis
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      Laisser un avis
                    </button>
                  </div>
                  
                  {/* Review Stats */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex items-center w-10">
                          <span className="text-sm">{stars}</span>
                          <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${(stars / 5) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                          {Math.round((stars / 5) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                              {['JD', 'MK', 'SN'][review-1]}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold">{['Jean D.', 'Marie K.', 'Samuel N.'][review-1]}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">Il y a 2 semaines</span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {[
                          'Excellent cours ! Les projets sont très concrets et adaptés au marché local.',
                          'L\'instructeur est très pédagogue. Je recommande vivement.',
                          'Parfait pour débuter. Les explications sont claires et progressives.'
                        ][review-1]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Related Courses */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h3 className="text-xl font-bold mb-4">Cours similaires</h3>
              <div className="space-y-4">
                {allCourses
                  .filter(c => c.id !== course.id && c.category === course.category)
                  .slice(0, 3)
                  .map((relatedCourse) => (
                    <Link
                      key={relatedCourse.id}
                      to={`/courses/${relatedCourse.id}`}
                      className="block group"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-indigo-500 transition-colors duration-300">
                        <div className="relative h-32">
                          <img
                            src={relatedCourse.img}
                            alt={relatedCourse.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              relatedCourse.level === 'Débutant' ? 'bg-green-100 text-green-800' :
                              relatedCourse.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {relatedCourse.level}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-sm mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {relatedCourse.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{relatedCourse.duration}</span>
                            <div className="flex items-center gap-1">
                              <span>{relatedCourse.rating}</span>
                              <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              
              <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-lg p-4">
                <h4 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  Questions sur le cours ?
                </h4>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-3">
                  Rejoignez notre communauté pour poser vos questions et échanger avec d'autres apprenants.
                </p>
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:gap-3 transition-all duration-300"
                >
                  Rejoindre la communauté
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;