import React, { ChangeEvent } from 'react';

interface TextAreaProps {
  name: string;

  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  checked?: boolean;}

const TextArea: React.FC<TextAreaProps> = ({ name, placeholder, value, onChange,checked }) => {
  return (
    <div className='relative'>
    <textarea
name={name}
      value={value}
      className={`border border-primary-dark rounded-3xl p-4 w-full my-5 h-40 resize-none ${checked?'border-red-500':'border-primary-dark'}`} 
      onChange={onChange}
    />
    {value?.length === 0 ?
      <p className='absolute top-0 my-5 h-40 select-none flex h-full text-gray-400 pointer-events-none	  p-5'>{placeholder}{`
       `}<span className='text-red-500 mx-1 text-2xl'>{' '}{checked!=undefined?'*':''}</span></p>:''}
      </div>
  );
};

export default TextArea;