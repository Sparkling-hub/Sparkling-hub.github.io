import React, { ChangeEvent } from 'react';
import ICheckboxSelect from '@/interface/ICheckboxSelect';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCheckboxData, deleteActiveItem, clearActiveItems} from '@/store/redusers/filterReducer';
import { get } from '../careers/search_function/search_function';

const CheckboxSelect: React.FC<ICheckboxSelect> = ({ id, checked,name }) => {
const value =id.value !='' ? id.value: "all"
console.log(value)
  const dispatch = useDispatch();
  const {

		activeIds,
	  
	  } = useSelector(selectFilter);
	

  const handleParamsChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const value = e.currentTarget.id;    
    id.value ?  dispatch(setCheckboxData({ name, value: [value] })):  dispatch(clearActiveItems({name}));  


  };


  return (
<div className='relative hover:cursor-pointer'>
    <input id={value} type="checkbox"  className="opacity-0 w-full absolute h-full" onChange={handleParamsChange}/>

      <input className='m-4 h-full hidden' type="checkbox"  onChange={handleParamsChange} checked={checked}   />  
      <label className={` ${checked?' underline text-primary-lightTeal ': " text-primary-darkTeal "}text-lg`} htmlFor={id.value?id.value:"all"}>
        <span className='mx-4'>{value}</span>
   
      </label>
    
      </div>

  );
};

export default CheckboxSelect;

