import { gql } from 'apollo-server-express';

export const documentTypeDefs = gql`
  scalar Upload

  type Document {
    _id: ID!
    nom: String!
    urlStocket: String!
    userId: ID!
  }

  input DocumentInput {
    nom: String
    urlStocket: String
  }

  input DocumentUpdateInput {
    nom: String
    urlStocket: String
  }

  type Query {
    getDocument(id: ID!): Document
    getUserDocuments: [Document!]!
  }

  type Mutation {
    # Create document with file upload (file is required, nom is optional)
    createDocument(file: Upload!, nom: String): Document!
    # Update document with optional file replacement
    updateDocument(id: ID!, file: Upload, nom: String): Document!
    deleteDocument(id: ID!): Boolean!
  }
`;