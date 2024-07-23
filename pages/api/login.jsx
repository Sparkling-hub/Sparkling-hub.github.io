import { firebaseGetApp } from '../../config/firebase-client';
import { getAuth, signInWithEmailAndPassword } from 'firebase-admin/auth';
import { getApp } from 'firebase-admin/app'; 

firebaseGetApp();

const app = getApp();


export default async function loginUserWithEmailAndPassword(req, res) {
  const { email, password } = req.body;

  try {
   const userRecord= signInWithEmailAndPassword(getAuth(app), email, password);
    console.log("User logged in:", userRecord.uid);
    res.status(200).send({ success: true, uid: user.uid });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

