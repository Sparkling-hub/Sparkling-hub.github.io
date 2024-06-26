import { EditorState } from 'draft-js';
import React, { ChangeEvent, MouseEventHandler } from 'react';

interface InputProps {
  name: string ;
  type: string ;
  placeholder?: string ;
  value: string | EditorState | string [];
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: Function;
  allowedFileTypes?:string
checked?: boolean;
}



const Input: React.FC<InputProps> = ({ name, type, placeholder, value, onChange,checked,onClick,allowedFileTypes }) => {



  const isEmptyValue = () => {
    if (typeof value === 'string') {
      return value.length === 0;
    } else if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return false;
    }
  };
  return (
    <div className='relative'>
    <input
      name={name}
      type={type}

      value={value}
      onChange={onChange}
      onClick={onClick as MouseEventHandler<HTMLInputElement>}
      accept={allowedFileTypes} 
      className={`border  rounded-3xl p-4 w-full my-5 ${ checked ? 'border-red-500':'border-primary-dark' }`}
    />
    {isEmptyValue() ?
    <p className='absolute top-0 select-none flex h-full items-center text-gray-400 pointer-events-none	  p-5'>{placeholder}{`
     `}<span className='text-red-500 text-2xl mx-1'>{' '}{checked!=undefined?'*':''}</span></p>:''}
    </div>
  );
};

export default Input;
