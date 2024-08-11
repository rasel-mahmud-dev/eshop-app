// Import the functions you need from the SDKs you need
import "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCba1v5X953LS5tJsQYTfp-sJ8lHcDEcqI",
  authDomain: "rs-mess.firebaseapp.com",
  projectId: "rs-mess",
  storageBucket: "rs-mess.appspot.com",
  messagingSenderId: "126295091465",
  appId: "1:126295091465:web:f1c95f992a5bde3b0a8bd8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
