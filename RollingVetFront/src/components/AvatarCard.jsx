import React from 'react'

const AvatarCard = ({ dev }) => {



    return (
        <div className='p-5 flex flex-col items-center '>
            <img className='rounded-lg lg:w-64' src={dev.img} alt="" />
            <div className='text-center'>
                <p className='font-semibold'>{dev.nombre}</p>
                <p>{dev.puesto}</p>
                <p>{dev.edad} Años</p>
            </div>
        </div>
    )

}

export default AvatarCard