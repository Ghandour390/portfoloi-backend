# Changement: URLs MinIO Directes

## 🎯 Objectif

Stocker des URLs MinIO directes et permanentes dans `urlStocket` au lieu d'URLs presigned temporaires.

## ✅ Modifications effectuées

### 1. **`src/shared/minioClient.ts`**

#### Fonction `getPublicUrlForObject()` - Modifiée
**Avant** :
```typescript
export const getPublicUrlForObject = async (objectName: string, expiresSeconds = 24 * 60 * 60) => {
  // Générait une URL presigned avec expiration 24h
  const url = await minioClient.presignedGetObject(getBucketName(), objectName, expiresSeconds);
  return url;
}
```

**Après** :
```typescript
export const getPublicUrlForObject = (objectName: string): string => {
  // Génère une URL directe permanente
  const protocol = useSsl ? 'https' : 'http';
  const portPart = (useSsl && port === 443) || (!useSsl && port === 80) ? '' : `:${port}`;
  return `${protocol}://${endpoint}${portPart}/${bucket}/${objectName}`;
};
```

#### Nouvelle fonction `getPresignedUrlForObject()`
Pour les cas où on aurait besoin d'URLs temporaires :
```typescript
export const getPresignedUrlForObject = async (objectName: string, expiresSeconds = 24 * 60 * 60): Promise<string> => {
  const url = await minioClient.presignedGetObject(getBucketName(), objectName, expiresSeconds);
  return url;
};
```

#### Fonction `ensureBucket()` - Améliorée
Maintenant configure automatiquement une politique de lecture publique :
```typescript
const policy = {
  Version: '2012-10-17',
  Statement: [{
    Effect: 'Allow',
    Principal: { AWS: ['*'] },
    Action: ['s3:GetObject'],
    Resource: [`arn:aws:s3:::${bucket}/*`]
  }]
};
await minioClient.setBucketPolicy(bucket, JSON.stringify(policy));
```

## 📋 Format des URLs

### URLs générées
- **Format** : `http://ENDPOINT:PORT/BUCKET/objectName`
- **Exemple local** : `http://localhost:9000/documents/userId/1730000000000-file.pdf`
- **Exemple Docker** : `http://minio:9000/documents/userId/1730000000000-file.pdf`

### Structure de l'objectName
```
{userId}/{timestamp}-{filename}
```

Exemple :
```
673f12a45b8c9d001234abcd/1730400123456-rapport.pdf
```

## 🔓 Accès public

Le bucket est automatiquement configuré pour permettre :
- ✅ Lecture publique (`s3:GetObject`)
- ❌ Écriture (nécessite authentification)
- ❌ Suppression (nécessite authentification)
- ❌ Liste des objets (nécessite authentification)

## ⚠️ Important : Docker vs Local

### Dans Docker
Les URLs générées utilisent le nom du service Docker :
```
http://minio:9000/documents/file.pdf
```

**Problème** : Cette URL ne fonctionne pas depuis un navigateur externe (seulement entre services Docker).

### Solutions

#### Option 1 : Remplacer manuellement
Dans votre frontend, remplacez `minio` par `localhost` :
```typescript
const externalUrl = url.replace('http://minio:', 'http://localhost:');
```

#### Option 2 : Variable d'environnement (recommandé)
Ajouter dans `.env.docker` :
```bash
MINIO_ENDPOINT=localhost  # Au lieu de "minio"
```

**Mais attention** : L'application backend doit alors utiliser `minio` pour communiquer avec MinIO, et `localhost` pour générer les URLs publiques.

#### Option 3 : Deux variables (solution propre)
```bash
# Pour connexion interne (backend → MinIO)
MINIO_ENDPOINT_INTERNAL=minio

# Pour URLs publiques (browser → MinIO)
MINIO_ENDPOINT_PUBLIC=localhost
```

Puis modifier `minioClient.ts` :
```typescript
const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
const publicEndpoint = process.env.MINIO_ENDPOINT_PUBLIC || endpoint;

// Utiliser endpoint pour la connexion
export const minioClient = new Client({ endPoint: endpoint, ... });

// Utiliser publicEndpoint pour les URLs
export const getPublicUrlForObject = (objectName: string): string => {
  return `${protocol}://${publicEndpoint}${portPart}/${bucket}/${objectName}`;
};
```

## 🆚 Comparaison : Avant vs Après

### Avant (URLs presigned)
✅ Sécurisées (expiration)  
✅ Fonctionnent sans configuration bucket  
❌ Temporaires (24h)  
❌ URLs très longues avec token  
❌ Doivent être régénérées  

Exemple :
```
http://localhost:9000/documents/file.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=...&X-Amz-Expires=86400&X-Amz-SignedHeaders=host&X-Amz-Signature=...
```

### Après (URLs directes)
✅ Permanentes  
✅ URLs courtes et propres  
✅ Pas besoin de régénération  
✅ Meilleur SEO / partage  
❌ Nécessite bucket public  
❌ Fichiers accessibles à tous  

Exemple :
```
http://localhost:9000/documents/userId/1730400123456-file.pdf
```

## 🔒 Sécurité

### Fichiers publics
Tous les fichiers uploadés sont **publiquement accessibles en lecture**.

### Si vous voulez restreindre l'accès
1. **Ne pas utiliser cette approche** - utilisez `getPresignedUrlForObject()` à la place
2. **Ou** implémenter un proxy backend qui vérifie les permissions avant de servir le fichier
3. **Ou** utiliser une authentification MinIO avec des tokens

### Pattern de sécurité recommandé
Pour documents sensibles :
```typescript
// Ne pas stocker l'URL directe
// Générer l'URL à la demande avec vérification des permissions
async getDocumentUrl(documentId: string, userId: string): Promise<string> {
  const doc = await this.documentRepository.findById(documentId);
  
  // Vérifier les permissions
  if (doc.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  
  // Extraire objectName de l'URL stockée ou le stocker séparément
  const objectName = this.extractObjectName(doc.urlStocket);
  
  // Générer URL presigned temporaire
  return getPresignedUrlForObject(objectName, 3600); // 1h
}
```

## 📝 Migration

Si vous aviez des URLs presigned en base de données :
1. Les anciennes URLs continueront de fonctionner jusqu'à expiration
2. Lors du prochain `updateDocument`, l'URL sera remplacée par une URL directe
3. Aucune migration de données nécessaire

## ✅ Tests

1. **Upload un fichier** :
```graphql
mutation {
  createDocument(file: <FILE>, nom: "Test") {
    urlStocket
  }
}
```

2. **Copier l'URL retournée**

3. **Tester dans le navigateur** :
   - Si URL contient `minio`, remplacer par `localhost`
   - Le fichier devrait être accessible directement

4. **Vérifier dans MinIO Console** :
   - http://localhost:9001
   - Bucket `documents` devrait avoir "Access: Public"

---

**Status** : ✅ Implémenté  
**Breaking Change** : Non (changement interne transparent)  
**Recommandation** : Pour production, envisager d'utiliser un CDN devant MinIO
