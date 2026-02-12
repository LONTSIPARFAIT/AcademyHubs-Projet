import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Le style de l'éditeur
import api from '../../api/client';
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // On envoie les données à ton Laravel
      const response = await api.post('/courses', {
        title,
        description, // Le HTML de Quill est ici
        category_id: categoryId,
        slug: title.toLowerCase().replace(/ /g, '-'), // Génération simple du slug
      });
      
      alert('Cours créé avec succès !');
      navigate('/courses');
    } catch (err) {
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm mt-10">
      <h1 className="text-3xl font-black mb-8">Créer un nouveau cours</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Titre du cours</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent"
            placeholder="Ex: Apprendre React 19"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Description (Contenu riche)</label>
          {/* L'éditeur de texte style DevInsto */}
          <div className="bg-white text-black rounded-xl overflow-hidden border border-gray-200">
            <ReactQuill 
              theme="snow" 
              value={description} 
              onChange={setDescription} 
              placeholder="Écrivez le contenu ici..."
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
        >
          Enregistrer le cours
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
