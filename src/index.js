import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// data
import db from '../_db.js';

// type definitions
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        reviews: () => db.reviews,
        games: () => db.games,
        authors: () => db.authors,
    },
};

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log('Server ready at port', 4000);