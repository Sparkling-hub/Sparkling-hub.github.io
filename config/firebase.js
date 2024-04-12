import { initializeApp, applicationDefault, getApp, getApps } from "firebase-admin/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJKXMOYI6KodbnJhJHAH3wsjFznYhQ-pw",
  authDomain: "sparkling-website.firebaseapp.com",
  projectId: "sparkling-website",
  storageBucket: "sparkling-website.appspot.com",
  messagingSenderId: "450613401211",
  appId: "1:450613401211:web:fa8b1b0c3511e9b1da34de",
  measurementId: "G-RB288H6HFL"
};
 
const serviceAccount = require('../../key.json');
export function initializeFirebase() {


  // Check if Firebase app is already initialized
  try {
    const app = getApp(); // Получаем экземпляр Firebase приложения
    if (!app) {
      initializeApp({
        credential: admin.credential.cert(serviceAccount),
        ...firebaseConfig // Используем firebaseConfig для инициализации
      });
    }
  
  
  
    // Ваш остальной код...
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    // Обработка ошибки и отправка ответа
  }
}