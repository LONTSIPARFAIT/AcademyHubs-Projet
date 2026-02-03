import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  imageSideContent?: ReactNode;
  showSocialButtons?: boolean;
  showTerms?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  imageSideContent,
  showSocialButtons = true,
  showTerms = true,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="flex min-h-screen">
        {/* Colonne de gauche - Image et présentation */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 min-h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
              alt="Étudiants en développement web"
              className="w-full h-full object-cover object-center opacity-30"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
          
          <div className="relative z-10 flex flex-col p-12 w-full h-full">
            {/* Logo et titre en haut */}
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">AcademyHub</span>
              </Link>
              
              {/* Contenu personnalisable */}
              {imageSideContent || (
                <div className="max-w-lg">
                  <h1 className="text-3xl font-bold text-white mb-4">
                    Démarrez votre carrière dans le développement
                  </h1>
                  
                  <p className="text-lg text-blue-200">
                    Formations gratuites et projets pratiques pour devenir développeur professionnel au Cameroun
                  </p>
                </div>
              )}
            </div>

            {/* Statistiques placées après pour rester en bas */}
            <div className="mt-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-blue-200">Gratuit</div>
                </div>
                <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
                  <div className="text-2xl font-bold text-white mb-1">45+</div>
                  <div className="text-sm text-blue-200">Cours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne de droite - Formulaire */}
        <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-8 min-h-screen">
          {/* En-tête pour mobile */}
          <div className="lg:hidden mb-6">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">AcademyHub</span>
            </Link>
            
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Pour desktop, le titre et sous-titre sont centrés */}
          <div className="hidden lg:flex flex-col items-center mb-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Formulaire centré verticalement */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Carte du formulaire */}
              <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-6 sm:p-8">
                {children}
              </div>

              {/* Sécurité et mentions légales */}
              {showTerms && (
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    <svg className="inline w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z" />
                    </svg>
                    Données sécurisées et cryptées • Aucune carte bancaire requise
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;