import { setDateRange, setOrder, selectPostFormData, deleteDate } from '@/store/redusers/postReduser';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useDispatch, useSelector } from 'react-redux';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { filter } = useSelector(selectPostFormData);
  const dispatch = useDispatch();


  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    dispatch(setDateRange({ startDate: date ? date.toISOString() : null, endDate: endDate ? endDate.toISOString() : null }));
  };


  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    dispatch(setDateRange({ startDate: startDate ? startDate.toISOString() : null, endDate: date ? date.toISOString() : null }));
  };

const reset = () =>{
  setEndDate(null);
  setStartDate(null)
  dispatch(deleteDate())}

  const toggleSortOrder = () => {
  
    dispatch(setOrder());
  };

  
  return (
    <div className=" w-full z-[5] mx-4 py-2   flex relative">
      <div className='w-full flex'>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="px-1  w-[90%] rounded-[7px]"
      />
 <span className="mr-3 text-2xl h-[24px]  relative right-0 bottom-2">→</span> {/* Arrow between date pickers */}
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className="px-1  w-[90%] rounded-[7px]"
      />
      </div>
      <button className='bg-white rounded-[5px] w-6 h-5 scale-125 font-bold' onClick={toggleSortOrder}>
        <strong className={`${filter.sortOrder ? 'text-black  text-[10px]' : 'text-primary-darkTeal font-black'}`}>🠕</strong>
        <strong className={`${filter.sortOrder ? 'text-primary-darkTeal font-black ' : 'text-black text-[10px]'}`}>🠗</strong>
      </button>    
      <button className='bg-white rounded-[5px] w-6 h-5 scale-125 font-bold ml-3' onClick={reset}>
        Х
      </button>   
      </div>
  );
};

export default DateRangePicker;
