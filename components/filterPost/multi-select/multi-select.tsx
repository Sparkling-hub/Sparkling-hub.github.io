import React, { useEffect, useState, useRef } from 'react';
import CheckboxSelect from '../checkbox-filter/checkbox';
import InputLocate from '@/components/ui/custom-input-jobs';
import IMultiSelect from '@/interface/IMultiSelect';
import { useSelector } from 'react-redux';
import { selectPostFormData } from '@/store/redusers/postReduser';
import { get } from '@/components/helper/split'
import { v4 as uuidv4 } from 'uuid';
import MultiSelectActiveItem from '../active-select/active-select';


const MyMultipleSelect: React.FC<IMultiSelect> = ({ id, placeholder }) => {
  const [isActive, setIsActive] = useState(false);
  const arrowButtonRef = useRef<HTMLDivElement>(null);
  const { uniqueIds, activeIds } = useSelector(selectPostFormData);


  useEffect(() => {
    const handleArrowClick = () => {
      setIsActive(!isActive);
    };
    const arrowButton = arrowButtonRef.current;
    if (arrowButton) {
      arrowButton.addEventListener('click', handleArrowClick);
    }
    return () => {
      if (arrowButton) {
        arrowButton.removeEventListener('click', handleArrowClick);
      }
    };
  }, [isActive]);


  const data = get(uniqueIds, id);
  const activeData = get(activeIds, id);
  

  return (
    <div className={`my-multiple-select ${isActive ? 'active' : ''} m-4`} >
      <button
        className={`my-multiple-select-container w-full flex-col flex rounded-lg relative bg-color-primary-medium border-bg-color-primary-medium h-auto`}
      >
        <div className={`min-h-[32px] flex left-3 flex-wrap items-center h-auto ${activeIds.length ? ' p-3' : ''}`}>
          {activeData.map((active: any) => (
            <MultiSelectActiveItem name={id} id={active} key={active} />
          ))}
        </div>
        <div
          ref={arrowButtonRef}
          className={`arrow-open flex items-center absolute right-4 top-5 z-10`}
        >
          <img src="/img/down-arrow-svgrepo-com.svg" className={`h-3 w-3 transition-transform transform ${isActive ? 'rotate-180' : 'rotate-0'}`} alt="" />
        </div>
        <div className={`mt-4 items-left w-full`} >
          <InputLocate
            id={"focused_input"}
            type={"text"}
            placeholder={activeData.length ? "" : placeholder}
            name={id}
          />
          <div className="checkbox-list text-left flex top-19 h-max w-full left-0 
                        list flex flex-wrap items-center p-1  rounded-b-lg border-t-[1px] 
                        border-slate-200 bg-color-primary-medium border-bg-color-primary-medium"
          >
            {data.length ? data.map((dataCheckbox: any) => (
              <CheckboxSelect
                key={uuidv4()}
                id={dataCheckbox}
                checked={activeData.includes(dataCheckbox)}
                name={id}
              />
            )) : "No found"}
          </div>
        </div>
      </button>
    </div>
  );
};

export default MyMultipleSelect;
