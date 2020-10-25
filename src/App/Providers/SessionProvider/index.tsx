import Loader from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Redirect } from 'react-router-dom';

import * as ROUTES from 'config/routes';
import { auth } from 'services/firebase';
import { SessionContext } from './context';

const SessionProvider: React.FC = (props) => {
  const [user, loading, error] = useAuthState(auth);
  const [tokenId, setTokenId] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log('session provider effect');
    if (user) {
      console.log('user', user)
      console.log('loading user token');
      user.getIdToken().then((userIdToken) => {
        setTokenId(userIdToken);
      });
    } else {
      console.log('user-undefined')
      setTokenId(undefined);
    }
  }, [user]);

  if (error) {
    return <div>{String(error)}</div>;
  }

  if (loading) {
    return <Loader/>;
  }

  if (!user) {
    return <Redirect to={ROUTES.SIGN_IN}/>;
  }

  return (
    <SessionContext.Provider value={{ user, error, tokenId }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
