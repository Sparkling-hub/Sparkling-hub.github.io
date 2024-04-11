// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJKXMOYI6KodbnJhJHAH3wsjFznYhQ-pw",
  authDomain: "sparkling-website.firebaseapp.com",
  projectId: "sparkling-website",
  storageBucket: "sparkling-website.appspot.com",
  messagingSenderId: "450613401211",
  appId: "1:450613401211:web:fa8b1b0c3511e9b1da34de",
  measurementId: "G-RB288H6HFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
