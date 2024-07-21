import React from "react";

const Select = ({  initialValue, values, ...props }) => {
  return (
    <select {...props}>
      <option value="">{initialValue}</option>

      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Select;
