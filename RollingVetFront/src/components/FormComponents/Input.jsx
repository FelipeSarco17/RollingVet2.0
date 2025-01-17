import React from 'react'

const Input = React.forwardRef(({ name, register, label, type,error, ...rest }, ref) => {
    return (
        <div>
            <label htmlFor="" className="block text-gray-600 text-sm font-medium mb-2">{label}</label>
            <input type={type} name={name} ref={ref} {...register(name)} {...rest} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
            {error && <p className='text-red-600'>{error}</p>}
        </div>
    )
})
export default Input