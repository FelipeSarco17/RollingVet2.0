import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/registrarse.css"
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '../validations/userSchema'

import MensajeError from '../common/MensajeError'

const Registrarse = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ resolver: zodResolver(userSchema) })
  const navigate = useNavigate()
  const {registroUsuario} = useAuth()

  const onSubmit =  async (obj) => {
    const usuarioNuevo = {
      nombre: obj.nombre,
      apellido: obj.apellido,
      email: obj.email,
      telefono: obj.telefono,
      clave: obj.clave
    }
    let res = await registroUsuario(usuarioNuevo)
    return res;
  }

  return (
    <main className='flex'>
      <div className=' imagenLateral hidden lg:inline ' ></div>
      <div className=' w-screen lg:w-8/12 flex flex-col items-center justify-center '>
        <h1 className='text-3xl my-8 font-bold 2xl:mb-12'>Crea tu cuenta</h1>
        <article className='  w-screen  lg:w-full p-4 md:p-12 lg:p-0'>
          <form  action="#" method='POST' onSubmit={handleSubmit(onSubmit)} className='grid grid-rows-7 grid-cols-1 gap-y-8 lg:w-full lg:grid lg:grid-cols-2 lg:grid-rows-4 lg:gap-4 px-4
            2xl:px-32'>

            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
              <label htmlFor="" className='font-bold'>Nombre</label>
              <div className='flex w-full '>
                <input type="text" placeholder='Nombre' className='w-full rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500'
                  required
                  {...register("nombre")}
                />
                {errors.nombre?.message && <MensajeError mensaje={errors.nombre.message} />}
              </div>

              {/* {errors.nombre?.message && <img src={errorIcon} alt="errorIcon" />} */}
            </div>

            <div className='border-black border-2 rounded-md p-3 flex flex-col '>
              <label htmlFor="" className='font-bold' >Apellido</label>
              <div className='flex w-full'>
                <input type="text" placeholder='Apellido' className='w-full rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500'
                  required
                  {...register("apellido")}
                />
                {errors.apellido?.message && <MensajeError mensaje={errors.apellido.message} />}
              </div>

            </div>

            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
              <label htmlFor="" className='font-bold'>Email</label>
              <div className='flex w-full'>
                <input type="email" placeholder='Email' className='w-full rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500'
                  required
                  {...register("email")}
                />
                {errors.email?.message && <MensajeError mensaje={errors.email.message} />}
              </div>

            </div>

            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
              <label htmlFor="" className='font-bold'>Telefono</label>
              <div className='flex w-full'>
                <input type="number" placeholder='Telefono' className='w-full rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500'
                  required
                  {...register("telefono")}
                />
                {errors.telefono?.message && <MensajeError mensaje={errors.telefono.message} />}
              </div>

            </div>

            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
              <label htmlFor="" className='font-bold'>Contraseña</label>
              <div className='flex w-full'>
                <input type="password" placeholder='Contraseña' className='w-full rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500'
                  required
                  {...register("clave")}
                />
                {errors.clave?.message && <MensajeError mensaje={errors.clave.message} />}
              </div>

            </div>

            <div className='border-black border-2 rounded-md p-3 flex flex-col'>
              <label htmlFor="" className='font-bold'>Confirmar Contraseña</label>
              <div className='flex w-full'>
                <input type="password" placeholder='Confirmar Contraseña' className='w-full rounded-md py-1 pr-1 focus:outline-none focus:border-sky-500 focus:ring focus:ring-sky-500'
                  {...register("confirmClave")}
                />
                {errors.confirmClave?.message && <MensajeError mensaje={errors.confirmClave.message} />}
              </div>

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