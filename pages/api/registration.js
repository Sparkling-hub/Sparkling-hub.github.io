import { firebaseGetApp } from '../../config/firebase';
import { getAuth } from "firebase-admin/auth";
import { getApp } from 'firebase-admin/app'; 

firebaseGetApp()
const app = getApp();

    const auth = getAuth(app); 
export default async function registerWithEmailAndPassword(req, res) {



    const { email, password } = req.body;

    try {
        const userRecord = await auth.createUser({
            email: email,
            password: password,
        });

        console.log("User registered:", userRecord.uid);
        res.status(200).send({ success: true, uid: userRecord.uid });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).send({ success: false, error: error.message });
    }
};

