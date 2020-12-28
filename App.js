import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { backendUrl } from "./config/settings";
import { AuthProvider } from "./contexts/AuthContext";
import MainScreen from "./screens/MainScreen";
import SyncStorage from "sync-storage";

const httpLink = createHttpLink({
  uri: `${backendUrl}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from storage if it exists
  const token = SyncStorage.get("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // Init SyncStorage - Alternative to AsyncStorage.
  React.useEffect(() => {
    const initSyncStorage = async () => {
      await SyncStorage.init();
    };
    initSyncStorage();
  }, []);

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <MainScreen />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
