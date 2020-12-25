// Dependencies
import { Prisma } from 'prisma-binding';

// Resolvers
import { fragmentReplacements } from './resolvers';

export const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  fragmentReplacements
});