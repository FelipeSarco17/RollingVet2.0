import React from 'react'

const Header = () => {
    return (
        <header className='w-screen relative'>
            <img className='scale-100' src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/L6GI2ZSXFZGADESR57UO666ZE4.jpg" alt="" />
            <div className='p-4 absolute bottom-2'>
                <p className=' text-lg text-rose-500 mb-3 md:text-3xl font-semibold'>El mejor lugar para cuidar tu mascota</p> 
                <a className="rounded bg-cyan-500 p-2 font-semibold text-white " href="">Pedí tu turno!</a>
            </div>

        </header>
    )
}

export default Header