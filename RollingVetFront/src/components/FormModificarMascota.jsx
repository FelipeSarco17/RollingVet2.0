import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { capturarUnaMascota, modificarMascota } from "../utils/utils";
import Input from "./FormComponents/Input"
import TextArea from "./FormComponents/TextArea"

const FormModificarMascota = ({ id, redirigir }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  // Función para obtener los datos de la mascota desde la API
  const obtenerProducto = async () => {
    try {
      const data = await capturarUnaMascota(id);
      if (data?.mascota) {
        setValue("nombre", data.mascota.nombre);
        setValue("especie", data.mascota.especie);
        setValue("descripcion", data.mascota.descripcion);
      }
    } catch (error) {
      console.error("Error al obtener la mascota:", error);
    }
  };

  useEffect(() => {
    obtenerProducto();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await modificarMascota(id, data);
      if (redirigir) {
        redirigir(); // Redirigir en caso necesario
      }
    } catch (error) {
      console.error("Error al modificar la mascota:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="nombre" register={register} label="Nombre" error={errors.nombre?.message} />
        <TextArea name="descripcion" register={register} label="Descripción" error={errors.descripcion?.message}/>
     
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
        >
          Modificar Mascota
        </button>
      </div>
    </form>
  );
};

export default FormModificarMascota;