# Portfolio Backend API

API GraphQL pour la gestion de portfolio personnel avec authentification JWT et stockage de fichiers MinIO.

## 🚀 Fonctionnalités

- ✅ **Authentification JWT** avec rôles (admin, user, visiteur)
- ✅ **Gestion de profil utilisateur**
- ✅ **Réseaux sociaux**
- ✅ **Compétences**
- ✅ **Expériences professionnelles**
- ✅ **Formations**
- ✅ **Upload de documents vers MinIO**
- ✅ **GraphQL API** avec Apollo Server
- ✅ **MongoDB** pour la persistance des données
- ✅ **Docker Compose** pour l'environnement de développement

## 📋 Prérequis

- Node.js 18+ ou Docker
- MongoDB (fourni via Docker Compose)
- MinIO (fourni via Docker Compose)

## 🛠️ Installation

### Avec Docker (recommandé)

1. Cloner le repository
```bash
git clone <votre-repo>
cd portfolio-backend
```

2. Créer le fichier `.env.docker` (optionnel, déjà configuré)
```bash
cp .env.example .env.docker
```

3. Démarrer tous les services
```bash
docker compose up -d
```

4. L'API sera accessible à :
   - **GraphQL Playground**: http://localhost:4000/graphql
   - **MinIO Console**: http://localhost:9001 (admin/password)
   - **MailDev**: http://localhost:1080

### Sans Docker (développement local)

1. Installer les dépendances
```bash
npm install
```

2. Créer le fichier `.env`
```bash
cp .env.example .env
# Éditer .env avec vos configurations
```

3. Démarrer MongoDB et MinIO localement (ou via Docker)
```bash
docker compose up -d mongo minio
```

4. Démarrer le serveur de développement
```bash
npm run dev
```

## 🧪 Tests

### Tester la connexion MinIO
```bash
npm run test:minio
```

Ce script vérifie :
- La connexion au serveur MinIO
- La création du bucket
- L'upload/download de fichiers
- La génération d'URLs presigned

## 📚 Documentation

- **[Guide d'upload MinIO](./MINIO_UPLOAD_GUIDE.md)** - Documentation complète sur l'upload de fichiers
- **[Résumé de l'implémentation](./MINIO_IMPLEMENTATION_SUMMARY.md)** - Détails techniques de l'intégration MinIO

## 🔐 Authentification

### Créer un compte
```graphql
mutation {
  createUser(input: {
    nom: "Doe"
    prenom: "John"
    email: "john@example.com"
    password: "motdepasse123"
    dateNaissance: "1990-01-01"
    adresse: "123 Rue Example"
    biographie: "Développeur full-stack"
    role: USER
  }) {
    accessToken
    refreshToken
    user {
      id
      email
      role
    }
  }
}
```

### Se connecter
```graphql
mutation {
  login(input: {
    email: "john@example.com"
    password: "motdepasse123"
  }) {
    accessToken
    refreshToken
    user {
      id
      email
      role
    }
  }
}
```

### Utiliser le token
Dans les requêtes suivantes, ajouter le header :
```
Authorization: Bearer <votre_access_token>
```

## 📁 Structure du projet

```
portfolio-backend/
├── src/
│   ├── modules/
│   │   ├── user/           # Gestion des utilisateurs
│   │   ├── social/         # Réseaux sociaux
│   │   ├── competence/     # Compétences
│   │   ├── experience/     # Expériences
│   │   ├── formation/      # Formations
│   │   └── document/       # Documents (upload MinIO)
│   ├── shared/
│   │   ├── auth.ts         # Authentification & autorisation
│   │   ├── types.ts        # Types partagés
│   │   └── minioClient.ts  # Client MinIO
│   ├── config/
│   │   └── database.ts     # Configuration MongoDB
│   └── app.ts              # Point d'entrée Apollo Server
├── docker-compose.yml      # Services Docker
├── Dockerfile              # Image Docker de l'app
└── package.json
```

## 📖 Exemples d'utilisation

### Upload d'un document
```graphql
mutation createDocument($file: Upload!, $nom: String) {
  createDocument(file: $file, nom: $nom) {
    _id
    nom
    urlStocket
    userId
  }
}
```

### Récupérer ses documents
```graphql
query {
  getUserDocuments {
    _id
    nom
    urlStocket
  }
}
```

### Ajouter une expérience
```graphql
mutation {
  createExperience(input: {
    titre: "Développeur Full-Stack"
    entreprise: "Tech Corp"
    description: "Développement d'applications web"
    dateDebut: "2020-01-01"
    dateFin: "2023-12-31"
  }) {
    _id
    titre
    entreprise
  }
}
```

### Consulter un profil (public)
```graphql
query {
  user(id: "USER_ID") {
    nom
    prenom
    biographie
  }
  
  userExperiences(userId: "USER_ID") {
    titre
    entreprise
  }
  
  userFormations(userId: "USER_ID") {
    diplome
    ecole
  }
}
```

## 🔒 Sécurité

- Les mutations de création/modification/suppression nécessitent une authentification
- Les queries de consultation sont publiques (accessibles aux visiteurs)
- Les fichiers uploadés sont stockés avec le pattern `{userId}/{timestamp}-{filename}`
- Les tokens JWT ont une durée de vie configurable

## 🌐 Variables d'environnement

Voir `.env.example` pour la liste complète des variables.

Principales variables :
```bash
# MongoDB
MONGO_URI=mongodb://localhost:27017/portfolio

# JWT
ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRES=15m

# MinIO
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=documents

# Server
PORT=4000
```

## 🐳 Services Docker

Le `docker-compose.yml` fournit :
- **portfolio-backend** - API Node.js/TypeScript
- **mongo** - Base de données MongoDB
- **redis** - Cache Redis (optionnel)
- **minio** - Stockage de fichiers S3-compatible
- **maildev** - Serveur SMTP de développement

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 Licence

ISC

## 👤 Auteur

Votre Nom

---

**Status**: ✅ En développement actif
**Version**: 1.0.0
