import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmq7ffkXetQCzuCSEym5aQm1-nr4ogFAo",
  authDomain: "react-todo-app-f4875.firebaseapp.com",
  projectId: "react-todo-app-f4875",
  storageBucket: "react-todo-app-f4875.appspot.com",
  messagingSenderId: "621583121569",
  appId: "1:621583121569:web:60c73a91645a89900f44e0",
  measurementId: "G-6VQ49504ER",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };
