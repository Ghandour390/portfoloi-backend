import { gql } from 'apollo-server-express';

export const competenceTypeDefs = gql`
  type Competence {
    id: ID!
    nom: String!
    categorie: String!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  input CreateCompetenceInput {
    nom: String!
    categorie: String!
  }

  input UpdateCompetenceInput {
    nom: String
    categorie: String
  }

  extend type Query {
    competence(id: ID!): Competence!
    userCompetences(userId: ID!): [Competence!]!
    competencesByCategorie(categorie: String!): [Competence!]!
  }

  extend type Mutation {
    createCompetence(input: CreateCompetenceInput!): Competence!
    updateCompetence(id: ID!, input: UpdateCompetenceInput!): Competence!
    deleteCompetence(id: ID!): Boolean!
  }
`;