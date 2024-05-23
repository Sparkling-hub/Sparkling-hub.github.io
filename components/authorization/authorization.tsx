import { ChangeEvent, useState, useEffect } from "react";
import Input from "../ui/input-component/input";

import {
    authorizationForm,
    setFormData,
    setCheck,
    setCheckFormByKey,
} from "@/store/redusers/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-client";


const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status
    const [error, setError] = useState<string | null>(null);
    const { check, checkForm, authorizationData } = useSelector(authorizationForm);

    
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
        <form className="relative">
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
            <button type="submit" value={"start"} onClick={handleLogin}>
                login
            </button>
        </form>
    );
};

export default RegistrationForm;
