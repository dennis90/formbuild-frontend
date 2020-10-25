import React, { useState } from 'react';

import { auth, googleAuthProvider } from 'services/firebase';

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
        <div>
          <label htmlFor="user-password">
            E-mail
          </label>

          <input
            type="email"
            required
            id="user-email"
            value={userEmail}
            onChange={(ev) => setUserEmail(ev.currentTarget.value)}
          />
        </div>

        <div>
          <label htmlFor="user-password">
            Senha
          </label>

          <input
            type="password"
            required
            id="user-password"
            value={userPassword}
            onChange={(ev) => setUserPassword(ev.currentTarget.value)}
          />
        </div>

        {(props.errorMessage || authError) &&
          <div style={{ color: 'red', fontWeight: 600 }}>
            {props.errorMessage || String(authError)}
          </div>
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
