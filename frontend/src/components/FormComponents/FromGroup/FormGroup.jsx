import React from 'react'

const FormGroup = ({label, children}) => {
  return (
    <div className="form-group">
          <label>{label}</label>
         {children}
        </div>
  )
}

export default FormGroup