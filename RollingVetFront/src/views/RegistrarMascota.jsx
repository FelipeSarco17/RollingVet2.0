import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { registrarMascota, modificarPaciente, leerEspecies } from "../utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema } from "../validations/petSchema";
import DropdownEspecies from "../components/DropdownEspecies";
import { useAuth } from "../contexts/AuthProvider";
import Input from "../components/FormComponents/Input";
import SelectEspecies from "../components/FormComponents/SelectEspecies";
import TextArea from "../components/FormComponents/TextArea";

const RegistrarMascota = () => {

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({resolver:zodResolver(petSchema)});
  const { user, modificarUsuario } = useAuth()
  const [especies, setEspecies] = useState([]);

  useEffect(() => {

    async function obtenerEspecies() {
      const especiesArray = await leerEspecies();
      setEspecies(especiesArray)
    }
    obtenerEspecies();
  }, []);



  const registrarMascotaNueva = async (obj) => {
    console.log(obj);

    const mascotaNueva = {
      nombre: obj.nombre,
      especie: obj.especie,
      descripcion: obj.descripcion ? obj.descripcion : "Sin descripción",
      propietarioID: user.id,
    }
    console.log(mascotaNueva);
    let res = await registrarMascota(mascotaNueva)
    console.log(res);
    
    //navigate("/user/userPage");
    // if (res) {
    //       // Actualiza la lista de mascotas del usuario con la nueva ID
    //       console.log(res);
    //       const mascotaID = res.data.mascota.uid;
    //       const nuevasMascotasIDs = [...user.mascotasIDs, mascotaID];
    //       const nuevoUsuario = {...user, mascotasIDs: nuevasMascotasIDs} 

    //       modificarUsuario(nuevoUsuario).then(navigate("/user/userpage"))

    //   };
  }

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

        <form onSubmit={handleSubmit(registrarMascotaNueva)}>
          <Input register={register} label="Nombre" name="nombre" error={errors.nombre?.message} type="text" />
          <SelectEspecies register={register} label="Especie" name="especie" error={errors.especie?.message} options={especies} />
          <TextArea label="Descripción" name="descripcion" register={register} error={errors.descripcion?.message}/>
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