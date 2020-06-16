import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(sessionStorage.getItem("EG-token"));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache({
  dataIdFromObject: object => object.id || null
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

// export default new ApolloBoost({
//   uri: "http://localhost:4000",
//   request(operation) {
//     const token = JSON.parse(sessionStorage.getItem("EG-token"));
//     operation.setContext({
//       headers: {
//         Authorization: token ? `Bearer ${token}` : "",
//       },
//     });
//   },
//   // dataIdFromObject: (o) => o.id,
// });
