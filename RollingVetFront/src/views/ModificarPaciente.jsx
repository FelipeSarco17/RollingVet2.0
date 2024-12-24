import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { modificarPaciente, capturarUnPaciente, leerPacientes } from "../utils/utils";
import { zodResolver } from '@hookform/resolvers/zod';
import { modificarUserSchema } from '../validations/userSchema';

const ModificarPaciente = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({ resolver: zodResolver(modificarUserSchema) });
  const { id } = useParams();
  const [emailOriginal, setEmailOriginal] = useState("");

  // Modificar los datos del paciente
  const modificarDatos = (obj) => {
    modificarPaciente(id, obj);
    navigate("/admin/gestionPacientes");
  };

  // Validar que el email no esté registrado
  const validarEmail = async (data) => {
    let emailValido = true;

    // Verificamos si el email ha cambiado
    if (data.email !== emailOriginal) {
      try {
        const pacientesData = await leerPacientes();
        const { Pacientes } = pacientesData;

        // Recorremos los pacientes y verificamos si el email ya existe
        Pacientes.forEach(paciente => {
          if (paciente.email === data.email && paciente.key !== id) {
            emailValido = false;
          }
        });

        if (!emailValido) {
          // Si el email ya está registrado, mostramos un error
          alert("El email ya está registrado.");
        } else {
          // Si el email es válido, modificamos los datos
          modificarDatos(data);
        }
      } catch (error) {
        console.error(error);
        alert("Hubo un error al validar el email.");
        // FALTA HACER QUE EL MENSAJE DE ERROR APAREZCA DEBAJO DEL CAMPO DE EMAIL
      }
    } else {
      // Si el email no cambió, podemos proceder sin validarlo
      modificarDatos(data);
    }
  };

  // Obtener los datos del paciente para editarlos
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
        setEmailOriginal(obj.email); // Guardamos el email original para futuras comparaciones
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
      <form
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit(validarEmail)} // Usamos handleSubmit para manejar la validación y el submit
      >
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
    </main>
  );
};

export default ModificarPaciente;