import React from 'react'

const SelectEspecies = ({ name, options, register,error, label, ...rest },ref) => {
    return (
        <div>
            <label htmlFor={name} className="block text-gray-600 text-sm font-medium mb-2">{label}</label>
            <select id={name} ref={ref} {...rest} {...register(name)}  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200">
                <option value="">Selecciona una opción</option>
                {options.map((op, index) => {
                    return (
                        <option key={index} value={op.especie}>{op.especie}</option>
                    )
                })}
            </select>
            {error && <p className='text-red-600'>{error}</p>}
        </div>
    )
}

export default SelectEspecies