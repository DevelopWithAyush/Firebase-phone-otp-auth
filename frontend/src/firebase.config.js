// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6ZTdo_G8DRzZtqbG4B83CVX5Konk3WZ0",
  authDomain: "developwithayush-8ac5f.firebaseapp.com",
  projectId: "developwithayush-8ac5f",
  storageBucket: "developwithayush-8ac5f.appspot.com",
  messagingSenderId: "46145631406",
  appId: "1:46145631406:web:3b2767ae0d1a5b8f9f293f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
