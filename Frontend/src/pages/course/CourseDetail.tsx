import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Course } from '../../types';
import api from '../../api/axios';
import { CourseSyllabus } from './CourseSyllabus';
import { useAuth } from '../../hooks/useAuth';
import { 
  ChevronLeft, 
  Clock, 
  BookOpen, 
  Award, 
  CheckCircle, 
  User, 
  AlertCircle, 
  Star, 
  Users,
  ArrowRight,
  PlayCircle
} from 'lucide-react';

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [similarCourses, setSimilarCourses] = useState<Course[]>([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await api.get(`/courses/${slug}`);
        setCourse(response.data);

        // On récupère le statut is_enrolled envoyé par le backend
        setIsEnrolled(response.data.is_enrolled); 
        
        // Récupérer les cours similaires après avoir le cours principal
        fetchSimilarCourses(response.data.category?.id);
      } catch (error) {
        console.error("Erreur lors de la récupération du cours", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseDetails();
  }, [slug]);

  const fetchSimilarCourses = async (categoryId?: number) => {
    if (!categoryId) return;
    
    setLoadingSimilar(true);
    try {
      const response = await api.get(`/courses?category_id=${categoryId}&limit=4`);
      setSimilarCourses(response.data.data || response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours similaires", error);
    } finally {
      setLoadingSimilar(false);
    }
  };

  useEffect(() => {
    if (course && user) {
      const checkEnrollment = user.enrolled_courses?.some((c: any) => c.id === course.id);
      setIsEnrolled(!!checkEnrollment);
    }
  }, [course, user]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      // Si l'utilisateur n'est pas connecté, on l'envoie au login
      navigate('/login');
      return;
    }

    setIsEnrolling(true);
    try {
      await api.post(`/courses/${course!.slug}/enroll`);
      setIsEnrolled(true);

      // REDIRECTION AUTOMATIQUE :
    // On cherche la toute première leçon du premier chapitre
      const firstLessonSlug = course?.section[0]?.lesson[0]?.slug;

      if(firstLessonSlug){
        navigate(`/watch/${firstLessonSlug}`);
      } else {
        alert('Félicitations ! Vous êtes maintenant inscrit à ce cours.');
      }
    } catch (err) {
      alert("Erreur lors de l'inscription");
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleCourseClick = (courseSlug: string) => {
    navigate(`/courses/${courseSlug}`);
  };

  // Loading State
  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-48 mb-8"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // Error State
  if (!course) return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertCircle className="w-12 h-12 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cours introuvable</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Le cours que vous recherchez n'existe pas ou a été déplacé.
        </p>
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <ChevronLeft className="w-5 h-5" />
          Retour aux cours
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8">
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour aux cours
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">{course.category?.name}</span>
            <span className="text-gray-400">/</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold truncate">{course.title}</span>
          </nav>

          {/* Course Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 font-medium text-sm mb-6">
              <BookOpen className="w-4 h-4" />
              {course.category?.name}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">{course.instructor?.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Instructeur certifié</p>
                </div>
              </div>
              
              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>12 heures</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.sections?.length || 0} modules</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Award className="w-5 h-5" />
                  <span>Certificat inclus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                À propos de ce cours
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-8">
                {course.description}
              </p>
              
              {/* What You'll Learn */}
              <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl p-6 border border-indigo-100/50 dark:border-indigo-800/30">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Ce que vous allez apprendre
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Maîtriser les concepts fondamentaux de {course.category?.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Syllabus */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700/50">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                  Programme de la formation
                </h2>
                <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 font-medium text-sm rounded-full">
                  {course.sections?.length || 0} modules • 24 leçons
                </span>
              </div>
              
              {course.sections && course.sections.length > 0 ? (
                <CourseSyllabus sections={course.sections} />
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Programme en préparation</h3>
                  <p className="text-gray-600 dark:text-gray-400">Le contenu détaillé sera disponible prochainement.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Enrollment Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700/50">
                <div className="text-center mb-8">
                  <div className="inline-flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">Gratuit</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">$99.99</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Accès illimité à vie</p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Durée totale</span>
                      <span className="font-semibold text-gray-900 dark:text-white">12h 30min</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Niveau</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Tous niveaux</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Langue</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Français</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 dark:text-gray-400">Certificat</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">Inclus</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (isEnrolled) {
                      // Si déjà inscrit, on cherche la première leçon pour rediriger
                      const firstLessonSlug = course?.sections?.[0]?.lessons?.[0]?.slug;
                      if (firstLessonSlug) {
                        navigate(`/watch/${firstLessonSlug}`);
                      }
                    } else {
                      // Sinon, on lance l'inscription
                      handleEnroll();
                    }
                  }}
                  disabled={isEnrolling}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group ${
                    isEnrolled
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:-translate-y-0.5'
                  } ${isEnrolling ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isEnrolling ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Traitement en cours...
                    </div>
                  ) : isEnrolled ? (
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-5 h-5" />
                      Accéder au cours
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      S'inscrire gratuitement
                    </div>
                  )}
                  <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold text-green-600 dark:text-green-400">4.8</span> • 1,245 étudiants satisfaits
                  </p>
                </div>
              </div>

              {/* Instructor Info */}
              <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700/50">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Votre instructeur
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{course.instructor?.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Expert senior</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">4.8</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {course.instructor?.bio || "Expert avec plus de 10 ans d'expérience dans le domaine. Passionné par le partage de connaissances."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Courses Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-3 h-10 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                Cours similaires
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Découvrez d'autres formations dans la même catégorie
              </p>
            </div>
            <button
              onClick={() => navigate(`/courses?category=${course.category?.slug}`)}
              className="hidden md:flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all duration-300"
            >
              Voir tous les cours
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {loadingSimilar ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : similarCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarCourses
                .filter(c => c.slug !== course.slug)
                .slice(0, 4)
                .map((similarCourse) => (
                  <div
                    key={similarCourse.id}
                    onClick={() => handleCourseClick(similarCourse.slug)}
                    className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                  >
                    {/* Course Image/Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-indigo-300 dark:text-indigo-600" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-full">
                          {similarCourse.category?.name}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-full">
                          {similarCourse.price === 0 ? 'GRATUIT' : `${similarCourse.price}€`}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-4 right-4">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <PlayCircle className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.floor(Math.random() * 1000) + 100} étudiants
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            4.{Math.floor(Math.random() * 9)}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {similarCourse.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {similarCourse.description?.substring(0, 80)}...
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {similarCourse.instructor?.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.floor(Math.random() * 8) + 4}h
                        </span>
                      </div>
                    </div>

                    {/* Hover Border Effect */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-indigo-200 dark:group-hover:border-indigo-800 transition-colors duration-300 pointer-events-none"></div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700/50">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Aucun cours similaire trouvé</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Explorez d'autres catégories pour découvrir plus de formations
              </p>
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Explorer tous les cours
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Mobile View All Button */}
          <div className="mt-8 md:hidden text-center">
            <button
              onClick={() => navigate(`/courses?category=${course.category?.slug}`)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Voir tous les cours similaires
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetail;