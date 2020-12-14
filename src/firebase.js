import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyATA5noFWp6lDvoh4u8kPKfddCoiHDoyE8",
  authDomain: "panchashil-3ea92.firebaseapp.com",
  databaseURL: "https://panchashil-3ea92.firebaseio.com",
  projectId: "panchashil-3ea92",
  storageBucket: "panchashil-3ea92.appspot.com",
  messagingSenderId: "959497883650",
  appId: "1:959497883650:web:b1e236290d337c9fdf971b",
  measurementId: "G-YZY6E7J7VB",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, db, storage };
