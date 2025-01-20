import React, { useEffect, useState } from "react";
import { leerMascotas, eliminarMascota, capturarUnPaciente } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdministrarMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();

  const obtenerMascotas = async () => {
    try {
      const data = await leerMascotas();
      let { mascotas } = data;

      const mascotasConPropietario = await Promise.all(
        mascotas.map(async (mascota) => {
          try {
            const propietario = await capturarUnPaciente(mascota.propietarioID);
            const { paciente } = propietario
            
            return {
              ...mascota,
              propietario: paciente.nombre + " " + paciente.apellido
            };
          } catch (error) {
            console.error("Error al obtener propietario:", error);
            return {
              ...mascota,
              propietario: "No disponible",
            };
          }
        })
      );

      setMascotas(mascotasConPropietario);
    } catch (error) {
      console.error("Error al leer mascotas:", error);
      setMascotas([]);
    }
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  const handleEliminar = (uid) => {
    Swal.fire({
      title: "¿Deseas eliminar esta mascota?",
      text: "Esta acción es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarMascota(uid).then(() => {
          obtenerMascotas(); // Volver a cargar la lista de mascotas
        });
      }
    });
  };

  return (
    <main className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left">
          Administrar Mascotas
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            onClick={() => navigate("/admin/gestionEspecies")}
          >
            Gestionar Especies
          </button>
        </div>
      </div>

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
                Especie
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Descripción
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Propietario
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {mascotas.length > 0 ? (
              mascotas.map((mascota) => (
                <tr
                  key={mascota.uid}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {mascota.uid}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {mascota.nombre}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {mascota.especie}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {mascota.descripcion}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {mascota.propietario}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm border border-gray-300 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <button
                      className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition text-xs sm:text-sm"
                      onClick={() =>
                        navigate(`/admin/modificarMascota/${mascota.uid}`)
                      }
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition text-xs sm:text-sm"
                      onClick={() => handleEliminar(mascota.uid)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-3 px-4 text-center text-gray-500 border border-gray-300 text-sm"
                >
                  No hay mascotas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdministrarMascotas;