import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const MAGENTO_URL = process.env.NEXT_PUBLIC_MAGENTO_API!;

const httpLink = new HttpLink({
  uri: MAGENTO_URL,
});

const authLink = setContext((_, { headers }) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("customer_token");
  }
  return {
    headers: {
      ...headers,
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
