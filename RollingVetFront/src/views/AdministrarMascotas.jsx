import React, { useEffect, useState } from "react";
import { leerMascotas, eliminarMascota } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const AdministrarMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const navigate = useNavigate();

  // Función para obtener la lista de mascotas
  const obtenerMascotas = () => {
    leerMascotas()
      .then((data) => {
        let { mascotas } = data;
        setMascotas(mascotas);
      })
      .catch((error) => {
        console.error("Error al leer mascotas:", error);
        setMascotas([]);
      });
  };

  useEffect(() => {
    obtenerMascotas();
  }, []);

  const handleEliminar = (uid) => {
    eliminarMascota(uid).then(() => {
      obtenerMascotas(); // Volver a cargar la lista de mascotas
    });
  };

  return (
    <main className="p-6">
      <div className="flex">
        <h1 className="text-3xl font-bold mb-6 mr-6">Administrar Mascotas</h1>
        <button className="ml-6 mb-6 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          onClick={() => navigate("/admin/registrarMascota")}>
          Agregar Mascota
        </button>
        <button className="ml-6 mb-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
          onClick={() => navigate("/admin/gestionEspecies")}>
            Gestionar Especies
          </button>
      </div>


      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-gray-700">#</th>
              <th className="py-3 px-6 text-left text-gray-700">Nombre</th>
              <th className="py-3 px-6 text-left text-gray-700">Especie</th>
              <th className="py-3 px-6 text-left text-gray-700">Descripción</th>
              <th className="py-3 px-6 text-left text-gray-700">Propietario</th>
              <th className="py-3 px-6 text-left text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.length > 0 ? (
              mascotas.map((mascota) => (
                <tr key={mascota.uid} className="border-t border-gray-200">
                  <td className="py-3 px-6 text-gray-700">{mascota.uid}</td>
                  <td className="py-3 px-6 text-gray-700">{mascota.nombre}</td>
                  <td className="py-3 px-6 text-gray-700">{mascota.especie}</td>
                  <td className="py-3 px-6 text-gray-700">{mascota.descripcion}</td>
                  <td className="py-3 px-6 text-gray-700">{mascota.propietario}</td>
                  <td className="py-3 px-6 text-gray-700">
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition"
                      onClick={() => navigate(`/admin/modificarMascota/${mascota.uid}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-4 rounded-lg ml-2 hover:bg-red-600 transition"
                      onClick={() => handleEliminar(mascota.uid)}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center text-gray-500">
                  No hay mascotas registradas.
                </td>
              </tr>
            )

            }

          </tbody>
        </table>
      </div>
    </main>
  );
};

export default AdministrarMascotas;