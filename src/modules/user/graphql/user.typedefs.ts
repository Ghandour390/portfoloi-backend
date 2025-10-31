import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
  enum UserRole {
    ADMIN
    USER
    VISITEUR
  }

  type User {
    id: ID!
    nom: String!
    prenom: String!
    email: String!
    role: UserRole!
    image: String
    dateNaissance: String!
    cover: String
    adresse: String!
    biographie: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  input CreateUserInput {
    nom: String!
    prenom: String!
    email: String!
    password: String!
    role: UserRole
    image: String
    dateNaissance: String!
    cover: String
    adresse: String!
    biographie: String!
  }

  input UpdateUserInput {
    nom: String
    prenom: String
    email: String
    role: UserRole
    image: String
    dateNaissance: String
    cover: String
    adresse: String
    biographie: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User!
    users: [User!]!
    me: User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    login(input: LoginInput!): AuthPayload!
    refreshToken(token: String!): AuthPayload!
  }
`;