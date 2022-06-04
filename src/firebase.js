// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS55gbemXUWxg1_k2n_8ICHT2wmrvyBPg",
  authDomain: "slack-6e42e.firebaseapp.com",
  projectId: "slack-6e42e",
  storageBucket: "slack-6e42e.appspot.com",
  messagingSenderId: "757540176939",
  appId: "1:757540176939:web:5cf2dd30b44bc6bd37166e",
  measurementId: "G-QF5ENJ5TVN",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
