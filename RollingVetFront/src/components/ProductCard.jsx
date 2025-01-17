import React from 'react'

const ProductCard = ({name,image}) => {
    return (
        <div className='bg-white group p-4 rounded-xl'>
            <img className="bg-white max-w-full rounded-lg group-hover:hidden" src={image}/>
            <h3 className='font-bold text-white text-3xl w-0 h-0 overflow-hidden group-hover:inline group-hover:text-black transition-all ease-in duration-500 delay-0'>{name}</h3>
        </div>
    )
}

export default ProductCard