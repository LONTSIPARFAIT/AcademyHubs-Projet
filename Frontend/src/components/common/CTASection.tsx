import React from 'react';
import { Link } from 'react-router-dom';

const CTASection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          Prêt à commencer votre apprentissage ?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Rejoignez des milliers d'apprenants et développez vos compétences gratuitement
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
          >
            S'inscrire gratuitement
          </Link>
          <Link
            to="/paths"
            className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors duration-300"
          >
            Explorer les parcours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;