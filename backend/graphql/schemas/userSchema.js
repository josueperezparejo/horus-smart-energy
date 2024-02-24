import { gql } from "apollo-server-express";

export const userSchema = gql`
  type Query {
    getUsers: [User]
    getUserById(id: Int!): User
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    createUser(username: String!, password: String!): User 
    updateUser(id: Int!, username: String!, password: String!): User  
    softDeleteUser(id: Int!): User 
  }

  type User {
    id: Int  
    username: String  
    projects: [Project]
  }

  type AuthPayload {
    token: String!  
    user: User      
  }
`;