import React, { useEffect, useState } from "react";
import { leerPacientes, eliminarPaciente } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const AdministrarPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  // Función para obtener la lista de pacientes
  const obtenerPacientes = () => {
    leerPacientes()
      .then((data) => {
        let { Pacientes } = data;
        setPacientes(Pacientes);
      })
      .catch((error) => {
        console.error("Error al leer pacientes:", error);
      });
  };

  useEffect(() => {
    obtenerPacientes();
  }, []);

  const handleEliminar = (uid) => {
    eliminarPaciente(uid).then(() => {
      obtenerPacientes(); // Volver a cargar la lista de pacientes
    });
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Administrar Pacientes</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-gray-700">#</th>
              <th className="py-3 px-6 text-left text-gray-700">Nombre</th>
              <th className="py-3 px-6 text-left text-gray-700">Apellido</th>
              <th className="py-3 px-6 text-left text-gray-700">Email</th>
              <th className="py-3 px-6 text-left text-gray-700">Teléfono</th>
              <th className="py-3 px-6 text-left text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.uid} className="border-t border-gray-200">
                <td className="py-3 px-6 text-gray-700">{paciente.uid}</td>
                <td className="py-3 px-6 text-gray-700">{paciente.nombre}</td>
                <td className="py-3 px-6 text-gray-700">{paciente.apellido}</td>
                <td className="py-3 px-6 text-gray-700">{paciente.email}</td>
                <td className="py-3 px-6 text-gray-700">{paciente.telefono}</td>
                <td className="py-3 px-6 text-gray-700">
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
                    onClick={() => navigate(`/admin/modificarPaciente/${paciente.uid}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded-lg ml-2 hover:bg-red-600 transition"
                    onClick={() => handleEliminar(paciente.uid)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdministrarPacientes;