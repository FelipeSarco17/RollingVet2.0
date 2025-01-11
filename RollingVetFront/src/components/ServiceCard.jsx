import React from 'react'


const ServiceCard = ({ servicio }) => {
    return (
        <div className=" w-32 h-60 lg:w-[300px] lg:h-[400px] flex flex-col items-center bg-white border border-gray-200 rounded-lg">
            <img className="mt-6 w-16 lg:w-32" src={servicio.src} alt="" />
            <div className="p-3">
                <h5 className="font-bold text-xl text-center">{servicio.nombre}</h5>
                <p className="hidden lg:inline mb-3 font-normal text-gray-700 dark:text-gray-400">{servicio.descripcion}</p>
            </div>
        </div>
    )
}

export default ServiceCard