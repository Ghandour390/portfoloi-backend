# Modifications - Intégration Upload dans CreateDocument et UpdateDocument

## 🎯 Objectif

Intégrer l'upload de fichiers directement dans les mutations `createDocument` et `updateDocument` au lieu d'avoir une mutation séparée `uploadDocument`.

## ✅ Modifications effectuées

### 1. **GraphQL TypeDefs** (`document.typedefs.ts`)

#### Avant :
```graphql
type Mutation {
  uploadDocument(file: Upload!): Document!
  createDocument(input: DocumentInput!): Document!
  updateDocument(id: ID!, input: DocumentUpdateInput!): Document!
}

input DocumentInput {
  nom: String!
  urlStocket: String!
}
```

#### Après :
```graphql
type Mutation {
  # Create document with file upload (file is required, nom is optional)
  createDocument(file: Upload!, nom: String): Document!
  
  # Update document with optional file replacement
  updateDocument(id: ID!, file: Upload, nom: String): Document!
}

input DocumentInput {
  nom: String      # Optionnel maintenant
  urlStocket: String  # Optionnel maintenant
}
```

### 2. **Resolvers** (`document.resolvers.ts`)

#### `createDocument` resolver
- Accepte un fichier obligatoire (`file: Upload!`)
- Accepte un nom optionnel (`nom?: String`)
- Si `nom` n'est pas fourni, utilise le nom du fichier uploadé
- Upload automatique vers MinIO
- Création automatique de l'enregistrement DB

#### `updateDocument` resolver
- Accepte un fichier optionnel (`file?: Upload`)
- Accepte un nom optionnel (`nom?: String`)
- **Si un fichier est fourni** : remplace le fichier dans MinIO et met à jour l'URL
- **Si seul le nom est fourni** : met à jour uniquement les métadonnées sans toucher au fichier

### 3. **Service** (`document.service.ts`)

#### Méthode `createDocument()` - Modifiée
```typescript
async createDocument(userId: string, file: { filename: string; mimetype: string; stream: Readable }): Promise<IDocument>
```
- Ne prend plus un `Partial<IDocument>` mais directement un objet file
- Upload automatique vers MinIO
- Génère l'URL et crée le document

#### Méthode `updateDocument()` - Modifiée
```typescript
async updateDocument(userId: string, id: string, file: { filename: string; mimetype: string; stream: Readable }): Promise<IDocument>
```
- Upload le nouveau fichier vers MinIO
- Remplace l'URL dans la base de données
- Note: L'ancien fichier reste dans MinIO (pas de suppression automatique)

#### Nouvelle méthode `updateDocumentMetadata()`
```typescript
async updateDocumentMetadata(userId: string, id: string, data: { nom?: string }): Promise<IDocument>
```
- Met à jour uniquement les métadonnées (nom)
- Utilisée quand aucun fichier n'est fourni dans `updateDocument`

#### Méthode supprimée : `uploadAndCreateDocument()`
- Fusionnée avec `createDocument()`

## 📝 Exemples d'utilisation

### Créer un document avec upload

```graphql
mutation {
  createDocument(
    file: <UPLOAD_FILE>
    nom: "Rapport Q4 2024"
  ) {
    _id
    nom
    urlStocket
  }
}
```

Si `nom` n'est pas fourni, le nom du fichier sera utilisé.

### Mettre à jour uniquement le nom

```graphql
mutation {
  updateDocument(
    id: "673f12a45b8c9d001234abcd"
    nom: "Nouveau nom du document"
  ) {
    _id
    nom
    urlStocket
  }
}
```

### Remplacer le fichier ET le nom

```graphql
mutation {
  updateDocument(
    id: "673f12a45b8c9d001234abcd"
    file: <UPLOAD_FILE>
    nom: "Version 2 du rapport"
  ) {
    _id
    nom
    urlStocket
  }
}
```

### Remplacer uniquement le fichier (garde le nom actuel)

```graphql
mutation {
  updateDocument(
    id: "673f12a45b8c9d001234abcd"
    file: <UPLOAD_FILE>
  ) {
    _id
    nom
    urlStocket
  }
}
```

## 🔄 Flux de données

### CreateDocument
```
Client → Upload fichier
  ↓
Resolver → Extrait stream + metadata
  ↓
Service → Upload vers MinIO (putObject)
  ↓
Service → Génère URL presigned
  ↓
Service → Crée document dans MongoDB
  ↓
Client ← Retourne document avec URL
```

### UpdateDocument (avec fichier)
```
Client → Upload nouveau fichier
  ↓
Resolver → Vérifie propriété du document
  ↓
Service → Upload nouveau fichier vers MinIO
  ↓
Service → Génère nouvelle URL
  ↓
Service → Met à jour document dans MongoDB
  ↓
Client ← Retourne document mis à jour
```

### UpdateDocument (sans fichier)
```
Client → Envoie nouveau nom
  ↓
Resolver → Vérifie propriété du document
  ↓
Service → Met à jour uniquement metadata
  ↓
Client ← Retourne document mis à jour
```

## ⚠️ Points importants

1. **Ancien fichier non supprimé** : Lors du remplacement d'un fichier avec `updateDocument`, l'ancien fichier reste dans MinIO. Pour implémenter la suppression automatique :
   - Extraire l'ancien `objectName` de l'ancienne URL
   - Appeler `minioClient.removeObject(bucket, objectName)`

2. **Pattern de nommage** : Les fichiers sont stockés avec `{userId}/{timestamp}-{filename}`

3. **URLs presigned** : Par défaut, expire après 24h. Pour des URLs permanentes, configurez `MINIO_PUBLIC_URL` dans `.env`

4. **Validation** : Pas de validation de type MIME ou taille pour le moment (ajoutez selon vos besoins)

## 🚀 Prochaines améliorations possibles

1. **Suppression automatique** de l'ancien fichier lors du remplacement
2. **Validation** des types de fichiers acceptés
3. **Limite de taille** par type de fichier
4. **Compression** automatique des images
5. **Génération de thumbnails** pour les images
6. **Scan antivirus** des fichiers uploadés

## ✅ Tests à effectuer

```bash
# 1. Démarrer les services
docker compose up -d

# 2. Tester MinIO
npm run test:minio

# 3. Tester createDocument via GraphQL Playground
# 4. Tester updateDocument (avec et sans fichier)
# 5. Vérifier les fichiers dans MinIO Console (http://localhost:9001)
```

---

**Status**: ✅ Implémentation complète
**Date**: 31 octobre 2025
**Breaking Changes**: ⚠️ La signature de `createDocument` a changé (nécessite un fichier maintenant)
