import React from 'react'


const ServiceCard = ({ servicio }) => {
    return (
        <div className=" w-[300px]  flex flex-col items-center bg-white border border-gray-200 rounded-lg shado">
            <img className="rounded-t-lg mt-6 w-32" src={servicio.src} alt="" />
            <div className="">
                <h5 className="text-center text-xl block w-[300px] my-5  md:text-start md:text-2xl font-bold text-gray-900 dark:text-white">{servicio.nombre}</h5>
                <p className="hidden md:inline mb-3 font-normal text-gray-700 dark:text-gray-400">{servicio.descripcion}</p>
            </div>
        </div>
    )
}

export default ServiceCard