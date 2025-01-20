import React, { useEffect, useState } from "react";
import { leerPacientes, eliminarPaciente } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdministrarPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

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
    Swal.fire({
      title: "¿Deseas eliminar este usuario?",
      text: "Esta acción es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPaciente(uid).then(() => {
          obtenerPacientes(); // Volver a cargar la lista de pacientes
        });
      }
    });
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">
        Administrar Pacientes
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                #
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Nombre
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Apellido
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Email
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Teléfono
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr
                key={paciente.uid}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-gray-700 border border-gray-300 text-sm break-words">
                  {paciente.uid}
                </td>
                <td className="py-3 px-4 text-gray-700 border border-gray-300 text-sm break-words">
                  {paciente.nombre}
                </td>
                <td className="py-3 px-4 text-gray-700 border border-gray-300 text-sm break-words">
                  {paciente.apellido}
                </td>
                <td className="py-3 px-4 text-gray-700 border border-gray-300 text-sm break-words">
                  {paciente.email}
                </td>
                <td className="py-3 px-4 text-gray-700 border border-gray-300 text-sm break-words">
                  {paciente.telefono}
                </td>
                <td className="py-3 px-4 text-gray-700 border border-gray-300 text-sm flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition text-xs sm:text-sm"
                    onClick={() =>
                      navigate(`/admin/modificarPaciente/${paciente.uid}`)
                    }
                  >
                    Editar
                  </button>
                  {paciente.admin ? (
                    <button
                      className="bg-gray-300 text-gray-600 py-1 px-4 rounded-lg cursor-not-allowed text-xs sm:text-sm"
                      disabled
                    >
                      No se puede eliminar
                    </button>
                  ) : (
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition text-xs sm:text-sm"
                      onClick={() => handleEliminar(paciente.uid)}
                    >
                      Borrar
                    </button>
                  )}
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