import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../components/FormComponents/Input';
import Swal from 'sweetalert2';
import { enviarEmailPlanes } from '../utils/utils';
import { planSchema } from '../validations/contactSchema';
const Planes = () => {

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({resolver: zodResolver(planSchema)});

  const enviarEmail = async (obj) => {

    try {
      const res = await enviarEmailPlanes(obj);
      if (res) {
        Swal.fire({
          icon: "success",
          title: "Mensaje enviado exitosamente.",
          timer: 10000
        }).then(() => {
          reset();
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: `Algo salio mal: ${error.message}`
      })
    }
  }


  return (
    <main className="relative bg-gray-100 flex flex-col items-center justify-center gap-12 p-12 background-image" >
      
      <h2 className="text-3xl font-semibold mb-4 text-center">Completa este formulario y nos pondremos en contacto <br/> contigo para informarte sobre nuestros planes.</h2>
      <div className="bg-white shadow-lg rounded-lg   md:w-1/2 p-12" >
        <form onSubmit={handleSubmit(enviarEmail)} className='flex flex-col gap-12' >
          <Input  label="Nombre y Apellido" name="nombre" register={register} type="text" error={errors.nombre?.message} />
          <Input label="Email" name="email" register={register} type="email" error={errors.email?.message} />
          <Input label="Telefono" name="telefono" register={register} type="text" error={errors.email?.message} />
          <button
            type="submit"
            className="w-full my-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>

    </main >
  )
}

export default Planes


