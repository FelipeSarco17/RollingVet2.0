import React from 'react'

const ReviewCard = ({ review }) => {
    const estrellasSvg = [];

    for(let i=0; i<5;i++){
        if(i<review.estrellas){
            estrellasSvg.push(<svg key={`estrella${i}`} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>)
        }
        else{
            estrellasSvg.push(<svg  key={`estrella${i}`} className="w-4 h-4 text-gray-200 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>)
        }
    }

    return (
        <div className=" w-[200px] md:w-[300px] mx-5 mb-8 border border-gray-200 rounded-lg shadow-sm  md:mb-12 bg-white">
            <figure className="flex w-[200px] md:w-[300px] flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-lg">
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 ">
                    
                    <p className="text-lg font-semibold text-gray-900">"{review.descripcion}"</p>
                </blockquote>
                <figcaption className="flex flex-col items-center justify-center">
                    <div className='flex items-center justify-center'>
                        <img className="rounded-full w-9 h-9" src={review.img} alt="profile picture" />
                        <div className="space-y-0.5 font-medium text-left rtl:text-right ms-3">
                            <div>{review.nombre}</div>
                        </div>
                    </div>

                    <div className="flex items-center mt-2.5 mb-5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            {
                                estrellasSvg
                            }
                            
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">{review.estrellas}.0</span>
                    </div>
                </figcaption>
            </figure>

        </div>
    )
}

export default ReviewCard