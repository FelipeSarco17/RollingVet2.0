import React from 'react'
import goldStar from "../assets/goldStar.svg"
import grayStar from "../assets/grayStar.svg"

const ReviewCard = ({ review }) => {
    const estrellasSvg = [];

    for(let i=0; i<5;i++){
        if(i<review.estrellas){
            estrellasSvg.push(<img className='w-4 h-4' src={goldStar}/>)
        }
        else{
            estrellasSvg.push(<img className='w-4 h-4' src={grayStar}/>)
        }
    }

    return (
        <div className=" w-[200px] md:w-[300px] border border-gray-200 rounded-lg bg-white">
            <figure className="flex w-[200px] md:w-[300px] flex-col border-r border-gray-200 items-center justify-center p-8 text-center bg-white rounded-lg">
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