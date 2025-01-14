import React from 'react'
import FormRegistrarTurno from '../components/Forms/FormRegistrarTurno'

const RegistrarTurno = () => {

    return (
        <main className='bg-gray-100 flex justify-center items-center min-h-screen'>
            <article className="flex flex-col gap-12 w-full max-w-lg bg-white shadow-md rounded-lg p-6">
                <h3 className='text-center font-bold text-3xl'>Reservá tu turno</h3>
                <FormRegistrarTurno/>
            </article>


        </main>
    )
}

export default RegistrarTurno