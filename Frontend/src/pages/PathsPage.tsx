import React from 'react';

const PathsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Parcours d'Apprentissage</h1>
      <p className="text-gray-600 mb-8">
        Découvrez nos parcours structurés pour maîtriser de nouvelles compétences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder pour les parcours - à remplacer par des données réelles */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Développement Web</h3>
          <p className="text-gray-600 mb-4">
            Apprenez HTML, CSS, JavaScript et les frameworks modernes.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Commencer
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Data Science</h3>
          <p className="text-gray-600 mb-4">
            Maîtrisez Python, les statistiques et l'analyse de données.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Commencer
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Design UX/UI</h3>
          <p className="text-gray-600 mb-4">
            Créez des interfaces utilisateur intuitives et attrayantes.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Commencer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PathsPage;