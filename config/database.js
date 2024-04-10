import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Add import for getStorage

const firebaseConfig = {
    apiKey:  process.env.DATABASE__API_KEY,
    authDomain:   process.env.DATABASE__AUTH_DOMAIN,
    projectId: process.env.DATABASE__DATABASE_URL,
    storageBucket: process.env.DATABASE__STORAGE_BUCKET,
    messagingSenderId: process.env.DATABASE__MESSAGING_SENDER_ID,
    appId: process.env.DATABASE__APP_ID ,
    measurementId:process.env.DATABASE__MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  const isSupported =
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined" &&
    window.navigator.userAgent.indexOf("Node.js") === -1;
  
  if (isSupported) {
    const analytics = getAnalytics(app);
    // Use analytics if supported
  } else {
    console.warn("Firebase Analytics is not supported in this environment.");
  }
  
  const storage = getStorage(app); // Get Storage instance
  
  // Use storage functionality
  const fileStorage = storage.bucket(); // Access the bucket for storage operations
  export { fileStorage };