import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostFormData, setCheckboxData, deleteActiveItem } from '@/store/redusers/postReduser';
import { get } from '@/components/helper/split';


const CheckboxSelect: React.FC<any> = ({ id, checked, name }) => {
  const dispatch = useDispatch();
  const { activeIds } = useSelector(selectPostFormData);


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
    } result.includes(value)
  };


  return (
    <div className='relative hover:cursor-pointer'>
      <input id={id} type="checkbox" className="opacity-0 w-full absolute h-full" onChange={handleParamsChange} />
      <input className='m-4 h-full ' type="checkbox" onChange={handleParamsChange} checked={checked} />
      <label className='text-white' htmlFor={id}>
        <span className='mr-4'>{id}</span>
        <span> {id.count}</span>
      </label>

    </div>

  );
};

export default CheckboxSelect;



