import React from 'react';

import ApolloProvider from './ApolloProvider';
import SessionProvider from './SessionProvider';

const Providers: React.FC = (props) => {
  return (
    <SessionProvider>
      <ApolloProvider>
        {props.children}
      </ApolloProvider>
    </SessionProvider>
  );
};

export default Providers;
