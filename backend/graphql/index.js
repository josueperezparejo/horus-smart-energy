import { gql } from "apollo-server-express"; 

import { userSchema } from "./schemas/userSchema.js";
import { userResolvers } from "./resolvers/userResolvers.js";

import { projectSchema } from "./schemas/projectSchema.js";
import { projectResolvers } from "./resolvers/projectResolvers.js";

import { deviceSchema } from "./schemas/deviceSchema.js";
import { deviceResolvers } from "./resolvers/deviceResolvers.js";

const rootTypeDefs = gql`
    type Query {
        _: String
    }

    type Mutation {
        _: String
    }
`;

export const typeDefs = [rootTypeDefs, userSchema, projectSchema, deviceSchema];

export const resolvers = [userResolvers, projectResolvers, deviceResolvers];