<div align="center">

# 🎯 Portfolio Backend API

![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Enterprise-Grade GraphQL API with JWT Authentication, MinIO Storage & MongoDB**

[Quick Start](#-quick-start) • [API Docs](#-api-endpoints) • [Architecture](#%EF%B8%8F-architecture) • [Examples](#-requestresponse-examples)

</div>

---

## 📊 Tech Stack

| Layer | Technology | Version | Purpose |
|:------|:----------|:--------|:--------|
| **API** | ![Apollo](https://img.shields.io/badge/Apollo-311C87?logo=apollographql&logoColor=white) Apollo Server | `3.13.0` | GraphQL Server |
| **Runtime** | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) Node.js | `18+` | JavaScript Runtime |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) TypeScript | `5.9.3` | Type Safety |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) MongoDB | `6.0` | Document Store |
| **Cache** | ![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white) Redis | `6` | Session Cache |
| **Storage** | ![MinIO](https://img.shields.io/badge/MinIO-C72E49?logo=minio&logoColor=white) MinIO | `Latest` | S3-Compatible Files |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white) JWT | `9.0.2` | Token Authentication |
| **Container** | ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white) Docker Compose | `-` | Orchestration |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT REQUEST                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Apollo Server  │
                    │   (Port 4000)   │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
         ┌────▼────┐    ┌────▼────┐   ┌────▼────┐
         │  Auth   │    │ GraphQL │   │ Context │
         │ Middleware│  │Resolvers│   │ Builder │
         └────┬────┘    └────┬────┘   └─────────┘
              │              │
              └──────┬───────┘
                     │
         ┌───────────▼───────────┐
         │   Service Layer       │
         │  (Business Logic)     │
         └───────────┬───────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
    ┌────▼────┐ ┌────▼────┐ ┌───▼────┐
    │ MongoDB │ │  MinIO  │ │ Redis  │
    │ (27017) │ │ (9000)  │ │ (6379) │
    └─────────┘ └─────────┘ └────────┘
```

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── user/           ┌─────────────────────┐
│   ├── social/         │  Each Module Has:   │
│   ├── competence/     │  • graphql/         │
│   ├── experience/     │    - resolvers.ts   │
│   ├── formation/      │    - typedefs.ts    │
│   └── document/       │  • model/           │
│                       │  • repository/      │
├── shared/             │  • service/         │
│   ├── auth.ts         └─────────────────────┘
│   ├── types.ts
│   └── minioClient.ts
├── config/
│   └── database.ts
└── app.ts
```

---

## 🔐 Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Client  │────────▶│   API    │────────▶│ MongoDB  │
└──────────┘         └──────────┘         └──────────┘
     │                     │                     │
     │  1. Login           │                     │
     │────────────────────▶│                     │
     │                     │  2. Verify User     │
     │                     │────────────────────▶│
     │                     │◀────────────────────│
     │  3. JWT Tokens      │                     │
     │◀────────────────────│                     │
     │                     │                     │
     │  4. Request + Token │                     │
     │────────────────────▶│                     │
     │                     │  5. Validate JWT    │
     │                     │  6. Execute Query   │
     │  7. Response        │                     │
     │◀────────────────────│                     │
```

---

## 🚀 Quick Start

<table>
<tr>
<td>

**🐳 Docker (Recommended)**
```bash
docker compose up -d
```

</td>
<td>

**💻 Local Development**
```bash
npm install
npm run dev
```

</td>
</tr>
</table>

**Access:** http://localhost:4000/graphql

### 🔌 Services Ports

| Service | Port | URL | Status |
|:--------|:----:|:----|:------:|
| **GraphQL API** | `4000` | http://localhost:4000/graphql | ![Status](https://img.shields.io/badge/status-active-success) |
| **MongoDB** | `27017` | mongodb://localhost:27017 | ![Status](https://img.shields.io/badge/status-active-success) |
| **Redis** | `6379` | redis://localhost:6379 | ![Status](https://img.shields.io/badge/status-active-success) |
| **MinIO API** | `9000` | http://localhost:9000 | ![Status](https://img.shields.io/badge/status-active-success) |
| **MinIO Console** | `9001` | http://localhost:9001 | ![Status](https://img.shields.io/badge/status-active-success) |
| **MailDev** | `1080` | http://localhost:1080 | ![Status](https://img.shields.io/badge/status-active-success) |

---

## 📡 API Endpoints

### 👤 User Module

<table>
<tr><th>Query/Mutation</th><th>Auth</th><th>Role</th></tr>
<tr><td><code>user(id: ID!)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/USER-blue" /></td></tr>
<tr><td><code>users</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/ADMIN-purple" /></td></tr>
<tr><td><code>me</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/USER-blue" /></td></tr>
<tr><td><code>createUser(input)</code></td><td><img src="https://img.shields.io/badge/🌐-public-green" /></td><td>-</td></tr>
<tr><td><code>login(input)</code></td><td><img src="https://img.shields.io/badge/🌐-public-green" /></td><td>-</td></tr>
<tr><td><code>updateUser(id, input)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/OWNER/ADMIN-orange" /></td></tr>
<tr><td><code>deleteUser(id)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/ADMIN-purple" /></td></tr>
</table>

### 💼 Experience Module

<table>
<tr><th>Query/Mutation</th><th>Auth</th><th>Public</th></tr>
<tr><td><code>experience(id: ID!)</code></td><td><img src="https://img.shields.io/badge/🌐-public-green" /></td><td><img src="https://img.shields.io/badge/✓-yes-success" /></td></tr>
<tr><td><code>userExperiences(userId: ID!)</code></td><td><img src="https://img.shields.io/badge/🌐-public-green" /></td><td><img src="https://img.shields.io/badge/✓-yes-success" /></td></tr>
<tr><td><code>experiencesByEntreprise(entreprise: String!)</code></td><td><img src="https://img.shields.io/badge/🌐-public-green" /></td><td><img src="https://img.shields.io/badge/✓-yes-success" /></td></tr>
<tr><td><code>createExperience(input)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/✗-no-critical" /></td></tr>
<tr><td><code>updateExperience(id, input)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/✗-no-critical" /></td></tr>
<tr><td><code>deleteExperience(id)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td><img src="https://img.shields.io/badge/✗-no-critical" /></td></tr>
</table>

### 📄 Document Module

<table>
<tr><th>Query/Mutation</th><th>Auth</th><th>Description</th></tr>
<tr><td><code>getDocument(id: ID!)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td>Get single document</td></tr>
<tr><td><code>getUserDocuments</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td>Get user's documents</td></tr>
<tr><td><code>createDocument(file: Upload!, nom: String)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td>Upload to MinIO</td></tr>
<tr><td><code>updateDocument(id, file, nom)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td>Update file/metadata</td></tr>
<tr><td><code>deleteDocument(id)</code></td><td><img src="https://img.shields.io/badge/🔒-required-red" /></td><td>Delete from MinIO & DB</td></tr>
</table>

---

## 📝 Request/Response Examples

### 🔹 Create User

**Request:**
```graphql
mutation {
  createUser(input: {
    nom: "Doe"
    prenom: "John"
    email: "john@example.com"
    password: "secure123"
    dateNaissance: "1990-01-01"
    adresse: "123 Main St"
    biographie: "Full-stack developer"
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

**Response:**
```json
{
  "data": {
    "createUser": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "507f1f77bcf86cd799439011",
        "email": "john@example.com",
        "role": "USER"
      }
    }
  }
}
```

---

### 🔹 Login

**Request:**
```graphql
mutation {
  login(input: {
    email: "john@example.com"
    password: "secure123"
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

**Response:**
```json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": "507f1f77bcf86cd799439011",
        "nom": "Doe",
        "prenom": "John",
        "email": "john@example.com",
        "role": "USER"
      }
    }
  }
}
```

**Headers for Authenticated Requests:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 🔹 Create Experience

**Request:**
```graphql
mutation {
  createExperience(input: {
    titre: "Senior Developer"
    entreprise: "Tech Corp"
    description: "Led development team"
    dateDebut: "2020-01-01"
    dateFin: "2023-12-31"
  }) {
    id
    titre
    entreprise
    description
    dateDebut
    dateFin
  }
}
```

**Response:**
```json
{
  "data": {
    "createExperience": {
      "id": "507f1f77bcf86cd799439012",
      "titre": "Senior Developer",
      "entreprise": "Tech Corp",
      "description": "Led development team",
      "dateDebut": "2020-01-01T00:00:00.000Z",
      "dateFin": "2023-12-31T00:00:00.000Z"
    }
  }
}
```

---

### 🔹 Upload Document

**Request:**
```graphql
mutation($file: Upload!) {
  createDocument(file: $file, nom: "Resume.pdf") {
    _id
    nom
    urlStocket
    userId
  }
}
```

**Variables:**
```json
{
  "file": null
}
```

**Response:**
```json
{
  "data": {
    "createDocument": {
      "_id": "507f1f77bcf86cd799439013",
      "nom": "Resume.pdf",
      "urlStocket": "http://localhost:9000/documents/507f1f77bcf86cd799439011/1234567890-Resume.pdf",
      "userId": "507f1f77bcf86cd799439011"
    }
  }
}
```

---

### 🔹 Get User Profile (Public)

**Request:**
```graphql
query {
  user(id: "507f1f77bcf86cd799439011") {
    nom
    prenom
    biographie
    email
  }
  
  userExperiences(userId: "507f1f77bcf86cd799439011") {
    titre
    entreprise
    dateDebut
    dateFin
  }
  
  userFormations(userId: "507f1f77bcf86cd799439011") {
    diplome
    ecole
    dateDebut
    dateFin
  }
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "nom": "Doe",
      "prenom": "John",
      "biographie": "Full-stack developer",
      "email": "john@example.com"
    },
    "userExperiences": [
      {
        "titre": "Senior Developer",
        "entreprise": "Tech Corp",
        "dateDebut": "2020-01-01T00:00:00.000Z",
        "dateFin": "2023-12-31T00:00:00.000Z"
      }
    ],
    "userFormations": [
      {
        "diplome": "Master CS",
        "ecole": "University",
        "dateDebut": "2015-09-01T00:00:00.000Z",
        "dateFin": "2017-06-30T00:00:00.000Z"
      }
    ]
  }
}
```

---

## 🔒 Security Matrix

| Feature | Implementation | Status |
|:--------|:--------------|:------:|
| **Password Hashing** | `bcryptjs` | ![](https://img.shields.io/badge/✓-enabled-success) |
| **JWT Tokens** | Access (15m) + Refresh (7d) | ![](https://img.shields.io/badge/✓-enabled-success) |
| **Role-Based Access** | ADMIN, USER | ![](https://img.shields.io/badge/✓-enabled-success) |
| **File Upload Security** | User-scoped paths | ![](https://img.shields.io/badge/✓-enabled-success) |
| **Public Queries** | Read-only access | ![](https://img.shields.io/badge/✓-enabled-success) |
| **Protected Mutations** | Auth required | ![](https://img.shields.io/badge/✓-enabled-success) |

---

## 🗄️ Database Schema

### User Collection
```typescript
{
  _id: ObjectId
  nom: String
  prenom: String
  email: String (unique)
  password: String (hashed)
  role: "ADMIN" | "USER"
  image?: String
  cover?: String
  dateNaissance: Date
  adresse: String
  biographie: String
  createdAt: Date
  updatedAt: Date
}
```

### Experience Collection
```typescript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  titre: String
  entreprise: String
  description: String
  dateDebut: Date
  dateFin: Date
  createdAt: Date
  updatedAt: Date
}
```

### Document Collection
```typescript
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  nom: String
  urlStocket: String
  createdAt: Date
  updatedAt: Date
}
```

---

## 🎨 MinIO Storage Pattern

```
documents/
└── {userId}/
    ├── 1234567890-resume.pdf
    ├── 1234567891-certificate.jpg
    └── 1234567892-portfolio.pdf
