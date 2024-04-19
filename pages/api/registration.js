import { firebaseGetApp } from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getApps } from 'firebase/app'; // Add this import
firebaseGetApp()
console.log(getApps())
export default async function registerWithEmailAndPassword(req, res) {
    const auth = getAuth();
    const { email, password } = req.body;
    console.log(req.body.email);
    try {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Successfully signed up
                const user = userCredential.user;
                console.log("User registered:", user.uid);
                res.status(200).send({ success: true, uid: user.uid });
            })
            .catch((error) => {
                console.error("Error registering user:", error.message);
                res.status(500).send({ success: false, error: error.message });
            });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).send({ success: false, error: error.message });
    }
};
