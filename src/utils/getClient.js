import ApolloBoost from "apollo-boost";

const client = (token) => {
  return new ApolloBoost({
    uri: "http://localhost:4000",
    request(operation) {
      operation.setContext({
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
    },
  });
};

export default client;
