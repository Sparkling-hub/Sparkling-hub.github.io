import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDSwnvQFMPdPZOAzpdTOFy4erXN9l5oFGg",
  authDomain: "sparkling-9efa5.firebaseapp.com",
  projectId: "sparkling-9efa5",
  storageBucket: "sparkling-9efa5.appspot.com",
  messagingSenderId: "93295510015",
  appId: "1:93295510015:web:9e1b7d748373c8526a67ca",
  measurementId: "G-N31PBPWVSS"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); 
const firestore = getFirestore(firebaseApp); 
const storage = getStorage(firebaseApp)

export { firebaseApp, auth, firestore, storage};  

