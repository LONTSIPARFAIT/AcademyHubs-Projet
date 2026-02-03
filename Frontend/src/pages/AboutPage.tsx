import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">À propos d'AcademyHubs</h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notre Mission</h2>
          <p className="text-gray-600 mb-4">
            AcademyHubs est une plateforme d'apprentissage en ligne dédiée à l'accompagnement
            des professionnels et étudiants dans leur développement de compétences.
            Nous croyons que l'éducation de qualité devrait être accessible à tous.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ce que nous offrons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Cours de Qualité</h3>
              <p className="text-gray-600">
                Des cours créés par des experts dans leur domaine, avec un contenu
                actualisé régulièrement.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Parcours Structurés</h3>
              <p className="text-gray-600">
                Des parcours d'apprentissage complets pour maîtriser de nouvelles
                compétences de A à Z.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Mentorat Personnalisé</h3>
              <p className="text-gray-600">
                Bénéficiez de l'accompagnement de mentors expérimentés pour
                accélérer votre apprentissage.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">Communauté Active</h3>
              <p className="text-gray-600">
                Rejoignez une communauté d'apprenants et partagez vos expériences.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Notre Équipe</h2>
          <p className="text-gray-600">
            Une équipe passionnée composée de développeurs, designers et pédagogues
            travaillant ensemble pour créer la meilleure expérience d'apprentissage possible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;