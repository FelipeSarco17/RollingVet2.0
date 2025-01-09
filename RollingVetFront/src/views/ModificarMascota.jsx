import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { modificarMascota, capturarUnaMascota, leerMascotas } from "../utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
// import { modificarPetSchema } from "../validations/petSchema";
import DropdownEspecies from "../components/DropdownEspecies";


/////////////////////////// FALTAN AGREGAR VALIDACIONES PARA LOS CAMPOS DEL FORMULARIO ///////////////////////////////////////////////////////



const ModificarMascota = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm(/*{ resolver: zodResolver(modificarPetSchema) }*/);
  const { id } = useParams();

  const modificarDatos = (obj) => {
    modificarMascota(id, obj);
    navigate("/admin/gestionMascotas");
  };

  const obtenerProducto = async (id) => {
    try {
      let data = await capturarUnaMascota(id);
      let obj = data.mascota;

      if (obj) {
        setValue("nombre", obj.nombre);
        setValue("especie", obj.especie);
        setValue("descripcion", obj.descripcion);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerProducto(id);
  }, [id]);

  return (
    <main className="flex justify-center items-center py-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl font-bold text-black">
          Modificar Mascota
        </h1>
        {/* Botón de regresar */}
        <button
          onClick={() => navigate("/admin/gestionMascotas")}
          className="flex items-center gap-2 mb-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22.703" height="21.928">
            <path transform="scale(-0.8, 0.8) translate(-22.703, 3)" d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z" />
          </svg>
          Regresar
        </button>

        <form onSubmit={handleSubmit(modificarDatos)}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("nombre", { required: "Este campo es obligatorio." })}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Descripción</label>
            <textarea
              placeholder="Agrega brevemente cualquier detalle que nos brinde información sobre la mascota"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md h-32 resize-none"
              {...register("descripcion", { required: "Este campo es obligatorio." })}
            ></textarea>
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
            )}
          </div>

          {/* Botón de submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Modificar Mascota
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ModificarMascota;