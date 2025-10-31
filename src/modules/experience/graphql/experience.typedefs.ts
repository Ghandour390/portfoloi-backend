import { gql } from 'apollo-server-express';

export const experienceTypeDefs = gql`
  type Experience {
    id: ID!
    poste: String!
    entreprise: String!
    dateDebut: String!
    dateFin: String!
    description: String!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  input CreateExperienceInput {
    poste: String!
    entreprise: String!
    dateDebut: String!
    dateFin: String!
    description: String!
  }

  input UpdateExperienceInput {
    poste: String
    entreprise: String
    dateDebut: String
    dateFin: String
    description: String
  }

  extend type Query {
    experience(id: ID!): Experience!
    userExperiences(userId: ID!): [Experience!]!
    experiencesByEntreprise(entreprise: String!): [Experience!]!
  }

  extend type Mutation {
    createExperience(input: CreateExperienceInput!): Experience!
    updateExperience(id: ID!, input: UpdateExperienceInput!): Experience!
    deleteExperience(id: ID!): Boolean!
  }
`;