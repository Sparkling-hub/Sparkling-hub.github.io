import { setDateRange, setOrder, selectPostFormData } from '@/store/redusers/postReduser';
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


  const toggleSortOrder = () => {
    dispatch(setOrder());
  };

  
  return (
    <div className="date-range-picker w-full z-[5] mx-4 py-2   flex relative">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="datepicker-input  w-2/3"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className="datepicker-input w-2/3"
      />
      <button className='bg-white rounded-[5px] w-8 scale-125 font-bold' onClick={toggleSortOrder}>
        <strong className={`${filter.sortOrder ? 'text-black  text-[10px]' : 'text-primary-darkTeal font-black'}`}>🠕</strong>
        <strong className={`${filter.sortOrder ? 'text-primary-darkTeal font-black ' : 'text-black text-[10px]'}`}>🠗</strong>
      </button>    </div>
  );
};

export default DateRangePicker;
