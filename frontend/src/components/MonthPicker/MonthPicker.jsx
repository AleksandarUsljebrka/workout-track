import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MonthPicker = ({ selectedMonth, onChange }) => {
  return (
    <DatePicker
      selected={selectedMonth}
      onChange={onChange}
      dateFormat="MMMM yyyy"
      showMonthYearPicker
    />
  );
};

export default MonthPicker;
