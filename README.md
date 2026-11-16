# KoaSocial — Plateforme Sociale Professionnelle Centralisée

KoaSocial est un réseau social professionnel complet, moderne et évolutif, architecturé avec une séparation stricte entre le **Frontend** et le **Backend**, entièrement versionné dans ce dépôt GitHub centralisé.

---

## 🏗️ Architecture du Projet

```text
koasocial/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline CI/CD GitHub Actions (Tests Node.js + MySQL)
├── client/                    # Application Frontend SPA (HTML5, Tailwind CSS, JS)
│   ├── index.html
│   ├── css/
│   └── js/
├── server/                    # API Backend (Node.js, Express, Socket.io, MySQL)
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── tests/                 # Tests unitaires Jest
│   ├── database.sql           # Schéma de base de données MySQL
│   ├── package.json
│   └── server.js
├── .env.example               # Modèle des variables d'environnement
├── .gitignore                 # Exclusions Git
└── README.md
```

---

## 🚀 Guide d'Installation & Local Setup

### 1. Cloner le Dépôt
```bash
git clone https://github.com/votre-username/koasocial.git
cd koasocial
```

### 2. Configuration du Backend
```bash
cd server
npm install
cp ../.env.example .env
# Éditez le fichier .env avec vos identifiants de base de données MySQL locaux
```

### 3. Initialisation de la Base de Données MySQL
Exécutez le script SQL présent dans `server/database.sql` sur votre serveur MySQL :
```bash
mysql -u root -p < server/database.sql
```

### 4. Lancement du Serveur de Développement
```bash
npm run dev
```

### 5. Exécution des Tests Automatisés
```bash
npm test
```

---

## 🌐 Déploiement en Production (Séparation Frontend / Backend)

* **Frontend Statique :** Déployable sur Vercel, Netlify ou GitHub Pages (en servant le dossier `client/`).
* **Backend API & Temps Réel :** Hébergeable sur Render, Railway ou Fly.io (en exécutant le dossier `server/`).
* **Variables d'environnement :** Utilisez les **GitHub Actions Secrets** pour stocker les clés sensibles (`JWT_SECRET`, `DB_PASSWORD`).
