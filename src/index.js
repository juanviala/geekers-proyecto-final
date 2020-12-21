import React from 'react';
import ReactDOM from 'react-dom';

import './styles/styles.css'
import './styles/bootstrap.min.css'

import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyD5QjISzQvUjIvcw5eapEu87smMwnyi3GA",
    authDomain: "geekers-reactjs-coderhouse.firebaseapp.com",
    projectId: "geekers-reactjs-coderhouse",
    storageBucket: "geekers-reactjs-coderhouse.appspot.com",
    messagingSenderId: "1038863526294",
    appId: "1:1038863526294:web:61e9a01fd40c9fe6e455b7"
});

export function getFirebase() {
  return app;
}

export function getFirestore() {
  return firebase.firestore(app);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
