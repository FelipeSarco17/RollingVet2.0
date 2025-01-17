import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { registrarMascota, modificarPaciente } from "../utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "../validations/petSchema";
import DropdownEspecies from "../components/DropdownEspecies";
import { useAuth } from "../contexts/AuthProvider";




const RegistrarMascota = () => {
  
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({ resolver: zodResolver(petSchema) });
  const { user, modificarUsuario } = useAuth()
  const RegistrarMascota = async (obj) => {
    console.log(obj);

    const mascotaNueva = {
      nombre: obj.nombre,
      especie: obj.especie,
      descripcion: obj.descripcion || "Sin descripción",
      propietarioID: obj.propietarioID,
    }
    console.log(mascotaNueva);
    let res = await registrarMascota(mascotaNueva)
if (res) {
      // Actualiza la lista de mascotas del usuario con la nueva ID
      console.log(res);
      const mascotaID = res.data.mascota.uid;
      const nuevasMascotasIDs = [...user.mascotasIDs, mascotaID];
      const nuevoUsuario = {...user, mascotasIDs: nuevasMascotasIDs} 

      modificarUsuario(nuevoUsuario).then(navigate("/user/userpage"))
      
      
      
  };
}

  useEffect(() => {
    
    if (user) {
      setValue("especie", "");
      setValue("propietarioID", user.id)
      console.log(user.id);
      
    }
  },[user]);
    console.log(watch())
  return (
    <main className="flex justify-center items-center py-8">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="mb-5 text-4xl font-bold text-black">
          Crear Mascota
        </h1>
        {/* Botón de regresar */}
        <button
          onClick={() => navigate("/user/userpage")}
          className="flex items-center gap-2 mb-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22.703" height="21.928">
            <path transform="scale(-0.8, 0.8) translate(-22.703, 3)" d="M1.056 21.928c0-6.531 5.661-9.034 10.018-9.375V18.1L22.7 9.044 11.073 0v4.836a10.5 10.5 0 0 0-7.344 3.352C-.618 12.946-.008 21 .076 21.928z" />
          </svg>
          Regresar
        </button>

        <form onSubmit={handleSubmit(RegistrarMascota)}>
          {/* Nombre */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("nombre")}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>

          {/* Especie */}
          <DropdownEspecies label={"Especie"} onSelect={(opcion) => setValue("especie", opcion.label) }/>
          {errors.especie && (
              <p className="text-red-500 text-sm mt-1">{errors.especie.message}</p>
            )}

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              placeholder="Agrega brevemente cualquier detalle que nos brinde información sobre la mascota"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md h-32"
              {...register("descripcion")}
            />
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
            )}
            {errors.propietarioID && (
              alert(errors.propietarioID.message)
            )}
          </div>

          {/* Botón de submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Agregar Mascota
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegistrarMascota;