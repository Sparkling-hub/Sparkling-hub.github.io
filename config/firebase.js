import { initializeApp, applicationDefault, getApp, getApps } from "firebase-admin/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJKXMOYI6KodbnJhJHAH3wsjFznYhQ-pw",
  authDomain: "sparkling-website.firebaseapp.com",
  projectId: "sparkling-website",
  storageBucket: "sparkling-website.appspot.com",
  messagingSenderId: "450613401211",
  appId: "1:450613401211:web:fa8b1b0c3511e9b1da34de",
  measurementId: "G-RB288H6HFL"
};

// Initialize Firebase for the client-side
initializeApp(firebaseConfig);

// Check if there already exists a Firebase app
if (!getApps().length) {
  const serviceAccount = require(process.env.SERVICE_ACCOUNT_KEY);
  console.log(serviceAccount)
  const firebaseCredentials = applicationDefault(serviceAccount);

  // Initialize Firebase Admin SDK
  initializeApp({
    credential: firebaseCredentials,
    storageBucket: "gs://sparkling-website.appspot.com",
  });
} else {
  getApp(); // if already initialized, use that one
}
