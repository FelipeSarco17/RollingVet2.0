import React from 'react'

const ProfessionalCard = ({professional}) => {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <img className="rounded-t-lg" src={professional.img} alt="" />

            <div className="p-5">

                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{professional.name}</h5>
                <p>{professional.title}</p>
            
            </div>
        </div>
    )
}

export default ProfessionalCard