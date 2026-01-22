import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';  // Assurez-vous que le chemin est correct
import Footer from '../Footer';  // Assurez-vous que le chemin est correct

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> {/* Affiche les composants enfants ici */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;