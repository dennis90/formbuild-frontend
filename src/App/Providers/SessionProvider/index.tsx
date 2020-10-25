import Loader from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect, useLocation } from 'react-router-dom';

import Alert from 'components/Alert';
import * as ROUTES from 'config/routes';
import { auth } from 'services/firebase';
import { SessionContext } from './context';

const SessionProvider: React.FC = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [tokenId, setTokenId] = useState<string | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      user.getIdToken().then((userIdToken) => {
        setTokenId(userIdToken);
      });
    } else {
      setTokenId(undefined);
    }
  }, [user]);

  if (error) {
    return (
      <Alert status="error">
        {String(error)}
      </Alert>
    );
  }

  if (loading) {
    return <Loader/>;
  }

  if (!user && location.pathname !== ROUTES.SIGN_IN) {
    return <Redirect to={ROUTES.SIGN_IN}/>;
  }

  return (
    <SessionContext.Provider value={{ user, error, tokenId }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
