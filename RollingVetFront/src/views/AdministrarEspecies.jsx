import React, { useEffect, useState } from "react";
import { leerEspecies, eliminarEspecie } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const AdministrarEspecies = () => {
  const [especies, setEspecies] = useState([]);
  const navigate = useNavigate();

  // Función para obtener la lista de especies
  const obtenerEspecies = () => {
    leerEspecies()
      .then((data) => {
        let { especies } = data;
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
    eliminarEspecie(eid).then(() => {
      obtenerEspecies(); // Volver a cargar la lista de especies
    });
  };

  return (
    <main className="p-6">
      <div className="flex">
        <h1 className="text-3xl font-bold mb-6 mr-6">Administrar Especies</h1>
        <button
          className="ml-6 mb-6 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          onClick={() => navigate("/admin/registrarEspecie")}
        >
          Agregar Especie
        </button>
        <button className="ml-6 mb-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          onClick={() => navigate("/admin/gestionMascotas")}>
            Gestionar Mascotas
          </button>
      </div>

      <div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="py-3 px-6 text-left text-gray-700 border border-gray-300 ">#</th>
        <th className="py-3 px-6 text-left text-gray-700 border border-gray-300">Especie</th>
        <th className="py-3 px-6 text-left text-gray-700 border border-gray-300">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {especies.length > 0 ? (
        especies.map((especie) => (
          <tr key={especie.eid} className="border-t border-gray-200">
            <td className="py-3 px-6 text-gray-700 border border-gray-300 max-w-[100px] break-words whitespace-normal">{especie.eid}</td>
            <td className="py-3 px-6 text-gray-700 border border-gray-300 max-w-[100px] break-words whitespace-normal">{especie.especie}</td>
            <td className="py-3 px-6 text-gray-700 border border-gray-300 max-w-[100px]">
              <button
                className="bg-red-500 text-white py-1 px-4 rounded-lg ml-2 hover:bg-red-600 transition"
                onClick={() => handleEliminar(especie.eid)}
              >
                Borrar
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="py-3 px-6 text-center text-gray-500 border border-gray-300">
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