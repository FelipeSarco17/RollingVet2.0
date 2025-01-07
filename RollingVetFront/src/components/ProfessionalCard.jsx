import React from 'react'

const ProfessionalCard = ({professional}) => {
    return (
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            <img class="rounded-t-lg" src={professional.img} alt="" />

            <div class="p-5">

                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{professional.name}</h5>
                <p>{professional.title}</p>
            
            </div>
        </div>
    )
}

export default ProfessionalCard