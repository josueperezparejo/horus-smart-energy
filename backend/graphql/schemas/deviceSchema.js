import { gql } from "apollo-server-express";

export const deviceSchema = gql`
  type Query {
    getDevices: [Device] 
    getDeviceById(id: Int!): Device 
  }

  type Mutation {
    createDevice(projectId: Int!, name: String!, type: String!, visible: Boolean!): Device
    updateDevice(id: Int!, name: String!, type: String!, visible: Boolean!): Device
    softDeleteDevice(id: Int!): Device
  }

  type Device {
    id: Int
    name: String
    type: String
    visible: Boolean
  }
`;