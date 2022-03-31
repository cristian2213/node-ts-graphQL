import * as express from 'express';
import { join } from 'path';
import { ApolloServer } from 'apollo-server-express';

import { loadFilesSync } from '@graphql-tools/load-files';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typesArray = loadFilesSync(join(__dirname, 'services', '**/*.graphql'));
const resolversArray = loadFilesSync(
  join(__dirname, 'services', '**/*.resolvers.ts')
);

async function startApolloServer(): Promise<void> {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: typesArray, // Merges all Schemas and Mutations in rootQuery{} and rootMutation{}
    resolvers: resolversArray,
  });

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    schema,
  });

  // More required logic for integrating with Express
  await server.start();

  // Middleware to connect Express with AplloServer
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/graphql',
  });

  app.listen(4000, () => {
    console.log('Running GraphQL server on ' + `http://localhost:4000/graphql`);
  });
}

startApolloServer();
