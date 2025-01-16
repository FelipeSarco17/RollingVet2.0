import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { capturarUnaMascota, modificarMascota } from "../utils/utils";

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
      if (onRedirigir) {
        onRedirigir(); // Redirigir en caso necesario
      }
    } catch (error) {
      console.error("Error al modificar la mascota:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <label className="block text-lg font-medium text-gray-700">
          Descripción (opcional)
        </label>
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
  );
};

export default FormModificarMascota;