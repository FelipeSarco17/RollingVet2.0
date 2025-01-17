import React from 'react'

const TextArea = ({ name, register, label, type,error, ...rest }, ref) => {
    return (
        <div>
            <label htmlFor={name} className="block text-gray-600 text-sm font-medium mb-2">{label}</label>
            <textarea
                className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Escribe aquí tu texto..."
                {...register(name)}
                {...rest}
            ></textarea>
             {error && <p className='text-red-600'>{error}</p>}
        </div>
    )
}

export default TextArea