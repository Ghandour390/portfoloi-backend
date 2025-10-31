import { gql } from 'apollo-server-express';

export const documentTypeDefs = gql`
  type Document {
    _id: ID!
    nom: String!
    urlStocket: String!
    userId: ID!
  }

  input DocumentInput {
    nom: String!
    urlStocket: String!
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
    createDocument(input: DocumentInput!): Document!
    updateDocument(id: ID!, input: DocumentUpdateInput!): Document!
    deleteDocument(id: ID!): Boolean!
  }
`;