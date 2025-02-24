import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { registrarEspecie } from "../utils/utils";
import Swal from "sweetalert2";



const RegistrarEspecie = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm(/*{ resolver: zodResolver(PetSchema) }*/);


  const handleRegresar = () => {
    Swal.fire({
      title: "¿Deseas regresar?",
      text: "Advertencia: No se guardarán los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin/gestionEspecies");
      }
    });
  }

  const RegistrarEspecie = async (obj) => {
    console.log(obj);
        Swal.fire({
                  title: "¿Deseas Registrar la especie?",
                  text: "Asegúrate que esté escrita correctamente.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#008000",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Aceptar",
                  cancelButtonText: "Cancelar"
                }).then((result) => {
                  if (result.isConfirmed) {

                    const especieNueva = {
                      especie: obj.Especie
                    }
                    console.log(especieNueva);
                    
                    let res = registrarEspecie(especieNueva).then(
                      Swal.fire({
                        title: "¡Especie Registrada Exitosamente!",
                        icon: "success"
                      }),  navigate("/admin/gestionEspecies")
                    )
                   
                    
                      
                    
                    
                    
                  }
                });

   
  };

  return (
    <main className="flex justify-center items-center py-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
      <h1 className="mb-5 text-4xl font-bold text-black">
        Crear Especie
      </h1>
        {/* Botón de regresar */}
        <button
          onClick={() => handleRegresar()}
          className="flex items-center gap-2 mb-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
           <svg xmlns="http://www.w3.org/2000/svg" width="22.703" height="21.928">
           <path transform="scale(-0.8, 0.8) translate(-22.703, 3)" d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z"/>
           </svg>
  Regresar
        </button>

        <form onSubmit={handleSubmit(RegistrarEspecie)}>
          {/* Especie */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Especie</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("Especie", { required: "Este campo es obligatorio." })}
            />
            {errors.especie && (
              <p className="text-red-500 text-sm mt-1">{errors.especie.message}</p>
            )}
          </div>


          {/* Botón de submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Agregar Especie
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegistrarEspecie;