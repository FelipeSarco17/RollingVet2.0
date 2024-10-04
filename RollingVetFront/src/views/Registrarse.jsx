import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/registrarse.css"
import { useForm } from 'react-hook-form'

const Registrarse = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  return (
    <main className='flex'>
      <div className=' imagenLateral hidden lg:inline ' ></div>
      <div className=' w-screen lg:w-8/12 flex flex-col items-center justify-center '>
        <h1 className='text-3xl my-8 font-bold 2xl:mb-12'>Crea tu cuenta</h1>
        <article className='  w-screen  lg:w-full p-4 md:p-12 lg:p-0'>
            <form action="#" method="POST" className='grid grid-rows-7 grid-cols-1 gap-y-8 lg:w-full lg:grid lg:grid-cols-2 lg:grid-rows-4 lg:gap-4 px-4
            2xl:px-32'>
            
            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
            <label htmlFor="" className='font-bold'>Nombre</label>
            <input type="text" placeholder='Nombre' className='rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500' />
            </div>
            
            <div className='border-black border-2 rounded-md p-3 flex flex-col '>
            <label htmlFor="" className='font-bold' >Apellido</label>
            <input type="text" placeholder='Apellido' className='rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500' />
            </div>
            
            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
            <label htmlFor="" className='font-bold'>Email</label>
            <input type="email" placeholder='Email' className='rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500' />
            </div>

            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
            <label htmlFor="" className='font-bold'>Telefono</label>
            <input type="text" placeholder='Telefono' className='rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500'/>
            </div>
            
            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
            <label htmlFor="" className='font-bold'>Contraseña</label>
            <input type="password" placeholder='Contraseña' className='rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500' />
            </div>
            
            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
            <label htmlFor="" className='font-bold'>Confirmar Contraseña</label>
            <input type="password" placeholder='Confirmar Contraseña' className='rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500' />  
            </div>
            
            <button type="submit" className='rounded-lg w-52  h-12 bg-rose-600 font-bold lg:col-span-2  
             justify-self-center '>Registrarse</button>
            </form>
            

        </article>
        <p>Ya tienes una cuenta? <Link className='text-rose-600 lg:hover:text-indigo-500 ' to="/ingresar">Iniciar Sesión</Link></p>
      </div>




    </main>
  )
}

export default Registrarse