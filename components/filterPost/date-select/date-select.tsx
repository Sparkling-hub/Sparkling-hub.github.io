import { setDateRange } from '@/store/redusers/postReduser';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Filter from '../filterPost';
import { useDispatch } from 'react-redux';

const DateRangePicker = ({ onDateChange }:any) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch();
  const handleStartDateChange = (date:any) => {
    setStartDate(date);
    
    dispatch(setDateRange({ startDate: date, endDate }));
  };

  const handleEndDateChange = (date:any) => {
    setEndDate(date);
    
    dispatch(setDateRange({startDate:startDate, endDate:  date }));

  };
  console.log()
  return (
    <div className="date-range-picker z-[5] relative">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        className="datepicker-input"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className="datepicker-input"
      />
    </div>
  );
};

export default DateRangePicker;
