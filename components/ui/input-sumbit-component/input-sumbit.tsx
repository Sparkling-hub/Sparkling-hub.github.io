import React, { SyntheticEvent } from 'react';

import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectForm,
  selectIsValidEmail,
  setCheck,
  resetFormData,
  setCheckFormByKey,
  resetCheckForm
} from '@/store/redusers/FormSliceReduser';

interface InputSubmitProps {
  name: string;
  type: string;
  disabled: boolean;
  file?: File|null;
  onClick: any;
  requiredKeys: string[];
  resetFile?: () => void | undefined;
}

const InputSubmit: React.FC<InputSubmitProps> = ({ name, type, disabled, onClick,file, requiredKeys, resetFile}) => {

  const { formData } = useSelector(selectForm);
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
 
    dispatch(setCheck(selectIsValidEmail(formData.email)));
    if (disabled && selectIsValidEmail(formData.email)) {
      disabled= false;
      toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('Promise is pending...!')); 
          }, 2000);
        }),
        {
          pending: 'Sending a message...', 
        }
      );
      try {
       await onClick(formData, file);
        dispatch(resetFormData());
        dispatch(resetCheckForm())
        resetFile && resetFile(); 
        toast.success('Form submitted successfully!', {
       
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce
        });
      } catch (error: any) {
       
        toast.error(<p>{error.message ||"An error occurred"}</p>, {
     
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce
        });
      }
      disabled= true;
    } 

   
  

    else {
     

      requiredKeys.filter(key => (formData as any)[key] === '')
        .map(key => { dispatch(setCheckFormByKey({ key: key, value: 'Fill in the following fields:' })) });
    }
  }
  
  const buttonClass = disabled && selectIsValidEmail(formData.email) ? 'bg-teal-500' : 'bg-color-primary-dark';

  return (
    <>   


      <input
        name={name}
        type={type}
        className={`no-underline text-white py-3 px-8 rounded-3xl p-2 w-40 m-auto ${buttonClass}`}
        onClick={(e) => {
          toast.dismiss(); 
          handleSubmit(e);
        }}
      />
      <div className='absolute top-[150%] text-center text-xl w-full font-bold'>
        <ToastContainer
        className="mt-[7%]"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
          limit={1}

        />
      </div>
    </>
  );
};

export default InputSubmit;
