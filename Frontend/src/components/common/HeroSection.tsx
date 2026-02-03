import React from 'react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  stats: {
    activeStudents: number;
    courses: number;
    hours: number;
    successRate: number;
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({ stats }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${(i * 23) % 100}%`,
              top: `${(i * 31) % 100}%`,
              animationDelay: `${(i * 0.5) % 5}s`,
              animationDuration: `${10 + (i * 0.5) % 10}s`
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
  );
};

export default HeroSection;