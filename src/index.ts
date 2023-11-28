import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
  
  type Book {
    id: ID!
    title: String
    author: Author
  }

  type Author {
    id: ID!
    name: String
    nationality: String
    books: [Book]
  }
  
  type Query {
    books: [Book]
    authors: [Author]
  }

  type Mutation {
    createBook(title: String, authorId: ID): Book
  }

`;

const authors = [
  {
    id: '1',
    name: 'Kate Chopin',
    nationality: 'USA'
  },
  {
    id: '2',
    name: 'Paul Auster',
    nationality: 'UK'
  },
  {
    id: '3',
    name: 'Jorge Luis Borges',
    nationality: 'Argentina'
  },
]

const books = [
  {
    id: '1',
    title: 'The Awakening',
    author: authors[0]
  },
  {
    id: '2',
    title: 'City of Glass',
    author: authors[1]
  },
  {
    id: '3',
    title: 'Ficciones',
    author: authors[2]
  }
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);