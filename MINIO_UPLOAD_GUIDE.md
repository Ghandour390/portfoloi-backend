# MinIO File Upload - Module Document

Ce guide explique comment uploader des fichiers vers MinIO via GraphQL dans le module `document`.

## Configuration

### Variables d'environnement

Ajoutez ces variables dans votre fichier `.env` (pour développement local) ou `.env.docker` (pour Docker) :

```bash
# MinIO Configuration
MINIO_ENDPOINT=localhost          # ou 'minio' dans Docker
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=documents
```

### Démarrage avec Docker

Le service MinIO est déjà configuré dans `docker-compose.yml`. Pour démarrer tous les services :

```bash
docker compose up -d
```

MinIO sera accessible à :
- **API**: http://localhost:9000
- **Console Web**: http://localhost:9001
  - Username: `admin`
  - Password: `password`

## Utilisation

### Mutation GraphQL : createDocument

La mutation `createDocument` permet d'uploader un fichier et de créer automatiquement un document dans la base de données.

#### Exemple avec cURL

```bash
curl http://localhost:4000/graphql \
  -F operations='{ "query": "mutation ($file: Upload!, $nom: String) { createDocument(file: $file, nom: $nom) { _id nom urlStocket userId } }", "variables": { "file": null, "nom": "Mon Document" } }' \
  -F map='{ "0": ["variables.file"] }' \
  -F 0=@./mon-fichier.pdf \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Exemple avec Postman/Insomnia

1. **Type**: GraphQL
2. **URL**: http://localhost:4000/graphql
3. **Headers**:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```
4. **Query**:
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
5. **Variables** (GraphQL Variables):
   ```json
   {
     "file": null,
     "nom": "Mon Document"
   }
   ```
6. Dans l'onglet **Body** > **form-data**:
   - Ajoutez une clé `operations` avec la query
   - Ajoutez une clé `map` avec `{ "0": ["variables.file"] }`
   - Ajoutez une clé `0` de type **File** et sélectionnez votre fichier

#### Exemple avec Apollo Client (Frontend)

```typescript
import { gql, useMutation } from '@apollo/client';

const CREATE_DOCUMENT = gql`
  mutation CreateDocument($file: Upload!, $nom: String) {
    createDocument(file: $file, nom: $nom) {
      _id
      nom
      urlStocket
      userId
    }
  }
`;

function UploadComponent() {
  const [createDocument] = useMutation(CREATE_DOCUMENT);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { data } = await createDocument({
        variables: { 
          file,
          nom: file.name // Optionnel: nom personnalisé
        }
      });
      console.log('Document uploaded:', data.createDocument);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
```

### Autres mutations disponibles

#### updateDocument

Mettre à jour uniquement le nom (sans remplacer le fichier) :

```graphql
mutation {
  updateDocument(
    id: "DOCUMENT_ID"
    nom: "Nouveau nom"
  ) {
    _id
    nom
    urlStocket
  }
}
```

Remplacer le fichier ET le nom :

```graphql
mutation updateDocument($id: ID!, $file: Upload!, $nom: String) {
  updateDocument(id: $id, file: $file, nom: $nom) {
    _id
    nom
    urlStocket
  }
}
```

#### deleteDocument

```graphql
mutation {
  deleteDocument(id: "DOCUMENT_ID")
}
```

### Queries disponibles

#### getUserDocuments

Récupère tous les documents de l'utilisateur connecté :

```graphql
query {
  getUserDocuments {
    _id
    nom
    urlStocket
    userId
  }
}
```

#### getDocument

Récupère un document spécifique par ID :

```graphql
query {
  getDocument(id: "DOCUMENT_ID") {
    _id
    nom
    urlStocket
    userId
  }
}
```

## Architecture

### Flux de données

1. **Client** → envoie un fichier via mutation GraphQL `createDocument`
2. **Resolver** (`document.resolvers.ts`) → reçoit le fichier et appelle le service
3. **Service** (`document.service.ts`) → 
   - Upload le fichier vers MinIO
   - Génère une URL d'accès directe (publique)
   - Crée un enregistrement dans MongoDB
4. **Response** → retourne les métadonnées du document avec l'URL

### Format des URLs

Les URLs stockées dans `urlStocket` sont des URLs directes MinIO :
- Format: `http://ENDPOINT:PORT/BUCKET/objectName`
- Exemple: `http://localhost:9000/documents/userId/1730000000000-file.pdf`
- Le bucket est automatiquement configuré avec une politique de lecture publique
- Les fichiers sont accessibles directement sans authentification

### Fichiers modifiés

- `src/shared/minioClient.ts` - Client MinIO et helpers
- `src/modules/document/service/document.service.ts` - Méthode `uploadAndCreateDocument`
- `src/modules/document/graphql/document.resolvers.ts` - Resolver `uploadDocument`
- `src/modules/document/graphql/document.typedefs.ts` - Ajout du scalar `Upload`
- `src/app.ts` - Middleware `graphqlUploadExpress`
- `package.json` - Ajout des dépendances `minio` et `graphql-upload`

## Sécurité

⚠️ **Authentification requise** : Toutes les mutations de document nécessitent un token JWT valide.

Les fichiers sont stockés avec le pattern : `{userId}/{timestamp}-{filename}`

## Dépannage

### Erreur "Cannot find module 'minio'"

Installez les dépendances :
```bash
npm install
```

### MinIO connection refused

Vérifiez que MinIO est en cours d'exécution :
```bash
docker compose ps
```

### Bucket n'existe pas

Le bucket est créé automatiquement au premier upload avec politique de lecture publique.

### Fichier uploadé mais URL ne fonctionne pas

1. Vérifiez que le bucket est public :
   - Ouvrez MinIO Console : http://localhost:9001
   - Allez dans le bucket `documents`
   - Vérifiez la politique d'accès (doit être "public" pour lecture)

2. Si vous êtes dans Docker, l'URL peut utiliser `minio` au lieu de `localhost`
   - Pour accès externe, remplacez `minio` par `localhost` dans l'URL

### URLs avec "minio" au lieu de "localhost"

Dans Docker, l'application génère des URLs avec le nom du service (`http://minio:9000/...`).
Pour accès depuis le navigateur, remplacez `minio` par `localhost` :
- ❌ `http://minio:9000/documents/file.pdf`
- ✅ `http://localhost:9000/documents/file.pdf`

**Solution** : Utilisez une variable d'environnement pour l'endpoint externe si nécessaire.

## Tests

Pour tester l'upload :

1. Assurez-vous que les services sont démarrés :
   ```bash
   docker compose up -d
   ```

2. Obtenez un token JWT via la mutation `login`

3. Utilisez GraphQL Playground à http://localhost:4000/graphql

4. Uploadez un fichier et copiez l'URL retournée

5. Testez l'URL dans votre navigateur (remplacez `minio` par `localhost` si nécessaire)

6. Vérifiez dans MinIO Console : http://localhost:9001

---

**Note**: Les URLs générées sont des URLs directes permanentes vers MinIO. Le bucket est automatiquement configuré pour permettre l'accès public en lecture.
