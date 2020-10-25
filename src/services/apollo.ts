import { ApolloClient, InMemoryCache } from '@apollo/client';

export default function createApolloClient(tokenId?: string) {
  return new ApolloClient({
    uri: 'http://localhost:5000/formbuilder-core/us-central1/graphql',
    cache: new InMemoryCache(),
    headers: !tokenId ? {} : {
      authorization: `Bearer ${tokenId}`,
    },
  })
}
