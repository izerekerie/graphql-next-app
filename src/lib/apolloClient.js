import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// Create an instance of Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql", // Replace with your actual GraphQL server URI
  }),
  cache: new InMemoryCache(),
  credentials: "include", // Include credentials if required by your API
});

export default client;
