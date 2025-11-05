import { gql } from 'apollo-server-express';

export const formationTypeDefs = gql`
  type Formation {
    id: ID!
    filiere: String!
    ecole: String!
    localisation: String!
    dateDebut: String!
    dateFin: String!
    description: String!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  input CreateFormationInput {
    filiere: String!
    ecole: String!
    localisation: String!
    dateDebut: String!
    dateFin: String!
    description: String!
  }

  input UpdateFormationInput {
    filiere: String
    ecole: String
    localisation: String
    dateDebut: String
    dateFin: String
    description: String
  }

  extend type Query {
    formation(id: ID!): Formation!
    userFormations(userId: ID!): [Formation!]!
    formationsByEcole(ecole: String!): [Formation!]!
  }

  extend type Mutation {
    createFormation(input: CreateFormationInput!): Formation!
    updateFormation(id: ID!, input: UpdateFormationInput!): Formation!
    deleteFormation(id: ID!): Boolean!
  }
`;