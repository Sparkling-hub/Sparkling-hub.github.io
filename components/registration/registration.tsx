import { ChangeEvent } from 'react';
import Input from "../ui/input-component/input";
import {
    authorizationForm,
    setFormData,
    setCheck,
    setCheckFormByKey,
    resetCheckForm,
    resetFormData,
    setPassword
} from '@/store/redusers/Authorization'; // Corrected import path
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store'; // Исправлен путь импорта RootStat
import Submit from '@/components/ui/submit-reg/submit-reg'
import {registration} from '@/lib/api'


const RegistrationForm = () => {
    const dispatch = useDispatch();
    const { check, checkForm, authorizationData, password } = useSelector(authorizationForm);

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
     
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Your form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className='flex justify-between'>
                <div className='w-1/2 pr-2'>
                First Name:
                <Input
                    type="text"
                    name="firstName"
                    value={authorizationData.firstName}
                    placeholder="First name"
                    onChange={handleInputChange}
                    checked={checkForm.name.length > 0}
                />
         

                </div>
                <div className='w-1/2  pl-2'>
                Last Name:
                <Input
                    type="text"
                    name="lastName"
                    value={authorizationData.lastName}
                    placeholder="Last name"
                    onChange={handleInputChange}
                    checked={checkForm.name.length > 0}
                /></div>
            </label>
            <label>
                Email:
                <Input
                    type="text"
                    name="email"
                    value={authorizationData.email}
                    placeholder="Full Name"
                    onChange={handleInputChange}
                    checked={checkForm.name.length > 0}
                />
            </label>
            <label>
                Password:
                <Input
                    type="password"
                    name="password"
                    value={authorizationData.password}
                    placeholder="Password"
                    onChange={handleInputChange}
                    checked={authorizationData.password.length < 5 && authorizationData.password.length != 0}
                />
            </label>
            <label className='relative'>
                Confim password:
                {/* {checkForm.password === authorizationData.password && checkForm.password.length != 0 ? <p className='absolute top-4 text-red-500'>Password mismatch</p>: ''} */}
                <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => {  dispatch(setPassword(e.target.value))} }
                    checked={password !== authorizationData.password  && password.length != 0}
                />
            </label>
            <Submit type="submit" disabled = {true} onClick={registration} requiredKeys={['name', 'email', 'password']} name='Register'></Submit>
        </form>
    );
};

export default RegistrationForm;
