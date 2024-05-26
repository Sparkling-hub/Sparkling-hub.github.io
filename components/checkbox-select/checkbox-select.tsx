import React, { ChangeEvent } from 'react';
import ICheckboxSelect from '@/interface/ICheckboxSelect';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCheckboxData, deleteActiveItem } from '@/store/redusers/filterReducer';
import { get } from '../careers/search_function/search_function';

const CheckboxSelect: React.FC<ICheckboxSelect> = ({ id, checked,name }) => {

  const dispatch = useDispatch();
  const {

		activeIds,
	  
	  } = useSelector(selectFilter);
	

  const handleParamsChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const value = e.currentTarget.id;    
    let result = get(activeIds, name)
    if (!result.includes(value)) {
      result = [...result, value];      
      dispatch(setCheckboxData({ name, value: result }));     
    }
    else {
      result = result.filter((item) => item !== value);      
      dispatch(deleteActiveItem({ id: value, ids: result, name }));     
    }
  };


  return (
<div className='relative hover:cursor-pointer'>
    <input id={id.value} type="checkbox"  className="opacity-0 w-full absolute h-full" onChange={handleParamsChange}/>

      <input className='m-4 h-full ' type="checkbox"  onChange={handleParamsChange} checked={checked}   />  
      <label className='text-white' htmlFor={id.value}>
        <span className='mr-4'>{id.value}</span>
        <span> {id.count}</span>
      </label>
    
      </div>

  );
};

export default CheckboxSelect;

