import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCRdwpyq98B5hsKN7zI4GQPQBTe_0Pl0zA",
  authDomain: "sparklingwebsite-b0e3b.firebaseapp.com",
  projectId: "sparklingwebsite-b0e3b",
  storageBucket: "sparklingwebsite-b0e3b.appspot.com",
  messagingSenderId: "820795293066",
  appId: "1:820795293066:web:025d40873333404518dc73",
  measurementId: "G-XTV0F37GER"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); 
const firestore = getFirestore(firebaseApp); 
const storage = getStorage(firebaseApp)

export { firebaseApp, auth, firestore, storage};  

