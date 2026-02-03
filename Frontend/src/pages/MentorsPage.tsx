import React from 'react';

const MentorsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Nos Mentors</h1>
      <p className="text-gray-600 mb-8">
        Bénéficiez de l'expertise de professionnels expérimentés dans leur domaine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder pour les mentors - à remplacer par des données réelles */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Jean Dupont</h3>
          <p className="text-gray-600 mb-2">Développeur Full-Stack</p>
          <p className="text-sm text-gray-500 mb-4">
            10 ans d'expérience en développement web
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Contacter
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Marie Martin</h3>
          <p className="text-gray-600 mb-2">Data Scientist</p>
          <p className="text-sm text-gray-500 mb-4">
            Spécialiste en machine learning
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Contacter
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Pierre Durand</h3>
          <p className="text-gray-600 mb-2">Designer UX/UI</p>
          <p className="text-sm text-gray-500 mb-4">
            Expert en expérience utilisateur
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Contacter
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;