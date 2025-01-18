import React from 'react'
import MapaSucursal from '../components/MapaSucursal';
import Input from "../components/FormComponents/Input"
import TextArea from "../components/FormComponents/TextArea"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '../validations/contactSchema';
import Swal from 'sweetalert2';
import { enviarEmailCliente } from '../utils/utils';

const Contacto = () => {
  
  const sucursal1 = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.105917472263!2d-65.2097419238373!3d-26.836583276692668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1737154997734!5m2!1ses-419!2sar"

  const { register, handleSubmit, formState: { errors }, reset,watch } = useForm({resolver: zodResolver(contactSchema)});

  const enviarEmail = async(obj)=>{

    try{
      const res = await enviarEmailCliente(obj);
      if(res){
        Swal.fire({
          icon:"success",
          title:"Mensaje enviado exitosamente.",
          timer:10000
        }).then(()=>{
          reset();
        })
      }
    }catch(error){
        Swal.fire({
          icon:"error",
          title: "Oops!",
          text: `Algo salio mal: ${error.message}`
        })
    }

  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Contáctanos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Primera sucursal */}
          <MapaSucursal src={sucursal1} title="Sucursal Av.Belgrano 3501" telefono="381634244"/>

          {/* Formulario */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Formulario de Contacto</h2>
            <form onSubmit={handleSubmit(enviarEmail)}>
              <Input label="Nombre" name="cliente" register={register} type="text" error={errors.cliente?.message}/>
              <Input label="Email" name="email" register={register} type="email" error={errors.email?.message}/>
              <TextArea label="Mensaje" name="texto" register={register} error={errors.texto?.message}/>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Segunda sucursal */}
          <MapaSucursal src={sucursal1} title="Sucursal Av.Ejercito del Norte 100" telefono="381634244"/>
        </div>
      </div>
    </main>
  );
}

export default Contacto