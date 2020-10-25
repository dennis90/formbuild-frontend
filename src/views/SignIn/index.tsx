import React, { useState } from 'react';

import TextField from 'components/form/TextField';
import { auth, googleAuthProvider } from 'services/firebase';
import Alert from 'components/Alert';

interface SignInFormProps {
  errorMessage?: string;
}

const SignIn: React.FC<SignInFormProps> = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [authError, setAuthError] = useState(undefined);

  const signInFormSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(userEmail, userPassword);
    } catch (e) {
      setAuthError(e);
    }
  }

  const signInWithGoogleClickHandler = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (e) {
      setAuthError(e);
    }
  }

  return (
    <div>
      <form onSubmit={signInFormSubmitHandler}>
        <TextField
          label="e-mail"
          type="email"
          id="user-email"
          value={userEmail}
          onChange={(ev) => setUserEmail(ev.currentTarget.value)}
        />

        <TextField
          type="password"
          id="user-password"
          label="Senha"
          value={userPassword}
          onChange={(ev) => setUserPassword(ev.currentTarget.value)}
        />

        {(props.errorMessage || authError) &&
          <Alert status="error">
            {props.errorMessage || String(authError)}
          </Alert>
        }

        <button type="submit">
          Entrar
        </button>
      </form>

      <button onClick={signInWithGoogleClickHandler}>
        Entrar com o google
      </button>
    </div>
  );
};

export default SignIn;
