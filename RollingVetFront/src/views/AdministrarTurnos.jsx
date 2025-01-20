import React, { useEffect, useState } from "react";
import { leerTurnos, eliminarTurnoUsuario, capturarUnPaciente } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdministrarTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const navigate = useNavigate();

  const obtenerTurnos = async () => {
    try {
      const data = await leerTurnos();
      console.log(data);
      let { Turnos } = data;

            const turnosConCliente = await Promise.all(
              Turnos.map(async (turno) => {
                try {
                  const cliente = await capturarUnPaciente(turno.cliente);
                  const { paciente } = cliente
                  
                  return {
                    ...turno,
                    cliente: paciente.nombre + " " + paciente.apellido
                  };
                } catch (error) {
                  console.error("Error al obtener al paciente:", error);
                  return {
                    ...turno,
                    cliente: "No disponible",
                  };
                }
              })
            );
    
      
      setTurnos(turnosConCliente);
    } catch (error) {
      console.error("Error al leer turnos:", error);
      setTurnos([]);
    }
  };

  useEffect(() => {
    obtenerTurnos();
  }, []);

  const handleEliminar = (uid) => {
    Swal.fire({
      title: "¿Deseas eliminar este turno?",
      text: "Esta acción es permanente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarTurnoUsuario(uid).then(() => {
          obtenerTurnos(); // Volver a cargar la lista de turnos
        });
      }
    });
  };

  return (
    <main className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center md:text-left">
          Administrar Turnos
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                #
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Fecha
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Horario
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Detalle
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Veterinario
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Sucursal
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Cliente
              </th>
              <th className="py-3 px-4 text-left text-gray-700 border border-gray-300 text-sm md:text-base">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {turnos.length > 0 ? (
              turnos.map((turno) => (
                <tr
                  key={turno._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {turno._id}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {turno.fecha}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {turno.hora}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {turno.detalleCita}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {turno.veterinario}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {turno.sucursal}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm break-words border border-gray-300">
                    {turno.cliente}
                  </td>
                  <td className="py-3 px-4 text-gray-700 text-sm border border-gray-300 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition text-xs sm:text-sm"
                      onClick={() => handleEliminar(turno._id)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="8"
                  className="py-3 px-4 text-center text-gray-500 border border-gray-300 text-sm"
                >
                  No hay turnos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdministrarTurnos;