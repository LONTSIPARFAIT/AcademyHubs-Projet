// components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mon Application</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">Accueil</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">À propos</Link>
          </li>
          {/* Ajoutez d'autres liens ici */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;