// components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">🎓 AcademyHubs</h3>
            <p className="text-gray-400">
              Votre plateforme d'apprentissage en ligne pour développer vos compétences et atteindre vos objectifs professionnels.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition duration-300">Accueil</a></li>
              <li><a href="/courses" className="text-gray-400 hover:text-white transition duration-300">Cours</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition duration-300">À propos</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: contact@academyhubs.com</p>
            <p className="text-gray-400">Téléphone: +33 1 23 45 67 89</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📘 Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">🐦 Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">📷 Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">&copy; 2026 AcademyHubs. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;