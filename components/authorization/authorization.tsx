import { ChangeEvent, useEffect, useState } from "react";
import Input from "../ui/input-component/input";

import {
    authorizationForm,
    setFormData,
    setCheck,
    setCheckFormByKey,
} from "@/store/redusers/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword,onAuthStateChanged,signOut  } from "firebase/auth";
import { auth } from "@/config/firebase-client";



const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [error, setError] = useState<string | null>(null);
    const { check, checkForm, authorizationData } = useSelector(authorizationForm);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user) {
              setIsAuthenticated(true)
    
            } else {
                setIsAuthenticated(false)
            }
          });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(
            setFormData({
                ...authorizationData,
                [name]: value,
            })
        );
        dispatch(setCheckFormByKey({ key: name as any, value: "" }));
        if (name === "email") {
            dispatch(setCheck(null));
        }
        setError(null);
    };

    const handleSignOut = async (e: any) => {
        signOut(auth).then(() => {
            setIsAuthenticated(false)
          }).catch((error) => {
  
          });
    }
    const handleLogin = async (e: any) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setTimeout(async () => {
            try {
                 await signInWithEmailAndPassword(
                    auth,
                    authorizationData.email,
                    authorizationData.password
                );
          
                setError(null);
            } catch (error: any) {
                setError("Invalid login or password");
                console.error("Error logging in user:", error.message);
            } finally {
                setIsSubmitting(false);
            }
        }, 500);
    };


    return (
        <div>
            {isAuthenticated ? (
                <div className="flex flex-col items-center">
                    <span className="text-2xl text-primary-darkTeal font-bold">Hello Admin!</span>
                    
                    <button type="button" className="no-underline relative text-white py-3 px-8 bg-color-primary-dark  rounded-full z-10  hover:bg-teal-700 m-10" onClick={handleSignOut}>signOut</button>
                </div>
            ) : (
                <form className="relative" onSubmit={handleLogin}>
                    {error && (
                        <div className="text-red-500 absolute bottom-0 left-[50%]">{error}</div>
                    )}
                    
                    <label>
                        Email:
                        <Input
                            type="text"
                            name="email"
                            value={authorizationData.email}
                            placeholder="Full Name"
                            onChange={handleInputChange}
                            checked={
                                (check === false && checkForm.email.length > 0) || check === false
                            }
                        />
                    </label>
                    <label>
                        Password:
                        <Input
                            type="text"
                            name="password"
                            value={authorizationData.password}
                            placeholder="Password"
                            onChange={handleInputChange}
                            checked={checkForm.name.length > 0}
                        />
                    </label>
                    <button type="submit" value={"start"}>login</button>
                </form>
            )}
        </div>
    );
};

export default RegistrationForm;
