# Résumé des modifications - Intégration MinIO

## ✅ Modifications effectuées

### 1. **Dépendances ajoutées**
- `minio@^7.1.3` - Client MinIO pour Node.js
- `graphql-upload@^13.0.0` - Support des uploads de fichiers dans GraphQL
- `@types/graphql-upload` (dev) - Types TypeScript pour graphql-upload

### 2. **Nouveaux fichiers créés**

#### `src/shared/minioClient.ts`
- Configuration du client MinIO
- Fonction `ensureBucket()` pour créer le bucket automatiquement
- Fonction `getPublicUrlForObject()` pour générer des URLs d'accès aux fichiers
- Utilise les variables d'environnement pour la configuration

#### `src/types/graphql-upload.d.ts`
- Déclarations TypeScript pour le module graphql-upload
- Définit les types FileUpload et UploadOptions

#### `MINIO_UPLOAD_GUIDE.md`
- Documentation complète de l'utilisation
- Exemples avec cURL, Postman, Apollo Client
- Guide de dépannage

### 3. **Fichiers modifiés**

#### `package.json`
- Ajout de `minio` et `graphql-upload` dans les dépendances

#### `src/app.ts`
- Import de `graphqlUploadExpress` et `GraphQLUpload`
- Ajout du middleware `graphqlUploadExpress()` avant GraphQL
- Enregistrement du scalar `Upload` dans les resolvers Apollo

#### `src/modules/document/graphql/document.typedefs.ts`
- Ajout du scalar `Upload`
- Nouvelle mutation `uploadDocument(file: Upload!): Document!`

#### `src/modules/document/graphql/document.resolvers.ts`
- Nouveau resolver `uploadDocument` qui :
  - Vérifie l'authentification
  - Extrait le fichier du stream GraphQL
  - Appelle `ensureBucket()` pour créer le bucket si nécessaire
  - Délègue l'upload au service via `uploadAndCreateDocument()`

#### `src/modules/document/service/document.service.ts`
- Nouvelle méthode `uploadAndCreateDocument()` qui :
  - Upload le fichier vers MinIO avec `putObject()`
  - Génère une URL d'accès (presigned ou publique)
  - Crée un enregistrement dans MongoDB avec les métadonnées

#### `.env.docker`
- Ajout des variables de configuration MinIO :
  - `MINIO_ENDPOINT=minio`
  - `MINIO_USE_SSL=false`
  - `MINIO_ACCESS_KEY=admin`
  - `MINIO_SECRET_KEY=password`
  - `MINIO_BUCKET=documents`

#### `.env.example`
- Documentation des variables d'environnement MinIO pour référence

### 4. **Docker Compose**
Le service MinIO était déjà présent dans `docker-compose.yml` :
- Port API: 9000
- Console Web: 9001
- Volume persistant: `minio-data`

## 🚀 Comment utiliser

### Démarrer les services
```bash
docker compose up -d
```

### Tester l'upload avec cURL
```bash
curl http://localhost:4000/graphql \
  -F operations='{ "query": "mutation ($file: Upload!) { uploadDocument(file: $file) { _id nom urlStocket } }", "variables": { "file": null } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@./test.pdf \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Accéder à MinIO Console
Ouvrez http://localhost:9001 dans votre navigateur :
- Username: `admin`
- Password: `password`

## 📝 Mutations et Queries disponibles

### `uploadDocument` (nouvelle)
Upload un fichier et crée automatiquement le document dans la DB.

### `createDocument`
Crée un document avec une URL existante (sans upload).

### `updateDocument`
Met à jour les métadonnées d'un document.

### `deleteDocument`
Supprime un document de la DB (le fichier reste dans MinIO).

### `getUserDocuments`
Récupère tous les documents de l'utilisateur connecté.

### `getDocument`
Récupère un document par son ID.

## 🔒 Sécurité

- Toutes les mutations nécessitent un JWT valide
- Les fichiers sont stockés avec le pattern : `{userId}/{timestamp}-{filename}`
- Par défaut, les URLs sont presigned (expiration 24h)
- Pour des URLs publiques, configurez `MINIO_PUBLIC_URL`

## 🎯 Prochaines étapes possibles

1. **Validation des fichiers** : Ajouter validation du type MIME, taille max, etc.
2. **Suppression des fichiers** : Supprimer aussi de MinIO lors du `deleteDocument`
3. **Thumbnails** : Générer des miniatures pour les images
4. **Streaming** : Implémenter le streaming pour les gros fichiers
5. **Permissions** : Contrôle d'accès plus fin (public/privé)

## 🐛 Problèmes connus

- Les URLs presigned expirent après 24h par défaut
- Pas de nettoyage automatique des fichiers orphelins
- Pas de limite de taille de fichier côté serveur (seulement côté middleware)

---

**Status**: ✅ Implémentation complète et fonctionnelle
**Testé**: ⏳ En attente de tests manuels
**Documentation**: ✅ Complète (voir MINIO_UPLOAD_GUIDE.md)
