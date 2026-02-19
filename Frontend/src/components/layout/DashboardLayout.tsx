import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { BookOpen, Clock, Award, PlayCircle } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuthContext();

  return (
    <div className="space-y-8">
      {/* --- SECTION ENTETE --- */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bon retour, {user?.name} ! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Voici l'état actuel de votre apprentissage.
        </p>
      </div>

      {/* --- CARTES DE STATS --- */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Cours suivis</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-green-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Heures apprises</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                48h
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Certificats</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                3
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECTION CONTINUER LE COURS --- */}

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
          <PlayCircle size={20} className="text-indigo-600" />
          Continuer votre dernier cours
        </h2>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-48 h-32 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
            <img src="" alt="React" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white italic">
              Masterclass React & Laravel
            </h3>
            <p className="text-gray-500 text-sm">
              Leçon 8 : Les Relations Eloquent (65% complété)
            </p>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden mt-4">
              <div
                className="bg-indigo-600 h-full rounded-full"
                style={{ width: "65%" }}
              ></div>
            </div>
            <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
              Reprendre maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
