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
    );
};

export default RegistrationForm;
