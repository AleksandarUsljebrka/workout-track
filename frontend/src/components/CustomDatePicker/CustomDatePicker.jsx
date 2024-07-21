import React from 'react';
import './customDatePicker.css';

const CustomDatePicker = ({ selectedMonth, onChange }) => {
  const handleMonthChange = (event) => {
    const [year, month] = event.target.value.split('-');
    const newDate = new Date(year, month - 1);
    onChange(newDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  };

  return (
    <div className="month-picker">
      <label htmlFor="month">Select Month: </label>
      <input
        type="month"
        id="month"
        value={formatDate(selectedMonth)}
        onChange={handleMonthChange}
      />
    </div>
  );
};

export default CustomDatePicker;
