# AcademyHubs - Frontend

Plateforme d'apprentissage en ligne moderne développée avec React, TypeScript et Vite.

## 🚀 Technologies utilisées

- **React 19** - Bibliothèque JavaScript pour les interfaces utilisateur
- **TypeScript** - JavaScript avec typage statique
- **Vite** - Outil de build rapide et moderne
- **TailwindCSS** - Framework CSS utilitaire
- **React Router** - Routage côté client
- **Axios** - Client HTTP pour les appels API
- **ESLint** - Linting du code

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── common/         # Composants communs
│   ├── layout/         # Layouts (Header, Footer, etc.)
│   └── ui/             # Composants UI de base
├── pages/              # Pages de l'application
│   ├── auth/           # Pages d'authentification
│   └── course/         # Pages liées aux cours
├── hooks/              # Hooks personnalisés
├── context/            # Contextes React
├── data/               # Données mockées
├── types/              # Types TypeScript
└── assets/             # Assets statiques
```

## 🛠️ Installation et développement

### Prérequis

- Node.js (version 18+)
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build
npm run preview

# Linter le code
npm run lint
```

## 📋 Fonctionnalités

- ✅ Authentification utilisateur (login/register)
- ✅ Affichage des cours et détails
- ✅ Parcours d'apprentissage
- ✅ Page mentors
- ✅ Page à propos
- ✅ Page contact avec formulaire
- ✅ Layout responsive
- ✅ Gestion d'état avec Context API
- ✅ Hooks personnalisés

## 🔧 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la build de production
- `npm run lint` - Vérifie le code avec ESLint

## 🌐 API

L'application communique avec le backend Laravel via des appels API REST. Les endpoints sont configurés dans les services appropriés.

## 📝 Notes de développement

- Les données mockées sont utilisées pour le développement
- L'authentification est simulée avec localStorage
- Le styling utilise TailwindCSS avec des classes utilitaires
- Les types TypeScript sont définis dans le dossier `types/`

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request
