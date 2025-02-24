import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { modificarPaciente, capturarUnPaciente, leerPacientes } from "../utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { modificarUserSchema } from "../validations/userSchema";
import { setEmailOriginal } from "../utils/estadosCompartidos";
import DropdownMascotas from "../components/DropdownMascotas";
import Swal from "sweetalert2";
import Select from "../components/FormComponents/Select";

const ModificarPaciente = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({ resolver: zodResolver(modificarUserSchema) });
  const { id } = useParams();


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
        navigate("/admin/gestionPacientes");
      }
    });
  }

  const modificarDatos = (obj) => {
    const formattedObj = {
      ...obj,
      admin: obj.admin === "true", // Convertir a booleano
    };
    console.log(formattedObj);

    Swal.fire({
      title: "¿Deseas guardar los cambios?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        modificarPaciente(id, obj);

        Swal.fire({
          title: "¡Cambios Guardados!",
          icon: "success"
        });
        navigate("/admin/gestionPacientes");
      }
    });

  };
  const obtenerProducto = async (id) => {
    try {
      let data = await capturarUnPaciente(id);
      let obj = data.paciente;
      if (obj) {

        setValue("nombre", obj.nombre);
        setValue("apellido", obj.apellido);
        setValue("email", obj.email);
        setValue("telefono", obj.telefono);
        setValue("key", obj.key);
        setValue("admin", obj.admin ? "true" : "false");
        setEmailOriginal(obj.email);
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
          Modificar Paciente
        </h1>
        {/* Botón de regresar */}
        <button
          onClick={() => handleRegresar()}
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

          {/* Apellido */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("apellido", { required: "Este campo es obligatorio." })}
            />
            {errors.apellido && (
              <p className="text-red-500 text-sm mt-1">{errors.apellido.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("email", {
                required: "Este campo es obligatorio.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Por favor ingresa un email válido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              {...register("telefono", { required: "Este campo es obligatorio." })}
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
            )}
          </div>

          <DropdownMascotas id={id} label={"Mascotas"} className="mb-4" />

          <Select
            className="mt-2"
            name="admin"
            label="Tipo de Usuario"
            onChange={(e) => setValue("admin", e.target.value)} // Actualiza el valor de admin en el formulario
            options={[
              { value: "false", label: "Usuario" },
              { value: "true", label: "Administrador" },
            ]}
            register={(register)}
            error={errors.admin?.message}
          />

          {/* Botón de submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
            >
              Modificar Paciente
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ModificarPaciente;