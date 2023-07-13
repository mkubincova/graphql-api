import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { v4 as uuid } from 'uuid';

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
    Game: {
        reviews: (parent) => db.reviews.filter((review) => review.game_id === parent.id)
    },
    Author: {
        reviews: (parent) => db.reviews.filter((review) => review.author_id === parent.id)
    },
    Review: {
        author: (parent) => db.authors.find((author) => author.id === parent.author_id),
        game: (parent) => db.games.find((game) => game.id === parent.game_id)
    },
    Mutation: {
        deleteGame: (_, args) => db.games = db.games.filter((game) => game.id !== args.id),
        addGame: (_, args) => {
            let game = {
                ...args.game,
                id: uuid()
            };
            db.games.push(game);
            return game;
        },
        updateGame: (_, args) => {
            db.games = db.games.map((game) => {
                if (game.id === args.id) {
                    return { ...game, ...args.edits };
                }
                return game;
            });
            return db.games.find((game) => game.id === args.id);
        }
    }
};

// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`Server ready at ${url}`);