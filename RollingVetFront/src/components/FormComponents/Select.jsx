import React, { forwardRef } from "react";

const Select = ({ name, options, register, error, label, ...rest }, ref) => {
    
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-600 text-sm font-medium mb-2">{label}</label>
      <select
        id={name}
        {...register(name)}
        {...rest}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      >
        <option value="">Selecciona una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default Select;