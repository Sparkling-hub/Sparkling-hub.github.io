import React, { ChangeEvent, MouseEventHandler } from 'react';

interface InputProps {
  name: string ;
  type: string ;
  placeholder?: string ;
  value: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: Function;
checked?: boolean;
}



const Input: React.FC<InputProps> = ({ name, type, placeholder, value, onChange,checked,onClick }) => {




  return (
    <div className='relative'>
    <input
      name={name}
      type={type}

      value={value}
      onChange={onChange}
      onClick={onClick as MouseEventHandler<HTMLInputElement>}
      accept=".pdf" 
      className={`border  rounded-3xl p-4 w-full my-5 ${ checked ? 'border-red-500':'border-primary-dark' }`}
    />
    {value?.length === 0 ?
    <p className='absolute top-0 select-none flex h-full items-center text-gray-400 pointer-events-none	  p-5'>{placeholder}{`
     `}<span className='text-red-500 text-2xl mx-1'>{' '}{checked!=undefined?'*':''}</span></p>:''}
    </div>
  );
};

export default Input;