```

| Operation | Endpoint | Method | Icon |
|:----------|:---------|:-------|:----:|
| **Upload** | `createDocument` | Mutation | ![](https://img.shields.io/badge/⬆-upload-blue) |
| **Download** | Direct URL | GET | ![](https://img.shields.io/badge/⬇-download-green) |
| **Delete** | `deleteDocument` | Mutation | ![](https://img.shields.io/badge/🗑-delete-red) |
| **List** | `getUserDocuments` | Query | ![](https://img.shields.io/badge/📋-list-yellow) |

---

## ⚙️ Environment Variables

```env
# Database
MONGO_URI=mongodb://mongo:27017/portfolio
MONGODB_PORT=27017

# JWT
ACCESS_TOKEN_SECRET=your_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_secret_here
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

# MinIO
MINIO_ENDPOINT=minio
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=documents

# Server
PORT=4000
```

---

## 🧪 Testing

| Test | Command | Description |
|:-----|:--------|:------------|
| **MinIO Connection** | `npm run test:minio` | Verify storage setup |
| **API Health** | `curl http://localhost:4000/graphql` | Check server status |

---

## 🐳 Docker Commands

| Action | Command |
|:-------|:--------|
| **Start All** | `docker compose up -d` |
| **Stop All** | `docker compose down` |
| **View Logs** | `docker compose logs -f` |
| **Rebuild** | `docker compose up -d --build` |
| **Remove Volumes** | `docker compose down -v` |

---

## 📊 Module Overview

| Module | Queries | Mutations | Public Access |
|:-------|:-------:|:---------:|:-------------:|
| **User** | `3` | `5` | ![](https://img.shields.io/badge/✗-private-critical) |
| **Social** | `2` | `3` | ![](https://img.shields.io/badge/✓-public-success) |
| **Competence** | `2` | `3` | ![](https://img.shields.io/badge/✓-public-success) |
| **Experience** | `3` | `3` | ![](https://img.shields.io/badge/✓-read_only-informational) |
| **Formation** | `2` | `3` | ![](https://img.shields.io/badge/✓-read_only-informational) |
| **Document** | `2` | `3` | ![](https://img.shields.io/badge/✗-private-critical) |

---

## 🚦 Status

<div align="center">

![Status](https://img.shields.io/badge/status-production_ready-success?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-ISC-green?style=for-the-badge)
![Build](https://img.shields.io/badge/build-passing-success?style=for-the-badge)

</div>

---

## 📞 Support

- **GraphQL Playground**: http://localhost:4000/graphql
- **MinIO Console**: http://localhost:9001
- **MailDev**: http://localhost:1080

---

<div align="center">

### Built with 💙 by Developers, for Developers

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat&logo=graphql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-C72E49?style=flat&logo=minio&logoColor=white)

**[⭐ Star this repo](https://github.com) • [🐛 Report Bug](https://github.com) • [✨ Request Feature](https://github.com)**

</div>
