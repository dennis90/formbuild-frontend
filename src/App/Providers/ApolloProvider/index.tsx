import React, { useContext, useMemo } from 'react';

import { ApolloProvider as ApolloLibProvider } from '@apollo/client';
import createApolloClient from 'services/apollo';
import { SessionContext } from '../SessionProvider/context';

const ApolloProvider: React.FC = (props) => {
  const { tokenId } = useContext(SessionContext);
  const apolloClient = useMemo(() => createApolloClient(tokenId), [tokenId]);

  return (
    <ApolloLibProvider client={apolloClient}>
      {props.children}
    </ApolloLibProvider>
  );
};

export default ApolloProvider;
