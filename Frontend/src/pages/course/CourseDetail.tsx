import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useCourseDetail } from '../../hooks/useCourseDetail';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { course, loading, enrolled, isLoggedIn, toggleEnrollment } = useCourseDetail(id);

  const handleEnroll = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }

    toggleEnrollment();
    if (!enrolled) {
      navigate(`/learn/${id}/lesson/1`);
    }
  };

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleQuickRegister = () => {
    // Simulation d'inscription rapide
    const mockUser = {
      id: Date.now(),
      name: 'Nouvel utilisateur',
      email: 'user@example.com'
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    setShowLoginModal(false);
    // Recharger la page pour mettre à jour l'état de connexion
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Cours non trouvé</h1>
        <Link to="/courses" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
          Retour aux cours
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 text-white">
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
              <nav className="flex items-center text-sm mb-6 text-gray-300 dark:text-gray-400">
                <Link to="/" className="hover:text-white dark:hover:text-gray-200 transition-colors">Accueil</Link>
                <span className="mx-2">/</span>
                <Link to="/courses" className="hover:text-white dark:hover:text-gray-200 transition-colors">Cours</Link>
                <span className="mx-2">/</span>
                <span className="text-white dark:text-gray-200">{course.title}</span>
              </nav>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-600 dark:bg-indigo-700 rounded-full text-sm">
                  {course.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  course.level === 'Débutant' ? 'bg-green-600 dark:bg-green-700' :
                  course.level === 'Intermédiaire' ? 'bg-yellow-600 dark:bg-yellow-700' : 
                  'bg-red-600 dark:bg-red-700'
                }`}>
                  {course.level}
                </span>
                {course.new && (
                  <span className="px-3 py-1 bg-blue-600 dark:bg-blue-700 rounded-full text-sm">
                    Nouveau
                  </span>
                )}
                <span className="px-3 py-1 bg-purple-600 dark:bg-purple-700 rounded-full text-sm">
                  GRATUIT
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white dark:text-gray-100">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 dark:text-gray-300 mb-6">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8 text-gray-300 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-500'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white dark:text-gray-300">{course.rating} ({course.reviews} avis)</span>
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
                  className={`px-8 py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                    enrolled
                      ? 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
                      : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600'
                  }`}
                >
                  {enrolled ? 'Continuer le cours' : 'S\'inscrire gratuitement'}
                </button>
                
                {!isLoggedIn && !enrolled && (
                  <button
                    onClick={handleLogin}
                    className="px-8 py-3 border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-300"
                  >
                    Créer un compte
                  </button>
                )}
                
                <button className="px-8 py-3 border-2 border-white rounded-lg font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                  <span className="flex items-center gap-2">
                    Ajouter aux favoris
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </span>
                </button>
              </div>
              
              {/* Appel à l'action pour les non-connectés */}
              {!isLoggedIn && (
                <div className="mt-6 p-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-white/20 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Créez un compte gratuit pour commencer ce cours !</p>
                      <p className="text-sm text-gray-300 dark:text-gray-400 mt-1">
                        Suivez votre progression, obtenez un certificat et accédez à tous les cours.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
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
                        <span className="text-gray-300 dark:text-gray-300">Votre progression</span>
                        <span className="text-white dark:text-gray-100 font-medium">{Math.round(progress)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 dark:bg-gray-600 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 dark:bg-green-400 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2 text-gray-300 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>Prix :</span>
                      <span className="text-2xl font-bold text-green-400 dark:text-green-300">GRATUIT</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Durée :</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau :</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Leçons :</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700 dark:border-gray-600">
                    <h3 className="font-bold mb-3 text-white dark:text-gray-100">Ce cours comprend :</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                        <svg className="w-5 h-5 text-green-400 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Accès à vie</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                        <svg className="w-5 h-5 text-green-400 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Certificat de complétion</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                        <svg className="w-5 h-5 text-green-400 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Support communautaire</span>
                      </li>
                      <li className="flex items-center gap-2 text-gray-300 dark:text-gray-300">
                        <svg className="w-5 h-5 text-green-400 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Projets pratiques</span>
                      </li>
                    </ul>
                  </div>
                  
                  {!isLoggedIn && (
                    <div className="pt-4">
                      <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                      >
                        Créer un compte gratuit
                      </button>
                      <p className="text-center text-sm text-gray-300 dark:text-gray-400 mt-2">
                        30 secondes seulement
                      </p>
                    </div>
                  )}
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
                className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
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
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Description du cours</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {course.longDescription || course.description}
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Ce que vous apprendrez</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.outcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <svg className="w-6 h-6 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Prérequis</h2>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    {course.requirements?.map((req, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400"></div>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Ressources incluses</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.resources?.map((resource, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{resource}</span>
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
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <button
                      className="w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                      onClick={() => {
                        const element = document.getElementById(`week-${index}`);
                        if (element) {
                          element.classList.toggle('hidden');
                        }
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-gray-900 dark:text-gray-100">{week.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {week.topics.length} sujets
                          </p>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    <div id={`week-${index}`} className="hidden px-4 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Sujets couverts :</h4>
                        <ul className="space-y-2">
                          {week.topics.map((topic, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                              <svg className="w-4 h-4 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">{course.instructor.name}</h2>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(course.instructor.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
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
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
                      <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-gray-100">{course.rating}/5</h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
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
                    <button className="px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                      Laisser un avis
                    </button>
                  </div>
                  
                  {/* Review Stats */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <div className="flex items-center w-10">
                          <span className="text-sm text-gray-900 dark:text-gray-100">{stars}</span>
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
                          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400">
                              {['JD', 'MK', 'SN'][review-1]}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 dark:text-gray-100">{['Jean D.', 'Marie K.', 'Samuel N.'][review-1]}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Il y a 2 semaines</span>
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
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Cours similaires</h3>
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
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors duration-300 shadow-sm hover:shadow-md">
                        <div className="relative h-32">
                          <img
                            src={relatedCourse.img}
                            alt={relatedCourse.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 right-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              relatedCourse.level === 'Débutant' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                              relatedCourse.level === 'Intermédiaire' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                            }`}>
                              {relatedCourse.level}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-sm mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors text-gray-900 dark:text-gray-100">
                            {relatedCourse.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
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
              
              {/* Community CTA */}
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
              
              {/* Register CTA */}
              {!isLoggedIn && (
                <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-lg p-4 text-white">
                  <h4 className="font-bold mb-2">Prêt à commencer ?</h4>
                  <p className="text-sm mb-3 opacity-90">
                    Créez un compte gratuit en 30 secondes pour accéder à ce cours et tous les autres.
                  </p>
                  <button
                    onClick={handleLogin}
                    className="w-full py-2 bg-white text-indigo-600 dark:text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    S'inscrire maintenant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de connexion */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Créez votre compte gratuit
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Accès immédiat au cours
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Plus besoin de vous inscrire !
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleQuickRegister}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Créer un compte rapide
                </button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Ou
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    to="/register"
                    className="block w-full text-center py-3 border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors duration-300"
                  >
                    Inscription complète
                  </Link>
                  
                  <Link
                    to="/login"
                    className="block w-full text-center py-3 text-gray-700 dark:text-gray-300 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                  >
                    Déjà un compte ? Se connecter
                  </Link>
                </div>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <p>En créant un compte, vous acceptez nos conditions d'utilisation.</p>
                <p className="mt-1">Tous les cours sont et resteront 100% gratuits.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;