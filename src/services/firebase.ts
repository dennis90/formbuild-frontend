import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: "AIzaSyD3KY0pvWf6Jlh3WvN0ZMurwDidY6ci3TQ",
  authDomain: "formbuilder-core.firebaseapp.com",
  databaseURL: "https://formbuilder-core.firebaseio.com",
  projectId: "formbuilder-core",
  storageBucket: "formbuilder-core.appspot.com",
  messagingSenderId: "46133054056",
  appId: "1:46133054056:web:54ee2644cae160bee5c9dd",
  measurementId: "G-KL91FBLK2K"
});

export default firebase;

export const firestore = firebase.firestore();

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
