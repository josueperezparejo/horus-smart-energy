import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { resolvers, typeDefs } from './backend/graphql/index.js';
import { connectToDatabase } from './backend/db/db.js';

dotenv.config();

const startApolloServer = async (typeDefs, resolvers) => {
  await connectToDatabase();

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor GraphQL en http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);