import React, { SyntheticEvent } from 'react';

import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  authorizationForm,
  setFormData,
  setCheck,
  setCheckFormByKey,
  resetCheckForm,
  resetFormData
} from '@/store/redusers/Authorization'; // Corrected import path
import { selectIsValidEmail } from '@/store/redusers/FormSliceReduser';

interface InputSubmitProps {
  name: string;
  type: string;
  disabled: boolean;

  onClick: any;
  requiredKeys: string[];
}

const InputSubmit: React.FC<InputSubmitProps> = ({ name, type, disabled, onClick, requiredKeys}) => {
  const { check, checkForm, authorizationData } = useSelector(authorizationForm);
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    dispatch(setCheck(selectIsValidEmail(authorizationData.email)));
    if (disabled && selectIsValidEmail(authorizationData.email)) {
      try {
        await onClick(authorizationData);
         dispatch(resetFormData());
         dispatch(resetCheckForm())
        }catch (error: any) {}
  } 
  else {
     

    requiredKeys.filter(key => (authorizationData as any)[key] === '')
      .map(key => { dispatch(setCheckFormByKey({ key: key, value: 'Fill in the following fields:' })) });
  }
}
  const buttonClass = disabled && selectIsValidEmail(authorizationData.email) ? 'bg-teal-500' : 'bg-color-primary-dark';

  return (
    <div className='m-auto flex mt-4'>   


      <input
      value={name}
        name={name}
        type={type}
        className={`no-underline text-white py-3 px-8 rounded-3xl p-2 w-40 m-auto ${buttonClass}`}
        onClick={(e) => {
          handleSubmit(e)
        }}
        
      />
     
    </div>
  );
};

export default InputSubmit;
