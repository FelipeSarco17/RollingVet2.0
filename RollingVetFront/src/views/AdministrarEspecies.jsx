import React, { useEffect, useState } from "react";
import { leerEspecies, eliminarEspecie } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdministrarEspecies = () => {
  const [especies, setEspecies] = useState([]);
  const navigate = useNavigate();

  // Función para obtener la lista de especies
  const obtenerEspecies = () => {
    leerEspecies()
      .then((especies) => {
        setEspecies(especies);
      })
      .catch((error) => {
        console.error("Error al leer especies:", error);
        setEspecies([]);
      });
  };

  useEffect(() => {
    obtenerEspecies();
  }, []);

  const handleEliminar = (eid) => {
    Swal.fire({
      title: "¿Deseas eliminar esta especie?",
      text: "Esta acción es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarEspecie(eid).then(() => {
          obtenerEspecies(); // Volver a cargar la lista de especies
        });
      }
    });
  };

  return (
    <main className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">
          Administrar Especies
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={() => navigate("/admin/registrarEspecie")}
          >
            Agregar Especie
          </button>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            onClick={() => navigate("/admin/gestionMascotas")}
          >
            Gestionar Mascotas
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                #
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Especie
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {especies.length > 0 ? (
              especies.map((especie) => (
                <tr
                  key={especie.eid}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {especie.eid}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {especie.especie}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm border border-gray-300 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition text-xs sm:text-sm"
                      onClick={() => handleEliminar(especie.eid)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-3 px-4 text-center text-gray-500 border border-gray-300 text-sm"
                >
                  No hay especies registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdministrarEspecies;
