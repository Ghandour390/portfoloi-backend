# Exemples de requêtes GraphQL pour tester les documents

## 1. Créer un compte utilisateur

```graphql
mutation CreateUser {
  createUser(input: {
    nom: "Dupont"
    prenom: "Jean"
    email: "jean.dupont@example.com"
    password: "Password123!"
    dateNaissance: "1990-05-15"
    adresse: "123 Rue de Paris, 75001 Paris"
    biographie: "Développeur Full-Stack passionné"
    role: USER
  }) {
    accessToken
    refreshToken
    user {
      id
      nom
      prenom
      email
      role
    }
  }
}
```

## 2. Se connecter

```graphql
mutation Login {
  login(input: {
    email: "jean.dupont@example.com"
    password: "Password123!"
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

**⚠️ Important** : Copiez le `accessToken` et ajoutez-le dans les Headers HTTP :
```json
{
  "Authorization": "Bearer VOTRE_ACCESS_TOKEN_ICI"
}
```

## 3. Créer un document avec upload (nécessite Authorization)

Cette mutation nécessite l'upload d'un fichier. Dans GraphQL Playground ou Altair, utilisez l'interface d'upload de fichiers.

```graphql
mutation CreateDocument($file: Upload!, $nom: String) {
  createDocument(file: $file, nom: $nom) {
    _id
    nom
    urlStocket
    userId
  }
}
```

**Variables** :
```json
{
  "file": null,
  "nom": "Mon CV 2024"
}
```

Dans l'interface :
- Sélectionnez le fichier pour la variable `file`
- Le nom est optionnel (sinon utilise le nom du fichier)

## 4. Récupérer tous mes documents

```graphql
query GetMyDocuments {
  getUserDocuments {
    _id
    nom
    urlStocket
    userId
  }
}
```

## 5. Récupérer un document spécifique

```graphql
query GetDocument {
  getDocument(id: "DOCUMENT_ID_ICI") {
    _id
    nom
    urlStocket
    userId
  }
}
```

## 6. Mettre à jour le nom d'un document (sans changer le fichier)

```graphql
mutation UpdateDocumentName {
  updateDocument(
    id: "DOCUMENT_ID_ICI"
    nom: "Nouveau nom du document"
  ) {
    _id
    nom
    urlStocket
  }
}
```

## 7. Remplacer le fichier d'un document

```graphql
mutation ReplaceDocumentFile($id: ID!, $file: Upload!, $nom: String) {
  updateDocument(id: $id, file: $file, nom: $nom) {
    _id
    nom
    urlStocket
  }
}
```

**Variables** :
```json
{
  "id": "DOCUMENT_ID_ICI",
  "file": null,
  "nom": "Version 2"
}
```

## 8. Supprimer un document

```graphql
mutation DeleteDocument {
  deleteDocument(id: "DOCUMENT_ID_ICI")
}
```

---

## Test avec cURL

### Créer un document

```bash
curl http://localhost:4000/graphql \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -F operations='{"query":"mutation($file: Upload!, $nom: String){createDocument(file: $file, nom: $nom){_id nom urlStocket}}","variables":{"file":null,"nom":"Test Document"}}' \
  -F map='{"0":["variables.file"]}' \
  -F 0=@./test.pdf
```

### Récupérer mes documents

```bash
curl http://localhost:4000/graphql \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ getUserDocuments { _id nom urlStocket } }"}'
```

### Mettre à jour le nom

```bash
curl http://localhost:4000/graphql \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"mutation { updateDocument(id: \"DOCUMENT_ID\", nom: \"Nouveau nom\") { _id nom urlStocket } }"}'
```

---

## Workflow complet de test

1. **Créer un utilisateur** avec `createUser` (récupérer le token)
2. **Ajouter le token** dans les headers HTTP : `Authorization: Bearer TOKEN`
3. **Uploader un fichier** avec `createDocument`
4. **Lister les documents** avec `getUserDocuments`
5. **Mettre à jour le nom** avec `updateDocument` (sans file)
6. **Remplacer le fichier** avec `updateDocument` (avec file)
7. **Supprimer** avec `deleteDocument`
8. **Vérifier dans MinIO Console** : http://localhost:9001 (admin/password)

---

## Outils recommandés

- **GraphQL Playground** : http://localhost:4000/graphql (intégré)
- **Altair GraphQL Client** : Extension Chrome/VS Code avec support Upload
- **Insomnia** : Client REST/GraphQL avec support multipart
- **Postman** : Support GraphQL avec upload de fichiers
- **cURL** : Ligne de commande (exemples ci-dessus)

---

## Troubleshooting

### "Authentication required"
→ Vérifiez que le header `Authorization: Bearer TOKEN` est présent

### "File upload failed"
→ Vérifiez que MinIO est démarré : `docker compose ps`

### "Cannot find module 'minio'"
→ Installez les dépendances : `npm install`

### "Bucket does not exist"
→ Le bucket est créé automatiquement. Vérifiez les logs du serveur.

### URL presigned expire
→ Les URLs expirent après 24h. Récupérez une nouvelle URL via `getDocument`
