// components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">🎓 AcademyHubs</div>
          <span className="text-sm opacity-90">Plateforme d'apprentissage</span>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-yellow-300 transition duration-300 font-medium">Accueil</Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-yellow-300 transition duration-300 font-medium">Cours</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-300 transition duration-300 font-medium">À propos</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-yellow-300 transition duration-300 font-medium">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;