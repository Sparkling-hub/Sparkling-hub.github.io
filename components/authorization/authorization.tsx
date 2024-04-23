import { ChangeEvent, useState } from 'react';
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
import {firebaseInit} from '@/config/firebase-client'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app} from '@/config/firebase-client';
const RegistrationForm = () => {
    // firebaseInit()
    const [error, setError] = useState<string | null>(null); // Состояние для отслеживания ошибки

    const dispatch = useDispatch();
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

        try {
            signInWithEmailAndPassword(auth, authorizationData.email, authorizationData.password)
            .then((userCredential) => {
              const user = userCredential.user;
              setError(null); 
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setError("Invalid login or password"); 
              console.error('Error logging in user:', error.message);
            });
        } catch (error:any) {
          console.error('Error logging in user:', error.message);
        }
      };
    const handleSubmit = (e: any) => {
        e.preventDefault();
   
    };

    return (
        <form onSubmit={handleSubmit} className='relative'>
      
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
