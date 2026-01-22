import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
                        Bienvenue sur <span className="text-blue-600">AcademyHubs</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-8">
                        Découvrez une nouvelle façon d'apprendre et de développer vos compétences
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold mb-2">Cours Interactifs</h3>
                        <p className="text-gray-600">Apprenez à votre rythme avec nos cours en ligne de qualité.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <div className="text-4xl mb-4">👨‍🏫</div>
                        <h3 className="text-xl font-semibold mb-2">Experts Qualifiés</h3>
                        <p className="text-gray-600">Bénéficiez de l'expertise de professionnels reconnus.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-2">Objectifs Atteints</h3>
                        <p className="text-gray-600">Développez vos compétences et boostez votre carrière.</p>
                    </div>
                </div>

                <div className="space-x-4">
                    <Link
                        to="/courses"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
                    >
                        Explorer les Cours
                    </Link>
                    <Link
                        to="/about"
                        className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
                    >
                        En Savoir Plus
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;