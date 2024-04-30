import { ChangeEvent, useState, useEffect } from 'react';
import Input from "../ui/input-component/input";
import {login} from '@/lib/api'
import {
    authorizationForm,
    setFormData,
    setCheck,
    setCheckFormByKey,
    resetCheckForm,
    resetFormData
} from '@/store/redusers/Authorization'; 
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; 
import Submit from '@/components/ui/submit-authorization/submit-authorization'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth} from '@/config/firebase-client';
import { setUser, clearUser } from '@/store/actions/authActions';

const RegistrationForm = () => {
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission status


    const [error, setError] = useState<string | null>(null);
    const { check, checkForm, authorizationData } = useSelector(authorizationForm);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({
            ...authorizationData,
            [name]: value,
        }));
        dispatch(setCheckFormByKey({ key: name as any, value: '' }));
        if (name === "email") {
            dispatch(setCheck(null));
     
   
        }
        setError(null)
    };
    const handleLogin = async (e:any) => {
        e.preventDefault();

        if (isSubmitting) return; // Prevent multiple submissions while waiting for the timeout
        setIsSubmitting(true); // Set submitting state to true

        setTimeout(async () => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, authorizationData.email, authorizationData.password);
                const user = userCredential.user;
                setError(null);

            } catch (error:any) {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError("Invalid login or password");
                console.error('Error logging in user:', error.message);
            } finally {
                setIsSubmitting(false); // Reset submitting state after login attempt
            }
        }, 500)
      };


    return (
        <form  className='relative'>
      
               {error && <div className='text-red-500 absolute bottom-0 left-[50%]'>{error}</div>} 

           <label>
                Email:
                <Input
                    type="text"
                    name="email"
                    value={authorizationData.email}
                    placeholder="Full Name"
                    onChange={handleInputChange}
                    checked={check === false && checkForm.email.length > 0 || check === false}
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
{/* 
            <Submit type="submit" disabled = {true} onClick={login} requiredKeys={['name', 'email', 'password']} name='Authorization'></Submit> */}
             <button
                    type="submit"
                 
                    value={'start'}
            
                    onClick={handleLogin}
        
                >login</button>
        </form>
    );
};

export default RegistrationForm;
