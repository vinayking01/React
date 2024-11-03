//1. setup - configuration file of database


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// firebaseConfig: Contains Firebase project details (from Firebase Console).
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_APIKEY),
  authDomain: String(import.meta.env.VITE_authDomain),
  projectId: String(import.meta.env.VITE_projectId),
  storageBucket: String(import.meta.env.VITE_storageBucket),
  messagingSenderId: String(import.meta.env.VITE_messagingSenderId),
  appId: String(import.meta.env.VITE_appId),
  measurementId: String(import.meta.env.VITE_measurementId)
};

// console.log(firebaseConfig)

// Initialize and export Firebase Authentication
export const app = initializeApp(firebaseConfig);

// Sets up Firebase Authentication. We export auth so other parts of our app can use it.
export const auth = getAuth(app)

export const db = getFirestore(app);