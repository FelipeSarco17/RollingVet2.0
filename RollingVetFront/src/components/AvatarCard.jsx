import React from 'react'

const AvatarCard = ({ dev }) => {



    return (
        <div className='p-5 flex flex-col items-center'>
            <img className='rounded-lg lg:w-64' src={dev.img} alt="" />
            <p className='font-semibold'>{dev.nombre}</p>
            <p>{dev.edad} Años</p>
        </div>
        )

}

export default AvatarCard