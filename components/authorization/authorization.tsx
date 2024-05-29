<<<<<<< HEAD
import { ChangeEvent } from 'react';
import Input from "../ui/input-component/input";
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
import Submit from '@/components/ui/submit-reg/submit-reg'
const RegistrationForm = () => {
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
   ``
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
   
    };

    return (
        <form onSubmit={handleSubmit}>
           
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
                    value={authorizationData.name}
                    placeholder="Password"
                    onChange={handleInputChange}
                    checked={checkForm.name.length > 0}
                />
            </label>

            <Submit type="submit" disabled = {true} onClick={1} requiredKeys={['name', 'email', 'password']} name='Authorization'></Submit>
        </form>
=======
import { ChangeEvent, useEffect, useState } from "react";

import {
  authorizationForm,
  setFormData,
  setCheck,
  setCheckFormByKey,
} from "@/store/redusers/Authorization";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/firebase-client";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { authorizationData } = useSelector(authorizationForm);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(
      setFormData({
        ...authorizationData,
        [name]: value,
      })
>>>>>>> 824411a (redid design)
    );
    dispatch(setCheckFormByKey({ key: name as any, value: "" }));
    if (name === "email") {
      dispatch(setCheck(null));
    }
    setError(null);
  };

  const handleSignOut = async (e: any) => {
    signOut(auth)
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch((error) => {});
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
    <div>
      {isAuthenticated ? (
        <div className="flex flex-col items-center">
          <span className="text-2xl text-primary-darkTeal font-bold">
            Hello Admin!
          </span>

          <button
            type="button"
            className="no-underline relative text-white py-3 px-8 bg-color-primary-dark  rounded-full z-10  hover:bg-teal-700 m-10"
            onClick={handleSignOut}
          >
            sign out
          </button>
        </div>
      ) : (
        <form className="relative" onSubmit={handleLogin}>
          <div className="flex items-center justify-center pb-3">
            <div className="w-full max-w-md p-8">
              <h2 className="text-black text-center mb-12 border-b-2 border-primary-dark w-fit text-3xl font-extrabold py-2 px-5">
                Login
              </h2>
              <div>
                <div className="relative mb-6 flex  border-b-2 border-primary-dark  items-center pb-2">
                  <img src="/img/login/login.svg" className="h-6 w-5" alt="" />

                  <input
                    type="text"
                    name="email"
                    placeholder="Login"
                    value={authorizationData.email}
                    autoComplete="off"
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 text-black  border-primary-dark  bg-transparent outline-none focus:outline-none"
                  />
                </div>{" "}
                <div className="relative mb-6 flex  border-b-2 border-primary-dark  items-center pb-2">
                  <img
                    src="/img/login/password.svg"
                    className="h-6 w-6"
                    alt=""
                  />
                  <input
                    type="password"
                    name="password"
                    value={authorizationData.password}
                    placeholder="Password"
                    autoComplete="false"
                    onChange={handleInputChange}
                    className="w-full py-2 px-3 text-black bg-transparent  focus:outline-none"
                  />
                </div>
                <button
                  className="btn p-3 rounded-[8px] btn-primary btn-block login-button text-white bg-color-primary-dark w-full "
                  type="submit"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>   {error && <div className="text-red-500 absolute bottom-0 m-auto w-full text-center">{error}</div>}
        </form>
      )}
   
    </div>
  );
};

export default RegistrationForm;
