import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJKXMOYI6KodbnJhJHAH3wsjFznYhQ-pw",
  authDomain: "sparkling-website.firebaseapp.com",
  projectId: "sparkling-website",
  storageBucket: "sparkling-website.appspot.com",
  messagingSenderId: "450613401211",
  appId: "1:450613401211:web:fa8b1b0c3511e9b1da34de",
  measurementId: "G-RB288H6HFL"
};
const app = initializeApp(firebaseConfig);
console.log( process.env.DATABASE_API_KEY)

const auth = getAuth(app); 
const firestore = getFirestore(app); 

export { app, auth, firestore };  

export function firebaseInit() {
  if (!getApps().length) {
  initializeApp(firebaseConfig);}
}
