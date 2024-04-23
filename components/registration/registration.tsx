import { ChangeEvent, useState } from 'react';
import Input from "../ui/input-component/input";
import {
    authorizationForm,
    setCheck,
    setCheckRegByKey,
    resetCheckForm,
    resetFormData,
resetRegistrationData,
setRegistrationData
} from '@/store/redusers/Authorization'; // Corrected import path
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Исправлен путь импорта RootStat
import Submit from '@/components/ui/submit-registration/submit-registration'
import {registration} from '@/lib/api'


const RegistrationForm = () => {

    const dispatch = useDispatch();
    const { check, checkReg, registrationData  } = useSelector(authorizationForm);
   
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        dispatch(setRegistrationData({
            ...registrationData,
            [name]: value,
        }));
        dispatch(setCheckRegByKey({ key: name as any, value: '' }));
        if (name === "email") {
            dispatch(setCheck(null));
            
        }
     
    };


    return (
        <form>
            <label className='flex justify-between'>
                <div className='w-1/2 pr-2'>
                First Name:
                <Input
                    type="text"
                    name="firstName"
                    value={registrationData.firstName}
                    placeholder="First name"
                    onChange={handleInputChange}
                    checked={checkReg.firstName.length > 0}
                />
         

                </div>
                <div className='w-1/2  pl-2'>
                Last Name:
                <Input
                    type="text"
                    name="lastName"
                    value={registrationData.lastName}
                    placeholder="Last name"
                    onChange={handleInputChange}
                    checked={checkReg.lastName.length > 0}
                /></div>
            </label>
            <label>
                Email:
                <Input
                    type="text"
                    name="email"
                    value={registrationData.email}
                    placeholder="Full Name"
                    onChange={handleInputChange}
                    checked={checkReg.email.length > 0}
                />
            </label>
            <label>
                Password:
                <Input
                    type="password"
                    name="password"
                    value={registrationData.password}
                    placeholder="Password"
                    onChange={handleInputChange}
                    checked={registrationData.password.length < 6 && registrationData.password.length != 0}
                />
            </label>
            <label className='relative'>
                Confim password:
                {/* {checkReg.password === registrationData.password && checkReg.password.length != 0 ? <p className='absolute top-4 text-red-500'>Password mismatch</p>: ''} */}
                <Input
                    type="password"
                    name="confirmPassword"
                    value={registrationData.confirmPassword}
                    placeholder="confirm password"
                   onChange={handleInputChange}
                    checked={registrationData.confirmPassword !== registrationData.password  &&  registrationData.confirmPassword.length != 0 && registrationData.confirmPassword.length < 6}
                />
            </label>
            <Submit
  type="submit"
  disabled={
    !!(
      registrationData.confirmPassword === registrationData.password &&
      registrationData.password.length > 5 &&
      registrationData.email &&
      registrationData.firstName &&
      registrationData.lastName
    )
  }
  onClick={registration}
  requiredKeys={['name', 'email', 'password', 'confirmPassword']}
  name='Register'
></Submit>
    </form>
    );
};

export default RegistrationForm;
