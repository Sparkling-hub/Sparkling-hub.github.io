import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Add import for getStorage

const firebaseConfig = {
  apiKey: "AIzaSyBJKXMOYI6KodbnJhJHAH3wsjFznYhQ-pw",
  authDomain: "sparkling-website.firebaseapp.com",
  projectId: "sparkling-website",
  storageBucket: "sparkling-website.appspot.com",
  messagingSenderId: "450613401211",
  appId: "1:450613401211:web:fa8b1b0c3511e9b1da34de",
  measurementId: "G-RB288H6HFL"
};


async function initializeFirebase() {
  try {
    const app = await initializeApp(firebaseConfig);
    const storage = getStorage(app); // Get storage instance

return { storage };

    // Option 1: Return storage from the function
    // Uncomment the line below to return storage
    // return storage;

    // ... use storage within the function or elsewhere with the returned value
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

// Option 1: Export storage if you returned it from the function
// Uncomment the line below to export storage
// export { initializeFirebase, storage };

// Option 2: Keep the function as-is and call it where needed
export { initializeFirebase };
