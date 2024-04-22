import { firebaseGetApp } from '../../config/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase-admin/auth';
import { getApp } from 'firebase-admin/app'; // Add this import

firebaseGetApp();

// Initialize Firebase app and store it in firebaseApp
const app = getApp();
const auth = getAuth(app);

export default async function loginUserWithEmailAndPassword(req, res) {
  const { email, password } = req.body;
console.log(email)
console.log(password)
  try {
    userRecord= signInWithEmailAndPassword(getAuth(app), email, password);
    console.log("User logged in:", userRecord.uid);
    res.status(200).send({ success: true, uid: user.uid });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

