import React from 'react';

const Welcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur Mon Application</h1>
      <p className="text-lg mb-4">Ceci est la page d'accueil où vous pouvez découvrir nos fonctionnalités.</p>
      <p className="text-lg">Utilisez le menu pour naviguer vers d'autres sections.</p>
    </div>
  );
};

export default Welcome;