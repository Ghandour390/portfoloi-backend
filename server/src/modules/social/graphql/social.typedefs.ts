import { gql } from 'apollo-server-express';

export const socialNetworkTypeDefs = gql`
  type SocialNetwork {
    id: ID!
    nom: String!
    liensSociaux: String!
    icon: String!
    userId: ID!
    createdAt: String!
    updatedAt: String!
  }

  input CreateSocialNetworkInput {
    nom: String!
    liensSociaux: String!
    icon: String!
  }

  input UpdateSocialNetworkInput {
    nom: String
    liensSociaux: String
    icon: String
  }

  extend type Query {
    socialNetwork(id: ID!): SocialNetwork!
    userSocialNetworks(userId: ID!): [SocialNetwork!]!
  }

  extend type Mutation {
    createSocialNetwork(input: CreateSocialNetworkInput!): SocialNetwork!
    updateSocialNetwork(id: ID!, input: UpdateSocialNetworkInput!): SocialNetwork!
    deleteSocialNetwork(id: ID!): Boolean!
  }
`;