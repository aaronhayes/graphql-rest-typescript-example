import { gql } from "apollo-server";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import express from "express";
import sofa, { OpenAPI } from "sofa-api";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }

  type Mutation {
    create_book(title: String!, author: String!): Book
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books
  },
  Mutation: {
    create_book: (_: any, { title, author }: any) => {
      books.push({ title, author });
      return { title, author };
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Swagger/OpenAPI Docs
const openApi = OpenAPI({
  schema,
  info: {
    title: "slidr Payment Gateway",
    version: "1.0.0"
  }
});

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ schema });

const app = express();
app.use(bodyParser.json());
server.applyMiddleware({ app, path: "/graphql" });

// Sofa REST Endpoint
app.use(
  "/api",
  sofa({
    schema,
    depthLimit: 3,
    onRoute(info) {
      openApi.addRoute(info, {
        basePath: "/api"
      });
    }
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApi.get()));

// Start App
app.listen({ port: 4123 }, () => {
  console.log(`🚀 GraphQL Server ready at http://localhost:4123/graphql`);
  console.log(`🚀 REST Server ready at http://localhost:4123/api`);
  console.log(`🚀 Swagger Docs ready at http://localhost:4123/docs`);
});

export default app;