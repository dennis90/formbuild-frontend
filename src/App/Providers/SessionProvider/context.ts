import firebase from 'firebase/app';
import { createContext } from 'react';

export interface SessionContextType {
  user?: firebase.User,
  error?: firebase.auth.Error,
  tokenId?: string;
}

export const SessionContext = createContext<SessionContextType>({});

export default SessionContext;
