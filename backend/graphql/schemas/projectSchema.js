import { gql } from "apollo-server-express";

export const projectSchema = gql`
  type Query {
    getProjects: [Project]
    getProjectById(id: Int!): Project
  }

  type Mutation {
    createProject(name: String!, enabled: Boolean!, time_zone: String!, created_by: Int!): Project
    updateProject(id: Int!, name: String!, enabled: Boolean!, time_zone: String!, created_by: Int): Project
    softDeleteProject(id: Int!): Project
  }

  type Project {
    id: Int
    name: String
    enabled: Boolean
    time_zone: String
    created_by: Int
    devices: [Device]
  }
`;