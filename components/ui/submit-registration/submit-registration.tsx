import React, { SyntheticEvent, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  authorizationForm,

  setCheck,
  setCheckRegByKey,
  resetCheckForm,
  resetFormData
} from '@/store/redusers/Authorization'; 
import { selectIsValidEmail } from '@/store/redusers/FormSliceReduser';


interface InputSubmitProps {
  name: string;
  type: string;
  disabled: boolean;
  onClick: any;
  requiredKeys: string[];
}


const InputSubmit: React.FC<InputSubmitProps> = ({ name, type, disabled, onClick, requiredKeys}) => {
  const { registrationData } = useSelector(authorizationForm);
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null); 


  const handleSubmit = async (e: SyntheticEvent) => {
    dispatch(setCheck(selectIsValidEmail(registrationData.email)));
    if (disabled && selectIsValidEmail(registrationData.email)) {
      try {
        await onClick(registrationData);
         dispatch(resetFormData());
         dispatch(resetCheckForm())
        }catch (error: any) {setError('The email address is already')}
  } 
  else {
    requiredKeys.filter(key => (registrationData as any)[key] === '')
      .map(key => { dispatch(setCheckRegByKey({ key: key, value: 'Fill in the following fields:' })) });
  }
}

  const buttonClass = disabled && selectIsValidEmail(registrationData.email) ? 'bg-teal-500' : 'bg-color-primary-dark';


  return (
    <div className='m-auto flex mt-4 relative'>   
      <input
      value={name}
        name={name}
        type={type}
        className={`no-underline text-white py-3 px-8 rounded-3xl p-2 w-40 m-auto ${buttonClass}`}
        onClick={(e) => {
          handleSubmit(e)
        }}        
      />
     <p className='absolute  bottom-[-2.5rem] w-full text-red-500'>{error}</p>
    </div>
  );
};

export default InputSubmit;
