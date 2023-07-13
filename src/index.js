import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// data
import db from '../_db.js';

// type definitions
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        reviews: () => db.reviews,
        review: (_, args) => db.reviews.find((review) => review.id === args.id),
        games: () => db.games,
        game: (_, args) => db.games.find((game) => game.id === args.id),
        authors: () => db.authors,
        author: (_, args) => db.authors.find((author) => author.id === args.id),
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